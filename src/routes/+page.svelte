<script lang="ts">
  import Countdown from "$lib/Countdown.svelte";
  import { formatWeekRange } from "$lib/dates";
  import type { PageData } from "./$types";

  let { data }: { data: PageData } = $props();

  const weekRange = $derived(
    formatWeekRange(data.nextWeek.startDate, data.nextWeek.endDate),
  );
</script>

<svelte:head>
  <title>BEST WEEK • LNK</title>
  <meta
    name="description"
    content="Countdown to the next ideal week in Lincoln, NE"
  />
</svelte:head>

<main class="page hero">
  <header class="countdown-header">
    <h2>The ideal week in Lincoln, NE</h2>
    <p>
      If you have ever considered visiting Lincoln, then this is the ideal week
      to book that flight. This specific week has the best of what this city has
      to offer during the period before the summer heat settles in. Regardless
      of whether you're a local or stopping by, plan to get out there and enjoy
      time with your friends and family.
    </p>
    <p class="tagline">Next ideal week · {weekRange}</p>
    <Countdown targetDate={data.nextWeek.startDate} />
  </header>

  <div style="height: 40vmin;min-height: 360px">
    <script
      src="https://cdn.jsdelivr.net/ghost/signup-form@~0.3/umd/signup-form.min.js"
      data-text-color="#FFFFFF"
      data-button-color="#c4986a"
      data-button-text-color="#FFFFFF"
      data-title=" "
      data-description="Looking for something to do this week? This Week In Lincoln is an independent weekly newsletter publishing an irreverent, opinionated, and very subjective guide to the Star City."
      data-site="https://lincoln.ghost.io/"
      data-locale="en"
      async
    ></script>
  </div>
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
    --slide-bg: linear-gradient(
      155deg,
      var(--lnk-blue) 0%,
      #004459 30%,
      var(--lnk-teal) 55%,
      color-mix(in srgb, var(--lnk-teal) 45%, var(--lnk-gold)) 80%,
      color-mix(in srgb, var(--lnk-teal) 50%, var(--lnk-gold)) 100%
    );

    min-height: 100svh;
    min-height: 100dvh;
    scroll-snap-align: start;
    scroll-snap-stop: always;
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin-top: -2rem;
    margin-bottom: 0;
    margin-inline: calc(50% - 50dvw);
    padding-top: 2rem;
    padding-inline: max(1.25rem, calc(50dvw - 20rem));
    background: var(--slide-bg);
    color: var(--lnk-white);

    h1 {
      font-size: clamp(3rem, 15vw, 7.2rem);
      font-weight: 800;
      margin-bottom: 0.5rem;
    }

    p.tagline {
      font-size: 1.2rem;
      padding-bottom: 0;
    }

    .tagline {
      color: rgb(255 255 255 / 0.82);
    }
  }

  .countdown-header {
    margin-bottom: 1.2rem;
  }
</style>
