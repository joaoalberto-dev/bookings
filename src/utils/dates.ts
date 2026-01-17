import { format, isSameMonth, isSameYear, parseISO } from "date-fns";

const MS_PER_DAY = 24 * 60 * 60 * 1000;

export const stripTimezone = (date: Date) => date.toISOString().split("T")[0];

export const diffDaysISO = (start: string, end: string) => {
  if (typeof start !== "string" || typeof end !== "string") {
    throw new TypeError("Both arguments must be ISO date strings");
  }

  const dateStart = new Date(start);
  const dateEnd = new Date(end);

  if (Number.isNaN(dateStart.getTime()) || Number.isNaN(dateEnd.getTime())) {
    throw new Error("Invalid ISO date format");
  }

  const utcA = Date.UTC(dateStart.getUTCFullYear(), dateStart.getUTCMonth(), dateStart.getUTCDate());
  const utcB = Date.UTC(dateEnd.getUTCFullYear(), dateEnd.getUTCMonth(), dateEnd.getUTCDate());

  return Math.abs(Math.round((utcB - utcA) / MS_PER_DAY));
};

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

export const isDatesOverlapping = (
  blockedDates: { from: string; to: string }[],
  candidateDate: { start?: string; end?: string },
) => {
  const { start, end } = candidateDate;

  if (!start || !end) {
    return false;
  }

  return blockedDates.some((blocked) => start < blocked.to && end > blocked.from);
};
