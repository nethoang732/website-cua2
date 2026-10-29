import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{ts,tsx}', '../../packages/ui/src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        navy: '#071B33',
        royal: '#123B63',
        gold: '#C5A46D',
        ivory: '#F6F4EF',
      },
      fontFamily: {
        sans: ['Arial', 'Helvetica Neue', 'sans-serif'],
        display: ['Georgia', 'Times New Roman', 'serif'],
      },
      boxShadow: { editorial: '0 24px 70px rgba(7, 27, 51, 0.14)' },
    },
  },
  plugins: [],
};

export default config;
