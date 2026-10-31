import React, { useState } from 'react';
import { CalendarCheck, CheckCircle2, Users } from 'lucide-react';

interface AttendanceStudentRow {
  id: string;
  fullName: string;
  rollNumber: string;
  batchCode: string;
  campus: 'SBO Colony' | 'Anaiyur';
  status: 'PRESENT' | 'ABSENT';
}

const INITIAL_ROSTER: AttendanceStudentRow[] = [
  {
    id: 'stu_01',
    fullName: 'Kavin Rajan',
    rollNumber: 'KA-SBO-26-0142',
    batchCode: 'SBO-JEE-2027-A',
    campus: 'SBO Colony',
    status: 'PRESENT',
  },
  {
    id: 'stu_02',
    fullName: 'Arjun Narayanan',
    rollNumber: 'KA-SBO-26-0158',
    batchCode: 'SBO-JEE-2027-A',
    campus: 'SBO Colony',
    status: 'PRESENT',
  },
  {
    id: 'stu_03',
    fullName: 'Siddharth Venkataraman',
    rollNumber: 'KA-SBO-26-0164',
    batchCode: 'SBO-JEE-2027-A',
    campus: 'SBO Colony',
    status: 'ABSENT',
  },
  {
    id: 'stu_04',
    fullName: 'Meera Krishnan',
    rollNumber: 'KA-SBO-26-0179',
    batchCode: 'SBO-JEE-2027-A',
    campus: 'SBO Colony',
    status: 'PRESENT',
  },
  {
    id: 'stu_05',
    fullName: 'Pranav Muthukumar',
    rollNumber: 'KA-SBO-26-0195',
    batchCode: 'SBO-NEET-2027-B',
    campus: 'SBO Colony',
    status: 'PRESENT',
  },
  {
    id: 'stu_06',
    fullName: 'Harini Balasubramanian',
    rollNumber: 'KA-ANA-26-0211',
    batchCode: 'ANA-CBSE-2027-A',
    campus: 'Anaiyur',
    status: 'PRESENT',
  },
  {
    id: 'stu_07',
    fullName: 'Vigneshwaran Sundar',
    rollNumber: 'KA-SBO-26-0224',
    batchCode: 'SBO-NEET-2027-B',
    campus: 'SBO Colony',
    status: 'PRESENT',
  },
  {
    id: 'stu_08',
    fullName: 'Deepika Padmanabhan',
    rollNumber: 'KA-ANA-26-0238',
    batchCode: 'ANA-CBSE-2027-A',
    campus: 'Anaiyur',
    status: 'PRESENT',
  },
  {
    id: 'stu_09',
    fullName: 'Rohan Thirumalai',
    rollNumber: 'KA-SBO-26-0245',
    batchCode: 'SBO-JEE-2027-A',
    campus: 'SBO Colony',
    status: 'PRESENT',
  },
];

