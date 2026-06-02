/** Scroll to a full-viewport section inside a snap-scrolling page. */
export function scrollToSection(root: HTMLElement | null, index: number): void {
  const section = root?.querySelectorAll<HTMLElement>("[data-section]")[index];
  if (!section) return;

  const doc = document.documentElement;
  doc.style.scrollSnapType = "none";

  const top = section.getBoundingClientRect().top + window.scrollY;
  window.scrollTo({ top, left: 0, behavior: "auto" });

  requestAnimationFrame(() => {
    doc.style.removeProperty("scroll-snap-type");
  });
}

/** Event list index → section index (hero is section 0). */
export function eventSectionIndex(
  events: { id: string }[],
  eventId: string,
): number {
  const eventIndex = events.findIndex((event) => event.id === eventId);
  return eventIndex >= 0 ? eventIndex + 1 : -1;
}
