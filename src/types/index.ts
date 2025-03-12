import { ComponentProps, CSSProperties, ReactNode } from 'react';
import Agenda from '../components/Agenda';

/**************************************************************/
/**                     Utils                                **/
/**************************************************************/
/**
 * Extracts the type of the items in an array
 */
export type ArrayType<T> = T extends (infer Item)[] ? Item : T;
/**
 * InferredEvents is the type of the events prop of the Agenda component
 */
export type InferredEvents = ComponentProps<typeof Agenda>['events'];
/**
 * InferredEvent is the type of a single event in the events prop of the Agenda component
 */
export type InferredEvent = ArrayType<InferredEvents>;

/**************************************************************/
/**                     Event                                **/
/**************************************************************/
/**
 * The event object
 */
export interface ExtendedEventProps {
	/**
	 * @type {number} top - The top position of the event
	 */
	top: number;
	/**
	 * @type {number} bottom - The bottom position of the event
	 */
	bottom: number;
	/**
	 * @type {boolean} startsBeforeToday - Whether the event starts before today
	 */
	startsBeforeToday: boolean;
	/**
	 * @type {boolean} endsAfterToday - Whether the event ends after today
	 */
	endsAfterToday: boolean;
	/**
	 * @type {boolean} isDragging - Whether the event is being dragged
	 */
	isDragging: boolean;
}
/**************************************************************/
/**                     Time                                 **/
/**************************************************************/
export interface TimeChildrenProps {
	/**
	 * @type {HTMLDivElement} node - The HTMLDivElement
	 */
	containerRef: (node: HTMLDivElement) => void;
	/**
	 * @type {TimeType[]} time - The time
	 */
	time: TimeType[];
}

export type TimeType = {
	/**
	 * @type {number} hour - The hour
	 */
	hour: number;
	/**
	 * @type {string} label - The label for the hour (e.g., "12:00 AM")
	 */
	label: string;
	/**
	 * @type {number} top - The top position
	 */
	top: number;
};

export interface TimeProps {
	/**
	 * @type {(props: TimeChildrenProps) => ReactNode} children - The children
	 */
	children: (props: TimeChildrenProps) => ReactNode;
}
/**************************************************************/
/**                     Agenda Context                       **/
/**************************************************************/
export interface BaseAgendaEvent {
	/**
	 * @type {string} id - The id of the event
	 */
	id: string;
	/**
	 * @type {Date} start - The start date of the event
	 */
	start: Date;
	/**
	 * @type {Date} end - The end date of the event
	 */
	end: Date;
	/**
	 * @type {string} title - The title of the event
	 */
	title: string;
	/**
	 * @type {string}
	 */
	className?: string;
	/**
	 * @type {Record<string, any>} [key: string]: any - The key
	 * @description The key of the event
	 */
	[key: string]: any;
}
export interface AgendaContextType<TEvent extends BaseAgendaEvent> {
	/**
	 * @type {Date} startDate - The start date
	 */
	startDate: Date;
	/**
	 * @type {Date} endDate - The end date
	 */
	endDate: Date;
	/**
	 * @type {number} days - The number of days
	 */
	onStartDateChange: (newDate: Date) => void;
	/**
	 * @type {TEvent[]} events - The events
	 */
	events: TEvent[];
	/**
	 * @type {(newEvent: BaseAgendaEvent) => void} onEventChange - The event change
	 */
	onEventChange: (newEvent: BaseAgendaEvent) => void;
	/**
	 * @type {number} days - The number of days
	 */
	days: number;
	/**
	 * @type {(eventId: string) => void} onDragStart - The drag start
	 */
	onDragStart: (eventId: string) => void;
	/**
	 * @type {() => void} onDrop - The drop
	 */
	onDrop: () => void;
	/**
	 * @type {string} draggingId - The dragging id
	 */
	draggingId: string;
	/**
	 * @type {(id: string) => void} setDraggingId - The set dragging id
	 */
	setDraggingId: (id: string) => void;
}
/**************************************************************/
/**                   Agenda Component                       **/
/**************************************************************/
export interface AgendaChildrenProps {
	/**
	 * @type {() => void} next - The next
	 */
	next: () => void;
	/**
	 * @type {() => void} prev - The previous
	 * @description The previous day
	 */
	prev: () => void;
	/**
	 * @type {Date} endDate - The end date
	 */
	endDate: Date;
}
/**************************************************************/
/**            Day Context and Component                     **/
/**************************************************************/
export interface AgendaProps<TEvent extends BaseAgendaEvent> {
	/**
	 * @type {Date} startDate - The start date
	 */
	startDate?: Date;
	/**
	 * @type {(newDate: Date) => void} onStartDateChange - The start date change
	 */
	onStartDateChange?: (newDate: Date) => void;
	/**
	 * @type {TEvent[]} events
	 */
	events: TEvent[];
	/**
	 * @type {number} days - The number of days
	 */
	days?: number;
	/**
	 * @type {(props: AgendaChildrenProps) => ReactNode} children - The children
	 */
	children: (props: AgendaChildrenProps) => ReactNode;
	/**
	 * @type {(eventId: string) => void} onDragStart - The drag start
	 */
	onEventChange?: (event: BaseAgendaEvent) => void;
	/**
	 * @type {() => void} onDrop - The drop
	 */
	onDragStart?: (eventId: string) => void;
	/**
	 * @type {() => void} onDrop - The drop
	 */
	onDrop?: () => void;
}
export interface EventBlock<
	EventType extends BaseAgendaEvent = BaseAgendaEvent,
