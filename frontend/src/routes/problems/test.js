// //import { promises as fs } from 'fs';
// import { readFile } from 'fs/promises';
// import { fileURLToPath } from 'url';
// import path from 'path';
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);
// async function readfileas() {
// 	const filePath = path.join(
// 		'/Users/bhushanbharat/Desktop/projects/lclone/frontend/src/lib/data/problemTable.json'
// 	);
// 	const data = await readFile(filePath, 'utf8');

// 	const ProblemTables = JSON.parse(data);
// 	console.log(ProblemTables);
// }
// readfileas();
import axios from 'axios';

const options = {
	method: 'POST',
	url: 'https://judge0-ce.p.rapidapi.com/submissions',
	params: {
		base64_encoded: 'true', // Base64 encoding enabled
		wait: 'true', // Wait for the execution result
		fields: '*'
	},
	headers: {
		'x-rapidapi-key': 'adc86e24c4msh4d5364e952aeee5p11702fjsnd8fd6281328f',
		'x-rapidapi-host': 'judge0-ce.p.rapidapi.com',
		'Content-Type': 'application/json'
	},
	data: {
		language_id: 71, // Corrected to Python 3
		source_code: Buffer.from('print("hellow")').toString('base64'), // Encode to Base64
		stdin: Buffer.from('a').toString('base64'), // Encode input
		expected_output: Buffer.from('hellow').toString('base64') // Encode expected output
	}
};

try {
	const response = await axios.request(options);
	console.log('Submission Response:', response.data);

	if (response.data.token) {
		console.log('Submission Token:', response.data.token);

		// Step 2: Fetch results
		const resultResponse = await axios.get(
			`https://judge0-ce.p.rapidapi.com/submissions/${response.data.token}`,
			{
				params: { base64_encoded: 'true', fields: '*' },
				headers: {
					'x-rapidapi-key': 'adc86e24c4msh4d5364e952aeee5p11702fjsnd8fd6281328f',
					'x-rapidapi-host': 'judge0-ce.p.rapidapi.com'
				}
			}
		);

		const resultData = resultResponse.data;

		// Decode Base64 output
		if (resultData.stdout) {
			resultData.stdout = Buffer.from(resultData.stdout, 'base64').toString();
		}
		if (resultData.expected_output) {
			resultData.expected_output = Buffer.from(resultData.expected_output, 'base64').toString();
		}
		if (resultData.stderr) {
			resultData.stderr = Buffer.from(resultData.stderr, 'base64').toString();
		}

		console.log('Execution Result:', resultData);
	}
} catch (error) {
	console.error('Error:', error.response?.data || error.message);
}

// server.js
//
//
import { json } from '@sveltejs/kit';
import axios from 'axios';

export async function POST({ request }) {
	try {
		// Ensure request body exists
		const body = await request.json();

		if (!body || !body.code || !body.language_id || !Array.isArray(body.test_cases)) {
			throw new Error("Invalid request data: 'code', 'language_id', or 'test_cases' missing");
		}

		const { code, language_id, test_cases } = body;

		// Ensure test cases have valid input and output
		const formattedTestCases = test_cases.map((tc) => ({
			stdin: tc.input
				? Buffer.from(tc.input).toString('base64')
				: Buffer.from('').toString('base64'),
			expected_output: tc.output
				? Buffer.from(tc.output).toString('base64')
				: Buffer.from('').toString('base64')
		}));

		const response = await axios.post(
			'https://judge0-ce.p.rapidapi.com/submissions',
			{
				language_id,
				source_code: Buffer.from(code, 'base64').toString(), // Decode source code from Base64
				stdin: formattedTestCases[0]?.stdin, // First test case input
				expected_output: formattedTestCases[0]?.expected_output
			},
			{
				headers: {
					'x-rapidapi-key': 'YOUR_RAPIDAPI_KEY',
					'x-rapidapi-host': 'judge0-ce.p.rapidapi.com',
					'Content-Type': 'application/json'
				}
			}
		);

		return json({ success: true, data: response.data });
	} catch (error) {
		console.error('Error submitting to Judge0:', error.message);
		return json({ success: false, error: error.message }, { status: 500 });
	}
}
