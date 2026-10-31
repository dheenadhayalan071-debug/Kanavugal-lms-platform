import React, { useState } from 'react';
import {
  Layers,
  BookOpen,
  Award,
  Users,
  FilePlus2,
  CalendarCheck,
  FolderUp,
  CheckSquare,
  Building2,
  UserCheck,
  Receipt,
  ShieldCheck,
  MapPin,
  Menu,
  X,
  LogOut,
  ArrowLeft,
  ArrowUpRight,
  Flame,
} from 'lucide-react';
import { MockRole, useLms } from '../../context/LmsContext';
import { useMockGlobal } from '../../context/MockGlobalContext';

interface SidebarRouteItem {
  label: string;
  href: string;
  matchPaths: string[];
  icon: React.ReactNode;
  badge?: string;
}

const ROLE_USER_CARD: Record<
  MockRole,
  {
    name: string;
    identifier: string;
    badge: string;
    campus: string;
    subMeta: string;
  }
> = {
  STUDENT: {
    name: 'Kavin Rajan',
    identifier: 'Roll: KA-SBO-26-0142',
    badge: 'Class 12',
    campus: 'SBO Colony',
    subMeta: 'SBO-JEE-2027-A',
  },
  TEACHER: {
    name: 'Dr. Ananya Velu',
    identifier: 'ID: KA-FAC-PHY-01',
    badge: 'HOD Physics',
    campus: 'SBO & Anaiyur',
    subMeta: 'Senior Faculty',
  },
  PARENT: {
    name: 'Rajan Sundaram',
    identifier: 'Guardian ID: KA-PAR-089',
    badge: 'Read-Only',
    campus: 'SBO & Anaiyur',
    subMeta: '2 Children Linked',
  },
  ADMIN: {
    name: 'Meenakshi Sundaram',
    identifier: 'ID: KA-ADM-001',
    badge: 'Super Admin',
    campus: 'All Branches',
    subMeta: 'SBO & Anaiyur',
  },
};

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  const { currentPath, navigate, mockRole } = useLms();
  const { userApprovals } = useMockGlobal();
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  const pendingApprovalsCount = userApprovals.filter(
    (u) => u.status === 'PENDING'
  ).length;

  const cleanPath =
    currentPath.split('?')[0].replace(/\/+$/, '') || '/dashboard/student';

  const activeRole: MockRole = cleanPath.startsWith('/dashboard/teacher')
    ? 'TEACHER'
    : cleanPath.startsWith('/dashboard/admin')
    ? 'ADMIN'
    : cleanPath.startsWith('/dashboard/parent')
    ? 'PARENT'
    : cleanPath.startsWith('/dashboard/student')
    ? 'STUDENT'
    : mockRole;

  const roleRoutes: Record<MockRole, SidebarRouteItem[]> = {
    STUDENT: [
      {
        label: 'Academic Overview',
        href: '/dashboard/student',
        matchPaths: ['/dashboard/student', '/dashboard/student/overview'],
        icon: <Layers className="w-4 h-4" />,
        badge: 'Stats',
      },
      {
        label: 'Learning & Courses',
        href: '/dashboard/student/courses',
        matchPaths: ['/dashboard/student/courses'],
        icon: <BookOpen className="w-4 h-4" />,
        badge: 'VOD · Zoom',
      },
      {
        label: 'NTA CBT Exams',
        href: '/dashboard/student/exams',
        matchPaths: ['/dashboard/student/exams'],
        icon: <Award className="w-4 h-4" />,
        badge: '+4 / -1',
      },
    ],
    TEACHER: [
      {
        label: 'Faculty Overview',
        href: '/dashboard/teacher',
        matchPaths: ['/dashboard/teacher', '/dashboard/teacher/overview'],
        icon: <Layers className="w-4 h-4" />,
        badge: '3 Batches',
      },
      {
        label: 'Batch-wise Exam Performance',
        href: '/dashboard/teacher/performance',
        matchPaths: ['/dashboard/teacher/performance'],
        icon: <Flame className="w-4 h-4" />,
        badge: 'Heat Map',
      },
      {
        label: 'Exam Evaluations',
        href: '/dashboard/teacher/evaluations',
        matchPaths: ['/dashboard/teacher/evaluations'],
        icon: <CheckSquare className="w-4 h-4" />,
        badge: 'Grading',
      },
      {
        label: 'Examination Studio',
        href: '/dashboard/teacher/exams',
        matchPaths: ['/dashboard/teacher/exams'],
        icon: <FilePlus2 className="w-4 h-4" />,
        badge: '+4 / -1',
      },
      {
        label: 'Attendance Roster',
        href: '/dashboard/teacher/attendance',
        matchPaths: ['/dashboard/teacher/attendance'],
        icon: <CalendarCheck className="w-4 h-4" />,
        badge: 'Grid',
      },
      {
        label: 'Content & Live Zoom',
        href: '/dashboard/teacher/content',
        matchPaths: ['/dashboard/teacher/content'],
        icon: <FolderUp className="w-4 h-4" />,
        badge: 'PDF · VOD',
      },
    ],
    ADMIN: [
      {
        label: 'Branch Overview',
        href: '/dashboard/admin',
        matchPaths: ['/dashboard/admin', '/dashboard/admin/overview'],
        icon: <Building2 className="w-4 h-4" />,
        badge: 'SBO · ANA',
      },
      {
        label: 'User Approvals & Links',
        href: '/dashboard/admin/users',
        matchPaths: ['/dashboard/admin/users'],
        icon: <UserCheck className="w-4 h-4" />,
        badge: `${pendingApprovalsCount} Pending`,
      },
      {
        label: 'Batch & Faculty Control',
        href: '/dashboard/admin/batches',
        matchPaths: ['/dashboard/admin/batches'],
        icon: <Layers className="w-4 h-4" />,
        badge: 'Batches',
      },
      {
        label: 'Finance & Fee Ledger',
        href: '/dashboard/admin/finance',
        matchPaths: ['/dashboard/admin/finance'],
        icon: <Receipt className="w-4 h-4" />,
        badge: 'Cash / UPI',
      },
    ],
    PARENT: [
      {
        label: 'Guardian Overview',
        href: '/dashboard/parent',
        matchPaths: ['/dashboard/parent', '/dashboard/parent/overview'],
        icon: <Users className="w-4 h-4" />,
        badge: '2 Linked',
      },
      {
        label: 'Attendance Log',
        href: '/dashboard/parent/attendance',
        matchPaths: ['/dashboard/parent/attendance'],
        icon: <CalendarCheck className="w-4 h-4" />,
        badge: '96.4%',
      },
      {
        label: 'Fee Status & Receipts',
        href: '/dashboard/parent/fees',
        matchPaths: ['/dashboard/parent/fees'],
        icon: <Receipt className="w-4 h-4" />,
        badge: 'PAID',
      },
    ],
  };

  const navItems = roleRoutes[activeRole] || roleRoutes.STUDENT;
  const userCard = ROLE_USER_CARD[activeRole] || ROLE_USER_CARD.STUDENT;

  const handleLinkClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    e.preventDefault();
    navigate(href);
    setMobileSidebarOpen(false);
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
      {/* Mobile Top Header Bar */}
      <div className="lg:hidden sticky top-0 z-40 flex items-center justify-between px-4 py-3.5 bg-[#11131A] border-b border-[#232734]">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={handleGlobalBack}
            className="px-3 py-1.5 rounded-md bg-[#0A0B0E] border border-[#232734] text-xs font-medium text-[#9CA3AF] hover:text-[#F3F4F6] inline-flex items-center gap-1.5 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5 text-brand-champagne" />
            <span>← Back</span>
          </button>
          <span className="font-semibold tracking-tight text-base text-[#F3F4F6]">
            Kanavugal Academy
          </span>
        </div>

        <button
          type="button"
          onClick={() => setMobileSidebarOpen((prev) => !prev)}
          className="p-2 rounded-md bg-[#0A0B0E] border border-[#232734] text-[#F3F4F6] hover:border-brand-champagne transition-colors"
          aria-label="Toggle navigation sidebar"
        >
          {mobileSidebarOpen ? (
            <X className="w-4 h-4" />
          ) : (
            <Menu className="w-4 h-4" />
          )}
        </button>
      </div>

      {mobileSidebarOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/70 lg:hidden"
          onClick={() => setMobileSidebarOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Global Role-Adaptive Sidebar Navigation */}
      <aside
        className={`${
          mobileSidebarOpen
            ? 'fixed inset-y-0 left-0 z-40 flex w-72'
            : 'hidden lg:flex lg:w-72 xl:w-80'
        } flex-col justify-between bg-[#11131A] border-r border-[#232734] shrink-0 min-h-screen`}
      >
        <div className="p-6 space-y-7">
          {/* Brand Header */}
          <div className="flex items-center justify-between pb-5 border-b border-[#232734]">
            <a
              href={`/dashboard/${activeRole.toLowerCase()}`}
              onClick={(e) =>
                handleLinkClick(e, `/dashboard/${activeRole.toLowerCase()}`)
              }
              className="text-left group focus:outline-none"
            >
              <div className="flex items-center gap-2.5">
                <span className="w-2.5 h-2.5 rounded-full bg-brand-champagne" />
                <span className="text-lg font-semibold tracking-tight text-[#F3F4F6] group-hover:text-brand-champagne transition-colors">
                  Kanavugal Academy
                </span>
              </div>
              <p className="text-xs md:text-sm font-medium text-[#9CA3AF] uppercase tracking-wider mt-1">
                NEET UG · JEE · Classes 6–12
              </p>
            </a>

            <button
              type="button"
              onClick={() => setMobileSidebarOpen(false)}
              className="lg:hidden p-1.5 rounded-md bg-[#0A0B0E] border border-[#232734] text-[#9CA3AF] hover:text-[#F3F4F6]"
              aria-label="Close sidebar"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Active Session Identity Card */}
          <div className="bg-[#13161F] border border-[#232734] rounded-lg p-4 space-y-3">
            <div className="flex items-center justify-between">
              <span className="inline-flex items-center gap-1.5 text-xs font-medium uppercase tracking-wider text-brand-champagne">
                <ShieldCheck className="w-3.5 h-3.5" />
                {activeRole} SESSION
              </span>
              <span className="font-mono text-xs text-[#3B82F6] bg-[#0A0B0E] px-2 py-0.5 rounded border border-[#232734]">
                {userCard.badge}
              </span>
            </div>

            <div>
              <h2 className="text-base font-semibold text-[#F3F4F6]">
                {userCard.name}
              </h2>
              <p className="font-mono text-xs text-[#9CA3AF] mt-0.5">
                {userCard.identifier}
              </p>
            </div>

            <div className="pt-2.5 border-t border-[#232734] flex items-center justify-between text-xs text-[#9CA3AF]">
              <span className="inline-flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-brand-champagne" />
                {userCard.campus}
              </span>
              <span className="font-mono text-xs text-[#F3F4F6] truncate max-w-[130px]">
                {userCard.subMeta}
              </span>
            </div>
          </div>

          {/* Nested Route Navigation Menu */}
          <nav
            className="space-y-2"
            aria-label={`${activeRole} Nested Route Navigation`}
          >
            <p className="px-3 pb-1 text-xs md:text-sm font-medium uppercase tracking-wider text-[#9CA3AF]">
              {activeRole} Workspace
            </p>
            {navItems.map((item) => {
              const isActive = item.matchPaths.includes(cleanPath);
              return (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={(e) => handleLinkClick(e, item.href)}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-md text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-brand-champagne text-[#0A0B0E] font-semibold'
                      : 'text-[#9CA3AF] hover:text-[#F3F4F6] hover:bg-[#13161F]'
                  }`}
                >
                  <span className="flex items-center gap-3 text-left min-w-0">
                    <span className="shrink-0">{item.icon}</span>
                    <span className="truncate">{item.label}</span>
                  </span>
                  {item.badge && (
                    <span
                      className={`font-mono text-xs px-2 py-0.5 rounded whitespace-nowrap shrink-0 ${
                        isActive
                          ? 'bg-[#0A0B0E]/20 text-[#0A0B0E] font-semibold'
                          : 'bg-[#0A0B0E] text-[#9CA3AF] border border-[#232734]'
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                </a>
              );
            })}
          </nav>
        </div>

        {/* Bottom Sidebar Footer */}
        <div className="p-6 border-t border-[#232734] space-y-4">
          {activeRole === 'STUDENT' && (
            <div className="bg-[#13161F] border border-[#232734] rounded-lg p-4 space-y-2.5">
              <div className="flex items-center justify-between text-xs font-medium uppercase tracking-wider">
                <span className="text-[#9CA3AF]">NTA CBT Hall</span>
                <span className="font-mono text-brand-champagne">+4 / -1</span>
              </div>
              <a
                href="/exam/exm_jee_mock_01/attempt"
                onClick={(e) =>
                  handleLinkClick(e, '/exam/exm_jee_mock_01/attempt')
                }
                className="w-full inline-flex items-center justify-center gap-2 px-3.5 py-2.5 rounded-md bg-brand-champagne hover:bg-[#F1C48F] text-[#0A0B0E] text-sm font-semibold transition-colors"
              >
                <span>Enter CBT Exam Hall</span>
                <ArrowUpRight className="w-4 h-4" />
              </a>
            </div>
          )}

          <div className="flex items-center justify-between pt-1">
            <a
              href="/login"
              onClick={(e) => handleLinkClick(e, '/login')}
              className="inline-flex items-center gap-2 text-sm font-medium text-[#9CA3AF] hover:text-[#F3F4F6] transition-colors"
            >
              <LogOut className="w-4 h-4 text-brand-champagne" />
              <span>Sign Out (/login)</span>
            </a>
            <span className="font-mono text-xs text-[#3B82F6]">AY 2026–27</span>
          </div>
        </div>
      </aside>

      {/* Main Content Area + Minimal Top Header with Global "← Back" Button */}
      <div className="flex-1 min-w-0 flex flex-col bg-[#0A0B0E]">
        <div className="hidden lg:flex items-center justify-between px-10 py-4 bg-[#11131A] border-b border-[#232734]">
          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={handleGlobalBack}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-md bg-[#13161F] hover:bg-[#191D29] border border-[#232734] text-xs md:text-sm font-medium text-[#9CA3AF] hover:text-[#F3F4F6] transition-colors"
            >
              <ArrowLeft className="w-4 h-4 text-brand-champagne" />
              <span>← Back</span>
            </button>

            <div className="flex items-center gap-2 text-xs md:text-sm font-medium text-[#9CA3AF] uppercase tracking-wider">
              <span>Kanavugal Academy LMS</span>
              <span>•</span>
              <span className="font-mono text-[#3B82F6] normal-case">
                {cleanPath}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={() => navigate('/login')}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-[#13161F] hover:border-brand-champagne border border-[#232734] text-xs font-medium text-[#9CA3AF] hover:text-[#F3F4F6] transition-colors"
            >
              <LogOut className="w-3.5 h-3.5 text-brand-champagne" />
              <span>Switch Role / Sign Out</span>
            </button>

            <div className="flex items-center gap-2 text-xs font-medium text-[#9CA3AF] uppercase tracking-wider font-mono">
              <span className="w-2 h-2 rounded-full bg-brand-champagne" />
              <span>SBO COLONY & ANAIYUR</span>
            </div>
          </div>
        </div>

        <main className="flex-1">{children}</main>
      </div>
    </div>
  );
};

export default DashboardLayout;