export const TeacherAttendancePage: React.FC = () => {
  const [roster, setRoster] = useState<AttendanceStudentRow[]>(INITIAL_ROSTER);
  const [selectedRosterBatch, setSelectedRosterBatch] = useState<string>('ALL');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleSetAttendance = (
    studentId: string,
    status: 'PRESENT' | 'ABSENT'
  ) => {
    setRoster((prev) =>
      prev.map((row) => {
        if (row.id !== studentId) return row;
        triggerToast(`Marked ${row.fullName} (${row.rollNumber}) as ${status}.`);
        return { ...row, status };
      })
    );
  };

  const handleMarkAllPresent = () => {
    setRoster((prev) =>
      prev.map((row) =>
        selectedRosterBatch === 'ALL' || row.batchCode === selectedRosterBatch
          ? { ...row, status: 'PRESENT' }
          : row
      )
    );
    triggerToast('Marked all displayed scholars as PRESENT.');
  };

  const filteredRoster =
    selectedRosterBatch === 'ALL'
      ? roster
      : roster.filter((r) => r.batchCode === selectedRosterBatch);

  const presentTotal = filteredRoster.filter(
    (r) => r.status === 'PRESENT'
  ).length;
  const absentTotal = filteredRoster.length - presentTotal;

  return (
    <div className="bg-[#0A0B0E] text-[#F3F4F6]">
      {toastMessage && (
        <div className="fixed bottom-8 right-6 z-50 max-w-md bg-[#13161F] border border-brand-champagne rounded-lg px-4 py-3 shadow-2xl flex items-center gap-3">
          <CheckCircle2 className="w-4 h-4 text-brand-champagne shrink-0" />
          <p className="text-xs text-[#F3F4F6]">{toastMessage}</p>
        </div>
      )}

      <header className="px-6 lg:px-10 py-6 border-b border-[#232734] bg-[#11131A] flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-xs text-brand-champagne font-medium">
            <CalendarCheck className="w-3.5 h-3.5" />
            <span>Daily Classroom Roll Call · /dashboard/teacher/attendance</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight text-[#F3F4F6]">
            Batch Attendance Roster
          </h1>
          <p className="text-xs text-[#9CA3AF]">
            Mark scholars as Present or Absent for today’s session (synced with Parent & Admin portals)
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <select
            value={selectedRosterBatch}
            onChange={(e) => setSelectedRosterBatch(e.target.value)}
            className="bg-[#13161F] border border-[#232734] rounded-md px-3 py-2 text-xs font-mono text-[#F3F4F6] focus:outline-none focus:border-brand-champagne"
          >
            <option value="ALL">All Batches ({roster.length} Scholars)</option>
            <option value="SBO-JEE-2027-A">SBO-JEE-2027-A</option>
            <option value="SBO-NEET-2027-B">SBO-NEET-2027-B</option>
            <option value="ANA-CBSE-2027-A">ANA-CBSE-2027-A</option>
          </select>

          <button
            type="button"
            onClick={handleMarkAllPresent}
            className="px-3.5 py-2 rounded-md bg-[#13161F] hover:bg-[#191D28] text-[#F3F4F6] border border-[#232734] hover:border-brand-champagne text-xs font-medium transition-colors"
          >
            Mark All Present
          </button>

          <button
            type="button"
            onClick={() =>
              triggerToast(
                `Saved today's attendance (${presentTotal} Present, ${absentTotal} Absent) to PostgreSQL.`
              )
            }
            className="px-4 py-2 rounded-md bg-brand-champagne hover:bg-[#F1C48F] text-[#0A0B0E] text-xs font-semibold inline-flex items-center gap-1.5 transition-colors"
          >
            <CalendarCheck className="w-3.5 h-3.5" />
            <span>Save Batch Attendance</span>
          </button>
        </div>
      </header>

      <div className="px-6 lg:px-10 py-8 space-y-6 max-w-7xl">
        {/* Summary Strip */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-[#13161F] border border-[#232734] rounded-lg p-4 flex items-center justify-between">
            <div>
              <p className="text-xs text-[#9CA3AF]">Total Roster Scholars</p>
              <p className="font-mono text-xl font-semibold text-[#F3F4F6] mt-0.5">
                {filteredRoster.length}
              </p>
            </div>
            <Users className="w-5 h-5 text-brand-champagne" />
          </div>

          <div className="bg-[#13161F] border border-[#232734] rounded-lg p-4 flex items-center justify-between">
            <div>
              <p className="text-xs text-[#9CA3AF]">Marked Present Today</p>
              <p className="font-mono text-xl font-semibold text-brand-champagne mt-0.5">
                {presentTotal}
              </p>
            </div>
            <span className="font-mono text-xs px-2.5 py-1 rounded bg-[#0A0B0E] border border-[#232734] text-brand-champagne">
              PRESENT
            </span>
          </div>

          <div className="bg-[#13161F] border border-[#232734] rounded-lg p-4 flex items-center justify-between">
            <div>
              <p className="text-xs text-[#9CA3AF]">Marked Absent Today</p>
              <p className="font-mono text-xl font-semibold text-[#F3F4F6] mt-0.5">
                {absentTotal}
              </p>
            </div>
            <span className="font-mono text-xs px-2.5 py-1 rounded bg-[#0A0B0E] border border-[#232734] text-[#9CA3AF]">
              ABSENT
            </span>
          </div>
        </div>

        {/* Attendance Roster Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredRoster.map((student) => {
            const isPresent = student.status === 'PRESENT';
            return (
              <div
                key={student.id}
                className="bg-[#13161F] border border-[#232734] rounded-lg p-5 flex flex-col justify-between space-y-4"
              >
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h3 className="text-sm font-semibold text-[#F3F4F6]">
                      {student.fullName}
                    </h3>
                    <p className="font-mono text-xs text-[#3B82F6] mt-0.5">
                      {student.rollNumber}
                    </p>
                    <p className="text-[11px] text-[#9CA3AF] mt-1">
                      Campus: {student.campus}
                    </p>
                  </div>
                  <span className="font-mono text-[11px] px-2 py-0.5 rounded bg-[#0A0B0E] border border-[#232734] text-brand-champagne">
                    {student.batchCode}
                  </span>
                </div>

                <div className="pt-3 border-t border-[#232734] flex items-center justify-between gap-2">
                  <span className="font-mono text-[11px] text-[#9CA3AF]">
                    Status:{' '}
                    <strong className="text-[#F3F4F6]">{student.status}</strong>
                  </span>

                  <div className="flex items-center gap-1.5">
                    <button
                      type="button"
                      onClick={() => handleSetAttendance(student.id, 'PRESENT')}
                      className={`px-3 py-1.5 rounded-md text-xs font-semibold border transition-colors ${
                        isPresent
                          ? 'bg-brand-champagne text-[#0A0B0E] border-brand-champagne'
                          : 'bg-[#0A0B0E] text-[#9CA3AF] border-[#232734] hover:text-[#F3F4F6]'
                      }`}
                    >
                      Present
                    </button>
                    <button
                      type="button"
                      onClick={() => handleSetAttendance(student.id, 'ABSENT')}
                      className={`px-3 py-1.5 rounded-md text-xs font-medium border transition-colors ${
                        !isPresent
                          ? 'bg-[#0A0B0E] text-brand-champagne border-brand-champagne'
                          : 'bg-[#0A0B0E] text-[#9CA3AF] border-[#232734] hover:text-[#F3F4F6]'
                      }`}
                    >
                      Absent
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default TeacherAttendancePage;
