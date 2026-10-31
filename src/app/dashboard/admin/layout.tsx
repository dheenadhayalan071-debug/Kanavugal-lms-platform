import React, { useState } from 'react';
import {
  Building2,
  UserCheck,
  Layers,
  Receipt,
  ShieldCheck,
  MapPin,
  Menu,
  X,
  LogOut,
  ArrowLeft,
} from 'lucide-react';
import { useLms } from '../../../context/LmsContext';

interface AdminTabItem {
  label: string;
  href: string;
  badge?: string;
  icon: React.ReactNode;
  matchPaths: string[];
}

const ADMIN_TABS: AdminTabItem[] = [
  {
    label: 'Branch Overview',
    href: '/dashboard/admin',
    badge: 'SBO · ANA',
    icon: <Building2 className="w-4 h-4" />,
    matchPaths: ['/dashboard/admin', '/dashboard/admin/overview'],
  },
  {
    label: 'Users & Parent Links',
    href: '/dashboard/admin/users',
    badge: '2 Pending',
    icon: <UserCheck className="w-4 h-4" />,
    matchPaths: ['/dashboard/admin/users'],
  },
  {
    label: 'Batch & Faculty Control',
    href: '/dashboard/admin/batches',
    badge: 'Batches',
    icon: <Layers className="w-4 h-4" />,
    matchPaths: ['/dashboard/admin/batches'],
  },
  {
    label: 'Finance & Fee Ledger',
    href: '/dashboard/admin/finance',
    badge: 'Cash / UPI',
    icon: <Receipt className="w-4 h-4" />,
    matchPaths: ['/dashboard/admin/finance'],
  },
];

interface AdminDashboardLayoutProps {
  children: React.ReactNode;
}

export const AdminDashboardLayout: React.FC<AdminDashboardLayoutProps> = ({
  children,
}) => {
  const { currentPath, navigate } = useLms();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const cleanPath =
    currentPath.split('?')[0].replace(/\/+$/, '') || '/dashboard/admin';

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
            Admin Console
          </span>
        </div>

        <button
          type="button"
          onClick={() => setMobileMenuOpen((prev) => !prev)}
          className="p-2 rounded-md bg-[#080808] border border-[#292929] text-[#F5F3EF] hover:border-[#FF4B00] transition-colors"
          aria-label="Toggle Admin Sidebar"
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

      {/* Admin Native Sidebar Navigation */}
      <aside
        className={`${
          mobileMenuOpen
            ? 'fixed inset-y-0 left-0 z-40 flex w-72'
            : 'hidden lg:flex lg:w-72 xl:w-80'
        } flex-col justify-between bg-[#111111] border-r border-[#292929] shrink-0 min-h-screen`}
      >
        <div className="p-6 space-y-6">
          {/* Brand Header */}
          <div className="flex items-center justify-between pb-5 border-b border-[#292929]">
            <a
              href="/dashboard/admin"
              onClick={(e) => handleNavClick(e, '/dashboard/admin')}
              className="group focus:outline-none"
            >
              <div className="flex items-center gap-2.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#FF4B00]" />
                <span className="text-base font-semibold tracking-tight text-[#F5F3EF] group-hover:text-[#FF4B00] transition-colors">
                  Kanavugal Academy
                </span>
              </div>
              <p className="text-xs text-[#A1A1AA] mt-1">
                Institutional Administration Console
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

          {/* Admin Identity Card */}
          <div className="bg-[#080808] border border-[#292929] rounded-lg p-4 space-y-3">
            <div className="flex items-center justify-between">
              <span className="inline-flex items-center gap-1.5 text-[11px] font-medium text-[#FF4B00]">
                <ShieldCheck className="w-3.5 h-3.5" />
                ADMIN SESSION
              </span>
              <span className="font-mono text-[11px] text-[#A1A1AA] bg-[#111111] px-2 py-0.5 rounded border border-[#292929]">
                Super Admin
              </span>
            </div>

            <div>
              <h2 className="text-base font-semibold text-[#F5F3EF]">
                Meenakshi Sundaram
              </h2>
              <p className="font-mono text-xs text-[#A1A1AA] mt-0.5">
                ID: KA-ADM-001
              </p>
            </div>

            <div className="pt-2 border-t border-[#292929] flex items-center justify-between text-xs text-[#A1A1AA]">
              <span className="inline-flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-[#FF4B00]" />
                All Branches
              </span>
              <span className="font-mono text-[11px] text-[#F5F3EF]">
                SBO & Anaiyur
              </span>
            </div>
          </div>

          {/* Nested Route Tab Menu */}
          <nav className="space-y-1.5" aria-label="Admin Workspace Tabs">
            <p className="px-3 pb-1.5 text-[11px] font-medium uppercase tracking-wider text-[#A1A1AA]">
              Admin Modules
            </p>
            {ADMIN_TABS.map((tab) => {
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

        {/* Bottom Sidebar Footer */}
        <div className="p-6 border-t border-[#292929]">
          <div className="flex items-center justify-between">
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
              <span>Admin Governance</span>
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

export default AdminDashboardLayout;
