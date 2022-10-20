import eachWeekOfInterval from "date-fns/eachWeekOfInterval";
import endOfMonth from "date-fns/endOfMonth";
import startOfMonth from "date-fns/startOfMonth";

import { useContext } from "../../Context/contextStuff/provider";
import { formatMonth } from "../../types";
import { MonthInfo } from "./MonthInfo";
import { Week } from "./Week/Week";
import { Weekdays } from "./Weekdays";

type Props = {
	month: Date;
};

export const Month = ({ month }: Props) => {
	const { getMonthWithDetails } = useContext();

	const monthWithDetails = getMonthWithDetails(formatMonth(month));
	if (!monthWithDetails) return null;

	const weeks = eachWeekOfInterval(
		{
			start: startOfMonth(month),
			end: endOfMonth(month),
		},
		{ weekStartsOn: 1 }
	);

	return (
		<div
			key={monthWithDetails.formattedDate}
			className="flex select-none flex-col gap-2 rounded-md border-[1px] border-gray-700 bg-gray-800 p-2"
		>
			<MonthInfo monthWithDetails={monthWithDetails} />

			<div className="flex flex-col gap-1">
				<Weekdays monthWithDetails={monthWithDetails} />

				<div className="grid grid-cols-8 gap-1 rounded-md">
					{weeks.map((week) => (
						<Week key={week.toISOString()} week={week} month={month} />
					))}
				</div>
			</div>
		</div>
	);
};
