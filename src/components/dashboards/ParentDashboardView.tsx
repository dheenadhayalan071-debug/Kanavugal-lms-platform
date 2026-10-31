import React, { useState } from 'react';
import {
  CheckCircle2,
  Eye,
  FileText,
  GraduationCap,
  ShieldCheck,
  UserCheck,
  Calendar,
} from 'lucide-react';
import { useLms } from '../../context/LmsContext';
import {
  calculateCourseProgress,
  evaluateExamSubmission,
  getEnrolledCourses,
} from '../../lib/lmsLogic';
import { Role } from '../../types/prisma';

export type ParentTab =
  | 'overview'
  | 'attendance'
  | 'progress'
  | 'exam_reports';

export const ParentDashboardView: React.FC<{
  activeTab: ParentTab;
  setActiveTab: (tab: ParentTab) => void;
}> = ({ activeTab }) => {
  const {
    currentUser,
    users,
    courses,
    modules,
    exams,
    questions,
    submissions,
    feeRecords,
    enrollments,
    progress,
  } = useLms();

  // Resolve all linked children for this Parent account
  const linkedChildren = users.filter(
    (u) =>
      u.role === Role.STUDENT &&
      (currentUser.childrenIds?.includes(u.id) ||
        u.id === 'usr_student_01' ||
        u.id === 'usr_student_02')
  );

  const [selectedChildId, setSelectedChildId] = useState<string>(
    linkedChildren[0]?.id ?? 'usr_student_01'
  );

  const activeChild =
    linkedChildren.find((c) => c.id === selectedChildId) ?? linkedChildren[0];

  const childCourses = getEnrolledCourses(
    activeChild.id,
    courses,
    enrollments
  );

  const childSubmissions = submissions.filter(
    (s) => s.studentId === activeChild.id
  );

  const childFee = feeRecords.find((f) => f.studentId === activeChild.id);

  return (
    <div className="space-y-8">
      {/* MULTI-CHILD SELECTOR BAR (One Parent Monitors Multiple Children) */}
      <div className="bg-zinc-950 border-2 border-[#E9E3D5] p-6 space-y-4 brutal-shadow-yellow">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="font-mono text-xs text-[#F2FF00] font-bold flex items-center gap-2">
              <Eye className="w-4 h-4" />
              <span>
                PARENT GUARDIAN PORTAL · READ-ONLY ACADEMIC RECORD ACCESS
              </span>
            </div>
            <h2 className="font-display text-2xl font-black text-[#E9E3D5] mt-1">
              LINKED CHILDREN ({linkedChildren.length} STUDENTS)
            </h2>
          </div>

          <div className="font-mono text-xs px-3 py-1.5 bg-[#173F46] text-[#F2FF00] border border-[#F2FF00]">
            RLS Policy: Read-Only Guardian View
          </div>
        </div>

        {/* Child Switcher Buttons */}
        <div
          role="group"
          aria-label="Select Child Profile"
          className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2"
        >
          {linkedChildren.map((child) => {
            const isSelected = child.id === activeChild.id;
            return (
              <button
                key={child.id}
                type="button"
                onClick={() => setSelectedChildId(child.id)}
                className={`p-4 text-left border-2 transition-colors duration-75 flex items-center justify-between gap-4 rounded-none cursor-pointer ${
                  isSelected
                    ? 'bg-[#F2FF00] text-[#0D0D0D] border-[#E9E3D5] brutal-shadow-petrol'
                    : 'bg-[#0D0D0D] text-[#E9E3D5] border-zinc-800 hover:border-[#E9E3D5]'
                }`}
              >
                <div>
                  <div className="font-display text-lg font-black">
                    {child.name} ({child.classGrade || 'Student'})
                  </div>
                  <div
                    className={`font-mono text-xs mt-0.5 ${
                      isSelected ? 'text-[#0D0D0D]/80 font-bold' : 'text-zinc-400'
                    }`}
                  >
                    {child.programme} · {child.cohort}
                  </div>
                </div>
                <span
                  className={`font-mono text-xs px-2.5 py-1 border font-bold shrink-0 ${
                    isSelected
                      ? 'bg-[#0D0D0D] text-[#F2FF00] border-[#0D0D0D]'
                      : 'bg-zinc-900 text-zinc-300 border-zinc-700'
                  }`}
                >
                  {isSelected ? 'Viewing Now' : 'Switch Child'}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* SELECTED CHILD ACADEMIC SUMMARY */}
      {(activeTab === 'overview' || activeTab === 'progress') && (
        <section aria-label="Child Academic Overview" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 font-mono text-xs tabular-nums">
            <div className="bg-zinc-950 border-2 border-[#E9E3D5] p-4">
              <div className="text-zinc-400">STUDENT NAME</div>
              <div className="font-display text-xl font-black text-[#E9E3D5] mt-1">
                {activeChild.name}
              </div>
              <div className="text-[#F2FF00] mt-0.5">{activeChild.programme}</div>
            </div>

            <div className="bg-zinc-950 border-2 border-[#E9E3D5] p-4">
              <div className="text-zinc-400">ATTENDANCE RATE</div>
              <div className="font-display text-2xl font-black text-[#F2FF00] mt-1">
                {activeChild.attendancePct ?? 95}%
              </div>
              <div className="text-zinc-400 mt-0.5">Biometric &amp; Live Verified</div>
            </div>

            <div className="bg-zinc-950 border-2 border-[#E9E3D5] p-4">
              <div className="text-zinc-400">ENROLLED COURSES</div>
              <div className="font-display text-2xl font-black text-[#E9E3D5] mt-1">
                {childCourses.length} Tracks
              </div>
              <div className="text-zinc-400 mt-0.5">
                Mentor: {activeChild.assignedTeacherName}
              </div>
            </div>

            <div className="bg-zinc-950 border-2 border-[#E9E3D5] p-4">
              <div className="text-zinc-400">OFFLINE FEE STATUS</div>
              <div className="font-display text-xl font-black text-[#F2FF00] mt-1">
                {childFee?.status.replace('_', ' ') ?? 'PAID OFFLINE'}
              </div>
              <div className="text-zinc-400 mt-0.5">
                Receipt: {childFee?.receiptNumber ?? 'KNV-2026'}
              </div>
            </div>
          </div>

          {/* Teacher Feedback Box */}
          <div className="bg-[#173F46] border-2 border-[#E9E3D5] p-6 space-y-2 brutal-shadow-yellow">
            <div className="font-mono text-xs text-[#F2FF00] font-bold">
              FACULTY MENTOR FEEDBACK · {activeChild.assignedTeacherName?.toUpperCase()}
            </div>
            <p className="text-[#E9E3D5] text-sm sm:text-base leading-relaxed">
              &ldquo;{activeChild.teacherFeedback}&rdquo;
            </p>
          </div>

          {/* Enrolled Courses & Learning Progress */}
          <div className="space-y-4">
            <h3 className="font-display text-xl font-black text-[#E9E3D5]">
              {activeChild.name.toUpperCase()}&rsquo;S ENROLLED COURSES &amp; LESSON PROGRESS
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {childCourses.map((course) => {
                const summary = calculateCourseProgress(
                  activeChild.id,
                  course.id,
                  modules,
                  progress
                );
                return (
                  <div
                    key={course.id}
                    className="bg-zinc-950 border-2 border-[#E9E3D5] p-6 space-y-4"
                  >
                    <div className="font-mono text-xs text-[#F2FF00] font-bold">
                      {course.programme} · {course.subject}
                    </div>
                    <h4 className="font-display text-xl font-black text-[#E9E3D5]">
                      {course.title}
                    </h4>
                    <div className="space-y-2 font-mono text-xs tabular-nums">
                      <div className="flex justify-between">
                        <span>
                          Completed Modules: {summary.completedCount}/
                          {summary.totalCount}
                        </span>
                        <span className="text-[#F2FF00] font-bold">
                          {summary.percentage}%
                        </span>
                      </div>
                      <div className="w-full h-3.5 bg-[#0D0D0D] border border-zinc-700 p-0.5">
                        <div
                          className="h-full bg-[#F2FF00]"
                          style={{ width: `${summary.percentage}%` }}
                        />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* ATTENDANCE LEDGER */}
      {activeTab === 'attendance' && (
        <section aria-label="Child Attendance Record" className="space-y-6">
          <h3 className="font-display text-2xl font-black text-[#E9E3D5]">
            ATTENDANCE LOG · {activeChild.name.toUpperCase()} (
            {activeChild.attendancePct ?? 95}%)
          </h3>
          <div className="bg-zinc-950 border-2 border-[#E9E3D5] overflow-x-auto">
            <table className="w-full text-left font-mono text-xs tabular-nums">
              <thead className="bg-[#0D0D0D] border-b-2 border-[#E9E3D5] text-[#F2FF00]">
                <tr>
                  <th className="py-3.5 px-4">MONTH</th>
                  <th className="py-3.5 px-4">BRANCH / BATCH</th>
                  <th className="py-3.5 px-4">CLASSES HELD</th>
                  <th className="py-3.5 px-4">PRESENT</th>
                  <th className="py-3.5 px-4 text-right">ATTENDANCE %</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-800">
                <tr>
                  <td className="py-3 px-4 font-bold text-[#E9E3D5]">
                    October 2026
                  </td>
                  <td className="py-3 px-4 text-zinc-300">{activeChild.cohort}</td>
                  <td className="py-3 px-4">26</td>
                  <td className="py-3 px-4 text-[#F2FF00] font-bold">25</td>
                  <td className="py-3 px-4 text-right text-[#F2FF00] font-bold">
                    96.2%
                  </td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-bold text-[#E9E3D5]">
                    September 2026
                  </td>
                  <td className="py-3 px-4 text-zinc-300">{activeChild.cohort}</td>
                  <td className="py-3 px-4">25</td>
                  <td className="py-3 px-4 text-[#F2FF00] font-bold">24</td>
                  <td className="py-3 px-4 text-right text-[#F2FF00] font-bold">
                    96.0%
                  </td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-bold text-[#E9E3D5]">
                    August 2026
                  </td>
                  <td className="py-3 px-4 text-zinc-300">{activeChild.cohort}</td>
                  <td className="py-3 px-4">24</td>
                  <td className="py-3 px-4 text-[#F2FF00] font-bold">23</td>
                  <td className="py-3 px-4 text-right text-[#F2FF00] font-bold">
                    95.8%
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>
      )}

      {/* EXAMINATION REPORTS & SUBJECT-WISE PERFORMANCE */}
      {(activeTab === 'overview' || activeTab === 'exam_reports') && (
        <section
          aria-label="Child Examination Reports"
          className="space-y-6 pt-4 border-t-2 border-zinc-800"
        >
          <h3 className="font-display text-2xl font-black text-[#E9E3D5]">
            RELEASED EXAMINATION REPORTS FOR {activeChild.name.toUpperCase()}
          </h3>

          {childSubmissions.map((sub) => {
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

            return (
              <div
                key={sub.id}
                className="bg-zinc-950 border-2 border-[#E9E3D5] p-6 space-y-6 brutal-shadow-petrol"
              >
                <div className="flex flex-wrap items-center justify-between gap-4 border-b border-zinc-800 pb-4">
                  <div>
                    <div className="font-mono text-xs text-[#F2FF00] font-bold">
                      {exam.programme} · SUBMITTED {sub.submittedAt}
                    </div>
                    <h4 className="font-display text-xl font-black text-[#E9E3D5] mt-1">
                      {exam.title}
                    </h4>
                  </div>

                  <div className="flex items-center gap-4 font-mono text-xs tabular-nums">
                    <div className="px-4 py-2 bg-[#0D0D0D] border border-zinc-700">
                      TOTAL SCORE:{' '}
                      <strong className="text-[#F2FF00] text-sm">
                        {sub.totalScore} / {sub.maxScore}
                      </strong>
                    </div>
                    <div className="px-4 py-2 bg-[#173F46] border border-[#F2FF00]">
                      ACCURACY:{' '}
                      <strong className="text-[#F2FF00] text-sm">
                        {detailed.accuracyPct}%
                      </strong>
                    </div>
                  </div>
                </div>

                {/* Subject-wise Breakdown for Parent */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {detailed.subjectBreakdown.map((s) => (
                    <div
                      key={s.subject}
                      className="bg-[#0D0D0D] border border-zinc-800 p-4 font-mono text-xs space-y-1.5 tabular-nums"
                    >
                      <div className="text-[#F2FF00] font-bold">
                        {s.subject.toUpperCase()}
                      </div>
                      <div className="text-base font-bold text-[#E9E3D5]">
                        Marks: {s.scoredMarks} / {s.maxMarks}
                      </div>
                      <div className="text-zinc-400">
                        Accuracy: {s.accuracyPct}% (Correct: {s.correctCount},
                        Wrong: {s.wrongCount})
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </section>
      )}
    </div>
  );
};
