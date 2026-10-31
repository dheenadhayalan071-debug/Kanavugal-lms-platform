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
    <div className="bg-[#080808] text-[#F5F3EF]">
      {toastMessage && (
        <div className="fixed bottom-8 right-6 z-50 max-w-md bg-[#111111] border border-[#FF4B00] rounded-lg px-4 py-3 shadow-2xl flex items-center gap-3">
          <CheckCircle2 className="w-4 h-4 text-[#FF4B00] shrink-0" />
          <p className="text-xs text-[#F5F3EF]">{toastMessage}</p>
        </div>
      )}

      <header className="px-6 lg:px-10 py-6 border-b border-[#292929] bg-[#080808] flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-xs text-[#FF4B00] font-medium">
            <CalendarCheck className="w-3.5 h-3.5" />
            <span>Daily Classroom Roll Call · /dashboard/teacher/attendance</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight text-[#F5F3EF]">
            Batch Attendance Roster
          </h1>
          <p className="text-xs text-[#A1A1AA]">
            Mark scholars as Present or Absent for today’s session (synced with Parent & Admin portals)
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <select
            value={selectedRosterBatch}
            onChange={(e) => setSelectedRosterBatch(e.target.value)}
            className="bg-[#111111] border border-[#292929] rounded-md px-3 py-2 text-xs font-mono text-[#F5F3EF] focus:outline-none focus:border-[#FF4B00]"
          >
            <option value="ALL">All Batches ({roster.length} Scholars)</option>
            <option value="SBO-JEE-2027-A">SBO-JEE-2027-A</option>
            <option value="SBO-NEET-2027-B">SBO-NEET-2027-B</option>
            <option value="ANA-CBSE-2027-A">ANA-CBSE-2027-A</option>
          </select>

          <button
            type="button"
            onClick={handleMarkAllPresent}
            className="px-3.5 py-2 rounded-md bg-[#111111] hover:bg-[#181818] text-[#F5F3EF] border border-[#292929] hover:border-[#FF4B00] text-xs font-medium transition-colors"
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
            className="px-4 py-2 rounded-md bg-[#FF4B00] hover:bg-[#E04200] text-[#F5F3EF] text-xs font-medium inline-flex items-center gap-1.5 transition-colors"
          >
            <CalendarCheck className="w-3.5 h-3.5" />
            <span>Save Batch Attendance</span>
          </button>
        </div>
      </header>

      <div className="px-6 lg:px-10 py-8 space-y-6 max-w-7xl">
        {/* Summary Strip */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-[#111111] border border-[#292929] rounded-lg p-4 flex items-center justify-between">
            <div>
              <p className="text-xs text-[#A1A1AA]">Total Roster Scholars</p>
              <p className="font-mono text-xl font-semibold text-[#F5F3EF] mt-0.5">
                {filteredRoster.length}
              </p>
            </div>
            <Users className="w-5 h-5 text-[#FF4B00]" />
          </div>

          <div className="bg-[#111111] border border-[#292929] rounded-lg p-4 flex items-center justify-between">
            <div>
              <p className="text-xs text-[#A1A1AA]">Marked Present Today</p>
              <p className="font-mono text-xl font-semibold text-[#FF4B00] mt-0.5">
                {presentTotal}
              </p>
            </div>
            <span className="font-mono text-xs px-2.5 py-1 rounded bg-[#080808] border border-[#292929] text-[#FF4B00]">
              PRESENT
            </span>
          </div>

          <div className="bg-[#111111] border border-[#292929] rounded-lg p-4 flex items-center justify-between">
            <div>
              <p className="text-xs text-[#A1A1AA]">Marked Absent Today</p>
              <p className="font-mono text-xl font-semibold text-[#F5F3EF] mt-0.5">
                {absentTotal}
              </p>
            </div>
            <span className="font-mono text-xs px-2.5 py-1 rounded bg-[#080808] border border-[#292929] text-[#A1A1AA]">
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
                className="bg-[#111111] border border-[#292929] rounded-lg p-5 flex flex-col justify-between space-y-4"
              >
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h3 className="text-sm font-semibold text-[#F5F3EF]">
                      {student.fullName}
                    </h3>
                    <p className="font-mono text-xs text-[#A1A1AA] mt-0.5">
                      {student.rollNumber}
                    </p>
                    <p className="text-[11px] text-[#A1A1AA] mt-1">
                      Campus: {student.campus}
                    </p>
                  </div>
                  <span className="font-mono text-[11px] px-2 py-0.5 rounded bg-[#080808] border border-[#292929] text-[#FF4B00]">
                    {student.batchCode}
                  </span>
                </div>

                <div className="pt-3 border-t border-[#292929] flex items-center justify-between gap-2">
                  <span className="font-mono text-[11px] text-[#A1A1AA]">
                    Status:{' '}
                    <strong className="text-[#F5F3EF]">{student.status}</strong>
                  </span>

                  <div className="flex items-center gap-1.5">
                    <button
                      type="button"
                      onClick={() => handleSetAttendance(student.id, 'PRESENT')}
                      className={`px-3 py-1.5 rounded-md text-xs font-medium border transition-colors ${
                        isPresent
                          ? 'bg-[#FF4B00] text-[#F5F3EF] border-[#FF4B00]'
                          : 'bg-[#080808] text-[#A1A1AA] border-[#292929] hover:text-[#F5F3EF]'
                      }`}
                    >
                      Present
                    </button>
                    <button
                      type="button"
                      onClick={() => handleSetAttendance(student.id, 'ABSENT')}
                      className={`px-3 py-1.5 rounded-md text-xs font-medium border transition-colors ${
                        !isPresent
                          ? 'bg-[#080808] text-[#FF4B00] border-[#FF4B00]'
                          : 'bg-[#080808] text-[#A1A1AA] border-[#292929] hover:text-[#F5F3EF]'
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
