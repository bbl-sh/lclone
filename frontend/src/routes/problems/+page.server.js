import { promises as fs } from 'fs';
import path from 'path';

export async function load() {
	// Correct this line as it is for prototyping
	// const filePath = path.join(process.cwd(), 'lib', 'data', 'problemsTable.json');
	const filePath =
		'/Users/bhushanbharat/Desktop/projects/lclone/frontend/src/lib/data/problemTable.json';
	const data = await fs.readFile(filePath, 'utf8');

	const ProblemTables = JSON.parse(data);
	// The main reason of using this is if you return problemTable, and when you try to dereference it with data.problemTable it will throw undefined
	return { problemTable: ProblemTables };
}
