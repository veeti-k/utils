import { formatCurrency } from "../../../../utils/formatNumber";
import { useSalaryContext } from "../../SalaryContext/SalaryContextProvider";
import { useSelectedDaysContext } from "../../SelectedDays/SelectedDaysContext";
import { DayWithDetails } from "../../salaryTypes";

export function SelectedDays() {
	const { daysWithDetails, inputs } = useSalaryContext();

	const { selectedDays, isSelectedDay } = useSelectedDaysContext();

	const selectedDaysWithDetails = selectedDays
		.map((day) => daysWithDetails.get(day))
		.filter(Boolean) as DayWithDetails[];

	const totalSelectedDaysSalary =
		selectedDaysWithDetails.reduce((acc, cur) => acc + cur.workhours, 0) * inputs.hourlyPay;

	const salaryExcludingSelectedDays = [...daysWithDetails.values()].reduce(
		(acc, dayWithDetails) => {
			if (isSelectedDay(dayWithDetails.formattedDate)) {
				return acc;
			}

			return acc + dayWithDetails.salary;
		},
		0
	);

	return (
		<div className="rounded-md border-[1px] border-primary-700 bg-primary-800 p-3">
			<h2 className="pb-2 text-2xl font-medium">Selected days</h2>

			<div className="flex flex-col gap-2 text-lg">
				<div className="flex justify-between">
					<h2>Selected days salary</h2>
					<span>{formatCurrency(totalSelectedDaysSalary)}</span>
				</div>

				<div className="flex justify-between">
					<h2>Salary excl. selected days</h2>
					<span>{formatCurrency(salaryExcludingSelectedDays)}</span>
				</div>
			</div>
		</div>
	);
}
