import { format, isSameMonth, isSameYear, parseISO } from "date-fns";

export const formatDateRange = (start: string, end: string) => {
  const startDate = parseISO(start);
  const endDate = parseISO(end);

  if (isSameMonth(startDate, endDate)) {
    return `${format(startDate, "MMM d")}-${format(endDate, "d, yyyy")}`;
  }

  if (isSameYear(startDate, endDate)) {
    return `${format(startDate, "MMM d")} - ${format(endDate, "MMM d, yyyy")}`;
  }

  return `${format(startDate, "MMM d, yyyy")} - ${format(endDate, "MMM d, yyyy")}`;
};
