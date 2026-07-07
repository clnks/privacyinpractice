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
{ id: "areas", label: "Areas", href: null, dropdown: "areas" },
{ id: "tools", label: "Tools", href: null, dropdown: "tools" },
{ id: "career", label: "Career", href: "./career.html" },
{ id: "resources", label: "Resources", href: "./resources.html" },
{ id: "about", label: "About", href: "./about.html" }];

const TOOLS_ITEMS = [
  { id: "study",       href: "./study.html",       label: "Study cards",      kicker: "Flashcards, spaced rep",               glyph: "✦" },
  { id: "quiz",        href: "./quiz.html",         label: "Knowledge quiz",   kicker: "10 questions · instant feedback",      glyph: "?" },
  { id: "decisions",   href: "./decisions.html",    label: "Decision trees",   kicker: "DPIA · lawful basis · breach",         glyph: "◈" },
  { id: "scenarios",   href: "./scenarios.html",    label: "Scenario practice", kicker: "Real situations · model answers",    glyph: "▶" },
  { id: "calculators", href: "./calculators.html",  label: "Calculators",      kicker: "DSAR, breach, DPIA tools",             glyph: "∑" },
  { id: "glossary",    href: "./glossary.html",     label: "Glossary",         kicker: "Every term defined",                   glyph: "Aa" },
  { id: "artefacts",   href: "./artefacts.html",    label: "Artefact library", kicker: "Templates &amp; worked examples",      glyph: "✎" },
  { id: "reading",     href: "./reading.html",      label: "Reading list",     kicker: "Interactive bookcase",                 glyph: "♦" },
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
      <div className="areas-pop-foot">
        <a className="apm-all" href="./areas.html" onClick={onClose}>
          Compare all areas
          <span className="apm-all-arr" aria-hidden="true">↗</span>
        </a>
      </div>
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
  const TOOL_IDS = ["study","quiz","decisions","scenarios","calculators","glossary","artefacts","reading"];

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
  "Four tracks, sixteen phases. The structured path from zero to privacy and regulation professional. Built from real job requirements, not a textbook.",
  bg: "lavender",
  badge: "16 phases"
},
{
  href: "./career.html",
  num: "II.",
  label: "Career hub",
  blurb:
  "CV checklist, interview prep, salary data, UK employer list, STAR practice. The practical side of actually getting hired.",
  bg: "mint",
  badge: "50+ tools"
},
{
  href: "./articles.html",
  num: "III.",
  label: "Articles",
  blurb:
  "Short explainers on GDPR, AI governance, financial regulation and cloud risk. Written for practitioners.",
  bg: "sun",
  badge: "5 published"
},
{
  href: "./resources.html",
  num: "IV.",
  label: "Resources",
  blurb:
  "Courses, ICO guidance, books, free tools, podcasts and communities. Sorted by what's most useful at each stage.",
  bg: "paper",
  badge: "30+ links"
}];


