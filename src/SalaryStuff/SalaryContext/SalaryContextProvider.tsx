import eachMonthOfInterval from "date-fns/eachMonthOfInterval";
import endOfWeek from "date-fns/endOfWeek";
import endOfYear from "date-fns/endOfYear";
import format from "date-fns/format";
import isValid from "date-fns/isValid";
import startOfWeek from "date-fns/startOfWeek";
import startOfYear from "date-fns/startOfYear";
import { ReactNode, useMemo } from "react";
import { useForm } from "react-hook-form";

import { createCtx } from "../../context/createContext";
import { formatMonth } from "../../shared/sharedTypes";
import { SalaryContextType } from "./salaryContextType";
import { useDaysWithDetails } from "./useDaysWithDetails";
import { useHolidays } from "./useHolidays";
import { useMonthsWithDetails } from "./useMonthsWithDetails";
import { useSelectedDays } from "./useSelectedDays";

const [useContextInner, Context] = createCtx<SalaryContextType>();

export const useSalaryContext = () => useContextInner();

type Props = {
	children: ReactNode;
};

export const SalaryContextProvider = ({ children }: Props) => {
	const form = useForm({
		defaultValues: {
			month: formatMonth(new Date()),
			hoursPerDay: 7.5,
			hourlyPay: 0,
			atWorkOnSaturdays: false,
			atWorkOnSundays: false,
		},
	});

	const month = form.watch("month");
	const hoursPerDay = form.watch("hoursPerDay");
	const hourlyPay = form.watch("hourlyPay");
	const atWorkOnSaturdays = form.watch("atWorkOnSaturdays");
	const atWorkOnSundays = form.watch("atWorkOnSundays");

	const selectedMonthAsDate = isValid(new Date(month)) ? new Date(month) : new Date();

	const selectedMonthFormatted = format(selectedMonthAsDate, "MMMM");
	const selectedYearFormatted = format(selectedMonthAsDate, "yyyy");

	const holidays = useHolidays({ selectedMonthAsDate });

	const { getDayWithDetails, getDaysWithDetailsOfMonth, daysWithDetails } = useDaysWithDetails({
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

	const selectedYearsWorkdays = useMemo(
		() => [...daysWithDetails].filter(([_, day]) => day.isInSelectedYear && day.isWorkday),
		[daysWithDetails]
	);

	const selectedMonthsWorkdays = useMemo(
		() => [...daysWithDetails].filter(([_, day]) => day.isInSelectedMonth && day.isWorkday),
		[daysWithDetails]
	);

	const selectedMonthsSalary = useMemo(
		() => selectedMonthsWorkdays.reduce((acc, [_, day]) => acc + day.salary, 0),
		[selectedMonthsWorkdays]
	);

	const selectedYearsSalary = useMemo(
		() => selectedYearsWorkdays.reduce((acc, [_, day]) => acc + day.salary, 0),
		[selectedYearsWorkdays]
	);

	const selectedYearsTotalWorkhours = useMemo(
		() => selectedYearsWorkdays.reduce((acc, [_, day]) => acc + day.workhours, 0),
		[selectedYearsWorkdays]
	);

	const highestWorkdaysMonth = useMemo(() => {
		const months = [...monthsWithDetails].map(([_, month]) => month);
		const highest = months.reduce((acc, month) => {
			if (!acc || month.workdays > acc?.workdays) {
				return month;
			}

			return acc;
		}, months[0]);
		return highest!;
	}, [monthsWithDetails]);

	const lowestWorkdaysMonth = useMemo(() => {
		const months = [...monthsWithDetails].map(([_, month]) => month);
		const lowest = months.reduce((acc, month) => {
			if (!acc || month.workdays < acc?.workdays) {
				return month;
			}

			return acc;
		}, months[0]);
		return lowest!;
	}, [monthsWithDetails]);

	const months = useMemo(
		() =>
			eachMonthOfInterval({
				start: startOfWeek(startOfYear(selectedMonthAsDate)),
				end: endOfWeek(endOfYear(selectedMonthAsDate)),
			}),
		[selectedMonthAsDate]
	);

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
				getMonthWithDetails,

				selectedYearsWorkdays,
				selectedMonthsWorkdays,

				selectedYearsSalary,
				selectedMonthsSalary,

				selectedYearsTotalWorkhours,
				highestWorkdaysMonth,
				lowestWorkdaysMonth,

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
