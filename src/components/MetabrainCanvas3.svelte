<script>
	import { onMount, onDestroy } from 'svelte';
	import random from 'canvas-sketch-util/random.js';
  
	const CONFIG = {
	  FPS: 60,
	  MIN_DIST: 200,
	  MAX_DIST_FACTOR: 10,
	  MAX_LINES: 333,
	  SPEED: 12,
	  MIN_WIDTH: 1,
	  MAX_WIDTH: 3,
	  LINE_BIRTH_FACTOR: 5.4,
	  COLOR_FUNCTIONS: [
		(x, y, w, h, frame) => `hsla(${(x / w) * 360 + frame}, 80%, 50%, 0.5)`,
		(x, y, w, h, frame) => `hsla(${(x / w) * 180 + frame - 120}, 80%, 50%, ${y / h + frame * Math.random()})`,
		(x, y, w, h, frame) => `hsla(${(x / w) * 180 + frame - 120}, 80%, 50%, ${Math.cos(x) / Math.cos(y)})`,
		(x, y, w, h, frame) => `hsla(${(x / w) * 180 + frame - 120}, 80%, 50%, ${ Math.floor(frame / 2)})`,
		(x, y, w, h, frame) => `hsla(${(x / w + y / h) * frame}, 50%, 50%, 1)`
	  ]
	};
  
	const DIRS = [
	  { x: 1, y: 0 },
	  { x: 0.5, y: 0.866 },
	  { x: -0.5, y: 0.866 },
	  { x: -1, y: 0 },
	  { x: -0.5, y: -0.866 },
	  { x: 0.5, y: -0.866 }
	];
  
	let canvas, ctx, width, height, lines = [], frame = 0, animationId;
  
	const createLine = (parent) => ({
	  x: parent.x | 0,
	  y: parent.y | 0,
	  vx: DIRS[0].x * CONFIG.SPEED,
	  vy: DIRS[0].y * CONFIG.SPEED,
	  width: parent.width || random.range(CONFIG.MIN_WIDTH, CONFIG.MAX_WIDTH),
	  dirIndex: parent.dirIndex || Math.floor(random.range(0, 6)),
	  colorFunction: random.pick(CONFIG.COLOR_FUNCTIONS),
	  lineDist: CONFIG.MIN_DIST,
	  hexDist: CONFIG.MIN_DIST * CONFIG.MAX_DIST_FACTOR,
	  reverse: false,
	  getColor: function(w, h, frame) {
		return this.colorFunction(this.x, this.y, w, h, frame);
	  }
	});
  
	const updateLine = (line) => {
	  line.dirIndex = (line.dirIndex + 1) % 6;
	  const dir = DIRS[line.dirIndex];
	  line.vx = dir.x * CONFIG.SPEED;
	  line.vy = dir.y * CONFIG.SPEED;
	  line.lineDist = CONFIG.MIN_DIST;
	  line.hexDist = CONFIG.MIN_DIST * CONFIG.MAX_DIST_FACTOR;
	};
  
	const stepLine = (line) => {
	  const { x: prevX, y: prevY } = line;
	  line.x += line.vx;
	  line.y += line.vy;
	  line.lineDist -= CONFIG.SPEED;
	  line.hexDist -= CONFIG.SPEED;
	  line.width *= line.reverse ? 0.995 : 1.005;
  
	  if (line.x < 0 || line.x > width || line.y < 0 || line.y > height) {
		line.vx *= -1;
		line.vy *= -1;
		line.dirIndex = (line.dirIndex + 3) % 6;
	  }
  
	  if (line.lineDist <= 0) {
		updateLine(line);
		if (lines.length < CONFIG.MAX_LINES) lines.push(createLine(line));
		if (Math.random() < CONFIG.LINE_BIRTH_FACTOR) {
		  lines.push(createLine(line));
		  lines.splice(Math.floor(Math.random() * lines.length), 1);
		}
	  }
  
	  ctx.strokeStyle = line.getColor(width, height, frame);
	  ctx.lineWidth = line.width;
	  ctx.beginPath();
	  ctx.moveTo(line.x, line.y);
	  ctx.lineTo(prevX, prevY);
	  ctx.stroke();
  
	  if (line.width > CONFIG.MAX_WIDTH) line.reverse = true;
	  else if (line.width < CONFIG.MIN_WIDTH) line.reverse = false;
  
	  return line.hexDist <= 0;
	};
  
	const animate = () => {
	  ctx.fillStyle = 'rgba(0,0,0,.02)';
	  ctx.fillRect(0, 0, width, height);
  
	  lines = lines.filter(line => !stepLine(line));
  
	  if (lines.length < CONFIG.MAX_LINES) {
		lines.push(createLine({
		  x: Math.floor(Math.random() * width / CONFIG.MIN_DIST) * CONFIG.MIN_DIST,
		  y: Math.floor(Math.random() * height / CONFIG.MIN_DIST) * CONFIG.MIN_DIST,
		}));
	  }
  
	  frame++;
	  animationId = requestAnimationFrame(animate);
	};
  
	onMount(() => {
	  canvas = document.getElementById('canvas');
	  ctx = canvas.getContext('2d');
	  const resizeCanvas = () => {
		width = canvas.width = canvas.offsetWidth;
		height = canvas.height = canvas.offsetHeight;
		lines = [createLine({ x: width / 2, y: height / 2 })];
	  };
	  resizeCanvas();
	  window.addEventListener('resize', resizeCanvas);
	  animate();
	  return () => {
		cancelAnimationFrame(animationId);
		window.removeEventListener('resize', resizeCanvas);
	  };
	});
  
	onDestroy(() => {
	  if (animationId) cancelAnimationFrame(animationId);
	});
  </script>
  
  <div class="sketch">
	<canvas id="canvas" />
  </div>
  
  <style>
	.sketch {
	  position: relative;
	  width: 100%;
	  height: 100vh;
	}
	canvas {
	  position: absolute;
	  top: 0;
	  left: 0;
	  width: 100%;
	  height: 100%;
	}
  </style>