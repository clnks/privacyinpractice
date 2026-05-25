/* === Privacy in Practice — Cmd+K site search === */
const { useState: useSS, useEffect: useSE, useMemo: useSM, useRef: useSR } = React;

// Build a flat search index from all content sources on the page.
function buildIndex() {
  const items = [];

  // Cards
  (window.CARDS || []).forEach(c => {
    items.push({
      kind: "card",
      kindLabel: "Study card",
      title: c.q,
      detail: c.a.split("\n")[0],
      href: "./study.html",
      meta: c.topic,
      text: (c.q + " " + c.a + " " + (c.topic || "")).toLowerCase(),
    });
  });

  // Glossary
  (window.GLOSSARY || []).forEach(g => {
    items.push({
      kind: "glossary",
      kindLabel: "Glossary",
      title: g.term,
      detail: g.short,
      href: "./glossary.html#term-" + g.term.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
      meta: g.area,
      text: (g.term + " " + g.short + " " + g.long).toLowerCase(),
    });
  });

  // Areas + their phases + faq + certs
  (window.AREAS || []).forEach(a => {
    items.push({
      kind: "area",
      kindLabel: "Practice area",
      title: a.label,
      detail: a.oneliner,
      href: "./area-" + a.id + ".html",
      meta: a.kicker,
      text: (a.label + " " + a.kicker + " " + a.oneliner + " " + (a.about && a.about.why || "")).toLowerCase(),
    });
    (a.phases || []).forEach(p => {
      items.push({
        kind: "phase",
        kindLabel: a.label + " — phase " + p.n,
        title: p.title,
        detail: p.blurb,
        href: "./area-" + a.id + ".html#a-roadmap",
        meta: a.label,
        text: (p.title + " " + p.blurb + " " + (p.beats || []).join(" ")).toLowerCase(),
      });
    });
    (a.faq || []).forEach(f => {
      items.push({
        kind: "faq",
        kindLabel: a.label + " — FAQ",
        title: f.q,
        detail: f.a.slice(0, 120) + (f.a.length > 120 ? "…" : ""),
        href: "./area-" + a.id + ".html#a-faq",
        meta: a.label,
        text: (f.q + " " + f.a).toLowerCase(),
      });
    });
    (a.certs || []).forEach(c => {
      items.push({
        kind: "cert",
        kindLabel: "Certification",
        title: c.name,
        detail: c.issuer + " · " + c.cost,
        href: "./area-" + a.id + ".html#a-certs",
        meta: a.label,
        text: (c.name + " " + c.issuer + " " + (c.note || "")).toLowerCase(),
      });
    });
  });

  // Artefacts
  (window.ARTEFACTS || []).forEach(a => {
    items.push({
      kind: "artefact",
      kindLabel: "Artefact",
      title: a.title,
      detail: a.summary,
      href: "./artefacts.html",
      meta: a.status,
      text: (a.title + " " + a.summary + " " + (a.why || "") + " " + (a.contents || []).join(" ")).toLowerCase(),
    });
  });

  // Top-level pages
  [
    { title: "Roadmap", detail: "Four tracks, sixteen phases — the structured DP path.", href: "./roadmap.html", kind: "page", kindLabel: "Page" },
    { title: "Study cards", detail: "Flashcards, cue grid, spaced repetition, quiz mode.", href: "./study.html", kind: "page", kindLabel: "Page" },
    { title: "Career", detail: "CV checklist, interview Q-bank, STAR prep, portfolio guide.", href: "./career.html", kind: "page", kindLabel: "Page" },
    { title: "Calculators", detail: "DSAR deadline, breach notify, DPIA mandatory.", href: "./calculators.html", kind: "page", kindLabel: "Page" },
    { title: "Glossary", detail: "Every term, defined.", href: "./glossary.html", kind: "page", kindLabel: "Page" },
    { title: "Artefacts", detail: "Templates and worked examples — free to download.", href: "./artefacts.html", kind: "page", kindLabel: "Page" },
    { title: "Journey", detail: "Where I am on the path right now.", href: "./journey.html", kind: "page", kindLabel: "Page" },
    { title: "Articles", detail: "Plain-English explainers.", href: "./articles.html", kind: "page", kindLabel: "Page" },
    { title: "Resources", detail: "Courses, ICO guidance, books, tools.", href: "./resources.html", kind: "page", kindLabel: "Page" },
    { title: "Privacy notice", detail: "How this site handles your data.", href: "./privacy.html", kind: "page", kindLabel: "Page" },
    { title: "Cookies & storage", detail: "What's stored on your device.", href: "./cookies.html", kind: "page", kindLabel: "Page" },
  ].forEach(p => items.push({ ...p, text: (p.title + " " + p.detail).toLowerCase() }));

  return items;
}

