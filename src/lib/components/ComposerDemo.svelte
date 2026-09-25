<script lang="ts">
	import { onMount } from 'svelte';
	import { whenVisible } from '$lib/reveal';

	type Hue = 'notes' | 'projects' | 'web' | 'comms';
	type Insight =
		| {
				kind: 'bars';
				label: string;
				unit: string;
				history: number[];
				next: number;
				/** Chart range; bars grow from `floor` so small differences read clearly. */
				floor: number;
				max: number;
		  }
		| { kind: 'progress'; project: string; done: number; total: number; page: string };

	interface Scene {
		time: string;
		prose: string;
		tag: string;
		hue: Hue;
		suggestions: { name: string; meta: string }[];
		fields: [name: string, value: string][];
		insight: Insight;
	}

	interface Logged {
		time: string;
		prose: string;
		tag: string;
		hue: Hue;
		values: string[];
	}

	const scenes: Scene[] = [
		{
			time: '07:42',
			prose: 'Garage session, bar felt light ',
			tag: 'workout',
			hue: 'notes',
			suggestions: [
				{ name: 'workout', meta: '128 records' },
				{ name: 'work-log', meta: '41 records' }
			],
			fields: [
				['exercise', 'back squat'],
				['sets × reps', '5 × 5'],
				['weight', '100 kg']
			],
			insight: {
				kind: 'bars',
				label: 'Back squat · top set',
				unit: 'kg',
				history: [80, 82.5, 85, 85, 90, 92.5, 95],
				next: 100,
				floor: 60,
				max: 100
			}
		},
		{
			time: '07:48',
			prose: 'Rough night — kept waking at 3am ',
			tag: 'sleep',
			hue: 'notes',
			suggestions: [
				{ name: 'sleep', meta: '311 records' },
				{ name: 'sleep-aid', meta: '12 records' }
			],
			fields: [
				['hours', '5.5'],
				['quality', '2 / 5']
			],
			insight: {
				kind: 'bars',
				label: 'Sleep · last 7 nights',
				unit: 'h',
				history: [7.4, 6.9, 7.8, 8.1, 7.2, 6.6, 7.5],
				next: 5.5,
				floor: 3,
				max: 9
			}
		},
		{
			time: '09:15',
			prose: 'Finally read the Stripe billing docs ',
			tag: 'task',
			hue: 'projects',
			suggestions: [
				{ name: 'task', meta: '2,406 records' },
				{ name: 'tax-return', meta: '3 records' }
			],
			fields: [
				['title', 'Wire up billing'],
				['project', 'Launch v1'],
				['status', 'done ✓']
			],
			insight: {
				kind: 'progress',
				project: 'Launch v1',
				done: 7,
				total: 12,
				page: 'stripe.com/docs/billing'
			}
		}
	];

	const seedLog: Logged[] = [
		{
			time: '06:52',
			prose: 'First coffee, black ',
			tag: 'coffee',
			hue: 'notes',
			values: ['1 cup']
		},
		{
			time: '06:40',
			prose: 'Up before the alarm. ',
			tag: 'mood',
			hue: 'notes',
			values: ['4 / 5']
		},
		{
			time: 'Yesterday',
			prose: 'Pricing call with Dana — annual plans? ',
			tag: 'meeting',
			hue: 'comms',
			values: ['Dana', 'Launch v1']
		}
	];

	let root: HTMLElement;
	let sceneIndex = $state(0);
	let scene = $derived(scenes[sceneIndex]);

	let prose = $state('');
	let query = $state<string | null>(null);
	let popup = $state(false);
	let pillOn = $state(false);
	let values = $state<string[]>([]);
	let activeField = $state(-1);
	let key = $state<string | null>(null);
	let logged = $state(false);
	let timeline = $state<Logged[]>([...seedLog]);

	let matches = $derived(
		query === null ? [] : scene.suggestions.filter((s) => s.name.startsWith(query ?? ''))
	);

	const keys = [
		{ k: '#', label: 'start a metatag' },
		{ k: 'Space', label: 'keep it a plain tag' },
		{ k: 'Tab', label: 'next field' },
		{ k: 'Enter', label: 'log it' }
	];

	onMount(() => {
		let alive = true;
		let visible = false;
		let wake: (() => void) | null = null;

		const io = new IntersectionObserver(([e]) => {
			visible = e.isIntersecting;
			if (visible) wake?.();
		});
		io.observe(root);

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

		const press = async (k: string, hold = 260) => {
			key = k;
			await sleep(hold);
			key = null;
		};

		const type = async (text: string, set: (s: string) => void, base = 26) => {
			let out = '';
			for (const ch of text) {
				out += ch;
				set(out);
				await sleep(base + Math.random() * base * 0.9);
			}
		};

		const reset = () => {
			prose = '';
			query = null;
			popup = false;
			pillOn = false;
			values = [];
			activeField = -1;
			logged = false;
		};

		const settleStatic = () => {
			const s = scenes[0];
			prose = s.prose;
			pillOn = true;
			values = s.fields.map(([, v]) => v);
			logged = true;
		};

		async function run() {
			await whenVisible(root, 0.35);
			for (;;) {
				for (let i = 0; i < scenes.length; i++) {
					reset();
					sceneIndex = i;
					const s = scenes[i];
					await sleep(700);
					await type(s.prose, (v) => (prose = v));
					await sleep(280);

					await press('#', 200);
					query = '';
					popup = true;
					await sleep(320);
					await type(s.tag, (v) => (query = v), 85);
					await sleep(420);

					await press('Tab');
					popup = false;
					query = null;
					pillOn = true;
					for (let f = 0; f < s.fields.length; f++) {
						activeField = f;
						values = [...values, ''];
						await sleep(360);
						await type(s.fields[f][1], (v) => (values[f] = v), 34);
						await sleep(260);
						if (f < s.fields.length - 1) await press('Tab');
					}
					activeField = -1;
					await sleep(380);

					await press('Enter');
					logged = true;
					await sleep(1900);
					timeline = [
						{ time: s.time, prose: s.prose, tag: s.tag, hue: s.hue, values: [...values] },
						...timeline
					].slice(0, 4);
					await sleep(1500);
				}
				timeline = [...seedLog];
			}
		}

		if (matchMedia('(prefers-reduced-motion: reduce)').matches) settleStatic();
		else run().catch(() => {});

		return () => {
			alive = false;
			wake?.();
			io.disconnect();
		};
	});

	const hueVar = (h: Hue) => `--tag: var(--color-${h})`;
