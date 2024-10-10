import Agenda, { Days, Time, Crosshair } from '../../src';
import type { Meta, StoryObj } from '@storybook/react';
import { format, startOfWeek } from 'date-fns';

const meta: Meta<typeof Agenda> = {
	title: 'Components/Crosshair',
	component: Agenda,
};

export default meta;
type Story = StoryObj<typeof Agenda>;

export const WithTime: Story = {
	render: () => {
		return (
			<Agenda startDate={startOfWeek(new Date())} events={[]} days={5}>
				{() => (
					<>
						<div
							className="grid h-[700px] select-none gap-4"
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
										className="relative z-10 row-start-2 h-full cursor-crosshair"
										style={{ gridColumnStart: index + 2 }}>
										{events.map(({ event, top, bottom }) => (
											<div
												key={event.id}
												className={`absolute w-full overflow-hidden rounded-lg p-4 pb-0 ${event.className}`}
												style={{ top, bottom }}>
												{event.title}
											</div>
										))}
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
												className="absolute -left-4 right-0 h-0.5 bg-slate-300 opacity-10"
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

export const Dashed: Story = {
	render: () => {
		return (
			<Agenda startDate={startOfWeek(new Date())} events={[]} days={5}>
				{() => (
					<>
						<div
							className="grid h-[700px] select-none gap-4"
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
										className="relative z-10 row-start-2 h-full cursor-crosshair"
										style={{ gridColumnStart: index + 2 }}>
										{events.map(({ event, top, bottom }) => (
											<div
												key={event.id}
												className={`absolute w-full overflow-hidden rounded-lg p-4 pb-0 ${event.className}`}
												style={{ top, bottom }}>
												{event.title}
											</div>
										))}
										<Crosshair>
											{({ top }) => (
												<div
													className="absolute z-40 w-full border-collapse border-b-2 border-dotted border-slate-500"
													style={{ top }}
												/>
											)}
										</Crosshair>
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

export const RoundedMinutes: Story = {
	render: () => {
		return (
			<Agenda startDate={startOfWeek(new Date())} events={[]} days={5}>
				{() => (
					<>
						<div
							className="grid h-[700px] select-none gap-4"
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
										className="relative z-10 row-start-2 h-full cursor-crosshair"
										style={{ gridColumnStart: index + 2 }}>
										{events.map(({ event, top, bottom }) => (
											<div
												key={event.id}
												className={`absolute w-full overflow-hidden rounded-lg p-4 pb-0 ${event.className}`}
												style={{ top, bottom }}>
												{event.title}
											</div>
										))}
										<Crosshair roundMinutes={30}>
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
												className="absolute -left-4 right-0 h-0.5 bg-slate-300 opacity-10"
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
