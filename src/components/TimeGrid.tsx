import { useMemo, ReactNode } from 'react';

export interface TimeGridProps {
	startHour?: number;
	endHour?: number;
	interval?: number; // in minutes, e.g., 60 for hourly intervals
	children: (props: {
		timeSlots: Date[];
		renderTimeSlot: (time: Date) => ReactNode;
	}) => ReactNode;
}

const TimeGrid = ({
	startHour = 0,
	endHour = 24,
	interval = 60,
	children,
}: TimeGridProps) => {
	const timeSlots = useMemo(() => {
		const slots: Date[] = [];
		const now = new Date();

		for (let hour = startHour; hour < endHour; hour++) {
			for (let minute = 0; minute < 60; minute += interval) {
				const slot = new Date(
					now.getFullYear(),
					now.getMonth(),
					now.getDate(),
					hour,
					minute,
					0,
					0,
				);
				slots.push(slot);
			}
		}

		return slots;
	}, [startHour, endHour, interval]);

	return children({
		timeSlots,
		renderTimeSlot: (time) => <div>{time.toLocaleTimeString()}</div>,
	});
};

export default TimeGrid;
