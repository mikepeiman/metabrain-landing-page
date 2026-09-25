<script lang="ts">
	/**
	 * The Metabrain mark: an M drawn on the hex lattice. Four strands, one per
	 * domain view (Notes, Communications, Projects, Web), meeting at five nodes.
	 */
	let { size = 28, class: className = '' }: { size?: number; class?: string } = $props();
</script>

<svg
	width={size}
	height={size}
	viewBox="0 0 24 24"
	fill="none"
	class={className}
	role="img"
	aria-label="Metabrain"
>
	<g stroke-width="2.3" stroke-linecap="round">
		<path d="M2.5 17.2 7.25 8.97" stroke="var(--color-notes)" />
		<path d="M7.25 8.97 12 17.2" stroke="var(--color-comms)" />
		<path d="M12 17.2l4.75-8.23" stroke="var(--color-projects)" />
		<path d="M16.75 8.97 21.5 17.2" stroke="var(--color-web)" />
	</g>
	<g fill="var(--color-fg)">
		<circle cx="2.5" cy="17.2" r="1.35" />
		<circle cx="7.25" cy="8.97" r="1.55" />
		<circle cx="12" cy="17.2" r="1.75" />
		<circle cx="16.75" cy="8.97" r="1.55" />
		<circle cx="21.5" cy="17.2" r="1.35" />
	</g>
</svg>
