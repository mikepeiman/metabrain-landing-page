<script lang="ts">
	import { reveal } from '$lib/reveal';

	const journal = [
		{ t: '06:40', text: 'Up before the alarm.', tags: [['mood', '4 / 5']] },
		{
			t: '07:42',
			text: 'Garage session, bar felt light',
			tags: [['workout', 'squat · 5×5 · 100 kg']]
		},
		{
			t: '13:05',
			text: 'Chapter 4 — stocks, flows, delays',
			tags: [['book', 'Thinking in Systems']]
		},
		{ t: '22:10', text: 'Tired but clear. Good day overall.', tags: [['mood', '4 / 5']] }
	];

	const pinned = ['water', 'coffee', 'meds', 'push-ups'];

	const tree = [
		{ kind: 'win', title: 'Launch research', meta: '3 tabs · live', live: true, open: true },
		{ kind: 'tab', site: 'stripe.com', title: 'Billing — Stripe Docs', live: true, hue: 262 },
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
			env: 'Code · Terminal · Chrome'
		},
		{
			name: 'Thesis',
			hue: 195,
			status: 'Paused 3 days',
			state: 'idle',
			done: 14,
			total: 31,
			env: 'Zotero · Obsidian'
		},
		{
			name: 'Garage gym',
			hue: 78,
			status: 'Waiting on parts',
			state: 'warn',
			done: 3,
			total: 5,
			env: 'Sheets'
		}
	];

	const messages = [
		{ year: '2016', ch: 'Skype', text: 'Congrats on the new job!!', me: false },
		{ year: '2021', ch: 'SMS', text: 'Coffee Thursday? Usual place', me: true },
		{ year: 'Today', ch: 'Messages', text: 'Can we ship Friday?', me: false }
	];
</script>

