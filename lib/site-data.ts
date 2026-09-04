export const locales = ["ko", "en"] as const;

export type Locale = (typeof locales)[number];

export const isLocale = (value: string): value is Locale =>
  locales.includes(value as Locale);

type Area = { name: string; description: string };

type Copy = {
  nav: { about: string; focus: string; projects: string; members: string; contact: string };
  hero: { school: string; title: string; description: string; primary: string; secondary: string; statement: string };
  about: { title: string; description: string; pillars: { title: string; body: string }[] };
  areas: { eyebrow: string; title: string; description: string; items: Area[] };
  projects: { eyebrow: string; title: string; description: string; items: { title: string; body: string; image?: string; alt?: string }[] };
  members: { eyebrow: string; title: string; description: string; button: string };
  contact: { eyebrow: string; title: string; lead: string; description: string; chooser: string };
  footer: { school: string; language: string };
};

export const content: Record<Locale, Copy> = {
  ko: {
    nav: { about: "소개", focus: "분야", projects: "주요 활동", members: "멤버", contact: "문의" },
    hero: { school: "SNU SemiCon · 서울대학교", title: "반도체를 함께 배우고\n설계하는 커뮤니티", description: "Study와 Hands-on Project를 통해\n반도체의 가능성을 함께 탐구합니다", primary: "SSC 소개 보기", secondary: "주요 활동 보기", statement: "함께 질문하고,\n직접 설계합니다" },
    about: { title: "반도체를 향한\n더 깊은 탐구", description: "SSC는 반도체 기술을 함께 배우고, 직접 설계하며, 산업과 연결되는 경험을 만들어가는 서울대학교 커뮤니티입니다", pillars: [{ title: "Learn / Study", body: "기초부터 최신 기술까지 함께 읽고 토론합니다" }, { title: "Build / Project", body: "아이디어를 설계와 검증으로 직접 완성합니다" }, { title: "Connect / Industry", body: "연구와 산업의 현장을 가까이에서 만납니다" }] },
    areas: { eyebrow: "Core Areas", title: "SSC가 함께 탐구하는 Core Areas", description: "소자부터 시스템까지, 서로 다른 관점이 하나의 반도체 흐름으로 이어집니다", items: [{ name: "IC Design", description: "회로와 아키텍처를 설계하며 아이디어를 실제 칩의 언어로 구현합니다" }, { name: "EDA", description: "설계 자동화 흐름과 검증을 이해하며 더 정교한 설계 방법을 탐구합니다" }, { name: "AI Hardware", description: "AI 연산을 위한 효율적인 하드웨어와 시스템의 가능성을 살펴봅니다" }, { name: "Foundry", description: "공정과 제조 관점에서 반도체가 만들어지는 과정을 이해합니다" }, { name: "Packaging", description: "칩과 시스템을 연결하는 패키징 기술의 역할을 탐구합니다" }, { name: "Semiconductor System", description: "소자와 회로, 시스템이 만나는 지점에서 반도체의 쓰임을 넓혀갑니다" }] },
    projects: { eyebrow: "Projects & Activities", title: "주요 활동", description: "설계와 기술 교류, 그리고 학술 현장에서 이어지는 SSC의 활동입니다", items: [{ title: "제주 Technical Workshop", body: "제주에서 함께한 기술 교류와 SSC의 첫 Workshop", image: "/images/activities/jeju-technical-workshop.jpg", alt: "노트북으로 Technical Workshop 활동을 진행하는 SSC 멤버들" }, { title: "Individual Chip Design Projects", body: "아이디어부터 설계까지 직접 완성하는 개인 Chip Design" }, { title: "대한전자공학회 2026 하계종합학술대회", body: "반도체와 ICT 분야의 최신 연구를 함께 살펴본 학술 교류" }] },
    members: { eyebrow: "Members", title: "SSC를 함께 만들어가는\nMembers", description: "각자의 전공과 관심 분야를 바탕으로 배우고, 만들고, 연결되는 사람들", button: "멤버 소개 보기" },
    contact: { eyebrow: "Contact", title: "문의", lead: "SSC와 함께할 새로운 연결을 기다립니다", description: "이메일로 문의하거나 Instagram에서 SSC의 소식을 확인해보세요", chooser: "언어 선택" },
    footer: { school: "서울대학교", language: "언어 선택" },
  },
  en: {
    nav: { about: "About", focus: "Focus", projects: "Projects", members: "Members", contact: "Contact" },
    hero: { school: "SNU SemiCon · Seoul National University", title: "A community that learns and\ndesigns semiconductors together", description: "Explore semiconductors through study,\nhands-on projects, and shared ambition", primary: "Discover SSC", secondary: "Explore Projects", statement: "Learn together.\nBuild with intent." },
    about: { title: "Explore deeper,\nbuild together", description: "SSC is a Seoul National University community for learning, designing, and connecting through semiconductor technology.", pillars: [{ title: "Learn / Study", body: "Read, discuss, and build a shared technical foundation." }, { title: "Build / Project", body: "Carry ideas through design, validation, and iteration." }, { title: "Connect / Industry", body: "Meet research and industry where the field is moving." }] },
    areas: { eyebrow: "Core Areas", title: "Core areas we explore", description: "From devices to systems, different perspectives meet in one semiconductor workflow.", items: [{ name: "IC Design", description: "Translate ideas into silicon through circuits and architecture." }, { name: "EDA", description: "Explore design automation, verification, and precise design workflows." }, { name: "AI Hardware", description: "Study efficient hardware and systems for emerging AI workloads." }, { name: "Foundry", description: "Understand how semiconductors are made through process and manufacturing perspectives." }, { name: "Packaging", description: "Explore packaging technologies that connect chips into complete systems." }, { name: "Semiconductor System", description: "Extend applications where devices, circuits, and systems converge." }] },
    projects: { eyebrow: "Projects & Activities", title: "Projects & Activities", description: "SSC brings technical work, peer exchange, and formal academic experiences into one portfolio.", items: [{ title: "Jeju Technical Workshop", body: "A focused technical workshop and team exchange in Jeju", image: "/images/activities/jeju-technical-workshop.jpg", alt: "SSC members working on laptops at the Jeju Technical Workshop" }, { title: "Individual Chip Design Projects", body: "From ideas to hands-on chip design" }, { title: "IEIE 2026 Summer General Conference", body: "Exploring current research and industry perspectives in semiconductor and ICT" }] },
    members: { eyebrow: "Members", title: "The people building\nSSC together", description: "Students from different fields who learn, build, and connect around semiconductors.", button: "Meet our members" },
    contact: { eyebrow: "Contact", title: "Contact", lead: "Let’s build the next connection together", description: "Reach out by email or follow SSC on Instagram", chooser: "Language" },
    footer: { school: "Seoul National University", language: "Language" },
  },
};

