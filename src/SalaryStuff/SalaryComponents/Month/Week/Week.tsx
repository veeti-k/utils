import eachDayOfInterval from "date-fns/eachDayOfInterval";
import endOfWeek from "date-fns/endOfWeek";
import startOfWeek from "date-fns/startOfWeek";

import { Day } from "./Day/Day";
import { WeekNumber } from "./WeekNumber";

type Props = {
	week: Date;
	month: Date;
};

export const Week = ({ week, month }: Props) => {
	const days = eachDayOfInterval({
		start: startOfWeek(week, { weekStartsOn: 1 }),
		end: endOfWeek(week, { weekStartsOn: 1 }),
	});

	return (
		<>
			<WeekNumber week={week} days={days} />

			{days.map((day) => (
				<Day key={day.toISOString()} day={day} month={month} />
			))}
		</>
	);
};
