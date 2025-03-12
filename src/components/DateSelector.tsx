import { ReactNode } from 'react';

export interface DateSelectorProps {
	selectedDate: Date;
	onSelectDate: (date: Date) => void;
	children: (props: {
		onSelect: (date: Date) => void;
		selectedDate: Date;
	}) => ReactNode;
}

const DateSelector = ({
	selectedDate,
	onSelectDate,
	children,
}: DateSelectorProps) => {
	const handleSelect = (date: Date) => {
		onSelectDate(date);
	};

	return children({ onSelect: handleSelect, selectedDate });
};

export default DateSelector;
