'use client';
import {
	addMinutes,
	differenceInMinutes,
	isSameDay,
	roundToNearestMinutes,
} from '../date-utils';
import { DragEvent, useCallback, useMemo, useRef } from 'react';
import { hideDragGhost, pixelsToDate } from '../utils';
import { useAgenda } from './use-agenda';
import { useDay } from './use-day';

export function useResize(eventId: string, roundMinutes = 15) {
	const { events, onEventChange } = useAgenda();
	const { columnHeight, date, topRef } = useDay();
	const offsetFromEnd = useRef(0);

	const event = useMemo(
		() => events.find((e) => e.id === eventId),
		[events, eventId],
	);

	const handleDragStart = useCallback(
		(e: DragEvent<HTMLElement>) => {
			if (!event) return;
			e.stopPropagation();
			e.dataTransfer.effectAllowed = 'move';
			hideDragGhost(e);

			const mouseDate = pixelsToDate(
				e.clientY - topRef.current,
				columnHeight,
				date,
			);
			offsetFromEnd.current = differenceInMinutes(event.end, mouseDate);
		},
		[event, columnHeight, date, topRef],
	);

	const handleDrag = useCallback(
		(e: DragEvent<HTMLElement>) => {
			if (!event) return;
			e.stopPropagation();

			const mouseDate = pixelsToDate(
				e.clientY - topRef.current,
				columnHeight,
				date,
			);
			const newEndDate = roundToNearestMinutes(
				addMinutes(mouseDate, offsetFromEnd.current),
				{ nearestTo: roundMinutes },
			);

			if (!isSameDay(event.end, newEndDate)) return;
			if (differenceInMinutes(newEndDate, event.start) < 15) return;

			onEventChange({
				...event,
				end: newEndDate,
			});
		},
		[event, columnHeight, date, topRef, onEventChange, roundMinutes],
	);

	return {
		handleDragStart,
		handleDrag,
	};
}
