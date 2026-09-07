import assert from "node:assert/strict";
import test from "node:test";
import { closeOverlayOnEscape } from "../lib/overlay-state.mjs";

test("closes a program detail overlay only when Escape is pressed", () => {
  const selectedProgram = { title: "Chip Design Project" };

  assert.equal(closeOverlayOnEscape(selectedProgram, "Escape"), null);
  assert.equal(closeOverlayOnEscape(selectedProgram, "Enter"), selectedProgram);
});
