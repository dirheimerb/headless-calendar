'use client';
import { useCallback, useContext, useEffect, useState } from 'react';
import type { CrosshairChildrenProps, CrosshairProps } from '..';
import { roundToNearestMinutes, dateToPixels, pixelsToDate, DayContext } from '..';
/**
 * Crosshair
 * @param {CrosshairProps} { children, roundMinutes = 1 }
 * @returns {JSX.Element | null}
 * @description The Crosshair component is responsible for displaying a vertical line that follows the mouse cursor as it moves over the column. It provides a context that is used by the Event component to calculate the position of the event within the column. It also handles the drag and drop events for moving events within the column.
 * @example
 * ```tsx
 * <Crosshair>
 * {({ top, date }) => (
 *  <div style={{ top }} className="crosshair">
 *  <p>{date.toTimeString()}</p>
 * </div>
 * )}
 * </Crosshair>
 * ```
 */
export default function Crosshair({
	children,
	roundMinutes = 1,
}: CrosshairProps): JSX.Element | null {
	const { date: dayDate, columnContainerRef } = useContext(DayContext);
	const [childrenProps, setChildrenProps] =
		useState<CrosshairChildrenProps | null>(null);

	const handleMouseMove = useCallback(
		(e: MouseEvent) => {
			if (!columnContainerRef.current) return;
			const { top, height } =
				columnContainerRef.current.getBoundingClientRect();
			const dateFromEvent = pixelsToDate(e.clientY - top, height, dayDate);
			const crossHairDate = roundToNearestMinutes(dateFromEvent, {
				nearestTo: roundMinutes,
			});
			const crossHairTop = dateToPixels(crossHairDate, height);
			setChildrenProps({
				top: crossHairTop,
				date: crossHairDate,
			});
		},
		[dayDate, columnContainerRef, roundMinutes],
	);

	const handleMouseLeave = useCallback(() => {
		setChildrenProps(null);
	}, []);

	useEffect(() => {
		const node = columnContainerRef.current;
		if (!node) return; // Add null check

		node.addEventListener('mousemove', handleMouseMove);
		node.addEventListener('mouseleave', handleMouseLeave);

		return () => {
			node.removeEventListener('mousemove', handleMouseMove);
			node.removeEventListener('mouseleave', handleMouseLeave);
		};
	}, [handleMouseMove, handleMouseLeave, columnContainerRef]);

	if (!childrenProps) return null;

	return <>{children(childrenProps)}</>;
}
