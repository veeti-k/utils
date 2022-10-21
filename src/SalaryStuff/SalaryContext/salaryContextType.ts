import { UseFormReturn } from "react-hook-form";

import {
	DayWithDetails,
	DaysWithDetails,
	DaysWithDetailsArray,
	Holiday,
	MonthWithDetails,
	MonthsWithDetails,
} from "~shared/sharedTypes";

export type SalaryContextType = {
	form: UseFormReturn<
		{
			month: string;
			hoursPerDay: number;
			hourlyPay: number;
			atWorkOnSaturdays: boolean;
			atWorkOnSundays: boolean;
		},
		any
	>;
	months: Date[];

	holidays: Holiday[];

	toggleDaysSelected: (formattedDays: string[]) => void;
	toggleDaysWithDetailsSelected: (daysWithDetails: DayWithDetails[]) => void;
	isDaySelected: (formattedDay: string) => boolean;
	setDaysSelected: (formattedDays: string[], value: boolean) => void;
	setDaysWithDetailsSelected: (daysWithDetails: DayWithDetails[], value: boolean) => void;

	daysWithDetails: DaysWithDetails;
	monthsWithDetails: MonthsWithDetails;
	getDayWithDetails: (formattedDay: string) => DayWithDetails | undefined;
	getDaysWithDetailsOfMonth: (formattedMonth: string) => DayWithDetails[];
	getMonthWithDetails: (formattedMonth: string) => MonthWithDetails | undefined;

	inputs: {
		month: string;
		hoursPerDay: number;
		hourlyPay: number;
		atWorkOnSaturdays: boolean;
		atWorkOnSundays: boolean;
	};

	selectedMonthsSalary: number;
	selectedYearsSalary: number;
	selectedMonthsWorkdays: DaysWithDetailsArray;
	selectedYearsWorkdays: DaysWithDetailsArray;
	selectedYearsTotalWorkhours: number;
	highestWorkdaysMonth: MonthWithDetails;

	selectedMonthAsDate: Date;
	selectedYearFormatted: string;
	selectedMonthFormatted: string;
};
