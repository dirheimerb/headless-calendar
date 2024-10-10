'use client';
import { useAgenda } from './use-agenda';
import { addDays } from './date-utils';
import { WeekProps } from './types';
import { memo, useMemo } from 'react';
import Day from './Day';
/**
 *
 * @param {WeekProps} children
 * @returns {JSX.Element}
 * @example
 * ```tsx
 * <Days>
 *   {({ date, containerRef, events, index }) => (
 *    <div key={date.toString()} ref={containerRef}>
 *     <h2>{date.toDateString()}</h2>
 *    <ul>
 *     {events.map((event) => (
 *     <li key={event.id}>{event.title}</li>
 *    ))}
 *   </ul>
 * </div>
 * )}
 * </Days>
 * ```
 */
function Days({ children }: WeekProps): JSX.Element {
	const { startDate, days } = useAgenda();

	const daysOfWeek = useMemo(() => [...Array(days).keys()], [days]);

	return (
		<>
			{daysOfWeek.map((i: number) => {
				const date = addDays(startDate, i);
				return (
					<Day key={date.toString()} date={date}>
						{({ containerRef, events }) => (
							<>
								{children({
									date,
									containerRef,
									events,
									index: i,
								})}
							</>
						)}
					</Day>
				);
			})}
		</>
	);
}

export default memo(Days);