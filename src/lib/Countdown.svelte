<script lang="ts">
  import { onMount } from "svelte";
  import { getCountdownParts, getMsUntilDateStart } from "$lib/week";

  let { targetDate }: { targetDate: string } = $props();

  let now = $state<Date | null>(null);
  let tickIntervalId: ReturnType<typeof setInterval> | undefined;

  onMount(() => {
    now = new Date();
    tickIntervalId = setInterval(() => {
      now = new Date();
    }, 1_000);

    return () => clearInterval(tickIntervalId);
  });

  const remainingMs = $derived(
    now ? getMsUntilDateStart(targetDate, now) : null,
  );
  const parts = $derived(
    remainingMs === null ? null : getCountdownParts(remainingMs),
  );

  function pad(value: number): string {
    return String(value).padStart(2, "0");
  }
</script>

<div class="countdown" aria-live="polite">
  {#if parts}
    <div class="units">
      <div class="unit">
        <span class="value">{parts.days}</span>
        <span class="label">days</span>
      </div>
      <div class="unit">
        <span class="value">{pad(parts.hours)}</span>
        <span class="label">hrs</span>
      </div>
      <div class="unit">
        <span class="value">{pad(parts.minutes)}</span>
        <span class="label">min</span>
      </div>
      <div class="unit">
        <span class="value">{pad(parts.seconds)}</span>
        <span class="label">sec</span>
      </div>
    </div>
  {:else}
    <p class="loading" aria-hidden="true">···</p>
  {/if}
</div>

<style>
  .countdown {
    margin-top: 1.5rem;
  }

  .units {
    display: flex;
    flex-wrap: wrap;
    gap: 1rem 1.5rem;
  }

  .unit {
    display: flex;
    flex-direction: column;
    gap: 0.2rem;
    min-width: 3.5rem;
  }

  .value {
    font-size: clamp(2rem, 8vw, 3.5rem);
    font-weight: 700;
    font-variant-numeric: tabular-nums;
    line-height: 1;
    color: var(--lnk-gold);
  }

  .label {
    font-size: 0.75rem;
    font-weight: 600;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: rgb(255 255 255 / 0.72);
  }

  .loading {
    margin: 0;
    font-size: 2rem;
    letter-spacing: 0.35em;
    color: rgb(255 255 255 / 0.45);
  }
</style>
