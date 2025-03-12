'use client';
import { useState, memo, ReactNode } from 'react';
import { addDays, format } from 'date-fns';

export interface DateRangeSelectorProps {
	initialStartDate?: Date;
	initialEndDate?: Date;
	children: (props: {
		startDate: Date;
		endDate: Date;
		setStartDate: (date: Date) => void;
		setEndDate: (date: Date) => void;
		formattedStartDate: string;
		formattedEndDate: string;
	}) => ReactNode;
}

export function DateRangeSelector({
	initialStartDate = new Date(),
	initialEndDate = addDays(new Date(), 7),
	children,
}: DateRangeSelectorProps) {
	const [startDate, setStartDate] = useState<Date>(initialStartDate);
	const [endDate, setEndDate] = useState<Date>(initialEndDate);

	const formattedStartDate = format(startDate, 'yyyy-MM-dd');
	const formattedEndDate = format(endDate, 'yyyy-MM-dd');

	return children({
		startDate,
		endDate,
		setStartDate,
		setEndDate,
		formattedStartDate,
		formattedEndDate,
	});
}

export default memo(DateRangeSelector);
