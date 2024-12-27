import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import { TanStackRouterVite } from '@tanstack/router-plugin/vite';

// https://vitejs.dev/config/
export default defineConfig({
  base: '/',
  plugins: [react(), TanStackRouterVite()],
  test: {
    setupFiles: './vitest.setup.ts',
  },
});
