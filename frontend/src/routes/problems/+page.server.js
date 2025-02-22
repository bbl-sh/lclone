import { promises as fs } from 'fs';
import { join } from 'path';

export async function load() {
	const cwd = process.cwd();
	const filePath = join(cwd, 'src/lib/data/problemTable.json');
	const data = await fs.readFile(filePath, 'utf8');

	const ProblemTables = JSON.parse(data);
	// The main reason of using this is if you return problemTable, and when you try to dereference it with data.problemTable it will throw undefined
	return { problemTable: ProblemTables };
}
