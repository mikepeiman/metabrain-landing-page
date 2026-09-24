import { sveltekit } from '@sveltejs/kit/vite';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'vite';

// Absolute site URL for canonical and social-card tags. Set PUBLIC_SITE_URL to
// pin a custom domain; otherwise Vercel's production domain is used.
const vercelHost = process.env.VERCEL_PROJECT_PRODUCTION_URL;
const siteUrl = (
	process.env.PUBLIC_SITE_URL ?? (vercelHost ? `https://${vercelHost}` : 'http://localhost:4173')
).replace(/\/$/, '');

export default defineConfig({
	plugins: [tailwindcss(), sveltekit()],
	define: {
		__SITE_URL__: JSON.stringify(siteUrl)
	}
});
