'use client';
import { DayContext } from '../components/Day';
import { useContext } from 'react';

export function useDay() {
	const context = useContext(DayContext);
	if (!context) {
		throw new Error('useDay must be used within a DayContext.Provider');
	}

	return context;
}
