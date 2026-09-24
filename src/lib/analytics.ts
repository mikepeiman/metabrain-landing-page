/** Fire a GA4 event if gtag is present; never throws. */
export function track(event: string, params: Record<string, unknown> = {}) {
	try {
		window.gtag?.('event', event, params);
	} catch {
		// Analytics must never break the page.
	}
}