function score(item, terms) {
  if (!terms.length) return 0;
  let s = 0;
  const title = item.title.toLowerCase();
  for (const t of terms) {
    if (!item.text.includes(t)) return -1; // require all terms match
    if (title === t) s += 100;
    else if (title.startsWith(t)) s += 50;
    else if (title.includes(" " + t)) s += 20;
    else if (title.includes(t)) s += 15;
    else s += 1;
  }
  // small boost for shorter titles (likely more specific)
  s += Math.max(0, 30 - title.length) * 0.2;
  return s;
}

function SearchModal() {
  const [open, setOpen] = useSS(false);
  const [q, setQ] = useSS("");
  const [active, setActive] = useSS(0);
  const inputRef = useSR(null);
  const listRef = useSR(null);

  const index = useSM(() => buildIndex(), []);
  const results = useSM(() => {
    if (!q.trim()) return [];
    const terms = q.trim().toLowerCase().split(/\s+/);
    return index
      .map(item => ({ item, s: score(item, terms) }))
      .filter(r => r.s > 0)
      .sort((a, b) => b.s - a.s)
      .slice(0, 30)
      .map(r => r.item);
  }, [q, index]);

  useSE(() => {
    const onKey = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen(o => !o);
        return;
      }
      if (e.key === "/" && !open && document.activeElement && !["INPUT", "TEXTAREA"].includes(document.activeElement.tagName)) {
        e.preventDefault();
        setOpen(true);
        return;
      }
      if (!open) return;
      if (e.key === "Escape") { setOpen(false); return; }
      if (e.key === "ArrowDown") { e.preventDefault(); setActive(a => Math.min(a + 1, results.length - 1)); }
      if (e.key === "ArrowUp")   { e.preventDefault(); setActive(a => Math.max(a - 1, 0)); }
      if (e.key === "Enter")     { e.preventDefault(); if (results[active]) window.location.href = results[active].href; }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, results, active]);

  useSE(() => {
    if (open && inputRef.current) {
      setTimeout(() => inputRef.current && inputRef.current.focus(), 60);
      setActive(0);
    } else if (!open) {
      setQ("");
    }
  }, [open]);

  useSE(() => {
    if (!listRef.current) return;
    const el = listRef.current.querySelector(".sr-item.is-active");
    if (el) el.scrollIntoView({ block: "nearest" });
  }, [active]);

  // Expose a global opener for the trigger pill in the nav
  useSE(() => {
    window.openSearch = () => setOpen(true);
  }, []);

  if (!open) return null;

  return (
    <div className="search-overlay" onClick={() => setOpen(false)} role="dialog" aria-label="Site search">
      <div className="search-modal" onClick={e => e.stopPropagation()}>
        <header className="sr-head">
          <span className="sr-icon" aria-hidden="true">⌕</span>
          <input
            ref={inputRef}
            className="sr-input"
            type="text"
            placeholder="Search cards, glossary, areas, pages…"
            value={q}
            onChange={e => { setQ(e.target.value); setActive(0); }}
            autoComplete="off"
            spellCheck="false"
          />
          <kbd className="sr-esc">Esc</kbd>
        </header>

        <div className="sr-list" ref={listRef}>
          {q && results.length === 0 && (
            <div className="sr-empty">
              No matches for <strong>"{q}"</strong>. Try a different term, or browse the <a href="./glossary.html">glossary</a>.
            </div>
          )}
          {!q && (
            <div className="sr-tips">
              <div className="sr-tips-head">Try searching for…</div>
              <div className="sr-tips-chips">
                {["DSAR", "breach", "Article 22", "DPIA", "MLRO", "AI Act", "Consumer Duty", "Cyber Essentials"].map(t => (
                  <button key={t} className="sr-chip" onClick={() => { setQ(t); setActive(0); }}>{t}</button>
                ))}
              </div>
              <div className="sr-tips-keys">
                <kbd>↑</kbd> <kbd>↓</kbd> to navigate · <kbd>↵</kbd> to open · <kbd>Esc</kbd> to close
              </div>
            </div>
          )}
          {results.map((r, i) => (
            <a
              key={r.kind + ":" + r.title + ":" + i}
              className={"sr-item" + (i === active ? " is-active" : "")}
              href={r.href}
              onMouseEnter={() => setActive(i)}
              onClick={() => setOpen(false)}
            >
              <span className={"sr-kind sr-kind-" + r.kind}>{r.kindLabel}</span>
              <div className="sr-body">
                <span className="sr-title">{r.title}</span>
                <span className="sr-detail">{r.detail}</span>
              </div>
              <span className="sr-arr" aria-hidden="true">↵</span>
            </a>
          ))}
        </div>

        <footer className="sr-foot">
          <span><kbd>⌘</kbd> <kbd>K</kbd> to open from anywhere</span>
          <span className="sr-foot-r">{results.length > 0 && results.length + " match" + (results.length === 1 ? "" : "es")}</span>
        </footer>
      </div>
    </div>
  );
}

