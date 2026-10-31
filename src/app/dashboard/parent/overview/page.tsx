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
    <div className="bg-[#0A0B0E] text-[#F3F4F6]">
      <header className="px-6 lg:px-10 py-8 border-b border-[#232734] bg-[#11131A] flex flex-col md:flex-row md:items-center md:justify-between gap-6">
        <div className="space-y-2">
          <div className="flex flex-wrap items-center gap-2 text-xs md:text-sm font-medium text-[#9CA3AF] uppercase tracking-wider">
            <span className="inline-flex items-center gap-1.5 text-brand-champagne">
              <ShieldCheck className="w-4 h-4" />
              Read-Only Guardian Overview
            </span>
            <span>•</span>
            <span>Guardian: Rajan Sundaram</span>
            <span>•</span>
            <span className="font-mono text-[#3B82F6]">
              {LINKED_CHILDREN.length} Children Linked
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight text-[#F3F4F6]">
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
                className={`px-4 py-2.5 rounded-md text-sm font-semibold border transition-colors flex items-center gap-2.5 ${
                  isSelected
                    ? 'bg-brand-champagne text-[#0A0B0E] border-brand-champagne'
                    : 'bg-[#13161F] text-[#9CA3AF] border-[#232734] hover:text-[#F3F4F6]'
                }`}
              >
                <span>{child.fullName}</span>
                <span
                  className={`font-mono text-xs px-2 py-0.5 rounded ${
                    isSelected
                      ? 'bg-[#0A0B0E]/20 text-[#0A0B0E]'
                      : 'bg-[#0A0B0E] text-[#9CA3AF]'
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
        <section className="bg-[#13161F] border border-[#232734] rounded-lg p-6 md:p-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="space-y-2">
            <p className="text-xs md:text-sm font-medium text-[#9CA3AF] uppercase tracking-wider">
              Selected Scholar
            </p>
            <p className="text-xl md:text-2xl font-semibold tracking-tight text-[#F3F4F6]">
              {activeChild.fullName}
            </p>
            <p className="font-mono text-sm text-[#3B82F6]">
              Roll: {activeChild.rollNumber}
            </p>
          </div>

          <div className="space-y-2">
            <p className="text-xs md:text-sm font-medium text-[#9CA3AF] uppercase tracking-wider">
              Enrolled Batch & Campus
            </p>
            <p className="font-mono text-xl md:text-2xl font-semibold tracking-tight text-[#F3F4F6]">
              {activeChild.batchCode}
            </p>
            <p className="text-base text-[#F3F4F6]">
              {activeChild.campus} · {activeChild.trackLabel}
            </p>
          </div>

          <div className="space-y-2">
            <p className="text-xs md:text-sm font-medium text-[#9CA3AF] uppercase tracking-wider">
              Campus Attendance
            </p>
            <p className="font-mono text-4xl md:text-5xl font-bold tracking-tight text-brand-champagne">
              {activeChild.attendancePercentage}%
            </p>
            <p className="font-mono text-sm text-[#F3F4F6]">
              {activeChild.presentDays} / {activeChild.totalDays} Days Present
            </p>
          </div>

          <div className="space-y-2">
            <p className="text-xs md:text-sm font-medium text-[#9CA3AF] uppercase tracking-wider">
              Latest NTA Mock Score
            </p>
            <p className="font-mono text-4xl md:text-5xl font-bold tracking-tight text-brand-champagne">
              {activeChild.recentMockResults[0].totalScore}/
              {activeChild.recentMockResults[0].maxScore}
            </p>
            <p className="text-base text-[#3B82F6]">
              {activeChild.recentMockResults[0].campusRank}
            </p>
          </div>
        </section>

        {/* Released Examination & NTA Mock Test Reports */}
        <section className="space-y-6">
          <div className="space-y-1">
            <h2 className="text-xl md:text-2xl font-semibold tracking-tight text-[#F3F4F6]">
              Released Examination & NTA Mock Test Reports
            </h2>
            <p className="text-base text-[#9CA3AF]">
              Read-only performance analytics and faculty remarks for{' '}
              {activeChild.fullName}
            </p>
          </div>

          <div className="space-y-6">
            {activeChild.recentMockResults.map((res) => (
              <div
                key={res.examCode}
                className="bg-[#13161F] border border-[#232734] rounded-lg p-6 md:p-8 space-y-6"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="space-y-2">
                    <div className="flex flex-wrap items-center gap-3 text-xs md:text-sm font-medium text-[#9CA3AF] uppercase tracking-wider">
                      <span className="font-mono px-2.5 py-1 rounded bg-[#0A0B0E] text-brand-champagne border border-[#232734]">
                        {res.examCode}
                      </span>
                      <span className="font-mono">Conducted: {res.date}</span>
                      <span className="font-mono text-[#3B82F6] bg-[#0A0B0E] px-2.5 py-1 rounded border border-[#232734]">
                        {res.campusRank}
                      </span>
                    </div>
                    <h3 className="text-xl md:text-2xl font-semibold tracking-tight text-[#F3F4F6]">
                      {res.examTitle}
                    </h3>
                  </div>

                  <div className="flex items-center gap-6 shrink-0">
                    <div className="text-right space-y-1">
                      <p className="text-xs md:text-sm font-medium text-[#9CA3AF] uppercase tracking-wider">
                        Total Marks
                      </p>
                      <p className="font-mono text-4xl md:text-5xl font-bold tracking-tight text-brand-champagne">
                        {res.totalScore}/{res.maxScore}
                      </p>
                    </div>
                    <div className="text-right pl-6 border-l border-[#232734] space-y-1">
                      <p className="text-xs md:text-sm font-medium text-[#9CA3AF] uppercase tracking-wider">
                        Accuracy
                      </p>
                      <p className="font-mono text-4xl md:text-5xl font-bold tracking-tight text-brand-champagne">
                        {res.accuracyPct}%
                      </p>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {res.subjectScores.map((sub) => (
                    <div
                      key={sub.subject}
                      className="bg-[#0A0B0E] border border-[#232734] rounded-md p-4 flex items-center justify-between"
                    >
                      <span className="text-base font-medium text-[#F3F4F6]">
                        {sub.subject}
                      </span>
                      <span className="font-mono text-lg font-bold text-brand-champagne">
                        {sub.score}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="bg-[#0A0B0E] border border-[#232734] rounded-md p-4 flex items-start gap-3">
                  <Award className="w-5 h-5 text-brand-champagne shrink-0 mt-0.5" />
                  <p className="text-base text-[#F3F4F6] leading-relaxed">
                    <strong className="text-brand-champagne">
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
