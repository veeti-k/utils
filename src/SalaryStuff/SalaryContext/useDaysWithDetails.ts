import { useCallback, useMemo } from "react";

import { getDaysWithDetails } from "~SalaryStuff/salaryUtils/getDaysWithDetails";
import type { Holiday } from "~shared/sharedTypes";

type Props = {
	selectedMonth: Date;
	holidays: Holiday[];
	atWorkOnSaturdays: boolean;
	atWorkOnSundays: boolean;
	hoursPerDay: number;
	hourlyPay: number;
};

export const useDaysWithDetails = ({
	atWorkOnSaturdays,
	atWorkOnSundays,
	holidays,
	hoursPerDay,
	selectedMonth,
	hourlyPay,
}: Props) => {
	const daysWithDetails = useMemo(
		() =>
			getDaysWithDetails({
				atWorkOnSaturdays,
				atWorkOnSundays,
				holidays,
				hoursPerDay,
				selectedMonth,
				hourlyPay,
			}),
		[holidays, selectedMonth, hoursPerDay, atWorkOnSaturdays, atWorkOnSundays, hourlyPay]
	);

	const getDayWithDetails = useCallback(
		(formattedDay: string) => daysWithDetails.get(formattedDay),
		[daysWithDetails]
	);

	const getDaysWithDetailsOfMonth = useCallback(
		(formattedMonth: string) => {
			return [...daysWithDetails.values()].filter((dayWithDetails) =>
				dayWithDetails.formattedDate.startsWith(formattedMonth)
			);
		},
		[daysWithDetails]
	);

	const getDaysWithDetailsOfWeek = useCallback(
		(week: number) => {
			return [...daysWithDetails.values()].filter(
				(dayWithDetails) => dayWithDetails.week === week
			);
		},
		[daysWithDetails]
	);

	return {
		daysWithDetails,
		getDaysWithDetailsOfMonth,
		getDaysWithDetailsOfWeek,
		getDayWithDetails,
	};
};
