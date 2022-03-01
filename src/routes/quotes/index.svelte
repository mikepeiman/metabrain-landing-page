<script context="module">
	export const load = async ({ fetch }) => {
		const res = await fetch('/quotes.json');
		if (res.ok) {
			const { quotes } = await res.json();
			return { props: { quotes } };
		}
	};
</script>

<script>
	import Quotes from '$components/Quotes.svelte';
	import ParseQuotes from './parseQuotes.svelte';
	import AddQuote from './AddQuote.svelte';
	import { quotesArray } from '$stores/quotes';
	import { onMount } from 'svelte';
	let fq = [];
	// $: console.log(`🚀 ~ file: index.svelte ~ line 18 ~ fq`, fq);

	export let quotes;
	quotesArray.subscribe((quotes) => {
		quotes = quotes;
		// console.log(`🚀 ~ file: index.svelte ~ line 20 ~ quotes`, quotes);
	});
	// onMount(() => {
	// 	console.log(`🚀 ~ file: index.svelte ~ line 18 ~ fq`, fq);
	// }
</script>

<div class="flex w-full h-full justify-start">
	<ParseQuotes bind:filteredQuotes={fq} />
	<!-- <Quotes {quotes} /> -->
	<!-- <AddQuote /> -->
</div>
