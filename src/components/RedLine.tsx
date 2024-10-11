'use client';
import { memo, useEffect, useState } from 'react';
import type { RedLineProps } from '..';
import { useDay, dateToPixels, isToday } from '..';
import { format } from 'date-fns';
import { m } from 'framer-motion';
/**
 * RedLine component
 * @param {RedLineProps} children
 * @returns {JSX.Element | null}
 * @description The RedLine component is responsible for rendering a vertical line that represents the current time. It uses the useDay hook to get the current date and column height, and then calculates the top position of the RedLine based on the current time.
 * @example
 * ```tsx
 * <RedLine>
 * {({ top }) => (
 * <div style={{ top }} className="RedLine" />
 * )}
 * </RedLine>
 * ```
 */
function RedLine({
	children,
}: RedLineProps): JSX.Element | null {
	const { columnHeight, date } = useDay();
	const [top, setTop] = useState(dateToPixels(new Date(), columnHeight));

	useEffect(() => {
		// Update the RedLine when the column height changes
		setTop(dateToPixels(new Date(), columnHeight));
	}, [columnHeight]);

	useEffect(() => {
		// Update the RedLine every minute
		const interval = setInterval(() => {
			setTop(dateToPixels(new Date(), columnHeight));
		}, 60 * 1000);
		return () => clearInterval(interval);
	}, [columnHeight]);

	if (!isToday(date)) return null;

	return (
		<m.div
			data-top={top}
			initial={{ top }}
			animate={{ top }}
			transition={{ duration: 60 }}
			className='cursor-pointer'
			key={format(date, 'yyyy-MM-dd')}>
				{children({ top })}
		</m.div>
	);
}

export default memo(RedLine);