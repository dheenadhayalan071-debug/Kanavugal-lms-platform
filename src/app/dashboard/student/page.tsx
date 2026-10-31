import React from 'react';
import {
  GraduationCap,
  TrendingUp,
  BarChart3,
  Calendar,
  BookOpen,
  Award,
  ArrowRight,
  Megaphone,
} from 'lucide-react';
import { useLms } from '../../../context/LmsContext';
import { useMockGlobal } from '../../../context/MockGlobalContext';
import { StudentRankComparisonChart } from '../../../components/StudentRankComparisonChart';

export const StudentDashboardPage: React.FC = () => {
  const { navigate } = useLms();
  const { globalAnnouncements } = useMockGlobal();

  return (
    <div className="bg-[#0A0B0E] text-[#F3F4F6]">
      {/* Welcome Header */}
      <header className="px-6 lg:px-10 py-8 border-b border-[#232734] bg-[#11131A] flex flex-col md:flex-row md:items-center md:justify-between gap-6">
        <div className="space-y-2">
          <div className="flex flex-wrap items-center gap-2 text-xs md:text-sm font-medium text-[#9CA3AF] uppercase tracking-wider">
            <span>SBO Colony Campus, Madurai</span>
            <span>•</span>
            <span className="font-mono text-[#3B82F6]">
              Roll: KA-SBO-26-0142
            </span>
            <span>•</span>
            <span className="text-brand-champagne">
              JEE Main & Advanced (Class 12)
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight text-[#F3F4F6]">
            Welcome back, Kavin Rajan
          </h1>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={() => navigate('/dashboard/student/courses')}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-md bg-[#13161F] hover:bg-[#191D29] text-[#F3F4F6] border border-[#232734] hover:border-brand-champagne text-sm font-medium transition-colors"
          >
            <BookOpen className="w-4 h-4 text-brand-champagne" />
            <span>Open Learning Tab</span>
          </button>

          <button
            type="button"
            onClick={() => navigate('/dashboard/student/exams')}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-md bg-brand-champagne hover:bg-[#F1C48F] text-[#0A0B0E] text-sm font-semibold transition-colors"
          >
            <Award className="w-4 h-4" />
            <span>Open CBT Exams Tab</span>
          </button>
        </div>
      </header>

      {/* Isolated Academic Overview Stats + Live Global Announcements Feed */}
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
                Academy Announcements & Circulars
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

        {/* Primary KPIs */}
        <section aria-label="Academic Overview Metrics" className="space-y-5">
          <div className="space-y-1">
            <h2 className="text-xl md:text-2xl font-semibold tracking-tight text-[#F3F4F6]">
              Academic Telemetry & Attendance KPIs
            </h2>
            <p className="text-base text-[#9CA3AF]">
              Real-time attendance, syllabus completion, and NTA mock test
              standing
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-[#13161F] border border-[#232734] rounded-lg p-6 space-y-3">
              <div className="flex items-center justify-between text-xs md:text-sm font-medium text-[#9CA3AF] uppercase tracking-wider">
                <span>Campus Attendance</span>
                <Calendar className="w-4 h-4 text-brand-champagne" />
              </div>
              <p className="font-mono text-4xl md:text-5xl font-bold tracking-tight text-brand-champagne">
                96.4%
              </p>
              <p className="text-base text-[#F3F4F6]">
                108 / 112 Classroom Sessions Present
              </p>
            </div>

            <div className="bg-[#13161F] border border-[#232734] rounded-lg p-6 space-y-3">
              <div className="flex items-center justify-between text-xs md:text-sm font-medium text-[#9CA3AF] uppercase tracking-wider">
                <span>Syllabus Completion</span>
                <TrendingUp className="w-4 h-4 text-brand-champagne" />
              </div>
              <p className="font-mono text-4xl md:text-5xl font-bold tracking-tight text-brand-champagne">
                72.5%
              </p>
              <p className="text-base text-[#F3F4F6]">
                58 of 80 modules completed across 4 subjects
              </p>
            </div>

            <div className="bg-[#13161F] border border-[#232734] rounded-lg p-6 space-y-3">
              <div className="flex items-center justify-between text-xs md:text-sm font-medium text-[#9CA3AF] uppercase tracking-wider">
                <span>Latest NTA Mock Score</span>
                <BarChart3 className="w-4 h-4 text-brand-champagne" />
              </div>
              <p className="font-mono text-4xl md:text-5xl font-bold tracking-tight text-brand-champagne">
                246/300
              </p>
              <p className="text-base text-[#F3F4F6]">
                91.2% Accuracy · Rank #04 (SBO & Anaiyur)
              </p>
            </div>

            <div className="bg-[#13161F] border border-[#232734] rounded-lg p-6 space-y-3">
              <div className="flex items-center justify-between text-xs md:text-sm font-medium text-[#9CA3AF] uppercase tracking-wider">
                <span>Assigned Batch</span>
                <GraduationCap className="w-4 h-4 text-brand-champagne" />
              </div>
              <p className="font-mono text-2xl md:text-3xl font-bold tracking-tight text-[#3B82F6] pt-1">
                SBO-JEE-2027-A
              </p>
              <p className="text-base text-[#F3F4F6] truncate">
                Mentor: Dr. Ananya Velu (Ph.D. Physics)
              </p>
            </div>
          </div>
        </section>

        {/* Recharts Bar Chart: Student Rank vs. Branch Average (Last 5 NTA Mock Tests) */}
        <StudentRankComparisonChart />

        {/* Subject-Wise Syllabus Completion Breakdown */}
        <section className="bg-[#13161F] border border-[#232734] rounded-lg p-6 md:p-8 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#232734] pb-5">
            <div className="space-y-1">
              <h2 className="text-xl md:text-2xl font-semibold tracking-tight text-[#F3F4F6]">
                Subject-Wise Syllabus Completion & Attendance Summary
              </h2>
              <p className="text-base text-[#9CA3AF]">
                Real-time completion telemetry for Batch SBO-JEE-2027-A
              </p>
            </div>
            <button
              type="button"
              onClick={() => navigate('/dashboard/student/courses')}
              className="text-sm font-semibold text-[#3B82F6] hover:text-brand-champagne inline-flex items-center gap-1.5 transition-colors"
            >
              <span>Go to Courses & VODs</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                subject: 'Physics (Class 12)',
                faculty: 'Dr. Ananya Velu',
                completed: 18,
                total: 24,
                pct: 75,
                attendance: '97.2%',
              },
              {
                subject: 'Chemistry (Class 12)',
                faculty: 'Prof. Raghavan Subramanian',
                completed: 15,
                total: 22,
                pct: 68,
                attendance: '95.8%',
              },
              {
                subject: 'Mathematics (JEE Main & Adv)',
                faculty: 'Prof. Vikramaditya Senthil',
                completed: 14,
                total: 20,
                pct: 70,
                attendance: '96.0%',
              },
              {
                subject: 'Biology (NCERT + NEET UG)',
                faculty: 'Dr. Meenakshi Sundaram',
                completed: 11,
                total: 14,
                pct: 79,
                attendance: '96.8%',
              },
            ].map((row) => (
              <div
                key={row.subject}
                className="bg-[#0A0B0E] border border-[#232734] rounded-md p-5 space-y-3.5"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-base font-semibold text-[#F3F4F6]">
                      {row.subject}
                    </p>
                    <p className="text-xs md:text-sm font-medium text-[#9CA3AF] uppercase tracking-wider mt-0.5">
                      {row.faculty}
                    </p>
                  </div>
                  <div className="text-right font-mono">
                    <p className="text-lg font-bold text-brand-champagne">
                      {row.pct}% Syllabus
                    </p>
                    <p className="text-xs text-[#3B82F6]">
                      Attendance: {row.attendance}
                    </p>
                  </div>
                </div>

                <div className="w-full h-2 bg-[#13161F] border border-[#232734] rounded-full overflow-hidden">
                  <div
                    className="h-full bg-brand-champagne"
                    style={{ width: `${row.pct}%` }}
                  />
                </div>

                <p className="font-mono text-xs md:text-sm font-medium text-[#9CA3AF] uppercase tracking-wider">
                  {row.completed} / {row.total} Modules Completed
                </p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default StudentDashboardPage;
