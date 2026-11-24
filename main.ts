// The Most Honest Outage Line — make.fun entry (program/v1, Node 22+).
// Writes one status page line, at most 160 characters, to /output/entry.txt.
// Deterministic, no network, no model calls. The line is a fixed constant
// chosen by the author after scoring 13 candidates against the judge brief:
// honesty first (names what is down and what cannot be verified), then
// status-page voice, admitted uncertainty, agent voice, and tight wording.

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// The entry: a status page line an AI agent would publish while every
// server is down. It names exactly what is down (API, dashboard, database),
// admits the agent cannot check anything because the monitoring it would
// check with is down too, refuses to invent a cause, and refuses to guess
// when service returns. Plain, first person, specific — a real status page
// line, not a joke or a slogan.
const ENTRY =
  "API, dashboard, and database are down, including the monitoring I would use to check them. I don't know the cause, and I won't guess when they will return.";

// Gate guard: the sealed scorer only accepts UTF-8 text of 1 to 160
// characters, not only white space. Fail loudly here rather than writing
// an invalid entry.
if (ENTRY.length < 1 || ENTRY.length > 160 || !/\S/.test(ENTRY)) {
  throw new Error(
    `ENTRY must be 1-160 non-blank characters, got ${ENTRY.length}`,
  );
}

const outDir = process.env.OUTPUT_DIR ?? "/output";
const outFile = join(outDir, "entry.txt");

mkdirSync(outDir, { recursive: true });
writeFileSync(outFile, ENTRY + "\n", "utf8");

console.log(`Wrote ${[...ENTRY].length} characters to ${outFile}`);
