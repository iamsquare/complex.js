import tsconfigPaths from 'vite-tsconfig-paths';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  plugins: [tsconfigPaths()],
  test: {
    globals: true,
    include: ['tests/**/*.{test,spec}.{ts,tsx}'],
    environment: 'node',
    coverage: {
      provider: 'istanbul',
      reporter: ['text', 'json', 'html'],
    },
  },
});
