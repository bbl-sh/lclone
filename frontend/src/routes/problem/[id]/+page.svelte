<script>
	import Code from '$lib/components/Code.svelte';
	let { data } = $props();
	console.log(data.ans);
</script>

<div class="main-content pt-16">
	<Code />
</div>
