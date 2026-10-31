import React, { useState } from 'react';
import {
  Layers,
  BookOpen,
  Award,
  ShieldCheck,
  MapPin,
  Menu,
  X,
  LogOut,
  ArrowLeft,
  ArrowUpRight,
} from 'lucide-react';
import { useLms } from '../../../context/LmsContext';

interface StudentTabItem {
  label: string;
  href: string;
  badge?: string;
  icon: React.ReactNode;
  matchPaths: string[];
}

const STUDENT_TABS: StudentTabItem[] = [
  {
    label: 'Academic Overview',
    href: '/dashboard/student/overview',
    badge: 'Live',
    icon: <Layers className="w-4 h-4" />,
    matchPaths: ['/dashboard/student', '/dashboard/student/overview'],
  },
  {
    label: 'Courses, VODs & PDFs',
    href: '/dashboard/student/courses',
    badge: '4 Courses',
    icon: <BookOpen className="w-4 h-4" />,
    matchPaths: ['/dashboard/student/courses'],
  },
  {
    label: 'NTA CBT Exam Engine',
    href: '/dashboard/student/exams',
    badge: '+4 / -1',
    icon: <Award className="w-4 h-4" />,
    matchPaths: ['/dashboard/student/exams'],
  },
];

interface StudentDashboardLayoutProps {
  children: React.ReactNode;
}

