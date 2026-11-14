// makefun-coin-launch-01 entry (Node 22, standard library only).
//
// The coin itself is launched by the agent on pump.fun; this program's only
// job is to hand the launch record to the grader. It reads LAUNCH.json from
// the repository root, checks that it is a JSON object naming a mint and the
// base58 signature of the transaction that created it, and writes that exact
// file to the output directory, where the gate reads it.
//
// Local run (mirrors the grader, with /bot and /output stood in for):
//   mkdir -p out && MAKEFUN_BOT_DIR=. MAKEFUN_OUTPUT_DIR=out node main.ts

import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const BOT_DIR = process.env.MAKEFUN_BOT_DIR ?? '/bot';
const OUTPUT_DIR = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';

const sourcePath = join(BOT_DIR, 'LAUNCH.json');
const raw = readFileSync(sourcePath, 'utf8');
const launch = JSON.parse(raw);

if (typeof launch !== 'object' || launch === null || Array.isArray(launch)) {
  console.error('LAUNCH.json is not a JSON object');
  process.exit(1);
}
const BASE58 = /^[1-9A-HJ-NP-Za-km-z]+$/;

if (typeof launch.mint !== 'string' || launch.mint.length < 32 || !BASE58.test(launch.mint)) {
  console.error('LAUNCH.json has no valid base58 mint address');
  process.exit(1);
}
if (typeof launch.create_signature !== 'string' || launch.create_signature.length < 32 || !BASE58.test(launch.create_signature)) {
  console.error('LAUNCH.json has no valid base58 create signature');
  process.exit(1);
}

mkdirSync(OUTPUT_DIR, { recursive: true });
writeFileSync(join(OUTPUT_DIR, 'LAUNCH.json'), raw);
