import Agenda, { Days, Time, dateToPixels } from '../../src';
import { format, startOfWeek, subHours } from 'date-fns';
import type { Meta, StoryObj } from '@storybook/react';
import type { BaseAgendaEvent } from '../../src/types';
import { RedLine } from '../../src';
import { useCallback } from 'react';

const meta: Meta<typeof Agenda> = {
	title: 'Examples/Scroll',
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
		style={{ top, bottom }}
		onDrag={(e) => {
			console.log('dragging', e);
			e.preventDefault();
		}}
		draggable>
		{title}
		<br />
		<small>
			{format(start, 'HH:mm')}
			&nbsp;-&nbsp;
			{format(end, 'HH:mm')}
		</small>
	</div>
);

const events: MyEventProps[] = [
	{
		id: '0',
		title: 'Event 1',
		start: new Date(new Date().setHours(9, 0, 0, 0)),
		end: new Date(new Date().setHours(13, 0, 0, 0)),
		className: 'bg-blue-500 text-white',
	},
];

export const Scroll: Story = {
	render: () => {
		/**
		 * Scroll to some specific time on mount
		 * In this case we use the start of the event
		 */
		const scrollAreaRef = useCallback((node: HTMLDivElement) => {
			if (node) {
				const dateToScrollTo = subHours(events[0].start, 1); // some margin at the top
				const top = dateToPixels(dateToScrollTo, node.scrollHeight);
				node.scrollTo({ top, behavior: 'smooth' });
			}
		}, []);

		return (
			<Agenda startDate={startOfWeek(new Date())} events={events}>
				{() => (
					<>
						<div
							className="grid gap-4"
							style={{
								gridTemplateColumns: '60px repeat(7, 1fr)',
							}}>
							<div />
							<Days>
								{({ date }) => (
									<div key={date.toString()} className="text-center">
										{format(date, 'ccc d')}
									</div>
								)}
							</Days>
						</div>
						<hr className="mt-4" />
						<div
							className="grid h-80 gap-4 overflow-y-scroll"
							style={{ gridTemplateColumns: '60px repeat(7, 1fr)' }}
							ref={scrollAreaRef}>
							<Time>
								{({ containerRef, Time }) => (
									<div
										className="relative col-start-1 row-start-1 h-screen"
										ref={containerRef}>
										{Time.map(({ hour, top }) => (
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
								{({ date, containerRef, events }) => (
									<div
										key={date.toString()}
										ref={containerRef}
										className="relative h-full">
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
