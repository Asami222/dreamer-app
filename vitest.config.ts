import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { defineConfig } from 'vitest/config';

import { storybookTest } from '@storybook/addon-vitest/vitest-plugin';

import { playwright } from '@vitest/browser-playwright';

const dirname =
  typeof __dirname !== 'undefined' ? __dirname : path.dirname(fileURLToPath(import.meta.url));

// More info at: https://storybook.js.org/docs/next/writing-tests/integrations/vitest-addon
export default defineConfig({
  test: {
    projects: [
      // 通常の単体テスト用プロジェクト
      {
        test: {
          name: "unit", // 識別用の名前
          globals: true,
          environment: "jsdom", // DOM操作を伴うReactテスト用
          setupFiles: "./vitest.setup.ts", // Testing Library設定など
          include: ["src/**/*.test.ts?(x)"], // 単体テスト対象ファイル
        },
        resolve: {
          alias: {
            src: path.resolve(__dirname, "./src"), // ← これを追加！
          },
        },
      },

      //  Storybook用プロジェクト
      {
        extends: true,
        plugins: [
          // The plugin will run tests for the stories defined in your Storybook config
          // See options at: https://storybook.js.org/docs/next/writing-tests/integrations/vitest-addon#storybooktest
          storybookTest({ configDir: path.join(dirname, '.storybook') }),
        ],
        test: {
          name: 'storybook',
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
});
