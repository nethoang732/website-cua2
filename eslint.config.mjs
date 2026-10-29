import nextVitals from 'eslint-config-next/core-web-vitals';
import nextTypescript from 'eslint-config-next/typescript';
import prettier from 'eslint-config-prettier/flat';

const config = [
  ...nextVitals,
  ...nextTypescript,
  prettier,
  {
    settings: { react: { version: '19.3' } },
  },
  { rules: { '@next/next/no-html-link-for-pages': 'off' } },
  {
    files: ['packages/**/*.{ts,tsx}'],
    rules: { '@next/next/no-html-link-for-pages': 'off' },
  },
  {
    ignores: [
      '**/.next/**',
      '**/dist/**',
      '**/coverage/**',
      '**/playwright-report/**',
      '**/test-results/**',
    ],
  },
];

export default config;
