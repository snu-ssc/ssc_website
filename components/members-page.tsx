import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { filterCompleteMemberEntries } from "@/lib/member-directory.mjs";
import { memberGroups, type Locale } from "@/lib/site-data";

export function MembersPage({ locale }: { locale: Locale }) {
  const totalMembers = memberGroups.reduce((total, group) => total + filterCompleteMemberEntries(group.members).length, 0);
  const copy = locale === "ko"
    ? { eyebrow: "People of SSC", title: "함께 배우고, 만들고,\n연결하는 사람들", lead: "서로 다른 전공과 시선이 만나 SSC의 다음 회로를 만듭니다.", count: "Directory", roster: "Member Roster", past: "SSC의 시작을 함께해 준 소중한 구성원들" }
    : { eyebrow: "People of SSC", title: "The people who learn,\nbuild, and connect together.", lead: "Different disciplines and perspectives come together to shape SSC's next circuit.", count: "Directory", roster: "Member Roster", past: "The people who helped shape SSC's beginning." };

  return <><SiteHeader locale={locale} path="/members" /><main className="members-page">
    <section className="members-hero"><div className="container members-hero__grid">
      <div><p className="eyebrow">{copy.eyebrow}</p><h1>{copy.title}</h1><p>{copy.lead}</p></div>
      <div className="directory-count" aria-label={`${totalMembers} ${copy.count}`}><strong>{String(totalMembers).padStart(2, "0")}</strong><span>{copy.count}</span><i aria-hidden="true" /></div>
    </div></section>
    <section className="members-directory"><div className="container">
      {memberGroups.map((group, groupIndex) => {
        const members = filterCompleteMemberEntries(group.members) as typeof group.members;
        if (members.length === 0) return null;
        const isLeadership = group.key === "leadership";
        const isPast = group.key === "past";
        return <section className={`directory-group ${isLeadership ? "directory-group--leadership" : ""} ${isPast ? "directory-group--past" : ""}`} key={group.key}>
          <header className="directory-group__header"><div><p className="eyebrow">{String(groupIndex + 1).padStart(2, "0")} / {group.label}</p><h2>{group.title[locale]}</h2></div>{isPast && <p>{copy.past}</p>}</header>
          <div className={isLeadership ? "member-feature-grid" : "member-roster"}>
            {members.map(([name, roleKo, roleEn], index) => <article className={isLeadership ? "member-signal-card" : "member-roster__item"} key={name}>
              <span className="member-signal-card__index">{String(index + 1).padStart(2, "0")}</span>
              <div><h3>{name}</h3><p>{locale === "ko" ? roleKo ?? "Member" : roleEn ?? "Member"}</p></div>
              <span className="member-signal-card__trace" aria-hidden="true" />
            </article>)}
          </div>
        </section>;
      })}
    </div></section>
  </main><SiteFooter locale={locale} includeEmail={false} /></>;
}
