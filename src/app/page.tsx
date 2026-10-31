import React, { useEffect } from 'react';
import { useLms } from '../context/LmsContext';

/**
 * Root Route (`/`)
 * Automatically redirects unauthenticated/root visitors to `/login`.
 * In Next.js 15 App Router production: `redirect('/login')` from `next/navigation`.
 */
export const RootRedirectPage: React.FC = () => {
  const { navigate } = useLms();

  useEffect(() => {
    navigate('/login');
  }, [navigate]);

  return (
    <div className="min-h-screen bg-[#080808] text-[#F5F3EF] flex items-center justify-center">
      <div className="flex items-center gap-3 text-xs text-[#A1A1AA] font-mono">
        <span className="w-2 h-2 rounded-full bg-[#FF4B00] animate-pulse" />
        <span>Redirecting to Kanavugal Academy Auth Portal (/login)...</span>
      </div>
    </div>
  );
};

export default RootRedirectPage;
