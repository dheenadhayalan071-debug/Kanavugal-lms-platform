import React from 'react';
import './globals.css';

export const metadata = {
  title: 'Kanavugal Academy — NEET UG, JEE Main & Advanced & Board LMS',
  description:
    'Premier academic and competitive examination preparation center for Classes 6–12, NEET UG, and JEE Main & Advanced across SBO Colony and Anaiyur.',
};

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" className="dark">
      <body className="min-h-screen bg-[#0A0B0E] text-[#F3F4F6] font-sans antialiased selection:bg-brand-champagne selection:text-[#0A0B0E] overflow-x-hidden">
        <div className="min-h-screen flex flex-col bg-[#0A0B0E] text-[#F3F4F6]">
          {children}
        </div>
      </body>
    </html>
  );
}
