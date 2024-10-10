import type { Meta, StoryObj } from '@storybook/react';
import { format, setHours } from 'date-fns';
import Agenda, { Day } from '../../src';

const meta: Meta<typeof Day> = {
	title: 'Components/Day',
	component: Day,
};

export default meta;
type Story = StoryObj<typeof Day>;

const event = {
	id: '1',
	title: 'Event 1',
	start: setHours(new Date(), 4),
	end: setHours(new Date(), 10),
};

export const BasicDay: Story = {
	render: () => (
		<Agenda events={[event]}>
			{() => (
				<Day date={new Date()}>
					{({ containerRef, events }) => (
						<div
							ref={containerRef}
							className="relative h-80 max-w-sm rounded-md border border-orange-400 p-3 text-orange-400">
							day container
							{events.map(({ event, top, bottom }) => (
								<div
									key={event.title}
									className="absolute inset-x-3 rounded-lg bg-lime-500 p-4 text-white"
									style={{ top, bottom }}>
									{event.title}
									<br />
									<small>
										{format(event.start, 'HH:mm')}
										&nbsp;-&nbsp;
										{format(event.end, 'HH:mm')}
									</small>
								</div>
							))}
						</div>
					)}
				</Day>
			)}
		</Agenda>
	),
};
