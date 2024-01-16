import { join, dirname, resolve } from 'path';

/**
 * This function is used to resolve the absolute path of a package.
 * It is needed in projects that use Yarn PnP or are set up within a monorepo.
 */
function getAbsolutePath(value) {
  return dirname(require.resolve(join(value, 'package.json')));
}

/** @type { import('@storybook/nextjs').StorybookConfig } */
const config = {
  stories: [
    `${getAbsolutePath('apps-a')}**/stories/**/*.mdx`,
    `${getAbsolutePath('apps-a')}**/stories/**/*.stories.@(js|jsx|mjs|ts|tsx)`,
  ],
  addons: [
    getAbsolutePath('@storybook/addon-links'),
    getAbsolutePath('@storybook/addon-essentials'),
    getAbsolutePath('@storybook/addon-onboarding'),
    getAbsolutePath('@storybook/addon-interactions'),
  ],
  framework: {
    name: getAbsolutePath('@storybook/nextjs'),
    options: {
      nextConfigPath: resolve(__dirname, './next.config.js'),
    },
  },
  docs: {
    autodocs: 'tag',
  },
};
export default config;
