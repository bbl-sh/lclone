import { defineConfig } from 'vitest/config';
import { sveltekit } from '@sveltejs/kit/vite';

export default defineConfig({
	plugins: [sveltekit()],
	server: {
		host: true, // Allows external access
		strictPort: false,
		cors: true, // Enables CORS
		hmr: {
			clientPort: 443 // Ensures HMR works over HTTPS (use 3000 if using HTTP)
		},
		allowedHosts: ['.ngrok-free.app', 'localhost'] // Allows all hosts
	},
	test: {
		include: ['src/**/*.{test,spec}.{js,ts}']
	}
});
