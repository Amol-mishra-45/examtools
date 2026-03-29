/**
 * © 2026 Amol Mishra (CodeCraftAmol). All rights reserved.
 * vite.config.js — ExamTools.in build configuration
 */

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],

  build: {
    // Target modern browsers — smaller output, no legacy polyfills needed
    target: 'es2020',

    // Warn if any chunk exceeds 600KB
    chunkSizeWarningLimit: 600,
  },
});
