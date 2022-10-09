import eachMonthOfInterval from "date-fns/eachMonthOfInterval";
import endOfYear from "date-fns/endOfYear";
import isSameMonth from "date-fns/isSameMonth";
import isSameYear from "date-fns/isSameYear";
import startOfYear from "date-fns/startOfYear";

import { Day, Month, formatMonth } from "../types";

type Props = {
  selectedMonth: Date;
  hourlyPay: number;
  daysWithDetails: Map<string, Day>;
};

export const getMonthsWithDetails = ({ daysWithDetails, hourlyPay, selectedMonth }: Props) => {
  const months = eachMonthOfInterval({
    start: startOfYear(selectedMonth),
    end: endOfYear(selectedMonth),
  });

  return new Map([
    ...(months.map((month) => {
      const monthsDaysWithDetails = [...daysWithDetails.values()].filter((day) =>
        isSameMonth(day.date, month)
      );

      const isMonthInSelectedYear = isSameYear(month, selectedMonth);
      const isMonthSelected = isSameMonth(month, selectedMonth);
      const workDaysInMonth = monthsDaysWithDetails.filter((day) => day.isWorkday);
      const workedHoursInMonth = monthsDaysWithDetails.reduce(
        (acc, day) => acc + day.workedHours,
        0
      );

      const salary = workedHoursInMonth * hourlyPay;
      const formatted = formatMonth(month);

      return [
        formatted,
        {
          date: month,
          formattedDate: formatted,
          isInSelectedYear: isMonthInSelectedYear,
          isSelected: isMonthSelected,
          workedHours: workedHoursInMonth,
          workDays: workDaysInMonth.length,
          salary,
        },
      ];
    }) as [string, Month][]),
  ]);
};