function SearchTrigger() {
  return (
    <button
      className="search-trigger"
      onClick={() => window.openSearch && window.openSearch()}
      aria-label="Search the site"
    >
      <span className="st-i" aria-hidden="true">⌕</span>
      <span className="st-label">Search</span>
      <kbd className="st-kbd">⌘K</kbd>
    </button>
  );
}

// ───────── Newsletter signup form (footer) ─────────
function NewsletterForm() {
  const [email, setEmail] = useSS("");
  const [done, setDone] = useSS(false);
  const submit = (e) => {
    e.preventDefault();
    if (!email || !email.includes("@")) return;
    // For now: open mailto. Swap to API later.
    const subject = encodeURIComponent("Subscribe — Privacy in Practice");
    const body = encodeURIComponent("Please add me to the newsletter.\n\n— " + email);
    window.location.href = "mailto:hello@privacyinpractice.example?subject=" + subject + "&body=" + body;
    setDone(true);
  };
  if (done) {
    return (
      <div className="nl-done">
        <strong>Thanks.</strong> Your email client should have opened — send the draft and you're on.
      </div>
    );
  }
  return (
    <form className="nl-form" onSubmit={submit}>
      <label className="nl-label" htmlFor="nl-email">
        <strong>Weekly note.</strong> One regulator update, one essay, one card pick. No spam, easy unsubscribe.
      </label>
      <div className="nl-row">
        <input
          id="nl-email"
          type="email"
          required
          placeholder="you@example.com"
          value={email}
          onChange={e => setEmail(e.target.value)}
          className="nl-input"
        />
        <button type="submit" className="nl-btn">Subscribe →</button>
      </div>
      <p className="nl-meta">
        Processed under legitimate interests. Single-purpose use. See the <a href="./privacy.html">privacy notice</a>.
      </p>
    </form>
  );
}

Object.assign(window, { SearchModal, SearchTrigger, NewsletterForm });
