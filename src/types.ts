import format from "date-fns/format";
import { HolidaysTypes } from "date-holidays";

export type Day = {
	date: Date;
	formattedDate: string;
	workedHours: number;
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

export type Month = {
	date: Date;
	formattedDate: string;
	isInSelectedYear: boolean;
	isSelected: boolean;
	workedHours: number;
	workDays: number;
	salary: number;
};
export const monthFormat = "yyyy-MM";
export const formatMonth = (date: Date) => format(date, monthFormat);

export type Holiday = Omit<HolidaysTypes.Holiday, "date"> & {
	date: Date;
};
