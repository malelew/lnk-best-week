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
