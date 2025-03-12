import type { Meta, StoryObj } from '@storybook/react';
import { ReactNode, useState } from 'react';

import DateSelector from '../../src/components/DateSelector';
import { userEvent, within } from '@storybook/test';
import Tooltip from '../../src/components/ToolTip';

const meta: Meta<typeof Tooltip> = {
	title: 'Components/Tooltip',
	component: Tooltip,
	args: {
		content: 'This is a helpful tooltip',
	},
	parameters: {
		controls: { expanded: true },
	},
};

export default meta;
type Story = StoryObj<typeof Tooltip>;

export const BasicDateSelector: Story = {
	play: async ({ canvasElement }) => {
		const canvas = within(canvasElement);
		const button = await canvas.findByText('Hover me');
		await userEvent.hover(button);
	},
	render: () => {
		const [selectedDate, setSelectedDate] = useState(new Date());
		return (
			<DateSelector selectedDate={selectedDate} onSelectDate={setSelectedDate}>
				{({ selectedDate, onSelect }) => (
					<div className="space-y-2">
						<div>
							<label>Date:</label>
							<input
								type="date"
								value={selectedDate.toISOString().split('T')[0]}
								onChange={(e) => onSelect(new Date(e.target.value))}
								className="border p-2"
							/>
						</div>
						<p>Selected Date: {selectedDate.toISOString().split('T')[0]}</p>
					</div>
				)}
			</DateSelector>
		);
	},
};
