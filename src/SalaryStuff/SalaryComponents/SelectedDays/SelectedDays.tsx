import { useSalaryContext } from "~SalaryStuff/SalaryContext/SalaryContextProvider";
import { formatCurrency } from "~shared/sharedUtils/formatNumber";

export function SelectedDays() {
	const { selectedDays, daysWithDetails } = useSalaryContext();

	const selectedDaysArr = [...selectedDays.values()];

	const totalSelectedDaysSalary = selectedDaysArr.reduce((acc, day) => acc + day.salary, 0);
	const salaryExcludingSelectedDays = [...daysWithDetails.values()].reduce(
		(acc, dayWithDetails) => {
			if (selectedDays.has(dayWithDetails.formattedDate)) {
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
