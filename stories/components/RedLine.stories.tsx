import Agenda, { Time, RedLine, Days } from '../../src';
import type { Meta, StoryObj } from '@storybook/react';
import { format, startOfWeek } from 'date-fns';

const meta: Meta<typeof RedLine> = {
	title: 'Components/RedLine',
	component: RedLine,
};

export default meta;
type Story = StoryObj<typeof RedLine>;

export const Basic: Story = {
	render: () => (
		<Agenda startDate={startOfWeek(new Date())} events={[]}>
			{() => (
				<>
					<div
						className="grid h-[600px] gap-4"
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
									{time.map(({ hour, top, label }) => (
										<div
											key={hour}
											className="absolute right-0 text-xs text-slate-300"
											style={{ top: top - 10 }}>
											{label}
										</div>
									))}
								</div>
							)}
						</Time>
						<Days>
							{({ date, containerRef }) => (
								<div
									key={date.toString()}
									ref={containerRef}
									className="relative row-start-2 h-full">
									<RedLine>
										{({ top }) => (
											<div
												className="absolute h-0.5 w-full bg-red-400"
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
	),
};

export const Elegant: Story = {
	render: () => (
		<Agenda startDate={startOfWeek(new Date())} events={[]}>
			{() => (
				<>
					<div
						className="grid h-[600px] gap-4"
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
									{time.map(({ hour, top, label }) => (
										<div
											key={hour}
											className="absolute right-0 text-xs text-slate-300"
											style={{ top: top - 10 }}>
											{label}
										</div>
									))}
								</div>
							)}
						</Time>
						<Days>
							{({ date, containerRef }) => (
								<div
									key={date.toString()}
									ref={containerRef}
									className="relative row-start-2 h-full">
									<RedLine>
										{({ top }) => <div className="needle" style={{ top }} />}
									</RedLine>
								</div>
							)}
						</Days>
					</div>
				</>
			)}
		</Agenda>
	),
};

export const WithInteraction: Story = {
	render: () => (
		<Agenda startDate={startOfWeek(new Date())} events={[]}>
			{() => (
				<>
					<div
						className="grid h-[600px] gap-4"
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
									{time.map(({ hour, top, label }) => (
										<div
											key={hour}
											className="absolute right-0 text-xs text-slate-300"
											style={{ top: top - 10 }}>
											{label}
										</div>
									))}
								</div>
							)}
						</Time>
						<Days>
							{({ date, containerRef }) => (
								<div
									key={date.toString()}
									ref={containerRef}
									className="relative row-start-2 h-full">
									<RedLine>
										{({ top }) => (
											<div
												className="absolute z-40 h-2 w-full cursor-pointer overflow-hidden rounded bg-blue-500 p-0.5 text-center text-white transition-all hover:h-8"
												style={{ top }}>
												It{"'"}s {format(new Date(), 'HH:mm')}!! 🎉 &nbsp;&nbsp;
												(?)
											</div>
										)}
									</RedLine>
								</div>
							)}
						</Days>
					</div>
				</>
			)}
		</Agenda>
	),
};
