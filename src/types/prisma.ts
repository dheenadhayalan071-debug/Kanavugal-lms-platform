export enum Role {
  STUDENT = 'STUDENT',
  TEACHER = 'TEACHER',
  PARENT = 'PARENT',
  ADMIN = 'ADMIN',
}

export enum ApprovalStatus {
  PENDING_APPROVAL = 'PENDING_APPROVAL',
  APPROVED = 'APPROVED',
  REJECTED = 'REJECTED',
}

export type AcademicProgramme =
  | 'Classes 6–10'
  | 'Classes 11–12'
  | 'NEET Preparation'
  | 'JEE Preparation';

export type VideoSourceType = 'YOUTUBE_UNLISTED' | 'DIRECT_STREAM';

export type QuestionType = 'MCQ' | 'DESCRIPTIVE';

export type QuestionBankScope = 'PRIVATE_TEACHER' | 'SHARED_ACADEMY';

export type FeeStatus = 'PAID_OFFLINE' | 'PARTIAL_OFFLINE' | 'PENDING_OFFLINE';

export interface Branch {
  id: string;
  code: string; // 'SBO' | 'ANAIYUR' | future
  name: string;
  city: string;
  address: string;
  studentCount: number;
  teacherCount: number;
  isActive: boolean;
}

export interface Batch {
  id: string;
  name: string;
  programme: AcademicProgramme;
  branchId: string;
  branchName: string;
  mentorTeacherId: string;
  mentorTeacherName: string;
  scheduleSummary: string;
}

export interface User {
  id: string;
  email: string;
  name: string;
  role: Role;
  approvalStatus: ApprovalStatus;
  programme?: AcademicProgramme;
  classGrade?: string;
  branchId?: string;
  batchId?: string;
  assignedTeacherName?: string;
  phone?: string;
  // For PARENT role: array of linked child student IDs
  childrenIds?: string[];
  // For STUDENT role: attendance & teacher feedback summary
  attendancePct?: number;
  teacherFeedback?: string;
  cohort?: string;
  school?: string;
}

export interface InstructorMeta {
  name: string;
  roleTitle: string;
  credentials: string;
  officeHours: string;
  branch: string;
}

export interface Course {
  id: string;
  title: string;
  description: string;
  slug: string;
  isPublished: boolean;
  programme: AcademicProgramme;
  subject: string;
  track: string;
  difficulty: string;
  estimatedHours: number;
  instructor: InstructorMeta;
  techStack: string[]; // Topics/Chapters covered
  bentoSpan: 'large' | 'wide' | 'standard';
  visualVariant: 'systems' | 'robotics' | 'protocol' | 'compiler';
  deliverable: string;
}

export interface Module {
  id: string;
  title: string;
  position: number;
  videoSourceType: VideoSourceType;
  videoUrl: string;
  youtubeEmbedId?: string;
  pdfTitle: string;
  pdfStoragePath: string; // Supabase Storage bucket path
  pdfSizeLabel: string;
  content: string;
  courseId: string;
  durationMinutes: number;
  codeSnippet: string; // Formula sheet / key derivation / solution block
  keyTakeaways: string[];
}

export interface LiveClassSession {
  id: string;
  title: string;
  programme: AcademicProgramme;
  subject: string;
  batchId: string;
  batchName: string;
  branchName: string;
  teacherName: string;
  scheduledAt: string;
  status: 'LIVE_NOW' | 'UPCOMING' | 'COMPLETED';
  attendeeCount: number;
}

export interface QuestionItem {
  id: string;
  programme: AcademicProgramme;
  subject: 'Physics' | 'Chemistry' | 'Biology' | 'Mathematics';
  chapter: string;
  type: QuestionType;
  scope: QuestionBankScope;
  authorId: string;
  authorName: string;
  prompt: string;
  options: string[]; // 4 options for MCQ, empty for DESCRIPTIVE
  correctOptionIndex?: number;
  positiveMarks: number;
  negativeMarks: number;
  recommendedTimeSeconds: number;
}

export interface Exam {
  id: string;
  title: string;
  programme: AcademicProgramme;
  examType: 'FULL_LENGTH_MOCK' | 'TIMED_TOPIC_EXAM' | 'CHAPTER_QUIZ';
  subjects: string[];
  batchId: string;
  batchName: string;
  branchCode: string;
  durationMinutes: number;
  scheduledDate: string;
  totalMarks: number;
  resultsReleased: boolean; // Controlled manually by Teacher
  questionIds: string[];
  createdByTeacher: string;
}

export interface ExamSubmission {
  id: string;
  examId: string;
  studentId: string;
  studentName: string;
  answers: Record<string, number | string>; // questionId -> optionIndex (number) or descriptive text (string)
  markedForReview: string[];
  timeSpentSeconds: Record<string, number>;
  mcqScore: number;
  descriptiveScore: number;
  descriptiveEvaluated: boolean;
  totalScore: number;
  maxScore: number;
  accuracyPct: number;
  submittedAt: string;
  previousAttemptPct?: number;
}

export interface OfflineFeeRecord {
  id: string;
  studentId: string;
  studentName: string;
  programme: AcademicProgramme;
  branchCode: string;
  totalAnnualFee: number;
  paidAmount: number;
  status: FeeStatus;
  receiptNumber: string;
  lastPaymentDate: string;
  paymentMode: 'CASH_COUNTER' | 'BANK_NEFT' | 'DEMAND_DRAFT' | 'UPI_DESK';
}

export interface AnnouncementItem {
  id: string;
  title: string;
  message: string;
  scope: 'ACADEMY_WIDE' | 'BRANCH_SPECIFIC' | 'CLASS_SPECIFIC' | 'INDIVIDUAL';
  targetLabel: string;
  authorName: string;
  authorRole: Role;
  createdAt: string;
  isUrgent?: boolean;
}

export interface Enrollment {
  userId: string;
  courseId: string;
}

export interface Progress {
  userId: string;
  moduleId: string;
  isCompleted: boolean;
}

export enum ModuleLockStatus {
  COMPLETED = 'COMPLETED',
  AVAILABLE = 'AVAILABLE',
  LOCKED = 'LOCKED',
}
