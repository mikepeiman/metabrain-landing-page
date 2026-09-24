/**
 * Neural lattice — the Metabrain hero animation.
 *
 * Strands grow along a triangular (hex) lattice, turn at lattice nodes, branch
 * into children and fade out, leaving a faint trace behind: a memory of every
 * path taken. The strands are coloured by a cyclic palette built from the four
 * view hues, which slowly drifts across the canvas.
 *
 * The engine is framework-free: construct it with a canvas, call `start()` and
 * `destroy()` when done. It is DPR-aware, runs a fixed 60 Hz simulation
 * independent of display refresh rate, and pauses on demand.
 */

type Oklch = readonly [l: number, c: number, h: number];

export interface LatticeOptions {
	/** Cyclic palette stops in OKLCH. The last stop blends back into the first. */
	palette: readonly Oklch[];
	/** Honour prefers-reduced-motion: render one settled frame, then stop. */
	reducedMotion?: boolean;
	/**
	 * Optional bloom layer. Receives a low-resolution copy of the lattice every
	 * few frames; blur it with CSS and blend it over the main canvas.
	 */
	glow?: HTMLCanvasElement;
}

interface Strand {
	/** Start of the current segment (always an exact lattice node). */
	ox: number;
	oy: number;
	/** Current head position. */
	x: number;
	y: number;
	dir: number;
	step: number;
	segmentsLeft: number;
	width: number;
	growing: boolean;
	/** Per-strand offset into the palette so neighbours differ subtly. */
	tint: number;
	/** Index into TIERS. */
	tier: number;
}

const SIN60 = Math.sqrt(3) / 2;
const DIRS: ReadonlyArray<readonly [number, number]> = [
	[1, 0],
	[0.5, SIN60],
	[-0.5, SIN60],
	[-1, 0],
	[-0.5, -SIN60],
	[0.5, -SIN60]
];

/** Heading change at each node, in sixths of a turn, with its weight. */
const TURNS: ReadonlyArray<readonly [delta: number, weight: number]> = [
	[0, 0.34],
	[1, 0.2],
	[-1, 0.2],
	[2, 0.13],
	[-2, 0.13]
];

const STEPS_PER_SEGMENT = 5;
const GLOW_SCALE = 4;
const SIM_HZ = 60;
/** Fade every FADE_EVERY steps; a stronger, less frequent fade leaves less 8-bit residue. */
const FADE = 0.09;
const FADE_EVERY = 3;
/** Brightness tiers a strand can be drawn at. */
const TIERS = [1, 0.78, 0.58] as const;
const LUT_SIZE = 360;
const PALETTE_PERIOD_S = 48;

export class Lattice {
	private readonly canvas: HTMLCanvasElement;
	private readonly ctx: CanvasRenderingContext2D;
	private readonly luts: string[][];
	private readonly reducedMotion: boolean;
	private readonly glow: CanvasRenderingContext2D | null;

	private strands: Strand[] = [];
	private w = 0;
	private h = 0;
	private dpr = 1;
	private spacing = 16;
	private maxStrands = 240;
	private minWidth = 0.8;
	private maxWidth = 2.4;

	private raf = 0;
	private last = 0;
	private acc = 0;
	private tick = 0;
	private running = false;

	private pointer = { x: 0, y: 0, active: false, lastMove: 0 };

	constructor(canvas: HTMLCanvasElement, options: LatticeOptions) {
		const ctx = canvas.getContext('2d', { alpha: true });
		if (!ctx) throw new Error('Canvas 2D context unavailable');
		this.canvas = canvas;
		this.ctx = ctx;
		this.luts = TIERS.map((k) => buildLut(options.palette, LUT_SIZE, k));
		this.reducedMotion = options.reducedMotion ?? false;
		this.glow = options.glow?.getContext('2d') ?? null;
		this.resize();
	}

	/** Match the backing store to the element's CSS size and reseed. */
	resize() {
		const rect = this.canvas.getBoundingClientRect();
		const w = Math.max(1, Math.round(rect.width));
		const h = Math.max(1, Math.round(rect.height));
		this.dpr = Math.min(window.devicePixelRatio || 1, 2);
		this.w = w;
		this.h = h;
		this.canvas.width = Math.round(w * this.dpr);
		this.canvas.height = Math.round(h * this.dpr);
		this.ctx.setTransform(this.dpr, 0, 0, this.dpr, 0, 0);
		this.ctx.lineCap = 'round';
		if (this.glow) {
			this.glow.canvas.width = Math.ceil(w / GLOW_SCALE);
			this.glow.canvas.height = Math.ceil(h / GLOW_SCALE);
		}

		// Density scales with the viewport: finer lattice and more strands on
		// larger screens, lighter work on phones.
		this.spacing = clamp(Math.round(w / 90), 13, 24);
		this.maxStrands = Math.round(clamp((w * h) / 5200, 110, 480));
		this.minWidth = w < 700 ? 0.7 : 0.9;
		this.maxWidth = w < 700 ? 1.8 : w > 1800 ? 3.2 : 2.6;

		this.seed();
		if (this.reducedMotion) this.settle();
	}

