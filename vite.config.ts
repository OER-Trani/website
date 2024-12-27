import { TanStackRouterVite } from '@tanstack/router-plugin/vite';
import react from '@vitejs/plugin-react';
import { loadEnv } from 'vite';
import { defineConfig } from 'vitest/config';

// https://vitejs.dev/config/
// @ts-expect-error type undefined
export default ({ mode }) => {
  process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };

  return defineConfig({
    base: process.env.VITE_CMS_BASE_PATH,
    plugins: [react(), TanStackRouterVite()],
    test: {
      setupFiles: './vitest.setup.ts',
    },
  });
};
