<script>
	let Problems = [
		{
			id: '1',
			problem: 'Drop Rows with Missing Values',
			tag: 'Data Cleaning',
			difficulty: 'Easy',
			specification: 'Cleaning Empty Cells'
		},
		{
			id: '2',
			problem: 'Fill Missing Values with a Specific Value',
			tag: 'Data Cleaning',
			difficulty: 'Easy',
			specification: 'Cleaning Empty Cells'
		},
		{
			id: '3',
			problem: 'Convert String to Numeric',
			tag: 'Data Cleaning',
			difficulty: 'Easy',
			specification: 'Cleaning Wrong Format'
		},
		{
			id: '4',
			problem: 'Replace Outliers with Median',
			tag: 'Data Cleaning',
			difficulty: 'Medium',
			specification: 'Cleaning Wrong Data'
		},
		{
			id: '5',
			problem: 'Remove Duplicate Rows',
			tag: 'Data Cleaning',
			difficulty: 'Easy',
			specification: 'Removing Duplicates'
		},
		{
			id: '6',
			problem: 'Forward Fill Missing Values',
			tag: 'Data Cleaning',
			difficulty: 'Easy',
			specification: 'Cleaning Empty Cells'
		},
		{
			id: '7',
			problem: 'Backward Fill Missing Values',
			tag: 'Data Cleaning',
			difficulty: 'Easy',
			specification: 'Cleaning Empty Cells'
		},
		{
			id: '8',
			problem: 'Standardize Date Formats',
			tag: 'Data Cleaning',
			difficulty: 'Medium',
			specification: 'Cleaning Wrong Format'
		},
		{
			id: '9',
			problem: 'Detect and Replace Impossible Values',
			tag: 'Data Cleaning',
			difficulty: 'Medium',
			specification: 'Cleaning Wrong Data'
		},
		{
			id: '10',
			problem: 'Keep Only the First Occurrence',
			tag: 'Data Cleaning',
			difficulty: 'Easy',
			specification: 'Removing Duplicates'
		},
		{
			id: '11',
			problem: 'Fill Missing Values with Column Mean',
			tag: 'Data Cleaning',
			difficulty: 'Easy',
			specification: 'Cleaning Empty Cells'
		},
		{
			id: '12',
			problem: 'Remove Non-Numeric Characters',
			tag: 'Data Cleaning',
			difficulty: 'Easy',
			specification: 'Cleaning Wrong Format'
		},
		{
			id: '13',
			problem: 'Correct Data Based on Conditions',
			tag: 'Data Cleaning',
			difficulty: 'Medium',
			specification: 'Cleaning Wrong Data'
		},
		{
			id: '14',
			problem: 'Remove Rows with Impossible Values',
			tag: 'Data Cleaning',
			difficulty: 'Easy',
			specification: 'Cleaning Wrong Data'
		},
		{
			id: '15',
			problem: 'Replace Data Using a Mapping Dictionary',
			tag: 'Data Cleaning',
			difficulty: 'Easy',
			specification: 'Cleaning Wrong Format'
		},
		{
			id: '16',
			problem: 'Identify Duplicate Rows',
			tag: 'Data Cleaning',
			difficulty: 'Easy',
			specification: 'Removing Duplicates'
		},
		{
			id: '17',
			problem: 'Count Duplicate Rows',
			tag: 'Data Cleaning',
			difficulty: 'Easy',
			specification: 'Removing Duplicates'
		},
		{
			id: '18',
			problem: 'Keep Only the Last Occurrence',
			tag: 'Data Cleaning',
			difficulty: 'Easy',
			specification: 'Removing Duplicates'
		}
	];
</script>

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
				{#each Problems as problem}
					<tr class="border-b border-slate-200 hover:bg-slate-50">
						<td class="p-4 py-5">
							<p class="block text-sm font-semibold text-slate-800">{problem.id}</p>
						</td>
						<td class="p-4 py-5">
							<p class="text-sm text-slate-500">{problem.problem}</p>
						</td>
						<td class="p-4 py-5">
							<p class="text-sm text-slate-500">{problem.specification}</p>
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
			</tbody>
		</table>
	</div>
</div>
