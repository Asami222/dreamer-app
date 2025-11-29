import type { Preview } from '@storybook/nextjs-vite'
import "../src/globals.css"

const preview: Preview = {
  parameters: {
    layout: 'centered', 
    backgrounds: {
      options: {
        // 👇 Default options
        dark: { name: 'Dark', value: '#333' },
        light: { name: 'Light', value: '#F7F9F2' },
        // 👇 Add your own
        pink: { name: 'pink', value: '#F3D9DB' },
      },
    },
    initialGlobals: {
      // 👇 Set the initial background color
      backgrounds: { value: 'pink' },
    },
    controls: {
      matchers: {
       color: /(background|color)$/i,
       date: /Date$/i,
      },
    },

    a11y: {
      // 'todo' - show a11y violations in the test UI only
      // 'error' - fail CI on a11y violations
      // 'off' - skip a11y checks entirely
      test: 'todo'
    }
  },
};

export default preview;