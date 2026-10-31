import test from 'node:test';
import assert from 'node:assert/strict';
import {
  approveStudentAccount,
  calculateCourseProgress,
  enrollUserInCourse,
  evaluateExamSubmission,
  getModuleLockStatus,
  setModuleCompletionState,
  validateAuthCredentials,
} from './lmsLogic';
import {
  ApprovalStatus,
  Module,
  ModuleLockStatus,
  Progress,
  QuestionItem,
  Role,
  User,
} from '../types/prisma';

const sampleModules: Module[] = [
  {
    id: 'mod-1',
    title: '01. Rotational Dynamics & Moment of Inertia',
    position: 1,
    videoSourceType: 'YOUTUBE_UNLISTED',
    videoUrl: 'https://youtu.be/unlisted_phy_01',
    pdfTitle: 'Rotational_Dynamics_Notes.pdf',
    pdfStoragePath: 'supabase://study-materials/jee/rotational-01.pdf',
    pdfSizeLabel: '2.4 MB',
    content: 'Parallel and perpendicular axis theorems.',
    courseId: 'course-1',
    durationMinutes: 45,
    codeSnippet: 'I_cm = M * R^2 / 2',
    keyTakeaways: ['Torque & Angular Momentum'],
  },
  {
    id: 'mod-2',
    title: '02. Rolling Motion with Slipping on Inclined Planes',
    position: 2,
    videoSourceType: 'YOUTUBE_UNLISTED',
    videoUrl: 'https://youtu.be/unlisted_phy_02',
    pdfTitle: 'Rolling_Motion_Worksheet.pdf',
    pdfStoragePath: 'supabase://study-materials/jee/rolling-02.pdf',
    pdfSizeLabel: '1.8 MB',
    content: 'Instantaneous axis of rotation.',
    courseId: 'course-1',
    durationMinutes: 50,
    codeSnippet: 'a = g * sin(theta) / (1 + I / (m * R^2))',
    keyTakeaways: ['Pure Rolling Condition'],
  },
  {
    id: 'mod-3',
    title: '03. Angular Impulse & Collision Mechanics',
    position: 3,
    videoSourceType: 'DIRECT_STREAM',
    videoUrl: 'https://stream.kanavugal.academy/jee/phy-03.mp4',
    pdfTitle: 'Angular_Impulse_PYQs.pdf',
    pdfStoragePath: 'supabase://study-materials/jee/impulse-03.pdf',
    pdfSizeLabel: '3.1 MB',
    content: 'Conservation of angular momentum about fixed point.',
    courseId: 'course-1',
    durationMinutes: 55,
    codeSnippet: 'L_initial = L_final',
    keyTakeaways: ['Eccentric Collisions'],
  },
];

const sampleQuestions: QuestionItem[] = [
  {
    id: 'q1',
    programme: 'JEE Preparation',
    subject: 'Physics',
    chapter: 'Electrostatics',
    type: 'MCQ',
    scope: 'SHARED_ACADEMY',
    authorId: 'usr_teacher_01',
    authorName: 'Dr. Ananya Velu',
    prompt: 'Electric flux through a closed Gaussian sphere enclosing +Q charge is:',
    options: ['Q / eps0', '2Q / eps0', 'Zero', 'Q / (4*pi*eps0)'],
    correctOptionIndex: 0,
    positiveMarks: 4,
    negativeMarks: 1,
    recommendedTimeSeconds: 90,
  },
  {
    id: 'q2',
    programme: 'JEE Preparation',
    subject: 'Chemistry',
    chapter: 'Chemical Kinetics',
    type: 'MCQ',
    scope: 'SHARED_ACADEMY',
    authorId: 'usr_teacher_01',
    authorName: 'Dr. Ananya Velu',
    prompt: 'Half-life of a first-order reaction with rate constant k is:',
    options: ['0.693 / k', '1 / k', 'k / 0.693', '2 / k'],
    correctOptionIndex: 0,
    positiveMarks: 4,
    negativeMarks: 1,
    recommendedTimeSeconds: 60,
  },
  {
    id: 'q3',
    programme: 'JEE Preparation',
    subject: 'Mathematics',
    chapter: 'Calculus',
    type: 'MCQ',
    scope: 'PRIVATE_TEACHER',
    authorId: 'usr_teacher_01',
    authorName: 'Dr. Ananya Velu',
    prompt: 'Derivative of sin(x) with respect to x is:',
    options: ['-cos(x)', 'cos(x)', 'tan(x)', 'sec(x)'],
    correctOptionIndex: 1,
    positiveMarks: 4,
    negativeMarks: 1,
    recommendedTimeSeconds: 45,
  },
];

test('calculateCourseProgress computes accurate completion percentage and nextModule', () => {
  const progress: Progress[] = [
    { userId: 'usr-1', moduleId: 'mod-1', isCompleted: true },
  ];

  const summary = calculateCourseProgress(
    'usr-1',
    'course-1',
    sampleModules,
    progress
  );

  assert.equal(summary.completedCount, 1);
  assert.equal(summary.totalCount, 3);
  assert.equal(summary.percentage, 33);
  assert.equal(summary.nextModule?.id, 'mod-2');
});

test('getModuleLockStatus enforces sequential vertical locking across modules', () => {
  const progress: Progress[] = [
    { userId: 'usr-1', moduleId: 'mod-1', isCompleted: true },
  ];

  const mod1State = getModuleLockStatus(
    'usr-1',
    sampleModules[0],
    sampleModules,
    progress
  );
  const mod2State = getModuleLockStatus(
    'usr-1',
    sampleModules[1],
    sampleModules,
    progress
  );
  const mod3State = getModuleLockStatus(
    'usr-1',
    sampleModules[2],
    sampleModules,
    progress
  );

  assert.equal(mod1State.status, ModuleLockStatus.COMPLETED);
  assert.equal(mod2State.status, ModuleLockStatus.AVAILABLE);
  assert.equal(mod3State.status, ModuleLockStatus.LOCKED);
});

