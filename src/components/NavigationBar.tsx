import { format, startOfWeek, subDays } from 'date-fns';
import { ReactNode } from 'react';

export interface NavigationBarProps {
	prev: () => void;
	next: () => void;
	endDate: Date;
	startDate: Date;
	setDate: (date: Date) => void;
	setDays: (days: number) => void;
	days: number;
	children: (props: {
		handleTodayClick: () => void;
		formattedStartDate: string;
		formattedEndDate: string;
		setDayView: () => void;
		setThreeDayView: () => void;
		setWeekView: () => void;
		prev: () => void;
		next: () => void;
	}) => ReactNode;
}

export default function NavigationBar({
	prev,
	next,
	endDate,
	startDate,
	setDate,
	setDays,
	days,
	children,
}: NavigationBarProps) {
	const handleTodayClick = () => {
		if (days === 1) {
			setDate(new Date());
		} else if (days === 3) {
			setDate(subDays(new Date(), 1));
		} else {
			setDate(startOfWeek(new Date()));
		}
	};

	const setDayView = () => setDays(1);
	const setThreeDayView = () => setDays(3);
	const setWeekView = () => setDays(7);

	const formattedStartDate = format(startDate, 'd/M');
	const formattedEndDate = format(endDate, 'd/M');

	return (
		<>
			{children({
				handleTodayClick,
				formattedStartDate,
				formattedEndDate,
				setDayView,
				setThreeDayView,
				setWeekView,
				prev,
				next,
			})}
		</>
	);
}
