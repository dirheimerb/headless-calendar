'use client';
import { useState, ReactNode } from 'react';

interface TooltipProps {
	content: string | ReactNode;
	children: (props: {
		isVisible: boolean;
		showTooltip: () => void;
		hideTooltip: () => void;
	}) => ReactNode;
}

function Tooltip({ content, children }: TooltipProps) {
	const [isVisible, setIsVisible] = useState(false);

	const showTooltip = () => setIsVisible(true);
	const hideTooltip = () => setIsVisible(false);

	return (
		<>
			{children({ isVisible, showTooltip, hideTooltip })}
			{isVisible && (
				<div className="tooltip-content absolute rounded bg-gray-700 px-2 py-1 text-sm text-white shadow-lg">
					{content}
				</div>
			)}
		</>
	);
}

export default Tooltip;
