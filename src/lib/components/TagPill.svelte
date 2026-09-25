<script lang="ts">
	import { tagFocus } from '$lib/tagFocus.svelte';

	type Hue = 'notes' | 'projects' | 'web' | 'comms';

	let {
		tag,
		hue = 'notes',
		values = [],
		linked = false
	}: {
		tag: string;
		hue?: Hue;
		values?: string[];
		/** A shared tag: hovering it highlights every instance on the page. */
		linked?: boolean;
	} = $props();

	let lit = $derived(linked && tagFocus.tag === tag);
</script>

{#if linked}
	<!-- svelte-ignore a11y_no_noninteractive_tabindex -->
	<span
		class={['pill cursor-default transition-all duration-300', lit && 'lit']}
		style="--tag: var(--color-{hue})"
		tabindex="0"
		role="note"
		aria-label="#{tag}, shared across views"
		onpointerenter={() => (tagFocus.tag = tag)}
		onpointerleave={() => (tagFocus.tag = null)}
		onfocus={() => (tagFocus.tag = tag)}
		onblur={() => (tagFocus.tag = null)}
		><span>#{tag}</span>{#each values as v, i (i)}<span class="sep">·</span><span class="v"
				>{v}</span
			>{/each}</span
	>
{:else}
	<span class="pill" style="--tag: var(--color-{hue})"
		><span>#{tag}</span>{#each values as v, i (i)}<span class="sep">·</span><span class="v"
				>{v}</span
			>{/each}</span
	>
{/if}

<style>
	.lit {
		background: color-mix(in oklab, var(--tag) 34%, transparent);
		box-shadow:
			inset 0 0 0 1px var(--tag),
			0 0 22px -2px color-mix(in oklab, var(--tag) 80%, transparent);
		color: white;
	}
</style>
