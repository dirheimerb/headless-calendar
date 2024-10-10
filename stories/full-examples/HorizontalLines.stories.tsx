import type { Meta, StoryObj } from '@storybook/react';
import Agenda, { Days, Time } from '../../src';
import { format } from 'date-fns';

const meta: Meta<typeof Agenda> = {
	title: 'Examples/HorizontalLines',
	component: Agenda,
};

export default meta;
type Story = StoryObj<typeof Agenda>;

export const HorizontalLines: Story = {
	render: () => (
		<Agenda startDate={new Date()} events={[]}>
			{() => (
				<>
					<div
						className="grid h-screen gap-4"
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
	),
};
