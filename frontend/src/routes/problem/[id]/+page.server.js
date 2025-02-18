import { promises as fs } from 'fs';

export async function load({ params }) {
	const filePath =
		'/Users/bhushanbharat/Desktop/projects/lclone/frontend/src/lib/data/problems.json';
	const data = await fs.readFile(filePath, 'utf8');

	const Problems = JSON.parse(data);
	const Problem = Problems.filter((Problems) => Problems.id == params.id);
	return { problem: Problem };
}