test('evaluateExamSubmission applies positive and negative marking accurately', () => {
  // q1 correct (+4), q2 wrong (-1), q3 unattempted (0) => net score = 3 / 12
  const result = evaluateExamSubmission(
    sampleQuestions,
    { q1: 0, q2: 2 },
    { q1: 50, q2: 70, q3: 15 },
    0
  );

  assert.equal(result.mcqScore, 3);
  assert.equal(result.totalScore, 3);
  assert.equal(result.maxScore, 12);
  assert.equal(result.correctCount, 1);
  assert.equal(result.wrongCount, 1);
  assert.equal(result.unattemptedCount, 1);
  assert.equal(result.accuracyPct, 50);
  assert.equal(result.totalTimeSeconds, 135);
});

test('approveStudentAccount transitions student from PENDING_APPROVAL to APPROVED with branch and batch', () => {
  const users: User[] = [
    {
      id: 'stu-pending',
      email: 'new@kanavugal.academy',
      name: 'Arunachalam V',
      role: Role.STUDENT,
      approvalStatus: ApprovalStatus.PENDING_APPROVAL,
      programme: 'NEET Preparation',
    },
  ];

  const updated = approveStudentAccount(
    users,
    'stu-pending',
    'br_sbo',
    'batch_neet_sbo',
    'Dr. Ananya Velu'
  );

  assert.equal(updated[0].approvalStatus, ApprovalStatus.APPROVED);
  assert.equal(updated[0].branchId, 'br_sbo');
  assert.equal(updated[0].batchId, 'batch_neet_sbo');
  assert.equal(updated[0].assignedTeacherName, 'Dr. Ananya Velu');
});

test('setModuleCompletionState, enrollUserInCourse, and validateAuthCredentials work properly', () => {
  const progress = setModuleCompletionState([], 'usr-1', 'mod-1', true);
  assert.equal(progress.length, 1);

  const enrolled = enrollUserInCourse(
    [{ userId: 'usr-1', courseId: 'course-1' }],
    'usr-1',
    'course-1'
  );
  assert.equal(enrolled.length, 1);

  assert.equal(validateAuthCredentials('', 'secret123').valid, false);
  assert.equal(
    validateAuthCredentials('kavin@kanavugal.academy', 'brutalist2026').valid,
    true
  );
});

test('resolveCbtTimerExpiry triggers automatic submission and notification when remainingSeconds reaches zero', async () => {
  const { resolveCbtTimerExpiry } = await import('./lmsLogic');

  const activeTick = resolveCbtTimerExpiry(45, false, 'NTA-JEE-MOCK-04');
  assert.equal(activeTick.shouldAutoSubmit, false);
  assert.equal(activeTick.nextSubmittedState, false);
  assert.equal(activeTick.notificationMessage, null);

  const expiredTick = resolveCbtTimerExpiry(0, false, 'NTA-JEE-MOCK-04');
  assert.equal(expiredTick.shouldAutoSubmit, true);
  assert.equal(expiredTick.nextSubmittedState, true);
  assert.ok(expiredTick.notificationMessage?.includes('automatically submitted'));

  const alreadySubmittedTick = resolveCbtTimerExpiry(0, true, 'NTA-JEE-MOCK-04');
  assert.equal(alreadySubmittedTick.shouldAutoSubmit, false);
  assert.equal(alreadySubmittedTick.nextSubmittedState, true);
});

test('resolveLoginDashboardRoute, prependGlobalAnnouncement, and updateManagedUserStatus work accurately', async () => {
  const {
    resolveLoginDashboardRoute,
    prependGlobalAnnouncement,
    updateManagedUserStatus,
  } = await import('./lmsLogic');

  assert.equal(resolveLoginDashboardRoute('STUDENT'), '/dashboard/student');
  assert.equal(resolveLoginDashboardRoute('TEACHER'), '/dashboard/teacher');
  assert.equal(resolveLoginDashboardRoute('PARENT'), '/dashboard/parent');
  assert.equal(resolveLoginDashboardRoute('ADMIN'), '/dashboard/admin');

  const initialAnnouncements = [
    {
      id: 'ann_1',
      title: 'Existing Notice',
      message: 'Existing Body',
      targetBranches: 'ALL_BRANCHES' as const,
      publishedAt: 'Yesterday',
    },
  ];
  const updatedAnnouncements = prependGlobalAnnouncement(initialAnnouncements, {
    id: 'ann_2',
    title: 'New Admin Broadcast',
    message: 'Reflected in Student and Teacher views',
    targetBranches: 'SBO_COLONY',
    publishedAt: 'Just now',
  });
  assert.equal(updatedAnnouncements.length, 2);
  assert.equal(updatedAnnouncements[0].title, 'New Admin Broadcast');

  const accounts = [
    {
      id: 'acc_01',
      userCode: 'STU-SBO-2027-0195',
      fullName: 'Pranav Muthukumar',
      email: 'pranav.m@kanavugal.academy',
      role: 'STUDENT' as const,
      campus: 'SBO Colony' as const,
      programmeOrSubject: 'Class 12 · NEET UG Medical',
      assignedBatch: 'SBO-NEET-2027',
      status: 'PENDING' as const,
    },
  ];
  const approved = updateManagedUserStatus(accounts, 'acc_01', 'APPROVED');
  assert.equal(approved[0].status, 'APPROVED');
});

