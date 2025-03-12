import DateRangeSelector from '../../src/components/DateRangeSelector';
import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';

import { userEvent, within } from '@storybook/test';

const meta: Meta<typeof DateRangeSelector> = {
	title: 'Components/DateRangeSelector',
	component: DateRangeSelector,
	parameters: {
		controls: { expanded: true },
	},
};

export default meta;
type Story = StoryObj<typeof DateRangeSelector>;

export const BasicDateRangeSelector: Story = {
	render: () => (
		<DateRangeSelector>
			{({
				startDate,
				endDate,
				setStartDate,
				setEndDate,
				formattedStartDate,
				formattedEndDate,
			}) => (
				<div className="space-y-2">
					<div>
						<label>Start Date:</label>
						<input
							type="date"
							value={formattedStartDate}
							onChange={(e) => setStartDate(new Date(e.target.value))}
							className="border p-2"
						/>
					</div>
					<div>
						<label>End Date:</label>
						<input
							type="date"
							value={formattedEndDate}
							onChange={(e) => setEndDate(new Date(e.target.value))}
							className="border p-2"
						/>
					</div>
					<p>
						Selected Range: {formattedStartDate} - {formattedEndDate}
					</p>
				</div>
			)}
		</DateRangeSelector>
	),
};
