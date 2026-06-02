<script lang="ts">
  import { browser } from "$app/environment";
  import { onMount } from "svelte";
  import type { Event } from "$lib/events";
  import { eventSectionIndex } from "$lib/scroll";
  import {
    getNextUpEvent,
    getTodayEvents,
    getWeekPhase,
    toLocalIso,
    WEEK_TZ,
  } from "$lib/week";

  let {
    events,
    startDate,
    endDate,
    onScrollToSection,
  }: {
    events: Event[];
    startDate: string;
    endDate: string;
    onScrollToSection: (sectionIndex: number) => void;
  } = $props();

  let now = $state(new Date());

  onMount(() => {
    now = new Date();
  });

  $effect(() => {
    if (!browser) return;

    const tick = () => {
      now = new Date();
    };

    const msUntilMidnight = () => {
      const parts = new Intl.DateTimeFormat("en-US", {
        timeZone: WEEK_TZ,
        hour: "numeric",
        minute: "numeric",
        second: "numeric",
        hour12: false,
      }).formatToParts(now);
      const get = (type: Intl.DateTimeFormatPartTypes) =>
        Number(parts.find((p) => p.type === type)?.value ?? 0);
      const elapsed =
        get("hour") * 3600_000 + get("minute") * 60_000 + get("second") * 1000;
      return 86_400_000 - elapsed + 1000;
    };

    const timeout = window.setTimeout(tick, msUntilMidnight());
    return () => window.clearTimeout(timeout);
  });

  const todayIso = $derived(toLocalIso(now));
  const phase = $derived(getWeekPhase(now, startDate, endDate));
  const todayEvents = $derived(getTodayEvents(events, todayIso));
  const nextUp = $derived(getNextUpEvent(events, todayIso));

  const scrollTarget = $derived.by(() => {
    if (phase !== "during") return null;
    if (todayEvents.length > 0) return todayEvents[0];
    return nextUp ?? null;
  });

  const mode = $derived.by((): "today" | "next" | null => {
    if (phase !== "during" || !scrollTarget) return null;
    return todayEvents.length > 0 ? "today" : "next";
  });

  const primaryLabel = $derived.by(() => {
    if (!scrollTarget) return "";
    if (mode === "today" && todayEvents.length > 1) {
      return todayEvents.map((e) => e.title).join(" · ");
    }
    const { emoji, title } = scrollTarget;
    return `${emoji} ${title}`;
  });

  const ariaLabel = $derived.by(() => {
    if (!scrollTarget || !mode) return "";
    if (mode === "today" && todayEvents.length > 1) {
      return `Go to today's events: ${todayEvents.map((e) => e.title).join(", ")}`;
    }
    const prefix = mode === "today" ? "today's event" : "next event";
    return `Go to ${prefix}: ${scrollTarget.title}`;
  });

  function handleClick(event: MouseEvent) {
    if (!scrollTarget) return;
    const index = eventSectionIndex(events, scrollTarget.id);
    if (index < 0) return;
    onScrollToSection(index);
    (event.currentTarget as HTMLButtonElement).blur();
  }
</script>

{#if mode}
  <button
    type="button"
    class="live-today"
    aria-label={ariaLabel}
    onclick={handleClick}
  >
    <span class="eyebrow">
      {#if mode === "today"}
        <span class="live-dot" aria-hidden="true"></span>
        Today
      {:else}
        Next up
      {/if}
    </span>
    <span class="primary">
      <span class="titles">{primaryLabel}</span>
      <span class="chevron" aria-hidden="true">↓</span>
    </span>
  </button>
{/if}

<style>
  .live-today {
    --btn-bg: var(--lnk-gold);
    --btn-fg: var(--lnk-blue);
    --btn-shadow-color: color-mix(
      in srgb,
      color-mix(in srgb, var(--lnk-gold) 30%, white) 70%,
      transparent
    );
    --shadow-offset: 5px;

    display: inline-flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 0.35rem;
    width: fit-content;
    max-width: 100%;
    margin: 0 var(--shadow-offset) calc(0.75rem + var(--shadow-offset)) 0;
    padding: 0.65rem 1rem 0.75rem;
    border-radius: 1.5rem;
    border: 2px solid var(--btn-fg);
    background: var(--btn-bg);
    color: var(--btn-fg);
    box-shadow: var(--shadow-offset) var(--shadow-offset) 0 0
      var(--btn-shadow-color);
    font: inherit;
    text-align: left;
    cursor: pointer;
    transition:
      background 0.12s ease,
      box-shadow 0.12s ease,
      transform 0.12s ease;
  }

  .live-today:hover {
    --btn-bg: color-mix(in srgb, var(--lnk-gold) 78%, white);
    box-shadow: 0 0 0 0 var(--btn-shadow-color);
    transform: translate(var(--shadow-offset), var(--shadow-offset));
  }

  .live-today:active {
    --btn-bg: color-mix(in srgb, var(--lnk-gold) 88%, white);
    box-shadow: 0 0 0 0 var(--btn-shadow-color);
    transform: translate(var(--shadow-offset), var(--shadow-offset));
  }

  @media (prefers-reduced-motion: reduce) {
    .live-today {
      transition:
        background 0.12s ease,
        box-shadow 0.12s ease;
    }
  }

  .live-today:focus-visible {
    outline: 2px solid var(--lnk-white);
    outline-offset: 3px;
  }

  .eyebrow {
    display: inline-flex;
    align-items: center;
    gap: 0.4rem;
    font-size: 0.75rem;
    font-weight: 600;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: inherit;
  }

  .live-dot {
    width: 0.45rem;
    height: 0.45rem;
    border-radius: 50%;
    background: var(--btn-fg);
    animation: live-pulse 1.8s ease-in-out infinite;
  }

  @media (prefers-reduced-motion: reduce) {
    .live-dot {
      animation: none;
    }
  }

  @keyframes live-pulse {
    0%,
    100% {
      opacity: 1;
    }
    50% {
      opacity: 0.45;
    }
  }

  .primary {
    display: grid;
    grid-template-columns: minmax(0, 1fr) auto;
    column-gap: 1rem;
    align-items: center;
    width: 100%;
    font-size: clamp(1.125rem, 4.5vw, 2.75rem);
    font-weight: 500;
    letter-spacing: 0.06em;
    line-height: 1.15;
    text-transform: uppercase;
    color: inherit;
  }

  .titles {
    min-width: 0;
  }

  .chevron {
    flex-shrink: 0;
    justify-self: end;
    padding-inline-start: 0.25rem;
    font-size: 1.25rem;
    line-height: 1;
    color: color-mix(in srgb, var(--btn-fg) 72%, transparent);
  }

  @media (min-width: 48rem) {
    .primary {
      column-gap: 0.75rem;
      font-size: 2.75rem;
      font-weight: 600;
      letter-spacing: normal;
      text-transform: none;
    }

    .chevron {
      font-size: 1.5rem;
    }
  }
</style>
