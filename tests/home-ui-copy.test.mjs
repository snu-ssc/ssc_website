import assert from "node:assert/strict";
import test from "node:test";
import { getHomeUiCopy } from "../lib/home-ui-copy.mjs";

test("provides English labels for every HomePage-only accessible control and state", () => {
  assert.deepEqual(getHomeUiCopy("en"), {
    home: "SNU SemiCon home",
    primaryNavigation: "Primary navigation",
    switchToLight: "Switch to light mode",
    switchToDark: "Switch to dark mode",
    openMenu: "Open menu",
    closeMenu: "Close menu",
    highlights: "SSC highlights",
    programFilter: "Program filters",
    galleryDetails: "View details for",
    searchNews: "Search news",
    emptyState: "No results found.",
    closeModal: "Close dialog",
  });
});

test("does not reuse English HomePage labels for Korean controls and states", () => {
  const korean = getHomeUiCopy("ko");
  const english = getHomeUiCopy("en");

  for (const key of Object.keys(english)) {
    assert.notEqual(korean[key], english[key]);
  }
});
