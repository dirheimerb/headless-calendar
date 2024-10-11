'use client';
import AgendaContext from '../context/agenda-context';
import { useContext } from 'react';

export function useAgenda() {
	const context = useContext(AgendaContext);
	if (!context) {
		throw new Error('useAgenda must be used within an AgendaContext.Provider');
	}
	return context;
}
