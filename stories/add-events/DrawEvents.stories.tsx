import {
	addMinutes,
	format,
	roundToNearestMinutes,
	startOfWeek,
} from 'date-fns';
import Agenda, { Days, Time, mouseEventToDate } from '../../src';
import { within, userEvent, expect } from '@storybook/test';
import type { Meta, StoryObj } from '@storybook/react';
import { MouseEvent, useRef, useState } from 'react';
import { BaseAgendaEvent } from '../../src/types';
import { RedLine, Crosshair } from '../../src';

const meta: Meta<typeof Agenda> = {
	title: 'Interaction/add-events/DrawEvents',
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
			className={`absolute w-full overflow-hidden rounded-lg p-4 pb-0 ${className}`}
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

export const DrawEvents: Story = {
	play: async ({ canvasElement }) => {
		const canvas = within(canvasElement);
		const day = await canvas.findByText('Mon 7');
		const time = await canvas.findByText('5:00 AM');

		await userEvent.click(day);
		await userEvent.click(time);
	},
	render: () => {
		const mouseDown = useRef(false);
		const [events, setEvents] = useState<MyEventProps[]>([]);

		const handleMouseMove = (e: MouseEvent<HTMLElement>, date: Date) => {
			if (!mouseDown.current) return;

			// update last event
			const DateFromMove = mouseEventToDate(e, date); // exact at cursor position
			const lastEvent = events[events.length - 1]; // we'll update the event just created on mouse down
			const minDate = addMinutes(lastEvent.start, 10); // prevent an invalid range of dates
			const newEnd = DateFromMove > minDate ? DateFromMove : minDate; // the end will be the current position of the cursor
			setEvents((currEvents) => {
				const newEvents = [...currEvents];
				newEvents[newEvents.length - 1].end = newEnd;
				return newEvents;
			});
		};

		const handleMouseDown = (e: MouseEvent<HTMLElement>, date: Date) => {
			const DateFromEvent = mouseEventToDate(e, date);
			setEvents((currEvents) => [
				...events,
				{
					id: (currEvents.length + 1).toString(),
					title: `New Event ${currEvents.length + 1}`,
					start: DateFromEvent,
					end: addMinutes(DateFromEvent, 10),
					className: 'bg-amber-500 text-white z-10',
				},
			]);
			mouseDown.current = true;
		};

		const handleMouseUp = () => {
			mouseDown.current = false;
		};

		return (
			<Agenda startDate={startOfWeek(new Date())} events={events} days={5}>
				{() => (
					<>
						<div
							className="grid h-[700px] gap-4 select-none"
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
										{time.map(({ hour, top, label }) => (
											<div
												key={hour}
												className="absolute right-0 text-xs text-slate-500"
												style={{ top: top - 14 }}>
												{label}
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
										className="relative z-10 row-start-2 h-full cursor-crosshair"
										style={{ gridColumnStart: index + 2 }}
										onMouseMove={(e) => handleMouseMove(e, date)}
										onMouseDown={(e) => handleMouseDown(e, date)}
										onMouseUp={handleMouseUp}>
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
										<Crosshair>
											{({ top, date }) => (
												<div
													className="absolute z-40 h-0.5 w-full bg-slate-300"
													style={{ top }}>
													<small className="text-slate-500">
														{format(date, 'HH:mm')}
													</small>
												</div>
											)}
										</Crosshair>
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
												className="absolute right-0 -left-4 h-0.5 bg-slate-300 opacity-20"
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