> {
	/**
	 * @type {EventType} event - The event type
	 */
	event: EventType;
	/**
	 * @type {number} top - The top position
	 * @description The top position of the event
	 */
	top: number;
	/**
	 * @type {number} bottom - The bottom position
	 * @description The bottom position of the event
	 */
	bottom: number;
	/**
	 * @type {boolean} startsBeforeToday - Whether the event starts before today
	 */
	startsBeforeToday: boolean;
	/**
	 * @type {boolean} endsAfterToday - Whether the event ends after
	 */
	endsAfterToday: boolean;
	/**
	 * @type {boolean} isDragging - Whether the event is being dragged
	 */
	isDragging: boolean;
}
export interface DayChildrenProps {
	/**
	 * @type {HTMLDivElement} node - The HTMLDivElement
	 */
	containerRef: (node: HTMLDivElement) => void;
	/**
	 * @type {Date} date - The date
	 */
	events: EventBlock[];
}
export interface DayProps {
	/**
	 * @type {Date} date - The date
	 */
	date: Date;
	/**
	 * @type {(props: DayChildrenProps) => ReactNode} children - The children
	 */
	children: (props: DayChildrenProps) => ReactNode;
}
export interface DayContextProps {
	/**
	 * @type {number} columnHeight - The column height
	 */
	columnHeight: number;
	/**
	 * @type {Date} date - The date
	 */
	date: Date;
	/**
	 * @type {number} topRef - The top reference
	 */
	topRef: React.MutableRefObject<number>;
	/**
	 * @type {HTMLDivElement} columnContainerRef - The column container reference
	 */
	columnContainerRef: React.MutableRefObject<HTMLDivElement | null>;
}
/**************************************************************/
/**                    Week Properties                       **/
/**************************************************************/
export interface WeekDayProps extends DayChildrenProps {
	/**
	 * @type {Date} date - The date
	 */
	date: Date;
	/**
	 * @type {number} index
	 */
	index: number;
}

