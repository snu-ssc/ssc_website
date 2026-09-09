import { recruitmentFormUrl } from "./recruitment.mjs";
import type { ProgramSlug } from "./program-data";
import type { Locale } from "./site-data";

export type { Locale } from "./site-data";

type Gallery = { label: string; title: string; image?: string; alt: string; detail: string; visual?: "circuit" };
type NoticeBase = { date: string; month: string; type: "Event" | "Notice"; title: string; actionLabel?: string };
type Notice = NoticeBase & (
  | { summary: string; href?: string; external?: boolean; programSlug?: never }
  | { programSlug: ProgramSlug; summary?: never; href?: never; external?: never }
);

type LandingCopy = {
  nav: Record<"about" | "programs" | "gallery" | "news" | "contact", string>;
  hero: { title: string; lede: string; primary: string; secondary: string };
  metrics: [string, string][];
  about: { title: string; description: string; values: { icon: string; title: string; description: string }[] };
  programSection: { title: string; description: string }; categories: string[];
  gallerySection: { title: string; description: string }; gallery: Gallery[];
  newsSection: { title: string; description: string }; searchPlaceholder: string; noticeTypes: string[]; notices: Notice[];
  faqSection: { title: string; description: string }; faq: { question: string; answer: string }[];
  contact: { title: string; description: string; button: string };
};

const workshop = "/images/activities/jeju-technical-workshop.jpg";

