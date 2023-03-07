// <reference types="vitest" />
// vite.config.ts
import { defineConfig } from 'vitest/config';
import AutoImport from 'unplugin-auto-import/vite';

export default defineConfig({
  test: {
    globals: true,
    environment: 'jsdom',
    coverage: {
      statements: 94,
      branches: 100,
      functions: 56,
      lines: 94.44,
    },
  },
  plugins: [
    AutoImport({
      imports: ['vitest'],
      dts: true, // 生成 TypeScript 声明
    }),
  ],
});
