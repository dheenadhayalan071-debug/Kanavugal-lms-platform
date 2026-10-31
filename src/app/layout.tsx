import React from 'react';
import '../index.css';

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
      <body className="min-h-screen bg-[#080808] text-[#F5F3EF] font-sans antialiased selection:bg-[#FF4B00] selection:text-[#F5F3EF] overflow-x-hidden">
        <div className="min-h-screen flex flex-col bg-[#080808] text-[#F5F3EF]">
          {children}
        </div>
      </body>
    </html>
  );
}
