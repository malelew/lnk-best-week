/** Scroll to a full-viewport section inside a snap-scrolling page. */
export function scrollToSection(root: HTMLElement | null, index: number): void {
  const section = root?.querySelectorAll<HTMLElement>("[data-section]")[index];
  if (!section) return;

  // Instant scroll plays nicely with mandatory scroll-snap (esp. iOS Safari).
  section.scrollIntoView();
}

/** Event list index → section index (hero is section 0). */
export function eventSectionIndex(
  events: { id: string }[],
  eventId: string,
): number {
  const eventIndex = events.findIndex((event) => event.id === eventId);
  return eventIndex >= 0 ? eventIndex + 1 : -1;
}
