import React from 'react';
import { Award, ArrowUpRight, Clock } from 'lucide-react';
import { useLms } from '../../../../context/LmsContext';

const CBT_EXAMS = [
  {
    id: 'exm_jee_mock_01',
    code: 'NTA-JEE-MOCK-04',
    title: 'All-Academy JEE Main Full Syllabus CBT Mock Test #04',
    durationMinutes: 180,
    totalMarks: 300,
    defaultPositiveMarks: 4,
    defaultNegativeMarks: 1,
    scheduledStartAt: 'Live Today · Closes 11:00 PM IST',
    status: 'LIVE_NOW' as const,
    resultsReleased: true,
    submission: {
      totalScore: 246,
      maxScore: 300,
      accuracyPercentage: 91.2,
      correctCount: 63,
      incorrectCount: 6,
      totalTimeSpentSec: 9740,
      subjectBreakdown: [
        { subject: 'Physics', score: 86, maxScore: 100, accuracy: 92.0 },
        { subject: 'Chemistry', score: 78, maxScore: 100, accuracy: 88.5 },
        { subject: 'Mathematics', score: 82, maxScore: 100, accuracy: 93.1 },
      ],
    },
  },
  {
    id: 'exm_neet_mock_02',
    code: 'NTA-NEET-PART-07',
    title:
      'NEET UG Grand Test #07 — Electrostatics, Electrochemistry & Genetics',
    durationMinutes: 200,
    totalMarks: 720,
    defaultPositiveMarks: 4,
    defaultNegativeMarks: 1,
    scheduledStartAt: '03 Nov 2026 · 02:00 PM IST',
    status: 'UPCOMING' as const,
    resultsReleased: false,
  },
];

export const StudentExamsPage: React.FC = () => {
  const { navigate } = useLms();

  return (
    <div className="bg-[#0A0B0E] text-[#F3F4F6]">
      <header className="px-6 lg:px-10 py-8 border-b border-[#232734] bg-[#11131A] flex flex-col md:flex-row md:items-center md:justify-between gap-6">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-xs md:text-sm font-medium text-brand-champagne uppercase tracking-wider">
            <Award className="w-4 h-4" />
            <span>NTA-Pattern CBT Examination Center · /dashboard/student/exams</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight text-[#F3F4F6]">
            NTA CBT Examinations & Telemetry
          </h1>
          <p className="text-base text-[#9CA3AF]">
            Timed NEET UG, JEE Main & Advanced, and CBSE mock tests with +4 / -1
            marking and auto-submission
          </p>
        </div>

        <button
          type="button"
          onClick={() => navigate('/exam/exm_jee_mock_01/attempt')}
          className="inline-flex items-center gap-2 px-5 py-3 rounded-md bg-brand-champagne hover:bg-[#F1C48F] text-[#0A0B0E] text-sm font-semibold transition-colors"
        >
          <Clock className="w-4 h-4" />
          <span>Enter Active CBT Exam Hall</span>
        </button>
      </header>

      <div className="px-6 lg:px-10 py-10 space-y-8 max-w-7xl">
        {CBT_EXAMS.map((exam) => (
          <div
            key={exam.id}
            className="bg-[#13161F] border border-[#232734] rounded-lg p-6 md:p-8 space-y-6"
          >
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
              <div className="space-y-2.5">
                <div className="flex flex-wrap items-center gap-3 text-xs md:text-sm font-medium text-[#9CA3AF] uppercase tracking-wider">
                  <span className="font-mono px-2.5 py-1 rounded bg-[#0A0B0E] text-brand-champagne border border-[#232734]">
                    {exam.code}
                  </span>
                  <span className="font-mono text-[#3B82F6]">
                    Duration: {exam.durationMinutes} mins
                  </span>
                  <span className="font-mono">Max Marks: {exam.totalMarks}</span>
                  <span className="font-mono text-[#F3F4F6] bg-[#0A0B0E] px-2.5 py-1 rounded border border-[#232734]">
                    +{exam.defaultPositiveMarks} Correct / -
                    {exam.defaultNegativeMarks} Incorrect
                  </span>
                </div>

                <h2 className="text-xl md:text-2xl font-semibold tracking-tight text-[#F3F4F6]">
                  {exam.title}
                </h2>

                <p className="text-base text-[#9CA3AF]">
                  {exam.scheduledStartAt}
                </p>
              </div>

              <div className="flex items-center gap-3 shrink-0">
                <button
                  type="button"
                  onClick={() => navigate(`/exam/${exam.id}/attempt`)}
                  className="px-5 py-3 rounded-md bg-brand-champagne hover:bg-[#F1C48F] text-[#0A0B0E] text-sm font-semibold inline-flex items-center gap-2 transition-colors"
                >
                  <span>
                    {exam.status === 'LIVE_NOW'
                      ? 'Attempt / Resume CBT Exam'
                      : 'Open Exam Instructions'}
                  </span>
                  <ArrowUpRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {exam.resultsReleased && exam.submission && (
              <div className="pt-6 border-t border-[#232734] space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                  <div className="bg-[#0A0B0E] border border-[#232734] rounded-md p-5 space-y-2">
                    <p className="text-xs md:text-sm font-medium text-[#9CA3AF] uppercase tracking-wider">
                      Total Score
                    </p>
                    <p className="font-mono text-4xl md:text-5xl font-bold tracking-tight text-brand-champagne">
                      {exam.submission.totalScore}/{exam.submission.maxScore}
                    </p>
                  </div>
                  <div className="bg-[#0A0B0E] border border-[#232734] rounded-md p-5 space-y-2">
                    <p className="text-xs md:text-sm font-medium text-[#9CA3AF] uppercase tracking-wider">
                      Net Accuracy
                    </p>
                    <p className="font-mono text-4xl md:text-5xl font-bold tracking-tight text-brand-champagne">
                      {exam.submission.accuracyPercentage}%
                    </p>
                  </div>
                  <div className="bg-[#0A0B0E] border border-[#232734] rounded-md p-5 space-y-2">
                    <p className="text-xs md:text-sm font-medium text-[#9CA3AF] uppercase tracking-wider">
                      Attempt Split
                    </p>
                    <p className="font-mono text-base font-semibold text-[#3B82F6] pt-2">
                      {exam.submission.correctCount} Correct ·{' '}
                      {exam.submission.incorrectCount} Wrong
                    </p>
                  </div>
                  <div className="bg-[#0A0B0E] border border-[#232734] rounded-md p-5 space-y-2">
                    <p className="text-xs md:text-sm font-medium text-[#9CA3AF] uppercase tracking-wider">
                      Time Taken
                    </p>
                    <p className="font-mono text-4xl md:text-5xl font-bold tracking-tight text-brand-champagne">
                      {Math.round(exam.submission.totalTimeSpentSec / 60)}m
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {exam.submission.subjectBreakdown.map((sub) => (
                    <div
                      key={sub.subject}
                      className="bg-[#0A0B0E] border border-[#232734] rounded-md p-4 flex items-center justify-between"
                    >
                      <div>
                        <p className="text-base font-semibold text-[#F3F4F6]">
                          {sub.subject}
                        </p>
                        <p className="font-mono text-xs md:text-sm font-medium text-[#3B82F6] uppercase tracking-wider">
                          Accuracy: {sub.accuracy}%
                        </p>
                      </div>
                      <span className="font-mono text-xl font-bold text-brand-champagne">
                        {sub.score}/{sub.maxScore}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default StudentExamsPage;
