import type { NextPage } from "next";

import { Form } from "~SalaryStuff/SalaryComponents/Form/Form";
import { Info } from "~SalaryStuff/SalaryComponents/Info/Info";
import { Month } from "~SalaryStuff/SalaryComponents/Month/Month";
import {
	SalaryContextProvider,
	useSalaryContext,
} from "~SalaryStuff/SalaryContext/SalaryContextProvider";
import { Layout } from "~shared/SharedComponents/Layout";

const SalaryPage: NextPage = () => {
	const { months } = useSalaryContext();

	return (
		<Layout title="Salary | Calculators">
			<main className="relative mx-auto mt-[10rem] mb-4 flex w-full max-w-[1200px] flex-col justify-center gap-4 px-2 bp-1:flex-row">
				<div className="mx-auto flex h-max w-full max-w-[400px] flex-col gap-6 md:sticky md:top-2">
					<Form />

					<Info />
				</div>

				<div className="mx-auto grid w-full max-w-[400px] grid-cols-1 gap-2 bp-1:max-w-[unset] bp-2:grid-cols-2">
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
