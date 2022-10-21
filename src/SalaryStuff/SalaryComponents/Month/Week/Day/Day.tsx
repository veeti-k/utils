import format from "date-fns/format";
import isSameMonth from "date-fns/isSameMonth";
import isToday from "date-fns/isToday";

import { useSalaryContext } from "~SalaryStuff/SalaryContext/SalaryContextProvider";
import { formatDay } from "~shared/sharedTypes";
import { classNames } from "~shared/sharedUtils/classNames";

type Props = {
	day: Date;
	month: Date;
};

export const Day = ({ day, month }: Props) => {
	const {
		getDayWithDetails,
		isDaySelected,
		setDaysWithDetailsSelected,
		toggleDaysWithDetailsSelected,
	} = useSalaryContext();

	const dayWithDetails = getDayWithDetails(formatDay(day));
	if (!dayWithDetails) return null;

	const isDimmed = !isSameMonth(day, month);
	const isSelected = isDaySelected(dayWithDetails.formattedDate);

	return (
		<div
			key={dayWithDetails.formattedDate}
			className={classNames(
				"flex items-center rounded-md border-[1px] border-gray-600 bg-gray-700 p-1 outline-none transition-all duration-150",
				isToday(day) && "rounded-md border-2 border-blue-500",
				isDimmed && "opacity-30",
				isSelected &&
					"border-transparent bg-transparent outline-none outline-1 outline-offset-0 outline-blue-500"
			)}
			onClick={() => toggleDaysWithDetailsSelected([dayWithDetails])}
			onMouseOverCapture={(e) => {
				if (e.shiftKey) {
					setDaysWithDetailsSelected([dayWithDetails], true);
				} else if (e.ctrlKey) {
					setDaysWithDetailsSelected([dayWithDetails], false);
				}
			}}
		>
			<div className="flex w-full flex-col gap-2">
				<time
					dateTime={dayWithDetails.formattedDate}
					className={classNames(
						dayWithDetails?.isWeekend && "text-red-500",
						"w-max rounded-md border-[1px] border-gray-500 bg-gray-600 px-1 text-sm sm:text-base"
					)}
				>
					{format(day, "dd")}
				</time>
				<span className="text-center text-sm">{dayWithDetails.workhours}h</span>
			</div>
		</div>
	);
};
