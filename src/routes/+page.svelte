<script lang="ts">
	import LatticeCanvas from '$lib/components/LatticeCanvas.svelte';
	import Logo from '$lib/components/Logo.svelte';
	import SignupForm from '$lib/components/SignupForm.svelte';
	import ScatterToFabric from '$lib/components/ScatterToFabric.svelte';
	import ComposerDemo from '$lib/components/ComposerDemo.svelte';
	import ViewsBento from '$lib/components/ViewsBento.svelte';
	import FabricGraph from '$lib/components/FabricGraph.svelte';
	import { reveal } from '$lib/reveal';

	const site = __SITE_URL__;
	const title = 'Metabrain — An operating system for life';
	const description =
		'Metabrain unites your journal, tasks, browser tabs, projects and conversations in one local-first knowledge graph. Write naturally, structure it later, never lose the thread. Join the early-access list.';

	let scrolled = $state(false);

	const principles = [
		{
			title: 'Capture first, structure later',
			body: 'Nothing stands between you and writing down what happened. Plain text today can grow fields and relationships tomorrow.',
			icon: 'M4 17.5V20h2.5L17 9.5 14.5 7 4 17.5ZM13.5 8l2.5 2.5M15.5 6l1.3-1.3a1.8 1.8 0 0 1 2.5 2.5L18 8.5'
		},
		{
			title: 'Built for low-energy days',
			body: 'Every keystroke is budgeted. Metabrain is designed to work when you’re tired, distracted or unwell — because that’s when you need it most.',
			icon: 'M13 3 5 13.5h6L10 21l8-10.5h-6L13 3Z'
		},
		{
			title: 'Resume anything',
			body: 'It holds your context across interruptions, so coming back to a project after a week — or a year — takes minutes, not a morning.',
			icon: 'M4 12a8 8 0 1 0 2.4-5.7M4 4v4h4M12 8v4l2.5 2.5'
		},
		{
			title: 'Your data, for decades',
			body: 'One local database you own, Markdown mirrors you can open anywhere, and full export. No lock-in, ever.',
			icon: 'M12 3c4.4 0 8 1.3 8 3s-3.6 3-8 3-8-1.3-8-3 3.6-3 8-3ZM4 6v6c0 1.7 3.6 3 8 3s8-1.3 8-3V6M4 12v6c0 1.7 3.6 3 8 3s8-1.3 8-3v-6'
		},
		{
			title: 'History you can trust',
			body: 'Refine a metatag’s definition without silently rewriting what your old records meant. The past stays true.',
			icon: 'M12 3 4 6.5v5c0 4.6 3.3 8.3 8 9.5 4.7-1.2 8-4.9 8-9.5v-5L12 3ZM8.5 12l2.5 2.5L16 9.5'
		},
		{
			title: 'Keyboard-first, yours to theme',
			body: 'Command palette, fuzzy search and configurable hotkeys everywhere — and a look you can make entirely your own.',
			icon: 'M3 7h18v10H3zM7 10h.01M11 10h.01M15 10h.01M8 14h8'
		}
	];

	const audience = [
		{
			who: 'The tab hoarder',
			what: '200 tabs open, because closing one might mean losing it forever.',
			hue: 'curatio'
		},
		{
			who: 'The founder & developer',
			what: 'Docs, issues, research and deploys spread across a dozen live projects.',
			hue: 'workbench'
		},
		{
			who: 'The lifelong learner',
			what: 'Papers, videos and courses you want to find again, order and actually finish.',
			hue: 'curatio'
		},
		{
			who: 'The self-tracker',
			what: 'Sleep, training, habits and mood — finally in one place you can query.',
			hue: 'journal'
		},
		{
			who: 'The relationship-keeper',
			what: 'Years of conversations across apps, and the people behind them.',
			hue: 'metachat'
		},
		{
			who: 'The ADHD brain',
			what: 'Clear the clutter without fear, and always have a way back in.',
			hue: 'journal'
		}
	];

	const faqs = [
		{
			q: 'When can I use it?',
			a: 'Metabrain is a real desktop app in active development. Alpha invites go out to this list in waves as each view stabilises — sign up and you’ll be first in line.'
		},
		{
			q: 'Where does my data live?',
			a: 'On your machine. All four views share one local database, your journal is mirrored to plain Markdown files, and everything is exportable. You own it outright.'
		},
		{
			q: 'Do I have to set up a system first?',
			a: 'No. Start by just writing. Add a #tag when it helps, give it fields when you want to track something, and let structure grow with you.'
		},
		{
			q: 'What will it run on?',
			a: 'Metabrain is a desktop app, with a Chrome extension that connects Curatio to your browser. Faster capture on the go is on the roadmap.'
		}
	];
