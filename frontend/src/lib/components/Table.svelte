<script>
	import { onMount } from 'svelte';

	let { problemTable = [] } = $props();
	let { problems } = $state([]);
	let { totalProblems, pageNumber } = $state(0);
	let searchId = $state();

	let searchedProblem = $state([]); // To keep the searched result which is searched using problem id

	let ToggleSearch = $state(false); // For searching the problem set with problem id
	onMount(() => {
		problems = problemTable.slice(0, 10);
		totalProblems = 10;
		pageNumber = 1;
	});
	function searchFunc(e) {
		console.log(+e.target.value);
		let searchValue = e.target.value.trim();
		if (searchValue > 0) {
			ToggleSearch = true;
			searchedProblem = problemTable.filter((problemTable) =>
				problemTable.id.toString().includes(searchValue)
			);
			//console.log(searchedProblem);
		} else {
			ToggleSearch = false;
		}
	}
	function prevNavigation() {
		if (totalProblems > 10) {
			totalProblems -= 10;
			problems = problemTable.slice(totalProblems, totalProblems + 10);
			pageNumber--;
		}
	}
	function nextNavigation() {
		if (totalProblems < problemTable.length) {
			totalProblems += 10;
			problems = problemTable.slice(totalProblems, totalProblems + 10);
			pageNumber++;
		}
	}
</script>

<!-- Updated Header -->
<div class="mb-3 mt-1 w-full px-4">
	<div class="flex items-center">
		<!-- Left spacer -->
		<div class="w-1/4"></div>

		<!-- Center Title -->
		<div class="flex-1 text-center">
			<h3 class="text-lg font-semibold text-slate-800">
				Browse and filter through our problems set.
			</h3>
		</div>

		<!-- Right: Search bar (not fully right-aligned) -->
		<div class="w-1/3">
			<div class="relative mx-auto w-full min-w-[200px] max-w-sm">
				<div class="relative">
					<input
						bind:value={searchId}
						oninput={searchFunc}
						class="ease h-10 w-full rounded border border-slate-200 bg-white py-2 pl-3 pr-11 text-sm text-slate-700 shadow-sm transition duration-200 placeholder:text-slate-400 hover:border-slate-400 focus:border-slate-400 focus:shadow-md focus:outline-none"
						placeholder="Search for problems..."
					/>
				</div>
			</div>
		</div>
	</div>
</div>

