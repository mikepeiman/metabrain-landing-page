import type { Attachment } from 'svelte/attachments';

/**
 * Fade/slide an element in the first time it scrolls into view.
 * Elements are only hidden when JS has run (see the `.js` class in app.html),
 * so the prerendered page stays readable without scripts.
 */
export function reveal(delay = 0): Attachment<HTMLElement> {
	return (node) => {
		node.dataset.reveal = '';
		node.style.setProperty('--reveal-delay', `${delay}ms`);
		const io = new IntersectionObserver(
			([entry]) => {
				if (!entry.isIntersecting) return;
				node.dataset.reveal = 'in';
				io.disconnect();
			},
			{ rootMargin: '0px 0px -12% 0px' }
		);
		io.observe(node);
		return () => io.disconnect();
	};
}

/** Resolve once an element is (or becomes) visible; used to start demos lazily. */
export function whenVisible(node: Element, threshold = 0.3): Promise<void> {
	return new Promise((resolve) => {
		const io = new IntersectionObserver(
			([entry]) => {
				if (!entry.isIntersecting) return;
				io.disconnect();
				resolve();
			},
			{ threshold }
		);
		io.observe(node);
	});
}
