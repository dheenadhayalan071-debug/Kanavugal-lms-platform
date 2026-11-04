import React, { useState } from 'react';
import {
  ShieldCheck,
  Lock,
  Mail,
  ArrowRight,
  ArrowLeft,
  GraduationCap,
} from 'lucide-react';
import { MockRole, useLms } from '../../context/LmsContext';
import { resolveLoginDashboardRoute } from '../../lib/lmsLogic';

const ROLE_DEFAULT_EMAILS: Record<MockRole, string> = {
  STUDENT: 'kavin.rajan@kanavugal.academy',
  TEACHER: 'ananya.velu@kanavugal.academy',
  PARENT: 'rajan.sundaram@kanavugal.academy',
  ADMIN: 'meenakshi.admin@kanavugal.academy',
};

const ROLE_OPTIONS: {
  role: MockRole;
  label: string;
}[] = [
  { role: 'STUDENT', label: 'Student' },
  { role: 'TEACHER', label: 'Teacher' },
  { role: 'PARENT', label: 'Parent' },
  { role: 'ADMIN', label: 'Admin' },
];

export const LoginPage: React.FC = () => {
  const { switchMockRole, navigate } = useLms();
  const [selectedRole, setSelectedRole] = useState<MockRole>('STUDENT');
  const [email, setEmail] = useState(ROLE_DEFAULT_EMAILS.STUDENT);
  const [password, setPassword] = useState('••••••••••••');

  const handleSelectRole = (role: MockRole) => {
    setSelectedRole(role);
    setEmail(ROLE_DEFAULT_EMAILS[role]);
  };

  const handleSignIn = (e: React.FormEvent) => {
    e.preventDefault();
    const targetPath = resolveLoginDashboardRoute(selectedRole);
    switchMockRole(selectedRole, false);
    navigate(targetPath);
  };

  return (
    <main className="min-h-[100dvh] flex flex-col justify-center items-center bg-[#0A0B0E] text-[#F3F4F6] px-4 py-3 relative overflow-x-hidden">
      {/* Compact Top Bar */}
      <div className="w-full max-w-sm md:max-w-md mx-auto flex items-center justify-between mb-3">
        <a
          href="https://kanavugal-frontend.vercel.app/"
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-[#13161F] hover:bg-[#11131A] text-[#9CA3AF] hover:text-[#F3F4F6] border border-[#232734] text-xs font-medium transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5 text-brand-champagne" />
          <span>← Back to Kanavugal.Academy</span>
        </a>

        <div className="hidden sm:flex items-center gap-1.5 text-[11px] font-mono text-[#9CA3AF]">
          <span className="w-1.5 h-1.5 rounded-full bg-brand-champagne" />
          <span>SBO · ANAIYUR</span>
        </div>
      </div>

      {/* Central Login Card */}
      <div className="w-full max-w-sm md:max-w-md mx-auto p-6 md:p-8 bg-[#13161F] border border-[#232734] rounded-lg shadow-2xl">
        <div className="inline-flex items-center gap-1.5 text-xs font-bold text-brand-champagne uppercase tracking-wider mb-2">
          <ShieldCheck className="w-4 h-4" />
          <span>Supabase Auth · Enterprise LMS</span>
        </div>

        <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-[#F3F4F6] mb-1.5">
          Sign in to Kanavugal Academy
        </h1>

        <p className="text-sm md:text-base text-[#9CA3AF] mb-6 leading-snug">
          Select your role to access Classes 6–12, NEET UG, and JEE Main &
          Advanced workspaces.
        </p>

        <form onSubmit={handleSignIn} className="space-y-4">
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-[#9CA3AF] uppercase tracking-wider">
                Select Role
              </span>
              <span className="font-mono text-[11px] text-[#3B82F6]">
                {resolveLoginDashboardRoute(selectedRole)}
              </span>
            </div>

            <div
              className="grid grid-cols-4 gap-1.5 bg-[#0A0B0E] p-1 rounded-md border border-[#232734]"
              role="radiogroup"
              aria-label="Select Role"
            >
              {ROLE_OPTIONS.map((opt) => {
                const isActive = selectedRole === opt.role;
                return (
                  <button
                    key={opt.role}
                    type="button"
                    role="radio"
                    aria-checked={isActive}
                    onClick={() => handleSelectRole(opt.role)}
                    className={`py-2 px-2 rounded text-xs font-semibold transition-colors text-center cursor-pointer ${
                      isActive
                        ? 'bg-brand-champagne text-[#0A0B0E]'
                        : 'text-[#9CA3AF] hover:text-[#F3F4F6] hover:bg-[#11131A]'
                    }`}
                  >
                    {opt.label}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="space-y-1.5">
            <label
              htmlFor="login-email-input"
              className="block text-xs font-bold text-[#9CA3AF] uppercase tracking-wider"
            >
              Academy Email Address
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-[#9CA3AF] absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                id="login-email-input"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-9 pr-3.5 py-2.5 rounded-md bg-[#0A0B0E] border border-[#232734] text-sm text-[#F3F4F6] focus:outline-none focus:border-brand-champagne"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <label
                htmlFor="login-password-input"
                className="block text-xs font-bold text-[#9CA3AF] uppercase tracking-wider"
              >
                Password
              </label>
              <span className="font-mono text-[11px] text-[#3B82F6]">
                JWT Session
              </span>
            </div>
            <div className="relative">
              <Lock className="w-4 h-4 text-[#9CA3AF] absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                id="login-password-input"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-9 pr-3.5 py-2.5 rounded-md bg-[#0A0B0E] border border-[#232734] text-sm text-[#F3F4F6] focus:outline-none focus:border-brand-champagne"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-2.5 rounded-md bg-brand-champagne hover:bg-[#F1C48F] text-[#0A0B0E] text-sm font-semibold inline-flex items-center justify-center gap-2 transition-colors cursor-pointer"
          >
            <span>Sign In</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="mt-5 pt-4 border-t border-[#232734] flex items-center justify-between text-xs text-[#9CA3AF]">
          <span className="inline-flex items-center gap-1.5">
            <GraduationCap className="w-3.5 h-3.5 text-brand-champagne" />
            SBO Colony & Anaiyur Campuses
          </span>
          <span className="font-mono text-[11px] text-[#3B82F6]">
            AY 2026–27
          </span>
        </div>
      </div>

      <footer className="w-full max-w-sm md:max-w-md mx-auto flex items-center justify-between text-[11px] text-[#9CA3AF] mt-3">
        <span>© 2026 Kanavugal Academy</span>
        <span className="font-mono">NEET · JEE · Classes 6–12</span>
      </footer>
    </main>
  );
};
