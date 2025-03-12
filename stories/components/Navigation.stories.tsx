import NavigationBar from '../../src/components/NavigationBar';
import { format, startOfWeek, subDays } from 'date-fns';
import type { Meta, StoryObj } from '@storybook/react';
import { userEvent, within } from '@storybook/test';
import { useState } from 'react';
const meta: Meta<typeof NavigationBar> = {
	title: 'Components/NavigationBar',
	component: NavigationBar,
	argTypes: {
		days: {
			control: { type: 'select', options: [1, 3, 7] },
		},
	},
	parameters: {
		controls: { expanded: true },
	},
};

export default meta;
type Story = StoryObj<typeof NavigationBar>;

export const BasicNavigation: Story = {
	play: async ({ canvasElement }) => {
		const canvas = within(canvasElement);
		const prevButton = await canvas.findByText('<');
		const nextButton = await canvas.findByText('>');
		const todayButton = await canvas.findByText('Today');

		await userEvent.click(prevButton);
		await userEvent.click(nextButton);
		await userEvent.click(todayButton);
	},
	render: () => {
		const [startDate, setStartDate] = useState(startOfWeek(new Date()));
		const [days, setDays] = useState(7);
		const endDate = subDays(startDate, -days + 1);

		const handlePrev = () => {
			const newStartDate = subDays(startDate, days);
			setStartDate(newStartDate);
		};

		const handleNext = () => {
			const newStartDate = subDays(startDate, -days);
			setStartDate(newStartDate);
		};

		return (
			<NavigationBar
				prev={handlePrev}
				next={handleNext}
				startDate={startDate}
				endDate={endDate}
				setDate={setStartDate}
				setDays={setDays}
				days={days}>
				{({
					handleTodayClick,
					formattedStartDate,
					formattedEndDate,
					setDayView,
					setThreeDayView,
					setWeekView,
					prev,
					next,
				}) => (
					<div className="mx-auto mb-10 flex max-w-lg items-center justify-between border p-4 shadow">
						<button onClick={handleTodayClick} className="btn">
							Today
						</button>
						<div className="flex items-center gap-x-5">
							<button onClick={prev} className="btn">
								{'<'}
							</button>
							<h5 className="text-center text-gray-700">
								{formattedStartDate} - {formattedEndDate}
							</h5>
							<button onClick={next} className="btn">
								{'>'}
							</button>
						</div>
						<div className="space-x-3">
							<button onClick={setDayView} className="btn">
								Day
							</button>
							<button onClick={setThreeDayView} className="btn">
								3 Days
							</button>
							<button onClick={setWeekView} className="btn">
								Week
							</button>
						</div>
					</div>
				)}
			</NavigationBar>
		);
	},
};
