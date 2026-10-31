import React, { useState } from 'react';
import { CalendarCheck } from 'lucide-react';
import { LINKED_CHILDREN } from '../data';

export const ParentAttendancePage: React.FC = () => {
  const [selectedChildId, setSelectedChildId] = useState<string>(
    LINKED_CHILDREN[0].id
  );
  const activeChild =
    LINKED_CHILDREN.find((c) => c.id === selectedChildId) || LINKED_CHILDREN[0];

  return (
    <div className="bg-[#0A0B0E] text-[#F3F4F6]">
      <header className="px-6 lg:px-10 py-6 border-b border-[#232734] bg-[#11131A] flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-xs text-brand-champagne font-medium">
            <CalendarCheck className="w-3.5 h-3.5" />
            <span>Classroom & CBT Attendance Log · /dashboard/parent/attendance</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight text-[#F3F4F6]">
            Scholar Attendance Monitor ({activeChild.attendancePercentage}%)
          </h1>
          <p className="text-xs text-[#9CA3AF]">
            Daily lecture and examination attendance records for{' '}
            {activeChild.fullName}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {LINKED_CHILDREN.map((child) => {
            const isSelected = child.id === activeChild.id;
            return (
              <button
                key={child.id}
                type="button"
                onClick={() => setSelectedChildId(child.id)}
                className={`px-3.5 py-2 rounded-md text-xs font-semibold border transition-colors ${
                  isSelected
                    ? 'bg-brand-champagne text-[#0A0B0E] border-brand-champagne'
                    : 'bg-[#13161F] text-[#9CA3AF] border-[#232734] hover:text-[#F3F4F6]'
                }`}
              >
                {child.fullName} ({child.campus})
              </button>
            );
          })}
        </div>
      </header>

      <div className="px-6 lg:px-10 py-8 space-y-6 max-w-7xl">
        {/* Attendance KPIs */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-[#13161F] border border-[#232734] rounded-lg p-5">
            <p className="text-xs text-[#9CA3AF]">Cumulative Attendance Rate</p>
            <p className="font-mono text-2xl font-semibold text-brand-champagne mt-1">
              {activeChild.attendancePercentage}%
            </p>
          </div>
          <div className="bg-[#13161F] border border-[#232734] rounded-lg p-5">
            <p className="text-xs text-[#9CA3AF]">Sessions Attended</p>
            <p className="font-mono text-2xl font-semibold text-[#F3F4F6] mt-1">
              {activeChild.presentDays} / {activeChild.totalDays}
            </p>
          </div>
          <div className="bg-[#13161F] border border-[#232734] rounded-lg p-5">
            <p className="text-xs text-[#9CA3AF]">Assigned Batch</p>
            <p className="font-mono text-lg font-semibold text-[#3B82F6] mt-1">
              {activeChild.batchCode}
            </p>
          </div>
        </div>

        {/* Session Log */}
        <div className="bg-[#13161F] border border-[#232734] rounded-lg p-6 space-y-4">
          <h2 className="text-base font-semibold text-[#F3F4F6]">
            Recent Classroom & CBT Attendance Entries
          </h2>
          <div className="space-y-3">
            {activeChild.recentAttendanceLog.map((att, idx) => (
              <div
                key={idx}
                className="bg-[#0A0B0E] border border-[#232734] rounded-md p-4 flex items-center justify-between gap-3"
              >
                <div>
                  <p className="text-sm font-medium text-[#F3F4F6]">
                    {att.session}
                  </p>
                  <p className="font-mono text-xs text-[#9CA3AF] mt-0.5">
                    {att.date} · Batch {activeChild.batchCode} ·{' '}
                    {activeChild.campus}
                  </p>
                </div>
                <span className="font-mono text-xs px-3 py-1 rounded bg-[#13161F] border border-[#232734] text-brand-champagne">
                  {att.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ParentAttendancePage;
