import assert from "node:assert/strict";
import test from "node:test";
import { observeRevealNodes } from "../lib/reveal-observer.mjs";

test("registers cards inserted after the initial reveal scan", () => {
  const insertedCard = { matches: () => true, querySelectorAll: () => [] };
  const observed = [];

  observeRevealNodes([insertedCard], (node) => observed.push(node));

  assert.deepEqual(observed, [insertedCard]);
});
