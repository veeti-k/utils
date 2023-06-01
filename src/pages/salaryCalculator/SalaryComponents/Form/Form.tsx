import { Input } from "../../../../Ui/Input";
import { useSalaryContext } from "../../SalaryContext/SalaryContextProvider";
import { Cuts } from "./Cuts";

export const Form = () => {
	const { form } = useSalaryContext();

	return (
		<div className="flex flex-col gap-4 rounded-md border-[1px] border-primary-700 bg-primary-800 p-3">
			<Input
				type="month"
				label="Month"
				min={0}
				step={"any"}
				autoComplete="off"
				{...form.register("month", { valueAsDate: true })}
			/>

			<div className="flex gap-2">
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
			</div>

			<Cuts />

			<div className="flex flex-col gap-2">
				<h2>Working on</h2>

				<label className="flex items-start gap-2">
					<input
						type="checkbox"
						{...form.register("atWorkOnSaturdays")}
						className="h-[20px] w-[20px]"
					/>
					Saturdays
				</label>

				<label className="flex items-start gap-2">
					<input
						type="checkbox"
						{...form.register("atWorkOnSundays")}
						className="h-[20px] w-[20px]"
					/>
					Sundays
				</label>

				<label className="flex items-start gap-2">
					<input
						type="checkbox"
						{...form.register("atWorkOnMidweekHolidays")}
						className="h-[20px] w-[20px]"
					/>
					Midweek holidays
				</label>
			</div>
		</div>
	);
};
