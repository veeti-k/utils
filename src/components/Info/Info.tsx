import format from "date-fns/format";

import { useContext } from "../../Context/contextStuff/provider";
import { formatCurrency, formatNumber } from "../../utils/formatNumber";

export const Info = () => {
	const {
		selectedYearFormatted,
		selectedMonthFormatted,
		selectedMonthsSalary,
		selectedYearsSalary,
		selectedYearsTotalWorkhours,
		highestWorkdaysMonth,
	} = useContext();

	return (
		<>
			<div className="flex flex-col gap-2">
				<div className="flex flex-col gap-1 rounded-md border-[1px] border-gray-700 bg-gray-800 p-2">
					<h2 className="font-bold">Salary in {selectedMonthFormatted}</h2>
					<span>{formatCurrency(selectedMonthsSalary)}</span>
				</div>

				<div className="flex flex-col gap-1 rounded-md border-[1px] border-gray-700 bg-gray-800 p-2">
					<h2 className="font-bold">Salary in {selectedYearFormatted}</h2>
					<span>{formatCurrency(selectedYearsSalary)}</span>
				</div>
			</div>

			<div className="flex flex-col gap-2">
				<div className="flex flex-col gap-1 rounded-md border-[1px] border-gray-700 bg-gray-800 p-2">
					<h2 className="font-bold">Total work hours in {selectedYearFormatted}</h2>
					<span>{formatNumber(selectedYearsTotalWorkhours)} h</span>
				</div>

				<div className="flex flex-col gap-1 rounded-md border-[1px] border-gray-700 bg-gray-800 p-2">
					<h2 className="font-bold">Highest numbers month</h2>
					<b>{format(highestWorkdaysMonth.date, "MMMM")}</b>

					<span>
						{highestWorkdaysMonth.workdays} workdays, {highestWorkdaysMonth.workhours} h
					</span>

					<span>
						<b>Salary:</b> {formatCurrency(highestWorkdaysMonth.salary)}
					</span>
				</div>
			</div>
		</>
	);
};
