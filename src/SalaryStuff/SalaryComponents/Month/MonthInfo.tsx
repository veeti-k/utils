import format from "date-fns/format";

import { useSalaryContext } from "~SalaryStuff/SalaryContext/SalaryContextProvider";
import type { MonthWithDetails } from "~shared/sharedTypes";
import { classNames } from "~shared/sharedUtils/classNames";
import { formatCurrency, formatNumber } from "~shared/sharedUtils/formatNumber";

type Props = {
	monthWithDetails: MonthWithDetails;
};

export const MonthInfo = ({ monthWithDetails }: Props) => {
	const { highestWorkdaysMonth, lowestWorkdaysMonth } = useSalaryContext();

	const isHighestMonth = highestWorkdaysMonth.formattedDate === monthWithDetails.formattedDate;
	const isLowestMonth = lowestWorkdaysMonth.formattedDate === monthWithDetails.formattedDate;

	return (
		<div className="flex flex-col gap-2">
			<h2
				className={classNames(
					"w-max text-lg font-bold",
					isHighestMonth && "text-green-500",
					isLowestMonth && "text-yellow-500"
				)}
			>
				{format(monthWithDetails.date, "MMMM yyyy")}
			</h2>

			<div className="flex flex-col">
				<span>
					{formatNumber(monthWithDetails.workdays)} workdays,{" "}
					{formatNumber(monthWithDetails.workhours)} h
				</span>

				<span>{formatCurrency(monthWithDetails.salary)}</span>
			</div>
		</div>
	);
};
