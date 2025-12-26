// vitest.config.ts
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { defineConfig } from 'vitest/config'
import { storybookTest } from '@storybook/addon-vitest/vitest-plugin'
import { playwright } from '@vitest/browser-playwright'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

export default defineConfig({
  test: {
    projects: [
      // -----------------------------
      // Unit test プロジェクト
      // -----------------------------
      {
        test: {
          name: 'unit',
          globals: true,
          environment: 'jsdom',
          setupFiles: './vitest.setup.ts',
          include: ['src/**/*.test.ts?(x)'],
          exclude: ['e2e/**', '**/*.e2e.ts'],   // ★ 追加
        },
        resolve: {
          alias: {
            src: path.resolve(__dirname, './src'),
          },
        },
      },

      // -----------------------------
      // Storybook test プロジェクト
      // -----------------------------
      {
        extends: true,
        plugins: [
          storybookTest({ configDir: path.join(__dirname, '.storybook') }),
        ],
        test: {
          name: 'storybook',
          exclude: ['e2e/**', '**/*.e2e.ts'],   // ★ ここも必須
          browser: {
            enabled: true,
            headless: true,
            provider: playwright({}),
            instances: [{ browser: 'chromium' }],
          },
          setupFiles: ['.storybook/vitest.setup.ts'],
        },
      },
    ],
  },
})