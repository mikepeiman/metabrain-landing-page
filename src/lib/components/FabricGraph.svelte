<script lang="ts">
	import { onMount } from 'svelte';

	/**
	 * One fabric: objects from every view, linked in a single graph.
	 * Nodes are HTML (crisp, selectable text) laid over an SVG of edges; both
	 * share a 100×H coordinate space so the layout scales with its container.
	 * Phones get a portrait arrangement of the same graph.
	 */
	type Hue = 'journal' | 'curatio' | 'workbench' | 'metachat';
	type Pos = Record<string, [x: number, y: number]>;

	const info: Record<string, { hue: Hue; type: string; title: string }> = {
		entry: { hue: 'journal', type: 'Journal entry', title: 'Call with Dana — pricing' },
		dana: { hue: 'metachat', type: 'Person', title: 'Dana' },
		msg: { hue: 'metachat', type: 'Message · SMS', title: '“Can we ship Friday?”' },
		page: { hue: 'curatio', type: 'Page', title: 'stripe.com/docs/billing' },
		task: { hue: 'workbench', type: 'Task', title: 'Wire up billing' },
		project: { hue: 'workbench', type: 'Project', title: 'Launch v1' }
	};

	const wide: { h: number; pos: Pos } = {
		h: 50,
		pos: {
			entry: [46, 17],
			dana: [13, 8],
			msg: [16, 41],
			page: [84, 8],
			task: [51, 43],
			project: [84, 34]
		}
	};

	const tall: { h: number; pos: Pos } = {
		h: 118,
		pos: {
			dana: [25, 8],
			page: [73, 8],
			entry: [50, 38],
			msg: [26, 74],
			project: [74, 74],
			task: [50, 108]
		}
	};

	const edges: [from: string, to: string, label: string][] = [
		['entry', 'dana', 'mentions'],
		['dana', 'msg', 'sent'],
		['entry', 'page', 'cites'],
		['entry', 'task', 'follow-up'],
		['entry', 'project', 'logged to'],
		['msg', 'task', 'about'],
		['task', 'project', 'part of'],
		['page', 'project', 'reference']
	];

	let narrow = $state(false);
	let layout = $derived(narrow ? tall : wide);
	let H = $derived(layout.h);
	let nodes = $derived(
		Object.fromEntries(
			Object.entries(info).map(([k, v]) => [k, { ...v, x: layout.pos[k][0], y: layout.pos[k][1] }])
		)
	);

	onMount(() => {
		const mq = matchMedia('(max-width: 639px)');
		const sync = () => (narrow = mq.matches);
		sync();
		mq.addEventListener('change', sync);
		return () => mq.removeEventListener('change', sync);
	});
</script>

<div class="fabric relative mx-auto w-full max-w-5xl" class:narrow style="aspect-ratio: 100 / {H}">
	<svg
		viewBox="0 0 100 {H}"
		preserveAspectRatio="none"
		class="absolute inset-0 h-full w-full"
		aria-hidden="true"
	>
		<defs>
			{#each edges as [a, b], i (i)}
				<linearGradient
					id="edge-{i}"
					gradientUnits="userSpaceOnUse"
					x1={nodes[a].x}
					y1={nodes[a].y}
					x2={nodes[b].x}
					y2={nodes[b].y}
				>
					<stop offset="0" stop-color="var(--color-{nodes[a].hue})" />
					<stop offset="1" stop-color="var(--color-{nodes[b].hue})" />
				</linearGradient>
			{/each}
		</defs>
		{#each edges as [a, b], i (i)}
			<line
				x1={nodes[a].x}
				y1={nodes[a].y}
				x2={nodes[b].x}
				y2={nodes[b].y}
				stroke="url(#edge-{i})"
				stroke-opacity="0.35"
				stroke-width="1"
				vector-effect="non-scaling-stroke"
			/>
			<line
				x1={nodes[a].x}
				y1={nodes[a].y}
				x2={nodes[b].x}
				y2={nodes[b].y}
				stroke="url(#edge-{i})"
				stroke-width="2"
				stroke-dasharray="4 8"
				stroke-linecap="round"
				vector-effect="non-scaling-stroke"
				class="animate-flow"
				style="animation-delay: {-i * 0.37}s"
			/>
		{/each}
	</svg>

	{#each edges as [a, b, label], i (i)}
		<span
			class="edge-label"
			style="left:{(nodes[a].x + nodes[b].x) / 2}%; top:{((nodes[a].y + nodes[b].y) / 2 / H) *
				100}%">{label}</span
		>
	{/each}

	{#each Object.entries(nodes) as [key, n] (key)}
		<div
			class="node"
			class:center={key === 'entry'}
			style="left:{n.x}%; top:{(n.y / H) * 100}%; --tag: var(--color-{n.hue})"
		>
			<span class="node-type"><span class="dot"></span>{n.type}</span>
			<span class="node-title">{n.title}</span>
		</div>
	{/each}
</div>

<style>
	.fabric {
		container-type: inline-size;
	}
	.narrow .node {
		max-width: 46cqw;
	}
	.narrow .node-title {
		font-size: 0.8rem;
	}
	.narrow .node-type {
		font-size: 0.58rem;
	}
	.node {
		position: absolute;
		translate: -50% -50%;
		display: flex;
		flex-direction: column;
		gap: 0.2rem;
		padding: clamp(0.45rem, 1.2cqw, 0.7rem) clamp(0.6rem, 1.6cqw, 0.95rem);
		border-radius: 0.8rem;
		background: color-mix(in oklab, var(--color-surface) 92%, transparent);
		border: 1px solid color-mix(in oklab, var(--tag) 35%, transparent);
		box-shadow:
			0 0 0 4px var(--color-ink),
			0 0 40px -12px color-mix(in oklab, var(--tag) 60%, transparent);
		white-space: nowrap;
		max-width: 34cqw;
	}
	.node.center {
		border-color: color-mix(in oklab, var(--tag) 60%, transparent);
		box-shadow:
			0 0 0 4px var(--color-ink),
			0 0 60px -8px color-mix(in oklab, var(--tag) 70%, transparent);
	}
	.node-type {
		display: flex;
		align-items: center;
		gap: 0.4rem;
		font-family: var(--font-mono);
		font-size: clamp(0.55rem, 1.05cqw, 0.66rem);
		letter-spacing: 0.08em;
		text-transform: uppercase;
		color: var(--tag);
	}
	.dot {
		width: 0.4rem;
		height: 0.4rem;
		border-radius: 999px;
		background: var(--tag);
	}
	.node-title {
		font-size: clamp(0.72rem, 1.55cqw, 0.95rem);
		color: var(--color-fg);
		overflow: hidden;
		text-overflow: ellipsis;
	}
	.edge-label {
		position: absolute;
		translate: -50% -50%;
		padding: 0.1rem 0.4rem;
		border-radius: 0.35rem;
		background: var(--color-ink);
		font-family: var(--font-mono);
		font-size: clamp(0.52rem, 1cqw, 0.64rem);
		color: var(--color-fg-3);
		white-space: nowrap;
	}
</style>
