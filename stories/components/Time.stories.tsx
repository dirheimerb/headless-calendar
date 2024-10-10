import type { Meta, StoryObj } from '@storybook/react';
import { Time } from '../../src';

const meta: Meta<typeof Time> = {
	title: 'Components/Time',
	component: Time,
};

export default meta;
type Story = StoryObj<typeof Time>;

export const Hours: Story = {
	render: () => (
		<Time>
			{({ containerRef, time }) => (
				<div className="relative h-[700px]" ref={containerRef}>
					{time.map(({ hour, top, label }) => (
						<div
							key={hour}
							className="absolute text-slate-300"
							style={{ top: top - 14 }}>
							{label}
						</div>
					))}
				</div>
			)}
		</Time>
	),
};

export const HorizontalLines: Story = {
	render: () => (
		<Time>
			{({ containerRef, time }) => (
				<div className="relative h-[700px]" ref={containerRef}>
					{time.map(({ hour, top, label }) => (
						<div
							key={hour}
							data-hour={hour}
							className="absolute h-0.5 w-full bg-slate-100"
							style={{ top }}
						/>
					))}
				</div>
			)}
		</Time>
	),
};

export const HorizontalDashedLines: Story = {
	render: () => (
		<Time>
			{({ containerRef, time }) => (
				<div className="relative h-[700px]" ref={containerRef}>
					{time.map(({ hour, top }) => (
						<div
							key={hour}
							className="absolute w-full border-b border-dashed border-slate-300"
							style={{ top }}
						/>
					))}
				</div>
			)}
		</Time>
	),
};