<!-- problemTable Table Container with max width -->
<div class="mx-auto max-w-4xl">
	<!-- problemTable Table -->
	<div
		class="relative flex h-full w-full flex-col overflow-auto rounded-lg bg-white bg-clip-border text-gray-700 shadow-md"
	>
		<table class="w-full min-w-max table-auto text-left">
			<thead>
				<tr>
					<th class="border-b border-slate-200 bg-slate-50 p-4">
						<p class="text-sm font-normal leading-none text-slate-500">Problem ID</p>
					</th>
					<th class="border-b border-slate-200 bg-slate-50 p-4">
						<p class="text-sm font-normal leading-none text-slate-500">Problem</p>
					</th>
					<th class="border-b border-slate-200 bg-slate-50 p-4">
						<p class="text-sm font-normal leading-none text-slate-500">Tag</p>
					</th>
					<th class="border-b border-slate-200 bg-slate-50 p-4">
						<p class="text-sm font-normal leading-none text-slate-500">Difficulty</p>
					</th>
					<th class="border-b border-slate-200 bg-slate-50 p-4 text-center">
						<p class="text-sm font-normal leading-none text-slate-500">Solve</p>
					</th>
				</tr>
			</thead>
			<tbody>
				{#if ToggleSearch}
					{#each searchedProblem as problem}
						<tr class="border-b border-slate-200 hover:bg-slate-50">
							<td class="p-4 py-5">
								<p class="block text-sm font-semibold text-slate-800">{problem.id}</p>
							</td>
							<td class="p-4 py-5">
								<p class="text-sm text-slate-500">{problem.problem}</p>
							</td>
							<td class="p-4 py-5">
								<p class="text-sm text-slate-500">{problem.tag}</p>
							</td>
							<td class="p-4 py-5">
								{#if problem.difficulty === 'Easy'}
									<span class="text-sm font-semibold text-green-500">{problem.difficulty}</span>
								{:else if problem.difficulty === 'Medium'}
									<span class="text-sm font-semibold text-yellow-500">{problem.difficulty}</span>
								{:else if problem.difficulty === 'Hard'}
									<span class="text-sm font-semibold text-red-500">{problem.difficulty}</span>
								{:else}
									<span class="text-sm font-semibold text-slate-500">{problem.difficulty}</span>
								{/if}
							</td>
							<td class="p-4 py-5 text-center">
								<a
									href="/problem/{problem.id}"
									class="ease rounded bg-indigo-600 px-3 py-1 text-sm font-medium text-white transition duration-200 hover:bg-indigo-500"
								>
									Solve
								</a>
							</td>
						</tr>
					{/each}
				{:else}
					{#each problems as problem}
						<tr class="border-b border-slate-200 hover:bg-slate-50">
							<td class="p-4 py-5">
								<p class="block text-sm font-semibold text-slate-800">{problem.id}</p>
							</td>
							<td class="p-4 py-5">
								<p class="text-sm text-slate-500">{problem.problem}</p>
							</td>
							<td class="p-4 py-5">
								<p class="text-sm text-slate-500">{problem.tag}</p>
							</td>
							<td class="p-4 py-5">
								{#if problem.difficulty === 'Easy'}
									<span class="text-sm font-semibold text-green-500">{problem.difficulty}</span>
								{:else if problem.difficulty === 'Medium'}
									<span class="text-sm font-semibold text-yellow-500">{problem.difficulty}</span>
								{:else if problem.difficulty === 'Hard'}
									<span class="text-sm font-semibold text-red-500">{problem.difficulty}</span>
								{:else}
									<span class="text-sm font-semibold text-slate-500">{problem.difficulty}</span>
								{/if}
							</td>
							<td class="p-4 py-5 text-center">
								<a
									href="/problem/{problem.id}"
									class="ease rounded bg-indigo-600 px-3 py-1 text-sm font-medium text-white transition duration-200 hover:bg-indigo-500"
								>
									Solve
								</a>
							</td>
						</tr>
					{/each}
				{/if}
			</tbody>
		</table>

		<div class="flex items-center justify-between px-4 py-3">
			<div class="text-sm text-slate-500">
				Showing <b>{totalProblems}-{totalProblems + 10}</b> of {problemTable.length}
			</div>
			<div class="flex space-x-1">
				<button
					onclick={() => prevNavigation()}
					class="ease min-h-9 min-w-9 rounded border border-slate-200 bg-white px-3 py-1 text-sm font-normal text-slate-500 transition duration-200 hover:border-slate-400 hover:bg-slate-50"
				>
					Prev
				</button>
				<button
					onclick={() => nextNavigation()}
					class="ease min-h-9 min-w-9 rounded border border-slate-800 bg-slate-800 px-3 py-1 text-sm font-normal text-white transition duration-200 hover:border-slate-600 hover:bg-slate-600"
				>
					{pageNumber}
				</button>
				<button
					onclick={() => nextNavigation()}
					class="ease min-h-9 min-w-9 rounded border border-slate-200 bg-white px-3 py-1 text-sm font-normal text-slate-500 transition duration-200 hover:border-slate-400 hover:bg-slate-50"
				>
					{pageNumber + 1}
				</button>
				<button
					onclick={() => nextNavigation()}
					class="ease min-h-9 min-w-9 rounded border border-slate-200 bg-white px-3 py-1 text-sm font-normal text-slate-500 transition duration-200 hover:border-slate-400 hover:bg-slate-50"
				>
					{pageNumber + 2}
				</button>
				<button
					onclick={() => nextNavigation()}
					class="ease min-h-9 min-w-9 rounded border border-slate-200 bg-white px-3 py-1 text-sm font-normal text-slate-500 transition duration-200 hover:border-slate-400 hover:bg-slate-50"
				>
					Next
				</button>
			</div>
		</div>
	</div>
</div>
