import assert from "node:assert/strict";
import test from "node:test";
import { recruitmentFormUrl } from "../lib/recruitment.mjs";

test("uses the exact respondent-facing Google Form URL", () => {
  assert.equal(
    recruitmentFormUrl,
    "https://docs.google.com/forms/d/19FsDy0QHkRjHTY8tRP8bGWHCyUIqHIpIvJSUp--ivAA/viewform",
  );
  assert.match(recruitmentFormUrl, /\/viewform$/);
  assert.doesNotMatch(recruitmentFormUrl, /\/edit$/);
});
