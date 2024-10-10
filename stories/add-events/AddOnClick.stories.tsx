import Agenda, { Days, Time, mouseEventToDate } from '../../src';
import type { Meta, StoryObj } from '@storybook/react';
import { addHours, startOfWeek } from 'date-fns';
import { MouseEvent, useState } from 'react';

const meta: Meta<typeof Agenda> = {
	title: 'Interaction/add-events/AddOnClick',
	component: Agenda,
};

export default meta;
type Story = StoryObj<typeof Agenda>;

interface MyEventProps {
	id: string;
	title: string;
	start: Date;
	end: Date;
	className?: string;
}

export const AddOnClick: Story = {
	render: () => {
		const [events, setEvents] = useState<MyEventProps[]>([]);

		const handleClick = (e: MouseEvent<HTMLElement>, date: Date) => {
			const clickedDate = mouseEventToDate(e, date);
			setEvents((prev) => [
				...prev,
				{
					id: (prev.length + 1).toString(),
					title: `New Event ${(prev.length + 1).toString()}`,
					start: clickedDate,
					end: addHours(clickedDate, 3),
					className: 'bg-blue-500 text-white',
				},
			]);
		};

		return (
			<Agenda startDate={startOfWeek(new Date())} events={events} days={1}>
				{() => (
					<div className="grid h-[500px] grid-cols-1">
						<Days>
							{({ date, containerRef, events }) => (
								<div
									key={date.toString()}
									ref={containerRef}
									className="relative z-10 col-start-1 row-start-1 h-full cursor-pointer"
									onClick={(e) => handleClick(e, date)}>
									{events.map(({ event, top, bottom }) => (
										<div
											key={event.id}
											className={`absolute rounded-lg p-4 shadow-lg ${event.className}`}
											style={{
												top,
												bottom,
											}}>
											{event.title}
											<br />
											<small>
												{event.start.toLocaleTimeString()}
												&nbsp;-&nbsp;
												{event.end.toLocaleTimeString()}
											</small>
										</div>
									))}
								</div>
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
											style={{ top }}
										/>
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
