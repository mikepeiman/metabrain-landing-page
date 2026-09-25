<script lang="ts">
	import { onMount } from 'svelte';
	import { whenVisible } from '$lib/reveal';
	import TagPill from './TagPill.svelte';

	/**
	 * One tag, every surface. An animated walkthrough: a single project metatag
	 * is attached in Notes, Web and Communications; the project gathers
	 * everything; Review rolls it up. Strands are measured from the live DOM so
	 * they stay attached at any width.
	 */
	type LinkKey = 'note' | 'web' | 'msg' | 'project' | 'review';

	const TAG = 'launch-v1';

	const steps: { key: LinkKey; hue: string; label: string }[] = [
		{ key: 'note', hue: 'notes', label: 'Tag a note as you write' },
		{ key: 'web', hue: 'web', label: 'Tag a page in your browser' },
		{ key: 'msg', hue: 'comms', label: 'Tag a message, make it a task' },
		{ key: 'project', hue: 'projects', label: 'The project gathers it all' },
		{ key: 'review', hue: 'review', label: 'Review everything at once' }
	];

	const strandHue: Record<LinkKey, string> = {
		note: 'var(--color-notes)',
		web: 'var(--color-web)',
		msg: 'var(--color-comms)',
		project: 'var(--color-projects)',
		review: 'var(--color-fg)'
	};

	let step = $state(-1);
	let typed = $state<string | null>(null);
	let notePill = $state(false);
	let webHint = $state(false);
	let webPill = $state(false);
	let msgPill = $state(false);
	let task = $state(false);
	let reviewShown = $state(0);
	let linked = $state<Record<LinkKey, boolean>>({
		note: false,
		web: false,
		msg: false,
		project: false,
		review: false
	});

	let linkCount = $derived([linked.note, linked.web, linked.msg, task].filter(Boolean).length);

	const reviewStats = [
		{ value: '4', label: 'linked items across 3 views' },
		{ value: '1', label: 'task due Friday' },
		{ value: '6.5h', label: 'logged this week' },
		{ value: '+1.5h', label: 'over estimate on billing' }
	];

	let stage: HTMLElement;
	let hub: HTMLElement;
	let noteRow: HTMLElement;
	let webRow: HTMLElement;
	let msgRow: HTMLElement;
	let taskRow: HTMLElement;
	let reviewPanel: HTMLElement;

	let paths = $state<Record<LinkKey, string>>({
		note: '',
		web: '',
		msg: '',
		project: '',
		review: ''
	});

	/** Route each strand from its row's panel edge into the hub. */
	function measure() {
		if (!stage || !hub) return;
		const s = stage.getBoundingClientRect();
		const h = hub.getBoundingClientRect();
		const hx = h.left + h.width / 2 - s.left;
		const hy = h.top + h.height / 2 - s.top;

		const fromRow = (row: HTMLElement) => {
			const r = row.getBoundingClientRect();
			const panel = (row.closest('[data-panel]') as HTMLElement).getBoundingClientRect();
			const leftOfHub = panel.left + panel.width / 2 < hx + s.left;
			const x = (leftOfHub ? panel.right : panel.left) - s.left;
			const y = r.top + r.height / 2 - s.top;
			const mx = (x + hx) / 2;
			return `M${x},${y} C${mx},${y} ${mx},${hy} ${hx},${hy}`;
		};

		const rv = reviewPanel.getBoundingClientRect();
		paths = {
			note: fromRow(noteRow),
			web: fromRow(webRow),
			msg: fromRow(msgRow),
			project: fromRow(taskRow),
			review: `M${hx},${hy} L${hx},${rv.top - s.top}`
		};
	}

	onMount(() => {
		let alive = true;
		let visible = false;
		let wake: (() => void) | null = null;

		const io = new IntersectionObserver(([e]) => {
			visible = e.isIntersecting;
			if (visible) wake?.();
		});
		io.observe(stage);

		const ro = new ResizeObserver(() => measure());
		ro.observe(stage);
		document.fonts?.ready.then(measure);
		measure();

		const sleep = async (ms: number) => {
			await new Promise((r) => setTimeout(r, ms));
			while (alive && (!visible || document.hidden)) {
				await new Promise<void>((r) => {
					wake = r;
					setTimeout(r, 500);
				});
			}
			if (!alive) throw new Error('stopped');
		};

		const reset = () => {
			step = -1;
			typed = null;
			notePill = webHint = webPill = msgPill = task = false;
			reviewShown = 0;
			linked = { note: false, web: false, msg: false, project: false, review: false };
		};

		const settle = () => {
			step = 4;
			notePill = webPill = msgPill = task = true;
			reviewShown = reviewStats.length;
			linked = { note: true, web: true, msg: true, project: true, review: true };
		};

		async function run() {
			await whenVisible(stage, 0.3);
			for (;;) {
				reset();
				await sleep(900);

				step = 0;
				await sleep(700);
				typed = '';
				for (const ch of TAG) {
					typed += ch;
					await sleep(70);
				}
				await sleep(380);
				typed = null;
				notePill = true;
				await sleep(250);
				linked.note = true;
				await sleep(1700);

				step = 1;
				await sleep(600);
				webHint = true;
				await sleep(750);
				webHint = false;
				webPill = true;
				await sleep(250);
				linked.web = true;
				await sleep(1700);

				step = 2;
				await sleep(600);
				msgPill = true;
				await sleep(250);
				linked.msg = true;
				await sleep(1200);
				task = true;
				await sleep(1700);

				step = 3;
				await sleep(400);
				linked.project = true;
				await sleep(2200);

				step = 4;
				linked.review = true;
				await sleep(600);
				for (let i = 1; i <= reviewStats.length; i++) {
					reviewShown = i;
					await sleep(380);
				}
				await sleep(4200);
			}
		}

		if (matchMedia('(prefers-reduced-motion: reduce)').matches) settle();
		else run().catch(() => {});

		return () => {
			alive = false;
			wake?.();
			io.disconnect();
			ro.disconnect();
		};
	});
