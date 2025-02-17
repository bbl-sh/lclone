<script>
	import Table from '$lib/components/Table.svelte';
	let { data } = $props();

	const { problemTable } = data;
</script>

<div class="main-content pt-20">
	<Table {problemTable} />
</div>
