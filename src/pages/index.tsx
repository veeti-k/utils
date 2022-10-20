import type { NextPage } from "next";
import dynamic from "next/dynamic";

import { useContext } from "../Context/contextStuff/provider";
import { Form } from "../components/Form/Form";
import { Info } from "../components/Info/Info";
import { Layout } from "../components/Layout";
import { Month } from "../components/Month/Month";

const Home: NextPage = () => {
	const { months } = useContext();

	return (
		<Layout>
			<main className="relative mx-auto mt-[10rem] mb-4 flex w-full max-w-[1200px] flex-col justify-center gap-4 px-2 md:flex-row">
				<div className="mx-auto flex h-max w-full max-w-[400px] flex-col gap-6 sm:mx-[unset] md:sticky md:top-2 md:max-w-[350px]">
					<Form />

					<Info />
				</div>

				<div className="mx-auto grid w-full grid-cols-1 gap-2 sm:mx-[unset] lg:grid-cols-2">
					{months.map((month) => (
						<Month key={month.toISOString()} month={month} />
					))}
				</div>
			</main>
		</Layout>
	);
};

export default Home;
