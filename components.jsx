/* === Privacy in Practice — section components === */
const { useState, useEffect, useRef } = React;

// ───────── reveal-on-scroll hook ─────────
function useReveal() {
  useEffect(() => {
    const reveal = (el) => el.classList.add("in");
    const els = Array.from(document.querySelectorAll(".reveal"));
    // Immediately reveal anything already in the viewport
    const vh = window.innerHeight;
    els.forEach((el) => {
      const r = el.getBoundingClientRect();
      if (r.top < vh * 1.05) reveal(el);
    });
    // Observe the rest
    if (typeof IntersectionObserver === "undefined") {
      els.forEach(reveal);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            reveal(e.target);
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0, rootMargin: "0px 0px -60px 0px" }
    );
    els.forEach((el) => {
      if (!el.classList.contains("in")) io.observe(el);
    });
    // Failsafe: anything still hidden after 1.2s, just show.
    const t = setTimeout(() => {
      document.querySelectorAll(".reveal:not(.in)").forEach(reveal);
    }, 1200);
    return () => {io.disconnect();clearTimeout(t);};
  }, []);
}

// ───────── NAV ─────────
const NAV_LINKS = [
{ id: "roadmap", label: "Roadmap", href: "./roadmap.html" },
{ id: "areas", label: "Areas", href: null, dropdown: "areas" },
{ id: "tools", label: "Tools", href: null, dropdown: "tools" },
{ id: "career", label: "Career", href: "./career.html" },
{ id: "journey", label: "Journey", href: "./journey.html" },
{ id: "articles", label: "Articles", href: "./articles.html" },
{ id: "resources", label: "Resources", href: "./resources.html" },
{ id: "about", label: "About", href: "./about.html" }];

const TOOLS_ITEMS = [
  { id: "study",       href: "./study.html",       label: "Study cards",    kicker: "Flashcards, spaced rep, quiz",   glyph: "✦" },
  { id: "calculators", href: "./calculators.html", label: "Calculators",    kicker: "DSAR, breach, DPIA tools",       glyph: "∑" },
  { id: "glossary",    href: "./glossary.html",    label: "Glossary",       kicker: "Every term defined",             glyph: "Aa" },
  { id: "artefacts",   href: "./artefacts.html",   label: "Artefact library", kicker: "Templates &amp; worked examples", glyph: "✎" },
  { id: "reading",     href: "./reading.html",     label: "Reading list",   kicker: "Interactive bookcase",            glyph: "♦" },
];

