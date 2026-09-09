import assert from "node:assert/strict";
import test from "node:test";
import { filterPrograms } from "../lib/program-filter.mjs";

const programs = [
  { slug: "study", category: "Study" },
  { slug: "chip-design", category: "Project" },
  { slug: "technical-workshop", category: "Industry" },
  { slug: "industry-visit", category: "Industry" },
];

test("restores every program in stable source order after any filter", () => {
  for (const [category, expectedSlugs] of [
    ["Study", ["study"]],
    ["Project", ["chip-design"]],
    ["Industry", ["technical-workshop", "industry-visit"]],
  ]) {
    const filtered = filterPrograms(programs, category);

    assert.deepEqual(filtered.map(({ slug }) => slug), expectedSlugs);
    assert.ok(filtered.every((program) => program.category === category));
  }

  assert.deepEqual(
    filterPrograms(programs, "All").map(({ slug }) => slug),
    programs.map(({ slug }) => slug),
  );
});