	start() {
		if (this.running || this.reducedMotion) return;
		this.running = true;
		this.last = performance.now();
		this.acc = 0;
		const frame = (now: number) => {
			if (!this.running) return;
			// Fixed-step simulation: identical pace on 60 Hz and 144 Hz displays,
			// and no spiral of death after the tab has been in the background.
			this.acc = Math.min(this.acc + (now - this.last), 1000 / 20);
			this.last = now;
			const dt = 1000 / SIM_HZ;
			while (this.acc >= dt) {
				this.step();
				this.acc -= dt;
			}
			if (this.tick % 2 === 0) this.copyGlow();
			this.raf = requestAnimationFrame(frame);
		};
		this.raf = requestAnimationFrame(frame);
	}

	stop() {
		this.running = false;
		cancelAnimationFrame(this.raf);
	}

	destroy() {
		this.stop();
		this.strands = [];
	}

	/** Feed pointer position in canvas-local CSS pixels. Strands grow from it. */
	pointerMove(x: number, y: number) {
		this.pointer.x = x;
		this.pointer.y = y;
		this.pointer.active = true;
		this.pointer.lastMove = this.tick;
	}

	pointerLeave() {
		this.pointer.active = false;
	}

	/** Seed a radial burst from the centre so the page opens with growth. */
	private seed() {
		this.strands = [];
		this.tick = 0;
		this.ctx.clearRect(0, 0, this.w, this.h);
		const cx = this.w / 2;
		const cy = this.h * 0.46;
		const burst = Math.round(this.maxStrands * 0.14);
		for (let i = 0; i < burst; i++) {
			const r = Math.random() * this.spacing * 4;
			const a = Math.random() * Math.PI * 2;
			this.spawn(cx + Math.cos(a) * r, cy + Math.sin(a) * r, i % 6, 10 + rand(0, 14));
		}
	}

	/** Run the simulation forward without animating (reduced motion). */
	private settle() {
		for (let i = 0; i < 420; i++) this.step();
		this.copyGlow();
	}

	private copyGlow() {
		const g = this.glow;
		if (!g) return;
		g.clearRect(0, 0, g.canvas.width, g.canvas.height);
		g.drawImage(this.canvas, 0, 0, g.canvas.width, g.canvas.height);
	}

	private spawn(x: number, y: number, dir?: number, segments?: number) {
		const [px, py] = this.snap(x, y);
		this.strands.push({
			ox: px,
			oy: py,
			x: px,
			y: py,
			dir: dir ?? (Math.random() * 6) | 0,
			step: 0,
			segmentsLeft: segments ?? 4 + ((Math.random() * 10) | 0),
			width: rand(this.minWidth, this.maxWidth),
			growing: Math.random() < 0.5,
			tint: rand(-0.05, 0.05),
			tier: (Math.random() * TIERS.length) | 0
		});
	}

	/** Nearest node of the triangular lattice. */
	private snap(x: number, y: number): [number, number] {
		const rowH = this.spacing * SIN60;
		const row = Math.round(y / rowH);
		const offset = row & 1 ? this.spacing / 2 : 0;
		const col = Math.round((x - offset) / this.spacing);
		return [col * this.spacing + offset, row * rowH];
	}

	private colorAt(x: number, tint: number, tier = 0) {
		const drift = this.tick / (SIM_HZ * PALETTE_PERIOD_S);
		const t = (x / this.w) * 0.62 + drift + tint;
		return this.luts[tier][((((t % 1) + 1) % 1) * LUT_SIZE) | 0];
	}

