import { ReactNode, useState } from 'react';

export interface RecurrenceRule {
	frequency: string;
	interval: number;
	byDay?: string[];
	byMonthDay?: number[];
	byMonth?: number[];
}

export interface RecurringEventRulesProps {
	initialRule?: RecurrenceRule;
	onRuleChange: (rule: RecurrenceRule) => void;
	children: (props: {
		rule: RecurrenceRule;
		handleChange: (key: string, value: any) => void;
	}) => ReactNode;
}

const RecurringEventRules = ({
	initialRule,
	onRuleChange,
	children,
}: RecurringEventRulesProps) => {
	const [rule, setRule] = useState(
		initialRule || { frequency: 'weekly', interval: 1 },
	);

	const handleChange = (key: string, value: any) => {
		setRule((prev) => ({ ...prev, [key]: value }));
		onRuleChange({ ...rule, [key]: value });
	};

	return children({ rule, handleChange });
};

export default RecurringEventRules;
