import eachDayOfInterval from "date-fns/eachDayOfInterval";
import endOfWeek from "date-fns/endOfWeek";
import endOfYear from "date-fns/endOfYear";
import isSameDay from "date-fns/isSameDay";
import isSameMonth from "date-fns/isSameMonth";
import isSameYear from "date-fns/isSameYear";
import isSaturday from "date-fns/isSaturday";
import isSunday from "date-fns/isSunday";
import isToday from "date-fns/isToday";
import isWeekend from "date-fns/isWeekend";
import startOfWeek from "date-fns/startOfWeek";
import startOfYear from "date-fns/startOfYear";

import { DayWithDetails, Holiday, formatDay } from "~shared/sharedTypes";
import { formatNumber } from "~shared/sharedUtils/formatNumber";

type Props = {
	selectedMonth: Date;
	holidays: Holiday[];
	atWorkOnSaturdays: boolean;
	atWorkOnSundays: boolean;
	hoursPerDay: number;
	hourlyPay: number;
};

export const getDaysWithDetails = ({
	atWorkOnSaturdays,
	atWorkOnSundays,
	holidays,
	hoursPerDay,
	selectedMonth,
	hourlyPay,
}: Props) => {
	const days = eachDayOfInterval({
		start: startOfWeek(startOfYear(selectedMonth), { weekStartsOn: 1 }),
		end: endOfWeek(endOfYear(selectedMonth), { weekStartsOn: 1 }),
	});

	return new Map([
		...(days.map((day) => {
			const holiday = holidays.find((holiday) => isSameDay(holiday.date, day));

			const isDayToday = isToday(day);
			const isDayWeekend = isWeekend(day);
			const isDayInSelectedYear = isSameYear(day, selectedMonth);
			const isDayInSelectedMonth = isSameMonth(day, selectedMonth);
			const isDayHoliday = !!holiday;

			const isDaySaturday = isDayWeekend && isSaturday(day);
			const isDaySunday = isDayWeekend && isSunday(day);

			const workhours = !isDayInSelectedYear
				? 0
				: isDaySaturday && !atWorkOnSaturdays
				? 0
				: isDaySunday && !atWorkOnSundays
				? 0
				: hoursPerDay;

			const formattedWorkhours = formatNumber(workhours);

			const isWorkday = !!workhours;

			const formatted = formatDay(day);

			const salary = workhours * hourlyPay;

			return [
				formatted,
				{
					date: day,
					formattedDate: formatted,
					workhours,
					formattedWorkhours,
					salary,
					isWorkday,
					isToday: isDayToday,
					isWeekend: isDayWeekend,
					isHoliday: isDayHoliday,
					holidayName: holiday?.name,
					isInSelectedYear: isDayInSelectedYear,
					isInSelectedMonth: isDayInSelectedMonth,
				},
			];
		}) as [string, DayWithDetails][]),
	]);
};
