import React from 'react';
import {
  Users,
  Radio,
  Award,
  CalendarCheck,
  CheckSquare,
  FilePlus2,
  Megaphone,
  Flame,
} from 'lucide-react';
import { useLms } from '../../../context/LmsContext';
import { useMockGlobal } from '../../../context/MockGlobalContext';

interface AssignedBatch {
  id: string;
  code: string;
  name: string;
  campus: 'SBO Colony' | 'Anaiyur';
  studentCount: number;
  syllabusProgressPct: number;
  nextSessionTime: string;
  activeChapter: string;
}

const INITIAL_BATCHES: AssignedBatch[] = [
  {
    id: 'bat_sbo_jee_a',
    code: 'SBO-JEE-2027-A',
    name: 'JEE Main & Advanced + CBSE Class 12 Integrated Batch A',
    campus: 'SBO Colony',
    studentCount: 42,
    syllabusProgressPct: 75,
    nextSessionTime: 'Today · 06:00 PM IST',
    activeChapter: 'Moving Charges & Cyclotron Magnetism',
  },
  {
    id: 'bat_sbo_neet_b',
    code: 'SBO-NEET-2027-B',
    name: 'NEET UG Medical Target Batch B (Class 12)',
    campus: 'SBO Colony',
    studentCount: 56,
    syllabusProgressPct: 68,
    nextSessionTime: 'Tomorrow · 03:00 PM IST',
    activeChapter: 'Electrostatic Potential & Capacitor Networks',
  },
  {
    id: 'bat_ana_cbse_a',
    code: 'ANA-CBSE-2027-A',
    name: 'CBSE Class 12 Board Excellence & Derivations Batch',
    campus: 'Anaiyur',
    studentCount: 38,
    syllabusProgressPct: 82,
    nextSessionTime: '02 Nov · 04:30 PM IST',
    activeChapter: 'Alternating Current & Transformer Core Losses',
  },
];