export const landing: Record<Locale, LandingCopy> = {
  ko: {
    nav: { about: "소개", programs: "프로그램", gallery: "갤러리", news: "소식", contact: "연락처" },
    hero: { title: "반도체의 내일을\n함께 설계합니다.", lede: "SNU SemiCon은 배우고, 만들고, 연결하며\n차세대 반도체 리더를 만드는 서울대학교 학생 커뮤니티입니다.", primary: "프로그램 살펴보기", secondary: "SSC 소개" },
    metrics: [["06", "CORE AREAS"], ["20+", "MEMBERS"], ["∞", "POSSIBILITIES"]],
    about: { title: "호기심을 회로로,\n아이디어를 현실로.", description: "SSC는 전공과 경험의 경계를 넘어 반도체를 깊이 있게 탐구하는 커뮤니티입니다. 함께 질문하고, 직접 구현하며, 산업의 미래와 연결됩니다.", values: [{ icon: "◌", title: "Learn", description: "기초 이론부터 최신 기술까지. 서로의 관점으로 더 깊게 이해합니다." }, { icon: "⌁", title: "Build", description: "아이디어를 설계와 검증으로 이어 실제 결과물로 완성합니다." }, { icon: "↗", title: "Connect", description: "연구실과 산업 현장을 만나 더 넓은 가능성을 발견합니다." }] },
    programSection: { title: "관심이 기술이 되는\n모든 과정", description: "스터디부터 프로젝트, 현장 경험까지. 자신만의 반도체 여정을 설계해 보세요." }, categories: ["All", "Study", "Project", "Industry"],
    gallerySection: { title: "배움의 순간이\n우리의 다음 장면이 됩니다.", description: "작은 질문에서 시작해 서로의 성장을 기록하는 SSC의 현장입니다." },
    gallery: [{ label: "WORKSHOP", title: "Jeju Technical Workshop", image: workshop, alt: "노트북으로 기술 워크숍을 진행하는 SSC 구성원", detail: "기술에 몰입하고 서로의 아이디어를 나눈 SSC의 제주 테크니컬 워크숍입니다." }, { label: "FIELD NOTE", title: "2026 Technical Workshop", image: "/images/activities/jeju-technical-workshop-2026.jpg", alt: "기술 워크숍 현장에서 단체 사진을 촬영한 SSC 구성원", detail: "2026 기술 기반 창업동아리 기술 워크숍에서 함께한 SSC 구성원들의 기록입니다." }, { label: "PROJECT", title: "From Idea to Silicon", alt: "회로 패턴으로 표현한 SSC 프로젝트", detail: "구현과 검증을 반복하며 아이디어를 실제 설계로 이어갑니다.", visual: "circuit" }],
    newsSection: { title: "지금 SSC에서\n일어나고 있는 일", description: "다가오는 일정과 새로운 소식을 빠르게 확인하세요." }, searchPlaceholder: "소식 검색", noticeTypes: ["All", "Event", "Notice"],
    notices: [{ date: "18", month: "SEP", type: "Event", title: "2026 하반기 신입 부원 모집", summary: "SSC와 함께 배우고 만들 첫 번째 멤버를 기다립니다.", href: recruitmentFormUrl, external: true, actionLabel: "지원하기 ↗" }, { date: "26", month: "SEP", type: "Event", title: "Semiconductor Industry Talk", summary: "반도체 산업의 현재와 다음 변화를 함께 이야기합니다." }, { date: "03", month: "OCT", type: "Notice", title: "2학기 정규 스터디 안내", programSlug: "study", actionLabel: "스터디 안내 ↗" }],
    faqSection: { title: "궁금한 점이\n있나요?", description: "더 알고 싶은 내용이 있다면 언제든 SSC에 연락해 주세요." }, faq: [{ question: "SSC는 어떤 학생들이 참여할 수 있나요?", answer: "반도체에 관심이 있는 서울대학교 학생이라면 전공과 무관하게 지원할 수 있습니다." }, { question: "반도체 경험이 없어도 지원할 수 있나요?", answer: "물론입니다. 기초부터 함께 배우는 스터디와 멘토링을 통해 시작할 수 있습니다." }, { question: "프로젝트는 어떤 방식으로 진행되나요?", answer: "관심 분야를 바탕으로 팀 또는 개인 프로젝트를 정하고, 정기 피드백과 공유 세션을 통해 발전시킵니다." }],
    contact: { title: "다음 회로를\n함께 그려볼까요?", description: "새로운 질문, 협업 제안, SSC에 대한 모든 문의를 기다립니다.", button: "SSC에 연락하기" },
  },
  en: {
    nav: { about: "About", programs: "Programs", gallery: "Gallery", news: "News", contact: "Contact" },
    hero: { title: "Designing the future\nof semiconductors, together.", lede: "SNU SemiCon is a student community at Seoul National University\nwhere curiosity becomes capability and ideas become silicon.", primary: "Explore programs", secondary: "About SSC" },
    metrics: [["06", "CORE AREAS"], ["20+", "MEMBERS"], ["∞", "POSSIBILITIES"]],
    about: { title: "From curiosity to circuits,\nfrom ideas to impact.", description: "SSC is a community for students who want to explore semiconductors beyond boundaries. We question together, build with intention, and connect with the future of industry.", values: [{ icon: "◌", title: "Learn", description: "Build a stronger foundation by studying the fundamentals and emerging technology together." }, { icon: "⌁", title: "Build", description: "Carry ideas through design, validation, and iteration into something real." }, { icon: "↗", title: "Connect", description: "Meet the labs and industries shaping what comes next." }] },
    programSection: { title: "Every step where\ninterest becomes technology.", description: "From study to projects and field experiences, design your own semiconductor journey." }, categories: ["All", "Study", "Project", "Industry"],
    gallerySection: { title: "The moments we learn\nbecome our next move.", description: "A record of shared questions, focused work, and growth at SSC." },
    gallery: [{ label: "WORKSHOP", title: "Jeju Technical Workshop", image: workshop, alt: "SSC members working on laptops during a technical workshop", detail: "A focused SSC technical workshop in Jeju: bright ideas and conversations that continued beyond the room." }, { label: "FIELD NOTE", title: "2026 Technical Workshop", image: "/images/activities/jeju-technical-workshop-2026.jpg", alt: "SSC members at a technical workshop", detail: "A record of SSC members at the 2026 technology-based startup club workshop." }, { label: "PROJECT", title: "From Idea to Silicon", alt: "Circuit-inspired visual for an SSC project", detail: "Turning a question into a real design through repeated implementation and validation.", visual: "circuit" }],
    newsSection: { title: "What is happening\nat SSC now.", description: "Stay current with upcoming sessions, events, and community news." }, searchPlaceholder: "Search news", noticeTypes: ["All", "Event", "Notice"],
    notices: [{ date: "18", month: "SEP", type: "Event", title: "2026 Fall Recruitment", summary: "We are looking for our next members to learn and build with SSC.", href: recruitmentFormUrl, external: true, actionLabel: "Apply ↗" }, { date: "26", month: "SEP", type: "Event", title: "Semiconductor Industry Talk", summary: "A conversation about the present and next chapter of the semiconductor industry." }, { date: "03", month: "OCT", type: "Notice", title: "Fall Study Program Guide", programSlug: "study", actionLabel: "View guide ↗" }],
    faqSection: { title: "Have a question?", description: "If there is anything else you would like to know, get in touch with SSC." }, faq: [{ question: "Who can join SSC?", answer: "Any Seoul National University student who is interested in semiconductors can apply, regardless of major." }, { question: "Can I apply without prior experience?", answer: "Absolutely. Our study groups and mentorship make room to start from the fundamentals." }, { question: "How do projects work?", answer: "Members form teams or pursue individual ideas, with regular feedback and sharing sessions throughout the process." }],
    contact: { title: "Shall we design\nthe next circuit?", description: "We welcome new questions, collaboration ideas, and every inquiry about SSC.", button: "Contact SSC" },
  },
};
