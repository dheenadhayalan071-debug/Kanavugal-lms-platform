import React, { useState } from 'react';
import {
  ShieldCheck,
  Lock,
  Mail,
  ArrowRight,
  ArrowLeft,
  GraduationCap,
  ExternalLink,
  UserCheck,
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
  subtitle: string;
}[] = [
  {
    role: 'STUDENT',
    label: 'Student',
    subtitle: 'Classes 6–12 · NEET & JEE',
  },
  {
    role: 'TEACHER',
    label: 'Teacher',
    subtitle: 'Faculty & CBT Studio',
  },
  {
    role: 'PARENT',
    label: 'Parent',
    subtitle: 'Guardian Telemetry',
  },
  {
    role: 'ADMIN',
    label: 'Admin',
    subtitle: 'SBO Colony & Anaiyur',
  },
];

export const LoginPage: React.FC = () => {
  const { switchMockRole, navigate } = useLms();
  const [selectedRole, setSelectedRole] = useState<MockRole>('STUDENT');
  const [email, setEmail] = useState(ROLE_DEFAULT_EMAILS.STUDENT);
  const [password, setPassword] = useState('••••••••••••');
  const [publicSiteNotice, setPublicSiteNotice] = useState<string | null>(null);

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

  const handleBackToPublicSite = () => {
    setPublicSiteNotice(
      'Simulated redirect to https://kanavugal.academy (Public Institutional Website).'
    );
    setTimeout(() => {
      setPublicSiteNotice(null);
    }, 4500);
  };

  return (
    <main className="min-h-screen bg-[#080808] text-[#F5F3EF] flex flex-col justify-between px-4 sm:px-8 py-8 relative overflow-x-hidden">
      {publicSiteNotice && (
        <div className="fixed bottom-6 right-6 z-50 max-w-md bg-[#111111] border border-[#FF4B00] rounded-lg px-5 py-4 shadow-2xl flex items-center gap-3">
          <ExternalLink className="w-4 h-4 text-[#FF4B00] shrink-0" />
          <p className="text-base text-[#F5F3EF] leading-relaxed">
            {publicSiteNotice}
          </p>
        </div>
      )}

      {/* Top Bar with Subtle "← Back to Kanavugal.Academy" Button */}
      <header className="w-full max-w-7xl mx-auto flex items-center justify-between">
        <button
          type="button"
          onClick={handleBackToPublicSite}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-[#111111] hover:bg-[#181818] text-[#A1A1AA] hover:text-[#F5F3EF] border border-[#292929] text-xs md:text-sm font-medium transition-colors"
        >
          <ArrowLeft className="w-4 h-4 text-[#FF4B00]" />
          <span>← Back to Kanavugal.Academy</span>
        </button>

        <div className="hidden sm:flex items-center gap-2 text-xs md:text-sm font-medium text-[#A1A1AA] uppercase tracking-wider font-mono">
          <span className="w-2 h-2 rounded-full bg-[#FF4B00]" />
          <span>SBO COLONY · ANAIYUR</span>
        </div>
      </header>

      {/* Center Authentication Card */}
      <div className="my-auto py-12 flex items-center justify-center">
        <div className="w-full max-w-lg bg-[#111111] border border-[#292929] rounded-lg p-8 sm:p-10 space-y-8">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 text-xs md:text-sm font-medium text-[#FF4B00] uppercase tracking-wider">
              <ShieldCheck className="w-4 h-4" />
              <span>Supabase Auth · Enterprise LMS Portal</span>
            </div>
            <h1 className="text-xl md:text-2xl font-semibold tracking-tight text-[#F5F3EF]">
              Sign in to Kanavugal Academy
            </h1>
            <p className="text-base text-[#A1A1AA] leading-relaxed">
              Select your institutional role to access Classes 6–12, NEET UG,
              and JEE Main & Advanced workspaces.
            </p>
          </div>

          <form onSubmit={handleSignIn} className="space-y-6">
            {/* Clean, Premium Select Role Toggle & Dropdown */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <label
                  htmlFor="login-role-select"
                  className="block text-xs md:text-sm font-medium text-[#A1A1AA] uppercase tracking-wider"
                >
                  Select Role
                </label>
                <span className="font-mono text-xs text-[#FF4B00]">
                  Routes to {resolveLoginDashboardRoute(selectedRole)}
                </span>
              </div>

              {/* Segmented Role Toggle Buttons */}
              <div
                className="grid grid-cols-2 sm:grid-cols-4 gap-2 bg-[#080808] p-1.5 rounded-md border border-[#292929]"
                role="radiogroup"
                aria-label="Select Role Toggle"
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
                      className={`py-2.5 px-3 rounded text-xs md:text-sm font-medium transition-colors text-center ${
                        isActive
                          ? 'bg-[#FF4B00] text-[#F5F3EF] font-semibold'
                          : 'text-[#A1A1AA] hover:text-[#F5F3EF] hover:bg-[#111111]'
                      }`}
                    >
                      {opt.label}
                    </button>
                  );
                })}
              </div>

              {/* Accessible Native Dropdown synchronized with the Role Toggle */}
              <div className="relative">
                <UserCheck className="w-4 h-4 text-[#FF4B00] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                <select
                  id="login-role-select"
                  aria-label="Select Role"
                  value={selectedRole}
                  onChange={(e) => handleSelectRole(e.target.value as MockRole)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-md bg-[#080808] border border-[#292929] text-base text-[#F5F3EF] focus:outline-none focus:border-[#FF4B00]"
                >
                  {ROLE_OPTIONS.map((opt) => (
                    <option key={opt.role} value={opt.role}>
                      {opt.label} — {opt.subtitle}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="space-y-2">
              <label
                htmlFor="login-email-input"
                className="block text-xs md:text-sm font-medium text-[#A1A1AA] uppercase tracking-wider"
              >
                Academy Email Address
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-[#A1A1AA] absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  id="login-email-input"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 rounded-md bg-[#080808] border border-[#292929] text-base text-[#F5F3EF] focus:outline-none focus:border-[#FF4B00]"
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label
                  htmlFor="login-password-input"
                  className="block text-xs md:text-sm font-medium text-[#A1A1AA] uppercase tracking-wider"
                >
                  Password
                </label>
                <span className="font-mono text-xs text-[#A1A1AA]">
                  Supabase JWT Session
                </span>
              </div>
              <div className="relative">
                <Lock className="w-4 h-4 text-[#A1A1AA] absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  id="login-password-input"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 rounded-md bg-[#080808] border border-[#292929] text-base text-[#F5F3EF] focus:outline-none focus:border-[#FF4B00]"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3.5 rounded-md bg-[#FF4B00] hover:bg-[#E04200] text-[#F5F3EF] text-base font-semibold inline-flex items-center justify-center gap-2 transition-colors"
            >
              <span>Sign In</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          <div className="pt-5 border-t border-[#292929] flex items-center justify-between text-xs md:text-sm font-medium text-[#A1A1AA]">
            <span className="inline-flex items-center gap-2">
              <GraduationCap className="w-4 h-4 text-[#FF4B00]" />
              SBO Colony & Anaiyur Campuses
            </span>
            <span className="font-mono text-xs">AY 2026–27</span>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="w-full max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 text-xs md:text-sm text-[#A1A1AA] border-t border-[#292929] pt-5">
        <span>© 2026 Kanavugal Academy. All rights reserved.</span>
        <span className="font-mono text-xs">
          Classes 6–12 · NEET UG · JEE Main & Advanced
        </span>
      </footer>
    </main>
  );
};

export default LoginPage;
