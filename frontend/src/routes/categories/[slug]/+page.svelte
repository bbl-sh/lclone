<script>
	import CatTable from '$lib/components/CatTable.svelte';
	let { title = 'No Title Given', Description = 'No details given' } = $props();
</script>

<div class="min-h-screen bg-gray-50 pt-20">
	<header class=" bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
		<div class="mx-auto max-w-7xl px-4 text-center">
			<h1 class="text-4xl font-extrabold text-white">{title}</h1>
			<p class="mt-2 text-lg text-gray-200">
				{Description}
			</p>
		</div>
	</header>

	<CatTable />
</div>
