import {
	addHours,
	format,
	roundToNearestMinutes,
	startOfWeek,
	subMinutes,
} from 'date-fns';
import Agenda, { Days, Time, mouseEventToDate } from '../../src';
import type { Meta, StoryObj } from '@storybook/react';
import { BaseAgendaEvent } from '../../src/types';
import { MouseEvent, useState } from 'react';
import { RedLine } from '../../src';

const meta: Meta<typeof Agenda> = {
	title: 'Interaction/add-events/SetStartAndEnd',
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
	return (
		<div
			className={`absolute w-full rounded-lg p-4 ${className}`}
			style={{ top, bottom }}>
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

export const SetStartAndEnd: Story = {
	render: () => {
		const [mode, setMode] = useState<'adding' | 'resizing'>('adding');
		const [ghostEvent, setGhostEvent] = useState<MyEventProps | null>(null);
		const [events, setEvents] = useState<MyEventProps[]>([]);

		/**
		 * gets a mouse move or a click event, and returns its corresponding date and time
		 * It also needs `Date` to know the day of the week
		 */
		const dateFromMoveOrClick = (e: MouseEvent<HTMLElement>, date: Date) => {
			const dateFromEvent = mouseEventToDate(e, date); // the exact date and time of the event
			const dateWithMargin = subMinutes(dateFromEvent, 60); // little margin to the top for a nicer experience
			return roundToNearestMinutes(dateWithMargin, { nearestTo: 30 }); // round to the nearest 30 minutes

			// you can rewrite this function to:
			// return mouseEventToDate(e, date)
			// By doing so, the event will place exactly where your cursor is
		};

		const handleMouseMove = (e: MouseEvent<HTMLElement>, date: Date) => {
			if (mode === 'adding') {
				const DateFromMove = dateFromMoveOrClick(e, date);
				setGhostEvent({
					id: 'ghost',
					title: 'New Event',
					start: DateFromMove,
					end: addHours(DateFromMove, 3),
					className: 'bg-slate-200 z-0 opacity-70',
				});
			} else {
				const DateFromMove = mouseEventToDate(e, date); // exact at cursor position
				const lastEvent = events[events.length - 1];
				const minDate = addHours(lastEvent.start, 3);
				const newEnd = DateFromMove > minDate ? DateFromMove : minDate;
				setEvents((currEvents) => {
					const newEvents = [...currEvents];
					newEvents[newEvents.length - 1].end = newEnd;
					return newEvents;
				});
			}
		};

		const handleClick = (e: MouseEvent<HTMLElement>, date: Date) => {
			const DateFromClick = dateFromMoveOrClick(e, date);
			if (mode === 'adding') {
				setEvents((currEvents) => [
					...events,
					{
						id: (currEvents.length + 1).toString(),
						title: `New Event ${currEvents.length + 1}`,
						start: DateFromClick,
						end: addHours(DateFromClick, 3),
						className: 'bg-amber-500 text-white z-10',
					},
				]);
				setMode('resizing');
				setGhostEvent(null);
			} else {
				setMode('adding');
			}
		};

		return (
			<Agenda
				startDate={startOfWeek(new Date())}
				events={[...events, ...(ghostEvent ? [ghostEvent] : [])]}
				days={5}>
				{() => (
					<>
						<div
							className="grid h-[700px] gap-4"
							style={{
								gridTemplateColumns: '60px repeat(5, 1fr)',
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
										className={`relative z-10 row-start-2 h-full ${mode === 'adding' ? 'cursor-pointer' : 'cursor-ns-resize'} `}
										style={{ gridColumnStart: index + 2 }}
										onMouseMove={(e) => handleMouseMove(e, date)}
										onMouseLeave={() => setGhostEvent(null)}
										onClick={(e) => handleClick(e, date)}>
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
							<Time>
								{({ containerRef, time }) => (
									<div
										className="relative col-span-5 col-start-2 row-start-2 row-end-2"
										ref={containerRef}>
										{time.map(({ hour, top }) => (
											<div
												key={hour}
												className="absolute -left-4 right-0 h-0.5 bg-slate-300 opacity-20"
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
