import assert from "node:assert/strict";
import test from "node:test";
import { resolveNotice } from "../lib/notice-resolver.mjs";

test("derives a Study notice summary and locale href from canonical program data", () => {
  const notice = {
    date: "03",
    month: "OCT",
    type: "Notice",
    title: "Fall Study Program Guide",
    programSlug: "study",
    actionLabel: "View guide",
  };
  const canonicalStudy = {
    slug: "study",
    summary: "Canonical parallel-track schedule",
  };

  const resolved = resolveNotice(notice, "en", (_locale, slug) => {
    assert.equal(slug, "study");
    return canonicalStudy;
  });

  assert.equal(resolved.summary, "Canonical parallel-track schedule");
  assert.equal(resolved.href, "/en/programs/study");
});
