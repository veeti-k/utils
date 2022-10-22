import { useSalaryContext } from "~SalaryStuff/SalaryContext/SalaryContextProvider";
import { Input } from "~shared/SharedComponents/Input";

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
	);
};
