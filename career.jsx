/* === Privacy in Practice — Career hub ===
   Content lives at the top of this file so it's easy to add to.
   Add new sections by editing the CAREER constant. */

const CAREER = {
  intro:
    "Everything I'm assembling to land the role: CV checks, interview Q-bank, STAR prep, mock prompts, portfolio templates, salary ladders, UK employers, and the communities worth showing up in. Built in the open as I go.",
  sections: [
    {
      id: "cv",
      label: "CV checklist",
      kicker: "Get past the screen",
      blurb: "A one-page DP-flavoured CV is enough for most UK roles. Use this as a self-review pass before you submit.",
      kind: "checklist",
      groups: [
        {
          head: "Headline & summary",
          items: [
            "Job title at the top reflects the role you're applying for (DPO, Data Protection Analyst, Privacy Manager), not a generic 'Compliance Professional'.",
            "Three-line summary names a specific framework (UK GDPR, ISO 27701) and a measurable artefact (DPIA, ROPA, breach playbook).",
            "If you're newly transitioning, the headline says so honestly — 'transitioning into data protection from [X]' — and leans on transferable evidence.",
          ],
        },
        {
          head: "Experience entries",
          items: [
            "Each bullet starts with a verb (drafted, embedded, audited, led, advised).",
            "Each bullet contains a NUMBER — records reviewed, days saved, DSARs closed, jurisdictions covered. If it doesn't, ask whether it should.",
            "Tooling named explicitly: OneTrust, TrustArc, Microsoft Purview, ServiceNow, Securiti — whichever you've actually used.",
            "ICO terminology used precisely: 'controller' / 'processor', 'Article 6(1)(f)', 'special category data'. Avoid 'GDPR data'.",
          ],
        },
        {
          head: "Certifications & study",
          items: [
            "Certs listed in order of relevance to the role (CIPP/E or BCS Practitioner for legal-led; CIPM for operational; AIGP for AI-led; CIPT for engineering-adjacent).",
            "In-progress certs labelled '(expected MMM YYYY)' — not just 'in progress' with no end date.",
            "Free credentials worth a line: ICO 'Introduction to Data Protection', OpenSAFELY/EDPS courses, ENISA materials.",
          ],
        },
        {
          head: "Portfolio link",
          items: [
            "Single, working URL at the top of the CV (github.io page or LinkedIn featured section).",
            "Portfolio actually loads on mobile.",
            "Link goes directly to artefacts (DSAR template, DPIA, breach playbook) — not a landing page that hides them three clicks deep.",
          ],
        },
        {
          head: "Formatting & ATS",
          items: [
            "One page if <8 years' experience, two pages otherwise. No exceptions.",
            "No tables, no text boxes, no columns — ATS readers mangle them. Plain left-aligned text.",
            "Saved as PDF with selectable text (not an image export). Filename: Firstname-Lastname-CV.pdf.",
            "Reverse chronological. Most recent role first.",
          ],
        },
      ],
    },

    {
      id: "cover",
      label: "Cover letter",
      kicker: "Three paragraphs is plenty",
      blurb: "A working template you can fork. Replace the bracketed bits; keep the structure.",
      kind: "template",
      blocks: [
        {
          head: "Opening",
          body: "Dear [Hiring Manager],\n\nI'm writing about the [exact role title] position advertised on [where]. I'm a [current role / transitioning practitioner] with hands-on experience of [the single thing in the JD that matches you best], and I'd like to bring that to [organisation], particularly to your work on [the specific programme/team/initiative you researched].",
        },
        {
          head: "The proof paragraph",
          body: "In my current role at [employer], I [led / drafted / embedded] [the artefact — DPIA, ROPA, breach playbook]. The work [reduced / shortened / unblocked] [the measurable outcome]. The aspect of your role I'm most prepared for is [pick the single biggest item from the JD] — because [one concrete sentence of evidence].",
        },
        {
          head: "The gap-acknowledgement paragraph (optional)",
          body: "I don't yet have [the one thing the JD asks for that you lack]. To close that, I am [currently doing — CIPP/E, BCS Practitioner, building a portfolio artefact]. I would expect to be competent in this within [realistic timeframe].",
        },
        {
          head: "Closing",
          body: "I've attached my CV and a link to my portfolio (privacyinpractice.com — built as I learn). I'd welcome the chance to discuss the role.\n\nKind regards,\n[Your name]",
        },
      ],
      notes: [
        "Read it back as if you were the hiring manager. Cut anything generic.",
        "Don't open with 'I am passionate about data protection.' Everyone says it.",
        "If you can't name a specific programme/team/initiative at the org, you haven't done enough research yet.",
      ],
    },

    {
      id: "questions",
      label: "Interview Q-bank",
      kicker: "Common UK DP interview questions",
      blurb: "What actually comes up. Sample answer is the SHAPE of a strong response — not a script. Make it yours.",
      kind: "qa",
      items: [
        {
          q: "Walk me through what happens when a personal data breach is discovered.",
          a: "I'd contain first — stop the bleeding (revoke access, take a system offline). Then assess: confirm personal data is in scope, identify categories of subjects and records, work out the likely risk to rights and freedoms. The 72-hour ICO clock starts at AWARENESS, not at incident time. If risk is unlikely, document the decision and don't notify. If notification is required, get it in within 72 hours, even if incomplete. Flag whether the risk to individuals is HIGH — that's the trigger for telling them. Log everything in the breach register either way.",
        },
        {
          q: "How do you handle a DSAR from a current employee who's clearly building a grievance file?",
          a: "It's still a valid request. Process it. Acknowledge within a few days, verify identity if needed, scope the search — and don't let the requester's motive change my work. The legitimate concern is third-party data in HR records: redact carefully, applying the reasonableness test for each disclosure. Watch for legal privilege material from employment counsel — that's exempt. If the request is genuinely unreasonable (repetitive, malicious in tone, harassment), document that and consider whether 'manifestly unfounded' applies — but the bar is high.",
        },
        {
          q: "A product team wants to use a new third-party AI vendor. What's your process?",
          a: "Three parallel questions: (1) Is this likely high-risk processing? If yes, DPIA before deployment, not after. (2) What's the role split — controller, processor, joint controllers? Article 28 contract needs to match. (3) Where is the data going? International transfer mechanism (IDTA, SCCs with TIA). For AI specifically: training-data lineage, model outputs as personal data, Article 22 if there are solely-automated significant decisions, EU AI Act risk class if relevant. Bring legal and security in early — don't try to own this alone.",
        },
        {
          q: "Tell me about a time you had to push back on a senior stakeholder.",
          a: "STAR format. Situation: a marketing team wanted to repurpose customer support transcripts for product training. Task: assess and either approve or block. Action: ran a quick LIA — there was a legitimate interest in product improvement, but the balancing test failed (customers gave that data for support, not training, no notice given, no opt-out). Took it to the head of marketing with one slide: what the risk was, what would make it OK (refresh notices, opt-out flow, retention cap), what wouldn't (proceeding now). Result: they delayed by six weeks to implement the safeguards, and the ICO position was defensible.",
        },
        {
          q: "What's the difference between Article 6 and Article 9?",
          a: "Article 6 is the six lawful bases — at least one must apply to any processing of personal data. Article 9 is the prohibition on processing special category data, with ten specific conditions that lift the prohibition. The two-key rule: for special category data you need an Article 6 lawful basis AND an Article 9 condition. They're not alternatives.",
        },
        {
          q: "How would you set up a privacy programme from scratch?",
          a: "Six things in the first 90 days, roughly in order: (1) Inventory — where is personal data, who owns it, who processes it? Start a ROPA, even rough. (2) Lawful basis register tied to it. (3) DSAR process — write it down, name a rota, set SLAs. (4) Breach playbook — who calls who, decision tree, ICO template ready. (5) DPIA gate — wire it into the change/intake process. (6) Training — pick the top three risk areas and run a session. After that, iterate on policies, vendor due diligence, and metrics.",
        },
        {
          q: "Why data protection? Why now?",
          a: "Answer for yourself. The strong shape: a specific moment or piece of work that crystallised the interest, a current trajectory that's already underway (study, portfolio, certifications), and an honest read on where this field is going (AI governance, transfers post-Schrems II, ICO's enforcement pivot). Avoid 'I'm passionate about privacy' as the opener.",
        },
        {
          q: "What do you think of the ICO's current enforcement priorities?",
          a: "Look up the latest plan before the interview — the ICO publishes one. Recent themes: children's data, AI, employee monitoring, cookie consent enforcement, public-sector accountability. Name TWO specific actions you've read about and what you took from them. Avoid generic 'fines are getting bigger'.",
        },
      ],
    },

    {
      id: "star",
      label: "STAR prep",
      kicker: "Behavioural answers, structured",
      blurb: "Pre-write four STAR stories before the interview — one per common theme. Pull from work, study, or volunteer experience.",
      kind: "star",
      themes: [
        {
          theme: "Pushing back on a stakeholder",
          prompt: "Tell me about a time you had to deliver an unwelcome message to someone senior.",
          fields: ["Situation (one sentence — what, when, who)", "Task (your specific responsibility)", "Action (the 2–3 things YOU did — not the team)", "Result (measurable outcome + what you'd do differently)"],
        },
        {
          theme: "Working with ambiguity",
          prompt: "Describe a time you had to make a decision without clear guidance.",
          fields: ["Situation", "Task", "Action", "Result"],
        },
        {
          theme: "Cross-functional collaboration",
          prompt: "Tell me about a time you worked with engineering, legal, or product to solve a privacy problem.",
          fields: ["Situation", "Task", "Action", "Result"],
        },
        {
          theme: "Learning something fast",
          prompt: "Describe a time you had to get up to speed on an unfamiliar regulation or technology quickly.",
          fields: ["Situation", "Task", "Action", "Result"],
        },
      ],
    },

    {
      id: "mocks",
      label: "Mock interview prompts",
      kicker: "Practice cold",
      blurb: "Set a timer for 45 minutes. Answer aloud. Record yourself if you can stand to listen back.",
      kind: "list",
      groups: [
        {
          head: "Scenario prompts (10–15 mins each)",
          items: [
            "A processor reports a breach to you 5 days after they became aware. What's your call?",
            "Marketing want to send a re-engagement email to lapsed customers from 2019. Talk me through your analysis.",
            "An employee has been receiving threatening messages from a colleague through Teams. HR want the chat logs. Walk me through the request.",
            "Your CEO wants to deploy a generative AI tool internally next month. What questions do you need answered before you sign off?",
            "A subject sends a DSAR demanding all CCTV footage of them across 47 sites for the last 12 months. What do you actually do?",
            "Sales pipeline data is being copied to a sandbox for an external consultant to 'have a look'. You find out on day 3. Next steps?",
          ],
        },
        {
          head: "Knowledge prompts (5 mins each)",
          items: [
            "Explain the difference between a controller and a processor with a real-world example.",
            "What's a TIA and when do you need one?",
            "When is a DPIA legally mandatory?",
            "Walk me through the 6 lawful bases and when each fits best.",
            "What's the relationship between UK GDPR and the DPA 2018?",
            "What does Article 22 actually prohibit?",
          ],
        },
        {
          head: "Soft prompts (5 mins each)",
          items: [
            "Why are you leaving your current role?",
            "What's the worst piece of advice you've received about this field?",
            "Tell me about a time you were wrong about a compliance question.",
            "Where do you want to be in 3 years?",
          ],
        },
      ],
    },

    {
      id: "portfolio",
      label: "Portfolio artefacts",
      kicker: "Show the work, don't talk about it",
      blurb: "A DP portfolio is documentation — the same artefacts you'd produce in a real role. Aim for 4–6 strong pieces, not 20 thin ones.",
      kind: "templates",
      items: [
        {
          name: "DSAR template + handling guide",
          purpose: "Demonstrates you understand the full lifecycle: receipt, ID verification, scope, search, third-party redaction, response.",
          contents: "Cover letter template · ID verification request · scope confirmation · redaction matrix · response letter · log entry template",
        },
        {
          name: "DPIA (worked example)",
          purpose: "Pick a hypothetical (employee monitoring tool, customer-facing chatbot, biometric access system). Run a full Article 35-compliant DPIA on it.",
          contents: "Description of processing · necessity & proportionality · risk register · mitigations · residual-risk position · review schedule",
        },
        {
          name: "Breach playbook",
          purpose: "Shows decision-making under pressure. The artefact a hiring manager will assume you've got.",
          contents: "Awareness trigger · containment steps · severity assessment · 72-hour ICO template · individual-notification template · post-incident review",
        },
        {
          name: "ROPA (one division)",
          purpose: "Article 30 records — controller and processor versions for a single team or product line.",
          contents: "Processing activity · purposes · categories of subjects · categories of data · recipients · international transfers · retention · security",
        },
        {
          name: "Privacy notice rewrite",
          purpose: "Take a real public privacy notice, identify what's wrong with it (verbosity, missing rights, vague basis claims), and post a side-by-side rewrite.",
          contents: "Annotated original · rewritten version · short commentary on the changes and why",
        },
        {
          name: "ICO enforcement case study (×3)",
          purpose: "Shows you read the source material. Pick three decisions; for each, summarise what happened, what went wrong, and what should have happened.",
          contents: "Facts · breach of which article(s) · ICO finding · fine/sanction · what the org should have done differently",
        },
        {
          name: "AI/LLM privacy review",
          purpose: "Demonstrate AI Act + GDPR thinking. Pick a use case (RAG over customer support tickets, AI hiring screen) and write the review you'd present to leadership.",
          contents: "Use case · data flow · lawful basis · Article 22 analysis · AI Act risk class · safeguards · go/no-go recommendation",
        },
      ],
    },

    {
      id: "salary",
      label: "Roles & salary ladder (UK)",
      kicker: "Rough ranges, London-weighted",
      blurb: "Sanity-check numbers from Reed, IAPP UK Salary Survey, LinkedIn, and recruiter conversations (2024–25). London adds 10–25%. Public sector pays 20–30% less than private but is much steadier.",
      kind: "ladder",
      rows: [
        { role: "Data Protection Analyst / Officer (entry)",  exp: "0–2 yrs", range: "£28k–£42k", note: "Often the first DP-titled role. CIPP/E or BCS Practitioner expected within year 1." },
        { role: "Data Protection Manager",                    exp: "3–6 yrs", range: "£45k–£65k", note: "Owns the programme day-to-day. Usually reports to a DPO or Head of Compliance." },
        { role: "Senior DP Manager / Lead",                   exp: "5–8 yrs", range: "£60k–£85k", note: "Cross-jurisdictional, complex DPIAs, board-facing on incidents." },
        { role: "DPO (mandatory or designated)",              exp: "6–10 yrs", range: "£75k–£120k", note: "Statutory role for many orgs. Independence requirements matter; not a reporting line under legal." },
        { role: "Head of Privacy / Group DPO",                exp: "8–12 yrs", range: "£100k–£160k+", note: "Multi-entity, multi-jurisdiction. Often paired with CISO or General Counsel reporting." },
        { role: "AI Governance Lead / Privacy Engineer",      exp: "varies",   range: "£70k–£140k", note: "Hybrid role — sits between privacy, security, and ML. Often pays above DPO at the same level of seniority." },
      ],
    },

    {
      id: "employers",
      label: "UK employers worth tracking",
      kicker: "Where the roles actually are",
      blurb: "Not exhaustive — orgs that consistently advertise DP/privacy roles or have well-known DP teams. Set LinkedIn alerts on the careers pages.",
      kind: "employers",
      groups: [
        {
          head: "Regulators & public bodies",
          items: ["ICO (Wilmslow)", "Bank of England", "FCA", "MHRA", "Ofcom", "NHS Digital / NHS England", "Cabinet Office (CDDO)", "HMRC", "DWP", "GDS"],
        },
        {
          head: "Financial services",
          items: ["Lloyds Banking Group", "HSBC", "NatWest", "Barclays", "Monzo", "Starling", "Revolut", "Wise", "Aviva", "Legal & General"],
        },
        {
          head: "Tech & platforms",
          items: ["DeepMind / Google UK", "Microsoft UK", "Meta UK (Dublin DPO function)", "Amazon UK", "Booking.com UK", "Spotify UK", "Cloudflare UK", "Stripe UK", "Wise", "Octopus Energy"],
        },
        {
          head: "Health, life sciences & charities",
          items: ["GSK", "AstraZeneca", "Wellcome Trust", "Cancer Research UK", "British Red Cross", "RNID", "Macmillan", "Genomics England"],
        },
        {
          head: "Consultancies",
          items: ["Bird & Bird", "DLA Piper", "Linklaters", "Hogan Lovells", "Fieldfisher", "PwC", "Deloitte", "KPMG", "EY", "OneTrust (DataGuidance)"],
        },
      ],
    },

    {
      id: "network",
      label: "Networking & communities",
      kicker: "Show up, then keep showing up",
      blurb: "The DP community in the UK is small and welcoming. Three months of consistent presence in one of these is worth more than ten CV applications.",
      kind: "network",
      items: [
        { name: "IAPP KnowledgeNet — London chapter",        kind: "In-person",  cost: "Free with IAPP membership", note: "Quarterly meetups in central London. Mix of in-house DPOs, lawyers, and tech privacy people. Bring questions, not a pitch." },
        { name: "Data Protection Network (DPN)",             kind: "Online",     cost: "Free",                     note: "UK-focused newsletter and forum. Excellent for staying current on ICO + tribunal decisions." },
        { name: "PrivSec — Global Privacy & Security",       kind: "Conference", cost: "Paid (free passes exist)", note: "Annual London event. Worth attending one to map who's who in UK privacy." },
        { name: "LinkedIn — UK DP community",                 kind: "Online",     cost: "Free",                     note: "Follow Robert Bateman, Carey Lening, Jon Baines, Tim Turner, Estelle Massé. Comment thoughtfully; don't lurk." },
        { name: "ICO Webinars & SME briefings",              kind: "Online",     cost: "Free",                     note: "Recordings on ICO YouTube. Useful for understanding the regulator's current line on a topic." },
        { name: "GDPR Hub editor community",                  kind: "Contribute", cost: "Free",                     note: "Write a case summary; gets your name on the byline of a respected resource. Visible to the EU community too." },
        { name: "Local DPO meetups (regional)",              kind: "In-person",  cost: "Usually free",             note: "Bristol, Manchester, Edinburgh, Belfast all have small recurring meetups. Search Eventbrite + Meetup." },
        { name: "r/gdpr (Reddit)",                            kind: "Online",     cost: "Free",                     note: "Mixed quality but useful for spotting questions practitioners actually have. Less polished than IAPP discussion." },
      ],
    },
  ],
};

