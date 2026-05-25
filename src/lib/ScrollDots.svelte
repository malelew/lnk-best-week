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
    ></button>
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
    border: 1.5px solid rgb(201 167 124 / 0.5);
    border-radius: 50%;
    background: rgb(255 255 255 / 0.35);
    cursor: pointer;
    pointer-events: auto;
    transition:
      background 0.15s,
      border-color 0.15s,
      transform 0.15s;
  }

  button.active {
    background: var(--lnk-gold);
    border-color: var(--lnk-gold);
    transform: scale(1.25);
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
  }
</style>