type MemberEntry = readonly [name: string, roleKo?: string, roleEn?: string];
export const memberGroups: { key: string; title: Record<Locale, string>; label: string; members: readonly MemberEntry[] }[] = [
  { key: "leadership", title: { ko: "운영진", en: "Leadership" }, label: "Leadership", members: [["배성준", "회장", "President"], ["김예원", "부회장", "Vice President"], ["안휘준", "부회장", "Vice President"]] },
  { key: "advisors", title: { ko: "고문", en: "Advisors" }, label: "Advisors", members: [["오세현", "고문", "Advisor"], ["한수관", "고문", "Advisor"]] },
  { key: "founders", title: { ko: "Founder", en: "Founders" }, label: "Founders", members: [["박병규", "Founder", "Founder"], ["성정후", "Founder", "Founder"]] },
  { key: "members", title: { ko: "1기 Members", en: "1st Generation Members" }, label: "1st Generation", members: [["김규림"], ["박서정"], ["이효서"], ["윤태현"], ["이예지"], ["박동휘"], ["이상원"], ["이상준"], ["임시훈"], ["김동건"], ["박형영"]] },
  { key: "past", title: { ko: "함께했던 Members", en: "Past Members" }, label: "Past Members", members: [["지하은", "Founder", "Founder"], ["정석하", "Member", "Member"]] },
];
