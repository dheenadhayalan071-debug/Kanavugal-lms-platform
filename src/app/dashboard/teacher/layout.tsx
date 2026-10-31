import React, { useState } from 'react';
import {
  LayoutGrid,
  FilePlus2,
  CalendarCheck,
  FolderUp,
  ShieldCheck,
  MapPin,
  Menu,
  X,
  LogOut,
  ArrowLeft,
  Radio,
} from 'lucide-react';
import { useLms } from '../../../context/LmsContext';

interface TeacherTabItem {
  label: string;
  href: string;
  badge?: string;
  icon: React.ReactNode;
  matchPaths: string[];
}

const TEACHER_TABS: TeacherTabItem[] = [
  {
    label: 'Overview & Schedule',
    href: '/dashboard/teacher',
    badge: '3 Batches',
    icon: <LayoutGrid className="w-4 h-4" />,
    matchPaths: ['/dashboard/teacher', '/dashboard/teacher/overview'],
  },
  {
    label: 'Examination Studio',
    href: '/dashboard/teacher/exams',
    badge: '+4 / -1',
    icon: <FilePlus2 className="w-4 h-4" />,
    matchPaths: ['/dashboard/teacher/exams'],
  },
  {
    label: 'Attendance Roster',
    href: '/dashboard/teacher/attendance',
    badge: 'Daily Grid',
    icon: <CalendarCheck className="w-4 h-4" />,
    matchPaths: ['/dashboard/teacher/attendance'],
  },
  {
    label: 'Course Content & Zoom',
    href: '/dashboard/teacher/content',
    badge: 'PDF · VOD',
    icon: <FolderUp className="w-4 h-4" />,
    matchPaths: ['/dashboard/teacher/content'],
  },
];

interface TeacherDashboardLayoutProps {
  children: React.ReactNode;
}

