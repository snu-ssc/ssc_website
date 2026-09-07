import assert from "node:assert/strict";
import test from "node:test";
import { closeOnEscape, nextMenuOpenState } from "../lib/mobile-nav-state.mjs";

test("toggles the mobile menu from its current state", () => {
  assert.equal(nextMenuOpenState(false), true);
  assert.equal(nextMenuOpenState(true), false);
});

test("only Escape closes an open mobile menu", () => {
  assert.equal(closeOnEscape(true, "Escape"), false);
  assert.equal(closeOnEscape(true, "Enter"), true);
  assert.equal(closeOnEscape(false, "Escape"), false);
});
