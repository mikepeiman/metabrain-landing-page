<script lang="ts">
	import { onMount } from 'svelte';
	import { reveal, whenVisible } from '$lib/reveal';
	import { tagFocus } from '$lib/tagFocus.svelte';
	import TagPill from './TagPill.svelte';

	/** The one metatag threaded through every card. */
	const SHARED = 'launch-v1';

	const notes = [
		{ t: '06:40', text: 'Up before the alarm.', tag: 'mood', values: ['4 / 5'] },
		{
			t: '07:42',
			text: 'Garage session, bar felt light',
			tag: 'workout',
			values: ['squat · 5×5 · 100 kg']
		},
		{ t: '09:15', text: 'Call with Dana — annual pricing?', tag: SHARED, values: [] },
		{ t: '22:10', text: 'Tired but clear. Good day overall.', tag: 'mood', values: ['4 / 5'] }
	];

	const pinned = [
		['water', '×6'],
		['coffee', '×2'],
		['meds', '✓'],
		['push-ups', '×40']
	];

	const tree = [
		{ kind: 'win', title: 'Launch research', meta: '3 tabs · live', live: true, open: true },
		{
			kind: 'tab',
			site: 'stripe.com',
			title: 'Billing — Stripe Docs',
			live: true,
			hue: 262,
			tag: true
		},
		{ kind: 'tab', site: 'github.com', title: 'metabrain · issues #412', live: true, hue: 0 },
		{
			kind: 'tab',
			site: 'youtube.com',
			title: 'Pricing psychology (talk)',
			live: false,
			hue: 25,
			hit: true
		},
		{ kind: 'win', title: 'Thesis sources', meta: '24 tabs · sleeping', live: false, open: false },
		{ kind: 'win', title: 'Tuesday reading', meta: '6 tabs · saved', live: false, open: false }
	];

	const projects = [
		{
			name: 'Launch v1',
			hue: 292,
			status: 'Running',
			state: 'ok',
			done: 8,
			total: 12,
			env: 'Code · Terminal · Chrome',
			tag: true
		},
		{
			name: 'Thesis',
			hue: 240,
			status: 'Paused 3 days',
			state: 'idle',
			done: 14,
			total: 31,
			env: 'Zotero · Notes'
		},
		{
			name: 'Garage gym',
			hue: 130,
			status: 'Waiting on parts',
			state: 'warn',
			done: 3,
			total: 5,
			env: 'Sheets'
		}
	];

	const messages = [
		{ year: '2016', ch: 'Skype', text: 'Congrats on the new job!!', me: false, tag: false },
		{ year: '2021', ch: 'SMS', text: 'Coffee Thursday? Usual place', me: true, tag: false },
		{ year: 'Today', ch: 'Messages', text: 'Can we ship Friday?', me: false, tag: true }
	];

	const hours = [
		{ name: 'Launch v1', h: 6.5, hue: 292 },
		{ name: 'Thesis', h: 3, hue: 240 },
		{ name: 'Garage gym', h: 2, hue: 130 }
	];

	const sleep = [7.4, 6.9, 7.8, 5.6, 7.2, 6.6, 7.5, 8.1, 6.2, 7.0, 7.7, 5.5, 6.8, 7.6];
	const mood = [4, 3.5, 4, 2.5, 3.5, 3, 4, 4.5, 3, 3.5, 4, 2, 3, 4];

	const estimates = [
		{ task: 'Wire up billing', est: 3, act: 4.5 },
		{ task: 'Pricing page', est: 2, act: 1.5 },
		{ task: 'Onboarding email', est: 1, act: 1 }
	];

	let root: HTMLElement;

	onMount(() => {
		// Light the shared tag up once when the grid arrives, as a hint to hover it.
		let timer: ReturnType<typeof setTimeout>;
		whenVisible(root, 0.25).then(() => {
			timer = setTimeout(() => {
				if (tagFocus.tag) return;
				tagFocus.tag = SHARED;
				timer = setTimeout(() => {
					if (tagFocus.tag === SHARED) tagFocus.tag = null;
				}, 2600);
			}, 900);
		});
		return () => clearTimeout(timer);
	});
</script>

