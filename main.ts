// One-Line Laugh Sprint — u-daring-gecko-25-one-line-laugh-sprint-cda708b2
// Node 22, zero dependencies, no network, no environment secrets.
// Writes one original funny line about everyday life to /output/entry.txt
// (falling back to ./output/entry.txt when /output is not writable),
// with no trailing newline so the character count is exact.

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const LINE =
  "I set five alarms to wake up early and snoozed every one — which technically means I woke up early five times.";

function writeEntry(): string {
  for (const dir of ["/output", join(process.cwd(), "output")]) {
    try {
      mkdirSync(dir, { recursive: true });
      const file = join(dir, "entry.txt");
      writeFileSync(file, LINE, "utf8");
      return file;
    } catch {
      // /output not writable in a local run; try the next location.
    }
  }
  throw new Error("Could not write entry.txt to /output or ./output");
}

const written = writeEntry();
console.log(`Wrote ${LINE.length} characters to ${written}`);
