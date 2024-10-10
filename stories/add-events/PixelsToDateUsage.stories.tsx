import Agenda, { Days, Time, mouseEventToDate } from '../../src';
import type { Meta, StoryObj } from '@storybook/react';
import { MouseEvent } from 'react';

const meta: Meta<typeof Agenda> = {
	title: 'Interaction/add-events/PixelsToDateUsage',
	component: Agenda,
};

export default meta;
type Story = StoryObj<typeof Agenda>;

export const PixelsToDateUsage: Story = {
	render: () => {
		const handleClick = (e: MouseEvent<HTMLElement>, date: Date) => {
			alert(`Clicked at: ${mouseEventToDate(e, date).toLocaleTimeString()}`);
		};

		return (
			<Agenda startDate={new Date()} events={[]} days={1}>
				{() => (
					<div className="grid h-[500px] grid-cols-1">
						<Days>
							{({ date, containerRef }) => (
								<div
									key={date.toString()}
									ref={containerRef}
									className="relative z-10 col-start-1 row-start-1 h-full cursor-pointer"
									onClick={(e) => handleClick(e, date)}
								/>
							)}
						</Days>
						<Time>
							{({ containerRef, time }) => (
								<div
									className="relative col-span-1 col-start-1 row-start-1"
									ref={containerRef}>
									{time.map(({ hour, top }) => (
										<div
											key={hour}
											className="absolute left-0 right-0 h-0.5 bg-slate-300 opacity-30"
											style={{ top }}>
											{hour}:00
										</div>
									))}
								</div>
							)}
						</Time>
					</div>
				)}
			</Agenda>
		);
	},
};