// ───────── Sub-renderers per kind ─────────
function CareerChecklist({ s }) {
  const [done, setDone] = useS(() => {
    try { return JSON.parse(localStorage.getItem("pip.cv." + s.id) || "{}"); }
    catch (e) { return {}; }
  });
  const toggle = (k) => {
    setDone(d => {
      const n = { ...d, [k]: !d[k] };
      try { localStorage.setItem("pip.cv." + s.id, JSON.stringify(n)); } catch (e) {}
      return n;
    });
  };
  return (
    <div className="cv-checklist">
      {s.groups.map((g, gi) => (
        <div key={gi} className="cvg">
          <h4 className="cvg-head">{g.head}</h4>
          <ul>
            {g.items.map((it, i) => {
              const key = gi + ":" + i;
              return (
                <li key={key} className={done[key] ? "is-done" : ""}>
                  <label>
                    <input type="checkbox" checked={!!done[key]} onChange={() => toggle(key)} />
                    <span className="cv-box" aria-hidden="true"></span>
                    <span className="cv-text">{it}</span>
                  </label>
                </li>
              );
            })}
          </ul>
        </div>
      ))}
    </div>
  );
}

function CareerTemplate({ s }) {
  const copy = async (txt) => {
    try { await navigator.clipboard.writeText(txt); } catch (e) {}
  };
  return (
    <div className="cv-template">
      <div className="ct-stack">
        {s.blocks.map((b, i) => (
          <div key={i} className="ct-block">
            <div className="ct-head">
              <h4>{b.head}</h4>
              <button className="ct-copy" onClick={() => copy(b.body)}>Copy</button>
            </div>
            <pre className="ct-body">{b.body}</pre>
          </div>
        ))}
      </div>
      {s.notes && s.notes.length > 0 && (
        <aside className="ct-notes">
          <h5>Notes</h5>
          <ul>{s.notes.map((n, i) => <li key={i}>{n}</li>)}</ul>
        </aside>
      )}
    </div>
  );
}

