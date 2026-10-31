import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: 'class',
  content: [
    './index.html',
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        obsidian: '#080808', // Background: Obsidian Black
        surface: '#111111',  // Surface/Cards: Deep Black
        accent: {
          DEFAULT: '#FF4B00', // Primary Accent/Buttons: Pure Orange
          hover: '#E04200',
          subtle: 'rgba(255, 75, 0, 0.12)',
        },
        primaryText: '#F5F3EF',   // Primary Text: Warm White
        secondaryText: '#A1A1AA', // Secondary Text: Muted Grey
        borderGrey: '#292929',    // Borders: 1px Subtle Border Grey
      },
      fontFamily: {
        sans: ['Inter', 'Plus Jakarta Sans', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
        mono: ['JetBrains Mono', 'ui-monospace', 'SFMono-Regular', 'monospace'],
      },
      borderRadius: {
        md: '0.375rem',
        lg: '0.5rem',
      },
    },
  },
  plugins: [],
};

export default config;
