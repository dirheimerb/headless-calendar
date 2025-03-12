import type { Meta, StoryObj } from '@storybook/react';
import { userEvent, within } from '@storybook/test';
import Tooltip from '../../src/components/ToolTip';

const meta: Meta<typeof Tooltip> = {
	title: 'Components/Tooltip',
	component: Tooltip,
	parameters: {
		controls: { expanded: true },
	},
};

export default meta;
type Story = StoryObj<typeof Tooltip>;

export const BasicTooltip: Story = {
	play: async ({ canvasElement }) => {
		const canvas = within(canvasElement);
		const button = await canvas.findByText('Hover me');
		await userEvent.hover(button);
	},
	render: () => (
		<Tooltip content="This is a helpful tooltip">
			{({ isVisible, showTooltip, hideTooltip }) => (
				<div className="relative">
					<button
						onMouseEnter={showTooltip}
						onMouseLeave={hideTooltip}
						className="btn">
						Hover me
					</button>
					{isVisible && (
						<div className="absolute mt-2 rounded bg-gray-700 px-2 py-1 text-sm text-white shadow-lg">
							This is a helpful tooltip
						</div>
					)}
				</div>
			)}
		</Tooltip>
	),
};