function CareerQA({ s }) {
  const [open, setOpen] = useS({});
  return (
    <div className="cv-qa">
      {s.items.map((it, i) => (
        <article key={i} className={"qa-item" + (open[i] ? " is-open" : "")}>
          <button className="qa-q" onClick={() => setOpen(o => ({ ...o, [i]: !o[i] }))}>
            <span className="qa-num">Q{i + 1}</span>
            <span className="qa-text">{it.q}</span>
            <span className="qa-chev">{open[i] ? "−" : "+"}</span>
          </button>
          {open[i] && (
            <div className="qa-a">
              <div className="qa-a-label">Sample shape of a strong answer</div>
              <p>{it.a}</p>
            </div>
          )}
        </article>
      ))}
    </div>
  );
}

function CareerStar({ s }) {
  return (
    <div className="cv-star">
      {s.themes.map((th, i) => (
        <article key={i} className="star-card">
          <div className="star-head">
            <span className="star-i">{String(i + 1).padStart(2, "0")}</span>
            <div>
              <h4>{th.theme}</h4>
              <p className="star-prompt">"{th.prompt}"</p>
            </div>
          </div>
          <div className="star-grid">
            {th.fields.map((f, j) => (
              <div key={j} className="star-field">
                <div className="star-field-l">{f.split(" ")[0]}</div>
                <div className="star-field-sub">{f.replace(/^[^\s]+\s*/, "")}</div>
                <div className="star-line"></div>
                <div className="star-line"></div>
                <div className="star-line"></div>
              </div>
            ))}
          </div>
        </article>
      ))}
    </div>
  );
}