</script>

<svelte:head>
	<title>{title}</title>
	<meta name="description" content={description} />
	<link rel="canonical" href="{site}/" />
	<meta property="og:type" content="website" />
	<meta property="og:url" content="{site}/" />
	<meta property="og:title" content={title} />
	<meta property="og:description" content={description} />
	<meta property="og:image" content="{site}/og.png" />
	<meta property="og:image:width" content="1200" />
	<meta property="og:image:height" content="630" />
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:site" content="@HelloMetabrain" />
	<meta name="twitter:title" content={title} />
	<meta name="twitter:description" content={description} />
	<meta name="twitter:image" content="{site}/og.png" />
</svelte:head>

<svelte:window onscroll={() => (scrolled = window.scrollY > 24)} />

<a
	href="#main"
	class="sr-only z-50 rounded-lg bg-fg px-4 py-2 text-ink focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
	>Skip to content</a
>

<!-- ─────────────────────────── Nav ─────────────────────────── -->
<header
	class={[
		'fixed inset-x-0 top-0 z-40 transition-all duration-500',
		scrolled ? 'border-b border-line bg-ink/75 backdrop-blur-xl' : 'border-b border-transparent'
	]}
>
	<nav class="mx-auto flex h-16 max-w-7xl items-center gap-8 px-5 sm:px-8">
		<a href="#top" class="flex items-center gap-2.5" aria-label="Metabrain home">
			<Logo size={30} />
			<span class="text-[1.05rem] font-semibold tracking-tight">Metabrain</span>
		</a>
		<ul class="hidden items-center gap-7 text-[0.88rem] text-fg-3 md:flex">
			<li><a class="transition hover:text-fg" href="#metatags">Metatags</a></li>
			<li><a class="transition hover:text-fg" href="#views">Views</a></li>
			<li><a class="transition hover:text-fg" href="#principles">Principles</a></li>
			<li><a class="transition hover:text-fg" href="#faq">FAQ</a></li>
		</ul>
		<a
			href="#join"
			class="ml-auto rounded-xl border border-line-2 bg-surface/60 px-4 py-2 text-[0.85rem] font-medium text-fg backdrop-blur transition hover:border-line-3 hover:bg-surface-2"
			>Get early access</a
		>
	</nav>
</header>

