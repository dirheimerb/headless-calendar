'use client';
import { useMemo, useState } from 'react';
import AgendaContext from '../context/agenda-context';
import { addDays, startOfWeek } from '..';
import type { AgendaContextType, AgendaProps, BaseAgendaEvent } from '..';
/**
 *
 * @param {AgendaProps<TEvent>} {
 *  startDate = startOfWeek(new Date()),
 * onStartDateChange = () => {},
 * events = [],
 * onEventChange = () => {},
 * days = 7,
 * children,
 * onDragStart = () => {},
 * onDrop = () => {},
 * }
 * @returns {JSX.Element}
 * @example
 * ```tsx
 * <Agenda
 *    startDate={new Date()}
 *    onStartDateChange={(newDate) => console.log(newDate)}
 *    events={[]}
 *    onEventChange={(newEvent) => console.log(newEvent)}
 *    days={7}
 *    onDragStart={(eventId) => console.log(eventId)}
 *    onDrop={() => console.log('dropped')}>
 *      {({ prev, next, endDate }) => (
 *          <div>
 *              <button onClick={prev}>Prev</button>
 *              <button onClick={next}>Next</button>
 *              <p>{endDate.toDateString()}</p>
 *          </div>
 *      )}
 * </Agenda>
 * ```
 */
export default function Agenda<TEvent extends BaseAgendaEvent>({
	startDate = startOfWeek(new Date()),
	onStartDateChange = () => {},
	events = [],
	onEventChange = () => {},
	days = 7,
	children,
	onDragStart = () => {},
	onDrop = () => {},
}: AgendaProps<TEvent>): JSX.Element {
	const endDate = addDays(new Date(startDate), days - 1);
	const [draggingId, setDraggingId] = useState<string>('');
	/**
	 * contextValue
	 * @type {number} days - contextValue.days
	 * @type {string} draggingId - contextValue.draggingId
	 * @type {Date} endDate - contextValue.endDate
	 * @type {TEvent[]} events - contextValue.events
	 * @type {(eventId: string) => void} onDragStart - contextValue.onDragStart
	 * @type {() => void} onDrop - contextValue.onDrop
	 * @type {(newEvent: BaseAgendaEvent) => void} onEventChange - contextValue.onEventChange
	 * @type {(newDate: Date) => void} onStartDateChange - contextValue.onStartDateChange
	 * @type {(id: string) => void} setDraggingId - contextValue.setDraggingId
	 * @type {Date} startDate - contextValue.startDate
	 */
	const contextValue: AgendaContextType<TEvent> = useMemo(() => {
    return {
      startDate,
      endDate,
      onStartDateChange,
      events,
      onEventChange,
      days,
      onDragStart,
      onDrop,
      draggingId,
      setDraggingId,
    };
  }, [
    startDate,
    endDate,
    onStartDateChange,
    events,
    onEventChange,
    days,
    onDragStart,
    onDrop,
    draggingId,
    setDraggingId,
  ]);
	return (
		<AgendaContext.Provider value={contextValue}>
			{children({
				prev: () => onStartDateChange(addDays(new Date(startDate), -days)),
				next: () => onStartDateChange(addDays(new Date(startDate), days)),
				endDate,
			})}
		</AgendaContext.Provider>
	);
}
