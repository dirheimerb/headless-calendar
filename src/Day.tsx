'use client';
import {
	addMinutes,
	differenceInMinutes,
	isSameDay,
	isWithinInterval,
	roundToNearestMinutes,
	startOfDay,
} from './date-utils';
import {
	createContext,
	memo,
	useCallback,
	useEffect,
	useMemo,
	useRef,
	useState,
} from 'react';
import { dateToPixels, pixelsToDate } from './utils';
import { BaseAgendaEvent, DayContextProps, DayProps } from './types';
import { useAgenda } from './use-agenda';
import { format } from 'date-fns';

export interface DragDropContext {
	allEvents: BaseAgendaEvent[];
	date: Date;
	columnContainerRef: React.MutableRefObject<HTMLDivElement | null>;
	topRef: React.MutableRefObject<number>;
	columnHeight: number;
	onEventChange: (event: BaseAgendaEvent) => void;
	onDrop: () => void;
	setDraggingId: (id: string) => void;
}
const useDragAndDrop = ({
	allEvents,
	date,
	columnHeight,
	columnContainerRef,
	topRef,
	onEventChange,
	onDrop,
	setDraggingId
}: DragDropContext) => {
	const [isDragging, setIsDragging] = useState(false);
	
	const onDragStart = useCallback(
		(e: DragEvent) => {
			console.log('drag start');
			setIsDragging(true);
			if (!e.dataTransfer?.types[0]) return;
			const data = e.dataTransfer?.types[0];
			const [draggingId, offsetMinutesStr, roundMinutesStr] = data?.split(';');
			console.log(draggingId,offsetMinutesStr);
			setDraggingId(draggingId);
		},
		[setDraggingId]
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
			const [draggingId, offsetMinutesStr, roundMinutesStr] = dragData.split(';');
			const offsetMinutes = Number(offsetMinutesStr);
			const roundMinutes = Number(roundMinutesStr);

			const event = allEvents.find((ev) => ev.id === draggingId);
			if (!event) return;

			const newTop = e.clientY - topRef.current;
			const newStart = roundToNearestMinutes(
				addMinutes(pixelsToDate(newTop, columnHeight, date), -offsetMinutes),
				{ nearestTo: roundMinutes }
			);
			const duration = differenceInMinutes(event.end, event.start);
			const newEnd = addMinutes(newStart, duration);

			onEventChange({ ...event, start: newStart, end: newEnd });
		},
		[columnHeight, date, allEvents, onEventChange]
	);

	const handleDrop = useCallback(
		(e: DragEvent) => {
			e.preventDefault();
			onDrop();
			setDraggingId('');
		},
		[onDrop, setDraggingId]
	);

	

	return { 
		handleDragOver, 
		handleDrop, 
		onDragStart, 
		onDragEnd, 
		isDragging 
	};
};

export const DayContext = createContext<DayContextProps>({
	columnHeight: 0,
	date: new Date(),
	topRef: { current: 0 },
	columnContainerRef: { current: null },
});
/**
 * Day
 * @param {DayProps} { date, children }
 * @returns {JSX.Element}
 * @description The Day component is responsible for managing the events that are displayed in a single day column. It provides a context that is used by the Event component to calculate the position of the event within the column. It also handles the drag and drop events for moving events within the column.
 * @example
 * ```tsx
 * <Day date={new Date()}>
 *  {({ containerRef, events }) => (
 *   <div ref={containerRef}>
 *   {events.map(({ event, top, bottom }) => (
 *   <Event key={event.id} top={top} bottom={bottom} event={event} />
 *  ))}
 * </div>
 * )}
 * </Day>
 * ```
 */
function Day({ date, children }: DayProps): JSX.Element {
	const {
		events: allEvents,
		onDrop,
		onEventChange,
		setDraggingId,
		draggingId,
	} = useAgenda();

	const columnContainerRef = useRef<HTMLDivElement | null>(null);
	const [columnHeight, setColumnHeight] = useState(0);
	const topRef = useRef<number>(0);

	const { handleDragOver, handleDrop, onDragEnd, onDragStart } = useDragAndDrop({
		allEvents,
		date,
		columnHeight,
		columnContainerRef,
		topRef,
		onEventChange,
		onDrop,
		setDraggingId
});

	const containerRef = useCallback((node: HTMLDivElement) => {
		if (node) {
			setColumnHeight(node.scrollHeight);
			topRef.current = node.getBoundingClientRect().top;
			columnContainerRef.current = node;
			node.setAttribute('data-column-height', `${node.scrollHeight}`);
			node.setAttribute('data-date', format(date, 'yyyy-MM-dd'));
		}
	}, []);

	useEffect(() => {
		const node = columnContainerRef.current;
		if (!node) return;
		

		node.addEventListener('dragover', handleDragOver);
		node.addEventListener('drop', handleDrop);
		node.addEventListener('dragstart', onDragStart);
		node.addEventListener('dragend', onDragEnd);

		node.setAttribute('data-is-dragging', String(draggingId !== ''));
		node.setAttribute('data-date', format(date, 'yyyy-MM-dd'));
		return () => {
			node.removeEventListener('dragover', handleDragOver);
			node.removeEventListener('drop', handleDrop);
			node.removeEventListener('dragstart', onDragStart);
			node.removeEventListener('dragend', onDragEnd);
		};
	}, [handleDragOver, handleDrop, onDragStart, onDragEnd]);

	const events = useMemo(() => {
		const columnEvents = allEvents.filter(({ start, end }) => {
			if (differenceInMinutes(end, startOfDay(date)) === 0) return false;
			if (isSameDay(start, date) || isSameDay(end, date)) return true;
			return isWithinInterval(date, { start, end });
		});

		return columnEvents.map((event) => {
			const top = isSameDay(event.start, date)
				? dateToPixels(event.start, columnHeight)
				: 0;

			const bottom = isSameDay(event.end, date)
				? columnHeight - dateToPixels(event.end, columnHeight)
				: 0;

			return {
				event,
				top,
				bottom,
				startsBeforeToday: !isSameDay(event.start, date),
				endsAfterToday: !isSameDay(event.end, date),
				isDragging: event.id === draggingId,
			};
		});
	}, [allEvents, date, columnHeight, draggingId]);

	return (
		<DayContext.Provider
			value={{ columnHeight, date, topRef, columnContainerRef }}>
			{children({ containerRef, events })}
		</DayContext.Provider>
	);
}

export default memo(Day);