'use client';
import React, {
	createContext,
	useContext,
	ReactNode,
	useMemo,
	CSSProperties,
	useState,
} from 'react';

// Types for the theme configuration
interface ThemeConfig {
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

export interface ThemeContextType extends ThemeConfig {}

// Create the context with default values
export const ThemeContext = createContext<ThemeContextType>({});

// ThemeProvider component to wrap around the calendar
interface ThemeProviderProps {
	children: ReactNode;
}

export const ThemeProvider = ({ children }: ThemeProviderProps) => {
	const [theme, setTheme] = useState<ThemeConfig>({});

	const value = useMemo(() => theme, [theme]);

	return (
		<ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
	);
};
