import type { Event } from "$lib/events";

const IDEAL_WEEK_SCAN_YEARS = 10;
const MS_PER_SECOND = 1_000;
const MS_PER_MINUTE = 60 * MS_PER_SECOND;
const MS_PER_HOUR = 60 * MS_PER_MINUTE;
const MS_PER_DAY = 24 * MS_PER_HOUR;
const MIDNIGHT_ROLLOVER_BUFFER_MS = MS_PER_SECOND;

const UTC_DAY_SATURDAY = 6;
const IDEAL_WEEK_MIN_LAST_SATURDAY_DAY = 29;
const IDEAL_WEEK_SPAN_DAYS = 7;
const MAY_MONTH = 5;
const LAST_DAY_OF_MAY = 31;
const UTC_NOON_SUFFIX = "T12:00:00Z";
const ISO_DATE_PART_PAD_WIDTH = 2;

export const WEEK_TZ = "America/Chicago";

export type WeekPhase = "before" | "during" | "after";

export type IdealWeekRange = {
  startDate: string;
  endDate: string;
};

const isoFormatter = new Intl.DateTimeFormat("en-CA", {
  timeZone: WEEK_TZ,
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
});

/** Calendar day in Lincoln as YYYY-MM-DD. */
export function toLocalIso(date: Date): string {
  return isoFormatter.format(date);
}

export function getWeekPhase(now: Date, start: string, end: string): WeekPhase {
  const today = toLocalIso(now);
  if (today < start) return "before";
  if (today > end) return "after";
  return "during";
}

export function getTodayEvents(events: Event[], todayIso: string): Event[] {
  return events.filter((event) => event.date === todayIso);
}

export function getNextUpEvent(
  events: Event[],
  todayIso: string,
): Event | undefined {
  return events.find((event) => event.date > todayIso);
}

export function getEventDomId(event: Event): string {
  return `event-${event.id}`;
}

/** Ms until next midnight in the given IANA timezone (for timers; not reactive). */
export function getMsUntilMidnight(
  timeZone: string,
  date: Date = new Date(),
): number {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone,
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hourCycle: "h23",
  }).formatToParts(date);
  const getPart = (type: Intl.DateTimeFormatPartTypes) =>
    Number(parts.find((part) => part.type === type)?.value ?? 0);
  const elapsed =
    getPart("hour") * MS_PER_HOUR +
    getPart("minute") * MS_PER_MINUTE +
    getPart("second") * MS_PER_SECOND;
  return MS_PER_DAY - elapsed + MIDNIGHT_ROLLOVER_BUFFER_MS;
}

/** Parse calendar YYYY-MM-DD at UTC noon (stable across environments). */
function parseUtcDate(iso: string): Date {
  return new Date(`${iso}${UTC_NOON_SUFFIX}`);
}

function toUtcIso(date: Date): string {
  const utcYear = date.getUTCFullYear();
  const utcMonth = String(date.getUTCMonth() + 1).padStart(
    ISO_DATE_PART_PAD_WIDTH,
    "0",
  );
  const utcDay = String(date.getUTCDate()).padStart(
    ISO_DATE_PART_PAD_WIDTH,
    "0",
  );
  return `${utcYear}-${utcMonth}-${utcDay}`;
}

/** Last Saturday in May; ideal years have day 29, 30, or 31 (Tue after is in June). */
function idealWeekRange(year: number): IdealWeekRange | null {
  const mayMonth = String(MAY_MONTH).padStart(ISO_DATE_PART_PAD_WIDTH, "0");
  const lastDayOfMay = String(LAST_DAY_OF_MAY).padStart(
    ISO_DATE_PART_PAD_WIDTH,
    "0",
  );
  const weekStart = parseUtcDate(`${year}-${mayMonth}-${lastDayOfMay}`);
  while (weekStart.getUTCDay() !== UTC_DAY_SATURDAY) {
    weekStart.setUTCDate(weekStart.getUTCDate() - 1);
  }
  if (weekStart.getUTCDate() < IDEAL_WEEK_MIN_LAST_SATURDAY_DAY) return null;

  const weekEnd = new Date(weekStart);
  weekEnd.setUTCDate(weekEnd.getUTCDate() + IDEAL_WEEK_SPAN_DAYS);
  return { startDate: toUtcIso(weekStart), endDate: toUtcIso(weekEnd) };
}

function addDaysIso(iso: string, days: number): string {
  const date = parseUtcDate(iso);
  date.setUTCDate(date.getUTCDate() + days);
  return toUtcIso(date);
}

function daysBetweenIso(fromIso: string, toIso: string): number {
  if (fromIso >= toIso) return 0;
  const from = parseUtcDate(fromIso);
  const to = parseUtcDate(toIso);
  return Math.round((to.getTime() - from.getTime()) / MS_PER_DAY);
}

/** Ms until 00:00 on `isoDate` in the Lincoln calendar. */
export function getMsUntilDateStart(
  isoDate: string,
  now: Date = new Date(),
): number {
  const todayIso = toLocalIso(now);
  if (isoDate <= todayIso) return 0;

  const msUntilTonightMidnight = getMsUntilMidnight(WEEK_TZ, now);
  const daysUntilTarget = daysBetweenIso(addDaysIso(todayIso, 1), isoDate);
  return msUntilTonightMidnight + daysUntilTarget * MS_PER_DAY;
}

export type CountdownParts = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
};

const SECONDS_PER_MINUTE = 60;
const SECONDS_PER_HOUR = 60 * SECONDS_PER_MINUTE;
const SECONDS_PER_DAY = 24 * SECONDS_PER_HOUR;

export function getCountdownParts(remainingMs: number): CountdownParts {
  const totalSeconds = Math.max(0, Math.floor(remainingMs / MS_PER_SECOND));
  const days = Math.floor(totalSeconds / SECONDS_PER_DAY);
  const hours = Math.floor((totalSeconds % SECONDS_PER_DAY) / SECONDS_PER_HOUR);
  const minutes = Math.floor(
    (totalSeconds % SECONDS_PER_HOUR) / SECONDS_PER_MINUTE,
  );
  const seconds = totalSeconds % SECONDS_PER_MINUTE;
  return { days, hours, minutes, seconds };
}

/** Next ideal week that has not ended yet (Lincoln calendar). */
export function getNextIdealWeek(now: Date = new Date()): IdealWeekRange {
  const today = toLocalIso(now);
  const year = Number(today.split("-")[0]);

  for (
    let candidateYear = year;
    candidateYear <= year + IDEAL_WEEK_SCAN_YEARS;
    candidateYear++
  ) {
    const range = idealWeekRange(candidateYear);
    if (range && range.endDate >= today) return range;
  }

  throw new Error(
    `No ideal week within ${IDEAL_WEEK_SCAN_YEARS} years of ${year}`,
  );
}
