import {
  ApprovalStatus,
  Course,
  Enrollment,
  Module,
  ModuleLockStatus,
  Progress,
  QuestionItem,
  User,
} from '../types/prisma';

export interface CourseProgressSummary {
  courseId: string;
  completedCount: number;
  totalCount: number;
  percentage: number;
  nextModule: Module | null;
}

export interface SubjectBreakdownItem {
  subject: string;
  scoredMarks: number;
  maxMarks: number;
  correctCount: number;
  wrongCount: number;
  unattemptedCount: number;
  accuracyPct: number;
}

export interface ChapterBreakdownItem {
  chapter: string;
  subject: string;
  scoredMarks: number;
  maxMarks: number;
  accuracyPct: number;
  avgTimeSeconds: number;
}

export interface ExamAnalyticsResult {
  mcqScore: number;
  descriptiveScore: number;
  totalScore: number;
  maxScore: number;
  accuracyPct: number;
  attemptedCount: number;
  correctCount: number;
  wrongCount: number;
  unattemptedCount: number;
  totalTimeSeconds: number;
  subjectBreakdown: SubjectBreakdownItem[];
  chapterBreakdown: ChapterBreakdownItem[];
}

/**
 * Computes completion percentage and next active module for a course
 * based on the Prisma Progress model.
 */
export function calculateCourseProgress(
  userId: string,
  courseId: string,
  allModules: Module[],
  progressList: Progress[]
): CourseProgressSummary {
  const courseModules = allModules
    .filter((m) => m.courseId === courseId)
    .sort((a, b) => a.position - b.position);

  const totalCount = courseModules.length;
  if (totalCount === 0) {
    return {
      courseId,
      completedCount: 0,
      totalCount: 0,
      percentage: 0,
      nextModule: null,
    };
  }

  const completedSet = new Set(
    progressList
      .filter((p) => p.userId === userId && p.isCompleted)
      .map((p) => p.moduleId)
  );

  let completedCount = 0;
  let nextModule: Module | null = null;

  for (const mod of courseModules) {
    if (completedSet.has(mod.id)) {
      completedCount += 1;
    } else if (!nextModule) {
      nextModule = mod;
    }
  }

  if (!nextModule && courseModules.length > 0) {
    nextModule = courseModules[courseModules.length - 1];
  }

  const percentage = Math.round((completedCount / totalCount) * 100);

  return {
    courseId,
    completedCount,
    totalCount,
    percentage,
    nextModule,
  };
}

/**
 * Resolves the vertical lock status of a module within a course.
 */
export function getModuleLockStatus(
  userId: string,
  targetModule: Module,
  courseModules: Module[],
  progressList: Progress[]
): { status: ModuleLockStatus; prerequisiteTitle: string | null } {
  const sorted = [...courseModules]
    .filter((m) => m.courseId === targetModule.courseId)
    .sort((a, b) => a.position - b.position);

  const completedSet = new Set(
    progressList
      .filter((p) => p.userId === userId && p.isCompleted)
      .map((p) => p.moduleId)
  );

  if (completedSet.has(targetModule.id)) {
    return { status: ModuleLockStatus.COMPLETED, prerequisiteTitle: null };
  }

  const idx = sorted.findIndex((m) => m.id === targetModule.id);
  if (idx <= 0) {
    return { status: ModuleLockStatus.AVAILABLE, prerequisiteTitle: null };
  }

  const previousModule = sorted[idx - 1];
  if (completedSet.has(previousModule.id)) {
    return { status: ModuleLockStatus.AVAILABLE, prerequisiteTitle: null };
  }

  return {
    status: ModuleLockStatus.LOCKED,
    prerequisiteTitle: previousModule.title,
  };
}

/**
 * Marks or toggles a module's completion state in the Progress table.
 */
export function setModuleCompletionState(
  progressList: Progress[],
  userId: string,
  moduleId: string,
  isCompleted: boolean
): Progress[] {
  const existingIndex = progressList.findIndex(
    (p) => p.userId === userId && p.moduleId === moduleId
  );

  if (existingIndex >= 0) {
    const updated = [...progressList];
    updated[existingIndex] = {
      ...updated[existingIndex],
      isCompleted,
    };
    return updated;
  }

  return [
    ...progressList,
    {
      userId,
      moduleId,
      isCompleted,
    },
  ];
}

/**
 * Enrolls a user in a course if not already enrolled.
 */
