<script lang="ts">
  import { formatEventDate, formatWeekRange } from "$lib/dates";
  import { bestWeek, events } from "$lib/events";

  const weekRange = formatWeekRange(bestWeek.startDate, bestWeek.endDate);
</script>

<svelte:head>
  <title>{bestWeek.label} · {weekRange}</title>
  <meta name="description" content={bestWeek.tagline} />
</svelte:head>

<main class="page">
  <header class="hero">
    <h1>{bestWeek.label}</h1>
    <p class="dates">{weekRange}</p>
    <p class="tagline">{bestWeek.tagline}</p>
  </header>

  <ol class="events">
    {#each events as event (event.id)}
      <li class="event">
        <h2 class="event-day">{formatEventDate(event.date)}</h2>
        <h2 class="event-title">
          {#if event.url}
            <a href={event.url} target="_blank" rel="noopener noreferrer"
              >{event.title}</a
            >
          {:else}
            {event.title}
          {/if}
        </h2>
        {#if event.time}
          <p class="event-meta">{event.time} · {event.location}</p>
        {:else}
          <p class="event-meta">{event.location}</p>
        {/if}
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
  }

  h1 {
    margin: 0 0 0.25rem;
    font-size: 2rem;
    line-height: 1.15;
  }

  .dates {
    margin: 0 0 0.75rem;
    font-size: 1.125rem;
    font-weight: 600;
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
    border-bottom: 1px solid #e0e0e0;
  }

  .event:last-child {
    border-bottom: none;
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
    color: #b45309;
  }

  .event-meta {
    margin: 0 0 0.5rem;
    font-size: 1.25rem;
    color: #555;
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
