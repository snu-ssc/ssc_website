# SSC 2026 하반기 모집 정보 구조 확장 설계

## 목표

지원자가 홈에서 SSC의 활동을 빠르게 파악하고, 관심 프로그램의 상세 정보를 읽은 뒤 자연스럽게 2026 하반기 지원서로 이동할 수 있게 한다. 기존의 절제된 반도체·에디토리얼 시각 언어를 보존하고, 정적 콘텐츠는 App Router의 Server Component로 제공한다.

## 현재 구조와 제약

- Next.js 16.2.4 App Router이며, `/[locale]`에서 `ko`와 `en`을 정적으로 생성한다.
- 홈은 여러 인터랙션 때문에 Client Component다. 상세 페이지는 서버 렌더링을 기본으로 한다.
- `landing-data.ts`가 홈 프로그램·뉴스의 현재 source of truth다. 프로그램 상세 정보를 별도 페이지에 중복하면 유지보수가 어려워진다.
- 이미 있는 자산은 1536×1024 투명 PNG 해달과 제주 워크숍 사진 두 장뿐이다. 다른 활동의 사진이나 사실은 새로 만들지 않는다.
- Google Form은 반드시 공개 응답 URL `https://docs.google.com/forms/d/19FsDy0QHkRjHTY8tRP8bGWHCyUIqHIpIvJSUp--ivAA/viewform`만 사용한다.

## 정보 구조

정적 세그먼트와 데이터 기반 동적 세그먼트를 조합한다.

```text
/[locale]
/[locale]/about
/[locale]/programs/[slug]
  - study
  - chip-design
  - technical-workshop
  - industry-visit
```

`generateStaticParams()`가 두 locale과 네 program slug를 모두 생성한다. 존재하지 않는 locale 또는 slug는 `notFound()`로 처리한다. 프로그램 하나당 page 파일을 만들지 않고, 공통 `ProgramDetailPage` 템플릿이 locale별 program metadata를 렌더링한다.

## 콘텐츠와 데이터 경계

`lib/program-data.ts`가 홈 카드와 상세 페이지가 함께 쓰는 program title, category, tag, summary, CTA, 소개 섹션, 기존 이미지 참조를 소유한다. `landing-data.ts`는 홈의 hero, about preview, news, FAQ처럼 프로그램과 독립적인 카피만 유지한다.

각 program에는 다음 최소 필드가 있다.

```ts
type ProgramDetail = {
  slug: ProgramSlug;
  category: ProgramCategory;
  index: string;
  tag: string;
  title: string;
  summary: string;
  overview: string;
  sections: Array<{ eyebrow: string; title: string; body: string; bullets?: string[] }>;
  image?: { src: string; alt: string };
};
```

스터디 데이터는 오해를 막기 위해 날짜별 트랙을 분리하지 않는다. **금요일 16:00–18:00과 토요일 11:00–13:00의 두 시간대 모두에서 Circuit Design과 Process & Device가 동시에 진행된다.** 상세 페이지에는 시간대 카드와 두 트랙 카드를 별도로 보여 준다.

News 데이터에는 optional `href`, `external`, `actionLabel`을 추가한다. 모집 행은 외부 `<a target="_blank" rel="noopener noreferrer">`, 정규 스터디 행은 `next/link`로 Study 상세 페이지를 사용한다. 링크가 없는 행은 링크처럼 보이는 control을 만들지 않는다.

## 렌더링과 컴포넌트 설계

- `ProgramDetailPage`: 서버 컴포넌트. hero/title, overview, evidence/track sections, optional image, related programs, 공통 모집 CTA를 조합한다.
- `AboutPage`: 서버 컴포넌트. 기존 Learn / Build / Connect, club mission, 초보자 FAQ 응답을 조금 더 설명하고 공통 CTA를 제공한다.
- `RecruitmentCta`: 서버 컴포넌트. 한국어/영어 카피만 받아 공개 Google Form에 안전하게 연결한다.
- `DetailPageHero`와 `RelatedPrograms`: 서버 컴포넌트. detail template에서 재사용한다.
- `SiteHeader`: detail page와 members page에서 공유한다. `path`를 받아 locale switch가 현재 상세 페이지를 유지하게 하고, mobile menu는 이 컴포넌트 안의 작은 Client Component 경계로 유지한다.
- `ProgramsExplorer`: 홈의 필터만 담당하는 Client Component. stable slug key와 program metadata를 사용한다.

홈의 기존 gallery, FAQ, theme control, mobile nav는 불필요하게 다시 만들지 않는다. 프로그램 detail modal은 page navigation으로 대체한다. 뉴스 detail modal은 모집/스터디의 실제 링크로 대체한다.

## 필터 버그의 원인과 수정 방향

현재 `useReveal()`는 초기 마운트 때의 `[data-reveal]`만 `IntersectionObserver`에 등록한다. 필터 전환으로 새로 mount된 Program card는 base CSS의 `opacity: 0`을 유지하므로 All로 되돌아올 때 사라진 것처럼 보인다. filter state, React key, CSS grid, 그리고 animation library는 원인이 아니다.

`useReveal()`를 새 DOM node도 등록하는 observer로 바꾸거나, dynamic program card에 callback ref를 적용한다. 선택한 방식은 `MutationObserver`로 새 `[data-reveal]` 노드를 `IntersectionObserver`에 연결하는 것으로, gallery나 future dynamic content에도 같은 reveal behavior를 보장한다. 카드 keys는 title 대신 immutable slug를 사용하고 visual index도 metadata의 index에서 파생한다.

## 시각·접근성·성능 원칙

- black/navy neutral, strong type, number label, thin technical line을 재사용한다. gradients, glass cards, 새 icon 세트는 추가하지 않는다.
- detail page는 큰 heading, numbered segment, field/card contrast, 충분한 whitespace를 사용한다.
- 해달은 이미 고해상도 원본이다. 모바일의 과도하게 낮은 opacity를 올리고, `next/image`의 `preload`, `sizes`, supported quality 설정을 적용한다. text readability는 z-index와 crop으로 보존한다.
- internal navigation은 `Link`, local images는 `Image`, detail route는 static metadata와 static params를 사용한다.
- visible focus state, semantic `main`/`section`/`article`, image alt, external link의 새 탭 의미를 보장한다.
- 작은 화면에서 detail grids, CTA, filter button은 wrap/one-column으로 전환하며 horizontal overflow를 만들지 않는다.

## 검증 범위

- program filtering helper로 All → Study/Project/Industry → All, cross-category → All에서 stable slug order를 테스트한다.
- program metadata lookup, static detail route source, public form URL과 external-link attributes를 정적/DOM 레벨에서 확인한다.
- lint, TypeScript `tsc --noEmit`, Node test suite, `next build`를 실행한다.
- dev output과 headless-browser 가능 여부를 이용해 route status, rendered links, desktop/mobile CSS constraint를 점검한다. browser automation 환경이 실패하면 그 원인을 별도로 기록한다.
