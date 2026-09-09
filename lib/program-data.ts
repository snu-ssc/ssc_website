import type { Locale } from "./site-data";

export const programSlugs = [
  "study",
  "chip-design",
  "technical-workshop",
  "industry-visit",
] as const;

export type ProgramSlug = (typeof programSlugs)[number];
export type ProgramCategory = "Study" | "Project" | "Industry";

type ProgramSection = {
  readonly eyebrow: string;
  readonly title: string;
  readonly body: string;
  readonly bullets?: readonly string[];
};

type ProgramImage = {
  readonly src: string;
  readonly alt: string;
};

export type ProgramDetail = {
  readonly slug: ProgramSlug;
  readonly category: ProgramCategory;
  readonly index: string;
  readonly tag: string;
  readonly title: string;
  readonly summary: string;
  readonly overview: string;
  readonly sections: readonly ProgramSection[];
  readonly images?: readonly ProgramImage[];
};

const programs: Record<Locale, readonly ProgramDetail[]> = {
  ko: [
    {
      slug: "study",
      category: "Study",
      index: "01",
      tag: "FUNDAMENTALS",
      title: "반도체 스터디",
      summary: "금요일 16:00–18:00과 토요일 11:00–13:00 모두 Circuit Design과 Process & Device가 동시에 진행되는 정규 스터디",
      overview: "기초 이론을 실제 사례와 연결하고, 서로의 질문을 통해 반도체 기술의 공통 언어를 만들어 갑니다.",
      sections: [
        {
          eyebrow: "SCHEDULE / 01",
          title: "금요일 16:00–18:00",
          body: "Circuit Design과 Process & Device 트랙이 동시에 진행됩니다.",
        },
        {
          eyebrow: "SCHEDULE / 02",
          title: "토요일 11:00–13:00",
          body: "Circuit Design과 Process & Device 트랙이 동시에 진행됩니다.",
        },
        {
          eyebrow: "FIELD / 01",
          title: "Circuit Design",
          body: "회로 설계의 핵심 개념을 함께 읽고 문제를 풀며 설계 관점을 쌓습니다.",
        },
        {
          eyebrow: "FIELD / 02",
          title: "Process & Device",
          body: "소자 구조와 공정 흐름을 연결해 반도체 동작을 이해합니다.",
        },
      ],
    },
    {
      slug: "chip-design",
      category: "Project",
      index: "02",
      tag: "DESIGN LAB",
      title: "칩 설계 프로젝트",
      summary: "아이디어에서 RTL과 검증까지 직접 만드는 설계 프로젝트",
      overview: "관심 주제를 설계 과제로 구체화하고 구현과 검증을 반복해 결과물로 완성합니다.",
      sections: [
        {
          eyebrow: "PROCESS",
          title: "Idea to implementation",
          body: "관심 분야를 바탕으로 요구사항과 설계 범위를 정하고, 구현 가능한 프로젝트로 발전시킵니다.",
        },
        {
          eyebrow: "PRACTICE",
          title: "Build and validate",
          body: "설계와 검증을 반복하며 결과를 공유하고 다음 개선점을 찾습니다.",
        },
      ],
    },
    {
      slug: "technical-workshop",
      category: "Industry",
      index: "03",
      tag: "FIELD NOTE",
      title: "기술 워크숍",
      summary: "제주 기술 워크숍의 기록",
      overview: "제주에서 진행된 SSC 기술 워크숍의 현장을 사진으로 기록합니다.",
      sections: [
        {
          eyebrow: "JEJU",
          title: "Technical Workshop",
          body: "SSC 구성원이 함께한 제주 기술 워크숍 기록입니다.",
        },
      ],
      images: [
        { src: "/images/activities/jeju-technical-workshop.jpg", alt: "제주 기술 워크숍에 참여한 SSC 구성원" },
        { src: "/images/activities/jeju-technical-workshop-2026.jpg", alt: "2026 기술 워크숍 현장의 SSC 구성원" },
      ],
    },
    {
      slug: "industry-visit",
      category: "Industry",
      index: "04",
      tag: "NETWORK",
      title: "산업 현장 방문",
      summary: "연구실과 기업의 접점에서 다음 질문을 발견하는 현장 탐방",
      overview: "연구실과 기업의 현장을 방문해 반도체 생태계와 이어지는 지점을 직접 경험합니다.",
      sections: [
        {
          eyebrow: "FIELD NOTE",
          title: "Research and industry",
          body: "현장의 관찰을 바탕으로 연구와 산업이 연결되는 방식을 이해합니다.",
        },
      ],
    },
  ],
  en: [
    {
      slug: "study",
      category: "Study",
      index: "01",
      tag: "FUNDAMENTALS",
      title: "Semiconductor Study",
      summary: "Circuit Design and Process & Device run in parallel Friday 16:00–18:00 and Saturday 11:00–13:00.",
      overview: "Connect fundamental theory with real examples and build a shared technical language through thoughtful discussion.",
      sections: [
        {
          eyebrow: "SCHEDULE / 01",
          title: "Friday 16:00–18:00",
          body: "Circuit Design and Process & Device run in parallel.",
        },
        {
          eyebrow: "SCHEDULE / 02",
          title: "Saturday 11:00–13:00",
          body: "Circuit Design and Process & Device run in parallel.",
        },
        {
          eyebrow: "FIELD / 01",
          title: "Circuit Design",
          body: "Read core circuit-design concepts together, solve problems, and develop a design perspective.",
        },
        {
          eyebrow: "FIELD / 02",
          title: "Process & Device",
          body: "Connect device structures with process flows to understand semiconductor operation.",
        },
      ],
    },
    {
      slug: "chip-design",
      category: "Project",
      index: "02",
      tag: "DESIGN LAB",
      title: "Chip Design Project",
      summary: "Hands-on projects from initial ideas through RTL and verification.",
      overview: "Turn an area of interest into a concrete design challenge, then iterate through implementation and validation.",
      sections: [
        {
          eyebrow: "PROCESS",
          title: "Idea to implementation",
          body: "Define a project scope from an area of interest and develop it into a buildable design challenge.",
        },
        {
          eyebrow: "PRACTICE",
          title: "Build and validate",
          body: "Iterate through design and validation, share results, and identify the next improvement.",
        },
      ],
    },
    {
      slug: "technical-workshop",
      category: "Industry",
      index: "03",
      tag: "FIELD NOTE",
      title: "Technical Workshop",
      summary: "A record of the Jeju Technical Workshop.",
      overview: "Photos from SSC's technical workshop in Jeju.",
      sections: [
        {
          eyebrow: "JEJU",
          title: "Technical Workshop",
          body: "A record of SSC members at the Jeju Technical Workshop.",
        },
      ],
      images: [
        { src: "/images/activities/jeju-technical-workshop.jpg", alt: "SSC members at the Jeju Technical Workshop" },
        { src: "/images/activities/jeju-technical-workshop-2026.jpg", alt: "SSC members at the 2026 Technical Workshop" },
      ],
    },
    {
      slug: "industry-visit",
      category: "Industry",
      index: "04",
      tag: "NETWORK",
      title: "Industry Visit",
      summary: "Field visits that reveal the next questions at the edge of research and industry.",
      overview: "Visit labs and companies to understand how the semiconductor ecosystem connects in practice.",
      sections: [
        {
          eyebrow: "FIELD NOTE",
          title: "Research and industry",
          body: "Use observations from the field to understand how research and industry connect.",
        },
      ],
    },
  ],
};

export function getPrograms(locale: Locale): readonly ProgramDetail[] {
  return programs[locale];
}

export function getProgram(locale: Locale, slug: ProgramSlug): ProgramDetail | undefined {
  return getPrograms(locale).find((program) => program.slug === slug);
}
