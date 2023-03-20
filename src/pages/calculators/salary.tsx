import type { NextPage } from "next";

import { Form } from "~SalaryStuff/SalaryComponents/Form/Form";
import { Month } from "~SalaryStuff/SalaryComponents/Month/Month";
import { Results } from "~SalaryStuff/SalaryComponents/Results/Results";
import { SelectedDays } from "~SalaryStuff/SalaryComponents/SelectedDays/SelectedDays";
import {
	SalaryContextProvider,
	useSalaryContext,
} from "~SalaryStuff/SalaryContext/SalaryContextProvider";
import { Layout } from "~shared/SharedComponents/Layout";
import { Title } from "~shared/SharedComponents/Title";

const SalaryPage: NextPage = () => {
	const { months } = useSalaryContext();

	return (
		<Layout title="Salary | Calculators">
			<main className="mx-auto flex w-full max-w-[1300px] flex-col justify-center gap-3 p-3 pt-[5vh] bp-1:flex-row">
				<div className="mx-auto flex h-max w-full max-w-[400px] flex-col gap-3 overflow-auto md:sticky md:top-3">
					<Title>Salary calculator</Title>

					<div className="flex flex-col gap-3">
						<Form />

						<Results />

						<SelectedDays />
					</div>
				</div>

				<div className="mx-auto w-full max-w-[400px] border-[1px] border-primary-700 sm:w-[1px]"></div>

				<div className="mx-auto grid w-full max-w-[400px] grid-cols-1 gap-3 bp-1:max-w-[unset] bp-2:grid-cols-2">
					{months.map((month) => (
						<Month key={month.toISOString()} month={month} />
					))}
				</div>
			</main>
		</Layout>
	);
};

const SalaryPageWrapper = () => {
	return (
		<SalaryContextProvider>
			<SalaryPage />
		</SalaryContextProvider>
	);
};

export default SalaryPageWrapper;