export function enrollUserInCourse(
  enrollments: Enrollment[],
  userId: string,
  courseId: string
): Enrollment[] {
  const exists = enrollments.some(
    (e) => e.userId === userId && e.courseId === courseId
  );
  if (exists) {
    return enrollments;
  }
  return [...enrollments, { userId, courseId }];
}

/**
 * Filters enrolled courses for a specific user.
 */
export function getEnrolledCourses(
  userId: string,
  courses: Course[],
  enrollments: Enrollment[]
): Course[] {
  const enrolledIds = new Set(
    enrollments.filter((e) => e.userId === userId).map((e) => e.courseId)
  );
  return courses.filter((c) => c.isPublished && enrolledIds.has(c.id));
}

/**
 * Validates credentials for the Supabase Auth UI portal.
 */
export function validateAuthCredentials(
  email: string,
  password?: string,
  requirePassword = true
): { valid: boolean; error: string | null } {
  const trimmedEmail = email.trim();
  if (!trimmedEmail) {
    return { valid: false, error: 'Email address is required.' };
  }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(trimmedEmail)) {
    return {
      valid: false,
      error: 'Enter a valid student, parent, teacher, or admin email address.',
    };
  }
  if (requirePassword) {
    if (!password || password.length < 6) {
      return {
        valid: false,
        error: 'Password must contain at least 6 characters.',
      };
    }
  }
  return { valid: true, error: null };
}

/**
 * Evaluates a student's exam submission with positive and negative marking,
 * subject-wise breakdown, chapter-wise breakdown, and time analysis.
 */
export function evaluateExamSubmission(
  questions: QuestionItem[],
  answers: Record<string, number | string>,
  timeSpentSeconds: Record<string, number>,
  manualDescriptiveScore = 0
): ExamAnalyticsResult {
  let mcqScore = 0;
  let maxScore = 0;
  let attemptedCount = 0;
  let correctCount = 0;
  let wrongCount = 0;
  let unattemptedCount = 0;
  let totalTimeSeconds = 0;

  const subjectMap = new Map<string, SubjectBreakdownItem>();
  const chapterMap = new Map<
    string,
    {
      chapter: string;
      subject: string;
      scoredMarks: number;
      maxMarks: number;
      correct: number;
      attempted: number;
      totalTime: number;
      questionCount: number;
    }
  >();

  for (const q of questions) {
    maxScore += q.positiveMarks;
    const spent = timeSpentSeconds[q.id] ?? 0;
    totalTimeSeconds += spent;

    if (!subjectMap.has(q.subject)) {
      subjectMap.set(q.subject, {
        subject: q.subject,
        scoredMarks: 0,
        maxMarks: 0,
        correctCount: 0,
        wrongCount: 0,
        unattemptedCount: 0,
        accuracyPct: 0,
      });
    }
    const subItem = subjectMap.get(q.subject)!;
    subItem.maxMarks += q.positiveMarks;

    if (!chapterMap.has(q.chapter)) {
      chapterMap.set(q.chapter, {
        chapter: q.chapter,
        subject: q.subject,
        scoredMarks: 0,
        maxMarks: 0,
        correct: 0,
        attempted: 0,
        totalTime: 0,
        questionCount: 0,
      });
    }
    const chapItem = chapterMap.get(q.chapter)!;
    chapItem.maxMarks += q.positiveMarks;
    chapItem.totalTime += spent;
    chapItem.questionCount += 1;

    const rawAns = answers[q.id];
    const isAnswered =
      rawAns !== undefined &&
      rawAns !== null &&
      String(rawAns).trim() !== '';

    if (!isAnswered) {
      unattemptedCount += 1;
      subItem.unattemptedCount += 1;
      continue;
    }

    attemptedCount += 1;
    chapItem.attempted += 1;

    if (q.type === 'MCQ') {
      const selectedIdx = Number(rawAns);
      if (selectedIdx === q.correctOptionIndex) {
        mcqScore += q.positiveMarks;
        subItem.scoredMarks += q.positiveMarks;
        chapItem.scoredMarks += q.positiveMarks;
        correctCount += 1;
        subItem.correctCount += 1;
        chapItem.correct += 1;
      } else {
        mcqScore -= q.negativeMarks;
        subItem.scoredMarks -= q.negativeMarks;
        chapItem.scoredMarks -= q.negativeMarks;
        wrongCount += 1;
        subItem.wrongCount += 1;
      }
    } else {
      // Descriptive question: counted as attempted; teacher score added via manualDescriptiveScore
      correctCount += 1;
      subItem.correctCount += 1;
      chapItem.correct += 1;
    }
  }

  const subjectBreakdown = Array.from(subjectMap.values()).map((s) => {
    const subAttempted = s.correctCount + s.wrongCount;
    return {
      ...s,
      accuracyPct:
        subAttempted > 0
          ? Math.round((s.correctCount / subAttempted) * 100)
          : 0,
    };
  });

  const chapterBreakdown: ChapterBreakdownItem[] = Array.from(
    chapterMap.values()
  ).map((c) => ({
    chapter: c.chapter,
    subject: c.subject,
    scoredMarks: c.scoredMarks,
    maxMarks: c.maxMarks,
    accuracyPct:
      c.attempted > 0 ? Math.round((c.correct / c.attempted) * 100) : 0,
    avgTimeSeconds:
      c.questionCount > 0 ? Math.round(c.totalTime / c.questionCount) : 0,
  }));

  const totalScore = mcqScore + manualDescriptiveScore;
  const accuracyPct =
    attemptedCount > 0
      ? Math.round((correctCount / attemptedCount) * 100)
      : 0;

  return {
    mcqScore,
    descriptiveScore: manualDescriptiveScore,
    totalScore,
    maxScore,
    accuracyPct,
    attemptedCount,
    correctCount,
    wrongCount,
    unattemptedCount,
    totalTimeSeconds,
    subjectBreakdown,
    chapterBreakdown,
  };
}

