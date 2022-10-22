import { useCallback, useState } from "react";

import { DayWithDetails, DaysWithDetails } from "~shared/sharedTypes";

type Props = {
	daysWithDetails: DaysWithDetails;
};

export const useSelectedDays = ({ daysWithDetails }: Props) => {
	const [selectedDays, setSelectedDays] = useState<Map<string, DayWithDetails>>(new Map());

	const toggleDaysSelected = useCallback(
		(formattedDays: string[]) => {
			setSelectedDays((prev) => {
				const newSelectedDays = new Map(prev);

				const everyDayIsSelected = formattedDays.every((formattedDay) =>
					newSelectedDays.has(formattedDay)
				);

				formattedDays.forEach((formattedDay) => {
					if (everyDayIsSelected) {
						newSelectedDays.delete(formattedDay);
					} else {
						const dayWithDetails = daysWithDetails.get(formattedDay);

						if (!dayWithDetails) return;

						newSelectedDays.set(formattedDay, dayWithDetails);
					}
				});

				return newSelectedDays;
			});
		},
		[daysWithDetails]
	);

	const toggleDaysWithDetailsSelected = useCallback(
		(daysWithDetails: DayWithDetails[]) => {
			setSelectedDays((prev) => {
				const newSelectedDays = new Map(prev);

				const everyDayIsSelected = daysWithDetails.every((dayWithDetails) =>
					newSelectedDays.has(dayWithDetails.formattedDate)
				);

				daysWithDetails.forEach((dayWithDetails) => {
					if (everyDayIsSelected) {
						newSelectedDays.delete(dayWithDetails.formattedDate);
					} else {
						newSelectedDays.set(dayWithDetails.formattedDate, dayWithDetails);
					}
				});

				return newSelectedDays;
			});
		},
		[daysWithDetails]
	);

	const isDaySelected = useCallback(
		(formattedDay: string) => {
			return !!selectedDays.get(formattedDay);
		},
		[selectedDays]
	);

	const setDaysSelected = useCallback((formattedDays: string[], value: boolean) => {
		setSelectedDays((prev) => {
			const newSelectedDays = new Map(prev);

			formattedDays.forEach((formattedDay) => {
				if (value) {
					const dayWithDetails = daysWithDetails.get(formattedDay);

					if (!dayWithDetails) return;

					newSelectedDays.set(formattedDay, dayWithDetails);
				} else {
					newSelectedDays.delete(formattedDay);
				}
			});

			return newSelectedDays;
		});
	}, []);

	const setDaysWithDetailsSelected = useCallback((days: DayWithDetails[], value: boolean) => {
		setSelectedDays((prev) => {
			const newSelectedDays = new Map(prev);

			days.forEach((day) => {
				if (value) {
					newSelectedDays.set(day.formattedDate, day);
				} else {
					newSelectedDays.delete(day.formattedDate);
				}
			});

			return newSelectedDays;
		});
	}, []);

	return {
		selectedDays,
		toggleDaysSelected,
		toggleDaysWithDetailsSelected,
		setDaysSelected,
		setDaysWithDetailsSelected,
		isDaySelected,
	};
};