function HomePreview() {
  return (
    <section className="home-preview">
      <div className="wrap">
        <header className="home-preview-head">
          <span className="eyebrow">What's here</span>
          <h2>Four sections. One goal.</h2>
          <p className="home-preview-intro">Privacy in Practice is split into four parts. The roadmap is the spine. Everything else sits around it. You do not need to go in order.</p>
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


const HERO_ROTATE = ["Roadmap", "Tools", "Career", "Resources"];

function Hero({ data }) {
  const [wordIdx, setWordIdx] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const iv = setInterval(() => {
      setVisible(false);
      setTimeout(() => {
        setWordIdx(i => (i + 1) % HERO_ROTATE.length);
        setVisible(true);
      }, 350);
    }, 2800);
    return () => clearInterval(iv);
  }, []);

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
              <span className="b hero-word" style={{ opacity: visible ? 1 : 0, transition: "opacity 0.35s ease" }}>
                {HERO_ROTATE[wordIdx]}
              </span>
            </h1>
            <p className="lede reveal">
              A <span className="hl">free, structured roadmap</span> for anyone building a career in privacy, risk, or regulation, written by someone actively on this journey. No paywalls, no fluff, no gatekeeping.
            </p>
            <div className="cta-row reveal">
              <a className="sticker-cta" href="./roadmap.html">
                {data.cta_primary}
                <span className="arr">→</span>
              </a>
              <a className="pill-cta" href="./area-dp.html">
                {data.cta_secondary}
              </a>
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
            Privacy law and regulation have almost no equivalent of the <i>public learning resources</i> that exist in cybersecurity. So I’m <i>building it</i>.
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
  "EU AI Act",
  "NIS2",
  "FCA conduct rules",
  "DSARs",
  "MLR 2017",
  "ISO 42001",
  "Consumer Duty",
  "DPIAs",
  "FATF recommendations",
  "ICO enforcement",
  "CRISC",
  "Article 28",
  "Open Banking",
  "Privacy by design",
  "NCSC CAF"];

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
function Phase({ p, done, onToggle }) {
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
    <div className={"phase reveal" + (done ? " phase-done" : "")}>
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
        {onToggle && (
          <button
            className={"phase-done-btn" + (done ? " is-done" : "")}
            onClick={() => onToggle(p.n)}
            aria-pressed={done}
          >
            {done ? "✓ Completed" : "Mark complete"}
          </button>
        )}
      </div>
    </div>);

}

function Track({ t, idx, progress, onToggle }) {
  const blocks = ["", "track-block-blush", "track-block-plum", "track-block-sun"];
  const regularPhases = t.phases.filter(p => !p.isCerts);
  const doneCount = regularPhases.filter(p => progress && progress[p.n]).length;
  const totalCount = regularPhases.length;
  return (
    <div className={"track reveal " + (blocks[idx] || "")}>
      <div className="track-head">
        <div className="track-roman">{t.num}</div>
        <div>
          <span className="eyebrow">Track {t.num}</span>
          <h3 className="track-title">{t.title}</h3>
          <p className="track-kicker">{t.kicker}</p>
          {t.areaHref && (
            <a className="track-area-link" href={t.areaHref}>
              Explore {t.areaLabel} →
            </a>
          )}
        </div>
        <div className="track-glyph">{t.glyph}</div>
      </div>
      {totalCount > 0 && (
        <div className="track-progress-row">
          <div className="tp-bar"><div className="tp-fill" style={{ width: (doneCount / totalCount * 100) + "%" }}></div></div>
          <span className="tp-count">{doneCount}/{totalCount} phases</span>
        </div>
      )}
      <div className="phases">
        {t.phases.map((p) => <Phase key={p.n} p={p} done={!!(progress && progress[p.n])} onToggle={onToggle} />)}
      </div>
    </div>);

}