/**
 * Approves a pending student registration and assigns them to a Branch, Batch, and Teacher.
 */
export function approveStudentAccount(
  users: User[],
  studentId: string,
  branchId: string,
  batchId: string,
  assignedTeacherName: string
): User[] {
  return users.map((u) =>
    u.id === studentId
      ? {
          ...u,
          approvalStatus: ApprovalStatus.APPROVED,
          branchId,
          batchId,
          assignedTeacherName,
        }
      : u
  );
}

/**
 * Evaluates whether the CBT countdown timer has reached zero and triggers
 * automatic submission with an explanatory notification message.
 */
export function resolveCbtTimerExpiry(
  remainingSeconds: number,
  isSubmitted: boolean,
  examCode: string
): {
  shouldAutoSubmit: boolean;
  nextSubmittedState: boolean;
  notificationMessage: string | null;
} {
  if (isSubmitted) {
    return {
      shouldAutoSubmit: false,
      nextSubmittedState: true,
      notificationMessage: null,
    };
  }

  if (remainingSeconds <= 0) {
    return {
      shouldAutoSubmit: true,
      nextSubmittedState: true,
      notificationMessage: `Time Expired (00:00:00): Your ${examCode} CBT examination has been automatically submitted and locked.`,
    };
  }

  return {
    shouldAutoSubmit: false,
    nextSubmittedState: false,
    notificationMessage: null,
  };
}

export type EnterpriseRole = 'STUDENT' | 'TEACHER' | 'PARENT' | 'ADMIN';

export interface GlobalAnnouncementRecord {
  id: string;
  title: string;
  message: string;
  targetBranches: 'ALL_BRANCHES' | 'SBO_COLONY' | 'ANAIYUR';
  publishedAt: string;
}

export interface ManagedUserApprovalRecord {
  id: string;
  userCode: string;
  fullName: string;
  email: string;
  role: 'STUDENT' | 'TEACHER';
  campus: 'SBO Colony' | 'Anaiyur';
  programmeOrSubject: string;
  assignedBatch: string;
  status: 'PENDING' | 'APPROVED' | 'SUSPENDED';
}

/**
 * Resolves the target dashboard URL route for the selected role on /login.
 */
export function resolveLoginDashboardRoute(role: EnterpriseRole): string {
  switch (role) {
    case 'ADMIN':
      return '/dashboard/admin';
    case 'TEACHER':
      return '/dashboard/teacher';
    case 'PARENT':
      return '/dashboard/parent';
    case 'STUDENT':
    default:
      return '/dashboard/student';
  }
}

/**
 * Prepends a new global announcement created by Admin so Student and Teacher
 * dashboards reflect it immediately at the top of their feeds.
 */
