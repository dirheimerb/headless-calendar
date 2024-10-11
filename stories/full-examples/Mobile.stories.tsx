import Agenda, { Days, RedLine, Time } from '../../src';
import type { Meta, StoryObj } from '@storybook/react';
import type { BaseAgendaEvent } from '../../src/types';
import { format } from 'date-fns';
import { useEffect } from 'react';

const meta: Meta<typeof Agenda> = {
	title: 'Examples/Mobile',
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
		start: new Date(new Date().setHours(10, 0, 0, 0)),
		end: new Date(new Date().setHours(16, 0, 0, 0)),
		className: 'bg-blue-500 text-white',
	},
];

export const Mobile: Story = {
	parameters: {
		viewport: {
			defaultViewport: 'mobile2',
		},
	},
	render: () => {
		useEffect(() => {
			// scroll to today
			const id = format(new Date(), 'EEEE d');
			const element = document.getElementById(id);
			element?.scrollIntoView({ behavior: 'smooth' });
		}, []);

		return (
			<Agenda events={events}>
				{() => (
					<Days>
						{({ date, containerRef, events }) => (
							<div key={date.toString()}>
								<h4 className="mb-2 mt-4" id={format(date, 'EEEE d')}>
									{format(date, 'EEEE d')}
								</h4>
								<div ref={containerRef} className="flex gap-x-3">
									<Time>
										{({ containerRef, time }) => (
											<div
												className="relative col-start-1 row-start-2 h-[500px] w-12"
												ref={containerRef}>
												{time.map(({ hour, top, label }) => (
													<div
														key={hour}
														className="absolute right-0 text-xs text-slate-300"
														style={{ top }}>
														{label}
													</div>
												))}
											</div>
										)}
									</Time>
									<div className="relative flex-1">
										{events.map(({ event, top, bottom }) => {
											const myEvent = event as MyEventProps;
											return (
												<Event
													key={myEvent.id}
													top={top}
													bottom={bottom}
													{...myEvent}
												/>
											);
										})}
										<RedLine>
											{({ top }) => (
												<div
													className="absolute inset-x-0 h-0.5 bg-red-500"
													style={{ top }}
												/>
											)}
										</RedLine>
									</div>
								</div>
							</div>
						)}
					</Days>
				)}
			</Agenda>
		);
	},
};
