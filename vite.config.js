import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    // This line enables the global APIs (`describe`, `it`, `expect`, etc.)
    globals: true,
    // This is required for React Testing Library's 'cleanup' to work
    environment: 'jsdom',
    // This setup file runs before each test file
    setupFiles: './src/setupTests.js',
  },
});