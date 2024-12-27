import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import { TanStackRouterVite } from '@tanstack/router-plugin/vite';
import { BASE_PATH } from './src/constants/config';

// https://vitejs.dev/config/
export default defineConfig({
  base: BASE_PATH,
  plugins: [react(), TanStackRouterVite()],
  test: {
    setupFiles: './vitest.setup.ts',
  },
});
