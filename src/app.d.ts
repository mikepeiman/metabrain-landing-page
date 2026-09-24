declare global {
	/** Absolute site origin, injected at build time (see vite.config.ts). */
	const __SITE_URL__: string;

	interface Window {
		dataLayer?: unknown[];
		gtag?: (...args: unknown[]) => void;
	}
	namespace App {}
}

export {};
