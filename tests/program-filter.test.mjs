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
  for (const category of ["Study", "Project", "Industry"]) {
    assert.ok(filterPrograms(programs, category).length > 0);
    assert.deepEqual(
      filterPrograms(programs, "All").map(({ slug }) => slug),
      programs.map(({ slug }) => slug),
    );
  }
});