	private step() {
		const { ctx } = this;
		this.tick++;

		// Fade toward transparency. 8-bit rounding leaves a faint residue of old
		// paths, which reads as the lattice's long-term memory.
		if (this.tick % FADE_EVERY === 0) {
			ctx.globalCompositeOperation = 'destination-out';
			ctx.fillStyle = `rgba(0,0,0,${FADE})`;
			ctx.fillRect(0, 0, this.w, this.h);
			ctx.globalCompositeOperation = 'source-over';
		}

		const speed = this.spacing / STEPS_PER_SEGMENT;
		const next: Strand[] = [];
		let population = this.strands.length;

		for (const s of this.strands) {
			const [dx, dy] = DIRS[s.dir];
			s.step++;
			s.x = s.ox + dx * speed * s.step;
			s.y = s.oy + dy * speed * s.step;

			s.width *= s.growing ? 1.006 : 0.994;
			if (s.width > this.maxWidth) s.growing = false;
			else if (s.width < this.minWidth) s.growing = true;

			// Redraw the whole segment so far as one opaque stroke: no overlapping
			// caps, so no beading along the line.
			ctx.strokeStyle = this.colorAt(s.x, s.tint, s.tier);
			ctx.lineWidth = s.width;
			ctx.beginPath();
			ctx.moveTo(s.ox, s.oy);
			ctx.lineTo(s.x, s.y);
			ctx.stroke();

			if (s.step < STEPS_PER_SEGMENT) {
				next.push(s);
				continue;
			}

			// Arrived at a node: snap exactly, then turn, branch or die.
			s.ox = s.x = s.ox + dx * this.spacing;
			s.oy = s.y = s.oy + dy * this.spacing;
			s.step = 0;
			s.segmentsLeft--;

			const outside = s.x < -this.spacing || s.x > this.w + this.spacing;
			const below = s.y < -this.spacing || s.y > this.h + this.spacing;
			if (s.segmentsLeft <= 0 || outside || below) {
				population--;
				continue;
			}

			s.dir = (s.dir + pickTurn() + 6) % 6;
			next.push(s);

			if (population < this.maxStrands * 1.25 && Math.random() < 0.16) {
				population++;
				const child: Strand = {
					...s,
					dir: (s.dir + (Math.random() < 0.5 ? 1 : 5)) % 6,
					segmentsLeft: Math.max(2, s.segmentsLeft - 1 - ((Math.random() * 3) | 0)),
					width: s.width * 0.8,
					tier: Math.min(TIERS.length - 1, s.tier + 1)
				};
				next.push(child);
				this.node(s.x, s.y, s.width, s.tint);
			}
		}

		this.strands = next;

		// Keep the population topped up with fresh seeds anywhere on screen.
		if (this.strands.length < this.maxStrands) {
			this.spawn(Math.random() * this.w, Math.random() * this.h);
			if (this.strands.length < this.maxStrands * 0.6) {
				this.spawn(Math.random() * this.w, Math.random() * this.h);
			}
		}

		// Attention: the pointer seeds new growth while it moves.
		const p = this.pointer;
		if (p.active && this.tick - p.lastMove < 20 && this.tick % 3 === 0) {
			if (this.strands.length < this.maxStrands * 1.35) {
				this.spawn(p.x + rand(-1, 1) * this.spacing, p.y + rand(-1, 1) * this.spacing);
				const s = this.strands[this.strands.length - 1];
				s.tier = 0;
				s.segmentsLeft += 4;
				this.node(s.x, s.y, 1.4, s.tint);
			}
		}
	}

	/** A small bright synapse at a branch point. */
	private node(x: number, y: number, width: number, tint: number) {
		const { ctx } = this;
		ctx.fillStyle = this.colorAt(x, tint);
		ctx.beginPath();
		ctx.arc(x, y, width + 1.2, 0, Math.PI * 2);
		ctx.fill();
	}
}

function pickTurn() {
	let r = Math.random();
	for (const [delta, weight] of TURNS) {
		if ((r -= weight) <= 0) return delta;
	}
	return 0;
}

function rand(min: number, max: number) {
	return min + Math.random() * (max - min);
}

function clamp(v: number, min: number, max: number) {
	return Math.min(max, Math.max(min, v));
}

/** Interpolate the cyclic palette in OKLab at one brightness tier and pre-render CSS colours. */
function buildLut(stops: readonly Oklch[], size: number, brightness: number): string[] {
	const lab = stops.map(([l, c, h]) => {
		const r = (h * Math.PI) / 180;
		return [l * brightness, c * brightness * Math.cos(r), c * brightness * Math.sin(r)] as const;
	});
	const out: string[] = [];
	for (let i = 0; i < size; i++) {
		const t = (i / size) * lab.length;
		const a = lab[Math.floor(t) % lab.length];
		const b = lab[(Math.floor(t) + 1) % lab.length];
		const f = smooth(t - Math.floor(t));
		const [r, g, bl] = oklabToSrgb(
			a[0] + (b[0] - a[0]) * f,
			a[1] + (b[1] - a[1]) * f,
			a[2] + (b[2] - a[2]) * f
		);
		out.push(`rgb(${r},${g},${bl})`);
	}
	return out;
}

function smooth(t: number) {
	return t * t * (3 - 2 * t);
}

function oklabToSrgb(L: number, a: number, b: number): [number, number, number] {
	const l = (L + 0.3963377774 * a + 0.2158037573 * b) ** 3;
	const m = (L - 0.1055613458 * a - 0.0638541728 * b) ** 3;
	const s = (L - 0.0894841775 * a - 1.291485548 * b) ** 3;
	const lin = [
		4.0767416621 * l - 3.3077115913 * m + 0.2309699292 * s,
		-1.2684380046 * l + 2.6097574011 * m - 0.3413193965 * s,
		-0.0041960863 * l - 0.7034186147 * m + 1.707614701 * s
	];
	return lin.map((v) => {
		const c = v <= 0.0031308 ? 12.92 * v : 1.055 * Math.pow(v, 1 / 2.4) - 0.055;
		return Math.round(clamp(c, 0, 1) * 255);
	}) as [number, number, number];
}
