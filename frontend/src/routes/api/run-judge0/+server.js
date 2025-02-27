// This judge0 suport is removed
import { JUDGE0_API_KEY } from '$env/static/private';
import { json } from '@sveltejs/kit';
import axios from 'axios';

export async function POST({ request }) {
	try {
		const { code, language_id, test_cases } = await request.json();
		// const codetest = 'x = input()\nprint(x)';
		// const test_cases_test = [
		// 	{ id: 1, input: '2', expected: '2' },
		// 	{ id: 2, input: '3', expected: '3' },
		// 	{ id: 3, input: '5', expected: '2' }
		// ];
		// console.log('test cases are these : ', test_cases);
		// console.log(code);
		// console.log(apiKey);
		// Ensure test_cases is an array
		if (!Array.isArray(test_cases) || test_cases.length === 0) {
			throw new Error('Test cases are missing or not an array');
		}

		// Encode source code in Base64
		console.log(code);
		const encodedCode = Buffer.from(code || '').toString('base64'); // just an addition for errors

		const submissions = test_cases.map((tc) => ({
			language_id,
			source_code: encodedCode,
			stdin: Buffer.from(tc.input || '').toString('base64'), // Ensure input is a string
			expected_output: Buffer.from(tc.expected || '').toString('base64') // Ensure output is a string
		}));

		//console.log('Sending submissions to Judge0:', submissions);

		const submissionResponse = await axios.post(
			'https://judge0-ce.p.rapidapi.com/submissions/batch',
			{ submissions },
			{
				params: { base64_encoded: 'true', wait: 'false', fields: '*' },
				headers: {
					'x-rapidapi-key': JUDGE0_API_KEY,
					'x-rapidapi-host': 'judge0-ce.p.rapidapi.com',
					'Content-Type': 'application/json'
				}
			}
		);

		//console.log('Judge0 Submission Response:', submissionResponse.data);
		// For the tokens, since it's api's response
		const tokens = submissionResponse.data.map((sub) => sub.token);
		// Now get the response from that token using get
		let results = [];
		let attempts = 0;
		while (attempts < 10) {
			const resultResponses = await Promise.all(
				tokens.map((token) =>
					axios.get(`https://judge0-ce.p.rapidapi.com/submissions/${token}`, {
						params: { base64_encoded: 'true', fields: '*' },
						headers: {
							'x-rapidapi-key': JUDGE0_API_KEY,
							'x-rapidapi-host': 'judge0-ce.p.rapidapi.com'
						}
					})
				)
			);

			results = resultResponses.map((res) => res.data);

			if (results.every((r) => r.status && r.status.id >= 3)) break;

			await new Promise((res) => setTimeout(res, 1000));
			attempts++;
		}

		//console.log('Judge0 Results:', results);

		// Decode Base64 outputs to find errors
		results = results.map((res, i) => ({
			id: i + 1,
			status: res.status?.description,
			stdout: res.stdout ? Buffer.from(res.stdout, 'base64').toString() : null,
			expected_output: test_cases[i]?.output || null, // Use the correct expected output
			stderr: res.stderr ? Buffer.from(res.stderr, 'base64').toString() : null,
			passed: res.stdout
				? Buffer.from(res.stdout, 'base64').toString() === (test_cases[i]?.output || '')
				: false
		}));

		return json({ success: true, results });
	} catch (error) {
		console.error('Error submitting to Judge0:', error.message);
		return json({ success: false, error: error.message }, { status: 500 });
	}
}
