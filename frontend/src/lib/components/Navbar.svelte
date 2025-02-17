<script>
	import { goto } from '$app/navigation';
	function navigateTo(path) {
		goto(path, { replaceState: true });
	}
</script>

<nav class="fixed left-0 top-0 z-50 w-full bg-zinc-900/70 p-4 text-white shadow-lg">
	<div class="mx-auto flex max-w-6xl items-center justify-center space-x-4 font-mono">
		<button
			class="text-base font-semibold hover:text-gray-300 focus:outline-none"
			onclick={() => navigateTo('/')}>Home</button
		>
		<button
			class="text-base font-semibold hover:text-gray-300 focus:outline-none"
			onclick={() => navigateTo('/problems')}>Problems</button
		>
		<button
			class="text-base font-semibold hover:text-gray-300 focus:outline-none"
			onclick={() => navigateTo('/categories')}>Categories</button
		>
	</div>
</nav>
