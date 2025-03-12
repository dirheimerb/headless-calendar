import { startOfWeek, addDays, format } from 'date-fns';
import { ReactNode, useState } from 'react';

export interface WeekSelectorProps {
	initialDate?: Date;
	children: (props: {
		weekStartDate: Date;
		weekEndDate: Date;
		setWeekStartDate: (date: Date) => void;
		formattedWeekRange: string;
		goToNextWeek: () => void;
		goToPreviousWeek: () => void;
	}) => ReactNode;
}

export function WeekSelector({
	initialDate = new Date(),
	children,
}: WeekSelectorProps) {
	const [weekStartDate, setWeekStartDate] = useState<Date>(
		startOfWeek(initialDate),
	);
	const weekEndDate = addDays(weekStartDate, 6);

	const formattedWeekRange = `${format(weekStartDate, 'yyyy-MM-dd')} - ${format(weekEndDate, 'yyyy-MM-dd')}`;

	const goToNextWeek = () => {
		setWeekStartDate(addDays(weekStartDate, 7));
	};

	const goToPreviousWeek = () => {
		setWeekStartDate(addDays(weekStartDate, -7));
	};

	return children({
		weekStartDate,
		weekEndDate,
		setWeekStartDate,
		formattedWeekRange,
		goToNextWeek,
		goToPreviousWeek,
	});
}