function AreasDropdown({ open, onClose, areaActive }) {
  const areas = (typeof window !== "undefined" && window.AREAS) ? window.AREAS : [];
  return (
    <div className={"areas-pop" + (open ? " is-open" : "")} role="menu" onClick={(e) => e.stopPropagation()}>
      <div className="areas-pop-label">Practice areas</div>
      <ul className="areas-pop-list">
        {areas.map((a) => (
          <li key={a.id} className={"areas-pop-item areas-pop-" + a.color + (areaActive === a.id ? " is-active" : "")}>
            <a href={"./area-" + a.id + ".html"} onClick={onClose}>
              <span className="apm-glyph" aria-hidden="true">{a.glyph}</span>
              <span className="apm-body">
                <span className="apm-label">{a.label}</span>
                <span className="apm-kicker">{a.kicker}</span>
              </span>
              <span className="apm-arr" aria-hidden="true">→</span>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

function ToolsDropdown({ open, onClose, active }) {
  return (
    <div className={"areas-pop tools-pop" + (open ? " is-open" : "")} role="menu" onClick={(e) => e.stopPropagation()}>
      <div className="areas-pop-label">Tools &amp; library</div>
      <ul className="areas-pop-list">
        {TOOLS_ITEMS.map((t) => (
          <li key={t.id} className={"areas-pop-item areas-pop-tool" + (active === t.id ? " is-active" : "")}>
            <a href={t.href} onClick={onClose}>
              <span className="apm-glyph apm-glyph-tool" aria-hidden="true">{t.glyph}</span>
              <span className="apm-body">
                <span className="apm-label">{t.label}</span>
                <span className="apm-kicker" dangerouslySetInnerHTML={{ __html: t.kicker }}></span>
              </span>
              <span className="apm-arr" aria-hidden="true">→</span>
            </a>
          </li>
        ))}
      </ul>
      <div className="areas-pop-foot">
        <button className="apm-cmdk" onClick={() => { onClose(); window.openSearch && window.openSearch(); }}>
          <span>Search everything</span>
          <kbd>⌘K</kbd>
        </button>
      </div>
    </div>
  );
}

function Nav({ active, areaActive }) {
  const [openId, setOpenId] = React.useState(null);
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const navRef = React.useRef(null);

  React.useEffect(() => {
    const onDoc = (e) => {
      if (navRef.current && !navRef.current.contains(e.target)) setOpenId(null);
    };
    const onKey = (e) => { if (e.key === "Escape") { setOpenId(null); setMobileOpen(false); } };
    document.addEventListener("click", onDoc);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("click", onDoc);
      document.removeEventListener("keydown", onKey);
    };
  }, []);

  const closeAll = () => { setOpenId(null); setMobileOpen(false); };
  const TOOL_IDS = ["study","calculators","glossary","artefacts","reading"];

  return (
    <nav className={"nav" + (mobileOpen ? " is-mobile-open" : "")} ref={navRef}>
      <div className="nav-inner">
        <a href="./index.html" className="brand">
          <span className="mark">Privacy</span>
          <span className="dot"></span>
          <span className="word">in Practice</span>
          <span className="sparkle" style={{ marginLeft: 4, fontSize: 14 }}>✦</span>
        </a>

        <ul className="nav-links">
          {NAV_LINKS.map((l) => {
            if (l.dropdown) {
              const isOpen = openId === l.id;
              const isActive = l.dropdown === "areas" ? active === "area" : (l.dropdown === "tools" && TOOL_IDS.includes(active));
              return (
                <li key={l.id} className={"nav-li nav-li-dd" + (isOpen ? " is-open" : "")}>
                  <button
                    className={"link link-dd" + (isActive ? " active" : "")}
                    aria-haspopup="menu"
                    aria-expanded={isOpen}
                    onClick={(e) => { e.stopPropagation(); setOpenId(isOpen ? null : l.id); }}
                  >
                    {l.label}
                    <span className="link-chev" aria-hidden="true">{isOpen ? "▴" : "▾"}</span>
                  </button>
                  {l.dropdown === "areas" && <AreasDropdown open={isOpen} onClose={closeAll} areaActive={areaActive} />}
                  {l.dropdown === "tools" && <ToolsDropdown open={isOpen} onClose={closeAll} active={active} />}
                </li>
              );
            }
            return (
              <li key={l.id} className="nav-li">
                <a
                  className={"link" + (active === l.id ? " active" : "")}
                  href={l.href}
                >{l.label}</a>
              </li>
            );
          })}
        </ul>

        <button
          className="nav-search"
          onClick={() => window.openSearch && window.openSearch()}
          aria-label="Search the site"
          title="Search (⌘K)"
        >
          <span aria-hidden="true">⌕</span>
          <kbd>⌘K</kbd>
        </button>

        <a className="nav-cta" href="./roadmap.html">Start →</a>

        <button
          className="nav-burger"
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileOpen}
          onClick={() => setMobileOpen(o => !o)}
        >
          <span className="bar"></span>
          <span className="bar"></span>
          <span className="bar"></span>
        </button>
      </div>

      {/* Mobile drawer */}
      <div className="nav-drawer" aria-hidden={!mobileOpen}>
        <button className="nd-search" onClick={() => { closeAll(); window.openSearch && window.openSearch(); }}>
          <span aria-hidden="true">⌕</span> Search the site
        </button>
        <ul className="nav-drawer-list">
          {NAV_LINKS.map((l) => {
            if (l.dropdown) {
              const isOpen = openId === l.id;
              const subItems = l.dropdown === "areas"
                ? ((window.AREAS || []).map(a => ({ href: "./area-" + a.id + ".html", glyph: a.glyph, label: a.label, kicker: a.kicker, isActive: areaActive === a.id })))
                : (TOOLS_ITEMS.map(t => ({ href: t.href, glyph: t.glyph, label: t.label, kicker: t.kicker, isActive: active === t.id })));
              const isActive = l.dropdown === "areas" ? active === "area" : (l.dropdown === "tools" && TOOL_IDS.includes(active));
              return (
                <li key={l.id} className={"nd-li nd-li-dd" + (isOpen ? " is-open" : "")}>
                  <button
                    className={"nd-link nd-link-dd" + (isActive ? " active" : "")}
                    onClick={() => setOpenId(isOpen ? null : l.id)}
                    aria-expanded={isOpen}
                  >
                    <span>{l.label}</span>
                    <span className="nd-chev">{isOpen ? "−" : "+"}</span>
                  </button>
                  {isOpen && (
                    <ul className="nd-sublist">
                      {subItems.map((s, i) => (
                        <li key={i} className={"nd-subli" + (s.isActive ? " is-active" : "")}>
                          <a href={s.href} onClick={closeAll}>
                            <span className="nd-glyph">{s.glyph}</span>
                            <span>
                              <span className="nd-l">{s.label}</span>
                              <span className="nd-k" dangerouslySetInnerHTML={{ __html: s.kicker }}></span>
                            </span>
                          </a>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              );
            }
            return (
              <li key={l.id} className="nd-li">
                <a className={"nd-link" + (active === l.id ? " active" : "")} href={l.href} onClick={closeAll}>{l.label}</a>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
}

// ───────── HOME PREVIEW (links to subpages) ─────────
const HOME_SECTIONS = [
{
  href: "./roadmap.html",
  num: "I.",
  label: "The roadmap",
  blurb:
  "Four tracks, sixteen phases — the structured path from zero to data protection professional.",
  bg: "lavender",
  badge: "16 phases"
},
{
  href: "./journey.html",
  num: "II.",
  label: "My journey",
  blurb:
  "Where I am on the path right now — qualifications, study logs, and what's clicking each week.",
  bg: "cream",
  badge: "Updated weekly"
},
{
  href: "./articles.html",
  num: "III.",
  label: "Articles",
  blurb:
  "Plain-English explainers on GDPR, ICO enforcement, AI governance and the cloud.",
  bg: "sun",
  badge: "5 published"
},
{
  href: "./resources.html",
  num: "IV.",
  label: "Resources",
  blurb:
  "Courses, ICO guidance, books, free tools, podcasts and communities — what's most useful at each stage.",
  bg: "paper",
  badge: "30+ links"
}];


function HomePreview() {
  return (
    <section className="home-preview">
      <div className="wrap">
        <header className="home-preview-head">
          <span className="eyebrow">What's inside</span>
          <h2>Four ways in.</h2>
        </header>
        <div className="home-preview-grid">
          {HOME_SECTIONS.map((s) =>
          <a key={s.href} className={"home-card hc-" + s.bg} href={s.href}>
              <div className="home-card-top">
                <span className="num">{s.num}</span>
                <span className="badge">{s.badge}</span>
              </div>
              <h3>{s.label}</h3>
              <p>{s.blurb}</p>
              <span className="home-card-arr">Open →</span>
            </a>
          )}
        </div>
      </div>
    </section>);

}
const HERO_STICKERS = [
{ label: "UK GDPR", cls: "s-sun", rot: -3 },
{ label: "DPIAs", cls: "s-blush", rot: 2 },
{ label: "EU AI Act", cls: "s-mint", rot: -2 },
{ label: "Article 28", cls: "s-paper", rot: 3 },
{ label: "DSARs", cls: "s-ocean", rot: -2 },
{ label: "ICO enforcement", cls: "s-paper", rot: 2 },
{ label: "Cloud compliance", cls: "s-grape", rot: -3 }];


function Hero({ data }) {
  return (
    <section className="hero" id="top">
      <div className="wrap">
        <div className="hero-grid">
          <div>
            <div className="hero-eyebrow reveal">
              <span className="ln"></span>
              <span className="eyebrow">{data.eyebrow} · Updated weekly</span>
              <span className="sparkle" aria-hidden="true">✦</span>
            </div>
            <h1 className="reveal">
              <span className="a">{data.title_a}</span>
              <span className="b" style={{ color: "rgb(255, 255, 255)" }}>{data.title_b}</span>
            </h1>
            <p className="lede reveal">
              A <span className="hl">free, structured roadmap</span> for anyone building a career in data protection and privacy — written by someone <span className="hl hl-blush">actively on this journey</span>. No paywalls, no fluff, no gatekeeping.
            </p>
            <div className="cta-row reveal">
              <a className="sticker-cta" href="./roadmap.html">
                {data.cta_primary}
                <span className="arr">→</span>
              </a>
              <a className="pill-cta" href="./articles.html">
                {data.cta_secondary}
              </a>
            </div>
            <div className="stickers reveal">
              {HERO_STICKERS.map((s) =>
              <span
                key={s.label}
                className={"sticker " + s.cls}
                style={{ "--rot": s.rot + "deg" }}>
                
                  {s.label}
                </span>
              )}
            </div>
          </div>
          <div className="reveal" style={{ position: "relative" }}>
            <div className="stamp">
              {data.stats.map((s, i) =>
              <div key={i} className="row">
                  <span className="n serif">{s.n}</span>
                  <span className="l">{s.l}</span>
                </div>
              )}
              <div className="meta">
                <span>Field journal</span>
                <span>№ 01 / 2026</span>
              </div>
            </div>
            <div className="badge-card b-coral" style={{ left: -28, top: -22 }}>
              <span className="ic">✎</span>
              <div>
                <span className="l1">Currently</span>
                <span className="l2">BCS Practitioner</span>
              </div>
            </div>
            <div className="badge-card b-mint" style={{ right: -16, bottom: -28 }}>
              <span className="ic">✓</span>
              <div>
                <span className="l1">Certified</span>
                <span className="l2">Securiti AI Gov.</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>);

}

// ───────── MISSION STRIP ─────────
function Mission() {
  return (
    <section className="mission">
      <div className="dot-pattern" aria-hidden="true"></div>
      <div className="wrap">
        <div className="mission-grid">
          <div className="big-q" aria-hidden="true">“</div>
          <div className="mission-quote">
            Data protection has almost no equivalent of the <i>public learning resources</i> that exist in cybersecurity. So I’m <i>building it</i>.
          </div>
          <div className="mission-byline">
            <b>Clarissa Ankrah</b>
            MSc Cyber Security →<br />Data Protection &amp; Privacy
          </div>
        </div>
      </div>
    </section>);

}

// ───────── RIBBON / TICKER ─────────
function Ribbon() {
  const items = [
  "UK GDPR",
  "DPA 2018",
  "Article 22",
  "EU AI Act",
  "DSARs",
  "DPIAs",
  "ROPAs",
  "Article 28",
  "Privacy by design",
  "International transfers",
  "ICO enforcement",
  "Cloud compliance"];

  const loop = [...items, ...items];
  return (
    <div className="ribbon">
      <div className="ribbon-track">
        {loop.map((t, i) =>
        <React.Fragment key={i}>
            <span>{t}</span>
            <span className="sep">✦</span>
          </React.Fragment>
        )}
      </div>
    </div>);

}

// ───────── SECTION HEAD ─────────
const NUM_COLORS = { "I.": "c-sun", "II.": "c-blush", "III.": "c-mint", "IV.": "c-ocean" };
function SectionHead({ num, eyebrow, title, sub, id, sparkle = true }) {
  return (
    <div className="wrap">
      <header className="section-head reveal" id={id}>
        <div className={"num " + (NUM_COLORS[num] || "")}>{num}</div>
        <div>
          <span className="eyebrow">
            {eyebrow}
            {sparkle && <> <span className="sparkle" style={{ marginLeft: 6 }}>✦</span></>}
          </span>
          <h2>{title}</h2>
          <p className="sub">{sub}</p>
        </div>
      </header>
      <div className="squiggle" aria-hidden="true"></div>
    </div>);

}

// ───────── ROADMAP ─────────
function Phase({ p }) {
  if (p.isCerts) {
    return (
      <div className="phase">
        <div className="n">{p.n}</div>
        <div>
          <span className="phase-tag">{p.tag}</span>
          <h4 className="phase-title">{p.title}</h4>
          <p className="phase-blurb">{p.blurb}</p>
        </div>
        <div className="phase-body">
          <div className="certs-grid">
            {p.certs.map((c, i) =>
            <div className={"cert" + (c.status === "Certified" ? " done" : "")} key={i}>
                <span className="status">{c.status}</span>
                <div className="name">{c.name}</div>
                <div className="issuer">{c.issuer}</div>
                <div className="note">{c.note}</div>
              </div>
            )}
          </div>
        </div>
      </div>);

  }
  return (
    <div className="phase reveal">
      <div className="n">{p.n}</div>
      <div>
        <span className="phase-tag">{p.tag}</span>
        <h4 className="phase-title">{p.title}</h4>
        <p className="phase-blurb">{p.blurb}</p>
      </div>
      <div className="phase-body">
        <ol>
          {p.beats.map((b, i) =>
          <li key={i}>{b}</li>
          )}
        </ol>
        <div className="deliverable">
          <b>Deliverable</b>
          {p.deliverable}
        </div>
      </div>
    </div>);

}

function Track({ t, idx }) {
  const blocks = ["", "track-block-blush", "track-block-plum", "track-block-sun"];
  return (
    <div className={"track reveal " + (blocks[idx] || "")}>
      <div className="track-head">
        <div className="track-roman">{t.num}</div>
        <div>
          <span className="eyebrow">Track {t.num}</span>
          <h3 className="track-title">{t.title}</h3>
          <p className="track-kicker">{t.kicker}</p>
        </div>
        <div className="track-glyph">{t.glyph}</div>
      </div>
      <div className="phases">
        {t.phases.map((p) => <Phase key={p.n} p={p} />)}
      </div>
    </div>);

}

function Roadmap({ tracks }) {
  return (
    <>
      <SectionHead
        id="roadmap"
        num="I."
        eyebrow="The Complete Path"
        title="From zero to data protection professional"
        sub="Four tracks covering the foundations, operations, specialist knowledge, and the career tools you need. Built from real job requirements and active study — not from a textbook." />
      
      <section className="roadmap">
        <div className="wrap">
          {tracks.map((t, i) => <Track key={t.num} t={t} idx={i} />)}
        </div>
      </section>
    </>);

}

// ───────── JOURNEY ─────────
function Journey({ data }) {
  return (
    <>
      <SectionHead
        id="journey"
        num="II."
        eyebrow="My journey"
        title={data.title}
        sub={data.blurb} />
      
      <section className="journey">
        <div className="wrap">
          <div className="bio reveal">
            <div className="portrait">CA</div>
            <div>
              <h3>{data.bio.name}</h3>
              <div className="sub">{data.bio.sub}</div>
              <p>{data.bio.body}</p>
            </div>
          </div>

          <div className="timeline reveal">
            {data.timeline.map((t, i) =>
            <div key={i} className={"tl-item " + t.state}>
                <span className="pip"></span>
                <div className="tl-when">{t.when}</div>
                <h4 className="tl-title">{t.title}</h4>
                <p className="tl-body">{t.body}</p>
              </div>
            )}
          </div>

          <div className="logs-head reveal">
            <h3>Study logs</h3>
            <span className="eyebrow">Written as I learn</span>
          </div>
          <div className="logs">
            {data.logs.map((l, i) =>
            <article key={i} className="log reveal">
                <div className="week">
                  <span>{l.week}</span>
                  <span>{l.date}</span>
                </div>
                <h4>{l.title}</h4>
                <div className="heading">What I covered</div>
                <ul>
                  {l.bullets.map((b, j) => <li key={j}>{b}</li>)}
                </ul>
                <div className="heading">What clicked</div>
                <div className="insight">{l.insight}</div>
                <div className="tag-row">
                  {l.tags.map((t, j) => <span key={j} className="tag">{t}</span>)}
                </div>
              </article>
            )}
          </div>
        </div>
      </section>
    </>);

}

// ───────── ARTICLES ─────────
function Articles({ data }) {
  return (
    <>
      <SectionHead
        id="articles"
        num="III."
        eyebrow="Articles"
        title="Data protection, explained clearly"
        sub="ICO enforcement breakdowns, GDPR concept explainers, AI governance and cloud data protection. Updated as I learn." />
      
      <section className="articles">
        <div className="wrap">
          <div className="articles-grid reveal">
            {data.map((a, i) =>
            <article key={i} className={"article" + (a.soon ? " soon" : "")}>
                <div className="glyph">{a.mark}</div>
                <span className="kicker">{a.kicker}</span>
                <h3>{a.title}</h3>
                <p>{a.blurb}</p>
                <div className="foot">
                  <span className="meta">{a.meta}</span>
                  <a className="read" href="#">
                    {a.soon ? "Soon" : "Read"} <span>→</span>
                  </a>
                </div>
              </article>
            )}
          </div>
        </div>
      </section>
    </>);

}

// ───────── RESOURCES ─────────
function Resources({ data }) {
  return (
    <>
      <SectionHead
        id="resources"
        num="IV."
        eyebrow="Resources"
        title="What to study, read & use"
        sub={data.intro} />
      
      <section className="resources">
        <div className="wrap">
          {data.groups.map((g, i) =>
          <div key={i} className="res-group reveal">
              <div className="res-head">
                <h3>{g.head}</h3>
                <span className="sub">{g.sub}</span>
              </div>
              <div className="res-items">
                {g.items.map((it, j) => {
                const Tag = it.url ? "a" : "div";
                const props = it.url ?
                { href: it.url, target: "_blank", rel: "noopener noreferrer" } :
                {};
                return (
                  <Tag key={j} className={"res-item" + (it.url ? " linked" : "")} {...props}>
                      <div>
                        <h4 className="res-title">
                          {it.title}
                          {it.url && <span className="res-arrow" aria-hidden="true">↗</span>}
                        </h4>
                        <div className="res-issuer">{it.issuer}</div>
                        <div className="res-note">{it.note}</div>
                      </div>
                      <span className="res-tag">{it.tag}</span>
                    </Tag>);

              })}
              </div>
            </div>
          )}
        </div>
      </section>
    </>);

}

// ───────── ABOUT ─────────
function About({ data }) {
  return (
    <section className="about" id="about">
      <div className="wrap">
        <div className="about-grid">
          <div className="about-lede reveal">
            <span className="eyebrow">{data.eyebrow} <span className="sparkle">✦</span></span>
            <h2>Why I built <span className="hl hl-mint">this</span></h2>
            <p>{data.body}</p>
          </div>
          <div className="about-cols reveal">
            {data.columns.map((c, i) =>
            <div key={i} className="about-col">
                <h4>{c.head}</h4>
                <ul>
                  {c.items.map((it, j) => <li key={j}>{it}</li>)}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>);

}

// ───────── FOOTER ─────────
function Footer() {
  return (
    <footer>
      <div className="wrap">
        <div className="foot-newsletter">
          {typeof window !== "undefined" && window.NewsletterForm && <window.NewsletterForm />}
        </div>
        <div className="foot-grid">
          <div>
            <div className="colophon">
              A field journal of becoming a <i>data protection practitioner</i>, in public.
            </div>
          </div>
          <div>
            <h5>Learn</h5>
            <ul>
              <li><a href="./roadmap.html">Roadmap</a></li>
              <li><a href="./study.html">Study cards</a></li>
              <li><a href="./career.html">Career</a></li>
              <li><a href="./journey.html">Journey</a></li>
              <li><a href="./articles.html">Articles</a></li>
            </ul>
          </div>
          <div>
            <h5>Tools</h5>
            <ul>
              <li><a href="./calculators.html">Calculators</a></li>
              <li><a href="./glossary.html">Glossary</a></li>
              <li><a href="./artefacts.html">Artefact library</a></li>
              <li><a href="./reading.html">Reading list</a></li>
              <li><a href="./resources.html">Resources</a></li>
              <li><a href="#" onClick={(e) => { e.preventDefault(); window.openSearch && window.openSearch(); }}>Search ⌘K</a></li>
            </ul>
          </div>
          <div>
            <h5>About</h5>
            <ul>
              <li><a href="./about.html">About this site</a></li>
              <li><a href="./privacy.html">Privacy notice</a></li>
              <li><a href="./cookies.html">Cookies &amp; storage</a></li>
              <li><a href="https://www.linkedin.com/in/clarissaankrah" target="_blank" rel="noopener">LinkedIn ↗</a></li>
              <li><a href="https://github.com/clnks" target="_blank" rel="noopener">GitHub ↗</a></li>
            </ul>
          </div>
        </div>
        <div className="foot-bottom">
          <span>© Clarissa Ankrah, 2026 · Privacy in Practice</span>
          <span>Set in Bricolage Grotesque &amp; Lora · Free, always</span>
          <span>UK · London</span>
        </div>
      </div>
    </footer>);

}

// expose
Object.assign(window, {
  Nav, Hero, Mission, Ribbon, SectionHead, HomePreview,
  Roadmap, Journey, Articles, Resources, About, Footer,
  useReveal
});