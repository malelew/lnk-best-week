const dateFormat = new Intl.DateTimeFormat("en-US", {
  month: "long",
  day: "numeric",
  year: "numeric",
});

const weekdayFormat = new Intl.DateTimeFormat("en-US", {
  weekday: "short",
  month: "short",
  day: "numeric",
});

/** Parse YYYY-MM-DD in local time (avoids UTC off-by-one). */
function parseDate(iso: string): Date {
  return new Date(`${iso}T12:00:00`);
}

export function formatWeekRange(start: string, end: string): string {
  const startDate = parseDate(start);
  const endDate = parseDate(end);
  const sameYear = startDate.getFullYear() === endDate.getFullYear();
  const sameMonth = sameYear && startDate.getMonth() === endDate.getMonth();

  if (sameMonth) {
    const month = startDate.toLocaleDateString("en-US", { month: "long" });
    return `${month} ${startDate.getDate()} to ${endDate.getDate()}, ${endDate.getFullYear()}`;
  }

  if (sameYear) {
    const startPart = startDate.toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
    });
    const endPart = endDate.toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
    });
    return `${startPart} to ${endPart}`;
  }

  return `${dateFormat.format(startDate)} to ${dateFormat.format(endDate)}`;
}

export function formatEventDate(iso: string): string {
  const parts = weekdayFormat.formatToParts(parseDate(iso));
  const get = (type: Intl.DateTimeFormatPartTypes) =>
    parts.find((p) => p.type === type)?.value ?? "";
  return `${get("weekday")} · ${get("month")} ${get("day")}`;
}
