import getWeek from "date-fns/getWeek";

import { useContext } from "../../../Context/contextStuff/provider";
import { formatDay } from "../../../types";

type Props = {
	week: Date;
	days: Date[];
};

export const WeekNumber = ({ week, days }: Props) => {
	const { toggleDaysSelected } = useContext();

	const weekNumber = getWeek(week, {
		weekStartsOn: 1,
		firstWeekContainsDate: 4,
	});

	return (
		<div
			className="flex items-center justify-center rounded-md border-[1px] border-gray-700 bg-gray-800"
			onClick={() => toggleDaysSelected(days.map((d) => formatDay(d)))}
		>
			<div className="rounded-md px-1">{weekNumber}</div>
		</div>
	);
};
