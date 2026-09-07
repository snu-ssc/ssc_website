import assert from "node:assert/strict";
import test from "node:test";
import { filterCompleteMemberEntries } from "../lib/member-directory.mjs";

test("excludes blank and partial member names from the directory", () => {
  const entries = [
    ["배성준", "회장", "President"],
    ["김예", "부회장", "Vice President"],
    ["", "Member", "Member"],
    ["Ari", "Member", "Member"],
  ];

  assert.deepEqual(filterCompleteMemberEntries(entries), [
    ["배성준", "회장", "President"],
    ["Ari", "Member", "Member"],
  ]);
});
