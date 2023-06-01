import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import "./index.css";
import { IndexPage } from "./pages/IndexPage.tsx";

const SalaryCalculatorPage = React.lazy(() =>
	import("./pages/salaryCalculator/SalaryCalculatorPage.tsx").then((module) => ({
		default: module.SalaryCalculatorPage,
	}))
);

const FuelCalculatorPage = React.lazy(() =>
	import("./pages/fuelCalculator/FuelCalculator.tsx").then((module) => ({
		default: module.FuelCalculatorPage,
	}))
);

const PpiCalculatorPage = React.lazy(() =>
	import("./pages/ppiCalculator.tsx").then((module) => ({
		default: module.PpiCalculatorPage,
	}))
);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
	<React.StrictMode>
		<BrowserRouter>
			<Routes>
				<Route index element={<IndexPage />} />
				<Route path="/calculators/salary" element={<SalaryCalculatorPage />} />
				<Route path="/calculators/fuel" element={<FuelCalculatorPage />} />
				<Route path="/calculators/ppi" element={<PpiCalculatorPage />} />
			</Routes>
		</BrowserRouter>
	</React.StrictMode>
);
