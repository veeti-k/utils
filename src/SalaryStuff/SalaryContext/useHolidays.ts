import { getHolidays } from "~shared/sharedUtils/getHolidays";

type Props = {
	selectedMonthAsDate: Date;
};

export const useHolidays = ({ selectedMonthAsDate }: Props) => getHolidays(selectedMonthAsDate);
