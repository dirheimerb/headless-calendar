import { Preview } from '@storybook/react';
import '../stories/index.css';

const preview: Preview = {
	parameters: {
		layout: 'centered',
		tags: ['autodocs'],
		actions: { argTypesRegex: '^on[A-Z].*' },
		controls: {
			matchers: {
				color: /(background|color)$/i,
				date: /Date$/,
			},
		},
	},
};

export default preview;