<div class="grid gap-4 md:grid-cols-6 lg:gap-5">
	<!-- Journal & Log -->
	<article
		{@attach reveal()}
		class="panel group relative overflow-hidden p-6 md:col-span-4 md:p-7"
		style="--tag: var(--color-journal)"
	>
		<div class="view-glow"></div>
		<header class="relative mb-6 max-w-md">
			<p class="view-label text-journal">Metabrain · Journal & Log</p>
			<h3 class="display mt-3 text-[1.85rem] sm:text-[2.1rem]">
				Write and log at the speed of thought.
			</h3>
			<p class="mt-3 text-[0.95rem] leading-relaxed text-fg-2">
				Journal is full-text Markdown that saves as you type and mirrors to plain files you own. Log
				is capture tuned for speed: pinned metatags, one-tap records, and a global
				<span class="kbd h-5 min-w-0 text-[0.65rem]">Alt</span>
				<span class="kbd h-5 min-w-0 text-[0.65rem]">Space</span> dock that works from any app.
			</p>
		</header>
		<div class="relative grid gap-3 sm:grid-cols-[1fr_11rem]">
			<ul class="space-y-3 rounded-xl border border-line bg-ink-2/60 p-4">
				{#each journal as e (e.t)}
					<li class="flex gap-3 text-[0.85rem] leading-relaxed text-fg-2">
						<span class="w-10 shrink-0 pt-0.5 font-mono text-[0.66rem] text-fg-4">{e.t}</span>
						<span>
							{e.text}
							{#each e.tags as [name, val] (name)}
								<span class="pill"
									><span>#{name}</span><span class="sep">·</span><span class="v">{val}</span></span
								>
							{/each}
						</span>
					</li>
				{/each}
			</ul>
			<div class="rounded-xl border border-line bg-ink-2/60 p-4">
				<p class="mb-3 font-mono text-[0.62rem] tracking-[0.14em] text-fg-4 uppercase">Quick log</p>
				<div class="grid grid-cols-2 gap-2">
					{#each pinned as p, i (p)}
						<span
							class="flex h-12 flex-col items-center justify-center rounded-lg border border-line-2 bg-surface-2 font-mono text-[0.7rem] text-fg-2"
						>
							#{p}
							<span class="text-[0.6rem] text-fg-4">{['×6', '×2', '✓', '×40'][i]}</span>
						</span>
					{/each}
				</div>
			</div>
		</div>
	</article>

	<!-- Curatio -->
	<article
		{@attach reveal(80)}
		class="panel group relative overflow-hidden p-6 md:col-span-2 md:p-7"
		style="--tag: var(--color-curatio)"
	>
		<div class="view-glow"></div>
		<header class="relative mb-6">
			<p class="view-label text-curatio">Curatio · Browser & web</p>
			<h3 class="display mt-3 text-[1.85rem]">Close tabs without losing the thread.</h3>
			<p class="mt-3 text-[0.95rem] leading-relaxed text-fg-2">
				Windows and tabs as one living outline. Put a whole research session to sleep, wake it
				tomorrow, and find the page you saw once, months ago.
			</p>
		</header>
		<div class="relative rounded-xl border border-line bg-ink-2/60 p-3">
			<div
				class="mb-2 flex items-center gap-2 rounded-lg border border-line-2 bg-surface-2 px-3 py-2 font-mono text-[0.7rem] text-fg-2"
			>
				<svg viewBox="0 0 16 16" class="size-3.5 text-fg-4" fill="none" aria-hidden="true"
					><circle cx="7" cy="7" r="4.5" stroke="currentColor" stroke-width="1.5" /><path
						d="m10.5 10.5 3 3"
						stroke="currentColor"
						stroke-width="1.5"
						stroke-linecap="round"
					/></svg
				>
				that pricing talk<span class="animate-caret text-curatio">▍</span>
			</div>
			<ul class="space-y-0.5 text-[0.78rem]">
				{#each tree as row, i (i)}
					{#if row.kind === 'win'}
						<li class="flex items-center gap-2 rounded-md px-2 py-1.5 text-fg">
							<span class="w-3 text-fg-4">{row.open ? '▾' : '▸'}</span>
							<span class={['size-2 rounded-sm', row.live ? 'bg-curatio' : 'border border-fg-4']}
							></span>
							<span class="truncate font-medium">{row.title}</span>
							<span class="ml-auto shrink-0 font-mono text-[0.6rem] text-fg-4">{row.meta}</span>
						</li>
					{:else}
						<li
							class={[
								'ml-5 flex items-center gap-2 rounded-md px-2 py-1.5',
								row.hit ? 'bg-curatio/12 ring-1 ring-curatio/40' : '',
								row.live ? 'text-fg-2' : 'text-fg-3'
							]}
						>
							<span
								class="grid size-3.5 shrink-0 place-items-center rounded-[3px] text-[0.5rem] font-bold text-ink"
								style="background: oklch(0.75 0.12 {row.hue})">{row.site?.[0]}</span
							>
							<span class="truncate">{row.title}</span>
							{#if !row.live}<span class="ml-auto shrink-0 font-mono text-[0.58rem] text-fg-4"
									>saved</span
								>{/if}
						</li>
					{/if}
				{/each}
			</ul>
		</div>
	</article>

	<!-- Workbench -->
	<article
		{@attach reveal()}
		class="panel group relative overflow-hidden p-6 md:col-span-3 md:p-7"
		style="--tag: var(--color-workbench)"
	>
		<div class="view-glow"></div>
		<header class="relative mb-6">
			<p class="view-label text-workbench">Workbench · Projects</p>
			<h3 class="display mt-3 text-[1.85rem]">A command centre for every project.</h3>
			<p class="mt-3 text-[0.95rem] leading-relaxed text-fg-2">
				Because all of life is a project. See them all at once, then relaunch a project's whole
				working environment — apps, windows and layout — and pick up exactly where you left off.
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
						<span class="block truncate text-[0.88rem] font-medium text-fg">{p.name}</span>
						<span class="block truncate font-mono text-[0.62rem] text-fg-4">{p.env}</span>
					</span>
					<span
						class={[
							'flex items-center gap-1.5 rounded-full px-2 py-0.5 text-[0.66rem]',
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

	<!-- Metachat -->
	<article
		{@attach reveal(80)}
		class="panel group relative overflow-hidden p-6 md:col-span-3 md:p-7"
		style="--tag: var(--color-metachat)"
	>
		<div class="view-glow"></div>
		<header class="relative mb-6">
			<p class="view-label text-metachat">Metachat · Conversations</p>
			<h3 class="display mt-3 text-[1.85rem]">Every conversation, one timeline.</h3>
			<p class="mt-3 text-[0.95rem] leading-relaxed text-fg-2">
				Bring your SMS, Skype and Google Messages archives into one searchable record of your
				relationships — linked to people, projects and notes, and yours to keep.
			</p>
		</header>
		<div class="relative rounded-xl border border-line bg-ink-2/60 p-4">
			<div
				class="mb-4 flex items-center gap-2 rounded-lg border border-line-2 bg-surface-2 px-3 py-2 font-mono text-[0.7rem] text-fg-2"
			>
				<svg viewBox="0 0 16 16" class="size-3.5 text-fg-4" fill="none" aria-hidden="true"
					><circle cx="7" cy="7" r="4.5" stroke="currentColor" stroke-width="1.5" /><path
						d="m10.5 10.5 3 3"
						stroke="currentColor"
						stroke-width="1.5"
						stroke-linecap="round"
					/></svg
				>
				ship friday
				<span class="ml-auto text-fg-4">3 matches · 12 years</span>
			</div>
			<div class="mb-4 flex items-center gap-3">
				<span
					class="grid size-8 place-items-center rounded-full bg-metachat/15 text-[0.75rem] font-semibold text-metachat"
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
							class="absolute top-1.5 -left-[1.29rem] size-2 rounded-full border-2 border-ink bg-metachat"
						></span>
						<div class="mb-1 flex items-center gap-2 font-mono text-[0.6rem] text-fg-4">
							{m.year}
							<span class="rounded border border-line-2 px-1.5 py-px">{m.ch}</span>
						</div>
						<p
							class={[
								'inline-block rounded-2xl px-3 py-1.5 text-[0.82rem]',
								m.me ? 'bg-surface-3 text-fg-2' : 'bg-metachat/12 text-fg'
							]}
						>
							{m.text}
						</p>
					</li>
				{/each}
			</ol>
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
</style>
