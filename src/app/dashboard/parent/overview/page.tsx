import React, { useState } from 'react';
import { ShieldCheck, Award } from 'lucide-react';
import { LINKED_CHILDREN } from '../data';

export const ParentOverviewPage: React.FC = () => {
  const [selectedChildId, setSelectedChildId] = useState<string>(
    LINKED_CHILDREN[0].id
  );
  const activeChild =
    LINKED_CHILDREN.find((c) => c.id === selectedChildId) || LINKED_CHILDREN[0];

  return (
    <div className="bg-[#080808] text-[#F5F3EF]">
      <header className="px-6 lg:px-10 py-8 border-b border-[#292929] bg-[#080808] flex flex-col md:flex-row md:items-center md:justify-between gap-6">
        <div className="space-y-2">
          <div className="flex flex-wrap items-center gap-2 text-xs md:text-sm font-medium text-[#A1A1AA] uppercase tracking-wider">
            <span className="inline-flex items-center gap-1.5 text-[#FF4B00]">
              <ShieldCheck className="w-4 h-4" />
              Read-Only Guardian Overview
            </span>
            <span>•</span>
            <span>Guardian: Rajan Sundaram</span>
            <span>•</span>
            <span className="font-mono text-[#F5F3EF]">
              {LINKED_CHILDREN.length} Children Linked
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight text-[#F5F3EF]">
            Academic Progress & NTA Mock Reports
          </h1>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          {LINKED_CHILDREN.map((child) => {
            const isSelected = child.id === activeChild.id;
            return (
              <button
                key={child.id}
                type="button"
                onClick={() => setSelectedChildId(child.id)}
                className={`px-4 py-2.5 rounded-md text-sm font-medium border transition-colors flex items-center gap-2.5 ${
                  isSelected
                    ? 'bg-[#FF4B00] text-[#F5F3EF] border-[#FF4B00]'
                    : 'bg-[#111111] text-[#A1A1AA] border-[#292929] hover:text-[#F5F3EF]'
                }`}
              >
                <span>{child.fullName}</span>
                <span
                  className={`font-mono text-xs px-2 py-0.5 rounded ${
                    isSelected
                      ? 'bg-[#080808]/30 text-[#F5F3EF]'
                      : 'bg-[#080808] text-[#A1A1AA]'
                  }`}
                >
                  {child.classLevel} · {child.campus}
                </span>
              </button>
            );
          })}
        </div>
      </header>

      <div className="px-6 lg:px-10 py-10 space-y-12 max-w-7xl">
        {/* Selected Child Overview Banner */}
        <section className="bg-[#111111] border border-[#292929] rounded-lg p-6 md:p-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="space-y-2">
            <p className="text-xs md:text-sm font-medium text-[#A1A1AA] uppercase tracking-wider">
              Selected Scholar
            </p>
            <p className="text-xl md:text-2xl font-semibold tracking-tight text-[#F5F3EF]">
              {activeChild.fullName}
            </p>
            <p className="font-mono text-sm text-[#FF4B00]">
              Roll: {activeChild.rollNumber}
            </p>
          </div>

          <div className="space-y-2">
            <p className="text-xs md:text-sm font-medium text-[#A1A1AA] uppercase tracking-wider">
              Enrolled Batch & Campus
            </p>
            <p className="font-mono text-xl md:text-2xl font-semibold tracking-tight text-[#F5F3EF]">
              {activeChild.batchCode}
            </p>
            <p className="text-base text-[#F5F3EF]">
              {activeChild.campus} · {activeChild.trackLabel}
            </p>
          </div>

          <div className="space-y-2">
            <p className="text-xs md:text-sm font-medium text-[#A1A1AA] uppercase tracking-wider">
              Campus Attendance
            </p>
            <p className="font-mono text-4xl md:text-5xl font-bold tracking-tight text-[#FF4B00]">
              {activeChild.attendancePercentage}%
            </p>
            <p className="font-mono text-sm text-[#F5F3EF]">
              {activeChild.presentDays} / {activeChild.totalDays} Days Present
            </p>
          </div>

          <div className="space-y-2">
            <p className="text-xs md:text-sm font-medium text-[#A1A1AA] uppercase tracking-wider">
              Latest NTA Mock Score
            </p>
            <p className="font-mono text-4xl md:text-5xl font-bold tracking-tight text-[#FF4B00]">
              {activeChild.recentMockResults[0].totalScore}/
              {activeChild.recentMockResults[0].maxScore}
            </p>
            <p className="text-base text-[#F5F3EF]">
              {activeChild.recentMockResults[0].campusRank}
            </p>
          </div>
        </section>

        {/* Released Examination & NTA Mock Test Reports */}
        <section className="space-y-6">
          <div className="space-y-1">
            <h2 className="text-xl md:text-2xl font-semibold tracking-tight text-[#F5F3EF]">
              Released Examination & NTA Mock Test Reports
            </h2>
            <p className="text-base text-[#A1A1AA]">
              Read-only performance analytics and faculty remarks for{' '}
              {activeChild.fullName}
            </p>
          </div>

          <div className="space-y-6">
            {activeChild.recentMockResults.map((res) => (
              <div
                key={res.examCode}
                className="bg-[#111111] border border-[#292929] rounded-lg p-6 md:p-8 space-y-6"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="space-y-2">
                    <div className="flex flex-wrap items-center gap-3 text-xs md:text-sm font-medium text-[#A1A1AA] uppercase tracking-wider">
                      <span className="font-mono px-2.5 py-1 rounded bg-[#080808] text-[#FF4B00] border border-[#292929]">
                        {res.examCode}
                      </span>
                      <span className="font-mono">Conducted: {res.date}</span>
                      <span className="font-mono text-[#F5F3EF] bg-[#080808] px-2.5 py-1 rounded border border-[#292929]">
                        {res.campusRank}
                      </span>
                    </div>
                    <h3 className="text-xl md:text-2xl font-semibold tracking-tight text-[#F5F3EF]">
                      {res.examTitle}
                    </h3>
                  </div>

                  <div className="flex items-center gap-6 shrink-0">
                    <div className="text-right space-y-1">
                      <p className="text-xs md:text-sm font-medium text-[#A1A1AA] uppercase tracking-wider">
                        Total Marks
                      </p>
                      <p className="font-mono text-4xl md:text-5xl font-bold tracking-tight text-[#FF4B00]">
                        {res.totalScore}/{res.maxScore}
                      </p>
                    </div>
                    <div className="text-right pl-6 border-l border-[#292929] space-y-1">
                      <p className="text-xs md:text-sm font-medium text-[#A1A1AA] uppercase tracking-wider">
                        Accuracy
                      </p>
                      <p className="font-mono text-4xl md:text-5xl font-bold tracking-tight text-[#FF4B00]">
                        {res.accuracyPct}%
                      </p>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {res.subjectScores.map((sub) => (
                    <div
                      key={sub.subject}
                      className="bg-[#080808] border border-[#292929] rounded-md p-4 flex items-center justify-between"
                    >
                      <span className="text-base font-medium text-[#F5F3EF]">
                        {sub.subject}
                      </span>
                      <span className="font-mono text-lg font-bold text-[#FF4B00]">
                        {sub.score}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="bg-[#080808] border border-[#292929] rounded-md p-4 flex items-start gap-3">
                  <Award className="w-5 h-5 text-[#FF4B00] shrink-0 mt-0.5" />
                  <p className="text-base text-[#F5F3EF] leading-relaxed">
                    <strong className="text-[#FF4B00]">
                      Mentor Feedback ({activeChild.mentorName}):
                    </strong>{' '}
                    {res.teacherRemark}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default ParentOverviewPage;
