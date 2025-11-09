import tsconfigPaths from 'vite-tsconfig-paths';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  plugins: [tsconfigPaths({ projects: ['./tsconfig.test.json'] })],
  test: {
    globals: true,
    include: ['tests/**/*.{test,spec}.{ts,tsx}'],
    environment: 'node',
    coverage: {
      provider: 'istanbul',
      reporter: ['text', 'json', 'json-summary', 'html'],
    },
  },
});
