/* === Privacy in Practice — interactive bookcase / reading list ===
   Two sections: "On the shelf" (physical books) and "On the web" (online
   resources). Each book has an image-slot for a user-supplied cover; the
   spines stay text-only (titles run up the spine, as on real books).
   Hand-pickup cursor on the shelf. */
const { useState: useBkS, useEffect: useBkE, useMemo: useBkM, useRef: useBkR } = React;

/* ─── A single book spine on the shelf ────────────────────────── */
function Spine({ book, isActive, onClick, idx }) {
  const ref = useBkR(null);
  useBkE(() => {
    if (isActive && ref.current) {
      ref.current.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
    }
  }, [isActive]);
  return (
    <button
      ref={ref}
      className={"bk-spine bk-spine-" + book.color + (isActive ? " is-active" : "")}
      style={{ height: book.h + "px", width: isActive ? "160px" : book.w + "px", "--tilt": (book.tilt || 0) + "deg" }}
      onClick={onClick}
      aria-label={book.title + " by " + book.author + " — pick up to read more"}
      aria-pressed={isActive}
      data-idx={idx}
    >
      <span className="bk-band bk-band-top" aria-hidden="true"></span>
      <span className="bk-band bk-band-bot" aria-hidden="true"></span>
      <span className="bk-spine-text">
        <span className="bk-spine-title">{book.spineLabel || book.title}</span>
      </span>
      <span className="bk-spine-author">{book.authorShort || book.author}</span>
      {/* ── Cover reveal ── */}
      <span className="bk-spine-cover" aria-hidden="true">
        {book.coverUrl
          ? <img className="bk-spine-cover-img" src={book.coverUrl} alt="" />
          : <span className="bk-spine-cover-fb">
              <span className="bk-spine-cover-fb-title">{book.title}</span>
              <span className="bk-spine-cover-fb-author">{book.authorShort || book.author}</span>
            </span>
        }
      </span>
    </button>
  );
}

/* ─── Book cover (image-slot wrapped) ─────────────────────────── */
function BookCover({ book, size = "lg" }) {
  const sizeClass = "bk-cover-" + size;
  return (
    <div className={"bk-cover-wrap-i " + sizeClass}>
      <div className={"bk-cover-frame bk-cover-" + book.color}>
        <image-slot
          id={"cover-" + book.id}
          shape="rect"
          fit="cover"
          placeholder="Drop cover image"
          class="bk-cover-slot"
        ></image-slot>
        {/* Typographic overlay — always visible behind/around the dropped image */}
        <div className="bk-cover-fallback" aria-hidden="true">
          <span className="bk-cover-type">{book.type}</span>
          <span className="bk-cover-title">{book.title}</span>
          <span className="bk-cover-author">{book.author}</span>
          <span className="bk-cover-meta">
            <span>{book.year}</span>
            <span className="bk-cover-dot">·</span>
            <span>{book.format}</span>
          </span>
        </div>
        <div className="bk-cover-spine-edge" aria-hidden="true"></div>
      </div>
    </div>
  );
}

/* ─── Detail panel (for the shelf section) ────────────────────── */
function ShelfDetail({ book, areaLabel }) {
  if (!book) return null;
  return (
    <article className={"bk-detail bk-detail-" + book.color} key={book.id}>
      <div className="bk-detail-grid">
        <div className="bk-cover-stage">
          <BookCover book={book} size="lg" />
        </div>
        <div className="bk-text">
          <div className="bk-text-tags">
            <span className="bk-tag">{book.type}</span>
            {areaLabel && <span className="bk-tag bk-tag-mute">{areaLabel}</span>}
            {book.featured && <span className="bk-tag bk-tag-feat">★ Featured</span>}
          </div>
          <h3 className="bk-text-title">{book.title}</h3>
          <div className="bk-text-author">{book.author} · <em>{book.year}</em> · {book.format}</div>
          <p className="bk-summary">{book.summary}</p>
          <div className="bk-why">
            <span className="bk-why-label">Why I keep it on the shelf</span>
            <p>{book.why}</p>
          </div>
          {book.url && (
            <a className="bk-link" href={book.url} target="_blank" rel="noopener noreferrer">
              Find this book <span aria-hidden="true">↗</span>
            </a>
          )}
        </div>
      </div>
    </article>
  );
}

