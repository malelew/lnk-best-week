import type { Event } from "$lib/events";

export const WEEK_TZ = "America/Chicago";

export type WeekPhase = "before" | "during" | "after";

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
  const get = (type: Intl.DateTimeFormatPartTypes) =>
    Number(parts.find((p) => p.type === type)?.value ?? 0);
  const elapsed =
    get("hour") * 3600_000 + get("minute") * 60_000 + get("second") * 1000;
  return 86_400_000 - elapsed + 1000;
}
