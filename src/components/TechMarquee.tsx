import React from 'react';
import { TECH_STACK_MARQUEE_ITEMS } from '../data/mockDatabase';

export const TechMarquee: React.FC = () => {
  const doubledItems = [...TECH_STACK_MARQUEE_ITEMS, ...TECH_STACK_MARQUEE_ITEMS];

  return (
    <section
      aria-label="Core Technology Stack"
      className="w-full bg-zinc-950 border-y-2 border-white py-3.5 overflow-hidden select-none"
    >
      <div className="animate-marquee flex items-center">
        {doubledItems.map((item, idx) => (
          <div
            key={`${item}-${idx}`}
            className="flex items-center shrink-0 whitespace-nowrap"
          >
            <span className="font-mono text-xs md:text-sm font-bold tracking-widest text-white px-6">
              {item}
            </span>
            <span
              aria-hidden="true"
              className="inline-block w-2.5 h-2.5 bg-[#F2FF00] border border-black"
            />
          </div>
        ))}
      </div>
    </section>
  );
};
