//import { promises as fs } from 'fs';
import { readFile } from 'fs/promises';
import { fileURLToPath } from 'url';
import path from 'path';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
async function readfileas() {
	const filePath = path.join(
		'/Users/bhushanbharat/Desktop/projects/lclone/frontend/src/lib/data/problemTable.json'
	);
	const data = await readFile(filePath, 'utf8');

	const ProblemTables = JSON.parse(data);
	console.log(ProblemTables);
}
readfileas();
