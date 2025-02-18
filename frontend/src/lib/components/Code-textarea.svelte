<script>
	import axios from 'axios';
	let { template } = $props();
	let selectedLanguage = $state('C++');
	let sampleCode = $state(template.sample_code.cpp.function);
	let testResults = $state([
		{
			status: 'Pending'
		},
		{
			status: 'Pending'
		},
		{
			status: 'Pending'
		}
	]);
	// For displaying the test cases and test results separ
	let toggleDisplayResult = $state(false);

	async function handleRun() {
		try {
			const { data } = await axios.post('/api/run', {
				code: sampleCode,
				language_id: getLanguageId(selectedLanguage), // Convert to Judge0 language ID
				test_cases: template.test_cases.map((tc) => ({
					input: tc.input || '',
					expected: tc.expected || ''
				}))
			});
			testResults = data.results;
			toggleDisplayResult = true;
			//console.log(testResults[0].expected_output);
			//console.log('Response:', data.results[0]);
		} catch (err) {
			console.error('Error sending data to API:', err);
		}
	}

	// Function to map language names to Judge0 id
	function getLanguageId(language) {
		const languageMap = {
			'C++': 52,
			Python: 71,
			JavaScript: 63
		};
		return languageMap[language] || 52; // Default to cpp if language is unknown
	}

	function changeLangFunc(selectedLanguage) {
		if (selectedLanguage == 'Python') sampleCode = template.sample_code.python.function;
		else if (selectedLanguage == 'Javascript')
			sampleCode = template.sample_code.javascript.function;
		else sampleCode = template.sample_code.cpp.function;
	}
	function submitSolution() {
		console.log('Submitting solution:', template.sample_code.cpp.function);
	}
</script>

<div class="flex h-screen bg-zinc-800">
	<!-- Problem Section -->
	<div class="w-1/2 overflow-y-auto p-6">
		<div class="mb-6 rounded-lg bg-zinc-800 p-6 text-white shadow-sm">
			<div class="mb-6 flex items-center gap-3">
				<h1 class="text-2xl font-semibold text-amber-500">
					{template.id}. {template.title}
				</h1>
				<span class="rounded-full bg-green-100 px-3 py-1 text-sm font-medium text-green-800">
					{template.difficulty}
				</span>
			</div>

			<p class="mb-6 italic text-white">{template.description}</p>

			{#each template.examples as example (example.input)}
				<div class="mb-4 rounded-lg bg-zinc-800 p-4">
					<h3 class="mb-2 font-medium">
						Example {template.examples.indexOf(example) + 1}:
					</h3>
					<div class="space-y-2">
						<p><strong>Input:</strong> {example.input}</p>
						<p><strong>Output:</strong> {example.output}</p>
						<pre class="whitespace-pre-wrap text-white">{example.explanation}</pre>
					</div>
				</div>
			{/each}

			<div class="rounded-lg bg-zinc-800 p-4">
				<h3 class="mb-2 font-medium">Constraints:</h3>
				<ul class="list-disc pl-6">
					{#each template.constraints as constraint (constraint)}
						<li class="text-white">{constraint}</li>
					{/each}
				</ul>
			</div>
		</div>

		<!-- Test Cases -->
		<div class="rounded-lg bg-slate-500 p-6 shadow-sm">
			<h2 class="mb-4 text-lg font-semibold">Test Cases</h2>
			<div class="space-y-3">
				{#each template.test_cases as tc, index}
					<div class="flex items-center justify-between rounded-lg bg-zinc-800 p-3">
						<div class="flex-1">
							<p class="text-sm font-bold text-white">Case {tc.id}</p>
							<p class="text-sm text-white">{tc.input}</p>
						</div>
						{#if testResults[index].status === 'Accepted'}
							<span class="rounded-full bg-green-100 px-2 py-1 text-xs font-medium text-green-800">
								Passed
							</span>
						{:else if tc.result === 'failed'}
							<span class="rounded-full bg-red-100 px-2 py-1 text-xs font-medium text-red-800">
								Failed
							</span>
						{:else}
							<span class="rounded-full bg-gray-100 px-2 py-1 text-xs font-medium text-gray-800">
								Pending
							</span>
						{/if}
					</div>
				{/each}
			</div>
		</div>
	</div>

	<!-- Code Section -->
	<div class="flex w-1/2 flex-col border-l border-gray-200 bg-zinc-800">
		<div class="flex items-center justify-between border-b border-gray-200 p-4">
			<select
				bind:value={selectedLanguage}
				onchange={() => changeLangFunc(selectedLanguage)}
				class="rounded-md border border-gray-300 bg-white px-3 py-1 text-sm"
			>
				<option>C++</option>
				<option>Python</option>
				<option>JavaScript</option>
			</select>
			<div class="flex gap-2">
				<button
					onclick={handleRun}
					class="rounded-md bg-gray-100 px-4 py-2 text-sm text-gray-700 hover:bg-gray-200"
				>
					Run
				</button>
				<button
					onclick={submitSolution}
					class="rounded-md bg-blue-600 px-4 py-2 text-sm text-white hover:bg-blue-700"
				>
					Submit
				</button>
			</div>
		</div>

		<!-- Code Editor -->
		<div class="flex-1 overflow-auto bg-stone-900 p-4">
			<textarea
				bind:value={sampleCode}
				class="h-full w-full resize-none bg-transparent font-mono text-sm text-gray-100 focus:outline-none"
				spellcheck="false"
			/>
		</div>

		<!-- Test Results -->
		<div class="h-64 overflow-y-auto border-t border-gray-200 p-4">
			<h3 class="mb-3 text-sm font-semibold text-white">Test Results</h3>

			{#if testResults.length > 0 && toggleDisplayResult}
				<div class="space-y-2">
					{#each testResults as result, index}
						<div
							class="flex items-center rounded-md p-2 text-sm
                        {result.status === 'Accepted' ? 'bg-green-50' : 'bg-red-50'}"
						>
							<span
								class={`mr-2 ${result.status === 'Accepted' ? 'text-green-500' : 'text-red-500'}`}
							>
								{result.status === 'Accepted' ? '✓' : '✗'}
							</span>

							Case {result.id}: {result.status === 'Accepted' ? 'Accepted' : 'Failed'}

							(Expected: {template.test_cases[index].expected}, Output: {result.stdout})
						</div>
					{/each}
				</div>
			{:else}
				<p class="text-gray-400">No test results yet.</p>
			{/if}
		</div>
	</div>
</div>
