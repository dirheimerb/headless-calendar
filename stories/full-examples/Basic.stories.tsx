import { addDays, format, startOfWeek } from 'date-fns';
import type { Meta, StoryObj } from '@storybook/react';
import type { BaseAgendaEvent } from '../../src/types';
import Agenda, { Days, Time, RedLine } from '../../src';
import { useState } from 'react';

const meta: Meta<typeof Agenda> = {
	title: 'Examples/Basic',
	component: Agenda,
};

export default meta;
type Story = StoryObj<typeof Agenda>;

interface MyEventProps extends BaseAgendaEvent {
	id: string;
	title: string;
	start: Date;
	end: Date;
	className?: string;
}

const Event = ({
	title,
	top,
	bottom,
	className,
	start,
	end,
}: MyEventProps & { top: number; bottom: number }) => (
	<div
		className={`absolute w-full rounded-lg p-4 ${className}`}
		style={{ top, bottom }}>
		{title}
		<br />
		<small>
			{format(start, 'EEEE HH:mm')}
			<br />
			↓<br />
			{format(end, 'EEEE HH:mm')}
		</small>
	</div>
);

const events: MyEventProps[] = [
	{
		id: '0',
		title: 'Event 1',
		start: addDays(new Date(new Date().setHours(5, 0, 0, 0)), -1),
		end: addDays(new Date(new Date().setHours(12, 0, 0, 0)), -1),
		className: 'bg-blue-500 text-white',
	},
	{
		id: '0',
		title: 'Event 2',
		start: addDays(new Date(new Date().setHours(19, 0, 0, 0)), 1),
		end: addDays(new Date(new Date().setHours(5, 0, 0, 0)), 2),
		className: 'bg-lime-500 text-white',
	},
];

export const Basic: Story = {
	render: () => {
		const [startDate, setStartDate] = useState(startOfWeek(new Date()));

		return (
			<Agenda
				startDate={startDate}
				onStartDateChange={setStartDate}
				events={events}>
				{() => (
					<>
						<div
							className="grid h-[800px] gap-4"
							style={{
								gridTemplateColumns: '60px',
								gridTemplateRows: 'min-content 1fr',
							}}>
							<div />
							<Days>
								{({ date }) => (
									<div key={date.toString()} className="text-center">
										{format(date, 'ccc d')}
									</div>
								)}
							</Days>
							<Time>
								{({ containerRef, time }) => (
									<div className="relative row-start-2" ref={containerRef}>
										{time.map(({ hour, top }) => (
											<div
												key={hour}
												className="absolute right-2 text-slate-300"
												style={{ top: top - 14 }}>
												{hour}
												{/* {format(hour, 'HH:mm')} */}
											</div>
										))}
									</div>
								)}
							</Time>
							<Days>
								{({ date, containerRef, events }) => (
									<div
										key={date.toString()}
										ref={containerRef}
										className="relative row-start-2 h-full">
										{events.map(({ event, top, bottom }) => {
											const myEvent = event as MyEventProps;
											return (
												<Event
													key={myEvent.title}
													{...myEvent}
													top={top}
													bottom={bottom}
												/>
											);
										})}
										<RedLine>
											{({ top }) => (
												<div
													className="absolute z-40 h-1 w-full bg-red-400"
													style={{ top }}
												/>
											)}
										</RedLine>
									</div>
								)}
							</Days>
						</div>
					</>
				)}
			</Agenda>
		);
	},
};
