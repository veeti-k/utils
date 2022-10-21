import type { NextPage } from "next";
import NextLink from "next/link";
import { ReactNode } from "react";

import { Layout } from "~shared/SharedComponents/Layout";

const Link = ({ href, children }: { href: string; children: ReactNode }) => {
	return (
		<NextLink href={href} passHref>
			<a className="flex cursor-pointer select-none items-center justify-center rounded-md border-[1px] border-gray-700 bg-gray-800/40 p-14 transition-all duration-150 hover:border-gray-600 hover:bg-gray-700/50 active:scale-95">
				{children}
			</a>
		</NextLink>
	);
};

const Home: NextPage = () => {
	return (
		<Layout>
			<main className="mx-auto flex h-screen w-full max-w-[400px] items-center justify-center">
				<div className="flex flex-col items-center gap-12">
					<h1 className="text-5xl font-bold">Calculators</h1>

					<div className="grid w-full grid-cols-2 gap-2">
						<Link href="/salary">Salary</Link>
					</div>
				</div>
			</main>
		</Layout>
	);
};

export default Home;