function CareerList({ s }) {
  return (
    <div className="cv-list">
      {s.groups.map((g, i) => (
        <div key={i} className="cvl-group">
          <h4>{g.head}</h4>
          <ol>
            {g.items.map((it, j) => <li key={j}>{it}</li>)}
          </ol>
        </div>
      ))}
    </div>
  );
}

function CareerTemplates({ s }) {
  return (
    <div className="cv-portfolio">
      {s.items.map((it, i) => (
        <article key={i} className="pf-card">
          <header>
            <span className="pf-i">{String(i + 1).padStart(2, "0")}</span>
            <h4>{it.name}</h4>
          </header>
          <p className="pf-purpose">{it.purpose}</p>
          <div className="pf-contents">
            <span className="pf-label">Should contain</span>
            <p>{it.contents}</p>
          </div>
        </article>
      ))}
    </div>
  );
}

function CareerLadder({ s }) {
  return (
    <div className="cv-ladder">
      <div className="ladder-head">
        <span>Role</span><span>Years</span><span>Range</span><span>Notes</span>
      </div>
      {s.rows.map((r, i) => (
        <div key={i} className="ladder-row">
          <span className="lr-role">{r.role}</span>
          <span className="lr-exp">{r.exp}</span>
          <span className="lr-range">{r.range}</span>
          <span className="lr-note">{r.note}</span>
        </div>
      ))}
    </div>
  );
}

