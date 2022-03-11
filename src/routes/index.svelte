<script context="module">
	// export const load = async ({ fetch }) => {
	// 	const res = await fetch('/quotes.json');
	// 	if (res.ok) {
	// 		const { quotes } = await res.json();
	// 		console.log(`🚀 ~ file: index.svelte ~ line 6 ~ load ~ quotes`, quotes);
	// 		return { props: { quotes } };
	// 	}
	// };
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
		console.log(`🚀 ~ file: index.svelte ~ line 20 ~ quotes`, quotes);
		// quotes.forEach((quote) => {
		// 	console.log(`🚀 ~ file: index.svelte ~ line 30 ~ quotes.forEach ~ quote`, quote);
		// 	// setTimeout(() => {
		// 	// 	uploadQuote(quote, "upsertQuote")
		// 	// }, 30);
		// });
	});
	// onMount(() => {
	// 	console.log(`🚀 ~ file: index.svelte ~ line 18 ~ fq`, fq);
	// }

	function uploadQuote(quote, operationType) {
		console.log(
			`🚀 ~ file: DisplayQuotes.svelte ~ line 44 ~ uploadQuote ~ operationType ${operationType}, quote`,
			quote
		);
		const fire = async () => {
			try {
				// const res = await fetch(`/quotes.dgraph.getQuote.json?data=${JSON.stringify(id)}`);
				const res = await fetch(
					`/quotes.dgraph.getQuote?data=${JSON.stringify(quote)}&queryType="${operationType}"`
				);
				console.log(`🚀 ~ file: index.svelte ~ line 42 ~ fire ~ res`, res);
				if (res.ok) {
					const { dgraph_quotes } = await res.json();
					console.log(`🚀 ~ file: index.svelte ~ line 45 ~ fire ~ dgraph_quotes`, dgraph_quotes);
					return { props: { dgraph_quotes } };
				}
			} catch (error) {
				console.log(`🚀 ~ DisplayQuotes called getQuote.json endpoint: error`, error);
				return {
					body: { error: 'There was a server error' }
				};
			}
		};
		fire();
	}
</script>

<div class="flex w-full h-full justify-start">
	<ParseQuotes bind:filteredQuotes={fq} />
	<!-- <Quotes {quotes} /> -->
	<!-- <AddQuote /> -->
</div>
