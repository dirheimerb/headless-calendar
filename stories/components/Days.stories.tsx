import type { Meta, StoryObj } from '@storybook/react';
import { format, setHours } from 'date-fns';
import Agenda, { Days } from '../../src';

const meta: Meta<typeof Days> = {
	title: 'Components/Days',
	component: Days,
};

export default meta;
type Story = StoryObj<typeof Days>;

export const AgendaHeader: Story = {
	render: () => (
		<Agenda events={[]}>
			{() => (
				<div className="flex max-w-lg">
					<Days>
						{({ date }) => (
							<div key={date.toString()} className="center flex-1">
								{format(date, 'ccc d')}
							</div>
						)}
					</Days>
				</div>
			)}
		</Agenda>
	),
};

export const RenderingEvents: Story = {
	render: () => {
		const event = {
			id: '1',
			title: 'Event 1',
			start: setHours(new Date(), 4),
			end: setHours(new Date(), 10),
		};

		return (
			<Agenda events={[event]}>
				{() => (
					<div className="flex gap-x-3">
						<Days>
							{({ date, containerRef, events }) => (
								<div
									key={date.toString()}
									ref={containerRef}
									className="relative h-80 flex-1 rounded-md border border-orange-400 p-3 text-sm text-orange-400">
									Day container
									{events.map(({ event, top, bottom }) => (
										<div
											key={event.title}
											className="absolute inset-x-3 rounded-md border border-lime-500 p-2 text-lime-600"
											style={{ top, bottom }}>
											{event.title}
										</div>
									))}
								</div>
							)}
						</Days>
					</div>
				)}
			</Agenda>
		);
	},
};
