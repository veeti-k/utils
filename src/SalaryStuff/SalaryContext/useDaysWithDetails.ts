import { useCallback, useMemo } from "react";

import { getDaysWithDetails } from "~SalaryStuff/salaryUtils/getDaysWithDetails";
import { DayWithDetails, Holiday } from "~shared/sharedTypes";

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
			const daysWithDetailsOfMonth: DayWithDetails[] = [];

			for (const [formattedDay, dayWithDetails] of daysWithDetails) {
				if (formattedDay.startsWith(formattedMonth)) {
					daysWithDetailsOfMonth.push(dayWithDetails);
				}
			}

			return daysWithDetailsOfMonth;
		},
		[daysWithDetails]
	);

	return { daysWithDetails, getDaysWithDetailsOfMonth, getDayWithDetails };
};
