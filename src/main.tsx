import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import "./index.css";
import { IndexPage } from "./pages/IndexPage.tsx";
import { FuelCalculatorPage } from "./pages/fuelCalculator/FuelCalculator.tsx";
import { PpiCalculatorPage } from "./pages/ppiCalculator.tsx";
import { SalaryCalculatorPage } from "./pages/salaryCalculator/salaryCalculatorPage.tsx";

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
