'use client';
import {
	addMinutes,
	differenceInMinutes,
	roundToNearestMinutes,
} from '../date-utils';
import { useCallback, useState } from 'react';
import { DragDropContext } from '../types';
import { pixelsToDate } from '../utils';

export const useDragAndDrop = ({
	allEvents,
	date,
	columnHeight,
	columnContainerRef,
	topRef,
	onEventChange,
	onDrop,
	setDraggingId,
}: DragDropContext) => {
	const [isDragging, setIsDragging] = useState(false);

	const onDragStart = useCallback(
		(e: DragEvent) => {
			console.log('drag start');
			setIsDragging(true);
			if (!e.dataTransfer?.types[0]) return;
			const data = e.dataTransfer?.types[0];
			const [draggingId, offsetMinutesStr, roundMinutesStr] = data?.split(';');
			console.log(draggingId, offsetMinutesStr);
			setDraggingId(draggingId);
		},
		[setDraggingId],
	);

	const onDragEnd = useCallback(() => {
		console.log('drag end');
		setDraggingId('');
		setIsDragging(false);
	}, [setDraggingId]);

	const handleDragOver = useCallback(
		(e: DragEvent) => {
			e.preventDefault();
			if (!columnContainerRef.current) return;
			if (!e.dataTransfer?.types[0]) return;

			const dragData = e.dataTransfer.types[0];
			const [draggingId, offsetMinutesStr, roundMinutesStr] =
				dragData.split(';');
			const offsetMinutes = Number(offsetMinutesStr);
			const roundMinutes = Number(roundMinutesStr);

			const event = allEvents.find((ev) => ev.id === draggingId);
			if (!event) return;

			const newTop = e.clientY - topRef.current;
			const newStart = roundToNearestMinutes(
				addMinutes(pixelsToDate(newTop, columnHeight, date), -offsetMinutes),
				{ nearestTo: roundMinutes },
			);
			const duration = differenceInMinutes(event.end, event.start);
			const newEnd = addMinutes(newStart, duration);

			onEventChange({ ...event, start: newStart, end: newEnd });
		},
		[columnHeight, date, allEvents, onEventChange],
	);

	const handleDrop = useCallback(
		(e: DragEvent) => {
			e.preventDefault();
			onDrop();
			setDraggingId('');
		},
		[onDrop, setDraggingId],
	);

	return {
		handleDragOver,
		handleDrop,
		onDragStart,
		onDragEnd,
		isDragging,
	};
};
