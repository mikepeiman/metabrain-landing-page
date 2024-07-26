<script>
	import '../app.scss';
	import Footer from '$components/Footer.svelte';
	import {onMount} from 'svelte';
	let mounted = false
	onMount(() => {
		mounted = true
	});
</script>
{#if mounted}
<!-- <div  class="flex flex-col items-center justify-center w-full min-h-screen max-h-screen  bg-black  z-90 transition"> -->
	<!-- id="app-layout" -->
	<!-- <div class=" flex flex-col  items-center jutify-center bg-black/40"> -->
		<slot />
	<!-- </div> -->
	<!-- <div class="relative z-20"> -->
		<!-- <Footer /> -->
	<!-- </div> -->
<!-- </div> -->
{/if}

<style global lang="scss">

	// :global(#app-layout) {
	// 	// height: calc(100vh - 160px);
	// 	// height: 100%;
	// 	// width: 100%;
	// 	// width: 100vw;
	// 	grid-template-rows: auto 80px;
	// 	grid-template-columns: auto;
	// 	grid-template-areas:
	// 		' layout-main '
	// 		' footer ';
	// }

	:global(.layout-main) {
		grid-area: layout-main;
		// max-width: 100vw;
		// height: calc(100% - 80px);
	}
	// :root {
	// 	background-color: red;
	// 	height: 100vh;
	// }
	html {
		max-width: 100vw;
		width: 100%;
		// height: 100%;
		// background-color: pink;
	}

	body {
		// min-height: 100vh;
		margin: 0;
		// background-color: darkturquoise;
		// height: 90%;
	}
</style>
