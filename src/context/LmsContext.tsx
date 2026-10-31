import React, { createContext, useContext, useEffect, useState } from 'react';
import {
  AcademicProgramme,
  AnnouncementItem,
  ApprovalStatus,
  Batch,
  Branch,
  Course,
  Enrollment,
  Exam,
  ExamSubmission,
  LiveClassSession,
  Module,
  OfflineFeeRecord,
  Progress,
  QuestionItem,
  Role,
  User,
  VideoSourceType,
} from '../types/prisma';
import {
  SEED_ANNOUNCEMENTS,
  SEED_BATCHES,
  SEED_BRANCHES,
  SEED_COURSES,
  SEED_ENROLLMENTS,
  SEED_EXAMS,
  SEED_FEE_RECORDS,
  SEED_LIVE_CLASSES,
  SEED_MODULES,
  SEED_PROGRESS,
  SEED_QUESTIONS,
  SEED_SUBMISSIONS,
  SEED_USERS,
} from '../data/mockDatabase';
import {
  approveStudentAccount,
  enrollUserInCourse,
  evaluateExamSubmission,
  setModuleCompletionState,
} from '../lib/lmsLogic';

export type MockRole = 'STUDENT' | 'TEACHER' | 'PARENT' | 'ADMIN';

interface LmsContextValue {
  currentPath: string;
  navigate: (path: string) => void;
  mockRole: MockRole;
  switchMockRole: (role: MockRole, shouldNavigate?: boolean) => void;
  currentUser: User;
  users: User[];
  branches: Branch[];
  batches: Batch[];
  courses: Course[];
  modules: Module[];
  liveClasses: LiveClassSession[];
  questions: QuestionItem[];
  exams: Exam[];
  submissions: ExamSubmission[];
  feeRecords: OfflineFeeRecord[];
  announcements: AnnouncementItem[];
  enrollments: Enrollment[];
  progress: Progress[];
  isAuthenticated: boolean;
  signInWithEmail: (email: string, name?: string, role?: Role) => void;
  signInAsDemoUser: (userId: string) => void;
  registerStudentSelf: (payload: {
    name: string;
    email: string;
    phone: string;
    programme: AcademicProgramme;
    classGrade: string;
    branchId: string;
  }) => User;
  createAccountByAdmin: (payload: {
    name: string;
    email: string;
    role: Role;
    programme?: AcademicProgramme;
    branchId: string;
    batchId?: string;
  }) => void;
  approveStudent: (
    studentId: string,
    branchId: string,
    batchId: string,
    teacherName: string
  ) => void;
  linkChildToParent: (parentId: string, studentId: string) => void;
  addBranch: (payload: {
    code: string;
    name: string;
    city: string;
    address: string;
  }) => void;
  addQuestionToBank: (question: Omit<QuestionItem, 'id'>) => void;
  createExamInStudio: (exam: Omit<Exam, 'id'>) => void;
  toggleExamResultRelease: (examId: string) => void;
  submitStudentExam: (
    examId: string,
    answers: Record<string, number | string>,
    markedForReview: string[],
    timeSpentSeconds: Record<string, number>
  ) => ExamSubmission;
  evaluateDescriptiveSubmission: (
    submissionId: string,
    descriptiveScore: number
  ) => void;
  scheduleLiveClass: (session: Omit<LiveClassSession, 'id'>) => void;
  uploadCourseModule: (payload: {
    courseId: string;
    title: string;
    videoSourceType: VideoSourceType;
    videoUrl: string;
    pdfTitle: string;
    content: string;
    durationMinutes: number;
  }) => void;
  recordOfflinePayment: (
    feeId: string,
    additionalAmount: number,
    mode: OfflineFeeRecord['paymentMode']
  ) => void;
  postAnnouncement: (
    payload: Omit<AnnouncementItem, 'id' | 'createdAt'>
  ) => void;
  signOut: () => void;
  toggleModuleComplete: (moduleId: string, forceState?: boolean) => void;
  enrollInCourse: (courseId: string) => void;
  resetDemoState: () => void;
}

const STORAGE_KEY = 'kanavugal_lms_final_v2';

