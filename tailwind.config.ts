import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: 'class',
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        surface: {
          DEFAULT: '#050b14',
          dim: '#03070d',
          bright: '#333a44',
          lowest: '#03070d',
          low: '#08101d',
          container: '#0d1a30',
          high: '#142542',
          highest: '#1e3a5f',
          variant: '#2e353f',
        },
        'on-surface': {
          DEFAULT: '#e2e8f0',
          variant: '#94a3b8',
        },
        'inverse-surface': '#dce3f0',
        'inverse-on-surface': '#2a313b',
        outline: {
          DEFAULT: '#a08e7a',
          variant: '#534434',
        },
        'surface-tint': '#ffb95f',
        primary: {
          DEFAULT: '#ffc174',
          container: '#f59e0b',
          fixed: '#ffddb8',
          'fixed-dim': '#ffb95f',
        },
        'on-primary': {
          DEFAULT: '#472a00',
          container: '#613b00',
          fixed: '#2a1700',
          'fixed-variant': '#653e00',
        },
        'inverse-primary': '#855300',
        secondary: {
          DEFAULT: '#a4c9ff',
          container: '#0267b8',
          fixed: '#d4e3ff',
          'fixed-dim': '#a4c9ff',
        },
        'on-secondary': {
          DEFAULT: '#00315d',
          container: '#d6e5ff',
          fixed: '#001c39',
          'fixed-variant': '#004883',
        },
        tertiary: {
          DEFAULT: '#ffc08e',
          container: '#ff9837',
          fixed: '#ffdcc3',
          'fixed-dim': '#ffb77d',
        },
        'on-tertiary': {
          DEFAULT: '#4d2600',
          container: '#6a3700',
          fixed: '#2f1500',
          'fixed-variant': '#6e3900',
        },
        error: {
          DEFAULT: '#ffb4ab',
          container: '#93000a',
        },
        'on-error': {
          DEFAULT: '#690005',
          container: '#ffdad6',
        },
        background: '#0d141d',
        'on-background': '#dce3f0',
        gold: {
          prestige: '#f59e0b',
          light: '#fbbf24',
          burnished: '#d97706',
        },
        emerald: {
          accent: '#60a5fa',
          vivid: '#3b82f6',
        },
        forest: {
          noir: '#050b14',
          deep: '#0a1322',
          emerald: '#0f1f38',
        },
      },
      fontFamily: {
        serif: ['Newsreader', 'Georgia', 'serif'],
        sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
        display: ['Newsreader', 'Georgia', 'serif'],
      },
      borderRadius: {
        sm: '0.125rem',
        DEFAULT: '0.25rem',
        md: '0.375rem',
        lg: '0.5rem',
        xl: '0.75rem',
        full: '9999px',
      },
      spacing: {
        gutter: '2rem',
        'gutter-mobile': '1rem',
        'space-xs': '0.25rem',
        'space-sm': '0.5rem',
        'space-md': '1rem',
        'space-lg': '1.5rem',
        'space-xl': '2rem',
        'space-2xl': '3rem',
        'space-3xl': '5rem',
      },
    },
  },
  plugins: [],
};

export default config;
