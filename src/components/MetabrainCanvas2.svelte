<script>
	import { onMount, onDestroy } from 'svelte';
	import random from 'canvas-sketch-util/random.js';
  
	export let mounted;
  
	const data = {
	  TITLE: 'Sketch05',
	  fps: 60,
	  minDist: 20,
	  maxDistFactor: 6,
	  initialLines: 0,
	  maxLines: 100,
	  speed: 3,
	  minWidth: 1,
	  maxWidth: 4,
	  lineBirthFactor: 0.25,
	  randomColors: false,
	  colorFunctions: [
		{ value: 0, label: 'original' },
		{ value: 1, label: '2' },
		{ value: 2, label: '3' },
		{ value: 3, label: '4' },
		{ value: 4, label: '5' },
		{ value: 5, label: '6' },
		{ value: 6, label: '7' }
	  ],
	  colorFunctionsIndex: 1
	};
  
	let lines = [], frame = 0, starter = {}, timeSinceLast = 0;
  
	const dirs = [
	  { x: 1, y: 0, angle: 0 },
	  { x: 0.5, y: 0.866, angle: 60 },
	  { x: -0.5, y: 0.866, angle: 120 },
	  { x: -1, y: 0, angle: 180 },
	  { x: -0.5, y: -0.866, angle: 240 },
	  { x: 0.5, y: -0.866, angle: 300 }
	];
  
	$: starter = {
	  x: w / 2,
	  y: h / 2,
	  vx: 1,
	  vy: 0.5,
	  width: random.range(data.minWidth, data.maxWidth),
	  reverse: false,
	  dirIndex: Math.floor(random.range(0, 6)),
	  randomFactor: random.range(0.1, 1)
	};
  
	$: maxDist = data.minDist * data.maxDistFactor;
  
	let c, ctx, w, h;
	w = h = 1080;
	let logCounter = 0;
	let evenX, evenY = 50;
	$: evenX = Math.floor(w / data.minDist);
	$: evenY = Math.floor(h / data.minDist);
	$: evenSpacingArrayX = Array.from({length: evenX}, (_, i) => i * data.minDist);
	$: evenSpacingArrayY = Array.from({length: evenY}, (_, i) => i * data.minDist);
  
	let animationId;
  
	onMount(() => {
	  c = document.getElementById('c');
	  let canvasContainer = document.getElementById('canvasContainer');
	  w = c.width = canvasContainer.offsetWidth;
	  h = c.height = canvasContainer.offsetHeight;
	  setResponsiveParams();
  
	  ctx = c.getContext('2d');
  
	  window.addEventListener('resize', handleResize);
	  init();
	  anim();
	});
  
	onDestroy(() => {
	  window.removeEventListener('resize', handleResize);
	  if (animationId) cancelAnimationFrame(animationId);
	});
  
	function handleResize() {
	  let canvasContainer = document.getElementById('canvasContainer');
	  w = c.width = canvasContainer.offsetWidth;
	  h = c.height = canvasContainer.offsetHeight;
	  setResponsiveParams();
	  init();
	}
  
	function setResponsiveParams() {
	  if (w <= 600) {
		data.minDist = 12; data.maxLines = 140; data.minWidth = 1; data.maxWidth = 2;
	  } else if (w > 600) {
		data.minDist = 14; data.maxLines = 200; data.minWidth = 1; data.maxWidth = 2;
	  } else if (w > 1200) {
		data.minDist = 16; data.maxLines = 300; data.minWidth = 1; data.maxWidth = 3;
	  } else if (w > 1800) {
		data.minDist = 20; data.maxLines = 400; data.minWidth = 1; data.maxWidth = 3;
	  } else if (w >= 2400) {
		data.minDist = 24; data.maxLines = 500; data.minWidth = 1; data.maxWidth = 4;
	  }
	}
  
	function makePositive(n) {
	  return Math.abs(n);
	}
  
	function setStartCoords() {
	  starter.x = random.pick(evenSpacingArrayX);
	  starter.y = random.pick(evenSpacingArrayY);
	  starter.dirIndex = Math.floor(random.range(0, 6));
	}
  
	function init() {
	  lines = [];
	  for (let i = 0; i < data.initialLines; ++i) {
		setStartCoords();
		let line = new Line(starter);
		line.colorFunction = random.pick(data.colorFunctions);
		lines.push(line);
	  }
	  ctx.fillStyle = '#222';
	  ctx.fillRect(0, 0, w, h);
	  ctx.lineCap = 'round';
	}
  
	function getColor(idx, x, y, alphaFactor) {
	  alphaFactor = 1;
	  const colorFunctions = [
		`hsla(${(x / w) * 360 + frame}, 80%, 50%, 0.5)`,
		`hsla(${(x / w) * 180 + frame - 120}, 80%, 50%, ${y / h + frame * Math.random() * alphaFactor})`,
		`hsla(${(x / w) * 180 + frame - 120}, 80%, 50%, ${Math.cos(x) / Math.cos(y)})`,
		`hsla(${(x / w) * 180 + frame - 120}, 80%, 50%, ${frame / 2 - Math.floor(frame / 2)})`,
		`hsla(${(x / w) * 180 + frame - 120}, 80%, 50%, ${frame + 1 - (frame + 1) / frame})`,
		`hsla(${(x / w + y) * 180 + frame / 30}, 50%, 50%, ${alphaFactor})`,
		`hsla(${(x / w + y / h) * frame}, 50%, 50%, ${alphaFactor})`,
		`hsla(${(x / w + y / h) * frame}, 50%, 50%, ${alphaFactor})`
	  ];
	  return data.randomColors ? colorFunctions[idx] : colorFunctions[data.colorFunctionsIndex];
	}
  
	function anim() {
	  animationId = setTimeout(() => {
		requestAnimationFrame(anim);
	  }, 1000 / data.fps);
  
	  ++frame;
	  ++logCounter;
	  if (logCounter > 1000) {
		logCounter = 0;
	  }
  
	  ctx.shadowBlur = 0;
	  ctx.fillStyle = 'rgba(0,0,0,.02)';
	  ctx.fillRect(0, 0, w, h);
	  ctx.shadowBlur = 0.5;
  
	  for (let i = 0; i < lines.length; ++i) {
		lines[i].reverse ? (lines[i].width *= 0.995) : (lines[i].width *= 1.005);
		if (lines[i].step()) {
		  lines.splice(i, 1);
		  --i;
		}
	  }
  
	  ++timeSinceLast;
  
	  if (lines.length < data.maxLines) {
		timeSinceLast = 0;
		setStartCoords();
		let line = new Line(starter);
		line.dirIndex = Math.floor(random.range(0, 6));
		line.colorFunction = random.pick(data.colorFunctions);
		lines.push(line);
  
		ctx.fillStyle = ctx.shadowColor = getColor(line.colorFunction.value, starter.x, starter.y);
		ctx.beginPath();
	  }
	}
  
	function Line(parent) {
	  this.x = parent.x | 0;
	  this.y = parent.y | 0;
	  this.width = parent.width | 1;
	  this.reverse = false;
	  this.dirIndex = parent.dirIndex;
	  this.colorFunction = random.pick(data.colorFunctions);
	  this.randomFactor = random.range(0.1, 1);
	  this.lineDist = data.minDist;
	  this.hexDist = maxDist;
  
	  do {
		this.dirIndex = makePositive(++this.dirIndex % 6);
		let dir = dirs[this.dirIndex];
		this.vx = dir.x * data.speed;
		this.vy = dir.y * data.speed;
	  } while (
		(this.vx === -parent.vx && this.vy === -parent.vy) ||
		(this.vx === parent.vx && this.vy === parent.vy)
	  );
	}
  
	Line.prototype.wrap = function() {
	  this.x = (this.x + w) % w;
	  this.y = (this.y + h) % h;
	};
  
	Line.prototype.bounce = function() {
	  if (this.x <= 0 || this.x >= w) {
		this.vx *= -1;
	  }
	  if (this.y <= 0 || this.y >= h) {
		this.vy *= -1;
	  }
	  this.dirIndex = (this.dirIndex + 3) % 6;
	};
  
	Line.prototype.step = function() {
	  let dead = false;
	  let prevX = this.x, prevY = this.y;
  
	  this.dirIndex = makePositive(this.dirIndex % 6);
	  this.x += this.vx;
	  this.y += this.vy;
	  this.lineDist -= data.speed;
	  this.hexDist -= data.speed;
  
	  if (this.x < 0 || this.x > w || this.y < 0 || this.y > h) this.bounce();
  
	  if (this.lineDist <= 0) {
		this.dirIndex++;
		Math.random() > 0.5 ? ++this.dirIndex : --this.dirIndex;
		this.dirIndex = makePositive(this.dirIndex) % 6;
		let dir = dirs[this.dirIndex];
		this.vx = dir.x * data.speed;
		this.vy = dir.y * data.speed;
		this.lineDist = data.minDist;
		this.hexDist = data.minDist;
		if (lines.length < data.maxLines) lines.push(new Line(this));
		if (Math.random() < data.lineBirthFactor) {
		  lines.push(new Line(this));
		  let index = (Math.random() * lines.length) | 0;
		  lines.splice(index, 1);
		}
	  }
  
	  let velFactor = this.vx * this.vy * this.vy;
	  ctx.strokeStyle = ctx.shadowColor = getColor(this.colorFunction.value, this.x, this.y, velFactor);
	  ctx.beginPath();
	  ctx.lineWidth = this.width;
	  ctx.moveTo(this.x, this.y);
	  ctx.lineTo(prevX, prevY);
	  ctx.stroke();
  
	  if (this.width > data.maxWidth) {
		this.reverse = true;
	  } else if (this.width < data.minWidth) {
		this.reverse = false;
	  }
	  if (this.hexDist <= 0) {
		dead = true;
	  }
  
	  return dead;
	};
  </script>
  
  <div class="relative flex -z-1 h-full w-screen sketch">
	<div id="canvasContainer" class="relative w-full z-0">
	  <canvas id="c" class="relative -z-1" />
	</div>
  </div>
  
  <style global lang="scss">
	.sketch,
	#canvasContainer,
	canvas {
	  z-index: -1;
	}
  
	.sketch::before {
	  content: '';
	  position: absolute;
	  top: 0;
	  left: 0;
	  width: 100vw;
	  height: 100vh;
	  background: hsla(0, 0%, 0%, 0.75);
	  z-index: 1;
	}
  
	.controls {
	  grid-area: controls;
	}
  </style>