<div bind:this={root} class="grid gap-4 md:grid-cols-2 lg:grid-cols-6 lg:gap-5">
	<!-- Notes -->
	<article
		{@attach reveal()}
		class="panel relative overflow-hidden p-6 md:col-span-2 md:p-7 lg:col-span-4"
		style="--tag: var(--color-notes)"
	>
		<div class="view-glow"></div>
		<header class="relative mb-6 max-w-lg">
			<p class="view-label text-notes">Notes</p>
			<h3 class="display mt-3 text-[1.85rem] sm:text-[2.1rem]">
				Write and log at the speed of thought.
			</h3>
			<p class="mt-3 text-[0.95rem] leading-relaxed text-fg-2">
				Keep a free-flowing journal in Markdown that saves as you type and mirrors to plain files
				you own — or log in a keystroke with pinned metatags, one-tap records and a global
				<span class="kbd h-5 min-w-0 text-[0.65rem]">Alt</span>
				<span class="kbd h-5 min-w-0 text-[0.65rem]">Space</span> dock that works from any app.
			</p>
		</header>
		<div class="relative grid gap-3 sm:grid-cols-[1fr_11rem]">
			<ul class="space-y-3 rounded-xl border border-line bg-ink-2/60 p-4">
				{#each notes as e (e.t)}
					<li class="flex gap-3 text-[0.86rem] leading-relaxed text-fg-2">
						<span class="w-10 shrink-0 pt-0.5 font-mono text-[0.66rem] text-fg-4">{e.t}</span>
						<span>
							{e.text}
							{#if e.tag === SHARED}
								<TagPill tag={SHARED} hue="projects" linked />
							{:else}
								<TagPill tag={e.tag} values={e.values} />
							{/if}
						</span>
					</li>
				{/each}
			</ul>
			<div class="rounded-xl border border-line bg-ink-2/60 p-4">
				<p class="mb-3 font-mono text-[0.62rem] tracking-[0.14em] text-fg-4 uppercase">Quick log</p>
				<div class="grid grid-cols-2 gap-2">
					{#each pinned as [p, n] (p)}
						<span
							class="flex h-12 flex-col items-center justify-center rounded-lg border border-line-2 bg-surface-2 font-mono text-[0.7rem] text-fg-2"
						>
							#{p}
							<span class="text-[0.6rem] text-fg-4">{n}</span>
						</span>
					{/each}
				</div>
			</div>
		</div>
	</article>

	<!-- Projects -->
	<article
		{@attach reveal(80)}
		class="panel relative overflow-hidden p-6 md:col-span-2 md:p-7 lg:col-span-2"
		style="--tag: var(--color-projects)"
	>
		<div class="view-glow"></div>
		<header class="relative mb-6">
			<p class="view-label text-projects">Projects</p>
			<h3 class="display mt-3 text-[1.85rem]">A command centre for every project.</h3>
			<p class="mt-3 text-[0.95rem] leading-relaxed text-fg-2">
				All of life is a project. Each one gathers its tasks, notes, pages and messages, and
				relaunches its whole workspace — apps, windows and layout — right where you left off.
			</p>
		</header>
		<ul class="relative grid gap-2.5">
			{#each projects as p (p.name)}
				<li
					class="grid grid-cols-[auto_1fr_auto] items-center gap-x-3 gap-y-2 rounded-xl border border-line bg-ink-2/60 px-4 py-3"
					style="--p: oklch(0.74 0.14 {p.hue})"
				>
					<span class="size-2.5 rounded-full" style="background: var(--p)"></span>
					<span class="min-w-0">
						<span class="flex items-center gap-2 text-[0.88rem] font-medium text-fg">
							<span class="truncate">{p.name}</span>
							{#if p.tag}<TagPill tag={SHARED} hue="projects" linked />{/if}
						</span>
						<span class="block truncate font-mono text-[0.62rem] text-fg-4">{p.env}</span>
					</span>
					<span
						class={[
							'flex items-center gap-1.5 rounded-full px-2 py-0.5 text-[0.66rem] whitespace-nowrap',
							p.state === 'ok' && 'bg-ok/10 text-ok',
							p.state === 'warn' && 'bg-warn/10 text-warn',
							p.state === 'idle' && 'bg-surface-3 text-fg-3'
						]}
					>
						<span
							class={['size-1.5 rounded-full bg-current', p.state === 'ok' && 'animate-pulse-soft']}
						></span>
						{p.status}
					</span>
					<span class="col-span-3 flex items-center gap-3">
						<span class="h-1 flex-1 overflow-hidden rounded-full bg-surface-3">
							<span
								class="block h-full rounded-full"
								style="width:{(p.done / p.total) * 100}%; background: var(--p)"
							></span>
						</span>
						<span class="font-mono text-[0.62rem] text-fg-4">{p.done}/{p.total}</span>
						<span class="rounded-md border border-line-2 px-2 py-0.5 text-[0.66rem] text-fg-2"
							>Resume ↵</span
						>
					</span>
				</li>
			{/each}
		</ul>
	</article>

	<!-- Web -->
	<article
		{@attach reveal()}
		class="panel relative overflow-hidden p-6 md:p-7 lg:col-span-3"
		style="--tag: var(--color-web)"
	>
		<div class="view-glow"></div>
		<header class="relative mb-6">
			<p class="view-label text-web">Web</p>
			<h3 class="display mt-3 text-[1.85rem]">Close tabs without losing the thread.</h3>
			<p class="mt-3 text-[0.95rem] leading-relaxed text-fg-2">
				Every window and tab as one living outline. Put a research session to sleep, wake it
				tomorrow, tag any page into a project — and find the one you saw once, months ago.
			</p>
		</header>
		<div class="relative rounded-xl border border-line bg-ink-2/60 p-3">
			<div
				class="mb-2 flex items-center gap-2 rounded-lg border border-line-2 bg-surface-2 px-3 py-2 font-mono text-[0.72rem] text-fg-2"
			>
				<svg viewBox="0 0 16 16" class="size-3.5 text-fg-4" fill="none" aria-hidden="true"
					><circle cx="7" cy="7" r="4.5" stroke="currentColor" stroke-width="1.5" /><path
						d="m10.5 10.5 3 3"
						stroke="currentColor"
						stroke-width="1.5"
						stroke-linecap="round"
					/></svg
				>
				that pricing talk<span class="animate-caret text-web">▍</span>
			</div>
			<ul class="space-y-0.5 text-[0.8rem]">
				{#each tree as row, i (i)}
					{#if row.kind === 'win'}
						<li class="flex items-center gap-2 rounded-md px-2 py-1.5 text-fg">
							<span class="w-3 text-fg-4">{row.open ? '▾' : '▸'}</span>
							<span class={['size-2 rounded-sm', row.live ? 'bg-web' : 'border border-fg-4']}
							></span>
							<span class="truncate font-medium">{row.title}</span>
							<span class="ml-auto shrink-0 font-mono text-[0.6rem] text-fg-4">{row.meta}</span>
						</li>
					{:else}
						<li
							class={[
								'ml-5 flex items-center gap-2 rounded-md px-2 py-1.5',
								row.hit ? 'bg-web/12 ring-1 ring-web/40' : '',
								row.live ? 'text-fg-2' : 'text-fg-3'
							]}
						>
							<span
								class="grid size-3.5 shrink-0 place-items-center rounded-[3px] text-[0.5rem] font-bold text-ink"
								style="background: oklch(0.75 0.12 {row.hue})">{row.site?.[0]}</span
							>
							<span class="truncate">{row.title}</span>
							{#if row.tag}<span class="ml-auto shrink-0"
									><TagPill tag={SHARED} hue="projects" linked /></span
								>{/if}
							{#if !row.live}<span class="ml-auto shrink-0 font-mono text-[0.58rem] text-fg-4"
									>saved</span
								>{/if}
						</li>
					{/if}
				{/each}
			</ul>
		</div>
	</article>

	<!-- Communications -->
	<article
		{@attach reveal(80)}
		class="panel relative overflow-hidden p-6 md:p-7 lg:col-span-3"
		style="--tag: var(--color-comms)"
	>
		<div class="view-glow"></div>
		<header class="relative mb-6">
			<p class="view-label text-comms">Communications</p>
			<h3 class="display mt-3 text-[1.85rem]">Every conversation, one timeline.</h3>
			<p class="mt-3 text-[0.95rem] leading-relaxed text-fg-2">
				Your SMS, Skype and Google Messages history in one searchable record. Tag a message into a
				project, turn it into a task, and keep people linked to everything you share.
			</p>
		</header>
		<div class="relative rounded-xl border border-line bg-ink-2/60 p-4">
			<div class="mb-4 flex items-center gap-3">
				<span
					class="grid size-8 place-items-center rounded-full bg-comms/15 text-[0.75rem] font-semibold text-comms"
					>D</span
				>
				<span class="min-w-0">
					<span class="block text-[0.88rem] font-medium text-fg">Dana</span>
					<span class="block font-mono text-[0.62rem] text-fg-4"
						>4,812 messages · 3 channels · since 2014</span
					>
				</span>
			</div>
			<ol class="relative space-y-3 border-l border-line-2 pl-4">
				{#each messages as m (m.year)}
					<li class="relative">
						<span
							class="absolute top-1.5 -left-[1.29rem] size-2 rounded-full border-2 border-ink bg-comms"
						></span>
						<div class="mb-1 flex items-center gap-2 font-mono text-[0.6rem] text-fg-4">
							{m.year}
							<span class="rounded border border-line-2 px-1.5 py-px">{m.ch}</span>
						</div>
						<p class="flex flex-wrap items-center gap-2">
							<span
								class={[
									'inline-block rounded-2xl px-3 py-1.5 text-[0.84rem]',
									m.me ? 'bg-surface-3 text-fg-2' : 'bg-comms/12 text-fg'
								]}
							>
								{m.text}
							</span>
							{#if m.tag}
								<TagPill tag={SHARED} hue="projects" linked />
								<span
									class="rounded-md border border-projects/30 px-1.5 py-0.5 font-mono text-[0.62rem] text-projects"
									>→ task · due Fri</span
								>
							{/if}
						</p>
					</li>
				{/each}
			</ol>
		</div>
	</article>

	<!-- Review -->
	<article
		{@attach reveal()}
		class="panel review relative overflow-hidden p-6 md:col-span-2 md:p-7 lg:col-span-6"
	>
		<div class="view-glow review-glow"></div>
		<div class="relative grid gap-8 lg:grid-cols-[19rem_1fr] lg:gap-10">
			<header>
				<p class="view-label"><span class="text-gradient">Review</span></p>
				<h3 class="display mt-3 text-[1.85rem] sm:text-[2.1rem]">See the whole picture.</h3>
				<p class="mt-3 text-[0.95rem] leading-relaxed text-fg-2">
					Today, weekly reviews and dashboards, built from everything you tag in every other view.
					Compare estimates with actuals, see where your hours really went, and watch how sleep,
					training and mood move together.
				</p>
			</header>

			<div class="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
				<!-- Today -->
				<div class="widget">
					<p class="widget-title">Today</p>
					<ul class="space-y-2.5 text-[0.82rem]">
						<li class="flex items-center gap-2 text-fg-3">
							<span class="check done">✓</span><span class="line-through decoration-fg-4"
								>#meds</span
							>
						</li>
						<li class="flex items-center gap-2 text-fg-3">
							<span class="check done">✓</span><span class="line-through decoration-fg-4"
								>#workout</span
							>
						</li>
						<li class="flex flex-wrap items-center gap-2 text-fg">
							<span class="check"></span>Ship billing
							<TagPill tag={SHARED} hue="projects" linked />
						</li>
						<li class="flex items-center gap-2 text-fg">
							<span class="check"></span>Read 20 min
						</li>
					</ul>
				</div>

				<!-- Time by project -->
				<div class="widget">
					<p class="widget-title">Hours by project · week</p>
					<ul class="space-y-3">
						{#each hours as h (h.name)}
							<li>
								<div class="mb-1 flex items-center justify-between text-[0.78rem]">
									<span class="text-fg-2">{h.name}</span>
									<span class="font-mono text-fg-3">{h.h}h</span>
								</div>
								<div class="h-1.5 overflow-hidden rounded-full bg-surface-3">
									<div
										class="h-full rounded-full"
										style="width:{(h.h / 7) * 100}%; background: oklch(0.74 0.14 {h.hue})"
									></div>
								</div>
							</li>
						{/each}
					</ul>
				</div>

				<!-- Sleep × mood -->
				<div class="widget">
					<p class="widget-title">Sleep × mood · 14 days</p>
					<svg
						viewBox="0 0 140 64"
						preserveAspectRatio="none"
						class="h-20 w-full"
						aria-hidden="true"
					>
						{#each sleep as s, i (i)}
							<rect
								x={i * 10 + 1}
								y={64 - ((s - 4) / 4.5) * 60}
								width="7"
								height={((s - 4) / 4.5) * 60}
								rx="1.5"
								fill="color-mix(in oklab, var(--color-notes) 38%, transparent)"
							/>
						{/each}
						<polyline
							points={mood
								.map((m, i) => `${i * 10 + 4.5},${60 - ((m - 1.5) / 3.5) * 52}`)
								.join(' ')}
							fill="none"
							stroke="var(--color-fg)"
							stroke-width="1.4"
							stroke-linejoin="round"
							vector-effect="non-scaling-stroke"
						/>
					</svg>
					<p class="mt-2 flex gap-4 text-[0.72rem] text-fg-3">
						<span class="flex items-center gap-1.5"
							><span class="size-2 rounded-sm bg-notes/50"></span>sleep</span
						>
						<span class="flex items-center gap-1.5"><span class="h-px w-3 bg-fg"></span>mood</span>
					</p>
				</div>

				<!-- Estimate vs actual -->
				<div class="widget">
					<p class="widget-title">Estimate vs actual</p>
					<ul class="space-y-2.5">
						{#each estimates as e (e.task)}
							<li>
								<div class="mb-1 flex items-center justify-between gap-2 text-[0.78rem]">
									<span class="truncate text-fg-2">{e.task}</span>
									<span
										class={[
											'font-mono',
											e.act > e.est ? 'text-warn' : e.act < e.est ? 'text-ok' : 'text-fg-3'
										]}
									>
										{e.act > e.est ? '+' : e.act < e.est ? '−' : '±'}{Math.abs(e.act - e.est)}h
									</span>
								</div>
								<div class="grid gap-0.5">
									<div class="h-1 rounded-full bg-fg-4" style="width:{(e.est / 5) * 100}%"></div>
									<div
										class="h-1 rounded-full bg-projects"
										style="width:{(e.act / 5) * 100}%"
									></div>
								</div>
							</li>
						{/each}
					</ul>
				</div>
			</div>
		</div>
	</article>
</div>

<style>
	.view-label {
		font-family: var(--font-mono);
		font-size: 0.7rem;
		letter-spacing: 0.12em;
		text-transform: uppercase;
	}
	/* A soft wash of the view's hue that brightens on hover. */
	.view-glow {
		position: absolute;
		inset: -40% -20% auto auto;
		width: 70%;
		aspect-ratio: 1;
		background: radial-gradient(
			closest-side,
			color-mix(in oklab, var(--tag) 22%, transparent),
			transparent
		);
		opacity: 0.45;
		transition: opacity 0.6s var(--ease-out-expo);
		pointer-events: none;
	}
	article:hover .view-glow {
		opacity: 0.9;
	}
	/* Review reads across all four views, so it wears all four hues. */
	.review {
		border-color: transparent;
		background:
			linear-gradient(var(--color-surface), var(--color-surface)) padding-box,
			linear-gradient(
					100deg,
					color-mix(in oklab, var(--color-notes) 45%, transparent),
					color-mix(in oklab, var(--color-comms) 45%, transparent),
					color-mix(in oklab, var(--color-projects) 45%, transparent),
					color-mix(in oklab, var(--color-web) 45%, transparent)
				)
				border-box;
	}
	.review-glow {
		inset: -70% auto auto 5%;
		width: 90%;
		aspect-ratio: 2;
		background:
			radial-gradient(
				closest-side at 30% 50%,
				color-mix(in oklab, var(--color-notes) 14%, transparent),
				transparent
			),
			radial-gradient(
				closest-side at 70% 50%,
				color-mix(in oklab, var(--color-projects) 14%, transparent),
				transparent
			);
	}
	.widget {
		border-radius: 0.75rem;
		border: 1px solid var(--color-line);
		background: color-mix(in oklab, var(--color-ink-2) 60%, transparent);
		padding: 1rem;
	}
	.widget-title {
		margin-bottom: 0.85rem;
		font-family: var(--font-mono);
		font-size: 0.62rem;
		letter-spacing: 0.12em;
		text-transform: uppercase;
		color: var(--color-fg-4);
	}
	.check {
		display: inline-grid;
		place-items: center;
		width: 0.95rem;
		height: 0.95rem;
		flex-shrink: 0;
		border-radius: 0.25rem;
		border: 1px solid var(--color-line-3);
		font-size: 0.6rem;
	}
	.check.done {
		border-color: transparent;
		background: color-mix(in oklab, var(--color-ok) 25%, transparent);
		color: var(--color-ok);
	}
</style>