function CareerEmployers({ s }) {
  return (
    <div className="cv-employers">
      {s.groups.map((g, i) => (
        <div key={i} className="emp-group">
          <h4>{g.head}</h4>
          <ul className="emp-list">
            {g.items.map((it, j) => <li key={j}>{it}</li>)}
          </ul>
        </div>
      ))}
    </div>
  );
}

function CareerNetwork({ s }) {
  return (
    <div className="cv-network">
      {s.items.map((it, i) => (
        <article key={i} className="net-item">
          <div className="net-head">
            <h4>{it.name}</h4>
            <div className="net-meta">
              <span className="net-kind">{it.kind}</span>
              <span className="net-cost">{it.cost}</span>
            </div>
          </div>
          <p>{it.note}</p>
        </article>
      ))}
    </div>
  );
}

const KIND_MAP = {
  checklist: CareerChecklist,
  template:  CareerTemplate,
  qa:        CareerQA,
  star:      CareerStar,
  list:      CareerList,
  templates: CareerTemplates,
  ladder:    CareerLadder,
  employers: CareerEmployers,
  network:   CareerNetwork,
};

// ───────── Career page wrapper ─────────
function Career() {
  const [active, setActive] = useS(CAREER.sections[0].id);

  useE(() => {
    const ids = CAREER.sections.map(s => s.id);
    const onScroll = () => {
      let cur = ids[0];
      for (const id of ids) {
        const el = document.getElementById("c-" + id);
        if (!el) continue;
        const top = el.getBoundingClientRect().top;
        if (top < 200) cur = id;
      }
      setActive(cur);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <SectionHead
        id="career"
        num="VI."
        eyebrow="Career"
        title="Land the role"
        sub={CAREER.intro}
      />
      <section className="career">
        <div className="wrap career-wrap">
          <aside className="career-toc" aria-label="Career sections">
            <div className="toc-label">In this section</div>
            <ol>
              {CAREER.sections.map(s => (
                <li key={s.id} className={active === s.id ? "is-active" : ""}>
                  <a href={"#c-" + s.id}>
                    <span className="toc-kicker">{s.kicker}</span>
                    <span className="toc-label-l">{s.label}</span>
                  </a>
                </li>
              ))}
            </ol>
          </aside>

          <div className="career-body">
            {CAREER.sections.map((s, i) => {
              const Comp = KIND_MAP[s.kind];
              return (
                <section key={s.id} id={"c-" + s.id} className="csec">
                  <header className="csec-head">
                    <span className="csec-i">{String(i + 1).padStart(2, "0")}</span>
                    <div>
                      <span className="csec-kicker">{s.kicker}</span>
                      <h3>{s.label}</h3>
                      <p>{s.blurb}</p>
                    </div>
                  </header>
                  <div className="csec-body">
                    {Comp ? <Comp s={s} /> : <p>—</p>}
                  </div>
                </section>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}

Object.assign(window, { Career });
