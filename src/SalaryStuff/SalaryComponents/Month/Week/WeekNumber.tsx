import getWeek from "date-fns/getWeek";

import { useSalaryContext } from "~SalaryStuff/SalaryContext/SalaryContextProvider";

type Props = {
	week: Date;
	days: Date[];
};

export const WeekNumber = ({ week, days }: Props) => {
	const { toggleDaysWithDetailsSelected, setDaysWithDetailsSelected, getDaysWithDetailsOfWeek } =
		useSalaryContext();

	const weekNumber = getWeek(week, {
		weekStartsOn: 1,
		firstWeekContainsDate: 4,
	});

	const daysWithDetailsOfWeek = getDaysWithDetailsOfWeek(weekNumber);

	return (
		<div
			className="flex items-center justify-center rounded-md border-[1px] border-primary-700 bg-primary-800"
			onClick={(e) =>
				toggleDaysWithDetailsSelected(
					e.altKey
						? daysWithDetailsOfWeek.filter((day) => day.isWorkday)
						: daysWithDetailsOfWeek
				)
			}
			onMouseOverCapture={(e) => {
				if (e.shiftKey) {
					setDaysWithDetailsSelected(
						e.altKey
							? daysWithDetailsOfWeek.filter((d) => d.isWorkday)
							: daysWithDetailsOfWeek,
						true
					);
				} else if (e.ctrlKey) {
					setDaysWithDetailsSelected(
						e.altKey
							? daysWithDetailsOfWeek.filter((d) => d.isWorkday)
							: daysWithDetailsOfWeek,
						false
					);
				}
			}}
		>
			<div className="rounded-md px-1">{weekNumber}</div>
		</div>
	);
};