export const TeacherDashboardPage: React.FC = () => {
  const { navigate } = useLms();
  const { globalAnnouncements } = useMockGlobal();

  return (
    <div className="bg-[#0A0B0E] text-[#F3F4F6]">
      <header className="px-6 lg:px-10 py-8 border-b border-[#232734] bg-[#11131A] flex flex-col md:flex-row md:items-center md:justify-between gap-6">
        <div className="space-y-2">
          <div className="flex flex-wrap items-center gap-2 text-xs md:text-sm font-medium text-[#9CA3AF] uppercase tracking-wider">
            <span>Faculty Overview</span>
            <span>•</span>
            <span className="font-mono text-[#3B82F6]">ID: KA-FAC-PHY-01</span>
            <span>•</span>
            <span className="text-brand-champagne">
              SBO Colony & Anaiyur Campuses
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight text-[#F3F4F6]">
            Dr. Ananya Velu — Faculty Overview
          </h1>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={() => navigate('/dashboard/teacher/performance')}
            className="px-4 py-2.5 rounded-md bg-[#13161F] hover:bg-[#191D29] text-[#F3F4F6] border border-[#232734] hover:border-brand-champagne text-sm font-medium inline-flex items-center gap-2 transition-colors"
          >
            <Flame className="w-4 h-4 text-brand-champagne" />
            <span>Batch-wise Exam Performance</span>
          </button>

          <button
            type="button"
            onClick={() => navigate('/dashboard/teacher/evaluations')}
            className="px-4 py-2.5 rounded-md bg-[#13161F] hover:bg-[#191D29] text-[#F3F4F6] border border-[#232734] hover:border-brand-champagne text-sm font-medium inline-flex items-center gap-2 transition-colors"
          >
            <CheckSquare className="w-4 h-4 text-brand-champagne" />
            <span>Grade Scripts (2)</span>
          </button>

          <button
            type="button"
            onClick={() => navigate('/dashboard/teacher/exams')}
            className="px-4 py-2.5 rounded-md bg-[#13161F] hover:bg-[#191D29] text-[#F3F4F6] border border-[#232734] hover:border-brand-champagne text-sm font-medium inline-flex items-center gap-2 transition-colors"
          >
            <FilePlus2 className="w-4 h-4 text-brand-champagne" />
            <span>Examination Studio</span>
          </button>

          <button
            type="button"
            onClick={() => navigate('/learn/crs_phy_12_01/mod_live_01')}
            className="px-4 py-2.5 rounded-md bg-brand-champagne hover:bg-[#F1C48F] text-[#0A0B0E] text-sm font-semibold inline-flex items-center gap-2 transition-colors"
          >
            <Radio className="w-4 h-4" />
            <span>Start Live Zoom Class</span>
          </button>
        </div>
      </header>

      <div className="px-6 lg:px-10 py-10 space-y-12 max-w-7xl">
        {/* Global Announcements from MockGlobalContext (Cross-Role Reflection) */}
        <section
          aria-label="Global Academy Broadcasts"
          className="bg-[#13161F] border border-[#232734] rounded-lg p-6 md:p-8 space-y-5"
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#232734] pb-4">
            <div className="flex items-center gap-2.5">
              <Megaphone className="w-5 h-5 text-brand-champagne" />
              <h2 className="text-xl md:text-2xl font-semibold tracking-tight text-[#F3F4F6]">
                Academy Announcements & Faculty Circulars
              </h2>
            </div>
            <span className="font-mono text-xs md:text-sm font-medium text-[#3B82F6] uppercase tracking-wider">
              LIVE ADMIN BROADCAST ({globalAnnouncements.length})
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {globalAnnouncements.slice(0, 2).map((ann) => (
              <div
                key={ann.id}
                className="bg-[#0A0B0E] border border-[#232734] rounded-md p-5 space-y-2"
              >
                <div className="flex items-center justify-between gap-2">
                  <span className="font-mono text-xs md:text-sm font-medium text-brand-champagne uppercase tracking-wider px-2.5 py-0.5 rounded bg-[#13161F] border border-[#232734]">
                    {ann.targetBranches}
                  </span>
                  <span className="font-mono text-xs md:text-sm font-medium text-[#9CA3AF] uppercase tracking-wider">
                    {ann.publishedAt}
                  </span>
                </div>
                <h3 className="text-base font-semibold text-[#F3F4F6]">
                  {ann.title}
                </h3>
                <p className="text-base text-[#9CA3AF] leading-relaxed">
                  {ann.message}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Primary Faculty KPIs */}
        <section className="space-y-5">
          <div className="space-y-1">
            <h2 className="text-xl md:text-2xl font-semibold tracking-tight text-[#F3F4F6]">
              Faculty Teaching & Evaluation KPIs
            </h2>
            <p className="text-base text-[#9CA3AF]">
              Active batch load, pending script evaluations, and campus
              attendance rate
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-[#13161F] border border-[#232734] rounded-lg p-6 space-y-3">
              <div className="flex items-center justify-between text-xs md:text-sm font-medium text-[#9CA3AF] uppercase tracking-wider">
                <span>Assigned Batches</span>
                <Users className="w-4 h-4 text-brand-champagne" />
              </div>
              <p className="font-mono text-4xl md:text-5xl font-bold tracking-tight text-brand-champagne">
                03
              </p>
              <p className="text-base text-[#F3F4F6]">
                136 Enrolled Scholars across SBO & Anaiyur
              </p>
            </div>

            <div className="bg-[#13161F] border border-[#232734] rounded-lg p-6 space-y-3">
              <div className="flex items-center justify-between text-xs md:text-sm font-medium text-[#9CA3AF] uppercase tracking-wider">
                <span>Pending Evaluations</span>
                <CheckSquare className="w-4 h-4 text-brand-champagne" />
              </div>
              <p className="font-mono text-4xl md:text-5xl font-bold tracking-tight text-brand-champagne">
                02
              </p>
              <p className="text-base text-[#F3F4F6]">
                Descriptive scripts awaiting grading
              </p>
            </div>

            <div className="bg-[#13161F] border border-[#232734] rounded-lg p-6 space-y-3">
              <div className="flex items-center justify-between text-xs md:text-sm font-medium text-[#9CA3AF] uppercase tracking-wider">
                <span>Active CBT Papers</span>
                <Award className="w-4 h-4 text-brand-champagne" />
              </div>
              <p className="font-mono text-4xl md:text-5xl font-bold tracking-tight text-brand-champagne">
                02
              </p>
              <p className="text-base text-[#F3F4F6]">
                +4 / -1 NTA Marking Scheme Configured
              </p>
            </div>

            <div className="bg-[#13161F] border border-[#232734] rounded-lg p-6 space-y-3">
              <div className="flex items-center justify-between text-xs md:text-sm font-medium text-[#9CA3AF] uppercase tracking-wider">
                <span>Today’s Attendance</span>
                <CalendarCheck className="w-4 h-4 text-brand-champagne" />
              </div>
              <p className="font-mono text-4xl md:text-5xl font-bold tracking-tight text-brand-champagne">
                95.6%
              </p>
              <p className="text-base text-[#F3F4F6]">
                Synced with Parent & Admin Portals
              </p>
            </div>
          </div>
        </section>

        {/* Assigned Academic Batches */}
        <section className="space-y-6">
          <div className="space-y-1">
            <h2 className="text-xl md:text-2xl font-semibold tracking-tight text-[#F3F4F6]">
              Assigned Academic Batches
            </h2>
            <p className="text-base text-[#9CA3AF]">
              Active NEET UG, JEE Main & Advanced, and CBSE Class 12 batches
              under your mentorship
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {INITIAL_BATCHES.map((batch) => (
              <div
                key={batch.id}
                className="bg-[#13161F] border border-[#232734] rounded-lg p-6 md:p-7 flex flex-col justify-between space-y-6 hover:border-brand-champagne/60 transition-colors"
              >
                <div className="space-y-3.5">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs md:text-sm font-medium uppercase tracking-wider px-2.5 py-1 rounded bg-[#0A0B0E] text-brand-champagne border border-[#232734]">
                      {batch.code}
                    </span>
                    <span className="text-xs md:text-sm font-medium text-[#3B82F6] uppercase tracking-wider">
                      {batch.campus}
                    </span>
                  </div>

                  <h3 className="text-xl font-semibold tracking-tight text-[#F3F4F6] leading-snug">
                    {batch.name}
                  </h3>

                  <p className="text-base text-[#9CA3AF]">
                    Active Chapter:{' '}
                    <span className="text-[#F3F4F6] font-medium">
                      {batch.activeChapter}
                    </span>
                  </p>
                </div>

                <div className="space-y-4 pt-4 border-t border-[#232734]">
                  <div className="flex items-center justify-between text-xs md:text-sm font-medium uppercase tracking-wider">
                    <span className="text-[#9CA3AF]">
                      {batch.studentCount} Scholars
                    </span>
                    <span className="font-mono text-brand-champagne">
                      {batch.syllabusProgressPct}% Syllabus
                    </span>
                  </div>

                  <div className="w-full h-2 bg-[#0A0B0E] border border-[#232734] rounded-full overflow-hidden">
                    <div
                      className="h-full bg-brand-champagne"
                      style={{ width: `${batch.syllabusProgressPct}%` }}
                    />
                  </div>

                  <div className="flex items-center justify-between pt-1">
                    <span className="font-mono text-xs text-[#9CA3AF]">
                      {batch.nextSessionTime}
                    </span>
                    <button
                      type="button"
                      onClick={() => navigate('/dashboard/teacher/attendance')}
                      className="px-3.5 py-2 rounded-md bg-[#0A0B0E] hover:bg-brand-champagne text-[#F3F4F6] hover:text-[#0A0B0E] border border-[#232734] hover:border-brand-champagne text-xs md:text-sm font-semibold transition-colors"
                    >
                      Mark Roster
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default TeacherDashboardPage;