export interface WeekProps {
	/**
	 * @type {(childrenProps: WeekDayProps) => ReactNode} childrenProps - The start date
	 */
	children: (childrenProps: WeekDayProps) => ReactNode;
}
/**************************************************************/
/**                 RedLine Properties                       **/
/**************************************************************/
export interface RedLineProps {
	/**
	 * @type {(props: { top: number }) => ReactNode} children - The props for the children
	 */
	children: (props: { top: number }) => ReactNode;
}
/**************************************************************/
/**               Crosshair Properties                       **/
/**************************************************************/
export interface CrosshairChildrenProps {
	/**
	 * @type {number} top - The top position
	 */
	top: number;
	/**
	 * @type {Date} date - The date
	 */
	date: Date;
}
export interface CrosshairProps {
	/**
	 * @type {(props: CrosshairChildrenProps) => ReactNode} children - The children
	 */
	children: (props: CrosshairChildrenProps) => ReactNode;
	/**
	 * @type {number} roundMinutes - The round minutes
	 */
	roundMinutes?: number;
}
/**************************************************************/
/**                   DND Properties                         **/
/**************************************************************/
export interface DragDropContext {
	/**
	 * @type {BaseAgendaEvent[]} allEvents - The events
	 */
	allEvents: BaseAgendaEvent[];
	/**
	 * @type {Date} date - The date
	 */
	date: Date;
	/**
	 * @type {HTMLDivElement} columnContainerRef - The column container reference
	 */
	columnContainerRef: React.MutableRefObject<HTMLDivElement | null>;
	/**
	 * @type {React.MutableRefObject<number>} topRef - The top reference
	 */
	topRef: React.MutableRefObject<number>;
	/**
	 * @type {(newEvent: BaseAgendaEvent) => void} onEventChange - The event change
	 */
	columnHeight: number;
	/**
	 * @type {() => void} onDrop - The drop
	 */
	onEventChange: (event: BaseAgendaEvent) => void;
	/**
	 * @type {() => void} onDrop - The drop
	 */
	onDrop: () => void;
	/**
	 * @type {(id: string) => void} setDraggingId - The set dragging id
	 */
	setDraggingId: (id: string) => void;
}
/**************************************************************/
/**                   ToolTip Props                          **/
/**************************************************************/
export interface EventTooltipProps {
	/**
	 * @type {BaseAgendaEvent} event - The event
	 */
	event: BaseAgendaEvent;
	/**
	 * @type {ReactNode} children - The children
	 */
	children: ReactNode;
}
/**************************************************************/
/**                Event List Props                          **/
/**************************************************************/
export interface EventListProps<TEvent extends BaseAgendaEvent> {
	/**
	 * @type {TEvent[]} events - The events
	 */
	events: TEvent[];
	/**
	 * @type {string}   filter - The filter
	 */
	filter?: string;
	/**
	 * @type {(event: TEvent) => void}
	 */
	onSelect: (event: TEvent) => void;
}
/**************************************************************/
/**                Calendar Navigation                       **/
/**************************************************************/
export interface CalendarNavigationProps {
	/**
	 * @type {Date} startDate - The start date
	 */
	startDate: Date;
	/**
	 * @type {() => void} onPrev - The previous day
	 */
	onPrev: () => void;
	/**
	 * @type {() => void} onNext - The next day
	 */
	onNext: () => void;
	/**
	 * @type {() => void} onToday - The today
	 */
	onToday: () => void;
}
/**************************************************************/
/**                Week Selector Props                       **/
/**************************************************************/
export interface WeekSelectorProps {
	/**
	 * @type {Date} startDate - The start date
	 * @description The start date
	 */
	startDate: Date;
	/**
	 * @type {(newDate: Date) => void} onChange - The change
	 */
	onChange: (newDate: Date) => void;
}
/**************************************************************/
/**                 Date Range Selector                      **/
/**************************************************************/
export interface DateRangeSelectorProps {
	/**
	 * @type {Date} start - The start date
	 * @description The start date
	 * @type {Date} end - The end date
	 * @description The end date
	 */
	onDateRangeChange: (start: Date, end: Date) => void;
}
/**************************************************************/
// Types for the theme configuration
export interface ThemeConfig {
	hourClassName?: string;
	hourStyle?: CSSProperties;
	hourDataAttributes?: Record<string, string>;

	dayClassName?: string;
	dayStyle?: CSSProperties;
	dayDataAttributes?: Record<string, string>;

	eventClassName?: string;
	eventStyle?: CSSProperties;
	eventDataAttributes?: Record<string, string>;

	weekClassName?: string;
	weekStyle?: CSSProperties;
	weekDataAttributes?: Record<string, string>;

	monthClassName?: string;
	monthStyle?: CSSProperties;
	monthDataAttributes?: Record<string, string>;

	yearClassName?: string;
	yearStyle?: CSSProperties;
	yearDataAttributes?: Record<string, string>;
}

export interface CalendarProps {
	startDate: Date;
	events: EventDetails[];
	theme: ThemeConfig;
	renderYear?: (props: { year: number; children: ReactNode }) => ReactNode;
	renderMonth?: (props: {
		year: number;
		month: number;
		children: ReactNode;
	}) => ReactNode;
	renderWeek?: (props: {
		startDate: Date;
		days: number;
		children: ReactNode;
	}) => ReactNode;
	renderDay?: (props: {
		date: Date;
		events: EventDetails[];
		children: ReactNode;
	}) => ReactNode;
	renderHour?: (props: {
		hour: number;
		events: EventDetails[];
		children: ReactNode;
	}) => ReactNode;
	renderEvent?: (event: EventDetails) => ReactNode;
}

export interface EventDetails {
	id: string;
	start: Date;
	end: Date;
	title: string;
	description?: string;
	className?: string;
	style?: React.CSSProperties;
}

export interface YearProps {
	year: number;
	renderMonth: (year: number, month: number) => ReactNode;
}