export function prependGlobalAnnouncement(
  existing: GlobalAnnouncementRecord[],
  payload: {
    id?: string;
    title: string;
    message: string;
    targetBranches: 'ALL_BRANCHES' | 'SBO_COLONY' | 'ANAIYUR';
    publishedAt?: string;
  }
): GlobalAnnouncementRecord[] {
  const cleanTitle = payload.title.trim();
  const cleanMessage = payload.message.trim();
  if (!cleanTitle || !cleanMessage) {
    return existing;
  }
  const newItem: GlobalAnnouncementRecord = {
    id: payload.id || `ann_${Date.now()}`,
    title: cleanTitle,
    message: cleanMessage,
    targetBranches: payload.targetBranches,
    publishedAt: payload.publishedAt || 'Just now',
  };
  return [newItem, ...existing];
}

/**
 * Updates a user's approval status (APPROVED / SUSPENDED) in the global state.
 */
export function updateManagedUserStatus(
  existing: ManagedUserApprovalRecord[],
  id: string,
  nextStatus: 'APPROVED' | 'SUSPENDED'
): ManagedUserApprovalRecord[] {
  return existing.map((acc) =>
    acc.id === id ? { ...acc, status: nextStatus } : acc
  );
}

export interface RankComparisonPoint {
  examCode: string;
  examLabel: string;
  date: string;
  studentRank: number;
  branchAvgRank: number;
  studentScore: number;
  maxScore: number;
  percentile: number;
}

export const LAST_FIVE_NTA_MOCK_RANKS: RankComparisonPoint[] = [
  {
    examCode: 'NTA-MOCK-01',
    examLabel: 'Mock #01',
    date: '06 Sep 2026',
    studentRank: 14,
    branchAvgRank: 48,
    studentScore: 212,
    maxScore: 300,
    percentile: 94.1,
  },
  {
    examCode: 'NTA-MOCK-02',
    examLabel: 'Mock #02',
    date: '20 Sep 2026',
    studentRank: 11,
    branchAvgRank: 45,
    studentScore: 224,
    maxScore: 300,
    percentile: 95.8,
  },
  {
    examCode: 'NTA-MOCK-03',
    examLabel: 'Mock #03',
    date: '04 Oct 2026',
    studentRank: 8,
    branchAvgRank: 42,
    studentScore: 235,
    maxScore: 300,
    percentile: 97.2,
  },
  {
    examCode: 'NTA-MOCK-04',
    examLabel: 'Mock #04',
    date: '18 Oct 2026',
    studentRank: 6,
    branchAvgRank: 44,
    studentScore: 241,
    maxScore: 300,
    percentile: 98.1,
  },
  {
    examCode: 'NTA-MOCK-05',
    examLabel: 'Mock #05',
    date: '28 Oct 2026',
    studentRank: 4,
    branchAvgRank: 39,
    studentScore: 246,
    maxScore: 300,
    percentile: 98.9,
  },
];

export type StruggleSeverity = 'CRITICAL' | 'HIGH' | 'MODERATE' | 'MASTERED';

export interface ChapterHeatMapCell {
  chapterId: string;
  chapterName: string;
  subject: 'Physics' | 'Chemistry' | 'Mathematics' | 'Biology';
  batchScores: Record<
    string,
    {
      accuracyPct: number;
      negativeRatePct: number;
      avgTimeSec: number;
      strugglingCount: number;
      totalStudents: number;
    }
  >;
}

/**
 * Classifies a chapter's accuracy percentage across submitted CBT exams into
 * a struggle severity tier for the Teacher Heat Map.
 */
export function classifyChapterStruggleSeverity(accuracyPct: number): {
  severity: StruggleSeverity;
  label: string;
  struggleIndex: number;
} {
  const clamped = Math.max(0, Math.min(100, Math.round(accuracyPct)));
  const struggleIndex = 100 - clamped;
  if (clamped < 50) {
    return {
      severity: 'CRITICAL',
      label: 'Critical Struggle (<50% Acc)',
      struggleIndex,
    };
  }
  if (clamped < 65) {
    return {
      severity: 'HIGH',
      label: 'High Struggle (50–64% Acc)',
      struggleIndex,
    };
  }
  if (clamped < 78) {
    return {
      severity: 'MODERATE',
      label: 'Moderate Needs Review (65–77% Acc)',
      struggleIndex,
    };
  }
  return {
    severity: 'MASTERED',
    label: 'Strong Mastery (≥78% Acc)',
    struggleIndex,
  };
}

