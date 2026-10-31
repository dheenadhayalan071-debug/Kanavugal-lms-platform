import React, { useState } from 'react';
import {
  Award,
  BookOpen,
  CheckCircle2,
  Clock,
  FileText,
  Play,
  Radio,
  ShieldAlert,
  TrendingUp,
  Video,
  Youtube,
  Download,
  BarChart3,
  Timer,
} from 'lucide-react';
import { useLms } from '../../context/LmsContext';
import {
  calculateCourseProgress,
  evaluateExamSubmission,
  getEnrolledCourses,
} from '../../lib/lmsLogic';
import { ApprovalStatus } from '../../types/prisma';
import { CourseSchematicBanner } from '../BrutalistVisuals';

export type StudentTab =
  | 'courses'
  | 'recorded'
  | 'live'
  | 'materials'
  | 'exams'
  | 'performance';

export const StudentDashboardView: React.FC<{
  activeTab: StudentTab;
  setActiveTab: (tab: StudentTab) => void;
}> = ({ activeTab, setActiveTab }) => {
  const {
    currentUser,
    courses,
    modules,
    liveClasses,
    exams,
    questions,
    submissions,
    announcements,
    enrollments,
    progress,
    navigate,
    enrollInCourse,
    signInAsDemoUser,
  } = useLms();

  const [downloadedPdfId, setDownloadedPdfId] = useState<string | null>(null);

  // Check if student account is pending administrator verification
  if (currentUser.approvalStatus === ApprovalStatus.PENDING_APPROVAL) {
    return (
      <div className="bg-zinc-950 border-2 border-[#F2FF00] p-8 brutal-shadow-yellow space-y-6">
        <div className="flex items-center gap-3 text-[#F2FF00] font-mono text-xs font-bold">
          <ShieldAlert className="w-5 h-5" />
          <span>REGISTRATION WORKFLOW · STEP 3 OF 5 · PENDING ADMIN VERIFICATION</span>
        </div>

        <h2 className="font-display text-3xl font-black text-[#E9E3D5]">
          YOUR STUDENT ACCOUNT IS AWAITING ADMINISTRATOR APPROVAL.
        </h2>

        <p className="text-zinc-300 text-sm leading-relaxed max-w-2xl">
          Welcome to Kanavugal Academy, <strong>{currentUser.name}</strong>. You
          have selected <strong>{currentUser.programme}</strong> (
          {currentUser.classGrade || 'Standard Batch'}). An administrator at
          your branch will verify your registration, assign your Batch and
          Mentor Teacher, and unlock your course access.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 pt-2 font-mono text-xs">
          <div className="p-4 bg-[#0D0D0D] border-2 border-[#F2FF00]">
            <div className="text-[#F2FF00] font-bold">01. REGISTERED</div>
            <div className="text-[#E9E3D5] mt-1">{currentUser.email}</div>
          </div>
          <div className="p-4 bg-[#0D0D0D] border-2 border-[#F2FF00]">
            <div className="text-[#F2FF00] font-bold">02. PROGRAMME</div>
            <div className="text-[#E9E3D5] mt-1">{currentUser.programme}</div>
          </div>
          <div className="p-4 bg-[#173F46] border-2 border-[#E9E3D5]">
            <div className="text-[#F2FF00] font-bold">03. VERIFICATION</div>
            <div className="text-[#E9E3D5] mt-1">In Admin Queue</div>
          </div>
          <div className="p-4 bg-[#0D0D0D] border-2 border-zinc-800 opacity-60">
            <div className="text-zinc-400 font-bold">04. BATCH ACCESS</div>
            <div className="text-zinc-500 mt-1">Unlocks on Approval</div>
          </div>
        </div>

        <div className="pt-4 border-t border-zinc-800 flex flex-wrap items-center gap-4">
          <button
            type="button"
            onClick={() => signInAsDemoUser('usr_admin_01')}
            className="px-5 py-3 bg-[#F2FF00] text-[#0D0D0D] font-mono text-xs font-bold border-2 border-[#E9E3D5] brutal-shadow-petrol hover:bg-[#173F46] hover:text-[#F2FF00] transition-colors duration-75 rounded-none cursor-pointer"
          >
            Switch to Admin Account to Approve Now →
          </button>
          <button
            type="button"
            onClick={() => signInAsDemoUser('usr_student_01')}
            className="px-5 py-3 bg-[#0D0D0D] text-[#E9E3D5] font-mono text-xs font-bold border-2 border-zinc-700 hover:border-[#E9E3D5] rounded-none cursor-pointer"
          >
            Switch to Approved Student (Kavin Rajan)
          </button>
        </div>
      </div>
    );
  }

  const enrolledCourses = getEnrolledCourses(
    currentUser.id,
    courses,
    enrollments
  );
  const enrolledIds = new Set(enrolledCourses.map((c) => c.id));
  const availableCourses = courses.filter(
    (c) => c.isPublished && !enrolledIds.has(c.id)
  );

  const studentModules = modules.filter((m) => enrolledIds.has(m.courseId));
  const studentSubmissions = submissions.filter(
    (s) => s.studentId === currentUser.id
  );

  return (
    <div className="space-y-8">
      {/* Recent Academy / Branch Announcement Banner */}
      {announcements[0] && (
        <div className="bg-[#173F46] border-2 border-[#E9E3D5] p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="font-mono text-xs text-[#F2FF00] font-bold">
              ANNOUNCEMENT · {announcements[0].scope.replace('_', ' ')} ·{' '}
              {announcements[0].targetLabel}
            </div>
            <div className="font-display text-sm sm:text-base font-bold text-[#E9E3D5]">
              {announcements[0].title}
            </div>
          </div>
          <div className="font-mono text-xs text-[#E9E3D5]/80 shrink-0">
            {announcements[0].createdAt}
          </div>
        </div>
      )}

      {/* 1. MY COURSES */}
      {activeTab === 'courses' && (
        <section aria-label="My Enrolled Courses" className="space-y-8">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <div className="font-mono text-xs text-[#F2FF00]">
                BATCH: {currentUser.cohort || 'SBO-JEE-2027-ALPHA'} · MENTOR:{' '}
                {currentUser.assignedTeacherName || 'Dr. Ananya Velu'}
              </div>
              <h2 className="font-display text-2xl font-black text-[#E9E3D5] mt-1">
                MY ENROLLED PROGRAMMES ({enrolledCourses.length})
              </h2>
            </div>

            <button
              type="button"
              onClick={() => setActiveTab('exams')}
              className="px-4 py-2.5 bg-[#FF0000] text-[#E9E3D5] font-mono text-xs font-bold border-2 border-[#E9E3D5] brutal-shadow-yellow hover:bg-[#F2FF00] hover:text-[#0D0D0D] transition-colors duration-75 rounded-none cursor-pointer"
            >
              Launch Timed CBT Exams →
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {enrolledCourses.map((course) => {
              const summary = calculateCourseProgress(
                currentUser.id,
                course.id,
                modules,
                progress
              );
              return (
                <article
                  key={course.id}
                  className="bg-zinc-950 border-2 border-[#E9E3D5] flex flex-col justify-between brutal-shadow-zinc hover:border-[#F2FF00] transition-colors duration-75"
                >
                  <div>
                    <CourseSchematicBanner variant={course.visualVariant} />
                    <div className="p-6 space-y-4">
                      <div className="font-mono text-xs text-zinc-400 flex flex-wrap items-center gap-2">
                        <span className="text-[#F2FF00] font-bold">
                          {course.programme}
                        </span>
                        <span aria-hidden="true">·</span>
                        <span>{course.subject}</span>
                        <span aria-hidden="true">·</span>
                        <span>{course.instructor.name}</span>
                      </div>

                      <h3 className="font-display text-2xl font-black text-[#E9E3D5] tracking-tight">
                        {course.title}
                      </h3>

                      <p className="text-zinc-300 text-sm leading-relaxed">
                        {course.description}
                      </p>

                      <div className="pt-2 space-y-2">
                        <div className="flex items-center justify-between font-mono text-xs tabular-nums">
                          <span className="text-[#E9E3D5] font-bold">
                            PROGRESS: {summary.completedCount}/
                            {summary.totalCount} LESSONS
                          </span>
                          <span className="text-[#F2FF00] font-bold">
                            {summary.percentage}%
                          </span>
                        </div>
                        <div
                          role="progressbar"
                          aria-label={`${course.title} completion progress`}
                          aria-valuenow={summary.percentage}
                          aria-valuemin={0}
                          aria-valuemax={100}
                          className="w-full h-4 bg-[#0D0D0D] border-2 border-zinc-700 p-0.5"
                        >
                          <div
                            className="h-full bg-[#F2FF00] transition-all duration-150"
                            style={{ width: `${summary.percentage}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="p-6 pt-4 bg-[#0D0D0D] border-t-2 border-zinc-800 flex flex-wrap items-center justify-between gap-3">
                    <button
                      type="button"
                      onClick={() => navigate(`/course/${course.slug}`)}
                      className="px-4 py-2.5 bg-zinc-950 text-[#E9E3D5] font-mono text-xs font-bold border-2 border-zinc-700 hover:border-[#E9E3D5] rounded-none cursor-pointer"
                    >
                      Course Overview
                    </button>
                    {summary.nextModule && (
                      <button
                        type="button"
                        onClick={() =>
                          navigate(
                            `/learn/${course.id}/${summary.nextModule!.id}`
                          )
                        }
                        className="px-5 py-2.5 bg-[#F2FF00] text-[#0D0D0D] font-mono text-xs font-bold border-2 border-[#E9E3D5] brutal-shadow-petrol hover:bg-[#173F46] hover:text-[#F2FF00] transition-colors duration-75 flex items-center gap-2 rounded-none cursor-pointer"
                      >
                        <Play className="w-3.5 h-3.5 fill-current" />
                        <span>Resume Classroom</span>
                      </button>
                    )}
                  </div>
                </article>
              );
            })}
          </div>

          {availableCourses.length > 0 && (
            <div className="pt-6 border-t-2 border-zinc-800 space-y-4">
              <div className="font-mono text-xs text-zinc-400 font-bold">
                ADDITIONAL ACADEMY TRACKS (CLASSES 6–12, NEET, JEE):
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {availableCourses.map((c) => (
                  <div
                    key={c.id}
                    className="bg-zinc-950 border-2 border-zinc-800 p-5 flex items-center justify-between gap-4"
                  >
                    <div>
                      <div className="font-mono text-xs text-[#F2FF00]">
                        {c.programme} · {c.subject}
                      </div>
                      <div className="font-display text-lg font-black text-[#E9E3D5] mt-0.5">
                        {c.title}
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => enrollInCourse(c.id)}
                      className="px-4 py-2 bg-[#173F46] text-[#F2FF00] font-mono text-xs font-bold border border-[#F2FF00] hover:bg-[#F2FF00] hover:text-[#0D0D0D] shrink-0 rounded-none cursor-pointer"
                    >
                      + Add Track
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </section>
      )}

      {/* 2. RECORDED CLASSES (YouTube Unlisted + Direct Stream) */}
      {activeTab === 'recorded' && (
        <section aria-label="Recorded Video Lectures" className="space-y-6">
          <div>
            <div className="font-mono text-xs text-[#F2FF00]">
              DUAL VIDEO ARCHITECTURE · YOUTUBE UNLISTED + DIRECT ACADEMY STREAM
            </div>
            <h2 className="font-display text-2xl font-black text-[#E9E3D5] mt-1">
              RECORDED LECTURE LIBRARY ({studentModules.length} SESSIONS)
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-4">
            {studentModules.map((mod) => {
              const parentCourse = courses.find((c) => c.id === mod.courseId);
              const isDone = progress.some(
                (p) =>
                  p.userId === currentUser.id &&
                  p.moduleId === mod.id &&
                  p.isCompleted
              );
              return (
                <div
                  key={mod.id}
                  className="bg-zinc-950 border-2 border-[#E9E3D5] p-6 flex flex-col lg:flex-row lg:items-center justify-between gap-6"
                >
                  <div className="space-y-2">
                    <div className="font-mono text-xs flex flex-wrap items-center gap-2">
                      <span className="text-[#F2FF00] font-bold">
                        {parentCourse?.programme}
                      </span>
                      <span aria-hidden="true">·</span>
                      <span className="text-zinc-300">
                        {mod.videoSourceType === 'YOUTUBE_UNLISTED'
                          ? 'YouTube Unlisted Stream'
                          : 'Direct SBO Studio Stream'}
                      </span>
                      <span aria-hidden="true">·</span>
                      <span className="text-zinc-400 tabular-nums">
                        {mod.durationMinutes} mins
                      </span>
                      {isDone && (
                        <>
                          <span aria-hidden="true">·</span>
                          <span className="text-[#F2FF00] font-bold">
                            COMPLETED
                          </span>
                        </>
                      )}
                    </div>
                    <h3 className="font-display text-xl font-black text-[#E9E3D5]">
                      {mod.title}
                    </h3>
                    <p className="text-zinc-400 text-sm max-w-3xl">
                      {mod.content.split('\n\n')[0]}
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() => navigate(`/learn/${mod.courseId}/${mod.id}`)}
                    className="px-5 py-3 bg-[#F2FF00] text-[#0D0D0D] font-mono text-xs font-bold border-2 border-[#E9E3D5] brutal-shadow-petrol hover:bg-[#173F46] hover:text-[#F2FF00] flex items-center gap-2 shrink-0 rounded-none cursor-pointer"
                  >
                    <Video className="w-4 h-4" />
                    <span>Watch Lecture</span>
                  </button>
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* 3. LIVE CLASSES */}
      {activeTab === 'live' && (
        <section aria-label="Live Interactive Classes" className="space-y-6">
          <div>
            <div className="font-mono text-xs text-[#F2FF00]">
              SYNCHRONOUS SESSIONS · SBO &amp; ANAIYUR FACULTY
            </div>
            <h2 className="font-display text-2xl font-black text-[#E9E3D5] mt-1">
              LIVE CLASSES &amp; DOUBT CLINICS ({liveClasses.length})
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-5">
            {liveClasses.map((session) => (
              <div
                key={session.id}
                className={`p-6 border-2 flex flex-col lg:flex-row lg:items-center justify-between gap-6 ${
                  session.status === 'LIVE_NOW'
                    ? 'bg-zinc-950 border-[#FF0000] brutal-shadow-crimson'
                    : 'bg-zinc-950 border-[#E9E3D5]'
                }`}
              >
                <div className="space-y-2">
                  <div className="font-mono text-xs flex flex-wrap items-center gap-2">
                    <span
                      className={`font-bold px-2 py-0.5 border ${
                        session.status === 'LIVE_NOW'
                          ? 'bg-[#FF0000] text-[#E9E3D5] border-[#E9E3D5]'
                          : 'bg-[#173F46] text-[#F2FF00] border-[#F2FF00]'
                      }`}
                    >
                      {session.status === 'LIVE_NOW' ? 'LIVE NOW' : 'UPCOMING'}
                    </span>
                    <span className="text-[#F2FF00] font-bold">
                      {session.programme}
                    </span>
                    <span aria-hidden="true">·</span>
                    <span className="text-zinc-300">{session.batchName}</span>
                    <span aria-hidden="true">·</span>
                    <span className="text-zinc-400">{session.branchName}</span>
                  </div>

                  <h3 className="font-display text-xl font-black text-[#E9E3D5]">
                    {session.title}
                  </h3>

                  <div className="font-mono text-xs text-zinc-400">
                    Faculty: <strong className="text-[#E9E3D5]">{session.teacherName}</strong> ·
                    Schedule: <strong className="text-[#F2FF00]">{session.scheduledAt}</strong> ·{' '}
                    {session.attendeeCount} Students Registered
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => navigate('/learn/crs_fullstack_01/mod_fs_101')}
                  className="px-6 py-3.5 bg-[#F2FF00] text-[#0D0D0D] font-mono text-xs font-bold border-2 border-[#E9E3D5] brutal-shadow-petrol hover:bg-[#173F46] hover:text-[#F2FF00] flex items-center gap-2 shrink-0 rounded-none cursor-pointer"
                >
                  <Radio className="w-4 h-4" />
                  <span>
                    {session.status === 'LIVE_NOW'
                      ? 'Join Live Stream Room'
                      : 'Enter Waiting Room'}
                  </span>
                </button>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* 4. STUDY MATERIALS (Supabase Storage PDFs & Worksheets) */}
      {activeTab === 'materials' && (
        <section aria-label="Study Materials and PDFs" className="space-y-6">
          <div>
            <div className="font-mono text-xs text-[#F2FF00]">
              SUPABASE STORAGE BUCKET · RLS PROTECTED PDF WORKBOOKS
            </div>
            <h2 className="font-display text-2xl font-black text-[#E9E3D5] mt-1">
              PDF NOTES, FORMULA SHEETS &amp; PYQ WORKBOOKS
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {modules.map((mod) => {
              const course = courses.find((c) => c.id === mod.courseId);
              const isDownloaded = downloadedPdfId === mod.id;
              return (
                <div
                  key={mod.id}
                  className="bg-zinc-950 border-2 border-[#E9E3D5] p-6 flex flex-col justify-between gap-5 brutal-shadow-petrol"
                >
                  <div className="space-y-2">
                    <div className="font-mono text-xs text-[#F2FF00] flex items-center justify-between">
                      <span>{course?.programme} · {course?.subject}</span>
                      <span className="text-zinc-400">{mod.pdfSizeLabel}</span>
                    </div>
                    <h3 className="font-display text-lg font-black text-[#E9E3D5]">
                      {mod.pdfTitle}
                    </h3>
                    <div className="font-mono text-xs text-zinc-400 truncate">
                      Bucket Path: {mod.pdfStoragePath}
                    </div>
                  </div>

                  <div className="pt-3 border-t border-zinc-800 flex items-center justify-between gap-3">
                    <span className="font-mono text-xs text-zinc-400">
                      Lesson: {mod.title}
                    </span>
                    <button
                      type="button"
                      onClick={() => setDownloadedPdfId(mod.id)}
                      className="px-4 py-2 bg-[#F2FF00] text-[#0D0D0D] font-mono text-xs font-bold border border-[#E9E3D5] hover:bg-[#173F46] hover:text-[#F2FF00] flex items-center gap-1.5 shrink-0 rounded-none cursor-pointer"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>
                        {isDownloaded ? 'Downloaded ✓' : 'Download PDF'}
                      </span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* 5. EXAMINATIONS (Timed CBT & Full-Length Mocks) */}
      {activeTab === 'exams' && (
        <section aria-label="Student Examinations" className="space-y-6">
          <div>
            <div className="font-mono text-xs text-[#F2FF00]">
              KANAVUGAL EXAMINATION ENGINE · TIMED CBT &amp; DESCRIPTIVE TESTS
            </div>
            <h2 className="font-display text-2xl font-black text-[#E9E3D5] mt-1">
              SCHEDULED EXAMINATIONS &amp; MOCK TESTS ({exams.length})
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-6">
            {exams.map((exam) => {
              const mySub = submissions.find(
                (s) => s.examId === exam.id && s.studentId === currentUser.id
              );

              return (
                <article
                  key={exam.id}
                  className="bg-zinc-950 border-2 border-[#E9E3D5] p-6 sm:p-8 flex flex-col lg:flex-row lg:items-center justify-between gap-6 brutal-shadow-yellow"
                >
                  <div className="space-y-3 max-w-3xl">
                    <div className="font-mono text-xs flex flex-wrap items-center gap-2 tabular-nums">
                      <span className="px-2 py-0.5 bg-[#173F46] text-[#F2FF00] border border-[#F2FF00] font-bold">
                        {exam.examType.replace(/_/g, ' ')}
                      </span>
                      <span className="text-[#F2FF00] font-bold">
                        {exam.programme}
                      </span>
                      <span aria-hidden="true">·</span>
                      <span>Branch: {exam.branchCode}</span>
                      <span aria-hidden="true">·</span>
                      <span>{exam.durationMinutes} Mins</span>
                      <span aria-hidden="true">·</span>
                      <span>Max Marks: {exam.totalMarks}</span>
                    </div>

                    <h3 className="font-display text-2xl font-black text-[#E9E3D5]">
                      {exam.title}
                    </h3>

                    <div className="font-mono text-xs text-zinc-300 space-y-1">
                      <div>
                        Subjects: <strong>{exam.subjects.join(' · ')}</strong> ·
                        Questions: <strong>{exam.questionIds.length}</strong> ·
                        Marking Scheme: <strong className="text-[#F2FF00]">+4 Correct / -1 Negative</strong>
                      </div>
                      <div>
                        Result Publication Status:{' '}
                        {exam.resultsReleased ? (
                          <strong className="text-[#F2FF00]">
                            RELEASED BY TEACHER ({exam.createdByTeacher})
                          </strong>
                        ) : (
                          <strong className="text-[#FF0000]">
                            WITHHELD — PENDING TEACHER RELEASE
                          </strong>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-3 shrink-0">
                    {mySub && exam.resultsReleased && (
                      <button
                        type="button"
                        onClick={() => setActiveTab('performance')}
                        className="px-4 py-3 bg-[#173F46] text-[#F2FF00] font-mono text-xs font-bold border-2 border-[#F2FF00] hover:bg-[#F2FF00] hover:text-[#0D0D0D] rounded-none cursor-pointer"
                      >
                        Score: {mySub.totalScore}/{mySub.maxScore} · View Report
                      </button>
                    )}

                    <button
                      type="button"
                      onClick={() => navigate(`/exam/${exam.id}`)}
                      className="px-6 py-3.5 bg-[#F2FF00] text-[#0D0D0D] font-mono text-xs font-bold border-2 border-[#E9E3D5] brutal-shadow-petrol hover:bg-[#173F46] hover:text-[#F2FF00] flex items-center gap-2 rounded-none cursor-pointer"
                    >
                      <Timer className="w-4 h-4" />
                      <span>
                        {mySub ? 'Retake / Inspect CBT Exam' : 'Start Timed Exam'}
                      </span>
                    </button>
                  </div>
                </article>
              );
            })}
          </div>
        </section>
      )}

      {/* 6. AUTOMATIC PERFORMANCE ANALYTICS */}
      {activeTab === 'performance' && (
        <section
          aria-label="Automatic Performance Analytics"
          className="space-y-8"
        >
          <div>
            <div className="font-mono text-xs text-[#F2FF00]">
              POST-EXAM TELEMETRY · SUBJECT, CHAPTER, ACCURACY &amp; TIME PER QUESTION
            </div>
            <h2 className="font-display text-2xl font-black text-[#E9E3D5] mt-1">
              STUDENT PERFORMANCE ANALYTICS
            </h2>
          </div>

          {studentSubmissions.map((sub) => {
            const exam = exams.find((e) => e.id === sub.examId) ?? exams[0];
            const examQuestions = questions.filter((q) =>
              exam.questionIds.includes(q.id)
            );
            const detailed = evaluateExamSubmission(
              examQuestions,
              sub.answers,
              sub.timeSpentSeconds,
              sub.descriptiveScore
            );
            const currentPct = Math.round((sub.totalScore / sub.maxScore) * 100);
            const trendDelta =
              sub.previousAttemptPct !== undefined
                ? currentPct - sub.previousAttemptPct
                : 12;

            if (!exam.resultsReleased) {
              return (
                <div
                  key={sub.id}
                  className="bg-zinc-950 border-2 border-[#FF0000] p-6 font-mono text-xs space-y-2"
                >
                  <div className="text-[#FF0000] font-bold">
                    RESULTS PENDING TEACHER RELEASE · {exam.title}
                  </div>
                  <p className="text-zinc-300">
                    Your attempt was recorded at {sub.submittedAt}. Detailed
                    subject and chapter analytics will unlock once{' '}
                    {exam.createdByTeacher} releases the batch results.
                  </p>
                </div>
              );
            }

            return (
              <div
                key={sub.id}
                className="bg-zinc-950 border-2 border-[#E9E3D5] p-6 sm:p-8 space-y-8 brutal-shadow-yellow"
              >
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b-2 border-zinc-800 pb-6">
                  <div>
                    <div className="font-mono text-xs text-[#F2FF00] font-bold">
                      RELEASED REPORT · SUBMITTED {sub.submittedAt}
                    </div>
                    <h3 className="font-display text-2xl font-black text-[#E9E3D5] mt-1">
                      {exam.title}
                    </h3>
                  </div>

                  {/* 4 Key Metrics */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 font-mono text-xs tabular-nums">
                    <div className="bg-[#0D0D0D] border border-zinc-700 p-3">
                      <div className="text-zinc-400">TOTAL SCORE</div>
                      <div className="text-lg font-bold text-[#F2FF00] mt-0.5">
                        {sub.totalScore} / {sub.maxScore}
                      </div>
                    </div>
                    <div className="bg-[#0D0D0D] border border-zinc-700 p-3">
                      <div className="text-zinc-400">ACCURACY</div>
                      <div className="text-lg font-bold text-[#E9E3D5] mt-0.5">
                        {detailed.accuracyPct}%
                      </div>
                    </div>
                    <div className="bg-[#0D0D0D] border border-zinc-700 p-3">
                      <div className="text-zinc-400">TOTAL TIME</div>
                      <div className="text-lg font-bold text-[#E9E3D5] mt-0.5">
                        {Math.round(detailed.totalTimeSeconds / 60)}m{' '}
                        {detailed.totalTimeSeconds % 60}s
                      </div>
                    </div>
                    <div className="bg-[#173F46] border border-[#F2FF00] p-3">
                      <div className="text-[#F2FF00]">PROGRESS TREND</div>
                      <div className="text-lg font-bold text-[#E9E3D5] mt-0.5">
                        {trendDelta >= 0 ? `+${trendDelta}%` : `${trendDelta}%`}{' '}
                        vs Last
                      </div>
                    </div>
                  </div>
                </div>

                {/* Subject-wise & Chapter-wise Breakdown */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* Subject Analysis */}
                  <div className="space-y-4">
                    <h4 className="font-mono text-xs font-bold text-[#F2FF00] tracking-wider">
                      01. SUBJECT-WISE PERFORMANCE ANALYSIS
                    </h4>
                    <div className="space-y-3">
                      {detailed.subjectBreakdown.map((s) => (
                        <div
                          key={s.subject}
                          className="bg-[#0D0D0D] border border-zinc-800 p-4 space-y-2"
                        >
                          <div className="flex items-center justify-between font-mono text-xs tabular-nums">
                            <span className="font-bold text-[#E9E3D5]">
                              {s.subject}
                            </span>
                            <span className="text-[#F2FF00]">
                              Score: {s.scoredMarks}/{s.maxMarks} · Accuracy:{' '}
                              {s.accuracyPct}%
                            </span>
                          </div>
                          <div className="w-full h-2.5 bg-zinc-900 border border-zinc-700">
                            <div
                              className="h-full bg-[#F2FF00]"
                              style={{ width: `${Math.max(0, s.accuracyPct)}%` }}
                            />
                          </div>
                          <div className="font-mono text-[11px] text-zinc-400 tabular-nums">
                            Correct: {s.correctCount} · Wrong (-1):{' '}
                            {s.wrongCount} · Unattempted: {s.unattemptedCount}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Chapter & Time Analysis */}
                  <div className="space-y-4">
                    <h4 className="font-mono text-xs font-bold text-[#F2FF00] tracking-wider">
                      02. CHAPTER &amp; TIME-PER-QUESTION ANALYSIS
                    </h4>
                    <div className="bg-[#0D0D0D] border border-zinc-800 overflow-x-auto">
                      <table className="w-full text-left font-mono text-xs tabular-nums">
                        <thead className="bg-zinc-950 border-b border-zinc-800 text-[#F2FF00]">
                          <tr>
                            <th className="py-2.5 px-3">CHAPTER</th>
                            <th className="py-2.5 px-3">SUBJECT</th>
                            <th className="py-2.5 px-3 text-right">ACCURACY</th>
                            <th className="py-2.5 px-3 text-right">AVG TIME</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-zinc-900">
                          {detailed.chapterBreakdown.map((ch) => (
                            <tr key={ch.chapter}>
                              <td className="py-2.5 px-3 text-[#E9E3D5] font-bold">
                                {ch.chapter}
                              </td>
                              <td className="py-2.5 px-3 text-zinc-400">
                                {ch.subject}
                              </td>
                              <td className="py-2.5 px-3 text-right text-[#F2FF00]">
                                {ch.accuracyPct}%
                              </td>
                              <td className="py-2.5 px-3 text-right text-zinc-300">
                                {ch.avgTimeSeconds}s / q
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </section>
      )}
    </div>
  );
};
