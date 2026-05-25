/* === Privacy in Practice — Artefact library page === */
const { useState: useArtS } = React;

function ArtefactCard({ a }) {
  const [open, setOpen] = useArtS(false);
  return (
    <article className={"artef" + (a.status === "soon" ? " is-soon" : "") + (open ? " is-open" : "")}>
      <header className="art-head">
        <div className="art-meta">
          <span className={"art-status art-status-" + a.status}>
            {a.status === "available" ? "Available" : "Coming soon"}
          </span>
          <span className="art-kicker">{a.kicker}</span>
        </div>
        <h3 className="art-title">{a.title}</h3>
        <p className="art-summary">{a.summary}</p>
      </header>

      <button className="art-toggle" onClick={() => setOpen(o => !o)} aria-expanded={open}>
        {open ? "Hide details ↑" : "What's inside ↓"}
      </button>

      {open && (
        <div className="art-detail">
          <div className="art-why">
            <span className="art-label">Why this matters</span>
            <p>{a.why}</p>
          </div>
          <div className="art-contents">
            <span className="art-label">Contents</span>
            <ul>
              {a.contents.map((c, i) => <li key={i}>{c}</li>)}
            </ul>
          </div>
          {a.notes && (
            <div className="art-notes">
              <span className="art-label">Notes</span>
              <p>{a.notes}</p>
            </div>
          )}
        </div>
      )}

      <footer className="art-foot">
        <div className="art-formats">
          {a.formats && a.formats.map(f => (
            <span key={f} className="art-fmt">{f}</span>
          ))}
        </div>
        {a.status === "available" ? (
          <button className="art-dl" onClick={() => alert("Downloads are being finalised — first batch lands shortly. Sign up to the newsletter to be notified.")}>
            Download
            <span>↓</span>
          </button>
        ) : (
          <span className="art-soon-note">Sign up to be notified ↗</span>
        )}
      </footer>
    </article>
  );
}

function ArtefactsPage() {
  const all = window.ARTEFACTS || [];
  const available = all.filter(a => a.status === "available");
  const soon = all.filter(a => a.status === "soon");
  return (
    <>
      <SectionHead
        id="artefacts"
        num="✦"
        eyebrow="Artefact library"
        title="Templates, worked examples, playbooks"
        sub="Everything I tell you to build in the roadmap, available as actual files. Free. Open. Tell me what's missing and I'll add it."
      />
      <section className="artefacts">
        <div className="wrap">
          {available.length > 0 && (
            <div className="art-section">
              <header className="art-section-head">
                <span className="art-section-num">01</span>
                <div>
                  <h2>Ready to download</h2>
                  <p>The first batch — DSAR pack, worked DPIA, breach playbook. PDF + editable formats.</p>
                </div>
              </header>
              <div className="art-grid">
                {available.map(a => <ArtefactCard key={a.id} a={a} />)}
              </div>
            </div>
          )}

          {soon.length > 0 && (
            <div className="art-section">
              <header className="art-section-head">
                <span className="art-section-num">02</span>
                <div>
                  <h2>Coming next</h2>
                  <p>In progress. Each lands when it's actually good enough to ship.</p>
                </div>
              </header>
              <div className="art-grid">
                {soon.map(a => <ArtefactCard key={a.id} a={a} />)}
              </div>
            </div>
          )}

          <aside className="art-cta">
            <h3>What should I build next?</h3>
            <p>
              The artefact library is driven by what people actually ask for. Tell me what would be useful — a
              specific template, a sector-specific worked example, an extra deliverable from a phase of the roadmap.
              I'll prioritise based on requests.
            </p>
            <p><a href="./about.html">Get in touch →</a></p>
          </aside>
        </div>
      </section>
    </>
  );
}

Object.assign(window, { ArtefactsPage });
