<script>
	import axios from 'axios';

	let selectedLanguage = 'C++'; // Default language
	let sampleCode = `#include <iostream>\nint main() { std::cout << "Hello, World!"; return 0; }`;
	let testResults = [];

	const languageMapping = {
		'C++': 52,
		Python: 71,
		JavaScript: 63
	};

	async function submitSolution() {
		try {
			const response = await axios.post('/api/judge', {
				code: sampleCode,
				language_id: languageMapping[selectedLanguage], // Convert to Judge0 language ID
				stdin: ''
			});

			if (response.data.success) {
				testResults = response.data.result;
				console.log('Test Results:', testResults);
			} else {
				console.error('Error:', response.data.error);
			}
		} catch (error) {
			console.error('Submission failed:', error);
		}
	}
</script>

<div class="h-64 overflow-y-auto border-t border-gray-200 p-4">
	<h3 class="mb-3 text-sm font-semibold text-white">Test Results</h3>
	<div class="space-y-2">
		{#if testResults}
			<div class="flex items-center rounded-md bg-gray-800 p-2 text-sm text-white">
				<p>Status: {testResults.status?.description}</p>
			</div>
			{#if testResults.stdout}
				<div class="bg-green-500 p-2 text-sm text-white">Output: {testResults.stdout}</div>
			{/if}
			{#if testResults.stderr}
				<div class="bg-red-500 p-2 text-sm text-white">Error: {testResults.stderr}</div>
			{/if}
		{/if}
	</div>
</div>
