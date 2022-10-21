import format from "date-fns/format";
import { HolidaysTypes } from "date-holidays";

export type DayWithDetails = {
	date: Date;
	formattedDate: string;
	workhours: number;
	salary: number;
	isWorkday: boolean;
	isToday: boolean;
	isWeekend: boolean;
	isHoliday: boolean;
	holidayName?: string;
	isInSelectedYear: boolean;
	isInSelectedMonth: boolean;
};
export const dayFormat = "yyyy-MM-dd";
export const formatDay = (date: Date) => format(date, dayFormat);
/**
 * Map<"yyyy-MM-dd", Day>
 */
export type DaysWithDetails = Map<string, DayWithDetails>;
export type DaysWithDetailsArray = [string, DayWithDetails][];

export type MonthWithDetails = {
	date: Date;
	formattedDate: string;
	isInSelectedYear: boolean;
	isSelected: boolean;
	workhours: number;
	workdays: number;
	salary: number;
};
export const monthFormat = "yyyy-MM";
export const formatMonth = (date: Date) => format(date, monthFormat);
/**
 * Map<"yyyy-MM", Month>
 */
export type MonthsWithDetails = Map<string, MonthWithDetails>;
export type MonthsWithDetailsArray = [string, MonthWithDetails][];

export type Holiday = Omit<HolidaysTypes.Holiday, "date"> & {
	date: Date;
};
