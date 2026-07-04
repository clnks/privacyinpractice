/* === Privacy in Practice — Areas landing page ===
   Overview of all six practice areas + comparison grid.
   window.AREAS is loaded from areas.js before this runs. */

const { useState: useAL } = React;

// ── Extra comparison data per area ─────────────────────────────────────────
// Fills in the metrics not stored in areas.js
const AREA_META = {
  dp: {
    entry_salary: "£28k–£42k",
    senior_salary: "£75k–£120k",
    demand: "Very High",
    demand_n: 4,
    time_to_role: "6–12 months",
    core_cert: "BCS Practitioner / CIPP/E",
    regulator: "ICO",
    market_size: 5,
    remote: "Yes",
    balance: "Legal-led",
    entry_bg: "Any background — most accessible entry point in compliance",
    overlaps: ["AI Governance", "Cyber Security"],
    top_employers: "ICO · NHS · Google UK · Lloyds · Deloitte",
  },
  ai: {
    entry_salary: "£32k–£50k",
    senior_salary: "£100k–£160k",
    demand: "Explosive",
    demand_n: 5,
    time_to_role: "9–18 months",
    core_cert: "AIGP (IAPP)",
    regulator: "ICO / DSIT / CMA",
    market_size: 4,
    remote: "Yes",
    balance: "Legal + Technical",
    entry_bg: "Data protection, tech policy, ML engineering, or legal",
    overlaps: ["Data Protection", "Cyber Security"],
    top_employers: "DeepMind · Microsoft · FCA · Darktrace · NHS AI Lab",
  },
  fintech: {
    entry_salary: "£28k–£45k",
    senior_salary: "£80k–£140k",
    demand: "Growing",
    demand_n: 3,
    time_to_role: "6–15 months",
    core_cert: "CISI Certificate / ICA Diploma",
    regulator: "FCA / PSR",
    market_size: 3,
    remote: "Yes",
    balance: "Legal + Commercial",
    entry_bg: "Payments, banking ops, regulatory affairs, or general compliance",
    overlaps: ["Financial Conduct", "AML"],
    top_employers: "Monzo · Wise · Stripe UK · FCA Innovation · Klarna",
  },
  cyber: {
    entry_salary: "£28k–£45k",
    senior_salary: "£90k–£140k",
    demand: "Very High",
    demand_n: 4,
    time_to_role: "6–12 months",
    core_cert: "CompTIA Security+ / CISM",
    regulator: "NCSC / ICO",
    market_size: 5,
    remote: "Yes",
    balance: "Technical-led",
    entry_bg: "IT, networking, system administration, or military/government",
    overlaps: ["Data Protection", "AI Governance"],
    top_employers: "NCSC · BAE Systems · CrowdStrike · Goldman Sachs · NHS",
  },
  conduct: {
    entry_salary: "£27k–£42k",
    senior_salary: "£100k–£175k",
    demand: "Very High",
    demand_n: 4,
    time_to_role: "6–12 months",
    core_cert: "CISI Certificate / ICA Diploma",
    regulator: "FCA / PRA",
    market_size: 5,
    remote: "Hybrid",
    balance: "Legal-led",
    entry_bg: "Financial services, retail banking, investment, law",
    overlaps: ["AML", "FinTech"],
    top_employers: "FCA · Barclays · Schroders · Aviva · Hargreaves Lansdown",
  },
  aml: {
    entry_salary: "£26k–£40k",
    senior_salary: "£90k–£160k+",
    demand: "High",
    demand_n: 3,
    time_to_role: "4–8 months",
    core_cert: "ICA Certificate / ACAMS CAMS",
    regulator: "FCA / NCA",
    market_size: 4,
    remote: "Hybrid",
    balance: "Process-led",
    entry_bg: "Banking operations, fraud analysis, legal, or accounting",
    overlaps: ["Financial Conduct", "FinTech"],
    top_employers: "HSBC · NatWest · Monzo · Revolut · NCA",
  },
  grc: {
    entry_salary: "£28k–£45k",
    senior_salary: "£90k–£175k",
    demand: "Very High",
    demand_n: 4,
    time_to_role: "6–12 months",
    core_cert: "CRISC (ISACA) / CIA (IIA)",
    regulator: "Sector-dependent",
    market_size: 5,
    remote: "Hybrid",
    balance: "Process-led",
    entry_bg: "Internal audit, compliance, risk management, policy, or quality",
    overlaps: ["Data Protection", "AI Governance", "Cyber Security", "Financial Conduct", "AML"],
    top_employers: "Big Four · HSBC · Lloyds · NHS · FCA · BAE Systems",
  },
};

