import type { Meta, StoryObj } from '@storybook/react';
import TimeGrid from '../../src/components/TimeGrid';
import { userEvent, within } from '@storybook/test';

const meta: Meta<typeof TimeGrid> = {
	title: 'Components/TimeGrid',
	component: TimeGrid,
	parameters: {
		controls: { expanded: true },
	},
};

export default meta;
type Story = StoryObj<typeof TimeGrid>;

export const BasicTimeGrid: Story = {
	play: async ({ canvasElement }) => {
		const canvas = within(canvasElement);
		const time = await canvas.findByText('1:00 AM');
		await userEvent.click(time);
	},
	render: () => {
		return (
			<TimeGrid startHour={8} endHour={18} interval={30}>
				{({ timeSlots, renderTimeSlot }) => (
					<div className="time-grid grid grid-cols-1 divide-y divide-gray-200">
						{timeSlots.map((time) => (
							<div
								key={time.toISOString()}
								className="time-slot px-4 py-2 hover:bg-blue-50">
								{renderTimeSlot(time)}
							</div>
						))}
					</div>
				)}
			</TimeGrid>
		);
	},
};