<main id="main">
	<!-- ─────────────────────────── Hero ─────────────────────────── -->
	<section id="top" class="relative isolate flex min-h-svh items-center overflow-hidden">
		<LatticeCanvas class="absolute inset-0 -z-10" />
		<!-- Vignette: calm behind the words, alive at the edges. -->
		<div
			class="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_62%_52%_at_50%_46%,rgb(7_8_11/0.92)_0%,rgb(7_8_11/0.72)_45%,rgb(7_8_11/0.1)_100%)]"
		></div>
		<div
			class="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-48 bg-gradient-to-b from-transparent to-ink"
		></div>

		<div
			class="mx-auto flex w-full max-w-4xl flex-col items-center px-5 pt-28 pb-24 text-center sm:px-8"
		>
			<p
				{@attach reveal(100)}
				class="mb-7 inline-flex items-center gap-2.5 rounded-full border border-line-2 bg-ink/60 px-3.5 py-1.5 font-mono text-[0.7rem] tracking-[0.12em] text-fg-2 uppercase backdrop-blur"
			>
				<span class="size-1.5 animate-pulse-soft rounded-full bg-ok"></span>
				LifeOS · Early access list open
			</p>
			<h1 {@attach reveal(200)} class="display text-[3.1rem] sm:text-[4.6rem] lg:text-[5.9rem]">
				An operating system <em class="text-gradient font-[350] italic">for your life.</em>
			</h1>
			<p
				{@attach reveal(320)}
				class="mt-7 max-w-2xl text-[1.08rem] leading-relaxed text-fg-2 sm:text-[1.22rem]"
			>
				Metabrain brings your journal, tasks, browser tabs, projects and conversations into one
				living knowledge graph. Write naturally, add structure when it helps, and never lose the
				thread again.
			</p>
			<div {@attach reveal(440)} class="mt-10 flex w-full justify-center">
				<SignupForm id="email-hero" location="hero" align="center" />
			</div>
			<ul
				{@attach reveal(560)}
				class="mt-8 flex flex-wrap justify-center gap-x-5 gap-y-2 font-mono text-[0.72rem] text-fg-3"
				aria-label="Views"
			>
				<li class="flex items-center gap-2">
					<span class="size-1.5 rounded-full bg-journal"></span>Journal & Log
				</li>
				<li class="flex items-center gap-2">
					<span class="size-1.5 rounded-full bg-curatio"></span>Curatio
				</li>
				<li class="flex items-center gap-2">
					<span class="size-1.5 rounded-full bg-workbench"></span>Workbench
				</li>
				<li class="flex items-center gap-2">
					<span class="size-1.5 rounded-full bg-metachat"></span>Metachat
				</li>
			</ul>
		</div>

		<a
			href="#problem"
			class="absolute bottom-8 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 font-mono text-[0.62rem] tracking-[0.2em] text-fg-4 uppercase transition hover:text-fg-2 sm:flex"
		>
			Scroll
			<span class="h-10 w-px bg-gradient-to-b from-fg-4 to-transparent"></span>
		</a>
	</section>

	<!-- ─────────────────────────── Problem ─────────────────────────── -->
	<section id="problem" class="relative px-5 py-20 sm:px-8 sm:py-28">
		<div class="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[1fr_1.15fr] lg:gap-20">
			<div {@attach reveal()}>
				<p class="eyebrow">The problem</p>
				<h2 class="display mt-5 text-[2.5rem] sm:text-[3.4rem]">
					You’re not disorganised. <em class="text-fg-2 italic">Your tools are.</em>
				</h2>
				<div class="mt-6 space-y-4 text-[1.05rem] leading-relaxed text-fg-2">
					<p>
						Notes in one app, tasks in another. Hundreds of tabs left open because closing them
						feels like forgetting. Workouts in a tracker, conversations locked inside messengers,
						projects sprawled across boards and folders.
					</p>
					<p>
						Every app holds a sliver of you. None of them see the whole — and every switch costs you
						the thread.
					</p>
				</div>
			</div>
			<div {@attach reveal(120)}>
				<ScatterToFabric />
			</div>
		</div>
	</section>

	<!-- ─────────────────────────── Metatags ─────────────────────────── -->
	<section id="metatags" class="relative px-5 py-20 sm:px-8 sm:py-28">
		<div
			class="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-line-2 to-transparent"
		></div>
		<div class="mx-auto max-w-7xl">
			<div {@attach reveal()} class="max-w-3xl">
				<p class="eyebrow">The metatag</p>
				<h2 class="display mt-5 text-[2.5rem] sm:text-[3.4rem]">
					Write like a person. <em class="text-journal italic">Query like a database.</em>
				</h2>
				<p class="mt-6 max-w-2xl text-[1.05rem] leading-relaxed text-fg-2">
					Type <span class="kbd">#</span> anywhere and a word becomes a living object, with fields, relationships
					and history, without ever leaving the sentence you’re writing. Every entry you log becomes data
					you can chart, search and review.
				</p>
			</div>
			<div {@attach reveal(120)} class="mt-14">
				<ComposerDemo />
			</div>
			<figure {@attach reveal()} class="mx-auto mt-16 max-w-3xl text-center sm:mt-20">
				<blockquote class="display text-[1.9rem] text-fg-2 italic sm:text-[2.4rem]">
					“A metatag can be as quiet as a word, or as dense as a table.”
				</blockquote>
			</figure>
		</div>
	</section>

	<!-- ─────────────────────────── Views ─────────────────────────── -->
	<section id="views" class="relative px-5 py-20 sm:px-8 sm:py-28">
		<div class="mx-auto max-w-7xl">
			<div
				{@attach reveal()}
				class="mb-14 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between"
			>
				<div class="max-w-2xl">
					<p class="eyebrow">One app · four views</p>
					<h2 class="display mt-5 text-[2.5rem] sm:text-[3.4rem]">
						Every part of your life, <em class="italic">on one fabric.</em>
					</h2>
				</div>
				<p class="max-w-md text-[1.02rem] leading-relaxed text-fg-2">
					Four focused views that load instantly and share one database, so your work never gets
					stranded in the wrong app.
				</p>
			</div>
			<ViewsBento />
		</div>
	</section>

	<!-- ─────────────────────────── Graph ─────────────────────────── -->
	<section class="relative overflow-hidden px-5 py-20 sm:px-8 sm:py-28">
		<div class="mx-auto max-w-7xl">
			<div {@attach reveal()} class="mx-auto max-w-3xl text-center">
				<p class="eyebrow">Everything stays live</p>
				<h2 class="display mt-5 text-[2.5rem] sm:text-[3.4rem]">
					Link anything <em class="text-gradient italic">to anything.</em>
				</h2>
				<p class="mx-auto mt-6 max-w-2xl text-[1.05rem] leading-relaxed text-fg-2">
					A browser tab, a message, a workout, a meeting note: each one is a first-class object with
					a permanent identity. Connect them once and they find each other everywhere — in your
					journal, your timeline, your project board and your search.
				</p>
			</div>
			<div {@attach reveal(150)} class="mt-14 sm:mt-16">
				<FabricGraph />
			</div>
		</div>
	</section>

	<!-- ─────────────────────────── Principles ─────────────────────────── -->
	<section id="principles" class="relative px-5 py-20 sm:px-8 sm:py-28">
		<div class="mx-auto max-w-7xl">
			<div {@attach reveal()} class="max-w-2xl">
				<p class="eyebrow">Principles</p>
				<h2 class="display mt-5 text-[2.5rem] sm:text-[3.4rem]">
					Built for a lifetime, <em class="italic">not a quarter.</em>
				</h2>
			</div>
			<ul
				class="mt-14 grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-3"
			>
				{#each principles as p, i (p.title)}
					<li {@attach reveal((i % 3) * 80)} class="bg-ink p-7 sm:p-8">
						<svg
							viewBox="0 0 24 24"
							class="size-6 text-journal"
							fill="none"
							stroke="currentColor"
							stroke-width="1.5"
							stroke-linecap="round"
							stroke-linejoin="round"
							aria-hidden="true"><path d={p.icon} /></svg
						>
						<h3 class="mt-5 text-[1.08rem] font-semibold text-fg">{p.title}</h3>
						<p class="mt-2.5 text-[0.94rem] leading-relaxed text-fg-3">{p.body}</p>
					</li>
				{/each}
			</ul>
		</div>
	</section>

	<!-- ─────────────────────────── Audience ─────────────────────────── -->
	<section class="relative px-5 py-20 sm:px-8 sm:py-28">
		<div class="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[1fr_1.4fr] lg:gap-20">
			<div {@attach reveal()}>
				<p class="eyebrow">Who it’s for</p>
				<h2 class="display mt-5 text-[2.5rem] sm:text-[3.4rem]">
					Made for minds that run <em class="italic">many threads.</em>
				</h2>
				<p class="mt-6 max-w-md text-[1.05rem] leading-relaxed text-fg-2">
					If you’ve ever built a system out of five apps and a spreadsheet, only to watch it fall
					apart by March, Metabrain was built for you.
				</p>
			</div>
			<ul class="grid gap-3 sm:grid-cols-2">
				{#each audience as a, i (a.who)}
					<li
						{@attach reveal((i % 2) * 80)}
						class="rounded-2xl border border-line bg-surface/40 p-5 transition hover:border-line-2"
					>
						<p class="flex items-center gap-2.5 font-medium text-fg">
							<span class="size-2 rounded-full" style="background: var(--color-{a.hue})"></span>
							{a.who}
						</p>
						<p class="mt-2 text-[0.92rem] leading-relaxed text-fg-3">{a.what}</p>
					</li>
				{/each}
			</ul>
		</div>
	</section>

	<!-- ─────────────────────────── FAQ ─────────────────────────── -->
	<section id="faq" class="relative px-5 py-20 sm:px-8 sm:py-24">
		<div class="mx-auto max-w-3xl">
			<div {@attach reveal()}>
				<p class="eyebrow">Questions</p>
				<h2 class="display mt-5 text-[2.5rem] sm:text-[3.1rem]">Good to know.</h2>
			</div>
			<div class="mt-10 divide-y divide-line border-y border-line">
				{#each faqs as f, i (f.q)}
					<details {@attach reveal(i * 60)} class="group py-5" open={i === 0}>
						<summary
							class="flex cursor-pointer list-none items-center justify-between gap-6 text-[1.08rem] font-medium text-fg [&::-webkit-details-marker]:hidden"
						>
							{f.q}
							<span
								class="grid size-7 shrink-0 place-items-center rounded-full border border-line-2 text-fg-3 transition group-open:rotate-45"
								aria-hidden="true">+</span
							>
						</summary>
						<p class="mt-3 max-w-2xl text-[0.98rem] leading-relaxed text-fg-3">{f.a}</p>
					</details>
				{/each}
			</div>
		</div>
	</section>

	<!-- ─────────────────────────── Join ─────────────────────────── -->
	<section id="join" class="relative isolate overflow-hidden px-5 py-28 sm:px-8 sm:py-36">
		<!-- Bookend: the lattice returns, quieter, behind the final ask. -->
		<LatticeCanvas
			class="absolute inset-0 -z-10 [mask-image:linear-gradient(to_bottom,transparent,black_35%,black_80%,transparent)] opacity-60"
		/>
		<div class="pointer-events-none absolute inset-0 -z-10 bg-ink/55"></div>
		<div class="mx-auto grid max-w-6xl items-center gap-14 lg:grid-cols-[1.1fr_1fr] lg:gap-20">
			<figure {@attach reveal()} class="panel p-7 sm:p-9">
				<p class="eyebrow">A decade in the making</p>
				<blockquote class="mt-5 space-y-4 text-[1.02rem] leading-relaxed text-fg-2">
					<p>
						Metabrain began as a sketch in 2015: one system to hold everything a person learns, does
						and intends — and to hand it back the moment it’s needed.
					</p>
					<p>
						Today it’s a real desktop app in active development: Journal, Curatio, Workbench and
						Metachat on one local database. The first people through the door will shape what ships
						next.
					</p>
				</blockquote>
				<figcaption class="mt-6 flex items-center gap-3">
					<Logo size={26} />
					<span class="text-[0.9rem]">
						<span class="block font-medium text-fg">Mike Peiman</span>
						<span class="block text-fg-3">Founder, Metabrain</span>
					</span>
				</figcaption>
			</figure>

			<div {@attach reveal(120)}>
				<h2 class="display text-[2.8rem] sm:text-[3.8rem]">
					Be among the first <em class="text-gradient italic">to think with it.</em>
				</h2>
				<p class="mt-6 max-w-md text-[1.05rem] leading-relaxed text-fg-2">
					Join the early-access list for alpha invites and occasional notes from the build.
				</p>
				<div class="mt-8">
					<SignupForm id="email-join" location="footer" />
				</div>
			</div>
		</div>
	</section>
</main>

<!-- ─────────────────────────── Footer ─────────────────────────── -->
<footer class="border-t border-line px-5 py-10 sm:px-8">
	<div
		class="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 text-[0.85rem] text-fg-3 sm:flex-row"
	>
		<div class="flex items-center gap-2.5">
			<Logo size={22} />
			<span>© {new Date().getFullYear()} Metabrain · An operating system for life</span>
		</div>
		<a
			href="https://x.com/HelloMetabrain"
			target="_blank"
			rel="noopener noreferrer"
			class="flex items-center gap-2 transition hover:text-fg"
		>
			Follow <span class="text-fg-2">@HelloMetabrain</span>
			<svg viewBox="0 0 24 24" class="size-4" fill="currentColor" aria-hidden="true"
				><path
					d="M17.75 3h3.07l-6.7 7.66L22 21h-6.17l-4.83-6.32L5.47 21H2.4l7.17-8.2L2 3h6.33l4.37 5.77L17.75 3Zm-1.08 16.2h1.7L7.4 4.73H5.58L16.67 19.2Z"
				/></svg
			>
		</a>
	</div>
</footer>
