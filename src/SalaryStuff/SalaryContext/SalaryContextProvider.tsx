import eachMonthOfInterval from "date-fns/eachMonthOfInterval";
import endOfWeek from "date-fns/endOfWeek";
import endOfYear from "date-fns/endOfYear";
import format from "date-fns/format";
import isValid from "date-fns/isValid";
import startOfWeek from "date-fns/startOfWeek";
import startOfYear from "date-fns/startOfYear";
import type { ReactNode } from "react";

import { createCtx } from "../../context/createContext";
import type { SalaryContextType } from "./salaryContextType";
import { useDaysWithDetails } from "./useDaysWithDetails";
import { useHolidays } from "./useHolidays";
import { useMonthsWithDetails } from "./useMonthsWithDetails";
import { useSalaryForm } from "./useSalaryForm";
import { useSelectedDays } from "./useSelectedDays";

const [useContextInner, Context] = createCtx<SalaryContextType>();

export const useSalaryContext = () => useContextInner();

type Props = {
	children: ReactNode;
};

export const SalaryContextProvider = ({ children }: Props) => {
	const form = useSalaryForm();

	const month = form.watch("month");
	const hoursPerDay = form.watch("hoursPerDay");
	const hourlyPay = form.watch("hourlyPay");
	const atWorkOnSaturdays = form.watch("atWorkOnSaturdays");
	const atWorkOnSundays = form.watch("atWorkOnSundays");

	const selectedMonthAsDate = isValid(new Date(month)) ? new Date(month) : new Date();

	const selectedMonthFormatted = format(selectedMonthAsDate, "MMMM");
	const selectedYearFormatted = format(selectedMonthAsDate, "yyyy");

	const holidays = useHolidays({ selectedMonthAsDate });

	const {
		getDayWithDetails,
		getDaysWithDetailsOfMonth,
		getDaysWithDetailsOfWeek,
		daysWithDetails,
	} = useDaysWithDetails({
		selectedMonth: selectedMonthAsDate,
		hoursPerDay,
		atWorkOnSaturdays,
		atWorkOnSundays,
		holidays,
		hourlyPay,
	});

	const {
		toggleDaysSelected,
		toggleDaysWithDetailsSelected,
		isDaySelected,
		setDaysSelected,
		setDaysWithDetailsSelected,
	} = useSelectedDays({
		daysWithDetails,
	});

	const { getMonthWithDetails, monthsWithDetails } = useMonthsWithDetails({
		selectedMonth: selectedMonthAsDate,
		daysWithDetails,
		hourlyPay,
	});

	const selectedYearsWorkdays = [...daysWithDetails].filter(
		([_, day]) => day.isInSelectedYear && day.isWorkday
	);

	const selectedMonthsWorkdays = [...daysWithDetails].filter(
		([_, day]) => day.isInSelectedMonth && day.isWorkday
	);

	const selectedMonthsSalary = selectedMonthsWorkdays.reduce(
		(acc, [_, day]) => acc + day.salary,
		0
	);

	const selectedYearsSalary = selectedYearsWorkdays.reduce(
		(acc, [_, day]) => acc + day.salary,
		0
	);

	const selectedYearsTotalWorkhours = selectedYearsWorkdays.reduce(
		(acc, [_, day]) => acc + day.workhours,
		0
	);

	const monthsWithDetailsArr = [...monthsWithDetails].map(([_, month]) => month);

	const highestWorkdaysMonth = monthsWithDetailsArr.reduce((acc, month) => {
		if (!acc || month.workdays > acc?.workdays) {
			return month;
		}

		return acc;
	}, monthsWithDetailsArr[0]);

	const lowestWorkdaysMonth = monthsWithDetailsArr.reduce((acc, month) => {
		if (!acc || month.workdays < acc?.workdays) {
			return month;
		}

		return acc;
	}, monthsWithDetailsArr[0]);

	const months = eachMonthOfInterval({
		start: startOfWeek(startOfYear(selectedMonthAsDate)),
		end: endOfWeek(endOfYear(selectedMonthAsDate)),
	});

	return (
		<Context.Provider
			value={{
				form,
				months,

				holidays,

				toggleDaysSelected,
				toggleDaysWithDetailsSelected,
				isDaySelected,
				setDaysSelected,
				setDaysWithDetailsSelected,

				daysWithDetails,
				monthsWithDetails,
				getDayWithDetails,
				getDaysWithDetailsOfMonth,
				getDaysWithDetailsOfWeek,
				getMonthWithDetails,

				selectedYearsWorkdays,
				selectedMonthsWorkdays,

				selectedYearsSalary,
				selectedMonthsSalary,

				selectedYearsTotalWorkhours,
				highestWorkdaysMonth: highestWorkdaysMonth ?? null,
				lowestWorkdaysMonth: lowestWorkdaysMonth ?? null,

				selectedMonthAsDate,
				selectedMonthFormatted,
				selectedYearFormatted,

				inputs: {
					month,
					hoursPerDay,
					hourlyPay,
					atWorkOnSundays,
					atWorkOnSaturdays,
				},
			}}
		>
			{children}
		</Context.Provider>
	);
};
