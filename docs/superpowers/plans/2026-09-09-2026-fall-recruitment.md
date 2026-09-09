# SSC 2026 하반기 모집 정보 구조 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 기존 SSC 홈의 디자인 언어를 유지하면서 프로그램 상세 정보, 모집 CTA, 안정적인 필터 및 locale-preserving navigation을 제공한다.

**Architecture:** Program metadata는 `lib/program-data.ts` 한 곳에서 홈 카드와 detail route가 함께 읽는다. `/[locale]/programs/[slug]`의 static Server Component route와 `/[locale]/about`이 재사용 가능한 detail sections를 조합하며, 홈의 filter와 mobile navigation만 Client Component 경계를 유지한다.

**Tech Stack:** Next.js 16.2.4 App Router, React 19.2.4, TypeScript, CSS, Node built-in test runner, `next/image`, `next/link`.

**Spec:** `docs/superpowers/specs/2026-09-09-2026-fall-recruitment-design.md`

## Global Constraints

- Existing black/navy technical-editorial visual language, typography, spacing, and images stay recognizable.
- No dependency or CMS is added.
- Both Friday 16:00–18:00 and Saturday 11:00–13:00 run Circuit Design and Process & Device tracks in parallel.
- Recruitment always uses the public Google Form `/viewform` URL with `target="_blank" rel="noopener noreferrer"`.
- Internal paths use `Link`; local assets use `Image`; static detail pages retain Server Component rendering.
- Detail pages must work for `ko` and `en`, retain the same slug on locale switch, and have route metadata.
- All new behavior needs a test first; do not overwrite the user-owned `image/` folder in the parent worktree.

---

### Task 1: Create testable program and reveal behavior primitives

**Files:**
- Create: `tests/program-filter.test.mjs`
- Create: `tests/reveal-observer.test.mjs`
- Create: `lib/program-filter.mjs`
- Create: `lib/reveal-observer.mjs`
- Create: `lib/program-data.ts`

**Interfaces:**
- Consumes: Generic program-like objects with immutable `slug` and `category` properties.
- Produces: `filterPrograms<T extends { category: string }>(items: readonly T[], category: string): readonly T[]` and `observeRevealNodes(nodes, observe)`.
- Produces: `ProgramSlug`, `ProgramDetail`, `getPrograms(locale)`, and `getProgram(locale, slug)` for routes and cards.

- [x] **Step 1: Write the failing program filtering tests**

```js
import assert from "node:assert/strict";
import test from "node:test";
import { filterPrograms } from "../lib/program-filter.mjs";

const programs = [
  { slug: "study", category: "Study" },
  { slug: "chip-design", category: "Project" },
  { slug: "technical-workshop", category: "Industry" },
  { slug: "industry-visit", category: "Industry" },
];

test("restores every program in stable source order after any filter", () => {
  for (const category of ["Study", "Project", "Industry"]) {
    assert.ok(filterPrograms(programs, category).length > 0);
    assert.deepEqual(filterPrograms(programs, "All").map(({ slug }) => slug), programs.map(({ slug }) => slug));
  }
});
```

- [x] **Step 2: Run the filtering test and verify it fails because the module is missing**

Run: `node --test tests/program-filter.test.mjs`

Expected: failure resolving `../lib/program-filter.mjs`.

- [x] **Step 3: Implement the minimal pure filtering helper**

```js
export function filterPrograms(items, category) {
  return category === "All" ? items : items.filter((item) => item.category === category);
}
```

- [x] **Step 4: Run the filtering test and verify it passes**

Run: `node --test tests/program-filter.test.mjs`

Expected: pass with source order unchanged.

- [x] **Step 5: Write the failing dynamic reveal registration test**

```js
import assert from "node:assert/strict";
import test from "node:test";
import { observeRevealNodes } from "../lib/reveal-observer.mjs";

test("registers cards inserted after the initial reveal scan", () => {
  const insertedCard = { matches: () => true, querySelectorAll: () => [] };
  const observed = [];
  observeRevealNodes([insertedCard], (node) => observed.push(node));
  assert.deepEqual(observed, [insertedCard]);
});
```

- [x] **Step 6: Run the reveal test and verify it fails because the module is missing**

Run: `node --test tests/reveal-observer.test.mjs`

Expected: failure resolving `../lib/reveal-observer.mjs`.

- [x] **Step 7: Implement safe registration of a matching node and descendants**

```js
export function observeRevealNodes(nodes, observe) {
  for (const node of nodes) {
    if (typeof node?.matches !== "function") continue;
    if (node.matches("[data-reveal]")) observe(node);
    node.querySelectorAll?.("[data-reveal]").forEach(observe);
  }
}
```

