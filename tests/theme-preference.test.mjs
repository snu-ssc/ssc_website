import assert from "node:assert/strict";
import test from "node:test";
import { resolveTheme } from "../lib/theme-preference.mjs";

test("uses a saved theme preference before the system preference", () => {
  assert.equal(resolveTheme("dark", false), "dark");
  assert.equal(resolveTheme("light", true), "light");
});

test("uses the system preference when no saved theme exists", () => {
  assert.equal(resolveTheme(null, true), "dark");
  assert.equal(resolveTheme(null, false), "light");
});
