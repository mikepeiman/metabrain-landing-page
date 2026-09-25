<script lang="ts">
	import { track } from '$lib/analytics';

	/**
	 * Mailchimp signup. Submits inline through Mailchimp's JSONP endpoint so the
	 * visitor never leaves the page. If that endpoint can't be reached (blocked,
	 * retired, offline) the form falls back to a normal POST to Mailchimp's
	 * hosted signup, which is also what happens without JS. A signup is never lost.
	 */
	let {
		location = 'hero',
		id,
		align = 'left'
	}: { location?: string; id: string; align?: 'left' | 'center' } = $props();

	// The account's current host; the old mikepeiman.* host redirects, which drops POST data.
	const ACCOUNT = 'https://metabrain.us7.list-manage.com/subscribe';
	const U = '2e0789618f3335c1fdeae5f80';
	const LIST = '4f26dc006f';
	const HONEYPOT = `b_${U}_${LIST}`;

	type Status = 'idle' | 'sending' | 'success' | 'error';
	let status = $state<Status>('idle');
	let message = $state('');
	let email = $state('');
	let input = $state<HTMLInputElement>();

	const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

	function jsonp(url: string, timeoutMs = 12000): Promise<{ result: string; msg: string }> {
		return new Promise((resolve, reject) => {
			const cb = `__mc_${Math.random().toString(36).slice(2)}`;
			const script = document.createElement('script');
			const w = window as unknown as Record<string, unknown>;
			const cleanup = () => {
				delete w[cb];
				script.remove();
				clearTimeout(timer);
			};
			const timer = setTimeout(() => {
				cleanup();
				reject(new Error('timeout'));
			}, timeoutMs);
			w[cb] = (data: { result: string; msg: string }) => {
				cleanup();
				resolve(data);
			};
			script.onerror = () => {
				cleanup();
				reject(new Error('network'));
			};
			script.src = `${url}&c=${cb}`;
			document.body.appendChild(script);
		});
	}

	/** Mailchimp messages arrive as HTML with an optional "0 - " field prefix. */
	function clean(msg: string) {
		const text = new DOMParser().parseFromString(msg, 'text/html').body.textContent ?? '';
		return text.replace(/^\d+\s*-\s*/, '').trim();
	}

	async function submit(event: SubmitEvent) {
		event.preventDefault();
		const form = event.currentTarget as HTMLFormElement;
		const trap = (form.elements.namedItem(HONEYPOT) as HTMLInputElement | null)?.value;
		if (trap) return;

		const value = email.trim();
		if (!EMAIL_RE.test(value)) {
			status = 'error';
			message = 'That email doesn’t look quite right.';
			input?.focus();
			return;
		}

		status = 'sending';
		message = '';
		const url = `${ACCOUNT}/post-json?u=${U}&id=${LIST}&EMAIL=${encodeURIComponent(value)}&${HONEYPOT}=`;

		try {
			const res = await jsonp(url);
			const text = clean(res.msg ?? '');
			if (res.result === 'success') {
				status = 'success';
				message = /confirm/i.test(text)
					? 'Almost there — check your inbox to confirm your spot.'
					: 'You’re on the list. Welcome aboard.';
				track('sign_up', { method: 'mailchimp', location });
			} else if (/already subscribed/i.test(text)) {
				status = 'success';
				message = 'You’re already on the list — we’ll be in touch.';
			} else {
				status = 'error';
				message = text || 'Something went wrong. Please try again.';
			}
		} catch {
			// Inline path unavailable: hand off to Mailchimp's own page so the
			// signup still happens. form.submit() skips this handler.
			track('sign_up_fallback', { location });
			form.target = '_self';
			form.submit();
		}
	}
</script>

<form
	action="{ACCOUNT}/post?u={U}&amp;id={LIST}"
	method="post"
	target="_blank"
	novalidate
	onsubmit={submit}
	class="w-full max-w-md"
>
	{#if status === 'success'}
		<div
			class="flex items-center gap-3 rounded-2xl border border-ok/30 bg-ok/10 px-5 py-4 text-left text-fg"
			role="status"
		>
			<svg viewBox="0 0 20 20" class="size-5 shrink-0 text-ok" fill="none" aria-hidden="true">
				<path
					d="M4 10.5 8 14.5 16 6"
					stroke="currentColor"
					stroke-width="2"
					stroke-linecap="round"
					stroke-linejoin="round"
				/>
			</svg>
			<p class="text-[0.95rem] leading-snug">{message}</p>
		</div>
	{:else}
		<div
			class={[
				'relative flex items-center gap-2 rounded-2xl border bg-ink-2/80 p-1.5 shadow-[0_20px_60px_-20px_rgb(0_0_0/0.9)] backdrop-blur-md transition-colors',
				status === 'error'
					? 'border-comms/60'
					: 'border-line-2 focus-within:border-line-3 hover:border-line-3'
			]}
		>
			<label for={id} class="sr-only">Email address</label>
			<input
				bind:this={input}
				bind:value={email}
				{id}
				type="email"
				name="EMAIL"
				autocomplete="email"
				inputmode="email"
				required
				placeholder="you@domain.com"
				aria-invalid={status === 'error'}
				aria-describedby="{id}-msg"
				oninput={() => status === 'error' && (status = 'idle')}
				class="min-w-0 flex-1 bg-transparent px-3.5 py-2.5 text-[0.98rem] text-fg placeholder:text-fg-4 focus:outline-none"
			/>
			<!-- Mailchimp bot trap: real people never see or fill this. -->
			<div class="absolute -left-[5000px]" aria-hidden="true">
				<input type="text" name={HONEYPOT} tabindex="-1" value="" />
			</div>
			<button
				type="submit"
				disabled={status === 'sending'}
				class="relative inline-flex shrink-0 items-center gap-2 overflow-hidden rounded-xl bg-fg px-4 py-2.5 text-[0.92rem] font-semibold text-ink transition hover:bg-white focus-visible:outline-offset-2 disabled:opacity-70 sm:px-5"
			>
				{#if status === 'sending'}
					<span class="size-4 animate-spin rounded-full border-2 border-ink/25 border-t-ink"></span>
					<span>Joining…</span>
				{:else}
					<span>Get early access</span>
					<svg viewBox="0 0 16 16" class="size-4" fill="none" aria-hidden="true">
						<path
							d="M3 8h10m-4-4 4 4-4 4"
							stroke="currentColor"
							stroke-width="1.8"
							stroke-linecap="round"
							stroke-linejoin="round"
						/>
					</svg>
				{/if}
			</button>
		</div>
	{/if}
	<p
		id="{id}-msg"
		class={[
			'mt-3 min-h-5 text-[0.8rem] leading-5',
			align === 'center' ? 'text-center' : 'text-left',
			status === 'error' ? 'text-comms' : 'text-fg-3'
		]}
		aria-live="polite"
	>
		{#if status === 'error'}
			{message}
		{:else if status !== 'success'}
			Alpha invites go to this list first. No spam — unsubscribe anytime.
		{/if}
	</p>
</form>
