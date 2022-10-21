const locale = "fi-FI";

export const formatNumber = (number: number) =>
	isNaN(number) ? "--" : Intl.NumberFormat(locale).format(number);

export const formatCurrency = (number: number) =>
	isNaN(number)
		? "--"
		: Intl.NumberFormat(locale, {
				style: "currency",
				currency: "EUR",
		  }).format(number);
