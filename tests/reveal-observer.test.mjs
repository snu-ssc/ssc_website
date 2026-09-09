import assert from "node:assert/strict";
import test from "node:test";
import { observeRevealNodes } from "../lib/reveal-observer.mjs";

test("registers cards inserted after the initial reveal scan", () => {
  const insertedDescendant = { matches: () => true };
  const insertedCard = {
    matches: () => true,
    querySelectorAll: () => [insertedDescendant],
  };
  const observed = [];

  observeRevealNodes([insertedCard], (node) => observed.push(node));

  assert.deepEqual(observed, [insertedCard, insertedDescendant]);
});
