import type { NextPage } from "next";
import NextLink from "next/link";
import type { ReactNode } from "react";
import { GasStation, Icon as IconType, ReportMoney } from "tabler-icons-react";

import { Layout } from "~shared/SharedComponents/Layout";

const Link = ({ href, icon, children }: { href: string; icon: IconType; children: ReactNode }) => {
	const Icon = icon;

	return (
		<NextLink href={href} passHref>
			<a className="flex cursor-pointer select-none items-center gap-4 rounded-md border-[1px] border-primary-700 bg-primary-800 p-4 transition-all duration-150 hover:border-primary-600 hover:bg-primary-700 active:scale-95">
				<Icon
					className="rounded-md border-[1px] border-primary-600 bg-primary-700 p-2"
					size={50}
					strokeWidth={0.8}
				/>
				{children}
			</a>
		</NextLink>
	);
};

const Home: NextPage = () => {
	return (
		<Layout title="Utils">
			<main className="mx-auto flex h-screen w-full justify-center pt-[10vh]">
				<div className="flex w-full max-w-[400px] flex-col gap-8 p-3">
					<h1 className="text-4xl font-bold sm:text-5xl">Utils</h1>

					<div className="flex flex-col gap-3 rounded-md border-[1px] border-primary-700 p-3">
						<h1 className="text-2xl font-medium sm:text-3xl">Calculators</h1>

						<div className="flex flex-col gap-3">
							<Link href="/calculators/salary" icon={ReportMoney}>
								<span className="text-lg">Salary</span>
							</Link>

							<Link href="/calculators/fuel" icon={GasStation}>
								<span className="text-lg">Fuel</span>
							</Link>
						</div>
					</div>
				</div>
			</main>
		</Layout>
	);
};

export default Home;
