import { promises as fs } from 'fs';
import { join } from 'path';

export async function load({ params }) {
	const cwd = process.cwd();
	const filePath = join(cwd, 'src/lib/data/problems.json');
	const data = await fs.readFile(filePath, 'utf8');
	console.log(params.slug);
}
