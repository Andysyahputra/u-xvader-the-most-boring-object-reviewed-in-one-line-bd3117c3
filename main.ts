import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

// One-line review of the most boring everyday object: a shoelace.
// The joke comes from how it really behaves — it comes undone on its own,
// always at the worst moment.
const ENTRY =
  "My shoelace unties itself once a day, always at the top of the stairs, as if it has somewhere better to be.";

// Gate validation: the entry must be a single line of 1-200 characters,
// not only whitespace, written byte-exact to /output/entry.txt.
function validate(text: string): void {
  const chars = [...text].length;
  if (chars < 1 || chars > 200) {
    throw new Error(`entry must be 1-200 characters, got ${chars}`);
  }
  if (text.trim().length === 0) {
    throw new Error("entry must not be only whitespace");
  }
  if (text.includes("\n") || text.includes("\r")) {
    throw new Error("entry must be a single line");
  }
}

validate(ENTRY);

mkdirSync("/output", { recursive: true });
writeFileSync("/output/entry.txt", ENTRY, "utf8");

// Byte-exact check: read back what was written and confirm it matches
// the validated entry exactly, with no added newline or trailing bytes.
const written = readFileSync("/output/entry.txt", "utf8");
if (written !== ENTRY) {
  throw new Error("byte-exact check failed: /output/entry.txt does not match the validated entry");
}
if (Buffer.byteLength(written, "utf8") !== Buffer.byteLength(ENTRY, "utf8")) {
  throw new Error("byte-exact check failed: byte length mismatch");
}
