import type { Preview } from "@storybook/react-vite";
import '../src/assets/styles/tokens.css';
import '../src/assets/styles/typography.css';

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export default preview;
