import Holidays from "date-holidays";

import { Holiday } from "../types";

export const getHolidays = (year: Date): Holiday[] =>
	new Holidays("fi").getHolidays(year).map((h) => ({
		...h,
		date: new Date(h.date),
	}));
