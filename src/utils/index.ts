import {
	differenceInSeconds,
	endOfDay,
	startOfDay,
	addMinutes,
} from '../date-utils';
/**
 * dateToPixels
 * @param {Date} date
 * @param {number} columnHeight
 * @returns {number}
 * @description Converts a date to pixels based on the position of the date relative to the column height.
 * @example
 * ```ts
 * const date = new Date();
 * const pixels = dateToPixels(date, 1000);
 * console.log(pixels); // number
 * ```
 */
export const dateToPixels = (date: Date, columnHeight: number): number => {
	const differenceWithEnd = differenceInSeconds(endOfDay(date), date);
	const minutesLeft = 86400 - differenceWithEnd;
	const percentage = (minutesLeft / 86400) * 100;
	return (percentage * columnHeight) / 100;
};
/**
 * pixelsToDate
 * @param {number} pixels
 * @param {number} columnHeight
 * @param {Date} pivot
 * @returns {Date}
 * @description Converts pixels to a date based on the position of the pixels relative to the column height.
 * @example
 * ```ts
 * const date = pixelsToDate(100, 1000);
 * console.log(date); // Date
 * ```
 */
export const pixelsToDate = (
	pixels: number,
	columnHeight: number,
	pivot = new Date(),
): Date => {
	const percentage = (pixels / columnHeight) * 100;
	const minutesPassed = (percentage / 100) * 1440;
	const dateStart = startOfDay(pivot);
	const date = addMinutes(dateStart, minutesPassed);
	return date;
};
/**
 * mouseEventToDate
 * @param {React.MouseEvent<HTMLElement>} e
 * @param {Date} pivotDate - Reference date
 * @returns {Date}
 * @description Converts a mouse event to a date based on the position of the mouse event relative to the target element.
 * @example
 * ```tsx
 * <div onMouseDown={(e) => {
 * const date = mouseEventToDate(e);
 * console.log(date);
 * }} />
 * ```
 */
export const mouseEventToDate = (
	e: React.MouseEvent<HTMLElement>,
	pivotDate = new Date(),
) => {
	const { top, height } = e.currentTarget.getBoundingClientRect();
	return pixelsToDate(e.clientY - top, height, pivotDate);
};
/**
 * hideDragGhost
 * @param {React.DragEvent<HTMLElement>} e
 * @returns {void}
 * @description Hides the drag ghost element by setting it to a blank canvas.
 * @example
 * ```tsx
 * <div onDragStart={hideDragGhost} />
 * ```
 */
export const hideDragGhost = (e: React.DragEvent<HTMLElement>) => {
	const blankCanvas = document.createElement('canvas');
	blankCanvas.style.position = 'fixed';
	document.body.appendChild(blankCanvas);
	e.dataTransfer.setDragImage(blankCanvas, 0, 0);
};
/**
 * getDataAttributes
 * @param {Record<string, string>} attributes - Data attributes
 * @returns {Record<string, string>}
 * @description Converts an object of data attributes to an object of HTML data attributes.
 * @example
 * ```tsx
 * const attributes = { id: '1', name: 'example' };
 * const dataAttributes = getDataAttributes(attributes);
 * console.log(dataAttributes); // { 'data-id': '1', 'data-name': 'example' }
 * ```
 */
export const getDataAttributes = (
	attributes?: Record<string, string>,
): Record<string, string> => {
	return attributes
		? Object.entries(attributes).reduce(
				(acc, [key, value]) => {
					acc[`data-${key}`] = value;
					return acc;
				},
				{} as Record<string, string>,
			)
		: {};
};
