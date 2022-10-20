import { useMemo } from "react";

import { getHolidays } from "../utils/getHolidays";

type Props = {
	selectedMonthAsDate: Date;
};

export const useHolidays = ({ selectedMonthAsDate }: Props) => {
	const holidays = useMemo(() => getHolidays(selectedMonthAsDate), [selectedMonthAsDate]);

	return holidays;
};
