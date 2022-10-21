import { useMemo } from "react";

import { getHolidays } from "~shared/sharedUtils/getHolidays";

type Props = {
	selectedMonthAsDate: Date;
};

export const useHolidays = ({ selectedMonthAsDate }: Props) => {
	const holidays = useMemo(() => getHolidays(selectedMonthAsDate), [selectedMonthAsDate]);

	return holidays;
};
