// context.ts
import { AgendaContextType, BaseAgendaEvent } from './types';
import { createContext } from 'react';

const AgendaContext = createContext<AgendaContextType<BaseAgendaEvent>>({
	startDate: new Date(),
	endDate: new Date(),
	onStartDateChange: () => {},
	events: [],
	onEventChange: () => {},
	days: 0,
	onDragStart: () => {},
	onDrop: () => {},
	draggingId: '',
	setDraggingId: () => {},
});

export default AgendaContext;
