'use client';
import React, {
	useRef,
	createContext,
	useCallback,
	ReactNode,
	useMemo,
} from 'react';
interface EventDetails {
	id: string;
	start: Date;
	end: Date;
	title: string;
	description?: string;
	className?: string;
	style?: React.CSSProperties;
}
export interface RenderPropContextType {
	containerRef: React.RefObject<HTMLDivElement | null>;
	columnContainerRef: React.RefObject<HTMLDivElement | null>;
	events: React.RefObject<EventDetails[]>;
	draggingIdRef: React.RefObject<string>;
	columnHeight: React.RefObject<number>;
	topRef: React.RefObject<number>;
	setEvents: (events: EventDetails[]) => void;
	setDraggingId: (id: string) => void;
	setColumnHeight: (height: number) => void;
	setTopRef: (top: number) => void;
}

export const RenderPropContext = createContext<RenderPropContextType | null>(
	null,
);

interface RenderPropProviderProps {
	children: ReactNode;
}

export const RenderPropProvider = ({ children }: RenderPropProviderProps) => {
	const containerRef = useRef<HTMLDivElement | null>(null);
	const columnContainerRef = useRef<HTMLDivElement | null>(null);
	const events = useRef<EventDetails[]>([]);
	const draggingIdRef = useRef<string>('');
	const columnHeight = useRef<number>(0);
	const topRef = useRef<number>(0);

	// Memoized functions to update the refs
	const setEvents = useCallback((newEvents: EventDetails[]) => {
		events.current = newEvents;
	}, []);

	const setDraggingId = useCallback((id: string) => {
		draggingIdRef.current = id;
	}, []);

	const setColumnHeight = useCallback((height: number) => {
		columnHeight.current = height;
	}, []);

	const setTopRef = useCallback((top: number) => {
		topRef.current = top;
	}, []);

	// Memoize the context value to prevent unnecessary re-renders
	const value = useMemo(
		() => ({
			containerRef,
			columnContainerRef,
			events,
			draggingIdRef,
			columnHeight,
			topRef,
			setEvents,
			setDraggingId,
			setColumnHeight,
			setTopRef,
		}),
		[setEvents, setDraggingId, setColumnHeight, setTopRef],
	);

	return (
		<RenderPropContext.Provider value={value}>
			{children}
		</RenderPropContext.Provider>
	);
};
