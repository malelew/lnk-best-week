<script lang="ts">
  import { formatEventDate, formatWeekRange } from "$lib/dates";
  import { bestWeek, events } from "$lib/events";
  import { locationMapUrls } from "$lib/maps";
  import ScrollDots from "$lib/ScrollDots.svelte";

  const weekRange = formatWeekRange(bestWeek.startDate, bestWeek.endDate);

  let pageEl = $state<HTMLElement | null>(null);
</script>

<svelte:head>
  <title>{bestWeek.label} · {weekRange}</title>
  <meta name="description" content={bestWeek.tagline} />
</svelte:head>

<main class="page" bind:this={pageEl}>
  <ScrollDots root={pageEl} />

  <header class="hero" data-section>
    <h1>{bestWeek.label}</h1>
    <p class="dates">{weekRange}</p>
    <p class="tagline">{bestWeek.tagline}</p>
  </header>

  <ol class="events">
    {#each events as event (event.id)}
      <li class="event" data-section>
        <p class="event-day">{event.emoji} {formatEventDate(event.date)}</p>
        <h2 class="event-title">
          {#if event.url}
            <a href={event.url} target="_blank" rel="noopener noreferrer"
              >{event.title}</a
            >
          {:else}
            {event.title}
          {/if}
        </h2>
        <p class="event-meta">
          {#if event.time}{event.time} ·
          {/if}
          {#if event.locationMap}
            {@const mapUrls = locationMapUrls(event.locationMap)}
            <span class="location-map">
              <a
                class="location-map-link location-map-link--mobile"
                href={mapUrls.mobile}>{event.location}</a
              >
              <a
                class="location-map-link location-map-link--desktop"
                href={mapUrls.desktop}
                target="_blank"
                rel="noopener noreferrer">{event.location}</a
              >
            </span>
          {:else}
            {event.location}
          {/if}
        </p>
        <p class="event-blurb">{event.blurb}</p>
        {#if event.free === false}
          <p class="event-badge">Cover / paid admission</p>
        {:else if event.free}
          <p class="event-badge">Free</p>
        {/if}
      </li>
    {/each}
  </ol>
</main>

<style>
  .page {
    max-width: 40rem;
    margin: 0 auto;
    padding: 2rem 1.25rem 3rem;
    font-family: system-ui, sans-serif;
    line-height: 1.5;
    color: #1a1a1a;
  }

  .hero {
    min-height: 100dvh;
    scroll-snap-align: start;
    scroll-snap-stop: always;
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin-bottom: 0;
    h1 {
      font-size: clamp(3rem, 15vw, 7.2rem);
      font-weight: 800;
      margin-bottom: 0.5rem;
    }
    p.tagline {
      font-size: 1.5rem;
    }
  }

  h1 {
    margin: 0 0 0.25rem;
    font-size: 1.75rem;
    line-height: 1.15;
  }

  .dates {
    margin: 0 0 0.75rem;
    font-size: clamp(1.125rem, 4.5vw, 2.75rem);
    font-weight: 500;
    letter-spacing: 0.06em;
    text-transform: uppercase;
    color: var(--lnk-gold);
  }

  @media (min-width: 48rem) {
    .dates {
      font-size: 2.75rem;
      font-weight: 600;
      letter-spacing: normal;
      text-transform: none;
      color: inherit;
    }
  }

  .tagline {
    margin: 0;
    color: #444;
  }

  .events {
    list-style: none;
    margin: 0;
    padding: 0;
  }

  .event {
    min-height: 100dvh;
    scroll-snap-align: start;
    scroll-snap-stop: always;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding-bottom: 0;
  }

  .event-day {
    margin: 0 0 0.25rem;
    font-size: 1.5rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.04em;
    color: #666;
  }

  .event-title {
    margin: 0 0 0.35rem;
    font-size: 2.5rem;
    line-height: 1.25;
  }

  .event-title a {
    color: inherit;
  }

  .event-title a:hover {
    color: var(--lnk-teal);
  }

  .event-meta {
    margin: 0 0 0.5rem;
    font-size: 1.25rem;
    color: #555;
  }

  .location-map-link {
    color: inherit;
    text-decoration: underline;
    text-decoration-color: #bbb;
    text-underline-offset: 0.15em;
  }

  .location-map-link:hover {
    color: var(--lnk-teal);
    text-decoration-color: currentColor;
  }

  .location-map-link--mobile {
    display: none;
  }

  @media (hover: none) and (pointer: coarse) {
    .location-map-link--mobile {
      display: inline;
    }

    .location-map-link--desktop {
      display: none;
    }
  }

  .event-blurb {
    margin: 0;
  }

  .event-badge {
    margin: 0.75rem 0 0;
    display: inline-block;
    font-size: 0.75rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.03em;
    color: #666;
  }
</style>
