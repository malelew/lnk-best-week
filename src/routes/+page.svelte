<script lang="ts">
</script>

<svelte:head>
  <title>BEST WEEK • LNK</title>
  <meta name="description" content="The ideal week in Lincoln, NE" />
</svelte:head>

<main class="page hero">
  <header>
    <h1>Ideal week in LNK</h1>
  </header>
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
      font-size: 1.5rem;
      padding-bottom: 1.5rem;
    }

    .tagline {
      color: rgb(255 255 255 / 0.82);
    }
  }
</style>