// Demand pill style
const DEMAND_STYLE = {
  "Explosive": { bg: "#4a7c14", color: "#fff" },
  "Very High":  { bg: "#6aab1a", color: "#fff" },
  "High":       { bg: "#c8a200", color: "#fff" },
  "Growing":    { bg: "#5b8fba", color: "#fff" },
};

function Dots({ n, max = 5, color = "var(--accent)" }) {
  return (
    <span className="al-dots" aria-label={n + " of " + max}>
      {Array.from({ length: max }, (_, i) => (
        <span key={i} className={"al-dot" + (i < n ? " is-filled" : "")}
          style={i < n ? { background: color } : {}} />
      ))}
    </span>
  );
}

// ── Hero ──────────────────────────────────────────────────────────────────
function ALHero() {
  return (
    <section className="al-hero">
      <div className="wrap">
        <div className="al-hero-inner">
          <div>
            <span className="eyebrow al-hero-eyebrow">
              <span className="ln"></span>
              Practice areas
              <span className="sparkle" aria-hidden="true"> ✦</span>
            </span>
            <h1 className="al-hero-h1">
              Six disciplines.<br />
              <span className="al-hero-italic">One compliance career.</span>
            </h1>
            <p className="al-hero-lede">
              Data protection, AI governance, AML, financial conduct, cyber security,
              and FinTech regulation — mapped with salary data, employer lists, and a
              comparison grid so you can pick your path.
            </p>
            <a className="al-hero-cta" href="./career.html">
              Career hub by area <span aria-hidden="true">→</span>
            </a>
          </div>
          <div className="al-hero-stats">
            {[
              { n: "6", l: "Practice areas" },
              { n: "30+", l: "Certifications mapped" },
              { n: "Free", l: "Always" },
            ].map((s, i) => (
              <div key={i} className="al-stat">
                <span className="al-stat-n">{s.n}</span>
                <span className="al-stat-l">{s.l}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ── Area cards grid ───────────────────────────────────────────────────────
function ALCards() {
  const areas = (window.AREAS || []);
  return (
    <section className="al-cards-section">
      <div className="wrap">
        <header className="al-section-head reveal">
          <h2>The six areas</h2>
          <p>Each links to a full guide: roadmap, certifications, portfolio artefacts, publications, and FAQ.</p>
        </header>
        <div className="al-cards-grid">
          {areas.map(a => {
            const m = AREA_META[a.id] || {};
            const ds = DEMAND_STYLE[m.demand] || {};
            return (
              <a key={a.id} className={"al-card al-card-" + a.color} href={"./area-" + a.id + ".html"}>
                <div className="al-card-top">
                  <span className="al-card-glyph" aria-hidden="true">{a.glyph}</span>
                  {m.demand && (
                    <span className="al-card-demand" style={{ background: ds.bg, color: ds.color }}>
                      {m.demand}
                    </span>
                  )}
                </div>
                <h3 className="al-card-label">{a.label}</h3>
                <p className="al-card-kicker">{a.kicker}</p>
                <p className="al-card-blurb">{a.oneliner}</p>
                <div className="al-card-foot">
                  <div className="al-card-salary">
                    <span className="al-card-salary-l">Entry</span>
                    <span className="al-card-salary-n">{m.entry_salary || "—"}</span>
                  </div>
                  <span className="al-card-arr" aria-hidden="true">→</span>
                </div>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// ── Comparison table ──────────────────────────────────────────────────────
const COMPARE_ROWS = [
  { key: "entry_salary",  label: "Entry salary",        render: (m) => <strong>{m.entry_salary}</strong> },
  { key: "senior_salary", label: "Senior salary",       render: (m) => <strong>{m.senior_salary}</strong> },
  { key: "demand",        label: "Demand",              render: (m) => {
    const ds = DEMAND_STYLE[m.demand] || {};
    return <span className="ct-pill" style={{ background: ds.bg, color: ds.color }}>{m.demand}</span>;
  }},
  { key: "market_size",   label: "Job market size",     render: (m) => <Dots n={m.market_size} color="var(--accent)" /> },
  { key: "time_to_role",  label: "Time to first role",  render: (m) => m.time_to_role },
  { key: "core_cert",     label: "Core certification",  render: (m) => <span className="ct-cert">{m.core_cert}</span> },
  { key: "regulator",     label: "Key regulator",       render: (m) => <span className="ct-reg">{m.regulator}</span> },
  { key: "remote",        label: "Remote-friendly",     render: (m) => (
    <span className={"ct-remote " + (m.remote === "Yes" ? "ct-yes" : m.remote === "Hybrid" ? "ct-hybrid" : "ct-no")}>
      {m.remote}
    </span>
  )},
  { key: "balance",       label: "Skill balance",       render: (m) => m.balance },
  { key: "overlaps",      label: "Overlaps with",       render: (m) => (m.overlaps || []).join(", ") },
  { key: "top_employers", label: "Top employers",       render: (m) => <span className="ct-employers">{m.top_employers}</span> },
];

function ALCompare() {
  const areas = (window.AREAS || []);
  const [highlight, setHighlight] = useAL(null);

  return (
    <section className="al-compare-section">
      <div className="wrap">
        <header className="al-section-head reveal">
          <h2>Side-by-side comparison</h2>
          <p>Real data across all six areas. Hover a column to highlight.</p>
        </header>
        <div className="al-compare-scroll">
          <div className="al-compare-table">
            {/* Header row */}
            <div className="ct-row ct-header">
              <div className="ct-label-cell ct-header-label">Metric</div>
              {areas.map(a => (
                <div
                  key={a.id}
                  className={"ct-col-head ct-col-" + a.color + (highlight === a.id ? " is-hi" : "")}
                  onMouseEnter={() => setHighlight(a.id)}
                  onMouseLeave={() => setHighlight(null)}
                >
                  <span className="ct-col-glyph" aria-hidden="true">{a.glyph}</span>
                  <a href={"./area-" + a.id + ".html"} className="ct-col-link">{a.label}</a>
                </div>
              ))}
            </div>

            {/* Data rows */}
            {COMPARE_ROWS.map((row, ri) => (
              <div key={row.key} className={"ct-row" + (ri % 2 === 0 ? " ct-row-alt" : "")}>
                <div className="ct-label-cell">{row.label}</div>
                {areas.map(a => {
                  const m = AREA_META[a.id] || {};
                  return (
                    <div
                      key={a.id}
                      className={"ct-cell" + (highlight === a.id ? " is-hi" : "")}
                      onMouseEnter={() => setHighlight(a.id)}
                      onMouseLeave={() => setHighlight(null)}
                    >
                      {row.render(m)}
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        </div>
        <p className="al-compare-note">Salary ranges sourced from IAPP UK Salary Survey, Reed, LinkedIn, and recruiter data (2024–26). London typically adds 10–25%.</p>
      </div>
    </section>
  );
}

// ── "Which area fits you?" profiles ──────────────────────────────────────
const PROFILES = [
  {
    icon: "⚖",
    title: "Legal or paralegal background",
    desc: "You're comfortable interpreting legislation, drafting documents, and advising on risk.",
    areas: ["dp", "conduct"],
    note: "Data protection and financial conduct are both primarily legal disciplines. Your research and document-drafting skills transfer directly — and quickly.",
  },
  {
    icon: "💻",
    title: "IT or engineering background",
    desc: "You understand technical systems, architecture, and how software actually works.",
    areas: ["cyber", "ai"],
    note: "Your technical literacy is a rare advantage. Most compliance candidates lack it — in cyber GRC and AI governance it's the differentiator that commands premium salaries.",
  },
  {
    icon: "🏦",
    title: "Banking or financial services",
    desc: "You've worked in or around regulated financial firms — operations, product, or front office.",
    areas: ["aml", "conduct", "fintech"],
    note: "Your sector knowledge is a head start. All three areas require a genuine understanding of how financial services work in practice — most compliance candidates read it from a textbook.",
  },
  {
    icon: "📋",
    title: "HR or operations background",
    desc: "You're strong on policies, processes, and managing risk across a business.",
    areas: ["dp"],
    note: "Data protection is the natural first step — HR professionals encounter it constantly (DSARs, employee data, third-party processors). Your operational rigour is directly applicable.",
  },
  {
    icon: "🏛",
    title: "Policy, civil service, or public sector",
    desc: "You understand regulatory intent, consultation processes, and stakeholder management.",
    areas: ["dp", "ai"],
    note: "Your grasp of how regulation is made and implemented is directly applicable to both DP and AI governance — particularly in the regulator-facing or policy advisory track.",
  },
  {
    icon: "↗",
    title: "Complete career change",
    desc: "No compliance background yet. Starting from scratch and looking for the clearest path in.",
    areas: ["dp"],
    note: "Data protection is the most accessible entry point. Free ICO courses, affordable certifications (BCS Practitioner ~£300), and roles exist in every sector — you don't need to already be in financial services.",
  },
];

function ALProfiles() {
  const areas = (window.AREAS || []);
  const getArea = (id) => areas.find(a => a.id === id) || { label: id, glyph: "·" };

  return (
    <section className="al-profiles-section">
      <div className="wrap">
        <header className="al-section-head reveal">
          <h2>Which area fits your background?</h2>
          <p>Six starting profiles with honest guidance on where to focus first.</p>
        </header>
        <div className="al-profiles-grid">
          {PROFILES.map((p, i) => (
            <article key={i} className="al-profile reveal">
              <div className="alp-icon" aria-hidden="true">{p.icon}</div>
              <h3 className="alp-title">{p.title}</h3>
              <p className="alp-desc">{p.desc}</p>
              <div className="alp-areas">
                {p.areas.map(id => {
                  const a = getArea(id);
                  return (
                    <a key={id} href={"./area-" + id + ".html"} className={"alp-area-chip alp-chip-" + id}>
                      <span className="alp-chip-glyph" aria-hidden="true">{a.glyph}</span>
                      {a.label}
                    </a>
                  );
                })}
              </div>
              <p className="alp-note">{p.note}</p>
              <a href={"./career.html"} className="alp-career-link">
                View {p.areas.length > 1 ? "these" : "this"} area{p.areas.length > 1 ? "s'" : "'s"} career guide →
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── Overlap map ────────────────────────────────────────────────────────────
const OVERLAPS = [
  { pair: ["Data Protection", "AI Governance"], skills: "Art. 22 GDPR, DPIA methodology, data governance, privacy by design" },
  { pair: ["Data Protection", "Cyber Security"], skills: "Breach response, security principle (Art. 5(1)(f)), ISMS, supplier risk" },
  { pair: ["AML", "Financial Conduct"], skills: "FCA regulation, customer due diligence, regulated firm obligations" },
  { pair: ["Financial Conduct", "FinTech"], skills: "FCA Handbook (COBS, SYSC), Consumer Duty, payment services" },
  { pair: ["AI Governance", "Cyber Security"], skills: "Technical risk assessment, model risk, system security in AI pipelines" },
  { pair: ["AML", "FinTech"], skills: "Payments compliance, crypto regulation, safeguarding, PSRs 2017" },
];

function ALOverlaps() {
  return (
    <section className="al-overlaps-section">
      <div className="wrap">
        <header className="al-section-head reveal">
          <h2>Where the areas overlap</h2>
          <p>Skills transfer across disciplines — specialising in one builds credibility in adjacent areas.</p>
        </header>
        <div className="al-overlaps-grid">
          {OVERLAPS.map((o, i) => (
            <article key={i} className="al-overlap reveal">
              <div className="alo-pair">
                <span className="alo-area">{o.pair[0]}</span>
                <span className="alo-plus" aria-hidden="true">↔</span>
                <span className="alo-area">{o.pair[1]}</span>
              </div>
              <p className="alo-skills">{o.skills}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── CTA strip ─────────────────────────────────────────────────────────────
function ALCTA() {
  return (
    <section className="al-cta-section">
      <div className="wrap">
        <div className="al-cta-grid">
          <div className="al-cta-card">
            <span className="al-cta-glyph" aria-hidden="true">◈</span>
            <h3>Career hub</h3>
            <p>CV checklist, interview Q-bank, salary benchmarks, employers, and networking — filtered by discipline.</p>
            <a href="./career.html" className="al-cta-btn">Go to career hub →</a>
          </div>
          <div className="al-cta-card">
            <span className="al-cta-glyph" aria-hidden="true">✦</span>
            <h3>Study cards</h3>
            <p>Flash cards and spaced repetition across the key concepts for each area.</p>
            <a href="./study.html" className="al-cta-btn">Start studying →</a>
          </div>
          <div className="al-cta-card">
            <span className="al-cta-glyph" aria-hidden="true">§</span>
            <h3>The roadmap</h3>
            <p>Sixteen phases, four tracks — the structured path from zero to practitioner.</p>
            <a href="./roadmap.html" className="al-cta-btn">View roadmap →</a>
          </div>
        </div>
      </div>
    </section>
  );
}

// ── Page root ─────────────────────────────────────────────────────────────
function AreasLandingPage() {
  return (
    <>
      <ALHero />
      <ALCards />
      <ALCompare />
      <ALProfiles />
      <ALOverlaps />
      <ALCTA />
    </>
  );
}

Object.assign(window, { AreasLandingPage });
