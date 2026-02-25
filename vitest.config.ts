import { defineConfig } from 'vitest/config';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  plugins: [tsconfigPaths()],
  test: {
    globals: true,
    environment: 'node',
    include: ['packages/**/src/**/*.spec.ts'], 
    exclude: ['**/dist/**', '**/node_modules/**'],
    coverage: {
      reporter: ['text', 'lcov'],
      exclude: ['**/dist/**', '**/node_modules/**'],
    }
  },
});