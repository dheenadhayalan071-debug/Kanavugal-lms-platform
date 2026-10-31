import React, { useState, useRef, useEffect } from 'react';
import {
  ChevronDown,
  GraduationCap,
  BookOpenCheck,
  Users,
  ShieldAlert,
  Check,
  Layers,
} from 'lucide-react';
import { MockRole, useLms } from '../context/LmsContext';

const ROLE_OPTIONS: {
  role: MockRole;
  label: string;
  route: string;
  userSummary: string;
  icon: React.ReactNode;
}[] = [
  {
    role: 'STUDENT',
    label: 'STUDENT',
    route: '/dashboard/student',
    userSummary: 'Kavin Rajan · Class 12 JEE',
    icon: <GraduationCap className="w-3.5 h-3.5 text-brand-champagne" />,
  },
  {
    role: 'TEACHER',
    label: 'TEACHER',
    route: '/dashboard/teacher',
    userSummary: 'Dr. Ananya Velu · Physics Faculty',
    icon: <BookOpenCheck className="w-3.5 h-3.5 text-brand-champagne" />,
  },
  {
    role: 'PARENT',
    label: 'PARENT',
    route: '/dashboard/parent',
    userSummary: 'Rajan Sundaram · 2 Linked Children',
    icon: <Users className="w-3.5 h-3.5 text-brand-champagne" />,
  },
  {
    role: 'ADMIN',
    label: 'ADMIN',
    route: '/dashboard/admin',
    userSummary: 'Meenakshi S · SBO & Anaiyur Admin',
    icon: <ShieldAlert className="w-3.5 h-3.5 text-brand-champagne" />,
  },
];

interface MockRoleSwitcherProps {
  variant?: 'header' | 'floating';
}

export const MockRoleSwitcher: React.FC<MockRoleSwitcherProps> = ({
  variant = 'header',
}) => {
  const { mockRole, switchMockRole } = useLms();
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const activeConfig =
    ROLE_OPTIONS.find((r) => r.role === mockRole) || ROLE_OPTIONS[0];

  if (variant === 'floating') {
    return (
      <div
        ref={containerRef}
        className="fixed bottom-4 right-4 z-50"
        data-testid="mock-role-switcher-floating"
      >
        {open && (
          <div className="mb-2 w-64 bg-[#13161F] border border-[#232734] rounded-lg p-2 shadow-2xl space-y-1">
            <div className="px-2.5 py-1.5 border-b border-[#232734] flex items-center justify-between">
              <span className="text-[11px] font-medium uppercase tracking-wider text-[#9CA3AF]">
                Dev Mock Role Switcher
              </span>
              <span className="font-mono text-[10px] text-brand-champagne">4 ROLES</span>
            </div>
            {ROLE_OPTIONS.map((item) => {
              const isSelected = item.role === mockRole;
              return (
                <button
                  key={item.role}
                  type="button"
                  onClick={() => {
                    switchMockRole(item.role, true);
                    setOpen(false);
                  }}
                  className={`w-full text-left px-2.5 py-2 rounded-md flex items-center justify-between transition-colors ${
                    isSelected
                      ? 'bg-brand-champagne/15 text-[#F3F4F6] border border-brand-champagne/40'
                      : 'text-[#9CA3AF] hover:text-[#F3F4F6] hover:bg-[#0A0B0E]'
                  }`}
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    {item.icon}
                    <div className="min-w-0">
                      <p className="text-xs font-semibold text-[#F3F4F6] font-mono">
                        {item.label}
                      </p>
                      <p className="text-[11px] text-[#9CA3AF] truncate">
                        {item.userSummary}
                      </p>
                    </div>
                  </div>
                  {isSelected && <Check className="w-3.5 h-3.5 text-brand-champagne shrink-0" />}
                </button>
              );
            })}
          </div>
        )}

        <button
          type="button"
          onClick={() => setOpen(!open)}
          className="flex items-center gap-2.5 px-3.5 py-2.5 rounded-lg bg-[#13161F] hover:bg-[#191D28] text-[#F3F4F6] border border-[#232734] shadow-xl text-xs font-medium transition-colors"
        >
          <Layers className="w-3.5 h-3.5 text-brand-champagne" />
          <span className="text-[#9CA3AF]">Role:</span>
          <span className="font-mono font-semibold text-brand-champagne">
            {activeConfig.label}
          </span>
          <ChevronDown
            className={`w-3.5 h-3.5 text-[#9CA3AF] transition-transform ${
              open ? 'rotate-180' : ''
            }`}
          />
        </button>
      </div>
    );
  }

  return (
    <div ref={containerRef} className="relative" data-testid="mock-role-switcher-header">
      <div className="flex items-center gap-2">
        <label
          htmlFor="header-role-select"
          className="hidden sm:inline-block text-xs text-[#9CA3AF]"
        >
          Mock Role:
        </label>
        <select
          id="header-role-select"
          aria-label="Mock Role Switcher"
          value={mockRole}
          onChange={(e) => switchMockRole(e.target.value as MockRole, true)}
          className="bg-[#13161F] border border-[#232734] hover:border-brand-champagne rounded-md px-3 py-1.5 text-xs font-mono font-medium text-[#F3F4F6] focus:outline-none focus:border-brand-champagne transition-colors cursor-pointer"
        >
          <option value="STUDENT">ROLE: STUDENT</option>
          <option value="TEACHER">ROLE: TEACHER</option>
          <option value="PARENT">ROLE: PARENT</option>
          <option value="ADMIN">ROLE: ADMIN</option>
        </select>
      </div>
    </div>
  );
};

export default MockRoleSwitcher;
