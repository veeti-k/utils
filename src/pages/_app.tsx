import type { AppType } from "next/dist/shared/lib/utils";

import { SalaryContextProvider } from "../SalaryStuff/SalaryContext/SalaryContextProvider";
import "../styles/globals.css";

const MyApp: AppType = ({ Component, pageProps }) => {
	return (
		<SalaryContextProvider>
			<Component {...pageProps} />
		</SalaryContextProvider>
	);
};

export default MyApp;
