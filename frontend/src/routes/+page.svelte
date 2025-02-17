<script>
	import { onMount } from 'svelte';
	import { marked } from 'marked';
	let markdownContent;

	onMount(async () => {
		try {
			// Load files from the static folder
			const response = await fetch('/Welcome.md');
			const textres = await response.text();
			//markdownContent = sanitize(marked.parse(textres)); // Sanitize HTML
			markdownContent = marked.parse(textres);
		} catch (err) {
			console.error('Error loading markdown:', err);
			markdownContent = 'Failed to load content';
		}
	});
</script>

<div
	class="main-content prose-xl max-w-none p-8 pt-20 font-mono text-base tracking-wider text-white"
>
	{@html markdownContent}
</div>
