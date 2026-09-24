<script lang="ts">
	import { onMount } from 'svelte';
	import { Lattice } from '$lib/canvas/lattice';

	let { class: className = '' }: { class?: string } = $props();

	let canvas: HTMLCanvasElement;
	let glow: HTMLCanvasElement;

	// The four view hues, in the order the eye meets them left to right:
	// Journal amber → Metachat rose → Workbench violet → Curatio teal.
	const palette = [
		[0.84, 0.14, 78],
		[0.74, 0.16, 18],
		[0.68, 0.17, 295],
		[0.8, 0.12, 195]
	] as const;

	onMount(() => {
		const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
		const lattice = new Lattice(canvas, { palette, reducedMotion, glow });

		let onScreen = true;
		const sync = () => (onScreen && !document.hidden ? lattice.start() : lattice.stop());

		const io = new IntersectionObserver(([entry]) => {
			onScreen = entry.isIntersecting;
			sync();
		});
		io.observe(canvas);

		// Only reseed on real layout changes: mobile browser chrome showing and
		// hiding shouldn't wipe the canvas.
		let lastW = canvas.clientWidth;
		let lastH = canvas.clientHeight;
		let resizeTimer: ReturnType<typeof setTimeout>;
		const ro = new ResizeObserver(() => {
			clearTimeout(resizeTimer);
			resizeTimer = setTimeout(() => {
				const w = canvas.clientWidth;
				const h = canvas.clientHeight;
				if (w === lastW && Math.abs(h - lastH) < lastH * 0.15) return;
				lastW = w;
				lastH = h;
				lattice.resize();
			}, 160);
		});
		ro.observe(canvas);

		const onMove = (e: PointerEvent) => {
			if (e.pointerType !== 'mouse') return;
			const r = canvas.getBoundingClientRect();
			if (e.clientY > r.bottom) return lattice.pointerLeave();
			lattice.pointerMove(e.clientX - r.left, e.clientY - r.top);
		};
		const onLeave = () => lattice.pointerLeave();

		document.addEventListener('visibilitychange', sync);
		window.addEventListener('pointermove', onMove, { passive: true });
		document.documentElement.addEventListener('pointerleave', onLeave);
		sync();

		return () => {
			io.disconnect();
			ro.disconnect();
			clearTimeout(resizeTimer);
			document.removeEventListener('visibilitychange', sync);
			window.removeEventListener('pointermove', onMove);
			document.documentElement.removeEventListener('pointerleave', onLeave);
			lattice.destroy();
		};
	});
</script>

<div class={className} aria-hidden="true">
	<canvas bind:this={canvas} class="absolute inset-0 h-full w-full"></canvas>
	<!-- Bloom: a quarter-resolution copy, blurred and screened over the lattice. -->
	<canvas
		bind:this={glow}
		class="absolute inset-0 h-full w-full opacity-80 mix-blend-screen blur-md saturate-150"
	></canvas>
</div>
