import {
	eachDayOfInterval,
	eachMonthOfInterval,
	endOfMonth,
	endOfWeek,
	endOfYear,
	format,
	isSameMonth,
	isToday,
	startOfWeek,
	startOfYear,
} from "date-fns";
import type { NextPage } from "next";
import { useMemo } from "react";
import { useForm } from "react-hook-form";

import { Input } from "../components/Input";
import { Layout } from "../components/Layout";
import { Month, formatDay, formatMonth } from "../types";
import { classNames } from "../utils/classNames";
import { formatCurrency, formatNumber } from "../utils/formatNumber";
import { getDaysWithDetails } from "../utils/getDaysWithDetails";
import { getHolidays } from "../utils/getHolidays";
import { getMonthsWithDetails } from "../utils/getMonthsWithDetails";

const Home: NextPage = () => {
	const form = useForm({
		defaultValues: {
			month: format(new Date(), "yyyy-MM"),
			hoursPerDay: 7.5,
			hourlyPay: 0,
			atWorkOnSaturdays: false,
			atWorkOnSundays: false,
		},
	});

	const month = form.watch("month");
	const hoursPerDay = form.watch("hoursPerDay");
	const hourlyPay = form.watch("hourlyPay");
	const atWorkOnSundays = form.watch("atWorkOnSundays");
	const atWorkOnSaturdays = form.watch("atWorkOnSaturdays");

	const selectedMonthAsDate = useMemo(() => new Date(month), [month]);

	const holidays = useMemo(() => getHolidays(selectedMonthAsDate), [selectedMonthAsDate]);

	const daysWithDetails = useMemo(
		() =>
			getDaysWithDetails({
				selectedMonth: selectedMonthAsDate,
				hoursPerDay: hoursPerDay,
				atWorkOnSaturdays: atWorkOnSaturdays,
				atWorkOnSundays: atWorkOnSundays,
				holidays,
			}),
		[holidays, selectedMonthAsDate, hoursPerDay, atWorkOnSaturdays, atWorkOnSundays]
	);

	const monthsWithDetails = useMemo(
		() =>
			getMonthsWithDetails({
				selectedMonth: selectedMonthAsDate,
				daysWithDetails,
				hourlyPay,
			}),
		[selectedMonthAsDate, daysWithDetails, hourlyPay]
	);

	const selectedYearsWorkdays = useMemo(
		() => [...daysWithDetails].filter(([_, day]) => day.isInSelectedYear && day.isWorkday),
		[daysWithDetails]
	);

	const selectedMonthsWorkdays = useMemo(
		() => [...daysWithDetails].filter(([_, day]) => day.isInSelectedMonth && day.isWorkday),
		[daysWithDetails]
	);

	const salary =
		selectedMonthsWorkdays.length * form.watch("hoursPerDay") * form.watch("hourlyPay");
	const yearSalary =
		selectedYearsWorkdays.length * form.watch("hoursPerDay") * form.watch("hourlyPay");

	const months = useMemo(
		() =>
			eachMonthOfInterval({
				start: startOfYear(selectedMonthAsDate),
				end: endOfYear(selectedMonthAsDate),
			}),
		[selectedMonthAsDate]
	);

	const totalWorkHoursInSelectedYear = useMemo(
		() => [...monthsWithDetails.values()].reduce((acc, month) => acc + month.workedHours, 0),
		[monthsWithDetails]
	);

	const highestWorkdaysMonth = useMemo(
		() =>
			[...monthsWithDetails.values()].reduce(
				(acc, month) => (month.workDays > acc.workDays ? month : acc),
				{ workDays: 0 } as Month
			),
		[monthsWithDetails]
	);

	return (
		<Layout>
			<main className="relative mx-auto mt-[10rem] flex w-full max-w-[400px] flex-col gap-4 px-2 md:max-w-[800px] md:flex-row">
				<div className="flex h-max w-full max-w-[400px] flex-col gap-6 md:sticky md:top-2 md:max-w-[350px]">
					<div className="flex flex-col gap-4">
						<Input
							type="month"
							label="Month"
							min={0}
							step={"any"}
							autoComplete="off"
							{...form.register("month", { valueAsDate: true })}
						/>
					</div>

					<div className="flex flex-col gap-4">
						<Input
							type="number"
							label="Hourly pay"
							min={0}
							step={"any"}
							autoComplete="off"
							{...form.register("hourlyPay", { valueAsNumber: true })}
						/>

						<Input
							type="number"
							label="Hours / day"
							min={0}
							step={"any"}
							autoComplete="off"
							{...form.register("hoursPerDay", { valueAsNumber: true })}
						/>

						<label className="flex flex-col items-start gap-2">
							Working on Saturdays
							<input
								type="checkbox"
								{...form.register("atWorkOnSaturdays")}
								className="h-[20px] w-[20px]"
							/>
						</label>

						<label className="flex flex-col items-start gap-2">
							Working on Sundays
							<input
								type="checkbox"
								{...form.register("atWorkOnSundays")}
								className="h-[20px] w-[20px]"
							/>
						</label>
					</div>

					<div className="border-[1px] border-gray-700"></div>

					<div className="flex flex-col gap-2">
						<div className="flex flex-col gap-1 rounded-md border-[1px] border-gray-700 bg-gray-800 p-2">
							<h2 className="font-bold">
								Salary in {format(selectedMonthAsDate, "MMMM")}
							</h2>
							<span>{formatCurrency(salary)}</span>
						</div>

						<div className="flex flex-col gap-1 rounded-md border-[1px] border-gray-700 bg-gray-800 p-2">
							<h2 className="font-bold">
								Salary in {format(selectedMonthAsDate, "yyyy")}
							</h2>
							<span>{formatCurrency(yearSalary)}</span>
						</div>
					</div>

					<div className="flex flex-col gap-2">
						<div className="flex flex-col gap-1 rounded-md border-[1px] border-gray-700 bg-gray-800 p-2">
							<h2 className="font-bold">
								Total work hours in {format(selectedMonthAsDate, "yyyy")}
							</h2>
							<span>{formatNumber(totalWorkHoursInSelectedYear)} h</span>
						</div>

						<div className="flex flex-col gap-1 rounded-md border-[1px] border-gray-700 bg-gray-800 p-2">
							<h2 className="font-bold">Highest numbers month</h2>
							<b>{format(highestWorkdaysMonth.date, "MMMM")}</b>

							<span>
								{highestWorkdaysMonth.workDays} workdays,{" "}
								{highestWorkdaysMonth.workedHours} h
							</span>

							<span>
								<b>Salary:</b> {formatCurrency(highestWorkdaysMonth.salary)}
							</span>
						</div>
					</div>
				</div>

				<div className="border-[1px] border-gray-700"></div>

				<div className="flex w-full max-w-[400px] flex-col gap-2 md:max-w-[unset]">
					<div className="flex flex-col gap-2">
						{months.map((month) => {
							const start = month;
							const end = endOfMonth(month);

							const days = eachDayOfInterval({
								start: startOfWeek(start, { weekStartsOn: 1 }),
								end: endOfWeek(end, { weekStartsOn: 1 }),
							});

							const monthWithDetails = monthsWithDetails.get(formatMonth(month))!;

							return (
								<div
									key={monthWithDetails.formattedDate}
									className="flex flex-col gap-2 rounded-md border-[1px] border-gray-700 bg-gray-800 p-2"
								>
									<div className="flex flex-col gap-2">
										<h2 className="text-lg font-bold">
											{format(month, "MMMM yyyy")}
										</h2>

										<div className="flex flex-col">
											<span>
												<b>Salary:</b>{" "}
												{formatCurrency(monthWithDetails.salary)}
											</span>

											<span>
												{formatNumber(monthWithDetails.workDays)} workdays,{" "}
												{formatNumber(monthWithDetails.workedHours)} h
											</span>
										</div>
									</div>

									<div className="flex flex-col gap-2">
										<div className="grid grid-cols-7 gap-1 rounded-md border-[1px] border-gray-700 bg-gray-700 py-2">
											{[...Array(7)].map((_, index) => (
												<span key={index} className="text-center">
													{format(days[index]!, "EEEEE")}
												</span>
											))}
										</div>

										<div className="grid grid-cols-7 gap-1">
											{days.map((day) => {
												const dayWithDetails = daysWithDetails.get(
													formatDay(day)
												)!;
												const isDimmed = !isSameMonth(day, month);

												return (
													<div
														key={dayWithDetails.formattedDate}
														className={classNames(
															"flex items-center rounded-md border-[1px] border-gray-600 bg-gray-700 p-1",
															isToday(day) &&
																"rounded-md border-2 border-blue-500"
														)}
													>
														<div
															className={classNames(
																"flex w-full flex-col gap-2",
																isDimmed && "opacity-20"
															)}
														>
															<time
																dateTime={
																	dayWithDetails.formattedDate
																}
																className={classNames(
																	dayWithDetails?.isWeekend &&
																		"text-red-500",
																	"w-max rounded-md border-[1px] border-gray-500 bg-gray-600 px-1 text-sm sm:text-base"
																)}
															>
																{format(day, "dd")}
															</time>
															<span className="text-center text-sm">
																{dayWithDetails?.workedHours}h
															</span>
														</div>
													</div>
												);
											})}
										</div>
									</div>
								</div>
							);
						})}
					</div>
				</div>
			</main>
		</Layout>
	);
};

export default Home;
