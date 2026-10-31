import React from 'react';

/**
 * High-contrast Broken-Grid Bento & Academic Architecture Schematics
 * Palette: Obsidian (#0D0D0D), Bone (#E9E3D5), Electric Yellow (#F2FF00),
 * Crimson Red (#FF0000), Petrol (#173F46)
 */
export const HeroBuilderSchematic: React.FC = () => {
  return (
    <div className="relative w-full h-full min-h-[400px] bg-[#0D0D0D] border-2 border-[#E9E3D5] p-6 flex flex-col justify-between brutal-shadow-yellow overflow-hidden">
      <div className="absolute inset-0 brutal-grid-bg pointer-events-none opacity-80" />

      {/* Top technical header bar */}
      <div className="relative z-10 flex items-center justify-between gap-3 border-b-2 border-zinc-800 pb-4">
        <div className="font-mono text-xs text-[#E9E3D5] tracking-wider whitespace-nowrap truncate">
          KANAVUGAL EDTECH ARCHITECTURE · SBO &amp; ANAIYUR
        </div>
        <div className="font-mono text-[11px] px-2.5 py-1 bg-[#173F46] text-[#F2FF00] border border-[#F2FF00] font-bold whitespace-nowrap shrink-0">
          6–12 · NEET · JEE
        </div>
      </div>

      {/* Central SVG System Architecture Diagram */}
      <div className="relative z-10 my-5 flex-1 flex items-center justify-center">
        <svg
          viewBox="0 0 600 285"
          className="w-full h-auto max-h-[265px]"
          role="img"
          aria-label="Kanavugal Academy Multi-Role LMS and Examination Engine Diagram"
        >
          {/* Connection buses */}
          <path
            d="M 165 70 L 245 70 L 245 142 L 290 142"
            fill="none"
            stroke="#F2FF00"
            strokeWidth="2.5"
          />
          <path
            d="M 165 210 L 245 210 L 245 142 L 290 142"
            fill="none"
            stroke="#E9E3D5"
            strokeWidth="2"
            strokeDasharray="6 4"
          />
          <path
            d="M 455 142 L 490 142"
            fill="none"
            stroke="#FF0000"
            strokeWidth="2.5"
          />

          {/* Left Top Node: Hybrid Video + Supabase PDF */}
          <g transform="translate(15, 28)">
            <rect x="4" y="4" width="150" height="84" fill="#F2FF00" />
            <rect
              x="0"
              y="0"
              width="150"
              height="84"
              fill="#0D0D0D"
              stroke="#E9E3D5"
              strokeWidth="2"
            />
            <text
              x="12"
              y="24"
              fill="#F2FF00"
              fontFamily="JetBrains Mono, monospace"
              fontSize="10"
              fontWeight="700"
            >
              HYBRID DELIVERY
            </text>
            <text
              x="12"
              y="46"
              fill="#E9E3D5"
              fontFamily="Archivo, sans-serif"
              fontSize="13"
              fontWeight="800"
            >
              YT UNLISTED + PDF
            </text>
            <text
              x="12"
              y="66"
              fill="#A1A1AA"
              fontFamily="JetBrains Mono, monospace"
              fontSize="10"
            >
              Supabase Storage RLS
            </text>
          </g>

          {/* Left Bottom Node: 4-Role Access & Approval */}
          <g transform="translate(15, 168)">
            <rect x="4" y="4" width="150" height="84" fill="#173F46" />
            <rect
              x="0"
              y="0"
              width="150"
              height="84"
              fill="#0D0D0D"
              stroke="#E9E3D5"
              strokeWidth="2"
            />
            <text
              x="12"
              y="24"
              fill="#E9E3D5"
              fontFamily="JetBrains Mono, monospace"
              fontSize="10"
              fontWeight="700"
            >
              4-ROLE GOVERNANCE
            </text>
            <text
              x="12"
              y="46"
              fill="#F2FF00"
              fontFamily="Archivo, sans-serif"
              fontSize="13"
              fontWeight="800"
            >
              STU · TCH · PAR · ADM
            </text>
            <text
              x="12"
              y="66"
              fill="#A1A1AA"
              fontFamily="JetBrains Mono, monospace"
              fontSize="10"
            >
              Multi-Child Parent Link
            </text>
          </g>

          {/* Center Core Node: Examination Engine */}
          <g transform="translate(290, 86)">
            <rect x="5" y="5" width="165" height="112" fill="#FF0000" />
            <rect
              x="0"
              y="0"
              width="165"
              height="112"
              fill="#0D0D0D"
              stroke="#F2FF00"
              strokeWidth="2.5"
            />
            <text
              x="14"
              y="24"
              fill="#FF0000"
              fontFamily="JetBrains Mono, monospace"
              fontSize="10"
              fontWeight="700"
            >
              MAIN DIFFERENTIATOR
            </text>
            <text
              x="14"
              y="48"
              fill="#E9E3D5"
              fontFamily="Archivo, sans-serif"
              fontSize="15"
              fontWeight="900"
            >
              CBT EXAM ENGINE
            </text>
            <text
              x="14"
              y="68"
              fill="#E9E3D5"
              fontFamily="JetBrains Mono, monospace"
              fontSize="10"
            >
              +4 / -1 Negative Mark
            </text>
            <text
              x="14"
              y="86"
              fill="#F2FF00"
              fontFamily="JetBrains Mono, monospace"
              fontSize="10"
            >
              Manual Result Release
            </text>
            <text
              x="14"
              y="102"
              fill="#A1A1AA"
              fontFamily="JetBrains Mono, monospace"
              fontSize="9"
            >
              Shared + Private Q-Bank
            </text>
          </g>

          {/* Right Node: Deep Analytics */}
          <g transform="translate(485, 80)">
            <rect x="4" y="4" width="100" height="124" fill="#E9E3D5" />
            <rect
              x="0"
              y="0"
              width="100"
              height="124"
              fill="#173F46"
              stroke="#E9E3D5"
              strokeWidth="2"
            />
            <text
              x="10"
              y="26"
              fill="#F2FF00"
              fontFamily="JetBrains Mono, monospace"
              fontSize="10"
              fontWeight="700"
            >
              TELEMETRY
            </text>
            <text
              x="10"
              y="48"
              fill="#E9E3D5"
              fontFamily="Archivo, sans-serif"
              fontSize="12"
              fontWeight="800"
            >
              SUBJECT &amp;
            </text>
            <text
              x="10"
              y="64"
              fill="#E9E3D5"
              fontFamily="Archivo, sans-serif"
              fontSize="12"
              fontWeight="800"
            >
              CHAPTER
            </text>
            <text
              x="10"
              y="80"
              fill="#E9E3D5"
              fontFamily="Archivo, sans-serif"
              fontSize="12"
              fontWeight="800"
            >
              REPORTS
            </text>
            <rect x="10" y="94" width="80" height="18" fill="#F2FF00" />
            <text
              x="14"
              y="107"
              fill="#0D0D0D"
              fontFamily="JetBrains Mono, monospace"
              fontSize="9"
              fontWeight="700"
            >
              TIME / Q STAT
            </text>
          </g>

          <rect x="240" y="137" width="10" height="10" fill="#F2FF00" />
          <rect x="475" y="137" width="10" height="10" fill="#FF0000" />
        </svg>
      </div>

      {/* Bottom architectural ledger */}
      <div className="relative z-10 grid grid-cols-3 gap-4 border-t-2 border-zinc-800 pt-4 font-mono text-xs">
        <div>
          <div className="text-zinc-400">ACTIVE BRANCHES</div>
          <div className="text-[#E9E3D5] font-bold text-sm mt-0.5">
            SBO &amp; ANAIYUR
          </div>
        </div>
        <div>
          <div className="text-zinc-400">EXAM ENGINE</div>
          <div className="text-[#F2FF00] font-bold text-sm mt-0.5">
            CBT + DESCRIPTIVE
          </div>
        </div>
        <div>
          <div className="text-zinc-400">SECURITY</div>
          <div className="text-[#FF0000] font-bold text-sm mt-0.5">
            SUPABASE RLS
          </div>
        </div>
      </div>
    </div>
  );
};

