import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const LINE =
  "I bought the dip, then the dip bought a shovel and kept digging.";

function main(): void {
  if (LINE.length < 1 || LINE.length > 200) {
    throw new Error(`entry must be 1 to 200 characters, got ${LINE.length}`);
  }
  if (LINE.trim().length === 0) {
    throw new Error("entry must not be only white space");
  }
  if (LINE.includes("\n") || LINE.includes("\r")) {
    throw new Error("entry must be a single line");
  }
  if (/[\u0000-\u001f\u007f]/.test(LINE)) {
    throw new Error("entry must not contain control characters");
  }

  const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
  mkdirSync(outDir, { recursive: true });
  const outPath = join(outDir, "entry.txt");
  writeFileSync(outPath, LINE, "utf8");

  const roundTrip = readFileSync(outPath, "utf8");
  if (roundTrip !== LINE) {
    throw new Error("round-trip check failed: entry.txt does not match the line");
  }
}

main();
