/* === Privacy in Practice — practice areas ===
   Six compliance/governance areas. Each follows the same shape so the
   shared template (area.jsx) renders them uniformly.

   Add new areas by appending to AREAS. Keep IDs stable — they're used as
   file names (area-<id>.html) and saved into localStorage for progress.
   Display order is alphabetical by label (sorted below). */

window.AREAS = [
  /* ─── 1. Data Protection / Privacy ──────────────────────────── */
  {
    id: "dp",
    label: "Data Protection",
    kicker: "Privacy & UK GDPR",
    glyph: "§",
    color: "lavender",
    oneliner: "The discipline of handling personal data lawfully, transparently, and with respect for the people it describes.",
    about: {
      why: "Almost every organisation in the UK processes personal data. The Information Commissioner's Office can issue penalties up to £17.5m or 4% of global turnover. That's only the headline risk — the deeper one is trust, and the operational drag of getting it wrong (DSAR backlogs, breach scrambles, board-level interrogations).",
      who: "Data Protection Officers, privacy managers, in-house counsel, security analysts moving into governance, ex-policy or audit professionals, and anyone in product / HR / marketing who keeps hitting compliance walls.",
      shape: "Heavily legal at the foundation, increasingly operational and technical at the senior end. Strong overlap with AI governance and cybersecurity at the top of the career.",
    },
    phases: [
      { n: "01", title: "UK GDPR & DPA 2018 Fundamentals", blurb: "The two statutes everything else rests on.", beats: ["Six lawful bases (Article 6)", "Eight data subject rights with timescales", "Accountability principle in practice", "ICO guidance as your textbook"] },
      { n: "02", title: "Special Category & Criminal Offence Data", blurb: "The two-key rule and Schedule 1 conditions.", beats: ["Ten special categories", "Schedule 1 (DPA 2018) conditions", "Article 9 ↔ Article 6 pairing", "Criminal offence data (Art. 10)"] },
      { n: "03", title: "Operational Workstreams", blurb: "DSARs, DPIAs, breach response, ROPAs — the day job.", beats: ["DSAR end-to-end with exemptions", "DPIA: when mandatory + the 9 criteria", "72-hour breach notification", "Article 30 ROPAs"] },
      { n: "04", title: "International & Specialist", blurb: "Transfers, AI, cloud — the modern complexity layer.", beats: ["UK IDTA, SCCs, adequacy decisions", "Article 22 + automated decisions", "Processor agreements (Art. 28)", "AI Act ↔ GDPR overlap"] },
      { n: "05", title: "Career Translation", blurb: "Turn knowledge into proof employers recognise.", beats: ["Portfolio: DSAR templates, DPIA, breach playbook, ROPA", "Cert sequence: ICO free → BCS/CIPP-E → CIPM", "ICO enforcement case studies (×3)", "LinkedIn presence in the UK DP community"] },
    ],
    certs: [
      { name: "ICO Introduction to Data Protection", issuer: "Information Commissioner's Office", cost: "Free", level: "Entry", note: "Start here. Costs nothing; signals you've actually read the regulator's material." },
      { name: "BCS Practitioner Certificate in Data Protection", issuer: "BCS — Chartered Institute for IT", cost: "£900–£1,200", level: "Practitioner", note: "UK-flavoured alternative to CIPP/E. Recognised by public sector and many UK private employers." },
      { name: "CIPP/E", issuer: "IAPP", cost: "~£500 exam + ~£250/yr membership", level: "Practitioner", note: "European law focus. The international benchmark — useful if you're targeting in-house roles at multinationals or consultancies." },
      { name: "CIPM", issuer: "IAPP", cost: "~£500", level: "Operational", note: "Programme management. Most DPOs pair this with CIPP/E. Best taken after 1–2 years' practical work." },
      { name: "CIPT", issuer: "IAPP", cost: "~£500", level: "Technical", note: "For privacy engineering and PET-adjacent roles. Less common for traditional DPOs; growing in importance." },
    ],
    portfolio: [
      { name: "DSAR handling pack", purpose: "Shows you understand the full lifecycle, not just the deadline.", contents: "Cover letter · ID verification request · scope confirmation · redaction matrix · response letter · log entry template" },
      { name: "Worked DPIA", purpose: "The single most-asked-about artefact in DP interviews.", contents: "Description of processing · necessity & proportionality · risk register · mitigations · residual-risk position · review schedule" },
      { name: "Breach playbook", purpose: "Shows decision-making under pressure.", contents: "Awareness trigger · containment steps · severity assessment · 72-hour ICO template · individual-notification template · post-incident review" },
      { name: "ROPA for one product line", purpose: "Demonstrates Article 30 fluency.", contents: "Processing activity · purposes · categories · recipients · transfers · retention · security" },
      { name: "ICO enforcement case studies (×3)", purpose: "Proves you read primary sources, not blog summaries.", contents: "Facts · breach of which article(s) · ICO finding · sanction · what should have happened" },
    ],
    differentiate: [
      { head: "Pick a sector lens", body: "Generalist DP roles attract hundreds of applicants. 'DP for the NHS' or 'DP for fintech' attracts far fewer. Sector-specific case studies, vocabulary, and a handful of contacts in that sector beat a broader CV every time." },
      { head: "Write in public", body: "Three short ICO-decision breakdowns on LinkedIn — done well — will be seen by more practising DPOs than two years of quiet study. Don't editorialise; analyse. Tag the original decision." },
      { head: "Adjacent-skill stack", body: "DP + security (CCSP / CISSP) or DP + AI (AIGP) opens roles that pure-law candidates can't apply to. Hiring managers struggle to find these combinations." },
    ],
    publications: [
      { title: "ICO Newsletter & enforcement page", author: "Information Commissioner's Office", type: "Free", note: "The only source for what the regulator currently thinks. Subscribe; skim weekly.", url: "https://ico.org.uk/about-the-ico/media-centre/" },
      { title: "Panopticon Blog", author: "11KBW", type: "Free", note: "Information-law barristers writing accessibly on FOIA + DP litigation. Excellent for nuance.", url: "https://panopticonblog.com/" },
      { title: "The Privacy Advisor Podcast", author: "IAPP", type: "Free", note: "Weekly. Mix of US/EU/UK — skip the US-only episodes if you're tight on time.", url: "https://iapp.org/news/privacy-advisor-podcast/" },
      { title: "Data Protection Network newsletter", author: "DPN", type: "Free", note: "UK-focused; concise updates on ICO actions and tribunal decisions.", url: "https://www.dpnetwork.org.uk/" },
      { title: "Carey Lening — Privacy Pros", author: "Substack", type: "Free / paid", note: "Sharp commentary; calls out vendor nonsense more honestly than most.", url: "https://privacypros.substack.com/" },
    ],
    faq: [
      { q: "Do I need a law degree?", a: "No. The vast majority of working DPOs are not lawyers. You need fluency with the regulation and the operational craft. A law background helps for high-stakes advisory roles; it isn't a gate." },
      { q: "Can I do this remotely?", a: "Yes. UK DP work is more remote-friendly than most compliance disciplines — most in-house roles offer 2–3 days WFH, and some are fully remote. Public sector tends to be more office-bound." },
      { q: "How long until I'm 'employable'?", a: "Realistically: 6–12 months of structured study + 2–3 strong portfolio artefacts + a public learning trail can get you interviews for analyst-level roles, especially if you have transferable experience (legal, audit, compliance, HR, ops, security)." },
      { q: "Is the DPO role going away with AI?", a: "No — it's expanding. The Article 22 / AI-Act overlap means DP knowledge becomes more central, not less. The shape of the role is shifting toward AI governance and cross-border risk." },
    ],
  },

  /* ─── 2. AI Governance ──────────────────────────────────────── */
  {
    id: "ai",
    label: "AI Governance",
    kicker: "EU AI Act, NIST AI RMF, ISO 42001",
    glyph: "◐",
    color: "blush",
    oneliner: "The discipline of deploying AI systems lawfully, safely, and in a way that you can explain to a regulator, a board, and the people affected.",
    about: {
      why: "The EU AI Act fully applies from August 2026. NIST's AI Risk Management Framework is the de-facto benchmark in the US. ISO/IEC 42001 is the first certifiable AI management standard. Every large organisation is now hiring for this — and the supply of practitioners is genuinely thin.",
      who: "DP practitioners specialising upward, MLOps/data engineers moving into governance, model risk professionals from banking, policy analysts, and ex-product managers comfortable with both technical and regulatory vocabulary.",
      shape: "Hybrid by nature. Sits between data protection, security, model risk, and product. Strong DP-Act overlap on automated decision-making and special category training data.",
    },
    phases: [
      { n: "01", title: "The Regulatory Landscape", blurb: "Who's regulating what, where.", beats: ["EU AI Act: risk classes, scope, timelines", "UK's principles-based approach + AI Bill watch", "NIST AI RMF + the AI RMF Playbook", "ISO/IEC 42001 — AI management systems", "Council of Europe AI Convention"] },
      { n: "02", title: "Risk Classification & High-Risk Systems", blurb: "Annex III, prohibited practices, GPAI.", beats: ["Unacceptable / high / limited / minimal risk", "Annex III high-risk categories", "GPAI obligations (transparency, training data, copyright)", "Systemic-risk GPAI thresholds"] },
      { n: "03", title: "Operational Controls", blurb: "What you actually have to do.", beats: ["AI risk assessments (AI Act + DPIA combined)", "Technical documentation requirements", "Human oversight design patterns", "Bias testing, accuracy, robustness", "Conformity assessment + CE marking", "Post-market monitoring"] },
      { n: "04", title: "GDPR / AI Act Interplay", blurb: "Where data protection meets AI.", beats: ["Article 22 automated decisions in scope", "Special category data in training sets", "Privacy-by-design for ML pipelines", "Transparency obligations across both", "DPIA + AI risk assessment as one workflow"] },
      { n: "05", title: "Career Translation", blurb: "Show employers you can do the work.", beats: ["AIGP / ISO 42001 lead implementer", "Portfolio: AI risk assessment, model card, governance playbook", "Track public-sector procurement (UK AI playbook)", "Comment on EDPB + ICO joint guidance"] },
    ],
    certs: [
      { name: "AIGP — Artificial Intelligence Governance Professional", issuer: "IAPP", cost: "~£500", level: "Practitioner", note: "Newest IAPP cert (2024). Becoming the AI governance benchmark; aligned to EU AI Act + NIST." },
      { name: "ISO/IEC 42001 Lead Implementer / Lead Auditor", issuer: "PECB / BSI / various", cost: "£1,500–£3,000", level: "Practitioner", note: "Certifiable management-system standard for AI. Increasingly required for enterprise procurement." },
      { name: "NIST AI RMF Self-Study", issuer: "NIST", cost: "Free", level: "Foundational", note: "Not a cert but mastering the RMF Playbook is table-stakes. Cite it in interviews." },
      { name: "Securiti AI Security & Governance", issuer: "Securiti", cost: "Free", level: "Foundational", note: "Vendor training, but well-structured. Useful for the operational vocabulary." },
      { name: "CIPP/E + CIPT", issuer: "IAPP", cost: "~£500 each", level: "Practitioner", note: "Useful prerequisites for AI governance — most senior roles want DP fluency underneath the AI work." },
    ],
    portfolio: [
      { name: "AI risk assessment (worked example)", purpose: "The single most-asked-for artefact for AI governance roles.", contents: "Use case · purpose · stakeholders · data flow · risk class · GDPR + AI Act obligations · safeguards · go/no-go" },
      { name: "Model card", purpose: "Demonstrates fluency with how AI is documented.", contents: "Intended use · training data · evaluation metrics · limitations · ethical considerations · update history" },
      { name: "AI use-case inventory", purpose: "Many orgs don't have one. Showing you can build one is rare and valuable.", contents: "System inventory · risk class · owner · sensitive-data flag · status (live/pilot/sunset)" },
      { name: "Governance playbook", purpose: "Procurement / build / deploy / monitor / retire lifecycle.", contents: "Intake form · review SLAs · approval routes · monitoring metrics · sunset criteria" },
      { name: "Public-comment response", purpose: "Pick an open EDPB / ICO / NIST consultation; submit a thoughtful response. Massive credibility signal.", contents: "Question scope · evidence-based position · references · public response link" },
    ],
    differentiate: [
      { head: "Combine with a technical foundation", body: "AI governance practitioners who can read a transformer paper, run an evaluation script, or pair-program with an MLE are scarce. Even basic Python + scikit-learn fluency separates you from policy-only candidates." },
      { head: "Sector specialisation", body: "AI governance in healthcare, finance, public sector, and recruitment all look different. Pick one. Read its regulator's AI stance (MHRA, FCA, CDDO, EHRC). Build a portfolio piece grounded in that sector." },
      { head: "Track regulator output", body: "ICO + CMA + Ofcom + FCA published a joint AI statement. The DRCF is publishing live work. Read it, summarise it, post the summary. You'll outpace 95% of the cert-only crowd." },
    ],
    publications: [
      { title: "AI Snake Oil", author: "Arvind Narayanan & Sayash Kapoor", type: "Book + Substack", note: "Sceptical, evidence-based. Indispensable for spotting vendor nonsense.", url: "https://www.aisnakeoil.com/" },
      { title: "Import AI", author: "Jack Clark", type: "Free newsletter", note: "Weekly. Best industry-wide signal. Read the 'why this matters' section.", url: "https://importai.substack.com/" },
      { title: "Stanford HAI Policy Briefs", author: "Stanford HAI", type: "Free", note: "Short, rigorous. Excellent for understanding US/EU divergence.", url: "https://hai.stanford.edu/policy" },
      { title: "EU AI Act explorer", author: "Future of Life Institute", type: "Free", note: "Searchable, cross-referenced. The fastest way to navigate the Act.", url: "https://artificialintelligenceact.eu/" },
      { title: "Cambridge Centre for Existential Risk + Leverhulme CFI papers", author: "various", type: "Free", note: "Academic but readable. Foundational on long-tail AI risk if that's your direction.", url: "https://www.cser.ac.uk/" },
    ],
    faq: [
      { q: "Do I need to be able to code?", a: "Not to start. To progress past senior analyst, basic Python / SQL / Jupyter fluency is increasingly assumed. You won't be building models, but you will be reading them." },
      { q: "Is this a real career, or hype?", a: "Real. The combination of AI Act timelines, ISO 42001 certification demand, and enterprise procurement requirements means the demand is structural, not faddish. That said: salaries vary wildly by sector." },
      { q: "Do I need to specialise upward from DP, or can I start fresh?", a: "Both work. DP-upward is the more common path because GDPR fluency underpins much of the AI governance day-job. Coming from policy, MLOps, or model risk is also viable." },
      { q: "Is the EU AI Act extraterritorial?", a: "Yes — applies to providers placing systems on the EU market AND to non-EU providers/deployers where the OUTPUT is used in the EU. UK companies serving EU users are in scope." },
    ],
  },

  /* ─── 3. FinTech Regulation ─────────────────────────────────── */
  {
    id: "fintech",
    label: "FinTech Regulation",
    kicker: "FCA, EBA, PSRs, Open Banking",
    glyph: "£",
    color: "sun",
    oneliner: "The discipline of building and running financial-services products inside the UK's principles-based regulatory architecture — without breaking the FCA's rules or the underlying laws.",
    about: {
      why: "The UK fintech sector is the third largest globally. The FCA's authorisation gate is genuinely difficult; ongoing supervision is more so. Misclassifying a permission, mishandling client money, or missing a SUP 15 notification can be career-defining.",
      who: "Compliance officers in challenger banks, payments companies, EMIs, e-money agents, lending platforms, crypto firms, and consumer-credit brokers. Lawyers cross-training. Risk professionals from incumbent banks.",
      shape: "Principles + rulebook + supervisory expectation. The Handbook is enormous; you'll specialise quickly. Strong overlap with financial crime, conduct, and data protection.",
    },
    phases: [
      { n: "01", title: "The Regulatory Architecture", blurb: "FCA, PRA, PSR, BoE — and what each does.", beats: ["FSMA 2000 (amended) — the parent statute", "The Handbook structure (PRIN, SYSC, COBS, CASS, BCOBS, ICOBS, MCOB, SUP, DISP, FUND, PERG)", "Authorisation gateway: Threshold Conditions", "Senior Managers & Certification Regime (SMCR)"] },
      { n: "02", title: "Payments & E-Money", blurb: "PSRs 2017, EMRs 2011, Open Banking.", beats: ["Payment institution vs e-money institution permissions", "Strong customer authentication (SCA)", "Safeguarding client funds", "PSD2 / Open Banking — AIS, PIS, CBPII", "Operational and security incident reporting"] },
      { n: "03", title: "Consumer Credit & Lending", blurb: "CONC, affordability, vulnerable customers.", beats: ["CONC: high-cost short-term credit rules", "Affordability + creditworthiness", "Forbearance and arrears handling", "Vulnerable customer guidance (FG21/1)", "Consumer Duty overlap"] },
      { n: "04", title: "Crypto & Innovation Permissions", blurb: "MLR registration, financial promotions, the sandbox.", beats: ["MLR cryptoasset registration", "Financial promotions for cryptoassets (PERG 22)", "Innovation Hub + regulatory sandbox", "Designated activities regime (incoming)"] },
      { n: "05", title: "Supervision & Enforcement", blurb: "The bit nobody trains you for until you're in it.", beats: ["SUP 15 notifications — what to tell the FCA, when", "S.166 skilled-person reviews", "VREQs, OIVOPs, decision notices", "Enforcement timeline + the Final Notice"] },
      { n: "06", title: "Career Translation", blurb: "Move from generalist compliance into fintech.", beats: ["Pick a permission type (payments, EMI, lending, crypto) and go deep", "Portfolio: a sample Reg Business Plan section, a SUP 15 notification draft", "Track the FCA's annual business plan + Dear CEO letters", "Network in: r/UKFintech, FCA Innovate events, UK Finance"] },
    ],
    certs: [
      { name: "ICA Diploma in Financial Crime Compliance", issuer: "International Compliance Association", cost: "£3,000–£4,000", level: "Practitioner", note: "Often the entry cert for UK financial-services compliance, despite the financial-crime framing." },
      { name: "ICA Specialist Certificate in Financial Services Regulation", issuer: "ICA", cost: "£1,200", level: "Foundational", note: "Shorter than the Diploma; useful for cross-training into fintech." },
      { name: "CISI Investment Operations Certificate (IOC)", issuer: "CISI", cost: "£800–£1,200", level: "Foundational", note: "Common at the analyst level in investment-flavoured fintechs." },
      { name: "FCA Approved Person regimes (SM&CR study)", issuer: "FCA / training providers", cost: "varies", level: "Role-specific", note: "Not a cert per se — but understanding the certified-function regime is essential for any senior role." },
      { name: "Cambridge Spark / UCL Fintech Programmes", issuer: "Cambridge Spark / UCL", cost: "£2,000–£8,000", level: "Conversion", note: "Useful for non-finance backgrounds. Less credible than ICA for compliance-specific roles." },
    ],
    portfolio: [
      { name: "A 'mock' Regulatory Business Plan section", purpose: "Authorisation applications are the bar fintechs are measured against. Showing you can write one is rare.", contents: "Business model · target market · permissions sought · key risks · controls · resourcing" },
      { name: "SUP 15 notification draft (hypothetical)", purpose: "Shows you understand the FCA's notification obligations.", contents: "Trigger · timeline · regulatory grounds · disclosure scope · accompanying narrative" },
      { name: "Annotated Dear CEO letter analysis", purpose: "Pick a recent FCA Dear CEO letter; explain what it actually requires, in plain English.", contents: "Letter context · regulatory hook · what 'good' looks like · gaps the FCA expects firms to close" },
      { name: "Financial promotions review", purpose: "Take a real fintech ad; assess against the financial-promotions rules. High-signal piece.", contents: "Promotion · target audience · rule mapping · risk warnings · prominence · concerns" },
    ],
    differentiate: [
      { head: "Permission-type specialism", body: "'I've done compliance' is generic. 'I've taken three EMIs through authorisation, including their safeguarding setup' is rare and valuable. Pick a permission type." },
      { head: "Build a Handbook reading habit", body: "Most compliance professionals never re-read the rules after their cert. Quarterly, read one section of the Handbook end-to-end. Over two years you'll know it better than 90% of working compliance officers." },
      { head: "Cross-train into conduct or financial crime", body: "Conduct + fintech, or AML + fintech, are particularly hireable combinations. Pure 'fintech compliance' generalists struggle past mid-level." },
    ],
    publications: [
      { title: "FCA Handbook", author: "FCA", type: "Free", note: "Primary source. Use the email-alert feature on the sections relevant to your firm.", url: "https://www.handbook.fca.org.uk/" },
      { title: "FCA Dear CEO letters", author: "FCA", type: "Free", note: "The clearest signal of supervisory expectation. Read each one in your sector.", url: "https://www.fca.org.uk/firms/dear-ceo-letters" },
      { title: "FT Alphaville — fintech coverage", author: "Financial Times", type: "Paid", note: "Sharp, sceptical. Worth the subscription if fintech is your area." },
      { title: "Fintech Brainfood", author: "Simon Taylor", type: "Free newsletter", note: "Weekly. Best operator's-view newsletter on the global fintech industry.", url: "https://www.fintechbrainfood.com/" },
      { title: "11:FS podcast network", author: "11:FS", type: "Free", note: "Wide range; 'Fintech Insider' and 'Blockchain Insider' are the staples." },
      { title: "Bank of England Speeches & Quarterly Bulletins", author: "Bank of England", type: "Free", note: "Useful for the macro-prudential context fintech operates inside.", url: "https://www.bankofengland.co.uk/news/speeches" },
    ],
    faq: [
      { q: "Do I need a finance background?", a: "It helps but isn't required. Many strong fintech compliance professionals come from law, audit, or general regulatory work. What you DO need is patience for rules-based detail." },
      { q: "Is the FCA a friendly regulator?", a: "Polite. Not friendly. The supervisory style is principles-led but the consequences for missing things are real. Treat every interaction as on the record." },
      { q: "Crypto compliance — real career or sideways move?", a: "Real, but volatile. Regulation is hardening; some firms are de-banking; the market expands and contracts on 18-month cycles. Treat it as a specialism within fintech, not a separate career." },
      { q: "Salaries vs incumbent banks?", a: "Generally lower at the analyst level (smaller firms, less budget), competitive at manager level, and can exceed bank pay at senior compliance / MLRO levels in successful fintechs because of equity." },
    ],
  },

  /* ─── 4. Cybersecurity & NIS2 ───────────────────────────────── */
  {
    id: "cyber",
    label: "Cybersecurity & NIS2",
    kicker: "NIS2, NCSC, ISO 27001, CAF",
    glyph: "▲",
    color: "mint",
    oneliner: "The discipline of protecting systems, data, and the operations that depend on them — and proving to regulators and customers that you do.",
    about: {
      why: "NIS2 brings 'essential' and 'important' entities across the EU into a hardened security regime; the UK is mirroring with the Cyber Security and Resilience Bill. Customers want SOC 2 / ISO 27001; enterprise procurement won't open the door without them.",
      who: "Information security analysts, GRC professionals, ex-network/sysadmin moving into governance, compliance officers cross-training, and DP practitioners specialising laterally into security.",
      shape: "Mostly governance + audit at the early levels, with hands-on technical depth required to progress. Strong overlap with operational resilience, DP, and AI governance.",
    },
    phases: [
      { n: "01", title: "Frameworks & Standards", blurb: "What you'll be measured against.", beats: ["ISO/IEC 27001 + 27002 controls", "NIST CSF 2.0", "Cyber Essentials & Cyber Essentials Plus", "NCSC Cyber Assessment Framework (CAF)", "SOC 2 (Type I vs Type II)"] },
      { n: "02", title: "NIS2 & UK Cyber Bill", blurb: "The new regulatory floor.", beats: ["Essential vs important entities", "10 core security measures (Article 21)", "24-hour early-warning + 72-hour incident notification", "Management body liability — personal accountability", "UK's forthcoming Cyber Security & Resilience Bill"] },
      { n: "03", title: "Operational Workstreams", blurb: "What you actually do all day.", beats: ["Information Security Management System (ISMS)", "Risk register + treatment plan", "Vendor / supply-chain due diligence (TPRM)", "Incident response playbooks + tabletop exercises", "Vulnerability management + patch SLAs"] },
      { n: "04", title: "Privacy, Resilience & AI Overlap", blurb: "Where security sits inside the wider compliance estate.", beats: ["Article 32 (UK GDPR) security obligations", "DORA / UK operational resilience overlap", "AI Act Article 15 — cybersecurity for high-risk AI", "Third-party risk + supply-chain controls"] },
      { n: "05", title: "Career Translation", blurb: "Turn the cert + framework knowledge into a hireable shape.", beats: ["ISO 27001 Lead Implementer / Lead Auditor", "Portfolio: ISMS scope statement, risk register, IR playbook", "Track NCSC advisories + CISA KEV catalogue", "CrestCon, CYBERUK, BSides — go to one"] },
    ],
    certs: [
      { name: "ISO/IEC 27001 Lead Implementer", issuer: "PECB / BSI / IRCA", cost: "£1,500–£2,500", level: "Practitioner", note: "Often the practical baseline for security GRC roles. Lead Auditor is the audit-firm route." },
      { name: "CompTIA Security+", issuer: "CompTIA", cost: "£300–£400", level: "Foundational", note: "Entry-level technical cert. Widely accepted as a starter signal." },
      { name: "(ISC)² CISSP", issuer: "(ISC)²", cost: "~£700 exam + ~£100/yr", level: "Senior", note: "Requires 5 years' experience. Heavy. Still the global benchmark for senior security roles." },
      { name: "(ISC)² CC — Certified in Cybersecurity", issuer: "(ISC)²", cost: "Free (until further notice)", level: "Entry", note: "Excellent free option for the foundations. Sign up via the 'One Million Certified' programme." },
      { name: "CREST registered practitioner certs", issuer: "CREST", cost: "varies", level: "Technical", note: "For hands-on offensive/defensive roles. Less relevant for pure GRC." },
      { name: "SANS / GIAC", issuer: "SANS", cost: "£5,000+", level: "Specialist", note: "Expensive but the gold standard for technical specialism. Many employers will pay if you ask." },
    ],
    portfolio: [
      { name: "ISMS scope statement", purpose: "Shows you understand ISO 27001's first hard problem.", contents: "Boundary · interfaces · assets · interested parties · exclusions + justification" },
      { name: "Risk register (worked example)", purpose: "Risk is the language of the discipline. Showing you can populate one is foundational.", contents: "Asset · threat · vulnerability · likelihood · impact · inherent + residual · owner · review date" },
      { name: "Incident response playbook", purpose: "Practical artefact every employer expects.", contents: "Detection · triage · containment · communications · recovery · post-incident review · regulator notification template" },
      { name: "Vendor risk-assessment template", purpose: "Third-party risk management is increasingly board-level.", contents: "Inherent risk tier · evidence requested · DPA + SCC status · pen-test cadence · sub-processor list · review schedule" },
      { name: "Tabletop exercise write-up", purpose: "Run one. Document what went well, what went wrong, what you'd change.", contents: "Scenario · participants · timeline · observed gaps · remediation plan" },
    ],
    differentiate: [
      { head: "Pair GRC with a technical depth area", body: "Pure GRC career-caps at senior analyst in many firms. GRC + identity (Okta / Azure AD), GRC + cloud (AWS / GCP), or GRC + offensive (CRT) opens senior consulting and security-leadership tracks." },
      { head: "Sector matters more than in DP", body: "Critical national infrastructure, financial services, MoD-cleared, and health all have different threat models and regulators. Pick early; build a portfolio inside one sector." },
      { head: "Speak fluently to the business", body: "Security people who can write to a board — without jargon, with quantified risk — are scarce and expensive. Practice translating findings into pound-figures or operational impact." },
    ],
    publications: [
      { title: "NCSC Weekly Threat Report", author: "NCSC", type: "Free", note: "The UK regulator's view of the current threat landscape.", url: "https://www.ncsc.gov.uk/section/keep-up-to-date/threat-reports" },
      { title: "Krebs on Security", author: "Brian Krebs", type: "Free", note: "Investigative, not vendor-driven. The single most-cited security blog.", url: "https://krebsonsecurity.com/" },
      { title: "Risky Business podcast", author: "Patrick Gray", type: "Free + paid", note: "Weekly. Operator + analyst tone; cuts through marketing noise.", url: "https://risky.biz/" },
      { title: "MITRE ATT&CK + D3FEND", author: "MITRE", type: "Free", note: "The taxonomy of attacker behaviour. Reference it in every IR playbook.", url: "https://attack.mitre.org/" },
      { title: "CIS Critical Security Controls", author: "Center for Internet Security", type: "Free", note: "Pragmatic, prioritised. Useful when building a programme from scratch.", url: "https://www.cisecurity.org/controls" },
      { title: "Verizon Data Breach Investigations Report", author: "Verizon", type: "Free annual", note: "Annual statistics on how breaches actually happen. Cite it in every board paper.", url: "https://www.verizon.com/business/resources/reports/dbir/" },
    ],
    faq: [
      { q: "Do I need to be a hacker?", a: "No. GRC, audit, and security leadership tracks don't require offensive skills. They do require enough technical fluency to call BS on vendor and engineering claims." },
      { q: "Is CISSP worth it for a beginner?", a: "Not directly — it requires 5 years' experience. Use the free (ISC)² CC as a starter, then ISO 27001 Lead Implementer as a practitioner cert, then CISSP at the senior stage." },
      { q: "How does this overlap with DP?", a: "Article 32 UK GDPR puts security obligations directly on the controller. NIS2 puts personal liability on management bodies. The two disciplines converge at the senior end; many CISOs and DPOs now share governance forums." },
      { q: "Cloud-specific certs — AWS / Azure / GCP?", a: "Helpful at the engineering end of security. Less critical for pure governance. If you do one, AZ-500 or AWS Security Specialty are the most-named in UK job adverts." },
    ],
  },

  /* ─── 5. Conduct & Consumer Duty ────────────────────────────── */
  {
    id: "conduct",
    label: "Conduct & Consumer Duty",
    kicker: "FCA, PRIN 12, vulnerable customers",
    glyph: "♢",
    color: "coral",
    oneliner: "The discipline of making sure financial-services firms treat their customers fairly — measured against an outcomes-based regulator, not a tick-box rulebook.",
    about: {
      why: "Consumer Duty (PRIN 12) is the FCA's most significant conduct intervention in a decade. Firms must deliver good outcomes across four areas: products & services, price & value, consumer understanding, and consumer support. The first formal board-attestation cycle has just passed; the FCA is now testing implementation through supervision.",
      who: "Conduct officers, complaints managers, in-house lawyers, customer-experience leads cross-training into compliance, and product managers in regulated firms.",
      shape: "Outcomes-based, evidence-heavy, narrative-driven. Less rules-mapping than fintech compliance; more management information, customer-research design, and board-paper writing.",
    },
    phases: [
      { n: "01", title: "The Conduct Architecture", blurb: "PRIN, COBS, BCOBS, ICOBS, MCOB — and now PRIN 12.", beats: ["The 11 (now 12) Principles for Businesses", "Treating Customers Fairly (TCF) — the predecessor", "Consumer Duty + Cross-Cutting Rules", "The four outcomes", "Senior Manager attestation obligations"] },
      { n: "02", title: "Consumer Duty in Practice", blurb: "What the FCA actually expects to see.", beats: ["Product & services governance", "Price & value assessments", "Consumer understanding testing", "Consumer support — friction, switching, complaints", "Board's annual review + attestation"] },
      { n: "03", title: "Vulnerable Customers", blurb: "FG21/1 and the operational reality.", beats: ["Drivers of vulnerability (health, life events, resilience, capability)", "Identification + treatment + record-keeping", "Training across customer-facing staff", "Outcomes monitoring + governance reporting"] },
      { n: "04", title: "Complaints & Redress", blurb: "DISP, FOS, root-cause analysis.", beats: ["DISP rules + 8-week timeline", "Financial Ombudsman Service (FOS) thresholds", "Final Response Letters", "Root-cause analysis + thematic remediation", "Past business reviews + redress methodology"] },
      { n: "05", title: "Career Translation", blurb: "Move into a Conduct-led role.", beats: ["ICA Cert in Conduct Risk + the Consumer Duty modules", "Portfolio: an outcomes-monitoring framework, a fair-value assessment", "Track FCA Multi-Firm Reviews + Dear CEO letters", "Network in: UK Finance, ICA, IRSG conduct working groups"] },
    ],
    certs: [
      { name: "ICA Certificate in Managing Conduct Risk", issuer: "ICA", cost: "£1,200", level: "Foundational", note: "Most direct cert for conduct-specific roles. Includes Consumer Duty material." },
      { name: "ICA Specialist Certificate in Conduct Risk", issuer: "ICA", cost: "£1,500", level: "Practitioner", note: "Deeper than the basic cert; useful for senior conduct or Head-of-Conduct roles." },
      { name: "CISI Conduct Rules training", issuer: "CISI", cost: "£200–£400", level: "Foundational", note: "Often a baseline requirement under SM&CR." },
      { name: "Vulnerable Customer training (various)", issuer: "BSI / industry providers", cost: "£200–£500", level: "Role-specific", note: "Increasingly expected for anyone touching customer journeys." },
      { name: "Internal SM&CR + Conduct Rules competence", issuer: "Employer", cost: "Internal", level: "Mandatory", note: "Annual attestation for certified functions. Not a transferable cert but signals seniority." },
    ],
    portfolio: [
      { name: "Outcomes-monitoring framework", purpose: "Consumer Duty's hardest operational problem. Demonstrating you can design one is rare.", contents: "Outcome statement · target population · MI sources · thresholds · escalation routes · governance report template" },
      { name: "Fair-value assessment (worked example)", purpose: "Price & value is one of the four outcomes; FAVs are now required for every product.", contents: "Product · target market · cost vs benefit · non-financial costs · cross-subsidy analysis · vulnerable-customer impact · conclusion" },
      { name: "Vulnerable-customer journey map", purpose: "Operational artefact most firms struggle with.", contents: "Identification points · capture mechanism · staff prompts · tailored support pathways · governance + reporting" },
      { name: "Root-cause-analysis case study", purpose: "Pick a complaint theme; analyse properly. Excellent interview material.", contents: "Complaint cluster · symptom · proximate cause · root cause · remediation · monitoring · attestation" },
    ],
    differentiate: [
      { head: "Pair Conduct with data analytics", body: "The outcomes-monitoring obligation is fundamentally a data problem. Conduct + SQL/Looker/Tableau fluency is rare and pays unusually well." },
      { head: "Specialise into a product type", body: "Conduct in mortgages, motor finance, BNPL, and insurance all have different regulatory baggage. Mortgages and motor finance are particularly live areas (commission disclosure, affordability scrutiny)." },
      { head: "Write conduct narratives well", body: "Senior conduct work is 70% writing — board papers, attestations, FCA responses. Plain English + structure is the single most underestimated career accelerator." },
    ],
    publications: [
      { title: "FCA Consumer Duty hub", author: "FCA", type: "Free", note: "Updated regularly with multi-firm review findings.", url: "https://www.fca.org.uk/firms/consumer-duty" },
      { title: "FCA Multi-Firm Reviews + Thematic Reviews", author: "FCA", type: "Free", note: "Where supervisory expectation lives in practice. Read every review touching your sector.", url: "https://www.fca.org.uk/publication/multi-firm-reviews/" },
      { title: "FOS Annual Complaints Data", author: "Financial Ombudsman Service", type: "Free", note: "The map of where customer-treatment failures actually occur.", url: "https://www.financial-ombudsman.org.uk/data-insight" },
      { title: "Money Advice Trust / Money & Mental Health Policy Institute reports", author: "various", type: "Free", note: "Foundational research on vulnerability.", url: "https://www.moneyadvicetrust.org/" },
      { title: "RegRoundup / Bovill / Eversheds briefings", author: "various", type: "Free", note: "Concise consultancy summaries of new FCA work. Useful for staying current without reading everything." },
    ],
    faq: [
      { q: "Is Consumer Duty just rebranded TCF?", a: "No. TCF was principles-based but supervised lightly. Consumer Duty layers an outcomes obligation, an evidence requirement, and a senior-manager attestation on top. The supervisory teeth are real." },
      { q: "Can I move into conduct from customer service?", a: "Yes — possibly the most natural transition. Customer-facing experience translates directly into vulnerable-customer policy, complaints leadership, and outcomes design." },
      { q: "How is this different from compliance generally?", a: "Compliance asks 'is this allowed?'. Conduct asks 'is this fair? Can we evidence the outcome?'. The shift to outcomes-based regulation makes the role more strategic and less procedural." },
      { q: "Is the FCA expected to soften?", a: "Politically yes, operationally no. The Consumer Duty is now embedded; thematic reviews continue. Plan for sustained supervisory intensity in retail-facing sectors." },
    ],
  },

  /* ─── 6. Financial Crime / AML ──────────────────────────────── */
  {
    id: "aml",
    label: "Financial Crime / AML",
    kicker: "MLR 2017, FATF, sanctions",
    glyph: "ϴ",
    color: "ocean",
    oneliner: "The discipline of stopping money laundering, terrorist financing, fraud, sanctions evasion and bribery from flowing through your firm — and proving to regulators that you did.",
    about: {
      why: "Money laundering is estimated at 2–5% of global GDP. UK fines for AML failures regularly exceed £100m. The MLRO role is personally accountable under FSMA. Demand for skilled financial-crime professionals in the UK consistently exceeds supply.",
      who: "MLROs, deputy MLROs, KYC analysts, transaction-monitoring specialists, sanctions officers, fraud analysts, ex-law-enforcement professionals, and compliance generalists specialising laterally.",
      shape: "Heavy regulation + heavy operations. Less narrative-driven than Conduct, more rules-driven than DP. Increasingly intersects with sanctions, cybersecurity, and crypto.",
    },
    phases: [
      { n: "01", title: "The Statutory Framework", blurb: "POCA, TACT, MLR — the three pillars.", beats: ["Proceeds of Crime Act 2002 — sections 327–340", "Terrorism Act 2000", "Money Laundering Regulations 2017 (+ 2022 amendments)", "Criminal Finances Act 2017 (failure-to-prevent offences)", "FATF Recommendations + UK FATF MER"] },
      { n: "02", title: "KYC, CDD & EDD", blurb: "The operational heart of the discipline.", beats: ["Customer due diligence triggers", "Beneficial ownership + PSC register", "Source-of-funds vs source-of-wealth", "Enhanced due diligence triggers (PEPs, high-risk jurisdictions)", "Ongoing monitoring obligations"] },
      { n: "03", title: "Transaction Monitoring & Reporting", blurb: "Detection + decision + filing.", beats: ["Rules-based vs behavioural-analytics models", "SAR / DAML decision-making + the National Crime Agency", "Tipping-off offences", "Defence Against Money Laundering (DAML) requests", "Quality-assurance + closed-case review"] },
      { n: "04", title: "Sanctions", blurb: "OFSI, OFAC, EU — and a moving target.", beats: ["UK Sanctions and Anti-Money Laundering Act 2018", "Asset-freeze regime + licensing", "OFAC primary + secondary sanctions exposure", "Russia regime: complex ownership rules", "Sanctions screening + false-positive management"] },
      { n: "05", title: "Bribery, Fraud & Adjacent", blurb: "The wider economic-crime estate.", beats: ["Bribery Act 2010 — six principles", "Failure to prevent fraud (ECCTA 2023)", "Fraud Act 2006 offences", "Whistleblowing (PIDA 1998)", "Suspicious activity vs suspicious circumstances"] },
      { n: "06", title: "Career Translation", blurb: "Move into and up financial-crime roles.", beats: ["ICA Diploma + the AML / Sanctions specialist certs", "Portfolio: a CDD policy, an EDD case study, a SAR decision log", "Track FCA + OFSI + NCA enforcement actions", "Network in: r/AntiMoneyLaundering, FATF Watch, ACAMS events"] },
    ],
    certs: [
      { name: "ICA Diploma in Anti-Money Laundering", issuer: "ICA", cost: "£3,500", level: "Practitioner", note: "The most-recognised UK AML cert. Often the route to MLRO." },
      { name: "ICA Specialist Certificate in AML", issuer: "ICA", cost: "£1,200", level: "Foundational", note: "Shorter; useful for the analyst level or as a foundation before the Diploma." },
      { name: "ACAMS CAMS", issuer: "ACAMS", cost: "~£1,400", level: "Practitioner", note: "More international/US-flavoured than ICA. Useful at firms with US ties." },
      { name: "ICA Specialist Certificate in Sanctions", issuer: "ICA", cost: "£1,200", level: "Specialist", note: "Sanctions is the area with the most acute skill shortage right now." },
      { name: "ICA Certificate in Financial Crime Investigations", issuer: "ICA", cost: "£1,200", level: "Specialist", note: "Particularly useful for fraud and investigative-leaning roles." },
      { name: "CFE — Certified Fraud Examiner", issuer: "ACFE", cost: "~£300 + ~£175/yr", level: "Specialist", note: "Heavily fraud-focused. Strong signal for in-house investigations roles." },
    ],
    portfolio: [
      { name: "CDD policy (sample)", purpose: "The foundational document MLROs are measured against.", contents: "Risk-based approach · triggers · evidence standards · refresh cycles · vulnerable-customer overlay · governance" },
      { name: "EDD case study", purpose: "Walk through a fictional PEP or high-risk customer onboarding decision in detail.", contents: "Risk indicators · evidence gathered · source-of-wealth narrative · decision rationale · approval route · ongoing monitoring plan" },
      { name: "SAR decision log (anonymised)", purpose: "Shows you can structure the file-or-don't-file decision.", contents: "Trigger · investigation · suspicion threshold · DAML decision · NCA reference · post-filing action" },
      { name: "Sanctions screening false-positive analysis", purpose: "Where most analyst time actually goes; demonstrating systemic thinking here is rare.", contents: "Match volume · disposition · false-positive root causes · tuning recommendations · governance signoff" },
      { name: "Annotated enforcement case", purpose: "Pick a recent FCA AML fine; analyse what failed and what the firm should have done.", contents: "Firm · failure type · control gap · regulatory finding · sanction · remediation expected" },
    ],
    differentiate: [
      { head: "Pick a sanctions OR fraud lane within AML", body: "Sanctions specialism is the most acute UK shortage right now. Fraud expertise (especially APP fraud) is the second. Generalist AML is well-supplied; specialists are not." },
      { head: "Pair AML with crypto fluency", body: "Crypto AML is the highest-paid lateral move. The technical knowledge required is modest; the regulatory framing (MLR registration, Travel Rule) is where firms struggle." },
      { head: "Build an enforcement-reading habit", body: "FCA, OFSI, FinCEN, FATF all publish enforcement and typology material monthly. A quarterly note on what's changed will outpace most cert-only candidates." },
    ],
    publications: [
      { title: "FATF Mutual Evaluation Reports + Typologies", author: "Financial Action Task Force", type: "Free", note: "The international standard-setter. UK's 2018 MER is essential reading for any UK MLRO.", url: "https://www.fatf-gafi.org/" },
      { title: "OFSI Sanctions Guidance", author: "OFSI / HM Treasury", type: "Free", note: "Primary source for UK sanctions implementation.", url: "https://www.gov.uk/government/organisations/office-of-financial-sanctions-implementation" },
      { title: "NCA Annual Reports + SARs Reform updates", author: "National Crime Agency", type: "Free", note: "Where the SARs regime is heading. Worth reading the annual report cover-to-cover.", url: "https://www.nationalcrimeagency.gov.uk/" },
      { title: "Bill Browder — Red Notice", author: "Bill Browder", type: "Book", note: "Practical foundation for understanding kleptocracy and the Magnitsky regime. Surprisingly readable." },
      { title: "RUSI Centre for Financial Crime & Security Studies", author: "RUSI", type: "Free", note: "Best UK think-tank coverage of the financial-crime policy estate.", url: "https://www.rusi.org/explore-our-research/research-groups/centre-financial-crime-and-security-studies" },
      { title: "The Sanctions Update / ICA newsletters", author: "various", type: "Free", note: "Industry-summary newsletters. Useful for staying current without subscribing to every primary source." },
    ],
    faq: [
      { q: "Do I need a law background?", a: "No. Most UK MLROs come from compliance, audit, or banking-operations backgrounds. Lawyers are well-represented in policy roles and sanctions-specific work." },
      { q: "Is being MLRO risky?", a: "Yes, in a defined and manageable way. The MLRO holds a Senior Manager Function (SMF17) and is personally accountable. Risks are mitigated by competent governance, documented decisions, and adequate resourcing." },
      { q: "Is AML automating away?", a: "Transaction-monitoring tooling is improving; basic KYC is partially automating. But the decisions — risk appetite, EDD judgement, SAR thresholds — remain human. The role is shifting toward governance over automated systems rather than disappearing." },
      { q: "AML vs Sanctions — which is hotter right now?", a: "Sanctions. The post-2022 Russia regime and the ongoing North Korea / Iran / kleptocracy work has created a structural skills gap. Sanctions specialists are commanding 15–25% premiums over generalist AML at the senior end." },
    ],
  },

  /* ─── 7. GRC & Compliance ───────────────────────────────────── */
  {
    id: "grc",
    label: "GRC & Compliance",
    kicker: "Governance, Risk & Compliance",
    glyph: "⊕",
    color: "slate",
    oneliner: "The discipline of building and running the systems that keep an organisation aligned — to its regulators, its risk appetite, and its own policies.",
    about: {
      why: "Every regulated organisation needs people who can translate board risk appetite into operational controls, run an audit cycle, and keep a policy framework current. GRC is the connective tissue of compliance: it sits across data protection, cyber, financial crime, and conduct — and it's the discipline most likely to lead to a Chief Risk Officer or CCO seat.",
      who: "Internal auditors moving into governance, compliance analysts seeking a broader remit, risk managers in banking or insurance, quality or policy professionals in regulated sectors, and anyone who wants a career that spans multiple frameworks rather than one specialism.",
      shape: "Process-heavy at the junior end (controls testing, policy maintenance, risk registers), increasingly strategic and cross-functional at the senior end. Strong overlap with every other area on this site — GRC is the only horizontal discipline here.",
    },
    phases: [
      { n: "01", title: "GRC Foundations", blurb: "The language, models, and mental frames every GRC practitioner uses.", beats: ["Three lines of defence (IIA model)", "Risk appetite vs risk tolerance vs risk capacity", "Governance structures: board, committee, first/second/third line", "Controls: preventive, detective, corrective, directive", "The relationship between policy, standard, procedure, and guideline"] },
      { n: "02", title: "Risk Management Frameworks", blurb: "The international standards for identifying, assessing, and treating risk.", beats: ["ISO 31000: risk management principles and guidelines", "COSO ERM: enterprise risk management cube", "Risk registers: likelihood × impact matrices", "Risk appetite statements and bow-tie analysis", "Emerging risk: AI, climate, third-party concentration"] },
      { n: "03", title: "Compliance Programme Design", blurb: "Building and running a compliance function — not just knowing the rules.", beats: ["Policy lifecycle: draft → approve → publish → train → monitor → review", "Controls frameworks: ISO 27001 Annex A, NIST CSF, COBIT 2019", "Regulatory mapping and obligation registers", "Horizon scanning: UK regulatory pipeline + FCA, PRA, ICO updates", "Compliance monitoring plans and effectiveness testing"] },
      { n: "04", title: "Audit & Assurance", blurb: "Internal audit standards and the controls-testing craft.", beats: ["IIA International Standards for the Professional Practice of Internal Auditing", "Audit universe and annual audit plan", "Fieldwork: walkthroughs, sampling, evidence standards", "Finding classification: critical / high / medium / low", "Audit reporting and management action plans", "External vs internal audit relationship"] },
      { n: "05", title: "Third-Party & Operational Risk", blurb: "The risk that sits outside your four walls.", beats: ["TPRM: tiering, due diligence, ongoing monitoring", "Vendor risk assessments and contractual clauses", "Business continuity and ISO 22301 basics", "Operational resilience: FCA/PRA policy statement", "Concentration risk and single points of failure"] },
      { n: "06", title: "Career Translation", blurb: "Turn GRC knowledge into the roles that actually pay.", beats: ["Portfolio: risk register, compliance monitoring plan, audit report extract, policy template", "Certs: CRISC → CISA (ISACA) or GRCP (OCEG) → CIA (IIA)", "Target sectors: financial services, Big Four advisory, NHS, regulated tech", "GRC tools fluency: RSA Archer, ServiceNow GRC, MetricStream — mention in CV"] },
    ],
    certs: [
      { name: "CRISC — Certified in Risk and Information Systems Control", issuer: "ISACA", cost: "~£500 exam + £45/yr membership", level: "Practitioner", note: "The most recognised IT/operational risk cert globally. Preferred by financial services and Big Four. Requires 3 years' experience." },
      { name: "CISA — Certified Information Systems Auditor", issuer: "ISACA", cost: "~£500 exam", level: "Practitioner", note: "The gold standard for IT audit. Pairs well with an internal audit career path. Requires 5 years' IS/audit experience (substitutions available)." },
      { name: "GRCP — GRC Professional", issuer: "OCEG", cost: "~£300", level: "Foundational", note: "Broad, framework-agnostic GRC cert. Solid starting point; no experience requirements. Less known by UK hiring managers than ISACA certs but growing." },
      { name: "CIA — Certified Internal Auditor", issuer: "IIA", cost: "~£500 (3 parts)", level: "Practitioner", note: "The definitive internal audit credential. If you're targeting a Head of Internal Audit or CAE role, this is non-negotiable." },
      { name: "ISO 27001 Lead Implementer / Lead Auditor", issuer: "PECB / BSI / CQI", cost: "£1,500–£2,500", level: "Specialist", note: "Operational and in demand. Most organisations undergoing ISO 27001 certification need someone who has been through it. Differentiates heavily." },
      { name: "ICA Diploma in Governance, Risk & Compliance", issuer: "ICA", cost: "£3,500", level: "Practitioner", note: "UK-focused, well-regarded in financial services. Good alternative if you come from a non-IT background and prefer a legal/regulatory framing." },
    ],
    portfolio: [
      { name: "Risk register (worked example)", purpose: "The single most-used GRC artefact — demonstrating you can build and maintain one matters.", contents: "Risk ID · description · likelihood · impact · inherent rating · controls · control owner · residual rating · appetite alignment · review date" },
      { name: "Compliance monitoring plan", purpose: "Shows you can design a structured programme, not just react to audits.", contents: "Regulatory obligation · monitoring activity · frequency · evidence type · owner · RAG status · escalation trigger" },
      { name: "Internal audit report (extract)", purpose: "Demonstrates audit craft — finding clarity, evidence sufficiency, management tone.", contents: "Executive summary · scope & methodology · finding (condition / criteria / cause / effect) · recommendation · management response · agreed action plan" },
      { name: "Policy template with lifecycle notes", purpose: "Policy writing is a core GRC skill rarely tested in interviews but heavily weighted on the job.", contents: "Purpose · scope · definitions · requirements · roles & responsibilities · exceptions process · review schedule · version history" },
      { name: "Third-party risk assessment (fictional supplier)", purpose: "TPRM is a gap in most junior GRC candidates' portfolios.", contents: "Supplier tier · data access · residency · certifications held · questionnaire summary · risk rating · mitigating controls · review date" },
    ],
    differentiate: [
      { head: "Pair GRC with a sector lens", body: "GRC generalists are plentiful. GRC + financial services (FCA SYSC rules, PRA operational resilience) or GRC + healthcare (CQC, NHS DSP Toolkit) commands a premium. Pick one sector and go deep on its regulatory stack." },
      { head: "Get a GRC tool on your CV", body: "RSA Archer, ServiceNow GRC, and MetricStream appear in most senior JDs. You don't need certification — a self-guided free trial with a documented use case (even fictional) is enough to claim practical familiarity honestly." },
      { head: "Internal audit → GRC is the classic move", body: "Three years in internal audit gives you evidence collection, finding classification, management engagement, and a clear understanding of control design. It's the most direct path to a Head of GRC role and the background most CCOs share." },
    ],
    publications: [
      { title: "IIA — International Standards & Practice Guides", author: "Institute of Internal Auditors", type: "Free", note: "Primary source for audit standards. The 2024 Global Internal Audit Standards update is essential reading.", url: "https://www.theiia.org/en/standards/" },
      { title: "ISACA Journal & COBIT Publications", author: "ISACA", type: "Free/paid", note: "Best resource for IT governance and COBIT 2019. Members get most content free.", url: "https://www.isaca.org/resources/isaca-journal" },
      { title: "OCEG GRC Illustrated Series", author: "OCEG", type: "Free", note: "Practical, visual guides to GRC fundamentals. Start with the GRC Capability Model.", url: "https://www.oceg.org/resources/grc-illustrated-series/" },
      { title: "FCA & PRA Policy Papers — Operational Resilience", author: "FCA / PRA", type: "Free", note: "The March 2021 operational resilience policy statement redefined what compliance programmes need to prove.", url: "https://www.bankofengland.co.uk/prudential-regulation/publication/2021/march/operational-resilience-ss1-21" },
      { title: "Compliance Week UK", author: "Compliance Week", type: "Free (limited)", note: "Good UK-focused news on regulatory developments across GRC, AML, conduct, and privacy.", url: "https://www.complianceweek.com/" },
    ],
    faq: [
      { q: "Is GRC just internal audit with a rebrand?", a: "No — but they're closely related. Audit is the assurance function (independent testing). GRC is the management function (building and running the programme being tested). You can move between them; they share vocabulary and methods but have distinct accountabilities." },
      { q: "How is GRC different from the other areas on this site?", a: "Every other area here is a vertical specialism (DP, AML, AI, etc.). GRC is horizontal — it's the framework that governs how an organisation manages all of them. A Head of GRC probably has a DPO, CISO, and MLRO reporting to them, or sits alongside them in a risk committee." },
      { q: "What's the ceiling in GRC?", a: "Chief Risk Officer (CRO) or Chief Compliance Officer (CCO) at a regulated firm — both C-suite, both well-compensated (£200k–£500k+ at large financial institutions). The path is long (10–15 years) but the roles are stable and high-status." },
      { q: "Do I need to be technical?", a: "Less so than cyber, but increasingly yes at the senior end. Understanding IT controls, cloud risk, and AI governance is becoming expected. The good news: GRC practitioners who can hold a technical conversation are rare and well-rewarded; you don't need to code, just translate." },
    ],
  },
];

window.AREAS.sort(function (a, b) {
  return a.label.localeCompare(b.label, "en", { sensitivity: "base" });
});
