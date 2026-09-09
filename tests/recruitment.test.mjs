import assert from "node:assert/strict";
import test from "node:test";
import { recruitmentFormUrl } from "../lib/recruitment.mjs";

test("uses the respondent-facing Google Form URL", () => {
  assert.match(recruitmentFormUrl, /\/viewform$/);
  assert.doesNotMatch(recruitmentFormUrl, /\/edit$/);
});
