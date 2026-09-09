const homeUiCopy = {
  ko: {
    home: "SNU SemiCon 홈",
    primaryNavigation: "주요 탐색",
    switchToLight: "라이트 모드로 전환",
    switchToDark: "다크 모드로 전환",
    openMenu: "메뉴 열기",
    closeMenu: "메뉴 닫기",
    highlights: "SSC 주요 지표",
    programFilter: "프로그램 필터",
    galleryDetails: "상세 보기:",
    searchNews: "소식 검색",
    emptyState: "검색 결과가 없습니다.",
    closeModal: "대화 상자 닫기",
  },
  en: {
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
  },
};

export function getHomeUiCopy(locale) {
  return homeUiCopy[locale];
}
