import format from "date-fns/format";

import { MonthWithDetails } from "~shared/sharedTypes";
import { formatCurrency, formatNumber } from "~shared/sharedUtils/formatNumber";

type Props = {
	monthWithDetails: MonthWithDetails;
};

export const MonthInfo = ({ monthWithDetails }: Props) => {
	return (
		<div className="flex flex-col gap-2">
			<h2 className="text-lg font-bold">{format(monthWithDetails.date, "MMMM yyyy")}</h2>

			<div className="flex flex-col">
				<span>
					<b>Salary:</b> {formatCurrency(monthWithDetails.salary)}
				</span>

				<span>
					{formatNumber(monthWithDetails.workdays)} workdays,{" "}
					{formatNumber(monthWithDetails.workhours)} h
				</span>
			</div>
		</div>
	);
};
