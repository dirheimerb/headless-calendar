import { ComponentProps, ReactNode } from 'react';
import Agenda from './Agenda';

type ArrayType<T> = T extends (infer Item)[] ? Item : T;

export type InferredEvents = ComponentProps<typeof Agenda>['events'];
export type InferredEvent = ArrayType<InferredEvents>;

export interface ExtendedEventProps {
	top: number;
	bottom: number;
	startsBeforeToday: boolean;
	endsAfterToday: boolean;
	isDragging: boolean;
}

/**************************************************************/
/**                     Time                                 **/
/**************************************************************/
export interface TimeChildrenProps {
	containerRef: (node: HTMLDivElement) => void;
	time: TimeType[];
}

export type TimeType = {
	hour: number;
	label: string;
	top: number;
};

export interface TimeProps {
	children: (props: TimeChildrenProps) => ReactNode;
}
/**************************************************************/
/**                     Agenda Context                       **/
/**************************************************************/
export interface BaseAgendaEvent {
	id: string;
	start: Date;
	end: Date;
	title: string;
	className?: string;
	[key: string]: any;
}
export interface AgendaContextType<TEvent extends BaseAgendaEvent> {
	startDate: Date;
	endDate: Date;
	onStartDateChange: (newDate: Date) => void;
	events: TEvent[];
	onEventChange: (newEvent: BaseAgendaEvent) => void;
	days: number;
	onDragStart: (eventId: string) => void;
	onDrop: () => void;
	draggingId: string;
	setDraggingId: (id: string) => void;
}
/**************************************************************/
/**                   Agenda Component                       **/
/**************************************************************/
export interface AgendaChildrenProps {
	next: () => void;
	prev: () => void;
	endDate: Date;
}
/**************************************************************/
/**            Day Context and Component                     **/
/**************************************************************/
export interface AgendaProps<TEvent extends BaseAgendaEvent> {
	startDate?: Date;
	onStartDateChange?: (newDate: Date) => void;
	events: TEvent[];
	days?: number;
	children: (props: AgendaChildrenProps) => ReactNode;
	onEventChange?: (event: BaseAgendaEvent) => void;
	onDragStart?: (eventId: string) => void;
	onDrop?: () => void;
}
export interface EventBlock<
	EventType extends BaseAgendaEvent = BaseAgendaEvent,
> {
	event: EventType;
	top: number;
	bottom: number;
	startsBeforeToday: boolean;
	endsAfterToday: boolean;
	isDragging: boolean;
}
export interface DayChildrenProps {
	containerRef: (node: HTMLDivElement) => void;
	events: EventBlock[];
}
export interface DayProps {
	date: Date;
	children: (props: DayChildrenProps) => ReactNode;
}
export interface DayContextProps {
	columnHeight: number;
	date: Date;
	topRef: React.MutableRefObject<number>;
	columnContainerRef: React.MutableRefObject<HTMLDivElement | null>;
}
/**************************************************************/
/**                    Week Properties                       **/
/**************************************************************/
export interface WeekDayProps extends DayChildrenProps {
	date: Date;
	index: number;
}

export interface WeekProps {
	children: (childrenProps: WeekDayProps) => ReactNode;
}
/**************************************************************/
/**                  Needle Properties                       **/
/**************************************************************/
export interface RedLineProps {
	children: (props: { top: number }) => ReactNode;
}
/**************************************************************/
/**               Crosshair Properties                       **/
/**************************************************************/
export interface CrosshairChildrenProps {
	top: number;
	date: Date;
}
export interface CrosshairProps {
	children: (props: CrosshairChildrenProps) => ReactNode;
	roundMinutes?: number;
}
