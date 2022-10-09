import format from "date-fns/format";

export const getHtmlDate = (date: Date) => format(date, "yyyy-MM-dd");
