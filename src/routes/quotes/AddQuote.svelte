<script>
	import { addQuote } from '$stores/quotes.js';
	let quoteBody, author, context, tags, source;
	const handleSubmit = () => {
		console.log(
			`🚀 ~ file: AddQuote.svelte ~ line 4 ~ quote, author, context, tags, source`,
			quoteBody,
			author,
			context,
			tags,
			source
		);
    let quote = {
      quoteBody,
      author,
      context,
      tags,
      source
    };
		addQuote(quote);
    }
	
</script>

<div class="p-10 card bg-base-200 w-full">
	<div class="form-control flex">
		<label class="label w-full">
			<span>Quote</span>
		</label>
		<input type="text" placeholder="Quote" class="input input-group max-w-xs" bind:value={quoteBody} />
		<label class="label">
			<span class="label-text">Author</span>
		</label>
		<input type="text" placeholder="Author" class="input" bind:value={author} />
		<label class="label">
			<span class="label-text">Context</span>
		</label>
		<input type="text" placeholder="Context" class="input" bind:value={context} />
		<label class="label">
			<span class="label-text">Tags</span>
		</label>
		<input type="text" placeholder="Tags" class="input" bind:value={tags} />
		<label class="label">
			<span class="label-text">Source</span>
		</label>
		<input type="text" placeholder="Source" class="input" bind:value={source} />
		<button
			type="submit"
			class="p-3 rounded bg-green-800 hover:bg-green-700 mt-4"
			on:click={handleSubmit}>Add Quote</button
		>
	</div>
</div>