- [x] **Step 8: Run both new tests and verify they pass**

Run: `node --test tests/program-filter.test.mjs tests/reveal-observer.test.mjs`

Expected: 2 passing tests.

- [x] **Step 9: Add locale-specific program metadata without duplicating home strings**

Create `lib/program-data.ts` with four immutable slugs and Korean/English copy. Give Study two parallel schedule cards and two field cards, give Workshop only verified Jeju copy and the two existing images, and use current home descriptions for Chip Design and Industry Visit.

- [x] **Step 10: Run type checking for the new data module**

Run: `npx.cmd tsc --noEmit`

Expected: no type errors from metadata types.

### Task 2: Build reusable server-rendered detail pages and route metadata

**Files:**
- Create: `components/detail-page-hero.tsx`
- Create: `components/recruitment-cta.tsx`
- Create: `components/related-programs.tsx`
- Create: `components/program-detail-page.tsx`
- Create: `components/about-page.tsx`
- Create: `app/[locale]/about/page.tsx`
- Create: `app/[locale]/programs/[slug]/page.tsx`
- Create: `tests/recruitment.test.mjs`
- Create: `lib/recruitment.mjs`
- Modify: `components/site-header.tsx`
- Modify: `components/members-page.tsx`
- Modify: `app/globals.css`

**Interfaces:**
- Consumes: `Locale`, `ProgramDetail`, `getProgram`, and public recruitment URL.
- Produces: server-rendered About and Program page bodies; static parameters and metadata for every locale/slug pair.
- Produces: `SiteHeader({ locale, path?: string })`, where `path` preserves detail location during locale switching.

- [x] **Step 1: Write a failing public-form URL test**

```js
import assert from "node:assert/strict";
import test from "node:test";
import { recruitmentFormUrl } from "../lib/recruitment.mjs";

test("uses the respondent-facing Google Form URL", () => {
  assert.match(recruitmentFormUrl, /\/viewform$/);
  assert.doesNotMatch(recruitmentFormUrl, /\/edit$/);
});
```

- [x] **Step 2: Run the form URL test and verify it fails because the module is missing**

Run: `node --test tests/recruitment.test.mjs`

Expected: failure resolving `../lib/recruitment.mjs`.

- [x] **Step 3: Add the minimal public form constant**

```js
export const recruitmentFormUrl = "https://docs.google.com/forms/d/19FsDy0QHkRjHTY8tRP8bGWHCyUIqHIpIvJSUp--ivAA/viewform";
```

- [x] **Step 4: Run the form URL test and verify it passes**

Run: `node --test tests/recruitment.test.mjs`

Expected: 1 passing test.

- [x] **Step 5: Implement reusable server components**

Use semantic heading levels and the existing numbered/tactical styling. `RecruitmentCta` must render one explicit new-tab anchor with `target="_blank"`, `rel="noopener noreferrer"`, and Korean/English copy. `RelatedPrograms` omits the current slug and makes every card a `Link`.

- [x] **Step 6: Implement static App Router pages**

Use `generateStaticParams()` for both locales and all program slugs. Await Next 16 `params`, guard locale and slug with `notFound()`, and export `generateMetadata()` using the actual program title and summary.

- [x] **Step 7: Extend header locale preservation and mobile semantics**

Replace the `page: "members"` prop with a safe optional path string. Render home-section links as `/${locale}#…`, preserve `path` in language links, close the menu on navigation, and provide an explicit keyboard-visible menu button style.

- [x] **Step 8: Add detail page CSS and responsive constraints**

Create only CSS classes needed for detail hero, information cards, track cards, image gallery, related-program links, CTA, and header mobile state. At ≤800px, use a single column and ensure `min-width: 0` on text grids.

- [x] **Step 9: Run static route type check and production build**

Run: `npx.cmd tsc --noEmit` then `npm.cmd run build`

Expected: `ko` and `en` About plus four program details statically compile with metadata.

### Task 3: Connect the home to detail routes and recruitment information

**Files:**
- Modify: `lib/landing-data.ts`
- Modify: `components/home-page.tsx`
- Modify: `app/globals.css`
- Modify: `next.config.ts`

**Interfaces:**
- Consumes: `getPrograms(locale)`, `filterPrograms`, `observeRevealNodes`, `recruitmentFormUrl`, locale-aware `href` values.
- Produces: Home cards that link to actual details, recruitment and study notice links, and a discoverable About detail link.

- [x] **Step 1: Move home program copy to the shared data source**

Remove `landing[locale].programs`; retain only the program section introduction in `landing-data.ts`. Make the Study summary accurately say that Circuit Design and Process & Device run together in both time windows.

- [x] **Step 2: Extend notice data with actions**

