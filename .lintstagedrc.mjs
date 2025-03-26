/* eslint-disable perfectionist/sort-objects */
const config = {
  '*.{ts,tsx}': [() => 'pnpm validate-types'],
  '*.{js,jsx,ts,tsx}': ['pnpm format:check', 'pnpm lint'],
  '**/*.{test,spec}.{js,jsx,ts,tsx}': ['pnpm test related --bail'],
};

export default config;
