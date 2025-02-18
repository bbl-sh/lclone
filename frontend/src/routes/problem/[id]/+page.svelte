<script>
	import Code from '$lib/components/Code.svelte';
	let { data } = $props();
	const { problem } = data;
	//	console.log(problem);
</script>

<div class="main-content pt-16">
	<Code template={problem[0]} />
</div>
