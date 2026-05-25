/* === Privacy in Practice — Glossary page === */
const { useState: useGS, useMemo: useGM } = React;

function GlossaryPage() {
  const all = window.GLOSSARY || [];
  const areas = window.AREAS || [];
  const [q, setQ] = useGS("");
  const [areaFilter, setArea] = useGS("all");

  const filtered = useGM(() => {
    const term = q.trim().toLowerCase();
    return all
      .filter(g => areaFilter === "all" || g.area === areaFilter)
      .filter(g => !term || g.term.toLowerCase().includes(term) || g.short.toLowerCase().includes(term) || g.long.toLowerCase().includes(term))
      .sort((a, b) => a.term.localeCompare(b.term));
  }, [all, q, areaFilter]);

  // Group by first letter
  const grouped = useGM(() => {
    const m = {};
    filtered.forEach(g => {
      const k = g.term[0].toUpperCase();
      (m[k] ||= []).push(g);
    });
    return Object.entries(m).sort();
  }, [filtered]);

  return (
    <>
      <SectionHead
        id="glossary"
        num="A·Z"
        eyebrow="Glossary"
        title="The vocabulary, explained"
        sub="Every term you'll hit on the roadmap — defined, cross-referenced, in plain English. Use search or jump by letter."
      />
      <section className="glossary">
        <div className="wrap">
          <div className="gl-controls">
            <div className="gl-search">
              <span className="gl-search-i" aria-hidden="true">⌕</span>
              <input
                type="search"
                placeholder="Search terms, e.g. DSAR, AI Act, MLRO…"
                value={q}
                onChange={e => setQ(e.target.value)}
                aria-label="Search glossary"
              />
              {q && <button className="gl-clear" onClick={() => setQ("")} aria-label="Clear">×</button>}
            </div>
            <div className="gl-filters">
              <button className={"gl-chip" + (areaFilter === "all" ? " is-active" : "")} onClick={() => setArea("all")}>All areas</button>
              {areas.map(a => (
                <button
                  key={a.id}
                  className={"gl-chip" + (areaFilter === a.id ? " is-active" : "")}
                  onClick={() => setArea(a.id)}
                >{a.label}</button>
              ))}
            </div>
            <div className="gl-count">
              <span className="gl-count-n">{filtered.length}</span>
              <span className="gl-count-l">{filtered.length === 1 ? "term" : "terms"}</span>
            </div>
          </div>

          {filtered.length === 0 ? (
            <div className="gl-empty">
              <p>No terms match — try a broader search.</p>
            </div>
          ) : (
            <div className="gl-letters">
              {grouped.map(([letter, items]) => (
                <section key={letter} className="gl-letter-sec" id={"gl-" + letter}>
                  <h2 className="gl-letter">{letter}</h2>
                  <div className="gl-items">
                    {items.map(g => {
                      const area = areas.find(a => a.id === g.area);
                      return (
                        <article key={g.term} className="gl-item" id={"term-" + g.term.toLowerCase().replace(/[^a-z0-9]+/g, "-")}>
                          <div className="gl-item-head">
                            <h3 className="gl-term">{g.term}</h3>
                            {area && (
                              <a href={"./area-" + area.id + ".html"} className={"gl-area-tag gl-area-" + area.color}>
                                {area.label}
                              </a>
                            )}
                          </div>
                          <p className="gl-short">{g.short}</p>
                          <p className="gl-long">{g.long}</p>
                        </article>
                      );
                    })}
                  </div>
                </section>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}

Object.assign(window, { GlossaryPage });
