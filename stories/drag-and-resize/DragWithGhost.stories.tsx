import Agenda, { useDragEvent, Days, Time } from '../../src';
import type { Meta, StoryObj } from '@storybook/react';
import type { BaseAgendaEvent } from '../../src';
import { format, startOfWeek } from 'date-fns';
import { useCallback, useState } from 'react';

const meta: Meta<typeof Agenda> = {
	title: 'Interaction/drag-and-resize/DragWithGhost',
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

interface ExtendedEventProps extends MyEventProps {
	top: number;
	bottom: number;
}

const Event = ({
	id,
	title,
	top,
	bottom,
	className,
	start,
	end,
}: ExtendedEventProps) => {
	const { handleDragStart } = useDragEvent(id);

	return (
		<div
			id={id}
			key={id}
			tabIndex={-1}
			className={`absolute w-full cursor-move rounded-lg p-4 select-none ${className} `}
			style={{ top, bottom }}
			draggable
			onDragStart={handleDragStart}>
			{title}
			<br />
			<small>
				{format(start, 'EEEEEE HH:mm')}
				&nbsp;-&nbsp;
				{format(end, 'EEEEEE HH:mm')}
			</small>
		</div>
	);
};

const events: MyEventProps[] = [
	{
		id: '0',
		title: 'Event 1',
		start: new Date(new Date().setHours(8, 0, 0, 0)),
		end: new Date(new Date().setHours(16, 0, 0, 0)),
		className: 'bg-lime-500 text-white z-10',
	},
];

export const DragWithGhost: Story = {
	render: () => {
		const [startDate, setStartDate] = useState(startOfWeek(new Date()));
		const [backupEvents, setBackupEvents] = useState<MyEventProps[]>([]);

		const [events2, setEvents] = useState(events);

		const handleEventChange = useCallback((event: MyEventProps) => {
			console.log(event);
			setEvents((curr) => curr.map((e) => (e.id === event.id ? event : e)));
		}, []);

		const handleDragEventStart = (eventId: string) => {
			const event = events2.find((e) => e.id === eventId);
			if (!event) return;
			setBackupEvents([
				{
					...event,
					id: `${event.id}-backup`,
					className:
						'bg-lime-500 text-white opacity-50 z-0 pointer-events-none',
				},
			]);
		};

		const handleDrop = () => {
			setBackupEvents([]);
		};

		return (
			<Agenda
				startDate={startDate}
				onStartDateChange={setStartDate}
				events={[...events2, ...backupEvents]}
				onEventChange={handleEventChange}
				onDragStart={handleDragEventStart}
				onDrop={handleDrop}>
				{() => (
					<>
						<div
							className="grid h-screen gap-4 select-none"
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
												className="absolute right-2 text-slate-300"
												style={{ top: top - 14 }}>
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
										{events.map(({ event, top, bottom }, index) => {
											const myEvent = event as MyEventProps;
											return (
												<Event
													key={myEvent.id}
													{...myEvent}
													top={top}
													bottom={bottom}
												/>
											);
										})}
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
												className="absolute right-0 -left-4 h-0.5 bg-slate-300 opacity-30"
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
