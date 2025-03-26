import react from '@vitejs/plugin-react';
import { loadEnv } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';
import { defineConfig } from 'vitest/config';

export default defineConfig(({ mode }) => ({
  plugins: [tsconfigPaths(), react()],
  test: {
    coverage: {
      reporter: ['text', 'json', 'html'],
    },
    env: loadEnv(mode, process.cwd(), ''),
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./vitest.setup.ts'],
  },
}));
