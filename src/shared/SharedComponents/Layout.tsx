import Head from "next/head";
import { ReactNode } from "react";

type Props = {
	title: string;
	children: ReactNode;
};

export const Layout = ({ title, children }: Props) => {
	return (
		<>
			<Head>
				<title>{title}</title>

				<meta property="og:site_name" content={title} key="og:site_name" />

				<meta property="og:image:type" content="image/png" key="og:image:type" />
				<meta property="og:image:width" content="256" key="og:image:width" />
				<meta property="og:image:height" content="256" key="og:image:width" />
				<meta
					property="og:image:alt"
					content="Face with sunglasses emoji"
					key="og:image:alt"
				/>
				<meta property="og:image" content={"/sunglasses.png"} key="og:image" />

				<meta name="twitter:card" content="summary" />
				<meta name="twitter:title" content={title} />

				<meta property="og:type" content="website" key="og:type" />

				<link rel="icon" href="/favicon.ico" />
			</Head>

			{children}
		</>
	);
};