export const StudentDashboardLayout: React.FC<StudentDashboardLayoutProps> = ({
  children,
}) => {
  const { currentPath, navigate } = useLms();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const cleanPath =
    currentPath.split('?')[0].replace(/\/+$/, '') || '/dashboard/student';

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
    <div className="min-h-screen bg-[#0A0B0E] text-[#F3F4F6] flex flex-col lg:flex-row overflow-x-hidden">
      {/* Mobile Header */}
      <div className="lg:hidden sticky top-0 z-40 flex items-center justify-between px-4 py-3.5 bg-[#11131A] border-b border-[#232734]">
        <div className="flex items-center gap-2.5">
          <button
            type="button"
            onClick={handleGlobalBack}
            className="px-2.5 py-1.5 rounded-md bg-[#0A0B0E] border border-[#232734] text-xs font-medium text-[#9CA3AF] hover:text-[#F3F4F6] inline-flex items-center gap-1 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5 text-brand-champagne" />
            <span>← Back</span>
          </button>
          <span className="font-semibold tracking-tight text-sm text-[#F3F4F6]">
            Student Hub
          </span>
        </div>

        <button
          type="button"
          onClick={() => setMobileMenuOpen((prev) => !prev)}
          className="p-2 rounded-md bg-[#0A0B0E] border border-[#232734] text-[#F3F4F6] hover:border-brand-champagne transition-colors"
          aria-label="Toggle Student Sidebar"
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

      {/* Student Native Sidebar Navigation */}
      <aside
        className={`${
          mobileMenuOpen
            ? 'fixed inset-y-0 left-0 z-40 flex w-72'
            : 'hidden lg:flex lg:w-72 xl:w-80'
        } flex-col justify-between bg-[#11131A] border-r border-[#232734] shrink-0 min-h-screen`}
      >
        <div className="p-6 space-y-6">
          {/* Brand Header */}
          <div className="flex items-center justify-between pb-5 border-b border-[#232734]">
            <a
              href="/dashboard/student/overview"
              onClick={(e) => handleNavClick(e, '/dashboard/student/overview')}
              className="group focus:outline-none"
            >
              <div className="flex items-center gap-2.5">
                <span className="w-2.5 h-2.5 rounded-full bg-brand-champagne" />
                <span className="text-base font-semibold tracking-tight text-[#F3F4F6] group-hover:text-brand-champagne transition-colors">
                  Kanavugal Academy
                </span>
              </div>
              <p className="text-xs text-[#9CA3AF] mt-1">
                NEET UG · JEE · Classes 6–12
              </p>
            </a>

            <button
              type="button"
              onClick={() => setMobileMenuOpen(false)}
              className="lg:hidden p-1.5 rounded-md bg-[#0A0B0E] border border-[#232734] text-[#9CA3AF] hover:text-[#F3F4F6]"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Student Identity Card */}
          <div className="bg-[#13161F] border border-[#232734] rounded-lg p-4 space-y-3">
            <div className="flex items-center justify-between">
              <span className="inline-flex items-center gap-1.5 text-[11px] font-medium text-brand-champagne">
                <ShieldCheck className="w-3.5 h-3.5" />
                STUDENT SESSION
              </span>
              <span className="font-mono text-[11px] text-[#9CA3AF] bg-[#0A0B0E] px-2 py-0.5 rounded border border-[#232734]">
                Class 12
              </span>
            </div>

            <div>
              <h2 className="text-base font-semibold text-[#F3F4F6]">
                Kavin Rajan
              </h2>
              <p className="font-mono text-xs text-[#3B82F6] mt-0.5">
                Roll: KA-SBO-26-0142
              </p>
            </div>

            <div className="pt-2 border-t border-[#232734] flex items-center justify-between text-xs text-[#9CA3AF]">
              <span className="inline-flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-brand-champagne" />
                SBO Colony
              </span>
              <span className="font-mono text-[11px] text-[#F3F4F6]">
                SBO-JEE-2027-A
              </span>
            </div>
          </div>

          {/* Nested Route Tab Menu */}
          <nav className="space-y-1.5" aria-label="Student Workspace Tabs">
            <p className="px-3 pb-1.5 text-[11px] font-medium uppercase tracking-wider text-[#9CA3AF]">
              Student Modules
            </p>
            {STUDENT_TABS.map((tab) => {
              const isActive = tab.matchPaths.includes(cleanPath);
              return (
                <a
                  key={tab.href}
                  href={tab.href}
                  onClick={(e) => handleNavClick(e, tab.href)}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-md text-sm font-semibold transition-colors ${
                    isActive
                      ? 'bg-brand-champagne text-[#0A0B0E]'
                      : 'text-[#9CA3AF] hover:text-[#F3F4F6] hover:bg-[#13161F]'
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
                          ? 'bg-[#0A0B0E]/20 text-[#0A0B0E]'
                          : 'bg-[#0A0B0E] text-[#9CA3AF] border border-[#232734]'
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

        {/* Bottom Sidebar Footer */}
        <div className="p-6 border-t border-[#232734] space-y-3">
          <div className="bg-[#13161F] border border-[#232734] rounded-lg p-3.5 space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="text-[#9CA3AF]">NTA CBT Hall</span>
              <span className="font-mono text-[11px] text-brand-champagne">
                +4 / -1
              </span>
            </div>
            <button
              type="button"
              onClick={() => navigate('/exam/exm_jee_mock_01/attempt')}
              className="w-full inline-flex items-center justify-center gap-2 px-3 py-2 rounded-md bg-brand-champagne hover:bg-[#F1C48F] text-[#0A0B0E] text-xs font-semibold transition-colors"
            >
              <span>Enter CBT Exam Hall</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="flex items-center justify-between pt-1">
            <a
              href="/login"
              onClick={(e) => handleNavClick(e, '/login')}
              className="inline-flex items-center gap-2 text-xs text-[#9CA3AF] hover:text-[#F3F4F6] transition-colors"
            >
              <LogOut className="w-3.5 h-3.5 text-brand-champagne" />
              <span>Sign Out</span>
            </a>
            <span className="font-mono text-[11px] text-[#9CA3AF]">
              AY 2026–27
            </span>
          </div>
        </div>
      </aside>

      {/* Main Content Shell */}
      <div className="flex-1 min-w-0 flex flex-col bg-[#0A0B0E]">
        {/* Global Top Bar with "← Back" Button */}
        <div className="hidden lg:flex items-center justify-between px-10 py-3.5 bg-[#11131A] border-b border-[#232734]">
          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={handleGlobalBack}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-[#0A0B0E] hover:bg-[#191D28] border border-[#232734] text-xs font-medium text-[#9CA3AF] hover:text-[#F3F4F6] transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5 text-brand-champagne" />
              <span>← Back</span>
            </button>

            <div className="flex items-center gap-2 text-xs text-[#9CA3AF]">
              <span>Student Hub</span>
              <span>•</span>
              <span className="font-mono text-[#3B82F6]">{cleanPath}</span>
            </div>
          </div>

          <div className="flex items-center gap-2 text-xs text-[#9CA3AF] font-mono">
            <span className="w-2 h-2 rounded-full bg-brand-champagne" />
            <span>SBO COLONY & ANAIYUR</span>
          </div>
        </div>

        <main className="flex-1">{children}</main>
      </div>
    </div>
  );
};

export default StudentDashboardLayout;
