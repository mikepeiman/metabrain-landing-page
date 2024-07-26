<script>
	import MetabrainCanvas from '$components/MetabrainCanvas.svelte';
	import { onMount } from 'svelte';
	let mounted = false;
	onMount(() => {
		mounted = true;
	});

	import McMailingList from '$components/MCMailingList.svelte';
	import MetabrainCanvas2 from '$components/MetabrainCanvas2.svelte';
	import MetabrainCanvas3 from '$components/MetabrainCanvas3.svelte';
	import MetabrainLanding from './MetabrainLanding.svelte';
	import MetabrainLanding2 from './MetabrainLanding2.svelte';
</script>

{#if mounted}
<!-- <MetabrainLanding /> -->
<MetabrainLanding2 />
	<!-- <svelte:window bind:innerWidth={windowInnerWidth} /> -->

	<!-- <main
	class="homepage bg-black mt-20 flex flex-col self-center justify-items-center items-center w-full lg:text-sm lg:px-12 xl:px-24 2xl:w-4/5 2xl:px-12 3xl:w-3/4 3xl:px-36 mt-4 md:mt-20"
> -->

{/if}