/* ─── On-the-web card (browser window style) ──────────────────── */
function WebCard({ book, areaLabel, onClick }) {
  const hostname = book.url ? book.url.replace(/^https?:\/\//, "").replace(/\/.*$/, "") : "";
  return (
    <article className={"web-card web-card-" + book.color}>
      <header className="wc-chrome">
        <span className="wc-dots" aria-hidden="true">
          <span></span><span></span><span></span>
        </span>
        <span className="wc-url">{hostname}</span>
        <span className="wc-type-tag">{book.type}</span>
      </header>
      <div className="wc-screenshot">
        <image-slot
          id={"web-" + book.id}
          shape="rect"
          fit="cover"
          placeholder={book.author + " — drop a screenshot"}
        ></image-slot>
        <div className="wc-screenshot-fallback" aria-hidden="true">
          <span className="wc-fb-type">{book.type}</span>
          <span className="wc-fb-title">{book.title}</span>
          <span className="wc-fb-author">{book.author}</span>
        </div>
      </div>
      <div className="wc-body">
        <div className="wc-meta">
          {areaLabel && <span className="wc-area">{areaLabel}</span>}
          <span className="wc-format">{book.format}</span>
        </div>
        <h4 className="wc-title">{book.title}</h4>
        <p className="wc-summary">{book.summary}</p>
        <div className="wc-why">
          <span className="wc-why-label">Why I keep this tab open</span>
          <p>{book.why}</p>
        </div>
        {book.url && (
          <a className="wc-visit" href={book.url} target="_blank" rel="noopener noreferrer">
            Visit {hostname || "site"} <span aria-hidden="true">↗</span>
          </a>
        )}
      </div>
    </article>
  );
}

/* ─── Featured row (cover-out) ───────────────────────────────── */
function FeaturedRow({ books, activeId, onPick }) {
  if (books.length === 0) return null;
  return (
    <div className="bk-featured">
      <div className="bk-featured-label">
        <span className="bk-featured-dot" aria-hidden="true">★</span>
        Featured picks
      </div>
      <div className="bk-featured-row">
        {books.map(b => (
          <button
            key={b.id}
            className={"bk-feat-card" + (activeId === b.id ? " is-active" : "")}
            onClick={() => onPick(b.id)}
            aria-label={b.title}
          >
            <BookCover book={b} size="sm" />
            <div className="bk-feat-meta">
              <span className="bk-feat-meta-title">{b.title}</span>
              <span className="bk-feat-meta-author">{b.authorShort || b.author}</span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

/* ─── Filter bar ──────────────────────────────────────────────── */
function FilterBar({ areas, areaFilter, setArea, totals }) {
  return (
    <div className="bk-filters">
      <div className="bk-filter-row">
        <span className="bk-filter-label">Area</span>
        <div className="bk-filter-chips">
          <button className={"bk-chip" + (areaFilter === "all" ? " is-active" : "")} onClick={() => setArea("all")}>All</button>
          <button className={"bk-chip" + (areaFilter === "general" ? " is-active" : "")} onClick={() => setArea("general")}>General / foundational</button>
          {areas.map(a => (
            <button
              key={a.id}
              className={"bk-chip" + (areaFilter === a.id ? " is-active" : "")}
              onClick={() => setArea(a.id)}
            >{a.label}</button>
          ))}
        </div>
      </div>
      <div className="bk-filter-count">
        <span><strong>{totals.shelf}</strong> on the shelf</span>
        <span className="bk-count-sep">·</span>
        <span><strong>{totals.web}</strong> on the web</span>
      </div>
    </div>
  );
}

/* ─── Main page ───────────────────────────────────────────────── */
function ReadingPage() {
  const books = window.BOOKS || [];
  const areas = window.AREAS || [];
  const areaMap = useBkM(() => {
    const m = { general: { id: "general", label: "Foundational" } };
    areas.forEach(a => { m[a.id] = a; });
    return m;
  }, [areas]);

  const [areaFilter, setArea] = useBkS("all");

  const filtered = useBkM(() => {
    return books.filter(b => areaFilter === "all" || b.area === areaFilter);
  }, [books, areaFilter]);

  const shelfBooks = useBkM(() => filtered.filter(b => (b.location || "shelf") === "shelf"), [filtered]);
  const webBooks   = useBkM(() => filtered.filter(b => b.location === "web"), [filtered]);
  const featured   = useBkM(() => shelfBooks.filter(b => b.featured).slice(0, 5), [shelfBooks]);

  const [activeId, setActiveId] = useBkS(null);

  useBkE(() => {
    const fallback = featured[0] || shelfBooks[0] || books[0];
    if (!activeId && fallback) setActiveId(fallback.id);
    if (activeId && shelfBooks.length > 0 && !shelfBooks.find(b => b.id === activeId)) {
      setActiveId(shelfBooks[0].id);
    }
  }, [activeId, shelfBooks, featured, books]);

  const activeBook = shelfBooks.find(b => b.id === activeId) || shelfBooks[0];
  const activeArea = activeBook ? areaMap[activeBook.area] : null;

  useBkE(() => {
    const onKey = (e) => {
      if (!activeBook) return;
      if (e.target && ["INPUT", "TEXTAREA"].includes(e.target.tagName)) return;
      const idx = shelfBooks.findIndex(b => b.id === activeBook.id);
      if (e.key === "ArrowLeft" && idx > 0) {
        e.preventDefault();
        setActiveId(shelfBooks[idx - 1].id);
      } else if (e.key === "ArrowRight" && idx < shelfBooks.length - 1) {
        e.preventDefault();
        setActiveId(shelfBooks[idx + 1].id);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [shelfBooks, activeBook]);

  const scrollerRef = useBkR(null);
  const nudge = (dir) => {
    if (!scrollerRef.current) return;
    scrollerRef.current.scrollBy({ left: dir * 380, behavior: "smooth" });
  };

  return (
    <>
      <SectionHead
        id="reading"
        num="♦"
        eyebrow="Reading list"
        title="The books on my shelf, the tabs in my browser"
        sub="Two parts. The shelf — books, papers, and standards I keep within reach. The web — the newsletters, podcasts, and live references I keep open. Click a spine to pick it up; drop your own cover image onto any book or screenshot."
      />
      <section className="reading">
        <div className="wrap">
          <FilterBar
            areas={areas}
            areaFilter={areaFilter} setArea={setArea}
            totals={{ shelf: shelfBooks.length, web: webBooks.length }}
          />

          {/* ━━━━━━━━ ON THE SHELF ━━━━━━━━ */}
          <header className="bk-section-head">
            <span className="bk-section-num">01</span>
            <div>
              <h2>On the shelf</h2>
              <p>Books, standards, and the seminal papers. Hover the spines — the cursor turns into a hand. Click to pick one up.</p>
            </div>
          </header>

          {featured.length > 0 && (
            <FeaturedRow books={featured} activeId={activeBook && activeBook.id} onPick={setActiveId} />
          )}

          <div className="bookcase">
            <button className="bk-nav bk-nav-prev" onClick={() => nudge(-1)} aria-label="Scroll left">‹</button>
            <button className="bk-nav bk-nav-next" onClick={() => nudge(1)} aria-label="Scroll right">›</button>

            <div className="bk-shelf-label">
              <span>The shelf</span>
              <em>Reach for a book</em>
            </div>

            <div className="bk-shelf" ref={scrollerRef}>
              <div className="bk-shelf-inner">
                {shelfBooks.length === 0 && (
                  <div className="bk-empty">No books on the shelf with this filter.</div>
                )}
                {shelfBooks.map((b, i) => (
                  <Spine
                    key={b.id}
                    book={b}
                    idx={i}
                    isActive={activeBook && b.id === activeBook.id}
                    onClick={() => setActiveId(b.id)}
                  />
                ))}
              </div>
              <div className="bk-shelf-board" aria-hidden="true"></div>
              <div className="bk-shelf-shadow" aria-hidden="true"></div>
            </div>

            <div className="bk-keys">
              <kbd>←</kbd><kbd>→</kbd> to browse the shelf · <kbd>↵</kbd> on a spine to open
            </div>
          </div>

          <ShelfDetail book={activeBook} areaLabel={activeArea && activeArea.label} />

          {/* ━━━━━━━━ ON THE WEB ━━━━━━━━ */}
          <header className="bk-section-head bk-section-head-web">
            <span className="bk-section-num">02</span>
            <div>
              <h2>On the web</h2>
              <p>The newsletters, podcasts, blogs, and live references that I check regularly. Click <em>Visit</em> to open; drop a screenshot onto any card to make it yours.</p>
            </div>
          </header>

          <div className="web-grid">
            {webBooks.length === 0 ? (
              <div className="bk-empty">Nothing on the web with this filter.</div>
            ) : (
              webBooks.map(b => (
                <WebCard
                  key={b.id}
                  book={b}
                  areaLabel={areaMap[b.area] && areaMap[b.area].label}
                />
              ))
            )}
          </div>

          <aside className="bk-cta">
            <h3>Missing something?</h3>
            <p>The shelf is curated, not exhaustive. If there's a book, paper, newsletter or podcast I should add, tell me — I'll consider it for the next update.</p>
            <p><a href="./about.html">Get in touch →</a></p>
          </aside>
        </div>
      </section>
    </>
  );
}

Object.assign(window, { ReadingPage });