Set Korean recruitment copy to `지원하기 ↗` and English to `Apply ↗`; point both to the public form. Set the 2학기/ Fall Study Guide summary to mention both parallel tracks and link it to `/${locale}/programs/study`. Keep the industry talk as a non-link until a real destination exists.

- [x] **Step 3: Replace program modal controls with Links**

Use `item.slug` as React key and its immutable visual index. Internal Links must not force a new browser tab. Remove obsolete selected-program state, dialog, and global click targeting for cards.

- [x] **Step 4: Replace eligible notice controls with semantic anchors**

Render a whole linked notice row only when data contains an `href`. Use `Link` for Study and a plain anchor with safe external attributes for recruitment. Do not attach modal behavior to either.

- [x] **Step 5: Add an About detail entry point**

Add `Link href={\`/${locale}/about\`}` to the home About intro using the existing CTA language and focus treatment.

- [x] **Step 6: Fix dynamic reveal registration at the source**

Use one `IntersectionObserver` and one `MutationObserver` in `useReveal()`. Scan existing nodes, observe every added matching node with `observeRevealNodes`, and disconnect both observers on cleanup. Do not remove the reveal animation.

- [x] **Step 7: Replace lint-invalid initial theme effect**

Use `useSyncExternalStore` to read saved/system theme after hydration with a server snapshot. Keep DOM dataset and `localStorage` writes in an effect, and restrict `setState` to user click or external-store callbacks.

- [x] **Step 8: Improve the hero otter without overpowering copy**

Use Next 16 `preload` rather than deprecated `priority`, explicit quality permitted by `next.config.ts`, realistic `sizes`, `object-fit: contain`, and a mobile opacity high enough to retain the mascot silhouette. Preserve the content z-index above the image.

- [x] **Step 9: Run targeted tests and lint**

Run: `node --test tests/program-filter.test.mjs tests/reveal-observer.test.mjs tests/recruitment.test.mjs` then `npm.cmd run lint`

Expected: targeted tests and lint pass.

### Task 4: Verify route, interaction, and responsive behavior

**Files:**
- Modify only if verification exposes an in-scope issue: relevant file from Tasks 1–3.

**Interfaces:**
- Consumes: completed static routes and dev server output.
- Produces: evidence for route availability, public form link, responsive grid behavior, and no filter-card disappearance.

- [x] **Step 1: Start the dev server with the Windows-safe command**

Run: `npm.cmd run dev`

Expected: local Next server reports ready.

- [x] **Step 2: Verify static response and route status**

Run: `curl.exe -fsSL http://localhost:3000/ko/programs/study`, repeat for all route/locale pairs.

Expected: every requested detail route returns HTML containing its locale-specific title.

- [x] **Step 3: Verify public recruitment URL and internal Study URL in rendered home HTML**

Run: `curl.exe -fsSL http://localhost:3000/ko | Select-String 'viewform|/ko/programs/study'`

Expected: public Google Form and Study detail paths are present; no `/edit` URL appears.

- [x] **Step 4: Exercise filter sequences through the testable helper**

Run: `node --test tests/program-filter.test.mjs`

Expected: All → Study/Project/Industry → All and cross-category → All retain all four slugs in source order.

- [x] **Step 5: Render desktop and mobile screenshots if the local browser harness is available**

Use a 1440px and 390px viewport. Confirm no horizontal overflow, readable Korean line breaks, CTA wrapping, header menu behavior, and visible otter crop. If the harness fails due to environment-level GPU/ACL constraints, record the exact error and retain CSS-level checks.

- [x] **Step 6: Run full verification**

Run: `npm.cmd run lint`, `npx.cmd tsc --noEmit`, `node --test tests/*.test.mjs`, and `npm.cmd run build`.

Expected: all commands pass with no errors.

### Task 5: Review, commit, and handoff

**Files:**
- Modify: `docs/superpowers/plans/2026-09-09-2026-fall-recruitment.md` to check completed boxes only.

**Interfaces:**
- Consumes: verification output and changed files.
- Produces: review evidence, a clean feature-branch commit, and concise delivery report.

- [x] **Step 1: Read every changed file and compare to the spec**

Verify that all four detail slugs, About, both locales, public form URL, parallel Study schedule, and data-driven source of truth are present.

- [x] **Step 2: Inspect the diff for copy duplication, inappropriate client boundaries, malformed external links, and unstaged generated files**

Run: `git diff --check` and `git status --short`.

Expected: no whitespace errors and no generated output tracked.

- [x] **Step 3: Commit the implementation after verification**

Run: `git add <verified changed files>` then `git commit -m "feat: add 2026 recruitment program details"`.

Expected: feature branch contains the verified implementation only.