export const TeacherDashboardLayout: React.FC<TeacherDashboardLayoutProps> = ({
  children,
}) => {
  const { currentPath, navigate } = useLms();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const cleanPath =
    currentPath.split('?')[0].replace(/\/+$/, '') || '/dashboard/teacher';

  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    e.preventDefault();
    navigate(href);
    setMobileMenuOpen(false);
  };

  const handleGlobalBack = () => {
    if (typeof window !== 'undefined' && window.history.length > 1) {
      window.history.back();
    } else {
      navigate('/login');
    }
  };

  return (
    <div className="min-h-screen bg-[#080808] text-[#F5F3EF] flex flex-col lg:flex-row overflow-x-hidden">
      {/* Mobile Header */}
      <div className="lg:hidden sticky top-0 z-40 flex items-center justify-between px-4 py-3.5 bg-[#111111] border-b border-[#292929]">
        <div className="flex items-center gap-2.5">
          <button
            type="button"
            onClick={handleGlobalBack}
            className="px-2.5 py-1.5 rounded-md bg-[#080808] border border-[#292929] text-xs font-medium text-[#A1A1AA] hover:text-[#F5F3EF] inline-flex items-center gap-1 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5 text-[#FF4B00]" />
            <span>← Back</span>
          </button>
          <span className="font-semibold tracking-tight text-sm text-[#F5F3EF]">
            Teacher Studio
          </span>
        </div>

        <button
          type="button"
          onClick={() => setMobileMenuOpen((prev) => !prev)}
          className="p-2 rounded-md bg-[#080808] border border-[#292929] text-[#F5F3EF] hover:border-[#FF4B00] transition-colors"
          aria-label="Toggle Teacher Sidebar"
        >
          {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
        </button>
      </div>

      {mobileMenuOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/70 lg:hidden"
          onClick={() => setMobileMenuOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Teacher Native Sidebar Navigation */}
      <aside
        className={`${
          mobileMenuOpen
            ? 'fixed inset-y-0 left-0 z-40 flex w-72'
            : 'hidden lg:flex lg:w-72 xl:w-80'
        } flex-col justify-between bg-[#111111] border-r border-[#292929] shrink-0 min-h-screen`}
      >
        <div className="p-6 space-y-6">
          {/* Academy Brand */}
          <div className="flex items-center justify-between pb-5 border-b border-[#292929]">
            <a
              href="/dashboard/teacher"
              onClick={(e) => handleNavClick(e, '/dashboard/teacher')}
              className="group focus:outline-none"
            >
              <div className="flex items-center gap-2.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#FF4B00]" />
                <span className="text-base font-semibold tracking-tight text-[#F5F3EF] group-hover:text-[#FF4B00] transition-colors">
                  Kanavugal Academy
                </span>
              </div>
              <p className="text-xs text-[#A1A1AA] mt-1">
                Faculty Academic Studio · NEET & JEE
              </p>
            </a>

            <button
              type="button"
              onClick={() => setMobileMenuOpen(false)}
              className="lg:hidden p-1.5 rounded-md bg-[#080808] border border-[#292929] text-[#A1A1AA] hover:text-[#F5F3EF]"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Faculty Identity Card */}
          <div className="bg-[#080808] border border-[#292929] rounded-lg p-4 space-y-3">
            <div className="flex items-center justify-between">
              <span className="inline-flex items-center gap-1.5 text-[11px] font-medium text-[#FF4B00]">
                <ShieldCheck className="w-3.5 h-3.5" />
                TEACHER SESSION
              </span>
              <span className="font-mono text-[11px] text-[#A1A1AA] bg-[#111111] px-2 py-0.5 rounded border border-[#292929]">
                HOD Physics
              </span>
            </div>

            <div>
              <h2 className="text-base font-semibold text-[#F5F3EF]">
                Dr. Ananya Velu
              </h2>
              <p className="font-mono text-xs text-[#A1A1AA] mt-0.5">
                ID: KA-FAC-PHY-01
              </p>
            </div>

            <div className="pt-2 border-t border-[#292929] flex items-center justify-between text-xs text-[#A1A1AA]">
              <span className="inline-flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-[#FF4B00]" />
                SBO & Anaiyur
              </span>
              <span className="font-mono text-[11px] text-[#F5F3EF]">
                Senior Faculty
              </span>
            </div>
          </div>

          {/* Nested Route Tab Menu */}
          <nav className="space-y-1.5" aria-label="Teacher Workspace Tabs">
            <p className="px-3 pb-1.5 text-[11px] font-medium uppercase tracking-wider text-[#A1A1AA]">
              Teacher Modules
            </p>
            {TEACHER_TABS.map((tab) => {
              const isActive = tab.matchPaths.includes(cleanPath);
              return (
                <a
                  key={tab.href}
                  href={tab.href}
                  onClick={(e) => handleNavClick(e, tab.href)}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-md text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-[#FF4B00] text-[#F5F3EF]'
                      : 'text-[#A1A1AA] hover:text-[#F5F3EF] hover:bg-[#080808]'
                  }`}
                >
                  <span className="flex items-center gap-3 min-w-0">
                    <span className="shrink-0">{tab.icon}</span>
                    <span className="truncate">{tab.label}</span>
                  </span>
                  {tab.badge && (
                    <span
                      className={`font-mono text-[11px] px-2 py-0.5 rounded shrink-0 ${
                        isActive
                          ? 'bg-[#080808]/30 text-[#F5F3EF]'
                          : 'bg-[#080808] text-[#A1A1AA] border border-[#292929]'
                      }`}
                    >
                      {tab.badge}
                    </span>
                  )}
                </a>
              );
            })}
          </nav>
        </div>

        {/* Bottom Sidebar Actions */}
        <div className="p-6 border-t border-[#292929] space-y-3">
          <div className="bg-[#080808] border border-[#292929] rounded-lg p-3.5 space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="text-[#A1A1AA]">Next Live Session</span>
              <span className="font-mono text-[11px] text-[#FF4B00]">
                06:00 PM IST
              </span>
            </div>
            <button
              type="button"
              onClick={() => navigate('/learn/crs_phy_12_01/mod_live_01')}
              className="w-full inline-flex items-center justify-center gap-2 px-3 py-2 rounded-md bg-[#FF4B00] hover:bg-[#E04200] text-[#F5F3EF] text-xs font-medium transition-colors"
            >
              <Radio className="w-3.5 h-3.5" />
              <span>Launch Live Classroom</span>
            </button>
          </div>

          <div className="flex items-center justify-between pt-1">
            <a
              href="/login"
              onClick={(e) => handleNavClick(e, '/login')}
              className="inline-flex items-center gap-2 text-xs text-[#A1A1AA] hover:text-[#F5F3EF] transition-colors"
            >
              <LogOut className="w-3.5 h-3.5 text-[#FF4B00]" />
              <span>Sign Out</span>
            </a>
            <span className="font-mono text-[11px] text-[#A1A1AA]">
              AY 2026–27
            </span>
          </div>
        </div>
      </aside>

      {/* Main Content Shell */}
      <div className="flex-1 min-w-0 flex flex-col bg-[#080808]">
        {/* Global Top Bar with "← Back" Button */}
        <div className="hidden lg:flex items-center justify-between px-10 py-3.5 bg-[#111111] border-b border-[#292929]">
          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={handleGlobalBack}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-[#080808] hover:bg-[#181818] border border-[#292929] text-xs font-medium text-[#A1A1AA] hover:text-[#F5F3EF] transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5 text-[#FF4B00]" />
              <span>← Back</span>
            </button>

            <div className="flex items-center gap-2 text-xs text-[#A1A1AA]">
              <span>Faculty Workspace</span>
              <span>•</span>
              <span className="font-mono text-[#F5F3EF]">{cleanPath}</span>
            </div>
          </div>

          <div className="flex items-center gap-2 text-xs text-[#A1A1AA] font-mono">
            <span className="w-2 h-2 rounded-full bg-[#FF4B00]" />
            <span>SBO COLONY & ANAIYUR</span>
          </div>
        </div>

        <main className="flex-1">{children}</main>
      </div>
    </div>
  );
};

export default TeacherDashboardLayout;
