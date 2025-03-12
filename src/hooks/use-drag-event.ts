'use client';
import { hideDragGhost, pixelsToDate } from '../utils';
import { differenceInMinutes } from '../date-utils';
import { useAgenda } from './use-agenda';
import { useCallback } from 'react';
import { useDay } from './use-day';

export const useDragEvent = (eventId: string, roundMinutes = 15) => {
	const { events, onDragStart, setDraggingId } = useAgenda();
	const { columnHeight, date, topRef } = useDay();

	const handleDragStart = useCallback(
		(e: React.DragEvent<HTMLElement>) => {
			hideDragGhost(e);
			setDraggingId(eventId);

			e.dataTransfer.effectAllowed = 'move';

			const event = events.find((event) => event.id === eventId);
			if (!event) return;

			onDragStart(eventId);

			// difference in minutes between the start of the event and the cursor position
			const mouseDate = pixelsToDate(
				e.clientY - topRef.current,
				columnHeight,
				date,
			);
			const offsetMinutes = differenceInMinutes(mouseDate, event.start);

			e.dataTransfer.setData(`${eventId};${offsetMinutes};${roundMinutes}`, '');
		},
		[
			columnHeight,
			date,
			events,
			eventId,
			roundMinutes,
			topRef,
			onDragStart,
			setDraggingId,
		],
	);

	return {
		handleDragStart,
	};
};
