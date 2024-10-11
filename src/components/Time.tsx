'use client';
import { memo, ReactNode, useCallback, useState } from 'react';
import { dateToPixels } from '..';
import type { TimeProps } from '..';

/**
 * Formats an hour value into a human-readable time string.
 * @param {number} hour - The hour value (0-23).
 * @returns {string} The formatted time (e.g., "12:00 AM", "1:00 PM").
 * @property Data selectors - 'data-column-height', `${height}`);
			node.setAttribute('data-time', new Date().toISOString());
 */
function formatHour(hour: number): string {
	const period = hour < 12 ? 'AM' : 'PM';
	const formattedHour = hour % 12 || 12; // Converts 0 -> 12, 13 -> 1
	return `${formattedHour}:00 ${period}`;
}
/**
 * Time
 * @param {TimeProps} children
 * @returns {JSX.Element}
 * @description The Ticks component is responsible for rendering the ticks on the left side of the calendar. It calculates the top position of each tick based on the current time and the height of the column.
 */
function Time({ children }: TimeProps): ReactNode {
	const [columnHeight, setColumnHeight] = useState(0);

	const containerRef = useCallback((node: HTMLDivElement) => {
		if (node) {
			const height = node.scrollHeight;
			node.setAttribute('data-column-height', `${height}`);
			node.setAttribute('data-time', new Date().toISOString());
			setColumnHeight(height);
		}
	}, []);

	const time = Array.from({ length: 24 }, (_, i) => ({
		hour: i,
		label: formatHour(i),
		top: dateToPixels(new Date(new Date().setHours(i, 0, 0, 0)), columnHeight),
	}));

	return children({
		containerRef,
		time,
	});
}

export default memo(Time);