const LmsContext = createContext<LmsContextValue | undefined>(undefined);

export const LmsProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [currentPath, setCurrentPath] = useState<string>(() => {
    if (typeof window === 'undefined') return '/login';
    const full = (window.location.pathname || '/') + (window.location.search || '');
    return full;
  });

  const [mockRole, setMockRole] = useState<MockRole>(() => {
    if (typeof window !== 'undefined') {
      const p = window.location.pathname;
      if (p.startsWith('/dashboard/teacher')) return 'TEACHER';
      if (p.startsWith('/dashboard/admin')) return 'ADMIN';
      if (p.startsWith('/dashboard/parent')) return 'PARENT';
    }
    return 'STUDENT';
  });

  const [users, setUsers] = useState<User[]>(SEED_USERS);
  const [currentUserId, setCurrentUserId] = useState<string>(SEED_USERS[0].id);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(true);
  const [branches, setBranches] = useState<Branch[]>(SEED_BRANCHES);
  const [batches] = useState<Batch[]>(SEED_BATCHES);
  const [courses] = useState<Course[]>(SEED_COURSES);
  const [modules, setModules] = useState<Module[]>(SEED_MODULES);
  const [liveClasses, setLiveClasses] =
    useState<LiveClassSession[]>(SEED_LIVE_CLASSES);
  const [questions, setQuestions] = useState<QuestionItem[]>(SEED_QUESTIONS);
  const [exams, setExams] = useState<Exam[]>(SEED_EXAMS);
  const [submissions, setSubmissions] =
    useState<ExamSubmission[]>(SEED_SUBMISSIONS);
  const [feeRecords, setFeeRecords] =
    useState<OfflineFeeRecord[]>(SEED_FEE_RECORDS);
  const [announcements, setAnnouncements] =
    useState<AnnouncementItem[]>(SEED_ANNOUNCEMENTS);

  const [enrollments, setEnrollments] = useState<Enrollment[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed.enrollments)) return parsed.enrollments;
      }
    } catch {
      // ignore
    }
    return SEED_ENROLLMENTS;
  });

  const [progress, setProgress] = useState<Progress[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed.progress)) return parsed.progress;
      }
    } catch {
      // ignore
    }
    return SEED_PROGRESS;
  });

  const currentUser =
    users.find((u) => u.id === currentUserId) ?? users[0];

  useEffect(() => {
    try {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({ enrollments, progress })
      );
    } catch {
      // ignore
    }
  }, [enrollments, progress]);

  useEffect(() => {
    const handlePopState = () => {
      const full = (window.location.pathname || '/') + (window.location.search || '');
      setCurrentPath(full);
      if (full.startsWith('/dashboard/teacher')) setMockRole('TEACHER');
      else if (full.startsWith('/dashboard/admin')) setMockRole('ADMIN');
      else if (full.startsWith('/dashboard/parent')) setMockRole('PARENT');
      else if (full.startsWith('/dashboard/student')) setMockRole('STUDENT');
      window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigate = (path: string) => {
    if (path.startsWith('#')) {
      const el = document.querySelector(path);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
      return;
    }
    window.history.pushState({}, '', path);
    setCurrentPath(path);
    if (path.startsWith('/dashboard/teacher')) setMockRole('TEACHER');
    else if (path.startsWith('/dashboard/admin')) setMockRole('ADMIN');
    else if (path.startsWith('/dashboard/parent')) setMockRole('PARENT');
    else if (path.startsWith('/dashboard/student')) setMockRole('STUDENT');
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
  };

  const switchMockRole = (role: MockRole, shouldNavigate = true) => {
    setMockRole(role);
    if (shouldNavigate) {
      const targetRoute = `/dashboard/${role.toLowerCase()}`;
      window.history.pushState({}, '', targetRoute);
      setCurrentPath(targetRoute);
      window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
    }
  };

  const signInWithEmail = (
    email: string,
    name?: string,
    role: Role = Role.STUDENT
  ) => {
    const normalized = email.trim().toLowerCase();
    const existing = users.find((u) => u.email.toLowerCase() === normalized);
    if (existing) {
      setCurrentUserId(existing.id);
      setIsAuthenticated(true);
      navigate('/dashboard');
      return;
    }

    const derivedName =
      name?.trim() ||
      normalized
        .split('@')[0]
        .replace(/[._-]/g, ' ')
        .replace(/\b\w/g, (l) => l.toUpperCase());

    const newUser: User = {
      id: `usr_${Date.now()}`,
      email: normalized,
      name: derivedName,
      role,
      approvalStatus: ApprovalStatus.APPROVED,
      programme: 'JEE Preparation',
      classGrade: 'Class 12',
      branchId: 'br_sbo',
      batchId: 'batch_sbo_jee',
      assignedTeacherName: 'Dr. Ananya Velu',
      attendancePct: 100,
      cohort: 'SBO-JEE-2027-ALPHA',
    };

    setUsers((prev) => [...prev, newUser]);
    setCurrentUserId(newUser.id);
    setEnrollments((prev) => [
      ...prev,
      { userId: newUser.id, courseId: 'crs_fullstack_01' },
    ]);
    setIsAuthenticated(true);
    navigate('/dashboard');
  };

  const registerStudentSelf = (payload: {
    name: string;
    email: string;
    phone: string;
    programme: AcademicProgramme;
    classGrade: string;
    branchId: string;
  }): User => {
    const newStudent: User = {
      id: `usr_pending_${Date.now()}`,
      name: payload.name.trim(),
      email: payload.email.trim().toLowerCase(),
      phone: payload.phone.trim(),
      role: Role.STUDENT,
      approvalStatus: ApprovalStatus.PENDING_APPROVAL,
      programme: payload.programme,
      classGrade: payload.classGrade,
      branchId: payload.branchId,
      cohort: 'Pending Administrator Verification',
      school: 'Self-Registered Applicant',
    };
    setUsers((prev) => [newStudent, ...prev]);
    setCurrentUserId(newStudent.id);
    setIsAuthenticated(true);
    return newStudent;
  };

  const createAccountByAdmin = (payload: {
    name: string;
    email: string;
    role: Role;
    programme?: AcademicProgramme;
    branchId: string;
    batchId?: string;
  }) => {
    const newUser: User = {
      id: `usr_admin_created_${Date.now()}`,
      name: payload.name.trim(),
      email: payload.email.trim().toLowerCase(),
      role: payload.role,
      approvalStatus: ApprovalStatus.APPROVED,
      programme: payload.programme,
      branchId: payload.branchId,
      batchId: payload.batchId,
      assignedTeacherName: 'Dr. Ananya Velu',
      attendancePct: 100,
      childrenIds:
        payload.role === Role.PARENT ? ['usr_student_01'] : undefined,
      cohort: `Admin-Created · ${payload.role}`,
    };
    setUsers((prev) => [newUser, ...prev]);
    if (payload.role === Role.STUDENT) {
      const matchingCourse =
        courses.find((c) => c.programme === payload.programme) ?? courses[0];
      setEnrollments((prev) =>
        enrollUserInCourse(prev, newUser.id, matchingCourse.id)
      );
    }
  };

  const approveStudent = (
    studentId: string,
    branchId: string,
    batchId: string,
    teacherName: string
  ) => {
    setUsers((prev) =>
      approveStudentAccount(prev, studentId, branchId, batchId, teacherName)
    );
    const targetUser = users.find((u) => u.id === studentId);
    const matchingCourse =
      courses.find((c) => c.programme === targetUser?.programme) ?? courses[0];
    setEnrollments((prev) =>
      enrollUserInCourse(prev, studentId, matchingCourse.id)
    );
  };

  const linkChildToParent = (parentId: string, studentId: string) => {
    setUsers((prev) =>
      prev.map((u) => {
        if (u.id !== parentId) return u;
        const existing = u.childrenIds ?? [];
        if (existing.includes(studentId)) return u;
        return { ...u, childrenIds: [...existing, studentId] };
      })
    );
  };

  const addBranch = (payload: {
    code: string;
    name: string;
    city: string;
    address: string;
  }) => {
    const newBranch: Branch = {
      id: `br_${Date.now()}`,
      code: payload.code.toUpperCase(),
      name: payload.name,
      city: payload.city,
      address: payload.address,
      studentCount: 0,
      teacherCount: 1,
      isActive: true,
    };
    setBranches((prev) => [...prev, newBranch]);
  };

  const addQuestionToBank = (question: Omit<QuestionItem, 'id'>) => {
    const created: QuestionItem = {
      ...question,
      id: `q_${Date.now()}`,
    };
    setQuestions((prev) => [created, ...prev]);
  };

  const createExamInStudio = (exam: Omit<Exam, 'id'>) => {
    const created: Exam = {
      ...exam,
      id: `exm_${Date.now()}`,
    };
    setExams((prev) => [created, ...prev]);
  };

  const toggleExamResultRelease = (examId: string) => {
    setExams((prev) =>
      prev.map((ex) =>
        ex.id === examId
          ? { ...ex, resultsReleased: !ex.resultsReleased }
          : ex
      )
    );
  };

  const submitStudentExam = (
    examId: string,
    answers: Record<string, number | string>,
    markedForReview: string[],
    timeSpentSeconds: Record<string, number>
  ): ExamSubmission => {
    const exam = exams.find((e) => e.id === examId) ?? exams[0];
    const examQuestions = questions.filter((q) =>
      exam.questionIds.includes(q.id)
    );

    const hasDescriptive = examQuestions.some((q) => q.type === 'DESCRIPTIVE');
    const defaultDescriptiveCredit = hasDescriptive ? 7 : 0;

    const evalResult = evaluateExamSubmission(
      examQuestions,
      answers,
      timeSpentSeconds,
      defaultDescriptiveCredit
    );

    const newSubmission: ExamSubmission = {
      id: `sub_${Date.now()}`,
      examId: exam.id,
      studentId: currentUser.id,
      studentName: currentUser.name,
      answers,
      markedForReview,
      timeSpentSeconds,
      mcqScore: evalResult.mcqScore,
      descriptiveScore: evalResult.descriptiveScore,
      descriptiveEvaluated: true,
      totalScore: evalResult.totalScore,
      maxScore: evalResult.maxScore,
      accuracyPct: evalResult.accuracyPct,
      submittedAt: 'Just Now · 31 Oct 2026',
      previousAttemptPct: 72,
    };

    setSubmissions((prev) => {
      const filtered = prev.filter(
        (s) => !(s.examId === exam.id && s.studentId === currentUser.id)
      );
      return [newSubmission, ...filtered];
    });

    return newSubmission;
  };

  const evaluateDescriptiveSubmission = (
    submissionId: string,
    descriptiveScore: number
  ) => {
    setSubmissions((prev) =>
      prev.map((sub) =>
        sub.id === submissionId
          ? {
              ...sub,
              descriptiveScore,
              descriptiveEvaluated: true,
              totalScore: sub.mcqScore + descriptiveScore,
            }
          : sub
      )
    );
  };

  const scheduleLiveClass = (session: Omit<LiveClassSession, 'id'>) => {
    setLiveClasses((prev) => [{ ...session, id: `live_${Date.now()}` }, ...prev]);
  };

  const uploadCourseModule = (payload: {
    courseId: string;
    title: string;
    videoSourceType: VideoSourceType;
    videoUrl: string;
    pdfTitle: string;
    content: string;
    durationMinutes: number;
  }) => {
    const courseMods = modules.filter((m) => m.courseId === payload.courseId);
    const nextPos = courseMods.length + 1;
    const newMod: Module = {
      id: `mod_custom_${Date.now()}`,
      courseId: payload.courseId,
      title: `0${nextPos}. ${payload.title}`,
      position: nextPos,
      videoSourceType: payload.videoSourceType,
      videoUrl: payload.videoUrl,
      pdfTitle: payload.pdfTitle,
      pdfStoragePath: `supabase://kanavugal-storage/uploads/${payload.pdfTitle}`,
      pdfSizeLabel: '2.5 MB · Uploaded PDF',
      content: payload.content,
      durationMinutes: payload.durationMinutes,
      codeSnippet: '// Teacher uploaded formula & derivation notes',
      keyTakeaways: [
        'Review lecture recording and complete the attached Supabase PDF worksheet.',
      ],
    };
    setModules((prev) => [...prev, newMod]);
  };

  const recordOfflinePayment = (
    feeId: string,
    additionalAmount: number,
    mode: OfflineFeeRecord['paymentMode']
  ) => {
    setFeeRecords((prev) =>
      prev.map((rec) => {
        if (rec.id !== feeId) return rec;
        const nextPaid = Math.min(
          rec.totalAnnualFee,
          rec.paidAmount + additionalAmount
        );
        return {
          ...rec,
          paidAmount: nextPaid,
          status:
            nextPaid >= rec.totalAnnualFee
              ? 'PAID_OFFLINE'
              : 'PARTIAL_OFFLINE',
          paymentMode: mode,
          lastPaymentDate: '31 Oct 2026',
        };
      })
    );
  };

  const postAnnouncement = (
    payload: Omit<AnnouncementItem, 'id' | 'createdAt'>
  ) => {
    const created: AnnouncementItem = {
      ...payload,
      id: `ann_${Date.now()}`,
      createdAt: '31 Oct 2026 · Just Now',
    };
    setAnnouncements((prev) => [created, ...prev]);
  };

  const signInAsDemoUser = (userId: string) => {
    const found = users.find((u) => u.id === userId);
    if (found) {
      setCurrentUserId(found.id);
      setIsAuthenticated(true);
      navigate('/dashboard');
    }
  };

  const signOut = () => {
    setIsAuthenticated(false);
    navigate('/login');
  };

  const toggleModuleComplete = (moduleId: string, forceState?: boolean) => {
    setProgress((prev) => {
      const currentRecord = prev.find(
        (p) => p.userId === currentUser.id && p.moduleId === moduleId
      );
      const nextCompleted =
        typeof forceState === 'boolean'
          ? forceState
          : !(currentRecord?.isCompleted ?? false);

      return setModuleCompletionState(
        prev,
        currentUser.id,
        moduleId,
        nextCompleted
      );
    });
  };

  const enrollInCourse = (courseId: string) => {
    setEnrollments((prev) =>
      enrollUserInCourse(prev, currentUser.id, courseId)
    );
  };

  const resetDemoState = () => {
    setUsers(SEED_USERS);
    setBranches(SEED_BRANCHES);
    setModules(SEED_MODULES);
    setQuestions(SEED_QUESTIONS);
    setExams(SEED_EXAMS);
    setSubmissions(SEED_SUBMISSIONS);
    setFeeRecords(SEED_FEE_RECORDS);
    setAnnouncements(SEED_ANNOUNCEMENTS);
    setEnrollments(SEED_ENROLLMENTS);
    setProgress(SEED_PROGRESS);
    setCurrentUserId(SEED_USERS[0].id);
    setIsAuthenticated(true);
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      // ignore
    }
  };

  return (
    <LmsContext.Provider
      value={{
        currentPath,
        navigate,
        mockRole,
        switchMockRole,
        currentUser,
        users,
        branches,
        batches,
        courses,
        modules,
        liveClasses,
        questions,
        exams,
        submissions,
        feeRecords,
        announcements,
        enrollments,
        progress,
        isAuthenticated,
        signInWithEmail,
        signInAsDemoUser,
        registerStudentSelf,
        createAccountByAdmin,
        approveStudent,
        linkChildToParent,
        addBranch,
        addQuestionToBank,
        createExamInStudio,
        toggleExamResultRelease,
        submitStudentExam,
        evaluateDescriptiveSubmission,
        scheduleLiveClass,
        uploadCourseModule,
        recordOfflinePayment,
        postAnnouncement,
        signOut,
        toggleModuleComplete,
        enrollInCourse,
        resetDemoState,
      }}
    >
      {children}
    </LmsContext.Provider>
  );
};

export function useLms(): LmsContextValue {
  const ctx = useContext(LmsContext);
  if (!ctx) {
    throw new Error('useLms must be used within an LmsProvider');
  }
  return ctx;
}
