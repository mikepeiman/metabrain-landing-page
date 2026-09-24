<script lang="ts">
	import { onMount } from 'svelte';
	import { whenVisible } from '$lib/reveal';

	type Hue = 'journal' | 'curatio' | 'workbench' | 'metachat';

	const views: { hue: Hue; name: string }[] = [
		{ hue: 'journal', name: 'Journal & Log' },
		{ hue: 'curatio', name: 'Curatio' },
		{ hue: 'workbench', name: 'Workbench' },
		{ hue: 'metachat', name: 'Metachat' }
	];

	// Each fragment of a scattered digital life, its scattered position (x, y in
	// %, rotation) and the view it lands in.
	const chips: { label: string; hue: Hue; s: [number, number, number] }[] = [
		{ label: 'Notes app', hue: 'journal', s: [14, 18, -8] },
		{ label: 'Fitness tracker', hue: 'journal', s: [70, 80, 6] },
		{ label: 'Habit app', hue: 'journal', s: [44, 58, -4] },
		{ label: '147 open tabs', hue: 'curatio', s: [52, 16, 5] },
		{ label: 'Bookmarks', hue: 'curatio', s: [18, 76, 9] },
		{ label: 'Read-later', hue: 'curatio', s: [84, 44, -10] },
		{ label: 'To-do list', hue: 'workbench', s: [80, 14, 12] },
		{ label: 'Kanban board', hue: 'workbench', s: [30, 38, 7] },
		{ label: 'Project folders', hue: 'workbench', s: [58, 88, -6] },
		{ label: 'SMS', hue: 'metachat', s: [8, 50, 4] },
		{ label: 'Skype', hue: 'metachat', s: [66, 34, -12] },
		{ label: 'Google Messages', hue: 'metachat', s: [36, 88, 3] }
	];

	let root: HTMLElement;
	let organised = $state(false);
	let narrow = $state(false);

	/** Organised layout: four columns, or a 2×2 grid of groups on narrow screens. */
	function place(hue: Hue, row: number): [number, number] {
		const col = views.findIndex((v) => v.hue === hue);
		if (!narrow) return [12.5 + col * 25, 34 + row * 22];
		return [25 + (col % 2) * 50, (col < 2 ? 17 : 63) + row * 11];
	}

	function header(col: number): [number, number] {
		if (!narrow) return [12.5 + col * 25, 12];
		return [25 + (col % 2) * 50, col < 2 ? 5 : 51];
	}

	onMount(() => {
		const mq = matchMedia('(max-width: 639px)');
		narrow = mq.matches;
		const onChange = () => (narrow = mq.matches);
		mq.addEventListener('change', onChange);
		whenVisible(root, 0.5).then(() => setTimeout(() => (organised = true), 700));
		return () => mq.removeEventListener('change', onChange);
	});
</script>

<div bind:this={root} class="panel relative overflow-hidden">
	<div class="flex items-center justify-between border-b border-line px-5 py-3">
		<span class="font-mono text-[0.68rem] tracking-[0.14em] text-fg-4 uppercase">
			{organised ? 'In Metabrain' : 'Today'}
		</span>
		<div
			class="flex rounded-lg border border-line-2 p-0.5 text-[0.72rem]"
			role="group"
			aria-label="Compare"
		>
			<button
				type="button"
				class={[
					'rounded-md px-2.5 py-1 transition',
					!organised ? 'bg-surface-3 text-fg' : 'text-fg-3 hover:text-fg-2'
				]}
				aria-pressed={!organised}
				onclick={() => (organised = false)}>Scattered</button
			>
			<button
				type="button"
				class={[
					'rounded-md px-2.5 py-1 transition',
					organised ? 'bg-surface-3 text-fg' : 'text-fg-3 hover:text-fg-2'
				]}
				aria-pressed={organised}
				onclick={() => (organised = true)}>One fabric</button
			>
		</div>
	</div>

	<div class="relative h-[22rem] sm:h-[20rem]">
		{#each views as v, col (v.hue)}
			{@const [hx, hy] = header(col)}
			<div
				class="absolute -translate-x-1/2 font-mono text-[0.66rem] tracking-[0.12em] whitespace-nowrap uppercase transition-all duration-700"
				style="left:{hx}%; top:{hy}%; color: var(--color-{v.hue}); opacity:{organised
					? 1
					: 0}; transition-delay:{organised ? 500 + col * 80 : 0}ms"
			>
				{v.name}
			</div>
		{/each}

		{#each chips as c, i (c.label)}
			{@const row = chips.filter((x) => x.hue === c.hue).indexOf(c)}
			{@const [ox, oy] = place(c.hue, row)}
			<span
				class="chip absolute flex -translate-x-1/2 -translate-y-1/2 items-center gap-2 rounded-lg border px-3 py-1.5 text-[0.8rem] whitespace-nowrap"
				style="--tag: var(--color-{c.hue}); left:{organised ? ox : c.s[0]}%; top:{organised
					? oy
					: c.s[1]}%; rotate:{organised ? 0 : c.s[2]}deg; transition-delay:{organised
					? i * 35
					: 0}ms"
				class:organised
			>
				<span class="dot size-1.5 rounded-full"></span>
				{c.label}
			</span>
		{/each}
	</div>
</div>

<style>
	.chip {
		color: var(--color-fg-3);
		background: var(--color-surface-2);
		border-color: var(--color-line-2);
		transition:
			left 1.1s var(--ease-out-expo),
			top 1.1s var(--ease-out-expo),
			rotate 1.1s var(--ease-out-expo),
			color 0.6s,
			border-color 0.6s,
			background 0.6s;
	}
	.chip .dot {
		background: var(--color-fg-4);
		transition: background 0.6s;
	}
	.chip.organised {
		color: var(--color-fg);
		border-color: color-mix(in oklab, var(--tag) 30%, transparent);
		background: color-mix(in oklab, var(--tag) 8%, var(--color-surface-2));
	}
	.chip.organised .dot {
		background: var(--tag);
	}
</style>
