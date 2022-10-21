import type { NextPage } from "next";
import { useForm } from "react-hook-form";

import { Input } from "~shared/SharedComponents/Input";
import { Layout } from "~shared/SharedComponents/Layout";
import { formatCurrency } from "~shared/sharedUtils/formatNumber";

const Home: NextPage = () => {
	const form = useForm({
		defaultValues: {
			fuelPrice: 2,
			fuelConsumption: 6,
			distance: 135,
			payers: 1,
		},
	});

	const distance = form.watch("distance");
	const fuelPrice = form.watch("fuelPrice");
	const fuelConsumption = form.watch("fuelConsumption");
	const payers = form.watch("payers");

	const cost = (fuelPrice * fuelConsumption * distance) / 100;
	const costDividedAmongPayers = formatCurrency(cost / payers);
	const costPerKm = formatCurrency(cost / distance);

	const moreThanOnePayer = payers > 1;

	return (
		<Layout title="Calculators | Fuel">
			<main className="mx-auto w-full max-w-[400px] pt-[10vh] ">
				<h1 className="pb-4 text-4xl font-medium">Fuel cost calculator</h1>

				<div className="flex flex-col gap-4">
					<div className="flex w-full flex-col gap-6 rounded-md border-[1px] border-primary-700 bg-primary-800 p-3">
						<Input
							label="(L/100 km) Average fuel consumption"
							type="number"
							step={"any"}
							{...form.register("fuelConsumption", { valueAsNumber: true })}
						/>

						<Input
							label="(€/L) Cost of fuel"
							type="number"
							step={"any"}
							{...form.register("fuelPrice", { valueAsNumber: true })}
						/>

						<Input
							label="(km) Distance"
							type="number"
							step={"any"}
							{...form.register("distance", { valueAsNumber: true })}
						/>

						<Input
							label="Payers"
							type="number"
							min={1}
							{...form.register("payers", { valueAsNumber: true })}
						/>
					</div>

					<div className="rounded-md border-[1px] border-primary-700 bg-primary-800 p-3">
						<h2 className="pb-2 text-2xl font-medium">Results</h2>

						<div className="flex flex-col gap-1 text-lg">
							<div className="flex justify-between">
								<span>Cost</span>
								<span>{formatCurrency(cost)}</span>
							</div>

							{moreThanOnePayer && (
								<div className="flex justify-between">
									<span>Divided cost</span>
									<span>{costDividedAmongPayers}</span>
								</div>
							)}

							<div className="flex justify-between">
								<span>Cost per km</span>
								<span>{costPerKm}</span>
							</div>
						</div>
					</div>
				</div>
			</main>
		</Layout>
	);
};

export default Home;
