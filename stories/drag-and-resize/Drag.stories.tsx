import { addDays, format, startOfWeek } from 'date-fns';
import type { Meta, StoryObj } from '@storybook/react';
import { BaseAgendaEvent } from '../../src/types';
import Agenda, { Days, Time } from '../../src';
import { useDragEvent } from '../../src/utils';
import { useCallback, useState } from 'react';
import { RedLine } from '../../src';

const meta: Meta<typeof Agenda> = {
	title: 'Interaction/drag-and-resize/DragOnly',
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
	id,
	title,
	top,
	bottom,
	className,
	start,
	end,
}: MyEventProps & { top: number; bottom: number }) => {
	const { handleDragStart } = useDragEvent(id);

	return (
		<div
			id={id}
			key={id}
			tabIndex={-1}
			className={`absolute w-full cursor-move select-none rounded-lg p-4 ${className} `}
			style={{ top, bottom }}
			draggable
			onDragStart={handleDragStart}>
			{title}
			<br />
			<small>
				{format(start, 'EEEEEE HH:mm')}
				<br />
				↓<br />
				{format(end, 'EEEEEE HH:mm')}
			</small>
		</div>
	);
};

const events: MyEventProps[] = [
	{
		id: '0',
		title: 'Event 1',
		start: addDays(new Date(new Date().setHours(5, 0, 0, 0)), -1),
		end: addDays(new Date(new Date().setHours(12, 0, 0, 0)), -1),
		className: 'bg-lime-500 text-white',
	},
	{
		id: '1',
		title: 'Event 2',
		start: addDays(new Date(new Date().setHours(3, 0, 0, 0)), 1),
		end: addDays(new Date(new Date().setHours(14, 0, 0, 0)), 1),
		className: 'bg-sky-500 text-white',
	},
];

export const DragOnly: Story = {
	render: () => {
		const [startDate, setStartDate] = useState(startOfWeek(new Date()));

		const [events2, setEvents] = useState(events);

		const handleEventChange = useCallback((event: MyEventProps) => {
			setEvents((curr) => curr.map((e) => (e.id === event.id ? event : e)));
		}, []);

		return (
			<Agenda
				startDate={startDate}
				onStartDateChange={setStartDate}
				events={events2}
				onEventChange={handleEventChange}>
				{() => (
					<>
						<div
							className="grid h-[600px] select-none gap-4"
							style={{
								gridTemplateColumns: '60px repeat(7, 1fr)',
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
									<div
										className="relative col-start-1 row-start-2"
										ref={containerRef}>
										{time.map(({ hour, top }) => (
											<div
												key={hour}
												className="absolute right-2 text-sm text-slate-300"
												style={{ top: top - 12 }}>
												{hour} hs
											</div>
										))}
									</div>
								)}
							</Time>
							<Days>
								{({ date, containerRef, events, index }) => (
									<div
										key={date.toString()}
										ref={containerRef}
										className="relative row-start-2 h-full"
										style={{ gridColumnStart: index + 2 }}>
										{events.map(({ event, top, bottom }) => {
											const myEvent = event as MyEventProps;
											return (
												<Event
													key={myEvent.id}
													{...myEvent}
													top={top}
													bottom={bottom}
													onChange={handleEventChange}
												/>
											);
										})}
										<RedLine>
											{({ top }) => <div className="needle" style={{ top }} />}
										</RedLine>
									</div>
								)}
							</Days>
							<Time>
								{({ containerRef, time }) => (
									<div
										className="relative -z-10 col-span-7 col-start-2 row-start-2 row-end-2"
										ref={containerRef}>
										{time.map(({ hour, top }) => (
											<div
												key={hour}
												className="absolute -left-4 right-0 h-0.5 bg-slate-300 opacity-30"
												style={{ top }}
											/>
										))}
									</div>
								)}
							</Time>
						</div>
					</>
				)}
			</Agenda>
		);
	},
};
