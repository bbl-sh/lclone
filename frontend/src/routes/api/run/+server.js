import { CUSTOM_JUDGE0_API } from '$env/static/private'; // Define this in your environment variables
import { json } from '@sveltejs/kit';
import axios from 'axios';

export async function POST({ request }) {
	const { code, language_id, test_cases } = await request.json();

	try {
		const response = await axios.post(
			CUSTOM_JUDGE0_API,
			{ code, language_id, test_cases },
			{
				headers: {
					'Content-Type': 'application/json'
				}
			}
		);

		console.log(response.data);
		return json(response.data);
	} catch (error) {
		console.error('Error forwarding request:', error);
		return json({ error: 'Failed to process request' }, { status: 500 });
	}
}
