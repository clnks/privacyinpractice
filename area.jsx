/* === Privacy in Practice — practice-area page template ===
   Renders one of the AREAS from areas.js based on window.AREA_ID set by
   the host HTML file. */
const { useState: useAS, useEffect: useAE, useMemo: useAM } = React;

function AreaHero({ area }) {
  return (
    <header className={"area-hero area-hero-" + area.color}>
      <div className="wrap">
        <div className="area-hero-inner">
          <div className="area-hero-glyph">{area.glyph}</div>
          <div className="area-hero-text">
            <span className="eyebrow">{area.kicker}</span>
            <h1>{area.label}</h1>
            <p>{area.oneliner}</p>
          </div>
        </div>
      </div>
    </header>
  );
}

function AreaIndex({ area }) {
  const items = [
    { id: "about",         label: "About" },
    { id: "roadmap",       label: "Roadmap" },
    { id: "certs",         label: "Recognised certs" },
    { id: "portfolio",     label: "Portfolio" },
    { id: "differentiate", label: "How to differentiate" },
    { id: "publications",  label: "Publications" },
    { id: "faq",           label: "FAQ" },
  ];
  const [active, setActive] = useAS(items[0].id);
  useAE(() => {
    const onScroll = () => {
      let cur = items[0].id;
      for (const it of items) {
        const el = document.getElementById("a-" + it.id);
        if (!el) continue;
        if (el.getBoundingClientRect().top < 180) cur = it.id;
      }
      setActive(cur);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <aside className="area-toc" aria-label="In this area">
      <div className="toc-label">In this area</div>
      <ol>
        {items.map(it => (
          <li key={it.id} className={active === it.id ? "is-active" : ""}>
            <a href={"#a-" + it.id}>{it.label}</a>
          </li>
        ))}
      </ol>
    </aside>
  );
}

function AreaAbout({ area }) {
  return (
    <section id="a-about" className="asec asec-about">
      <header className="asec-head">
        <span className="asec-i">01</span>
        <div>
          <span className="asec-kicker">About this area</span>
          <h2>Why it exists, who it's for</h2>
        </div>
      </header>
      <div className="about-grid-3">
        <div className="ab-card">
          <h4>Why it matters</h4>
          <p>{area.about.why}</p>
        </div>
        <div className="ab-card">
          <h4>Who this is for</h4>
          <p>{area.about.who}</p>
        </div>
        <div className="ab-card">
          <h4>The shape of the career</h4>
          <p>{area.about.shape}</p>
        </div>
      </div>
    </section>
  );
}

function AreaRoadmap({ area }) {
  return (
    <section id="a-roadmap" className="asec asec-roadmap">
      <header className="asec-head">
        <span className="asec-i">02</span>
        <div>
          <span className="asec-kicker">The path</span>
          <h2>Roadmap</h2>
          <p>Phases in rough order. You won't move through them strictly linearly — but most practitioners cover this ground in something like this sequence.</p>
        </div>
      </header>
      <ol className="ar-phases">
        {area.phases.map((p, i) => (
          <li key={p.n} className="ar-phase">
            <div className="ar-n">{p.n}</div>
            <div className="ar-body">
              <h3>{p.title}</h3>
              <p className="ar-blurb">{p.blurb}</p>
              <ul className="ar-beats">
                {p.beats.map((b, j) => <li key={j}>{b}</li>)}
              </ul>
            </div>
          </li>
        ))}
      </ol>
      {area.id === "dp" && (
        <div className="ar-full-link">
          <a href="./roadmap.html" className="ar-full-link-btn">
            <span>See the full, detailed roadmap</span>
            <span className="ar-full-link-arr" aria-hidden="true">→</span>
          </a>
          <p className="ar-full-link-note">Expanded tracks with milestones, resources &amp; progress tracking</p>
        </div>
      )}
    </section>
  );
}

function AreaCerts({ area }) {
  return (
    <section id="a-certs" className="asec asec-certs">
      <header className="asec-head">
        <span className="asec-i">03</span>
        <div>
          <span className="asec-kicker">Credentials</span>
          <h2>Recognised certifications</h2>
          <p>Don't take them all. Pick a sensible sequence based on where you want to land. Prices are indicative as of 2026.</p>
        </div>
      </header>
      <div className="ac-grid">
        {area.certs.map((c, i) => (
          <article key={i} className="ac-card">
            <header>
              <h4>{c.name}</h4>
              <span className="ac-level">{c.level}</span>
            </header>
            <div className="ac-issuer">{c.issuer}</div>
            <div className="ac-cost">{c.cost}</div>
            <p>{c.note}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

function AreaPortfolio({ area }) {
  return (
    <section id="a-portfolio" className="asec asec-portfolio">
      <header className="asec-head">
        <span className="asec-i">04</span>
        <div>
          <span className="asec-kicker">Show the work</span>
          <h2>Build a portfolio</h2>
          <p>You can't put production work on GitHub when the work is confidential. Build the artefacts as if for a real role — that's the proof employers can verify.</p>
        </div>
      </header>
      <div className="ap-grid">
        {area.portfolio.map((p, i) => (
          <article key={i} className="ap-card">
            <header>
              <span className="ap-i">{String(i + 1).padStart(2, "0")}</span>
              <h4>{p.name}</h4>
            </header>
            <p className="ap-purpose">{p.purpose}</p>
            <div className="ap-contents">
              <span className="ap-label">Should contain</span>
              <p>{p.contents}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function AreaDifferentiate({ area }) {
  return (
    <section id="a-differentiate" className="asec asec-diff">
      <header className="asec-head">
        <span className="asec-i">05</span>
        <div>
          <span className="asec-kicker">Stand out</span>
          <h2>How to differentiate</h2>
          <p>Three opinionated moves that separate junior practitioners from the rest of the queue.</p>
        </div>
      </header>
      <div className="ad-grid">
        {area.differentiate.map((d, i) => (
          <article key={i} className="ad-card">
            <span className="ad-i">{String(i + 1).padStart(2, "0")}</span>
            <h4>{d.head}</h4>
            <p>{d.body}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

function AreaPublications({ area }) {
  return (
    <section id="a-publications" className="asec asec-pubs">
      <header className="asec-head">
        <span className="asec-i">06</span>
        <div>
          <span className="asec-kicker">Read these</span>
          <h2>Publications worth following</h2>
          <p>A small, deliberate reading list will outperform a sprawling RSS feed every time. Start with these.</p>
        </div>
      </header>
      <div className="ap2-list">
        {area.publications.map((p, i) => {
          const Tag = p.url ? "a" : "div";
          const props = p.url ? { href: p.url, target: "_blank", rel: "noopener noreferrer" } : {};
          return (
            <Tag key={i} className={"ap2-item" + (p.url ? " is-link" : "")} {...props}>
              <div className="ap2-body">
                <h4>
                  {p.title}
                  {p.url && <span className="ap2-arr" aria-hidden="true">↗</span>}
                </h4>
                <div className="ap2-author">{p.author}</div>
                <p>{p.note}</p>
              </div>
              <span className="ap2-tag">{p.type}</span>
            </Tag>
          );
        })}
      </div>
    </section>
  );
}

function AreaFAQ({ area }) {
  const [open, setOpen] = useAS({});
  return (
    <section id="a-faq" className="asec asec-faq">
      <header className="asec-head">
        <span className="asec-i">07</span>
        <div>
          <span className="asec-kicker">Common questions</span>
          <h2>FAQ</h2>
        </div>
      </header>
      <div className="af-list">
        {area.faq.map((f, i) => (
          <article key={i} className={"af-item" + (open[i] ? " is-open" : "")}>
            <button className="af-q" onClick={() => setOpen(o => ({ ...o, [i]: !o[i] }))}>
              <span className="af-text">{f.q}</span>
              <span className="af-chev">{open[i] ? "−" : "+"}</span>
            </button>
            {open[i] && <div className="af-a"><p>{f.a}</p></div>}
          </article>
        ))}
      </div>
    </section>
  );
}

function Area() {
  const id = window.AREA_ID;
  const area = (window.AREAS || []).find(a => a.id === id);
  if (!area) {
    return (
      <section className="wrap" style={{ padding: "120px 40px" }}>
        <h1>Area not found</h1>
        <p>Couldn't find an area with id <code>{id}</code>. Check areas.js.</p>
      </section>
    );
  }
  return (
    <>
      <AreaHero area={area} />
      <section className="area-body">
        <div className="wrap area-wrap">
          <AreaIndex area={area} />
          <div className="area-content">
            <AreaAbout area={area} />
            <AreaRoadmap area={area} />
            <AreaCerts area={area} />
            <AreaPortfolio area={area} />
            <AreaDifferentiate area={area} />
            <AreaPublications area={area} />
            <AreaFAQ area={area} />

            <section className="area-cta">
              <h3>Studying for this area?</h3>
              <p>The <a href="./study.html">study cards</a> include topics that map to several of these phases. The <a href="./career.html">career area</a> covers CV, interview, and portfolio practice across all six disciplines.</p>
            </section>
          </div>
        </div>
      </section>
    </>
  );
}

Object.assign(window, { Area });
