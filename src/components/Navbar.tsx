import React from 'react';
import { GraduationCap, BookOpen, Award, LogIn, LayoutDashboard } from 'lucide-react';
import { useLms } from '../context/LmsContext';

export const Navbar: React.FC = () => {
  const { currentPath, navigate } = useLms();

  const cleanPath = currentPath.split('?')[0].replace(/\/+$/, '') || '/';

  if (cleanPath.startsWith('/dashboard')) {
    return null;
  }

  const isActive = (path: string) => {
    if (path === '/') return cleanPath === '/';
    return cleanPath.startsWith(path);
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-[#0A0B0E]/95 backdrop-blur-md border-b border-[#232734]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Zone 1: Brand Identity */}
        <button
          type="button"
          onClick={() => navigate('/')}
          className="flex items-center gap-3 text-left focus:outline-none group"
        >
          <div className="w-8 h-8 rounded-md bg-[#13161F] border border-[#232734] flex items-center justify-center group-hover:border-brand-champagne transition-colors">
            <GraduationCap className="w-4 h-4 text-brand-champagne" />
          </div>
          <div>
            <span className="text-base font-semibold tracking-tight text-[#F3F4F6]">
              Kanavugal Academy
            </span>
            <span className="hidden sm:inline-block ml-2.5 font-mono text-[11px] text-[#9CA3AF] px-2 py-0.5 rounded bg-[#13161F] border border-[#232734]">
              NEET · JEE · CBSE
            </span>
          </div>
        </button>

        {/* Zone 2: Primary Navigation */}
        <nav aria-label="Main Navigation" className="hidden md:flex items-center gap-6">
          <button
            type="button"
            onClick={() => navigate('/')}
            className={`text-sm font-medium transition-colors ${
              isActive('/')
                ? 'text-brand-champagne'
                : 'text-[#9CA3AF] hover:text-[#F3F4F6]'
            }`}
          >
            Academic Programmes
          </button>

          <button
            type="button"
            onClick={() => navigate('/dashboard/student')}
            className={`text-sm font-medium transition-colors flex items-center gap-1.5 ${
              isActive('/dashboard')
                ? 'text-brand-champagne'
                : 'text-[#9CA3AF] hover:text-[#F3F4F6]'
            }`}
          >
            <LayoutDashboard className="w-4 h-4" />
            <span>Student Dashboard</span>
          </button>

          <button
            type="button"
            onClick={() => navigate('/exam/exm_jee_mock_01')}
            className={`text-sm font-medium transition-colors flex items-center gap-1.5 ${
              isActive('/exam')
                ? 'text-brand-champagne'
                : 'text-[#9CA3AF] hover:text-[#F3F4F6]'
            }`}
          >
            <Award className="w-4 h-4" />
            <span>NTA CBT Mock Portal</span>
          </button>
        </nav>

        {/* Zone 3: Auth & Student Portal Action */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => navigate('/login')}
            className="px-3.5 py-2 rounded-md bg-[#13161F] hover:bg-[#191D28] text-[#F3F4F6] border border-[#232734] text-xs font-medium inline-flex items-center gap-1.5 transition-colors"
          >
            <LogIn className="w-3.5 h-3.5 text-[#9CA3AF]" />
            <span>Sign In</span>
          </button>

          <button
            type="button"
            onClick={() => navigate('/dashboard/student')}
            className="px-4 py-2 rounded-md bg-brand-champagne hover:bg-[#F1C48F] text-[#0A0B0E] text-xs font-semibold inline-flex items-center gap-1.5 transition-colors"
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>Student Portal</span>
          </button>
        </div>
      </div>
    </header>
  );
};
