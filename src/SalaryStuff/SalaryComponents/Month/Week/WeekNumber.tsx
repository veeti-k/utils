import getWeek from "date-fns/getWeek";

import { useSalaryContext } from "~SalaryStuff/SalaryContext/SalaryContextProvider";
import { formatDay } from "~shared/sharedTypes";

type Props = {
	week: Date;
	days: Date[];
};

export const WeekNumber = ({ week, days }: Props) => {
	const { toggleDaysSelected, setDaysSelected } = useSalaryContext();

	const weekNumber = getWeek(week, {
		weekStartsOn: 1,
		firstWeekContainsDate: 4,
	});

	return (
		<div
			className="border-primary-700 bg-primary-800 flex items-center justify-center rounded-md border-[1px]"
			onClick={() => toggleDaysSelected(days.map((d) => formatDay(d)))}
			onMouseOverCapture={(e) => {
				if (e.shiftKey) {
					setDaysSelected(
						days.map((d) => formatDay(d)),
						true
					);
				} else if (e.ctrlKey) {
					setDaysSelected(
						days.map((d) => formatDay(d)),
						false
					);
				}
			}}
		>
			<div className="rounded-md px-1">{weekNumber}</div>
		</div>
	);
};
