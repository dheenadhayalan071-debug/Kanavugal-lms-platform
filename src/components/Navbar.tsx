import React from 'react';
import { GraduationCap, BookOpen, Award, LogIn, LayoutDashboard } from 'lucide-react';
import { useLms } from '../context/LmsContext';

export const Navbar: React.FC = () => {
  const { currentPath, navigate } = useLms();

  const cleanPath = currentPath.split('?')[0].replace(/\/+$/, '') || '/';

  // Student Dashboard (/dashboard/student) has its own integrated left sidebar & header
  if (cleanPath.startsWith('/dashboard')) {
    return null;
  }

  const isActive = (path: string) => {
    if (path === '/') return cleanPath === '/';
    return cleanPath.startsWith(path);
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-[#080808]/95 backdrop-blur-md border-b border-[#292929]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Zone 1: Brand Identity */}
        <button
          type="button"
          onClick={() => navigate('/')}
          className="flex items-center gap-3 text-left focus:outline-none group"
        >
          <div className="w-8 h-8 rounded-md bg-[#111111] border border-[#292929] flex items-center justify-center group-hover:border-[#FF4B00] transition-colors">
            <GraduationCap className="w-4 h-4 text-[#FF4B00]" />
          </div>
          <div>
            <span className="text-base font-semibold tracking-tight text-[#F5F3EF]">
              Kanavugal Academy
            </span>
            <span className="hidden sm:inline-block ml-2.5 font-mono text-[11px] text-[#A1A1AA] px-2 py-0.5 rounded bg-[#111111] border border-[#292929]">
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
                ? 'text-[#FF4B00]'
                : 'text-[#A1A1AA] hover:text-[#F5F3EF]'
            }`}
          >
            Academic Programmes
          </button>

          <button
            type="button"
            onClick={() => navigate('/dashboard/student')}
            className={`text-sm font-medium transition-colors flex items-center gap-1.5 ${
              isActive('/dashboard')
                ? 'text-[#FF4B00]'
                : 'text-[#A1A1AA] hover:text-[#F5F3EF]'
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
                ? 'text-[#FF4B00]'
                : 'text-[#A1A1AA] hover:text-[#F5F3EF]'
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
            className="px-3.5 py-2 rounded-md bg-[#111111] hover:bg-[#1a1a1a] text-[#F5F3EF] border border-[#292929] text-xs font-medium inline-flex items-center gap-1.5 transition-colors"
          >
            <LogIn className="w-3.5 h-3.5 text-[#A1A1AA]" />
            <span>Sign In</span>
          </button>

          <button
            type="button"
            onClick={() => navigate('/dashboard/student')}
            className="px-4 py-2 rounded-md bg-[#FF4B00] hover:bg-[#E04200] text-[#F5F3EF] text-xs font-medium inline-flex items-center gap-1.5 transition-colors"
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>Student Portal</span>
          </button>
        </div>
      </div>
    </header>
  );
};
