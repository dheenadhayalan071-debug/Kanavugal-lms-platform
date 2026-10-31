import React, { useEffect } from 'react';
import { useLms } from '../context/LmsContext';

/**
 * Root Route (`/`)
 * Automatically redirects unauthenticated/root visitors to `/login`.
 */
export const RootRedirectPage: React.FC = () => {
  const { navigate } = useLms();

  useEffect(() => {
    navigate('/login');
  }, [navigate]);

  return (
    <div className="min-h-screen bg-[#0A0B0E] text-[#F3F4F6] flex items-center justify-center">
      <div className="flex items-center gap-3 text-xs text-[#9CA3AF] font-mono">
        <span className="w-2 h-2 rounded-full bg-brand-champagne animate-pulse" />
        <span>Redirecting to Kanavugal Academy Auth Portal (/login)...</span>
      </div>
    </div>
  );
};

export default RootRedirectPage;
