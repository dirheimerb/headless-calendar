import { WeekSelector } from '../../src/components/WeekSelectorComponent';
import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof WeekSelector> = {
	title: 'Components/WeekSelector',
	component: WeekSelector,
	parameters: {
		controls: { expanded: true },
	},
};

export default meta;
type Story = StoryObj<typeof WeekSelector>;

export const BasicWeekSelector: Story = {
	render: () => (
		<WeekSelector>
			{({
				weekStartDate,
				weekEndDate,
				formattedWeekRange,
				goToNextWeek,
				goToPreviousWeek,
			}) => (
				<div className="flex items-center space-x-4">
					<button onClick={goToPreviousWeek} className="btn">
						Previous
					</button>
					<div>
						<p>Week: {formattedWeekRange}</p>
					</div>
					<button onClick={goToNextWeek} className="btn">
						Next
					</button>
				</div>
			)}
		</WeekSelector>
	),
};
