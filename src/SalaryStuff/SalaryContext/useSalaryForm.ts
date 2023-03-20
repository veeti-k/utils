import { useForm } from "react-hook-form";

import { formatMonth } from "~shared/sharedTypes";

export const useSalaryForm = () => {
	return useForm({
		defaultValues: {
			month: formatMonth(new Date()),
			hoursPerDay: 7.5,
			hourlyPay: 0,
			atWorkOnSaturdays: false,
			atWorkOnSundays: false,
			atWorkOnMidweekHolidays: false,
		},
	});
};

export type SalaryFromType = ReturnType<typeof useSalaryForm>;
