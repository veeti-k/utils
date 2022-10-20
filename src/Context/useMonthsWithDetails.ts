import { useCallback, useMemo } from "react";

import { DaysWithDetails } from "../types";
import { getMonthsWithDetails } from "../utils/getMonthsWithDetails";

type Props = {
	selectedMonth: Date;
	hourlyPay: number;
	daysWithDetails: DaysWithDetails;
};

export const useMonthsWithDetails = ({ daysWithDetails, hourlyPay, selectedMonth }: Props) => {
	const monthsWithDetails = useMemo(
		() =>
			getMonthsWithDetails({
				selectedMonth,
				daysWithDetails,
				hourlyPay,
			}),
		[selectedMonth, daysWithDetails, hourlyPay]
	);

	const getMonthWithDetails = useCallback(
		(formattedMonth: string) => monthsWithDetails.get(formattedMonth),
		[monthsWithDetails]
	);

	return { getMonthWithDetails, monthsWithDetails };
};