export const CourseSchematicBanner: React.FC<{
  variant: 'systems' | 'robotics' | 'protocol' | 'compiler';
}> = ({ variant }) => {
  if (variant === 'systems') {
    return (
      <div className="w-full h-36 bg-[#0D0D0D] border-b-2 border-zinc-800 p-4 flex items-center justify-between relative overflow-hidden">
        <div className="absolute inset-0 brutal-grid-bg opacity-60" />
        <div className="relative z-10 font-mono text-xs space-y-1">
          <div className="text-[#F2FF00] font-bold">TRACK: JEE MAIN &amp; ADVANCED</div>
          <div className="text-[#E9E3D5]">Mechanics · Electrostatics · Calculus</div>
          <div className="text-zinc-400">180-Min CBT Mock Series (+4 / -1)</div>
        </div>
        <svg viewBox="0 0 140 80" className="w-36 h-20 relative z-10">
          <rect x="4" y="10" width="45" height="60" fill="#173F46" stroke="#E9E3D5" strokeWidth="2" />
          <rect x="85" y="10" width="50" height="26" fill="#0D0D0D" stroke="#F2FF00" strokeWidth="2" />
          <rect x="85" y="44" width="50" height="26" fill="#0D0D0D" stroke="#FF0000" strokeWidth="2" />
          <path d="M 49 40 L 85 23 M 49 40 L 85 57" stroke="#F2FF00" strokeWidth="2" />
        </svg>
      </div>
    );
  }

  if (variant === 'robotics') {
    return (
      <div className="w-full h-36 bg-[#0D0D0D] border-b-2 border-zinc-800 p-4 flex items-center justify-between relative overflow-hidden">
        <div className="absolute inset-0 brutal-grid-bg opacity-60" />
        <div className="relative z-10 font-mono text-xs space-y-1">
          <div className="text-[#F2FF00] font-bold">TRACK: NEET UG MEDICAL</div>
          <div className="text-[#E9E3D5]">Physiology · Genetics · Organic Chem</div>
          <div className="text-zinc-400">720-Mark Timed Assertion Drills</div>
        </div>
        <svg viewBox="0 0 140 80" className="w-36 h-20 relative z-10">
          <rect x="35" y="12" width="56" height="56" fill="#0D0D0D" stroke="#F2FF00" strokeWidth="2" />
          <rect x="47" y="24" width="32" height="32" fill="#173F46" stroke="#E9E3D5" strokeWidth="1.5" />
          <path d="M 10 40 H 35 M 91 40 H 125 M 63 4 V 12 M 63 68 V 76" stroke="#FF0000" strokeWidth="2.5" />
        </svg>
      </div>
    );
  }

  if (variant === 'protocol') {
    return (
      <div className="w-full h-36 bg-[#0D0D0D] border-b-2 border-zinc-800 p-4 flex items-center justify-between relative overflow-hidden">
        <div className="absolute inset-0 brutal-grid-bg opacity-60" />
        <div className="relative z-10 font-mono text-xs space-y-1">
          <div className="text-[#F2FF00] font-bold">TRACK: CLASSES 11–12 BOARD</div>
          <div className="text-[#E9E3D5]">Physics · Chemistry · Mathematics</div>
          <div className="text-zinc-400">Descriptive Step-by-Step Evaluation</div>
        </div>
        <svg viewBox="0 0 140 80" className="w-36 h-20 relative z-10">
          <rect x="52" y="6" width="36" height="20" fill="#F2FF00" />
          <rect x="16" y="50" width="36" height="20" fill="#173F46" stroke="#E9E3D5" strokeWidth="2" />
          <rect x="88" y="50" width="36" height="20" fill="#0D0D0D" stroke="#F2FF00" strokeWidth="2" />
          <path d="M 70 26 L 34 50 M 70 26 L 106 50" stroke="#E9E3D5" strokeWidth="2" />
        </svg>
      </div>
    );
  }

  return (
    <div className="w-full h-36 bg-[#0D0D0D] border-b-2 border-zinc-800 p-4 flex items-center justify-between relative overflow-hidden">
      <div className="absolute inset-0 brutal-grid-bg opacity-60" />
      <div className="relative z-10 font-mono text-xs space-y-1">
        <div className="text-[#F2FF00] font-bold">TRACK: CLASSES 6–10 FOUNDATION</div>
        <div className="text-[#E9E3D5]">Number Theory · Geometry · Science</div>
        <div className="text-zinc-400">Olympiad &amp; NTSE Concept Builders</div>
      </div>
      <svg viewBox="0 0 140 80" className="w-36 h-20 relative z-10">
        <rect x="8" y="25" width="34" height="30" fill="#0D0D0D" stroke="#E9E3D5" strokeWidth="2" />
        <rect x="54" y="25" width="34" height="30" fill="#173F46" stroke="#F2FF00" strokeWidth="2" />
        <rect x="100" y="25" width="34" height="30" fill="#F2FF00" />
        <path d="M 42 40 H 54 M 88 40 H 100" stroke="#E9E3D5" strokeWidth="2" />
      </svg>
    </div>
  );
};
