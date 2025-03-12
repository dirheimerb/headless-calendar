import { StorybookConfig } from '@storybook/react-vite';

const config: StorybookConfig = {
	stories: [
		'../stories/introduction.mdx',
		'../stories/**/*.mdx',
		'../stories/**/*.stories.@(js|jsx|ts|tsx)',
	],
	addons: [
		'@storybook/addon-links',
		'@storybook/addon-essentials',
		'@storybook/addon-interactions',
		'@storybook/addon-styling-webpack',
		'@storybook/addon-themes',
		'@storybook/addon-storysource',
		'@storybook/addon-a11y',
	],
	framework: '@storybook/react-vite',
	docs: {
		autodocs: 'tag',
	},
};
export default config;
