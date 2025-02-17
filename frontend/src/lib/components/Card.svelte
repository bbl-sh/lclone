<script>
	let {
		url = '/dp.png',
		Description = 'No description given',
		Title = 'No title given'
	} = $props();
</script>

<div class="relative my-6 flex w-96 flex-col rounded-lg border border-slate-200 bg-white shadow-sm">
	<div class="relative m-2.5 h-56 overflow-hidden rounded-md text-white">
		<img src={url} alt="card-image" />
	</div>
	<div class="p-4">
		<h6 class="mb-2 text-xl font-semibold text-slate-800">{Title}</h6>
		<p class="font-light leading-normal text-slate-600">
			{Description}
		</p>
	</div>
	<div class="mt-2 px-4 pb-4 pt-0">
		<button
			class="rounded-md border border-transparent bg-blue-400 px-4 py-2 text-center text-sm text-white shadow-md transition-all hover:bg-blue-900 focus:bg-blue-900"
			type="button"
		>
			Solve
		</button>
	</div>
</div>