</script>

<!-- Steps -->
<ol class="mb-8 flex flex-wrap justify-center gap-2 sm:mb-10" aria-label="How one tag connects">
	{#each steps as s, i (s.key)}
		<li
			class={[
				'flex items-center gap-2.5 rounded-full border px-3.5 py-1.5 text-[0.85rem] transition-all duration-500',
				step === i ? 'border-line-3 bg-surface-2 text-fg' : 'border-line text-fg-3',
				step > i && 'text-fg-2'
			]}
			style="--tag: {s.hue === 'review' ? 'var(--color-fg)' : `var(--color-${s.hue})`}"
		>
			<span
				class={[
					'grid size-5 place-items-center rounded-full font-mono text-[0.66rem] transition-colors duration-500',
					step >= i ? 'step-dot-on' : 'bg-surface-3 text-fg-3'
				]}
				class:review={s.hue === 'review'}>{step > i ? '✓' : i + 1}</span
			>
			{s.label}
		</li>
	{/each}
</ol>

<div
	bind:this={stage}
	class="relative grid gap-5 lg:grid-cols-[1fr_17rem_1fr] lg:gap-x-0 lg:gap-y-7"
>
	<!-- Strands -->
	<svg
		class="pointer-events-none absolute inset-0 z-0 hidden h-full w-full lg:block"
		aria-hidden="true"
	>
		{#each Object.keys(paths) as k (k)}
			{@const key = k as LinkKey}
			{#if paths[key]}
				<path
					d={paths[key]}
					pathLength="1"
					fill="none"
					stroke={strandHue[key]}
					stroke-opacity="0.55"
					stroke-width="2"
					stroke-linecap="round"
					class="strand"
					style="stroke-dashoffset: {linked[key] ? 0 : 1}"
				/>
				{#if linked[key]}
					{#each [0, 0.8, 1.6] as delay (delay)}
						<circle r="3.2" fill={strandHue[key]} class="spark">
							<animateMotion
								dur="2.4s"
								begin="{delay}s"
								repeatCount="indefinite"
								path={paths[key]}
								keyPoints="0;1"
								keyTimes="0;1"
								calcMode="linear"
							/>
						</circle>
					{/each}
				{/if}
			{/if}
		{/each}
	</svg>

	<!-- Notes -->
	<div
		data-panel
		class={['tw-panel lg:col-start-1 lg:row-start-1', step === 0 && 'active']}
		style="--tag: var(--color-notes)"
	>
		<div class="tw-head">
			<span class="tw-label text-notes"><span class="dot"></span>Notes</span>
			<span class="tw-meta">Wed 24 Sep</span>
		</div>
		<ul class="space-y-3">
			<li class="tw-row">
				<time class="tw-time">07:42</time>
				<span>Garage session, bar felt light <TagPill tag="workout" values={['100 kg']} /></span>
			</li>
			<li class="tw-row">
				<time class="tw-time">13:05</time>
				<span>Chapter 4 — stocks, flows, delays <TagPill tag="book" values={['38 pp']} /></span>
			</li>
			<li bind:this={noteRow} class={['tw-row', step === 0 && 'hl']}>
				<time class="tw-time">09:15</time>
				<span
					>Call with Dana — annual pricing? {#if notePill}<span class="pop"
							><TagPill tag={TAG} hue="projects" /></span
						>{:else if typed !== null}<span class="font-mono text-[0.9em] text-projects"
							>#{typed}</span
						><span
							class="ml-px inline-block h-[1.05em] w-[2px] translate-y-[0.18em] animate-caret bg-projects"
						></span>{/if}</span
				>
			</li>
		</ul>
	</div>

	<!-- Web -->
	<div
		data-panel
		class={['tw-panel lg:col-start-3 lg:row-start-1', step === 1 && 'active']}
		style="--tag: var(--color-web)"
	>
		<div class="tw-head">
			<span class="tw-label text-web"><span class="dot"></span>Web</span>
			<span class="tw-meta">Launch research · 3 tabs</span>
		</div>
		<ul class="space-y-1.5">
			<li bind:this={webRow} class={['tw-row items-center', step === 1 && 'hl']}>
				<span class="favicon" style="background: oklch(0.75 0.12 262)">S</span>
				<span class="min-w-0 flex-1 truncate">Billing — Stripe Docs</span>
				<span class="relative shrink-0">
					<span
						class={[
							'absolute inset-y-0 right-0 flex items-center rounded-md border px-2 font-mono text-[0.72rem] transition-all duration-300',
							webHint
								? 'border-web/60 bg-web/15 text-web opacity-100'
								: 'border-line-2 text-fg-4 opacity-0'
						]}>+ #</span
					>
					<span
						class={[
							'inline-block transition-all duration-300',
							webPill ? 'opacity-100' : 'scale-75 opacity-0'
						]}><TagPill tag={TAG} hue="projects" /></span
					>
				</span>
			</li>
			<li class="tw-row items-center">
				<span class="favicon" style="background: oklch(0.75 0.12 0)">G</span>
				<span class="truncate">metabrain · issues #412</span>
			</li>
			<li class="tw-row items-center text-fg-3">
				<span class="favicon" style="background: oklch(0.75 0.12 25)">Y</span>
				<span class="flex-1 truncate">Pricing psychology (talk)</span>
				<span class="font-mono text-[0.66rem] text-fg-4">saved</span>
			</li>
		</ul>
	</div>

	<!-- Hub: the tag itself -->
	<div
		class="relative z-20 flex items-center justify-center py-2 lg:col-start-2 lg:row-span-2 lg:row-start-1"
	>
		<div bind:this={hub} class={['hub', linked.note && 'on']}>
			{#key linkCount}
				<span class="hub-ring" aria-hidden="true"></span>
			{/key}
			<span class="font-mono text-[1.2rem] text-fg">#{TAG}</span>
			<span class="mt-1 font-mono text-[0.62rem] tracking-[0.14em] text-projects uppercase"
				>Project metatag</span
			>
			<span class="mt-2 text-[0.8rem] text-fg-3" aria-live="polite">
				{linkCount} linked {linkCount === 1 ? 'item' : 'items'}
			</span>
		</div>
	</div>

	<!-- Communications -->
	<div
		data-panel
		class={['tw-panel lg:col-start-1 lg:row-start-2', step === 2 && 'active']}
		style="--tag: var(--color-comms)"
	>
		<div class="tw-head">
			<span class="tw-label text-comms"><span class="dot"></span>Communications</span>
			<span class="tw-meta">SMS · Messages · Skype</span>
		</div>
		<ul class="space-y-3.5">
			<li bind:this={msgRow} class={['tw-row flex-col items-start gap-2', step === 2 && 'hl']}>
				<span class="flex items-center gap-2 font-mono text-[0.68rem] text-fg-4">
					<span class="avatar">D</span>Dana · SMS · 10:02
				</span>
				<span class="flex flex-wrap items-center gap-2">
					<span class="rounded-2xl bg-comms/12 px-3 py-1.5 text-fg">Can we ship Friday?</span>
					<span
						class={['transition-all duration-300', msgPill ? 'opacity-100' : 'scale-75 opacity-0']}
						><TagPill tag={TAG} hue="projects" /></span
					>
					<span
						class={[
							'rounded-md border border-projects/40 bg-projects/10 px-2 py-0.5 font-mono text-[0.7rem] text-projects transition-all duration-500',
							task ? 'opacity-100' : 'translate-x-2 opacity-0'
						]}>→ task · due Fri</span
					>
				</span>
			</li>
			<li class="tw-row flex-col items-start gap-2 text-fg-3">
				<span class="flex items-center gap-2 font-mono text-[0.68rem] text-fg-4">
					<span class="avatar">A</span>Alex · Messages · 09:40
				</span>
				<span class="rounded-2xl bg-surface-3 px-3 py-1.5">Photos from Saturday are up</span>
			</li>
		</ul>
	</div>

	<!-- Projects -->
	<div
		data-panel
		class={['tw-panel lg:col-start-3 lg:row-start-2', step === 3 && 'active']}
		style="--tag: var(--color-projects)"
	>
		<div class="tw-head">
			<span class="tw-label text-projects"><span class="dot"></span>Projects</span>
			<span
				class="flex items-center gap-1.5 rounded-full bg-ok/10 px-2 py-0.5 text-[0.7rem] text-ok"
			>
				<span class="size-1.5 animate-pulse-soft rounded-full bg-current"></span>Running
			</span>
		</div>
		<div class="mb-3 flex items-center gap-2.5">
			<span class="text-[1.02rem] font-medium text-fg">Launch v1</span>
			<TagPill tag={TAG} hue="projects" />
		</div>
		<div class="mb-4 grid grid-cols-4 gap-2 text-center">
			{#each [['Notes', linked.note ? 1 : 0, 'notes'], ['Pages', linked.web ? 1 : 0, 'web'], ['Messages', linked.msg ? 1 : 0, 'comms'], ['Tasks', task ? 13 : 12, 'projects']] as [label, n, hue] (label)}
				<div class="rounded-lg border border-line bg-ink-2/60 px-1 py-2">
					{#key n}
						<div class="count font-mono text-[1.05rem]" style="color: var(--color-{hue})">{n}</div>
					{/key}
					<div class="text-[0.66rem] text-fg-3">{label}</div>
				</div>
			{/each}
		</div>
		<ul class="space-y-1.5">
			<li class="tw-row items-center text-fg-3">
				<span class="box done">✓</span><span class="line-through decoration-fg-4"
					>Wire up billing</span
				>
			</li>
			<li
				bind:this={taskRow}
				class={[
					'tw-row items-center transition-all duration-500',
					task ? 'opacity-100' : 'opacity-0',
					step === 3 && 'hl'
				]}
			>
				<span class="box"></span>
				<span class="flex-1">Ship billing</span>
				<span class="font-mono text-[0.68rem] text-fg-3">due Fri · from Dana</span>
			</li>
		</ul>
	</div>

	<!-- Review -->
	<div
		data-panel
		bind:this={reviewPanel}
		class={['tw-panel review lg:col-span-3 lg:row-start-3', step === 4 && 'active']}
	>
		<div class="tw-head">
			<span class="tw-label"
				><span class="dot review-dot"></span><span class="text-gradient">Review</span></span
			>
			<span class="tw-meta">#{TAG} · this week</span>
		</div>
		<ul class="grid grid-cols-2 gap-3 md:grid-cols-4">
			{#each reviewStats as r, i (r.label)}
				<li
					class={[
						'rounded-xl border border-line bg-ink-2/60 px-4 py-3 transition-all duration-500',
						reviewShown > i ? 'opacity-100' : 'translate-y-1 opacity-25'
					]}
				>
					<div class="font-mono text-[1.35rem] text-fg">{r.value}</div>
					<div class="mt-0.5 text-[0.8rem] text-fg-3">{r.label}</div>
				</li>
			{/each}
		</ul>
	</div>
</div>

<style>
	.tw-panel {
		position: relative;
		z-index: 10;
		padding: 1.25rem 1.35rem 1.35rem;
		border-radius: 1.1rem;
		background: var(--color-surface);
		border: 1px solid var(--color-line);
		box-shadow: 0 30px 70px -35px rgb(0 0 0 / 0.9);
		transition:
			border-color 0.5s,
			box-shadow 0.5s;
		font-size: 0.95rem;
	}
	.tw-panel.active {
		border-color: color-mix(in oklab, var(--tag) 55%, transparent);
		box-shadow:
			0 0 0 1px color-mix(in oklab, var(--tag) 20%, transparent),
			0 0 60px -20px color-mix(in oklab, var(--tag) 55%, transparent);
	}
	.tw-panel.review {
		--tag: var(--color-fg);
		border-color: transparent;
		background:
			linear-gradient(var(--color-surface), var(--color-surface)) padding-box,
			linear-gradient(
					100deg,
					color-mix(in oklab, var(--color-notes) 40%, transparent),
					color-mix(in oklab, var(--color-comms) 40%, transparent),
					color-mix(in oklab, var(--color-projects) 40%, transparent),
					color-mix(in oklab, var(--color-web) 40%, transparent)
				)
				border-box;
	}
	.tw-panel.review.active {
		box-shadow: 0 0 70px -25px color-mix(in oklab, var(--color-projects) 60%, transparent);
	}
	.tw-head {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 1rem;
		margin-bottom: 1rem;
	}
	.tw-label {
		display: flex;
		align-items: center;
		gap: 0.55rem;
		font-family: var(--font-mono);
		font-size: 0.74rem;
		letter-spacing: 0.12em;
		text-transform: uppercase;
	}
	.dot {
		width: 0.5rem;
		height: 0.5rem;
		border-radius: 999px;
		background: var(--tag);
	}
	.review-dot {
		background: var(--spectrum);
	}
	.tw-meta {
		font-family: var(--font-mono);
		font-size: 0.7rem;
		color: var(--color-fg-4);
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}
	.tw-row {
		display: flex;
		gap: 0.75rem;
		padding: 0.5rem 0.6rem;
		margin: 0 -0.6rem;
		border-radius: 0.6rem;
		line-height: 1.55;
		color: var(--color-fg-2);
		transition: background 0.5s;
	}
	.tw-row.hl {
		background: color-mix(in oklab, var(--tag) 9%, transparent);
	}
	.tw-time {
		width: 2.6rem;
		flex-shrink: 0;
		padding-top: 0.15rem;
		font-family: var(--font-mono);
		font-size: 0.7rem;
		color: var(--color-fg-4);
	}
	.favicon {
		display: grid;
		place-items: center;
		width: 1.05rem;
		height: 1.05rem;
		flex-shrink: 0;
		border-radius: 0.25rem;
		font-size: 0.6rem;
		font-weight: 700;
		color: var(--color-ink);
	}
	.avatar {
		display: grid;
		place-items: center;
		width: 1.35rem;
		height: 1.35rem;
		border-radius: 999px;
		background: color-mix(in oklab, var(--color-comms) 18%, transparent);
		color: var(--color-comms);
		font-size: 0.65rem;
		font-weight: 600;
	}
	.box {
		display: inline-grid;
		place-items: center;
		width: 1rem;
		height: 1rem;
		flex-shrink: 0;
		border-radius: 0.25rem;
		border: 1px solid var(--color-line-3);
		font-size: 0.62rem;
	}
	.box.done {
		border-color: transparent;
		background: color-mix(in oklab, var(--color-ok) 25%, transparent);
		color: var(--color-ok);
	}

	.hub {
		position: relative;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		width: 11.5rem;
		height: 11.5rem;
		border-radius: 999px;
		background: radial-gradient(circle at 50% 35%, var(--color-surface-3), var(--color-surface));
		border: 1px dashed var(--color-line-3);
		opacity: 0.55;
		transition:
			opacity 0.6s,
			border-color 0.6s,
			box-shadow 0.6s;
	}
	.hub.on {
		opacity: 1;
		border: 1px solid color-mix(in oklab, var(--color-projects) 70%, transparent);
		box-shadow:
			0 0 0 6px var(--color-ink),
			0 0 90px -10px color-mix(in oklab, var(--color-projects) 65%, transparent);
	}
	.hub-ring {
		position: absolute;
		inset: -1px;
		border-radius: inherit;
		border: 2px solid var(--color-projects);
		opacity: 0;
		animation: ring 1.1s var(--ease-out-expo);
	}
	.hub:not(.on) .hub-ring {
		display: none;
	}
	@keyframes ring {
		from {
			opacity: 0.9;
			transform: scale(1);
		}
		to {
			opacity: 0;
			transform: scale(1.35);
		}
	}

	.strand {
		stroke-dasharray: 1;
		transition: stroke-dashoffset 0.9s var(--ease-out-expo);
	}
	.spark {
		filter: drop-shadow(0 0 4px currentColor);
	}
	.pop {
		display: inline-block;
		animation: pop 0.45s var(--ease-out-expo);
	}
	.count {
		animation: pop 0.5s var(--ease-out-expo);
	}
	@keyframes pop {
		from {
			transform: scale(0.6);
			opacity: 0;
		}
		to {
			transform: none;
			opacity: 1;
		}
	}
	.step-dot-on {
		background: var(--tag);
		color: var(--color-ink);
	}
	.step-dot-on.review {
		background: var(--spectrum);
	}
</style>
