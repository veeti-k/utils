import { getMonthsWithDetails } from "~SalaryStuff/salaryUtils/getMonthsWithDetails";
import type { DaysWithDetails } from "~shared/sharedTypes";

type Props = {
	selectedMonth: Date;
	hourlyPay: number;
	daysWithDetails: DaysWithDetails;
};

export const useMonthsWithDetails = ({ daysWithDetails, hourlyPay, selectedMonth }: Props) => {
	const monthsWithDetails = getMonthsWithDetails({
		selectedMonth,
		daysWithDetails,
		hourlyPay,
	});

	const getMonthWithDetails = (formattedMonth: string) => monthsWithDetails.get(formattedMonth);

	return { getMonthWithDetails, monthsWithDetails };
};