</script>

<div bind:this={root} class="grid gap-4 lg:grid-cols-[minmax(0,1.45fr)_minmax(0,1fr)] lg:gap-5">
	<!-- Composer -->
	<div class="panel flex flex-col overflow-hidden">
		<div class="flex items-center gap-3 border-b border-line px-5 py-3.5">
			<div class="flex gap-1.5" aria-hidden="true">
				<span class="size-2.5 rounded-full bg-fg-4/60"></span>
				<span class="size-2.5 rounded-full bg-fg-4/60"></span>
				<span class="size-2.5 rounded-full bg-fg-4/60"></span>
			</div>
			<nav
				class="flex min-w-0 gap-1 overflow-hidden font-mono text-[0.7rem] text-fg-3"
				aria-hidden="true"
			>
				<span class="rounded-md bg-surface-3 px-2 py-1 text-fg">Notes</span>
				<span class="px-2 py-1">Projects</span>
				<span class="px-2 py-1">Web</span>
				<span class="hidden px-2 py-1 sm:inline">Communications</span>
				<span class="hidden px-2 py-1 sm:inline">Review</span>
			</nav>
			<span class="ml-auto font-mono text-[0.68rem] text-fg-4">Wed 24 Sep</span>
		</div>

		<div class="relative px-5 pt-5 pb-4 sm:px-6">
			<div class="mb-2 font-mono text-[0.68rem] text-fg-4">{scene.time}</div>
			<p class="min-h-[7rem] text-[1.15rem] leading-[1.9] text-fg sm:text-[1.4rem]">
				{prose}{#if query !== null}<span class="relative font-mono text-[0.95em] text-notes"
						>#{query}{#if popup}<span
								class="absolute top-full left-0 z-10 mt-2 w-64 overflow-hidden rounded-xl border border-line-2 bg-surface-2/95 p-1.5 font-sans text-[0.82rem] shadow-2xl backdrop-blur"
							>
								{#each matches as m, i (m.name)}
									<span
										class={[
											'flex items-center justify-between rounded-lg px-2.5 py-1.5',
											i === 0 && 'bg-surface-3'
										]}
									>
										<span class="font-mono text-fg"><span class="text-notes">#</span>{m.name}</span>
										<span class="text-[0.72rem] text-fg-3">{m.meta}</span>
									</span>
								{/each}
								<span
									class="mt-1 flex items-center gap-2 border-t border-line px-2.5 pt-2 pb-1 text-fg-3"
								>
									<span class="font-mono text-fg-2">+</span> Create
									<span class="font-mono text-fg-2">#{query || '…'}</span>
								</span>
							</span>{/if}</span
					>{/if}{#if pillOn}<span class="pill" style={hueVar(scene.hue)}
						><span>#{scene.tag}</span>{#each values as v, i (i)}<span class="sep">·</span><span
								class="v">{v}</span
							>{#if i === activeField}<span
									class="-ml-[0.3em] inline-block h-[1.05em] w-px translate-y-[0.15em] animate-caret bg-fg"
								></span>{/if}{/each}</span
					>{/if}{#if activeField < 0 && !logged}<span
						class="ml-px inline-block h-[1.15em] w-[2px] translate-y-[0.2em] animate-caret bg-notes"
					></span>{/if}
			</p>
			<div
				class={[
					'mt-3 inline-flex items-center gap-2 rounded-full border border-ok/25 bg-ok/10 px-3 py-1 text-[0.75rem] text-ok transition-all duration-500',
					logged ? 'translate-y-0 opacity-100' : 'translate-y-1 opacity-0'
				]}
				aria-hidden={!logged}
			>
				<span class="size-1.5 rounded-full bg-ok"></span>
				Logged as a record · saved as you typed
			</div>
		</div>

		<div class="mt-auto border-t border-line bg-ink-2/40 px-5 py-4 sm:px-6">
			<!-- Fixed height for four entries so the page never shifts as the demo runs. -->
			<ul class="min-h-[9.5rem] space-y-2.5">
				{#each timeline as e (e.time + e.tag)}
					<li class="flex gap-4 text-[0.9rem] leading-relaxed text-fg-2">
						<span class="w-16 shrink-0 pt-0.5 font-mono text-[0.68rem] text-fg-4">{e.time}</span>
						<span class="min-w-0"
							>{e.prose}<span class="pill" style={hueVar(e.hue)}
								><span>#{e.tag}</span>{#each e.values as v, i (i)}<span class="sep">·</span><span
										class="v">{v}</span
									>{/each}</span
							></span
						>
					</li>
				{/each}
			</ul>
		</div>
	</div>

	<!-- Record + insight -->
	<div class="grid gap-4 lg:gap-5">
		<div class="panel p-5">
			<div class="mb-4 flex items-center justify-between">
				<span class="font-mono text-[0.68rem] tracking-[0.14em] text-fg-4 uppercase">Record</span>
				<span class="pill" style={hueVar(scene.hue)}>#{scene.tag}</span>
			</div>
			<dl class="min-h-[11.5rem] divide-y divide-line">
				{#each scene.fields as [name], i (name)}
					<div class="flex items-center justify-between gap-4 py-2.5 text-[0.88rem]">
						<dt class="text-fg-3">{name}</dt>
						<dd
							class={[
								'font-mono text-[0.82rem] transition-colors',
								i === activeField ? 'text-fg' : values[i] ? 'text-fg-2' : 'text-fg-4'
							]}
						>
							{values[i] || '—'}
						</dd>
					</div>
				{/each}
				<div class="flex items-center justify-between gap-4 py-2.5 text-[0.88rem]">
					<dt class="text-fg-3">logged</dt>
					<dd class="font-mono text-[0.82rem] text-fg-4">{logged ? `today ${scene.time}` : '—'}</dd>
				</div>
			</dl>
		</div>

		<div class="panel p-5">
			{#if scene.insight.kind === 'bars'}
				{@const ins = scene.insight}
				{@const bars = logged ? [...ins.history, ins.next] : ins.history}
				<div class="mb-4 flex items-baseline justify-between">
					<span class="text-[0.85rem] text-fg-2">{ins.label}</span>
					<span class="font-mono text-[0.78rem] text-fg">
						{logged ? ins.next : ins.history[ins.history.length - 1]}{ins.unit}
					</span>
				</div>
				<div class="flex h-24 items-end gap-1.5" aria-hidden="true">
					{#each bars as b, i (i)}
						<div
							class="flex-1 rounded-t-[3px] transition-all duration-700"
							style="height:{((b - ins.floor) / (ins.max - ins.floor)) * 100}%; background: {i ===
								bars.length - 1 && logged
								? `var(--color-${scene.hue})`
								: `color-mix(in oklab, var(--color-${scene.hue}) 28%, transparent)`}"
						></div>
					{/each}
				</div>
				<p class="mt-3 text-[0.75rem] text-fg-3">
					Charts, queries and reviews read the same records.
				</p>
			{:else}
				{@const ins = scene.insight}
				{@const done = logged ? ins.done + 1 : ins.done}
				<div class="mb-3 flex items-baseline justify-between">
					<span class="text-[0.85rem] text-fg-2">
						<span class="text-projects">Projects</span> · {ins.project}
					</span>
					<span class="font-mono text-[0.78rem] text-fg">{done} / {ins.total}</span>
				</div>
				<div class="h-2 overflow-hidden rounded-full bg-surface-3">
					<div
						class="h-full rounded-full bg-projects transition-all duration-700"
						style="width:{(done / ins.total) * 100}%"
					></div>
				</div>
				<div class="mt-4 flex items-center gap-2 text-[0.78rem] text-fg-3">
					<span class="text-web">Web</span> linked page
					<span class="pill truncate" style={hueVar('web')}>{ins.page}</span>
				</div>
				<p class="mt-3 text-[0.75rem] text-fg-3">One task, visible from every view that cares.</p>
			{/if}
		</div>
	</div>

	<!-- Key legend doubles as a live indicator of what the demo is pressing. -->
	<ul class="flex flex-wrap gap-x-6 gap-y-3 lg:col-span-2" aria-label="Composer keys">
		{#each keys as k (k.k)}
			<li class="flex items-center gap-2.5 text-[0.82rem] text-fg-3">
				<span
					class={[
						'kbd transition-all duration-150',
						key === k.k && 'bg-notes text-ink shadow-[0_0_24px_-4px_var(--color-notes)]'
					]}>{k.k}</span
				>
				{k.label}
			</li>
		{/each}
	</ul>
</div>
