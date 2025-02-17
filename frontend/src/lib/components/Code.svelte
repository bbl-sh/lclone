<script>
	// Corrected template data structure
	const template = {
		id: 70,
		title: 'Climbing Stairs',
		difficulty: 'Easy',
		description:
			'You are climbing a staircase. It takes n steps to reach the top. Each time you can either climb 1 or 2 steps. In how many distinct ways can you climb to the top?',
		examples: [
			{
				input: 'n = 2',
				output: '2',
				explanation: 'There are two ways to climb to the top.\n1. 1 step + 1 step\n2. 2 steps'
			},
			{
				input: 'n = 3',
				output: '3',
				explanation:
					'There are three ways to climb to the top.\n1. 1 step + 1 step + 1 step\n2. 1 step + 2 steps\n3. 2 steps + 1 step'
			}
		],
		constraints: ['1 <= n <= 45'],
		testCases: [
			{ id: 1, input: 'n = 2', expected: '2' },
			{ id: 2, input: 'n = 3', expected: '3' },
			{ id: 3, input: 'n = 5', expected: '8' }
		],
		// Initially, no test results
		testResults: [],
		// Added selectedLanguage property for the select element
		selectedLanguage: 'C++',
		sample_code: {
			cpp: {
				function:
					'int climbStairs(int n) {\n    if (n <= 2) return n;\n    int a = 1, b = 2;\n    for (int i = 3; i <= n; i++) {\n        int temp = b;\n        b = a + b;\n        a = temp;\n    }\n    return b;\n}',
				main: '#include <iostream>\nusing namespace std;\n\nint climbStairs(int n);\n\nint main() {\n    int n = 5; // Example input\n    cout << "Number of ways to climb " << n << " stairs: " << climbStairs(n) << endl;\n    return 0;\n}\n\nint climbStairs(int n) {\n    if (n <= 2) return n;\n    int a = 1, b = 2;\n    for (int i = 3; i <= n; i++) {\n        int temp = b;\n        b = a + b;\n        a = temp;\n    }\n    return b;\n}'
			},
			python: {
				function:
					'def climbStairs(n: int) -> int:\n    if n <= 2:\n        return n\n    a, b = 1, 2\n    for _ in range(3, n + 1):\n        a, b = b, a + b\n    return b',
				main: 'def climbStairs(n: int) -> int:\n    if n <= 2:\n        return n\n    a, b = 1, 2\n    for _ in range(3, n + 1):\n        a, b = b, a + b\n    return b\n\nif __name__ == "__main__":\n    n = 5  # Example input\n    print(f"Number of ways to climb {n} stairs: {climbStairs(n)}")'
			},
			javascript: {
				function:
					'function climbStairs(n) {\n    if (n <= 2) return n;\n    let a = 1, b = 2;\n    for (let i = 3; i <= n; i++) {\n        let temp = b;\n        b = a + b;\n        a = temp;\n    }\n    return b;\n}',
				main: 'function climbStairs(n) {\n    if (n <= 2) return n;\n    let a = 1, b = 2;\n    for (let i = 3; i <= n; i++) {\n        let temp = b;\n        b = a + b;\n        a = temp;\n    }\n    return b;\n}\n\nconst n = 5; // Example input\nconsole.log(`Number of ways to climb ${n} stairs: ${climbStairs(n)}`);'
			}
		}
	};

	// Run tests and add a testResults property to the template
	function runTests() {
		template.testResults = template.testCases.map((tc) => ({
			...tc,
			// For demonstration, only the first test passes
			result: tc.id === 1 ? 'passed' : 'failed'
		}));
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
				{#each template.testCases as tc (tc.id)}
					<div class="flex items-center justify-between rounded-lg bg-zinc-800 p-3">
						<div class="flex-1">
							<p class="text-sm font-bold text-white">Case {tc.id}</p>
							<p class="text-sm text-white">{tc.input}</p>
						</div>
						{#if tc.result === 'passed'}
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
				bind:value={template.selectedLanguage}
				class="rounded-md border border-gray-300 bg-white px-3 py-1 text-sm"
			>
				<option>C++</option>
				<option>Python</option>
				<option>JavaScript</option>
			</select>
			<div class="flex gap-2">
				<button
					on:click={runTests}
					class="rounded-md bg-gray-100 px-4 py-2 text-sm text-gray-700 hover:bg-gray-200"
				>
					Run
				</button>
				<button
					on:click={submitSolution}
					class="rounded-md bg-blue-600 px-4 py-2 text-sm text-white hover:bg-blue-700"
				>
					Submit
				</button>
			</div>
		</div>

		<!-- Code Editor -->
		<div class="flex-1 overflow-auto bg-stone-900 p-4">
			<textarea
				bind:value={template.sample_code.cpp.function}
				class="h-full w-full resize-none bg-transparent font-mono text-sm text-gray-100 focus:outline-none"
				spellcheck="false"
			/>
		</div>

		<!-- Test Results -->
		<div class="h-64 overflow-y-auto border-t border-gray-200 p-4">
			<h3 class="mb-3 text-sm font-semibold text-white">Test Results</h3>
			<div class="space-y-2">
				{#each template.testResults as result (result.id)}
					<div
						class="flex items-center rounded-md p-2 text-sm {result.result === 'passed'
							? 'bg-green-50'
							: 'bg-red-50'}"
					>
						<span class={`mr-2 ${result.result === 'passed' ? 'text-green-500' : 'text-red-500'}`}>
							{result.result === 'passed' ? '✓' : '✗'}
						</span>
						Case {result.id}: {result.result === 'passed' ? 'Passed' : 'Failed'}
						{#if result.result === 'failed'}
							(Expected: {result.expected}, Output: {result.expected === '3' ? '2' : '?'})
						{/if}
					</div>
				{/each}
			</div>
		</div>
	</div>
</div>
