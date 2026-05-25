<script lang="ts">
  let { root }: { root: HTMLElement | null } = $props();

  let active = $state(0);
  let sectionCount = $derived(
    root?.querySelectorAll<HTMLElement>("[data-section]").length ?? 0,
  );

  $effect(() => {
    if (!root) return;

    const sections = [...root.querySelectorAll<HTMLElement>("[data-section]")];
    if (!sections.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            const index = sections.indexOf(entry.target as HTMLElement);
            if (index >= 0) active = index;
          }
        }
      },
      { threshold: 0.5 },
    );

    for (const section of sections) observer.observe(section);
    return () => observer.disconnect();
  });

  function scrollTo(index: number) {
    root
      ?.querySelectorAll<HTMLElement>("[data-section]")
      [index]?.scrollIntoView();
  }
</script>

<nav class="dots" aria-label="Page sections">
  {#each Array(sectionCount) as _, i (i)}
    <button
      type="button"
      class:active={active === i}
      aria-label="Go to section {i + 1}"
      aria-current={active === i ? "step" : undefined}
      onclick={() => scrollTo(i)}
    >
      <svg class="star" viewBox="-73.28 -73.28 146.55 146.55" aria-hidden="true">
        <path
          d="M 45.96 19.03 L 50.40 50.39 L 19.04 45.96 L 0.00 71.26 L -19.05 45.96 L -50.40 50.39 L -45.97 19.03 L -71.28 -0.01 L -45.97 -19.04 L -50.40 -50.39 L -19.05 -45.96 L 0.00 -71.27 L 19.04 -45.96 L 50.40 -50.39 L 45.96 -19.04 L 71.27 -0.01 Z"
          fill="currentColor"
        />
      </svg>
    </button>
  {/each}
</nav>

<style>
  .dots {
    position: fixed;
    top: 50%;
    right: 0.75rem;
    z-index: 10;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.5rem;
    margin: 0;
    padding: 0;
    border: 0;
    transform: translateY(-50%);
    pointer-events: none;
  }

  button {
    width: 0.5rem;
    height: 0.5rem;
    padding: 0;
    border: 1.5px solid rgb(0 0 0 / 0.25);
    border-radius: 50%;
    background: rgb(255 255 255 / 0.6);
    cursor: pointer;
    pointer-events: auto;
    transition:
      background 0.15s,
      border-color 0.15s,
      width 0.15s,
      height 0.15s;
  }

  .star {
    display: none;
    width: 100%;
    height: 100%;
  }

  button.active {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 0.875rem;
    height: 0.875rem;
    border: none;
    border-radius: 0;
    background: transparent;
    color: var(--lnk-blue);
  }

  button.active .star {
    display: block;
  }

  @media (min-width: 48rem) {
    .dots {
      right: max(1.5rem, calc(50% - 22rem));
    }

    button {
      width: 0.625rem;
      height: 0.625rem;
      background: transparent;
    }

    button.active {
      width: 1rem;
      height: 1rem;
    }
  }
</style>