function RoadmapAreas() {
  const areas = (window.AREAS || []);
  if (!areas.length) return null;
  return (
    <section className="roadmap-areas">
      <div className="wrap">
        <div className="ra-head">
          <h2 className="ra-title">Explore practice areas</h2>
          <p className="ra-sub">Each area has its own roadmap, certification path, and portfolio guide. Click in to go deeper.</p>
        </div>
        <div className="ra-grid">
          {areas.map(a => (
            <a key={a.id} className={"ra-card ra-card-" + a.color} href={"./area-" + a.id + ".html"}>
              <span className="ra-glyph">{a.glyph}</span>
              <div>
                <span className="ra-label">{a.label}</span>
                <span className="ra-kicker">{a.kicker}</span>
              </div>
              <span className="ra-arrow">→</span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

function Roadmap({ tracks }) {
  const [progress, setProgress] = useState(() => {
    try { const raw = localStorage.getItem("pip-progress"); return raw ? JSON.parse(raw) : {}; } catch { return {}; }
  });

  const togglePhase = (n) => {
    setProgress(prev => {
      const next = { ...prev, [n]: !prev[n] };
      try { localStorage.setItem("pip-progress", JSON.stringify(next)); } catch {}
      return next;
    });
  };

  const allPhases = tracks.flatMap(t => t.phases.filter(p => !p.isCerts));
  const totalPhases = allPhases.length;
  const completedPhases = allPhases.filter(p => progress[p.n]).length;
  const pct = totalPhases > 0 ? Math.round(completedPhases / totalPhases * 100) : 0;

  return (
    <>
      <SectionHead
        id="roadmap"
        num="I."
        eyebrow="The Complete Path"
        title="From zero to privacy and regulation professional"
        sub="Four tracks covering foundations, operations, specialist knowledge and the career tools you need. Built from real job requirements and active study, not a textbook." />

      <div className="wrap roadmap-progress-wrap">
        <div className="roadmap-progress">
          <div className="rp-row">
            <span className="rp-label">Your progress</span>
            <span className="rp-right">
              <span className="rp-count">{completedPhases} of {totalPhases} phases complete</span>
              <span className="rp-pct">{pct}%</span>
            </span>
          </div>
          <div className="rp-bar"><div className="rp-fill" style={{ width: pct + "%" }}></div></div>
          {completedPhases > 0 && (
            <button className="rp-reset" onClick={() => { setProgress({}); try { localStorage.removeItem("pip-progress"); } catch {} }}>
              Reset progress
            </button>
          )}
        </div>
      </div>

      <RoadmapAreas />

      <section className="roadmap">
        <div className="wrap">
          {tracks.map((t, i) => <Track key={t.num} t={t} idx={i} progress={progress} onToggle={togglePhase} />)}
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
        title="Regulation, explained clearly"
        sub="Simple explainers across privacy law, AI governance, financial regulation and cyber compliance. Updated as I learn." />
      
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
              A field journal of becoming a <i>privacy and regulation practitioner</i>, in public.
            </div>
          </div>
          <div>
            <h5>Learn</h5>
            <ul>
              <li><a href="./areas.html">Practice areas</a></li>
              <li><a href="./roadmap.html">Roadmap</a></li>
              <li><a href="./study.html">Study cards</a></li>
              <li><a href="./career.html">Career</a></li>
            </ul>
          </div>
          <div>
            <h5>Tools</h5>
            <ul>
              <li><a href="./quiz.html">Knowledge quiz</a></li>
              <li><a href="./decisions.html">Decision trees</a></li>
              <li><a href="./scenarios.html">Scenario practice</a></li>
              <li><a href="./calculators.html">Calculators</a></li>
              <li><a href="./glossary.html">Glossary</a></li>
              <li><a href="./artefacts.html">Artefact library</a></li>
              <li><a href="./reading.html">Reading list</a></li>
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
          <span>Set in SIFONN PRO, Helvetica Neue &amp; Lora · Free, always</span>
          <span>UK · London</span>
        </div>
      </div>
    </footer>);

}

// ───────── PAGE SOURCES ─────────
const PAGE_SOURCES = {
  "roadmap": [
    { title: "UK GDPR — full text", note: "legislation.gov.uk", url: "https://www.legislation.gov.uk/eur/2016/679/contents" },
    { title: "Data Protection Act 2018", note: "legislation.gov.uk", url: "https://www.legislation.gov.uk/ukpga/2018/12/contents" },
    { title: "Data (Use & Access) Act 2025", note: "legislation.gov.uk", url: "https://www.legislation.gov.uk/ukpga/2025/14/contents" },
    { title: "ICO: Guide to the UK GDPR", note: "ico.org.uk", url: "https://ico.org.uk/for-organisations/uk-gdpr-guidance-and-resources/" },
    { title: "BCS Practitioner Certificate in Data Protection", note: "bcs.org", url: "https://www.bcs.org/qualifications-and-certifications/certifications-for-professionals/data-protection/" },
    { title: "IAPP CIPP/E certification", note: "iapp.org", url: "https://iapp.org/certify/cippe/" },
    { title: "IAPP CIPM certification", note: "iapp.org", url: "https://iapp.org/certify/cipm/" },
  ],
  "study": [
    { title: "UK GDPR — Article 5: Principles", note: "legislation.gov.uk", url: "https://www.legislation.gov.uk/eur/2016/679/article/5" },
    { title: "UK GDPR — Articles 12–22: Data subject rights", note: "legislation.gov.uk", url: "https://www.legislation.gov.uk/eur/2016/679/article/12" },
    { title: "UK GDPR — Articles 33–34: Breach notification", note: "legislation.gov.uk", url: "https://www.legislation.gov.uk/eur/2016/679/article/33" },
    { title: "ICO: Guide to the UK GDPR — full resource", note: "ico.org.uk", url: "https://ico.org.uk/for-organisations/uk-gdpr-guidance-and-resources/" },
    { title: "ICO: Special category data", note: "ico.org.uk", url: "https://ico.org.uk/for-organisations/uk-gdpr-guidance-and-resources/lawful-basis/special-category-data/" },
    { title: "DPA 2018 Schedule 1 & 2 conditions", note: "legislation.gov.uk", url: "https://www.legislation.gov.uk/ukpga/2018/12/schedule/1" },
  ],
  "career": [
    { title: "ICO: Data Protection Officer — guidance", note: "ico.org.uk", url: "https://ico.org.uk/for-organisations/uk-gdpr-guidance-and-resources/accountability-and-governance/guide-to-accountability-and-governance/accountability-and-governance/data-protection-officers/" },
    { title: "IAPP: Career resources", note: "iapp.org", url: "https://iapp.org/resources/career/" },
    { title: "BCS: Data protection qualifications", note: "bcs.org", url: "https://www.bcs.org/qualifications-and-certifications/certifications-for-professionals/data-protection/" },
    { title: "ICO: Enforcement actions & decisions", note: "ico.org.uk", url: "https://ico.org.uk/action-weve-taken/enforcement/" },
    { title: "UK GDPR — Article 37: DPO designation", note: "legislation.gov.uk", url: "https://www.legislation.gov.uk/eur/2016/679/article/37" },
  ],
  "glossary": [
    { title: "UK GDPR — Article 4: Definitions", note: "legislation.gov.uk", url: "https://www.legislation.gov.uk/eur/2016/679/article/4" },
    { title: "ICO: Glossary", note: "ico.org.uk", url: "https://ico.org.uk/for-organisations/uk-gdpr-guidance-and-resources/glossary/" },
    { title: "DPA 2018 — interpretation provisions", note: "legislation.gov.uk", url: "https://www.legislation.gov.uk/ukpga/2018/12/part/1/chapter/1" },
    { title: "Data (Use & Access) Act 2025", note: "legislation.gov.uk", url: "https://www.legislation.gov.uk/ukpga/2025/14/contents" },
  ],
  "calculators": [
    { title: "UK GDPR — Article 12: Timescales for responding to requests", note: "legislation.gov.uk", url: "https://www.legislation.gov.uk/eur/2016/679/article/12" },
    { title: "UK GDPR — Article 33: Breach notification to the ICO (72 hours)", note: "legislation.gov.uk", url: "https://www.legislation.gov.uk/eur/2016/679/article/33" },
    { title: "UK GDPR — Article 34: Communication of breach to individuals", note: "legislation.gov.uk", url: "https://www.legislation.gov.uk/eur/2016/679/article/34" },
    { title: "ICO: Right of access — timescales", note: "ico.org.uk", url: "https://ico.org.uk/for-organisations/uk-gdpr-guidance-and-resources/individual-rights/right-of-access/how-do-we-respond-to-a-request/" },
    { title: "ICO: Reporting a personal data breach", note: "ico.org.uk", url: "https://ico.org.uk/for-organisations/report-a-breach/" },
  ],
  "artefacts": [
    { title: "UK GDPR — Article 30: Records of processing activities", note: "legislation.gov.uk", url: "https://www.legislation.gov.uk/eur/2016/679/article/30" },
    { title: "UK GDPR — Article 35: Data Protection Impact Assessments", note: "legislation.gov.uk", url: "https://www.legislation.gov.uk/eur/2016/679/article/35" },
    { title: "UK GDPR — Article 28: Data processor contracts", note: "legislation.gov.uk", url: "https://www.legislation.gov.uk/eur/2016/679/article/28" },
    { title: "ICO: Accountability and governance templates", note: "ico.org.uk", url: "https://ico.org.uk/for-organisations/uk-gdpr-guidance-and-resources/accountability-and-governance/" },
    { title: "ICO: DPIAs — when are they required?", note: "ico.org.uk", url: "https://ico.org.uk/for-organisations/uk-gdpr-guidance-and-resources/accountability-and-governance/data-protection-impact-assessments-dpias/" },
  ],
  "resources": [
    { title: "ICO: Guidance and resources hub", note: "ico.org.uk", url: "https://ico.org.uk/for-organisations/uk-gdpr-guidance-and-resources/" },
    { title: "IAPP: Knowledge base", note: "iapp.org", url: "https://iapp.org/resources/" },
    { title: "BCS: Data protection resources", note: "bcs.org", url: "https://www.bcs.org/qualifications-and-certifications/certifications-for-professionals/data-protection/" },
    { title: "NIST AI Risk Management Framework", note: "nist.gov", url: "https://www.nist.gov/artificial-intelligence/ai-risk-management-framework" },
    { title: "Panopticon Blog — 11KBW", note: "panopticonblog.com", url: "https://panopticonblog.com/" },
  ],
  "area-dp": [
    { title: "UK GDPR — full text", note: "legislation.gov.uk", url: "https://www.legislation.gov.uk/eur/2016/679/contents" },
    { title: "Data Protection Act 2018", note: "legislation.gov.uk", url: "https://www.legislation.gov.uk/ukpga/2018/12/contents" },
    { title: "Data (Use & Access) Act 2025", note: "legislation.gov.uk", url: "https://www.legislation.gov.uk/ukpga/2025/14/contents" },
    { title: "ICO: Right of access (DSARs)", note: "ico.org.uk", url: "https://ico.org.uk/for-organisations/uk-gdpr-guidance-and-resources/individual-rights/right-of-access/" },
    { title: "ICO: Data Protection Impact Assessments", note: "ico.org.uk", url: "https://ico.org.uk/for-organisations/uk-gdpr-guidance-and-resources/accountability-and-governance/data-protection-impact-assessments-dpias/" },
    { title: "ICO: Records of Processing Activities", note: "ico.org.uk", url: "https://ico.org.uk/for-organisations/uk-gdpr-guidance-and-resources/accountability-and-governance/guide-to-accountability-and-governance/accountability-and-governance/records-of-processing-activities/" },
    { title: "ICO: Personal data breaches", note: "ico.org.uk", url: "https://ico.org.uk/for-organisations/uk-gdpr-guidance-and-resources/security/personal-data-breaches/" },
    { title: "ICO: Special category data", note: "ico.org.uk", url: "https://ico.org.uk/for-organisations/uk-gdpr-guidance-and-resources/lawful-basis/special-category-data/" },
  ],
  "area-ai": [
    { title: "EU AI Act — Regulation (EU) 2024/1689", note: "eur-lex.europa.eu", url: "https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX:32024R1689" },
    { title: "NIST AI Risk Management Framework 1.0", note: "nist.gov", url: "https://www.nist.gov/artificial-intelligence/ai-risk-management-framework" },
    { title: "ICO: AI and data protection", note: "ico.org.uk", url: "https://ico.org.uk/for-organisations/uk-gdpr-guidance-and-resources/artificial-intelligence/" },
    { title: "UK AI Safety Institute — guidance", note: "gov.uk", url: "https://www.gov.uk/government/organisations/ai-safety-institute" },
    { title: "ICO: Guidance on AI and data protection risk toolkit", note: "ico.org.uk", url: "https://ico.org.uk/for-organisations/uk-gdpr-guidance-and-resources/artificial-intelligence/guidance-on-ai-and-data-protection/" },
    { title: "UK GDPR — Article 22: Automated decision-making", note: "legislation.gov.uk", url: "https://www.legislation.gov.uk/eur/2016/679/article/22" },
  ],
  "area-aml": [
    { title: "Proceeds of Crime Act 2002", note: "legislation.gov.uk", url: "https://www.legislation.gov.uk/ukpga/2002/29/contents" },
    { title: "Money Laundering & Terrorist Financing Regulations 2017", note: "legislation.gov.uk", url: "https://www.legislation.gov.uk/uksi/2017/692/contents" },
    { title: "FATF: Recommendations", note: "fatf-gafi.org", url: "https://www.fatf-gafi.org/en/topics/fatf-recommendations.html" },
    { title: "FCA: Financial crime guide", note: "fca.org.uk", url: "https://www.handbook.fca.org.uk/handbook/FC/" },
    { title: "NCA: Suspicious Activity Reports", note: "nationalcrimeagency.gov.uk", url: "https://www.nationalcrimeagency.gov.uk/what-we-do/crime-threats/money-laundering-and-illicit-finance/suspicious-activity-reports" },
  ],
  "area-conduct": [
    { title: "FCA: Conduct of Business Sourcebook (COBS)", note: "fca.org.uk", url: "https://www.handbook.fca.org.uk/handbook/COBS/" },
    { title: "FCA: Senior Managers and Certification Regime", note: "fca.org.uk", url: "https://www.fca.org.uk/firms/senior-managers-certification-regime" },
    { title: "FCA: Consumer Duty", note: "fca.org.uk", url: "https://www.fca.org.uk/firms/consumer-duty" },
    { title: "Financial Services and Markets Act 2000", note: "legislation.gov.uk", url: "https://www.legislation.gov.uk/ukpga/2000/8/contents" },
  ],
  "area-cyber": [
    { title: "NIST Cybersecurity Framework 2.0", note: "nist.gov", url: "https://www.nist.gov/cyberframework" },
    { title: "NCSC: Cyber Essentials scheme", note: "ncsc.gov.uk", url: "https://www.ncsc.gov.uk/cyberessentials/overview" },
    { title: "ISO/IEC 27001:2022 — Information security management", note: "iso.org", url: "https://www.iso.org/standard/27001" },
    { title: "ICO: Security — a guide to the security principle", note: "ico.org.uk", url: "https://ico.org.uk/for-organisations/uk-gdpr-guidance-and-resources/security/" },
    { title: "NCSC: 10 Steps to Cyber Security", note: "ncsc.gov.uk", url: "https://www.ncsc.gov.uk/collection/10-steps" },
  ],
  "area-fintech": [
    { title: "FCA: Regulatory framework for fintech", note: "fca.org.uk", url: "https://www.fca.org.uk/innovation" },
    { title: "Payment Services Regulations 2017 (PSD2)", note: "legislation.gov.uk", url: "https://www.legislation.gov.uk/uksi/2017/752/contents" },
    { title: "FCA: Open Banking", note: "fca.org.uk", url: "https://www.fca.org.uk/consumers/open-banking" },
    { title: "Data (Use & Access) Act 2025 — smart data provisions", note: "legislation.gov.uk", url: "https://www.legislation.gov.uk/ukpga/2025/14/contents" },
    { title: "FCA: Consumer Duty", note: "fca.org.uk", url: "https://www.fca.org.uk/firms/consumer-duty" },
  ],
  "quiz": [
    { title: "UK GDPR — Article 6: Lawful bases for processing", note: "legislation.gov.uk", url: "https://www.legislation.gov.uk/eur/2016/679/article/6" },
    { title: "UK GDPR — Article 9: Special category data", note: "legislation.gov.uk", url: "https://www.legislation.gov.uk/eur/2016/679/article/9" },
    { title: "UK GDPR — Article 12: Timescales for responding", note: "legislation.gov.uk", url: "https://www.legislation.gov.uk/eur/2016/679/article/12" },
    { title: "UK GDPR — Article 25: Privacy by Design", note: "legislation.gov.uk", url: "https://www.legislation.gov.uk/eur/2016/679/article/25" },
    { title: "UK GDPR — Article 33–34: Breach notification", note: "legislation.gov.uk", url: "https://www.legislation.gov.uk/eur/2016/679/article/33" },
    { title: "ICO: Guide to the UK GDPR", note: "ico.org.uk", url: "https://ico.org.uk/for-organisations/uk-gdpr-guidance-and-resources/" },
  ],
  "decisions": [
    { title: "UK GDPR — Article 35: When is a DPIA required?", note: "legislation.gov.uk", url: "https://www.legislation.gov.uk/eur/2016/679/article/35" },
    { title: "ICO: DPIAs — when are they required?", note: "ico.org.uk", url: "https://ico.org.uk/for-organisations/uk-gdpr-guidance-and-resources/accountability-and-governance/data-protection-impact-assessments-dpias/" },
    { title: "UK GDPR — Article 6: Lawful bases", note: "legislation.gov.uk", url: "https://www.legislation.gov.uk/eur/2016/679/article/6" },
    { title: "ICO: Lawful basis interactive tool", note: "ico.org.uk", url: "https://ico.org.uk/for-organisations/uk-gdpr-guidance-and-resources/lawful-basis/lawful-basis-interactive-guidance-tool/" },
    { title: "UK GDPR — Article 33: Breach notification to supervisory authority", note: "legislation.gov.uk", url: "https://www.legislation.gov.uk/eur/2016/679/article/33" },
    { title: "ICO: Reporting a personal data breach", note: "ico.org.uk", url: "https://ico.org.uk/for-organisations/report-a-breach/" },
  ],
  "scenarios": [
    { title: "UK GDPR — Article 12: Responding to data subject requests", note: "legislation.gov.uk", url: "https://www.legislation.gov.uk/eur/2016/679/article/12" },
    { title: "UK GDPR — Article 28: Controller-processor contracts", note: "legislation.gov.uk", url: "https://www.legislation.gov.uk/eur/2016/679/article/28" },
    { title: "UK GDPR — Articles 33–34: Breach notification", note: "legislation.gov.uk", url: "https://www.legislation.gov.uk/eur/2016/679/article/33" },
    { title: "ICO: Direct marketing guidance", note: "ico.org.uk", url: "https://ico.org.uk/for-organisations/direct-marketing-and-privacy-and-electronic-communications/" },
    { title: "Privacy and Electronic Communications Regulations 2003 (PECR)", note: "legislation.gov.uk", url: "https://www.legislation.gov.uk/uksi/2003/2426/contents" },
    { title: "ICO: International transfers — UK IDTA", note: "ico.org.uk", url: "https://ico.org.uk/for-organisations/uk-gdpr-guidance-and-resources/international-transfers/" },
  ],
};

function PageSources({ sources }) {
  return (
    <section className="page-sources">
      <div className="wrap">
        <div className="psrc-head">Sources</div>
        <ol className="psrc-list">
          {sources.map((s, i) => (
            <li key={i} className="psrc-item">
              <span className="psrc-n">{String(i + 1).padStart(2, "0")}</span>
              <a href={s.url} target="_blank" rel="noopener noreferrer" className="psrc-link">
                <span className="psrc-title">{s.title}</span>
                {s.note && <span className="psrc-note">{s.note}</span>}
                <span className="psrc-arr" aria-hidden="true">↗</span>
              </a>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

// expose
Object.assign(window, {
  Nav, Hero, Mission, Ribbon, SectionHead, HomePreview,
  Roadmap, Journey, Articles, Resources, About, Footer,
  PageSources, PAGE_SOURCES,
  useReveal
});