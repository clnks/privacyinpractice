/* === Privacy in Practice — Career hub (discipline-filtered) === */

const CAREER_AREAS_META = [
  { id: "dp",      label: "Data Protection",      glyph: "§"  },
  { id: "ai",      label: "AI Governance",         glyph: "◬"  },
  { id: "aml",     label: "AML & Financial Crime", glyph: "⚑"  },
  { id: "conduct", label: "Financial Conduct",     glyph: "¶"  },
  { id: "cyber",   label: "Cyber Security",        glyph: "⊗"  },
  { id: "fintech", label: "FinTech Regulation",    glyph: "◇"  },
];

// ─── shared helpers ────────────────────────────────────────────────────────
function cvSection(id, groups) {
  return { id: "cv", label: "CV checklist", kicker: "Get past the screen",
    blurb: "A self-review pass before you submit. Check every item before applying.", kind: "checklist", groups };
}
function starSection() {
  return {
    id: "star", label: "STAR prep", kicker: "Behavioural answers, structured",
    blurb: "Pre-write four STAR stories before the interview. Pull from work, study, or volunteer experience.",
    kind: "star",
    themes: [
      { theme: "Pushing back on a stakeholder", prompt: "Tell me about a time you had to deliver an unwelcome message to someone senior.", fields: ["Situation (one sentence — what, when, who)", "Task (your specific responsibility)", "Action (the 2–3 things YOU did — not the team)", "Result (measurable outcome + what you'd do differently)"] },
      { theme: "Working with ambiguity", prompt: "Describe a time you had to make a decision without clear guidance.", fields: ["Situation", "Task", "Action", "Result"] },
      { theme: "Cross-functional collaboration", prompt: "Tell me about a time you worked across legal, product, or engineering.", fields: ["Situation", "Task", "Action", "Result"] },
      { theme: "Learning something fast", prompt: "Describe a time you had to get up to speed on an unfamiliar regulation or technology quickly.", fields: ["Situation", "Task", "Action", "Result"] },
    ],
  };
}

// ═══════════════════════════════════════════════════════════════════════════
// DATA PROTECTION
// ═══════════════════════════════════════════════════════════════════════════
const AREA_DP = {
  intro: "The UK data protection job market is maturing fast — driven by ICO enforcement, the Data (Use & Access) Act 2025, and rising AI governance demand. Strong knowledge of UK GDPR paired with operational artefacts (DPIAs, ROPAs, breach playbooks) consistently wins interviews. BCS Practitioner or CIPP/E within the first year is now table stakes for most DPO-track roles.",
  sections: [
    cvSection("cv", [
      { head: "Headline & summary", items: [
        "Job title reflects the role you're applying for (DPO, Data Protection Analyst, Privacy Manager) — not a generic 'Compliance Professional'.",
        "Three-line summary names a specific framework (UK GDPR, ISO 27701) and a measurable artefact (DPIA, ROPA, breach playbook).",
        "If transitioning, say so honestly — 'transitioning into data protection from [X]' — and lean on transferable evidence.",
      ]},
      { head: "Experience entries", items: [
        "Each bullet starts with a verb (drafted, embedded, audited, led, advised).",
        "Each bullet contains a NUMBER — records reviewed, DSARs closed, jurisdictions covered. If it doesn't, ask whether it should.",
        "ICO terminology used precisely: 'controller' / 'processor', 'Article 6(1)(f)', 'special category data'. Avoid 'GDPR data'.",
        "Tooling named: OneTrust, TrustArc, Microsoft Purview, ServiceNow, Securiti — whichever you've used.",
      ]},
      { head: "Certifications", items: [
        "Certs in order of relevance: CIPP/E or BCS Practitioner for legal-led roles; CIPM for operational; AIGP for AI-adjacent; CIPT for engineering-adjacent.",
        "In-progress certs labelled '(expected MMM YYYY)' — not 'in progress' with no date.",
        "ICO free courses worth a line: 'Introduction to Data Protection', ENISA materials.",
      ]},
      { head: "Portfolio link", items: [
        "Single, working URL at the top of the CV (GitHub Pages or LinkedIn featured section).",
        "Portfolio loads on mobile. Link goes directly to artefacts — not a landing page that hides them three clicks deep.",
      ]},
      { head: "Formatting & ATS", items: [
        "One page if <8 years' experience, two pages otherwise.",
        "No tables, text boxes, or columns — ATS readers mangle them. Plain left-aligned text.",
        "Saved as PDF with selectable text. Filename: Firstname-Lastname-CV.pdf.",
      ]},
    ]),
    {
      id: "questions", label: "Interview Q-bank", kicker: "What actually comes up",
      blurb: "Common UK data protection interview questions. The sample answer shows the shape of a strong response — not a script.",
      kind: "qa",
      items: [
        { q: "Walk me through what happens when a personal data breach is discovered.", a: "Contain first — revoke access, take a system offline. Then assess: confirm personal data is in scope, identify categories of subjects and records, work out the likely risk to rights and freedoms. The 72-hour ICO clock starts at AWARENESS, not at incident time. If risk is unlikely, document and don't notify. If notification is required, get it in within 72 hours even if incomplete. Flag whether risk to individuals is HIGH — that's the trigger for telling them. Log everything in the breach register either way." },
        { q: "How do you handle a DSAR from a current employee who's clearly building a grievance file?", a: "It's still a valid request — process it. Acknowledge within a few days, verify identity if needed, scope the search carefully. The requester's motive doesn't change the work. The legitimate concern is third-party data in HR records: redact carefully. Watch for legal privilege material from employment counsel — that's exempt. If the request is genuinely unreasonable or repetitive, document that and consider whether 'manifestly unfounded' applies — but the bar is high." },
        { q: "A product team wants to use a new third-party AI vendor. What's your process?", a: "Three parallel questions: (1) Is this likely high-risk processing? If yes, DPIA before deployment, not after. (2) What's the role split — controller, processor, joint controllers? Article 28 contract needs to match. (3) Where is the data going? International transfer mechanism (IDTA, SCCs with TIA). For AI specifically: training-data lineage, model outputs as personal data, Article 22 if there are solely-automated significant decisions, EU AI Act risk class if relevant." },
        { q: "Tell me about a time you had to push back on a senior stakeholder.", a: "STAR format. Situation: a marketing team wanted to repurpose customer support transcripts for product training. Action: ran a quick LIA — there was a legitimate interest in product improvement, but the balancing test failed (customers gave that data for support, not training; no notice given; no opt-out). Took it to the head of marketing with one slide: what the risk was, what would make it OK (refresh notices, opt-out flow, retention cap). Result: they delayed by six weeks to implement safeguards." },
        { q: "What's the difference between Article 6 and Article 9?", a: "Article 6 is the six lawful bases — at least one must apply to any processing of personal data. Article 9 is the prohibition on special category data, with ten specific conditions that lift it. The two-key rule: for special category data you need an Article 6 basis AND an Article 9 condition. They're not alternatives." },
        { q: "How would you set up a privacy programme from scratch?", a: "Six things in the first 90 days: (1) Inventory — where is personal data, who owns it, who processes it? Start a ROPA. (2) Lawful basis register. (3) DSAR process — write it down, name a rota, set SLAs. (4) Breach playbook — who calls who, decision tree, ICO template ready. (5) DPIA gate — wire it into the change/intake process. (6) Training — pick the top three risk areas and run a session." },
        { q: "What do you think of the ICO's current enforcement priorities?", a: "Look up the latest ICO plan before the interview — they publish one. Recent themes: children's data, AI, employee monitoring, cookie consent enforcement, public-sector accountability. Name TWO specific actions you've read about and what you took from them. Avoid generic 'fines are getting bigger'." },
        { q: "Why data protection? Why now?", a: "Answer for yourself. Strong shape: a specific moment that crystallised the interest, a current trajectory already underway (study, portfolio, certifications), and an honest read on where the field is going (AI governance, transfers, ICO's enforcement pivot). Don't open with 'I am passionate about privacy.'" },
      ],
    },
    starSection(),
    {
      id: "mocks", label: "Mock prompts", kicker: "Practice cold",
      blurb: "Set a timer for 45 minutes. Answer aloud. Record yourself if you can stand to listen back.",
      kind: "list",
      groups: [
        { head: "Scenario prompts (10–15 mins each)", items: [
          "A processor reports a breach to you 5 days after they became aware. What's your call?",
          "Marketing want to send a re-engagement email to lapsed customers from 2019. Talk me through your analysis.",
          "Your CEO wants to deploy a generative AI tool internally next month. What questions do you need answered before you sign off?",
          "A subject sends a DSAR demanding all CCTV footage of them across 47 sites for the last 12 months. What do you actually do?",
        ]},
        { head: "Knowledge prompts (5 mins each)", items: [
          "Explain the difference between a controller and a processor with a real-world example.",
          "Walk me through the 6 lawful bases and when each fits best.",
          "When is a DPIA legally mandatory?",
          "What's the relationship between UK GDPR and the DPA 2018?",
        ]},
      ],
    },
    {
      id: "portfolio", label: "Portfolio artefacts", kicker: "Show the work",
      blurb: "Aim for 4–6 strong pieces, not 20 thin ones. These are the artefacts you'd produce in a real role.",
      kind: "templates",
      items: [
        { name: "DSAR template + handling guide", purpose: "Demonstrates you understand the full lifecycle: receipt, ID verification, scope, search, redaction, response.", contents: "Acknowledgement letter · ID verification request · scope confirmation · redaction matrix · response letter · log entry" },
        { name: "DPIA (worked example)", purpose: "Pick a hypothetical (employee monitoring tool, customer-facing chatbot). Run a full Article 35-compliant DPIA.", contents: "Processing description · necessity & proportionality · risk register · mitigations · residual-risk position · review schedule" },
        { name: "Breach playbook", purpose: "Shows decision-making under pressure. The artefact a hiring manager will assume you have.", contents: "Awareness trigger · containment steps · severity assessment · 72-hour ICO template · individual-notification template · post-incident review" },
        { name: "ROPA (one division)", purpose: "Article 30 records — controller and processor versions for a single team.", contents: "Processing activity · purposes · categories of subjects · categories of data · recipients · transfers · retention · security" },
        { name: "ICO enforcement case study (×3)", purpose: "Shows you read the source material. Pick three decisions; summarise what happened and what should have happened.", contents: "Facts · Article(s) breached · ICO finding · fine/sanction · what the org should have done differently" },
      ],
    },
    {
      id: "salary", label: "Roles & salary (UK)", kicker: "Rough ranges, London-weighted",
      blurb: "Based on Reed, IAPP UK Salary Survey, LinkedIn, and recruiter conversations (2024–26). London adds 10–25%. Public sector pays 20–30% less but is steadier.",
      kind: "ladder",
      rows: [
        { role: "Data Protection Analyst / Officer (entry)", exp: "0–2 yrs", range: "£28k–£42k", note: "CIPP/E or BCS Practitioner expected within year 1." },
        { role: "Data Protection Manager", exp: "3–6 yrs", range: "£45k–£65k", note: "Owns the programme day-to-day. Usually reports to a DPO or Head of Compliance." },
        { role: "Senior DP Manager / Lead", exp: "5–8 yrs", range: "£60k–£85k", note: "Cross-jurisdictional, complex DPIAs, board-facing on incidents." },
        { role: "DPO (mandatory or designated)", exp: "6–10 yrs", range: "£75k–£120k", note: "Statutory role for many orgs. Independence requirements matter." },
        { role: "Head of Privacy / Group DPO", exp: "8–12 yrs", range: "£100k–£160k+", note: "Multi-entity, multi-jurisdiction. Often paired with CISO or General Counsel." },
        { role: "AI Governance Lead / Privacy Engineer", exp: "varies", range: "£70k–£140k", note: "Hybrid role between privacy, security, and ML. Often pays above DPO at the same seniority." },
      ],
    },
    {
      id: "employers", label: "UK employers worth tracking", kicker: "Where the roles are",
      blurb: "Orgs that consistently advertise DP/privacy roles or have well-known DP teams. Set LinkedIn alerts on their careers pages.",
      kind: "employers",
      groups: [
        { head: "Regulators & public bodies", items: ["ICO (Wilmslow)", "Bank of England", "FCA", "MHRA", "Ofcom", "NHS England", "Cabinet Office (CDDO)", "HMRC", "DWP"] },
        { head: "Financial services", items: ["Lloyds Banking Group", "HSBC", "NatWest", "Barclays", "Monzo", "Starling", "Revolut", "Wise", "Aviva", "Legal & General"] },
        { head: "Tech & platforms", items: ["DeepMind / Google UK", "Microsoft UK", "Meta UK", "Amazon UK", "Cloudflare UK", "Stripe UK", "Wise", "Octopus Energy"] },
        { head: "Health & charities", items: ["GSK", "AstraZeneca", "Wellcome Trust", "Cancer Research UK", "Genomics England", "Macmillan"] },
        { head: "Consultancies & law firms", items: ["Bird & Bird", "Fieldfisher", "Hogan Lovells", "PwC", "Deloitte", "KPMG", "EY", "OneTrust (DataGuidance)"] },
      ],
    },
    {
      id: "network", label: "Networking & communities", kicker: "Show up, then keep showing up",
      blurb: "The UK DP community is small and welcoming. Three months of consistent presence is worth more than ten CV applications.",
      kind: "network",
      items: [
        { name: "IAPP KnowledgeNet — London chapter", kind: "In-person", cost: "Free with IAPP membership", note: "Quarterly meetups in central London. Mix of in-house DPOs, lawyers, and tech privacy people." },
        { name: "Data Protection Network (DPN)", kind: "Online", cost: "Free", note: "UK-focused newsletter and forum. Excellent for staying current on ICO + tribunal decisions." },
        { name: "PrivSec Global", kind: "Conference", cost: "Paid (free passes exist)", note: "Annual London event. Useful for mapping who's who in UK privacy." },
        { name: "LinkedIn — UK DP community", kind: "Online", cost: "Free", note: "Follow Robert Bateman, Jon Baines, Tim Turner. Comment thoughtfully; don't lurk." },
        { name: "ICO Webinars & SME briefings", kind: "Online", cost: "Free", note: "Recordings on ICO YouTube. Useful for understanding the regulator's current line." },
        { name: "GDPR Hub editor community", kind: "Contribute", cost: "Free", note: "Write a case summary; gets your name on a respected resource. Visible to the EU community too." },
      ],
    },
  ],
};

// ═══════════════════════════════════════════════════════════════════════════
// AI GOVERNANCE
// ═══════════════════════════════════════════════════════════════════════════
const AREA_AI = {
  intro: "AI governance is the fastest-growing specialist discipline in UK compliance. The EU AI Act has landed, enterprise demand for AI ethics oversight is structural, and the combination of legal, technical, and ethical skills is rare enough to command premium salaries. The role doesn't yet have a clean title — you'll see 'AI Governance Lead', 'Responsible AI Manager', 'AI Ethics Officer', and 'AI Compliance Manager' all describing similar work.",
  sections: [
    cvSection("cv", [
      { head: "Headline & summary", items: [
        "Title reflects AI governance specifically — not 'data analyst' or 'compliance professional'. Examples: AI Governance Lead, Responsible AI Manager, AI Ethics Officer.",
        "Summary references the EU AI Act / NIST AI RMF / ISO 42001 and a specific artefact (AI DPIA, model risk assessment, AI system card).",
        "Don't say 'AI experience' — say which systems (LLMs, ML classifiers, computer vision) and in what compliance context.",
      ]},
      { head: "Technical-legal balance", items: [
        "Demonstrates both sides: understanding of how ML systems work (training data, model outputs, behaviour) AND the regulatory framework (EU AI Act risk classes, Art. 22 GDPR).",
        "If only one side, explicitly close the gap — e.g. 'completing Stanford ML course' or 'AIGP in progress'.",
        "If you've been involved in a go/no-go decision on an AI deployment, say so. These are rare and get noticed.",
      ]},
      { head: "Certifications", items: [
        "AIGP (IAPP AI Governance Professional) is the primary cert — still early but growing fast.",
        "ISO 42001 Lead Implementer or Auditor for the standards track.",
        "CIPP/E for the GDPR-AI overlap angle. Any accredited ML course (Coursera, DeepLearning.AI) shows technical grounding.",
      ]},
      { head: "Portfolio link", items: [
        "Points to an AI system assessment, a model card, or a DPIA for an AI use case. These are rare in portfolios and differentiate strongly.",
        "One genuinely worked example beats five thin ones.",
      ]},
    ]),
    {
      id: "questions", label: "Interview Q-bank", kicker: "What actually comes up",
      blurb: "Common UK AI governance interview questions with the shape of a strong answer.",
      kind: "qa",
      items: [
        { q: "Walk me through how you would classify an AI system under the EU AI Act.", a: "Start with the prohibited list — some systems are banned outright (real-time biometric ID in public spaces, social scoring). Then work through Annex III high-risk categories: biometric categorisation, education, employment, access to essential services, law enforcement, migration, justice. For each: is this system within the category AND making or informing a decision with significant impact? High-risk triggers a full conformity assessment: technical documentation, data governance, human oversight mechanism, accuracy metrics, transparency obligations, post-market monitoring." },
        { q: "A product team wants to deploy a customer support chatbot powered by a generative AI model. What questions do you need answered?", a: "Seven minimum: (1) Does it access personal data, and whose? → data flow map. (2) Does it make or materially influence decisions with significant effects? → Art. 22 trigger. (3) Where is the model hosted? → international transfer check. (4) What training data was used? → consent/lineage. (5) What outputs are generated — hallucination risk? (6) Is there a human escalation path? (7) EU AI Act status — does the firm also operate in the EU? This is DPIA territory at minimum." },
        { q: "What is Article 22 of UK GDPR and when does it actually apply in practice?", a: "Art. 22 provides a right not to be subject to solely automated decisions with legal or similarly significant effects. In practice: automated credit scoring, algorithmic hiring screens, insurance pricing bots, fraud detection blocks, benefit eligibility systems. NOT chatbots, recommendation engines, or spam filters. When it applies: you need explicit consent, contract necessity, or legal authorisation; plus a human review mechanism, ability to contest, and explanation of logic." },
        { q: "How would you approach a bias audit for a hiring algorithm?", a: "Define 'bias': statistical (different error rates across demographic groups) or outcome bias (different selection rates). Gather training data and check whether protected characteristics or proxies (postcode, name, school) appear. Test for disparate impact: different selection or rejection rates across groups. Run disaggregated performance metrics. Mitigation: remove proxies, re-weight training data, apply fairness constraints, test retrained model. Document the audit. In the EU, an employment AI system is high-risk under the AI Act and audit documentation is mandatory." },
        { q: "How does the NIST AI Risk Management Framework relate to the EU AI Act?", a: "Complementary. NIST AI RMF (Map, Measure, Manage, Govern) is a voluntary risk management framework providing structured lifecycle risk management. The EU AI Act is mandatory for covered systems with specific legal obligations. In practice: use NIST RMF as the internal operating model — it's more granular. Use the AI Act as the minimum regulatory floor. NIST Map = identify use case and context; Measure = test for harms the Act cares about; Manage = the controls the Act requires; Govern = the governance structure for conformity assessment." },
        { q: "Tell me about a time you recommended against deploying an AI system.", a: "STAR format. The key shape: you identified a specific risk (trained on insufficiently consented data, Art. 22 decision without adequate human oversight, high-risk classification without conformity documentation), recommended delay or discontinuation with a documented remediation path, and the business accepted it. Show you made a reasoned, documented decision — not just a veto on instinct." },
        { q: "What will be the biggest AI governance challenge in the next two years?", a: "Have an opinion. Strong themes: (1) Extraterritorial scope — the EU AI Act applies to systems producing outputs in the EU even if built outside it; global firms must classify their entire AI estate. (2) The gap between conformity assessment on paper and real operational monitoring. (3) AI procurement — when you buy a third-party AI system, are you the deployer or provider? (4) UK-EU divergence — the UK didn't adopt the AI Act; its own framework is still forming, creating a patchwork for cross-border firms." },
      ],
    },
    starSection(),
    {
      id: "mocks", label: "Mock prompts", kicker: "Practice cold",
      blurb: "Set a timer. Answer aloud. Record yourself.",
      kind: "list",
      groups: [
        { head: "Scenario prompts", items: [
          "A development team wants to use customer data to fine-tune a commercial LLM. Walk me through your review.",
          "The board wants a monthly 'AI risk dashboard'. What metrics would you track and why?",
          "A third-party AI vendor claims their system is not high-risk under the EU AI Act. How do you validate that?",
          "Your firm uses an AI model to flag fraud — it has a 15% false positive rate. What are the compliance implications?",
        ]},
        { head: "Knowledge prompts", items: [
          "What is a model card and what should it contain?",
          "Explain the EU AI Act's four risk tiers with one example each.",
          "When does GDPR apply to AI model outputs?",
          "What is ISO 42001 and who should pursue it?",
        ]},
      ],
    },
    {
      id: "portfolio", label: "Portfolio artefacts", kicker: "Show the work",
      blurb: "AI governance artefacts are genuinely rare in candidate portfolios. One strong piece will differentiate you significantly.",
      kind: "templates",
      items: [
        { name: "AI System Risk Assessment (EU AI Act framework)", purpose: "Demonstrate you can classify an AI system, apply the Act's framework, and produce conformity documentation.", contents: "Use case description · Risk class determination · Technical documentation checklist · Data governance statement · Transparency notice · Human oversight mechanism · Post-market monitoring plan" },
        { name: "DPIA for an LLM Deployment", purpose: "Most AI systems involving personal data need a DPIA. Demonstrate you can run one for a realistic LLM use case.", contents: "Processing description · Data flows · Necessity and proportionality · Risk register (Art. 22, hallucination, data exfiltration) · Mitigations · Residual risk sign-off" },
        { name: "Model Card (× 2 examples)", purpose: "Model cards are the standard transparency artefact in ML governance. Producing one for a hypothetical shows you understand both technical and compliance dimensions.", contents: "Model description · Intended use · Out-of-scope uses · Training data lineage · Evaluation metrics · Fairness metrics by subgroup · Limitations" },
        { name: "AI Acceptable Use Policy", purpose: "Many orgs lack a clear internal AI policy. Drafting one shows strategic thinking.", contents: "Scope · Approved/prohibited tool classes · Data classification rules for AI inputs · Human oversight requirements · Breach escalation · Review cadence" },
        { name: "Article 22 Explainability Notice", purpose: "When Art. 22 applies, individuals need to understand the logic. Draft one for a realistic use case (credit decision, insurance quote).", contents: "Plain-language process description · Factors considered · Right to contest procedure · Human review process" },
      ],
    },
    {
      id: "salary", label: "Roles & salary (UK)", kicker: "Rough ranges",
      blurb: "AI governance salaries are still forming — expect wide variance by sector and company stage. Tech and financial services pay significantly above public sector.",
      kind: "ladder",
      rows: [
        { role: "AI Governance Analyst (entry)", exp: "0–2 yrs", range: "£32k–£50k", note: "Often embedded in a privacy or risk team. AI-specific remit may be partial." },
        { role: "AI Compliance Manager", exp: "3–6 yrs", range: "£60k–£90k", note: "Programme ownership. Conformity assessment, DPIA pipeline for AI projects." },
        { role: "AI Ethics / Responsible AI Lead", exp: "5–9 yrs", range: "£80k–£120k", note: "Strategy-level. Likely reporting to C-suite or board." },
        { role: "Head of AI Governance", exp: "8–12 yrs", range: "£100k–£160k", note: "Cross-business. Often owns the AI ethics framework and regulatory relationships." },
        { role: "AI Governance Director / VP", exp: "10+ yrs", range: "£150k–£220k+", note: "Board-facing at large tech or FS firms. Equity upside at scale-ups." },
      ],
    },
    {
      id: "employers", label: "UK employers worth tracking", kicker: "Where the roles are",
      blurb: "AI governance is growing fastest in big tech, financial services, and the regulator ecosystem.",
      kind: "employers",
      groups: [
        { head: "Big tech", items: ["DeepMind / Google UK", "Microsoft UK", "Meta (London AI policy)", "Amazon AWS UK", "Apple UK", "Palantir UK"] },
        { head: "AI-native firms", items: ["Anthropic UK", "Stability AI", "Wayve", "Darktrace", "Luminance", "Faculty AI"] },
        { head: "Regulators & advisory", items: ["ICO (AI & Innovation unit)", "FCA (digital sandbox)", "CMA (AI task force)", "Ofcom", "DSIT", "CDEI"] },
        { head: "Consultancies & law firms", items: ["Bird & Bird (AI practice)", "Bristows", "CMS", "Deloitte AI risk", "PwC responsible AI"] },
        { head: "Finance & health", items: ["Goldman Sachs (AI risk)", "JP Morgan (AI governance)", "NHS AI Lab", "NICE", "Aviva (data science governance)"] },
      ],
    },
    {
      id: "network", label: "Networking & communities", kicker: "Where to be seen",
      blurb: "AI governance is a new enough field that the community is accessible — show up early.",
      kind: "network",
      items: [
        { name: "Ada Lovelace Institute", kind: "Research / events", cost: "Free", note: "Independent research body on AI ethics. Excellent bias/accountability reports. Watch their events calendar." },
        { name: "IAPP AI Governance Center", kind: "Online + events", cost: "Free / IAPP membership", note: "Global network, UK-active. AIGP cert prep community. Follow their AI governance newsletter." },
        { name: "Alan Turing Institute", kind: "Academic events", cost: "Free (most)", note: "Cross-sector AI governance discussions open to practitioners. Good for academic-practitioner crossover." },
        { name: "AI Safety Institute briefings", kind: "UK Government", cost: "Free", note: "AISI runs practitioner briefings and publishes evaluation frameworks. Sign up for updates." },
        { name: "Partnership on AI (PAI)", kind: "Online", cost: "Free", note: "Multi-stakeholder body. UK members include major tech firms. Useful for understanding industry consensus positions." },
        { name: "LinkedIn — UK AI governance", kind: "Online", cost: "Free", note: "Follow Sandra Wachter, David Leslie, Michael Veale, Lilian Edwards. Comment on enforcement and policy updates." },
      ],
    },
  ],
};

// ═══════════════════════════════════════════════════════════════════════════
// AML & FINANCIAL CRIME
// ═══════════════════════════════════════════════════════════════════════════
const AREA_AML = {
  intro: "AML is one of the best-established compliance disciplines in UK financial services — the statutory framework is clear (POCA 2002, Terrorism Act 2000, MLR 2017), the MLRO role is legally defined, and demand is structural. The entry path is more accessible than people expect: a good ICA Certificate or ACAMS CAMS, strong analytical ability, and evidence you can write a credible SAR are enough to land your first role.",
  sections: [
    cvSection("cv", [
      { head: "Headline & summary", items: [
        "Use the exact title: MLRO, AML Analyst, Financial Crime Investigator, KYC Officer — not generic 'compliance professional'.",
        "Summary mentions the specific sector (banking, crypto, payments, legal) and framework (POCA 2002, MLR 2017, FATF Recommendations).",
        "If in crypto/VASP: name the specific coins or products your firm handled — this is a differentiator in a fast-growing niche.",
      ]},
      { head: "Experience entries", items: [
        "Names the type of alerts worked (transaction monitoring, screening, EDD) and the platform (World-Check, HAWK:AI, Quantexa, Featurespace).",
        "Quantified: 'Reviewed 40+ alerts per week', 'SAR submissions to NCA: 12 per month', 'EDD files completed: 80+ per quarter'.",
        "AML vocabulary used correctly: CDD/EDD, PEPs, sanctions screening, SAR, DAML, tipping-off, FATF grey list. Generic 'compliance' language is a red flag.",
      ]},
      { head: "Certifications", items: [
        "ICA Certificate or Diploma in AML — the most recognised entry-level qualification.",
        "ACAMS CAMS — international standard, valued highly at large FS firms.",
        "CFCS (for fraud overlap) or ACAMS Crypto Compliance Specialist for VASP roles.",
        "FCA registration may be required for Deputy MLRO and MLRO roles at some firms.",
      ]},
      { head: "Portfolio / evidence", items: [
        "SAR template (anonymised), a transaction monitoring typology writeup, or a CDD/EDD policy extract are rare in portfolios and get noticed.",
        "If you've done a written assessment for a previous role — a well-presented version of that is strong evidence.",
      ]},
    ]),
    {
      id: "questions", label: "Interview Q-bank", kicker: "What actually comes up",
      blurb: "Common UK AML interview questions. Show you know the process, not just the theory.",
      kind: "qa",
      items: [
        { q: "Walk me through what happens from the moment a transaction monitoring alert fires to the point of submitting or closing a SAR.", a: "Alert fires → analyst review within SLA (typically 24–72 hours). Step 1: context check — is the alert consistent with expected behaviour, profile, and declared purpose? Step 2: enhanced research — open source, internal data, correspondent data if available. Step 3: decision. If no suspicion: close with documented rationale. If suspicion exists: raise to the MLRO with a written internal SAR. MLRO assesses, determines whether to submit to NCA via SARs Online. Once submitted, a 7-working-day moratorium begins — no tipping off, no processing the transaction until DAML consent or moratorium expires. Everything logged in the SAR register." },
        { q: "What is a DAML, when do you need one, and how long do you have to wait?", a: "Defence Against Money Laundering. A DAML is a SAR submitted to the NCA to obtain consent to proceed with a transaction you suspect involves proceeds of crime. Without it, proceeding could be a criminal offence under s.328 POCA 2002. Timeline: once submitted, a 7-working-day moratorium begins during which the NCA may respond. If no response after 7 days, you can proceed. If refused, the NCA has a further 31 days to investigate and seek a court order. File early, flag urgency, document your compliance with the moratorium." },
        { q: "How do you approach Customer Due Diligence for a high-value customer in a high-risk jurisdiction?", a: "Standard CDD applies to all customers: identity verification, beneficial ownership, nature of the business relationship. For high-risk, you move to Enhanced Due Diligence under Reg. 33 MLR 2017: senior management approval, additional information on source of funds and wealth, enhanced ongoing monitoring. PEP status triggers mandatory EDD regardless of risk rating. FATF grey and black list countries trigger automatic EDD. You're building a risk file: documented source of wealth, source of funds, beneficial ownership to UBO level, adverse media, sanctions screening. Everything must survive a regulatory inspection." },
        { q: "What's the difference between CDD and EDD, and what triggers each?", a: "CDD (Customer Due Diligence) is the baseline for all customers: identity verification, beneficial ownership, purpose of the relationship, ongoing monitoring. EDD (Enhanced Due Diligence) is required for higher-risk relationships: high-risk jurisdictions, PEPs, complex ownership structures, unusual transactions inconsistent with profile. EDD = more information, more verification, more senior sign-off, more frequent review. Reg. 33-35 MLR 2017 sets out EDD requirements. Simplified Due Diligence applies to lower-risk situations — lighter touch, but you can never skip CDD entirely." },
        { q: "How would you write a SAR that the NCA will actually act on?", a: "The NCA is explicit: good SARs are specific, factual, action-orientated. Structure: who (full identifying details), what (the specific suspicious activity), when (dates, amounts), why it's suspicious (your analysis — what's the suspected predicate offence?), what action you need. Avoid: vague language, over-long narrative, failing to identify the predicate offence. If it's a DAML: clearly mark it and state what transaction needs consent. Common mistakes: submitting on a closed account (no action possible), burying the suspicion in paragraph 7, failing to specify the predicate offence." },
        { q: "How do you handle a situation where you suspect a colleague is involved in financial crime?", a: "Don't discuss it with the colleague — tipping off is a criminal offence under s.333A POCA 2002. Escalate directly to the MLRO. Document everything: when you became aware, what you observed, what data supports it. The MLRO determines whether to submit an internal SAR and involve HR, legal, and potentially the regulator or law enforcement. If the MLRO is the suspected person: go directly to senior management, legal, or the regulator. Preserve documents. The instinct to 'sort it internally' first is wrong — statutory reporting obligations override it." },
        { q: "What are the FCA's current financial crime enforcement priorities?", a: "Read the FCA's most recent Financial Crime Annual Report before any interview — it publishes league tables of SARs by sector and enforcement themes. Current themes: crypto/VASP AML controls (a high proportion of recent enforcement), sanctions compliance, trade finance, professional enablers (law firms, accountants, estate agents). The FCA's Dear CEO letters for your target sector are essential reading — they signal supervisory focus explicitly." },
      ],
    },
    starSection(),
    {
      id: "mocks", label: "Mock prompts", kicker: "Practice cold",
      blurb: "Set a timer. Answer aloud. Record yourself.",
      kind: "list",
      groups: [
        { head: "Scenario prompts", items: [
          "You receive an alert for a £47,000 international wire to a FATF grey-list country from a customer whose declared purpose is 'import/export'. What do you do?",
          "A long-standing customer suddenly starts receiving multiple cash deposits just below the £10,000 reporting threshold. Walk me through your analysis.",
          "Your firm is onboarding a foreign PEP who is a relative of a head of state. What EDD steps do you take?",
          "A colleague tells you they're 'pretty sure' a client is laundering money but hasn't filed anything. How do you respond?",
        ]},
        { head: "Knowledge prompts", items: [
          "What are the three stages of money laundering? Give a real-world example of each.",
          "What is the difference between a SAR and a DAML?",
          "Name five red flags for trade-based money laundering.",
          "What is the FATF and what does a grey-list designation mean in practice?",
        ]},
      ],
    },
    {
      id: "portfolio", label: "Portfolio artefacts", kicker: "Show the work",
      blurb: "AML portfolios are rare — most candidates rely only on certifications. One artefact sets you apart.",
      kind: "templates",
      items: [
        { name: "SAR (Suspicious Activity Report) template", purpose: "Shows you can write a structured, actionable SAR that the NCA would receive positively.", contents: "Subject identifying information · Transaction description · Basis of suspicion · Predicate offence · Supporting information · DAML flag if applicable" },
        { name: "CDD / EDD Policy extract", purpose: "Policy-writing is a core MLRO-level skill. A well-structured CDD policy shows depth.", contents: "Scope · Verification requirements by customer type · EDD triggers · PEP procedure · FATF jurisdiction list application · Ongoing monitoring schedule" },
        { name: "Transaction monitoring typology write-up (× 2)", purpose: "Typology reports show you understand how specific criminal schemes work. Common in interviews.", contents: "The scheme (e.g. cuckoo smurfing, trade-based ML) · Typology indicators · How it appears in transaction data · Monitoring rule description" },
        { name: "KYC risk assessment framework", purpose: "A risk-rated KYC framework demonstrates strategic thinking beyond alert review.", contents: "Risk factors matrix (jurisdiction, customer type, product, delivery channel) · Risk scoring methodology · EDD triggers · Review frequency schedule" },
      ],
    },
    {
      id: "salary", label: "Roles & salary (UK)", kicker: "Rough ranges",
      blurb: "AML salaries vary significantly by sector. Crypto and investment banking pay a premium over retail banking. MLRO is a well-compensated statutory role.",
      kind: "ladder",
      rows: [
        { role: "AML / KYC Analyst (entry)", exp: "0–2 yrs", range: "£26k–£40k", note: "Alert review, basic CDD, SAR filing. Good for building case experience." },
        { role: "Financial Crime Investigator", exp: "2–4 yrs", range: "£35k–£55k", note: "Complex cases, EDD, SAR quality ownership." },
        { role: "AML / Financial Crime Manager", exp: "4–7 yrs", range: "£50k–£80k", note: "Programme management, policy ownership, junior team oversight." },
        { role: "Deputy MLRO", exp: "6–10 yrs", range: "£70k–£110k", note: "Statutory role at regulated firms. FCA approval required at some firms." },
        { role: "MLRO (Money Laundering Reporting Officer)", exp: "8–15 yrs", range: "£90k–£160k+", note: "Legally designated. Board-facing. Full personal criminal liability." },
        { role: "Head of Financial Crime / Director", exp: "10+ yrs", range: "£120k–£200k+", note: "Typically at large FS firms or global banks with complex group structures." },
      ],
    },
    {
      id: "employers", label: "UK employers worth tracking", kicker: "Where the roles are",
      blurb: "AML roles exist across the full regulated sector — banking, payments, crypto, legal, and professional services.",
      kind: "employers",
      groups: [
        { head: "Retail & corporate banks", items: ["HSBC (large global financial crime function)", "NatWest", "Lloyds", "Barclays", "Santander UK", "Metro Bank"] },
        { head: "Challengers & payments", items: ["Monzo", "Revolut", "Wise", "Starling", "GoCardless", "Checkout.com"] },
        { head: "Crypto & VASP", items: ["Coinbase UK", "Binance", "Gemini", "Blockchain.com", "Kraken UK"] },
        { head: "Professional enablers & tech", items: ["LexisNexis Risk Solutions", "BAE Systems (NetReveal)", "NICE Actimize", "Quantexa", "Big 4 financial crime practices"] },
        { head: "Regulators & law enforcement", items: ["FCA (financial crime team)", "NCA (National Crime Agency)", "HMRC", "Serious Fraud Office", "City of London Police (ECCU)"] },
      ],
    },
    {
      id: "network", label: "Networking & communities", kicker: "Where to be seen",
      blurb: "The UK AML community is active and accessible. ACAMS and ICA events are the primary entry points.",
      kind: "network",
      items: [
        { name: "ACAMS UK Chapter", kind: "In-person + online", cost: "ACAMS membership", note: "The professional body for AML. Quarterly events in London. CAMS prep groups. Essential for serious practitioners." },
        { name: "ICA (International Compliance Association)", kind: "Online + events", cost: "Free / membership", note: "Offers the Certificate and Diploma in AML. Active practitioner community. Good for early-career networking." },
        { name: "RUSI Centre for Financial Crime", kind: "Research / events", cost: "Free (most)", note: "Think-tank. Excellent typology reports and policy briefings. Read their publications before interviews." },
        { name: "FCA Financial Crime Annual Report", kind: "Publication", cost: "Free", note: "Read it. Cite it in interviews. Not a community but treated as the practitioner's annual review." },
        { name: "Wolfsberg Group publications", kind: "Online", cost: "Free", note: "Industry consensus guidance from the major global banks. Standard reference for AML policy questions." },
        { name: "LinkedIn — UK AML", kind: "Online", cost: "Free", note: "Follow NCA SARs statistics, FATF publications, and ACAMS UK announcements. Engage with enforcement case discussions." },
      ],
    },
  ],
};

// ═══════════════════════════════════════════════════════════════════════════
// FINANCIAL CONDUCT
// ═══════════════════════════════════════════════════════════════════════════
const AREA_CONDUCT = {
  intro: "Financial conduct compliance sits at the heart of UK regulated financial services. The FCA Handbook (COBS, SYSC, PRIN, MAR) applies to thousands of regulated firms. Consumer Duty is reshaping what good looks like, SMCR has made individual accountability central, and MAR enforcement is intensifying. The path in typically runs through compliance monitoring, T&C supervision, or a risk role rather than a direct specialist hire at entry level.",
  sections: [
    cvSection("cv", [
      { head: "Headline & summary", items: [
        "Use a specific title: Compliance Officer, T&C Supervisor, Compliance Monitoring Officer, Regulatory Risk Manager — not 'compliance professional'.",
        "Summary names the FCA sourcebook you know best (COBS, SYSC, MAR) and a specific regulated activity or product type (retail investments, derivatives, consumer credit).",
        "Sector specificity matters — retail investment, wholesale/institutional, insurance, mortgage, and consumer credit are quite different. Make clear which you know.",
      ]},
      { head: "Experience entries", items: [
        "What regulated activities you monitored, what complaints you handled, what advice file reviews you conducted — quantified.",
        "'Completed 30 file reviews per month to COBS 9A suitability standard' is strong. 'Supported compliance function' is not.",
        "Names the FCA Handbook as your primary reference. Avoids generic 'financial services regulation' language.",
      ]},
      { head: "Certifications", items: [
        "FCA-relevant qualifications depend on role: CII CF1/CF2 for consumer; IMC or CFA for institutional; CISI Certificate in Compliance or ICA Diploma in Financial Services Compliance for general conduct.",
        "SMCR-specific training is worth a line if completed formally.",
        "FCA-approved person status (if held previously) should be listed explicitly with the function code.",
      ]},
      { head: "Regulatory reading", items: [
        "Shows you follow FCA publications: supervisory letters, Primary Market Bulletins, Dear CEO letters.",
        "Name two recent enforcement actions in your target sector — in the interview and ideally in the cover letter. Most candidates don't do this.",
      ]},
    ]),
    {
      id: "questions", label: "Interview Q-bank", kicker: "What actually comes up",
      blurb: "Common UK financial conduct interview questions. Show you know the Handbook, not just the headlines.",
      kind: "qa",
      items: [
        { q: "Consumer Duty came into force in July 2023. What does it actually require firms to do differently?", a: "Consumer Duty raises the standard from 'treat customers fairly' (a principles-based aspiration) to an outcomes-based obligation. Four outcomes must be demonstrated: products/services fit for purpose for the intended target market; price and value appropriate; consumers can understand the product; consumers can access support. The key shift: it's not enough to have a compliant process — firms must demonstrate the actual outcomes customers experience. That means MI, complaints data, product reviews, customer research, and board sign-off on an annual Consumer Duty assessment. It also applies to distributors, not just manufacturers." },
        { q: "What is the SMCR and how does it affect day-to-day compliance work?", a: "The Senior Managers and Certification Regime. Three tiers: Senior Managers (FCA/PRA pre-approved, individually responsible for specific prescribed responsibilities), Certified individuals (firm-certified annually as fit and proper for significant harm functions), Conduct Rules (all staff). Day-to-day: every breach investigation needs to consider whether a Senior Manager may be individually culpable and whether it needs FCA notification. Compliance teams maintain SM and certified staff registers, run annual fitness and propriety assessments, and manage the Regulatory Reference process on departures." },
        { q: "Walk me through how you would review a customer file for suitability under COBS 9A.", a: "Three stages: (1) Know Your Customer — was the information collected sufficient? Investment objectives, time horizon, financial situation, risk tolerance, knowledge and experience for the product type. (2) Was the recommendation based on that KYC? Is there documented rationale linking the customer profile to the specific product? (3) Was the product suitable? Would a reasonable adviser recommend it given the profile? Suitability failures fall into: missing KYC, profile-product mismatch, undocumented rationale, capacity for loss not assessed. Red flags: vulnerable customer indicators, large single product concentration, high-risk product for cautious risk profile." },
        { q: "A portfolio manager has made trades that appear to front-run client orders. How do you handle this?", a: "Treat as potential market abuse (MAR). Preserve evidence — do not alert the individual. Report immediately to Head of Compliance and MLRO — this may require a SAR as well as regulatory notification. Map the trades: client order timestamps, PM order timestamps, prices, position sizes. If the pattern is consistent with front-running, it's a MAR violation. FCA notification: the firm must self-report suspected market abuse under MAR Article 16. Internal investigation segregated from the PM. HR and legal involved. This is potentially criminal under FSMA 2000 or CJA 1993 — counsel needed before interviewing the individual." },
        { q: "How do you assess whether communications to retail customers are fair, clear, and not misleading under COBS 4?", a: "Three tests: fair (balanced — includes risks and limitations, not just upside), clear (readable by the target audience — plain language, not buried in footnotes), not misleading (accurate, complete, not creating a false impression). In practice: test against the target customer base (readability grade, comprehension check). Look for: returns data without risk warnings, unsuitable benchmark comparisons, past performance language, promotional vs risk disclosure imbalance. Consumer Duty has tightened this — communications must support good outcomes, not just avoid being technically accurate." },
        { q: "Tell me about a time you identified a compliance issue before it became a regulatory problem.", a: "STAR format. The shape: you were doing monitoring or review work and spotted something systemic — not just a one-off error. You escalated with documented evidence, proposed a practical fix, got traction, and measured whether it worked. Strong answers show the issue was non-obvious (pattern analysis, not a blatant breach), the fix was operational (not just a training note), and the regulatory exposure was materially reduced." },
      ],
    },
    starSection(),
    {
      id: "mocks", label: "Mock prompts", kicker: "Practice cold",
      blurb: "Set a timer. Answer aloud.",
      kind: "list",
      groups: [
        { head: "Scenario prompts", items: [
          "A client complains that their adviser recommended a high-risk fund inconsistent with their stated cautious risk appetite. Walk me through your investigation.",
          "You discover a financial promotion was sent to retail customers without being FCA-approved. What do you do?",
          "A Senior Manager tells you they've been aware of a potential breach for two weeks but didn't escalate it. What are the implications?",
          "Marketing want to use a WhatsApp group to communicate with high-net-worth clients. What's your analysis?",
        ]},
        { head: "Knowledge prompts", items: [
          "What is COBS 9A and when does it apply?",
          "Explain the four outcomes of Consumer Duty.",
          "What is a prescribed responsibility under SMCR and give two examples.",
          "When must a firm notify the FCA of a regulatory breach?",
        ]},
      ],
    },
    {
      id: "portfolio", label: "Portfolio artefacts", kicker: "Show the work",
      blurb: "Conduct compliance artefacts demonstrate you can produce the operational outputs of a real compliance function.",
      kind: "templates",
      items: [
        { name: "Compliance monitoring report (themed review)", purpose: "Shows you can design and execute a themed review — the core skill of a monitoring function.", contents: "Review scope and methodology · Sample selection · COBS/SYSC reference · Key findings · Risk rating per finding · Recommendations · Management response template" },
        { name: "Consumer Duty assessment extract", purpose: "The board-level annual Consumer Duty assessment is now a required artefact. Producing a section shows you understand outcomes-based compliance.", contents: "Target market definition · MI used · Customer outcome evidence · Gap analysis · Remediation actions · Board attestation template" },
        { name: "SMCR register template", purpose: "Every FCA-regulated firm needs this. A well-structured SMCR register demonstrates you understand the regime's mechanics.", contents: "Senior Manager register · Prescribed responsibility mapping · Certified persons register · Annual F&P assessment checklist · Conduct rules breach log" },
        { name: "FCA enforcement case analysis (× 3)", purpose: "Shows you read and understand enforcement decisions — the practitioner's primary learning source.", contents: "Firm/individual · What the FCA found · Handbook rule(s) breached · Fine/sanction · Root cause analysis · What should have happened differently" },
      ],
    },
    {
      id: "salary", label: "Roles & salary (UK)", kicker: "Rough ranges",
      blurb: "Conduct compliance salaries vary significantly by sector. Wholesale and investment banking pay a substantial premium over retail and insurance.",
      kind: "ladder",
      rows: [
        { role: "Compliance Analyst (entry)", exp: "0–2 yrs", range: "£27k–£42k", note: "File review, complaint handling, regulatory change monitoring. FCA-regulated firm." },
        { role: "Compliance Monitoring Officer / T&C Supervisor", exp: "2–4 yrs", range: "£38k–£55k", note: "Themed reviews, individual file deep-dives. Monitoring or T&C specialism." },
        { role: "Compliance Manager", exp: "4–7 yrs", range: "£52k–£80k", note: "Policy ownership, advisory work, monitoring programme design." },
        { role: "Senior Compliance Manager", exp: "6–10 yrs", range: "£70k–£100k", note: "Senior advisory, complex investigation management, FCA relationship." },
        { role: "Head of Compliance / CCO", exp: "9–14 yrs", range: "£100k–£175k", note: "Board-facing. FCA-approved Senior Manager (SMF16/17) in many firms." },
        { role: "Independent Compliance Consultant", exp: "8+ yrs (typically)", range: "£600–£1,500/day", note: "Interim or project-based. Requires a credible in-house track record." },
      ],
    },
    {
      id: "employers", label: "UK employers worth tracking", kicker: "Where the roles are",
      blurb: "Every FCA-regulated firm needs compliance. The market ranges from retail banking to boutique hedge funds.",
      kind: "employers",
      groups: [
        { head: "Retail & universal banks", items: ["Lloyds", "NatWest", "Barclays", "HSBC", "Santander UK", "Nationwide"] },
        { head: "Asset management", items: ["Schroders", "Fidelity International", "M&G", "abrdn", "Columbia Threadneedle", "Legal & General IM"] },
        { head: "Insurers", items: ["Aviva", "Prudential", "Direct Line", "RSA", "AXA UK", "Phoenix Group"] },
        { head: "Retail investment platforms", items: ["Hargreaves Lansdown", "AJ Bell", "Interactive Investor", "Nutmeg (JP Morgan)"] },
        { head: "Regulators & advisory", items: ["FCA", "PRA", "FOS (Financial Ombudsman Service)", "FSCS", "Eversheds Sutherland", "Linklaters"] },
      ],
    },
    {
      id: "network", label: "Networking & communities", kicker: "Where to be seen",
      blurb: "The UK financial conduct community is well-organised. CISI and ICA are the primary professional bodies.",
      kind: "network",
      items: [
        { name: "CISI (Chartered Institute for Securities & Investment)", kind: "Professional body", cost: "Membership", note: "The main professional body for UK securities compliance and T&C supervisors. CPD, events, qualifications." },
        { name: "ICA (International Compliance Association)", kind: "Professional body", cost: "Membership / course fee", note: "Diploma in Financial Services Compliance is well-regarded. Active practitioner community." },
        { name: "CII (Chartered Insurance Institute)", kind: "Professional body", cost: "Membership", note: "For insurance and retail investment compliance. Exams, events, CPD network." },
        { name: "FCA Connect & regulatory publications", kind: "Online", cost: "Free", note: "Dear CEO letters, sector letters, supervisory statements — read them. Name them in interviews. Most candidates don't." },
        { name: "Compliance Monitor / Compliance Week", kind: "Trade press", cost: "Subscription (some free)", note: "The practitioner trade press. Understand current themes before interviews." },
        { name: "LinkedIn — FCA compliance", kind: "Online", cost: "Free", note: "Follow FCA publications directly. Engage with enforcement analysis. The conduct community is active and visible." },
      ],
    },
  ],
};

// ═══════════════════════════════════════════════════════════════════════════
// CYBER SECURITY (GRC track)
// ═══════════════════════════════════════════════════════════════════════════
const AREA_CYBER = {
  intro: "Cyber security governance and GRC (Governance, Risk & Compliance) is a booming career path — separate from the technical operations track but equally in demand. Employers want professionals who can translate technical risk into business and regulatory language: conducting ISO 27001 audits, managing DPIAs for security risks, navigating NIS2 and DORA. The legal-technical hybrid profile commands the best salaries.",
  sections: [
    cvSection("cv", [
      { head: "Headline & summary", items: [
        "Title reflects GRC specifically: Cyber GRC Analyst, Information Security Manager, Cyber Risk Manager — not just 'IT security' or 'security analyst'.",
        "Summary names the primary framework (ISO 27001, NIST CSF 2.0, Cyber Essentials) and a delivered outcome (led ISO 27001 gap assessment, implemented NIS2 programme, achieved Cyber Essentials Plus).",
        "Pure technologists without regulatory literacy are being passed over for GRC roles. Show both sides.",
      ]},
      { head: "Experience entries", items: [
        "Names the standard implemented (ISO 27001, CIS Controls, NIST CSF), the sector, and the scope.",
        "'Led audit of 12 control domains against ISO 27001:2022 Annex A' is specific. 'Supported the security team' is not.",
        "Names tooling: Qualys, Nessus, Microsoft Sentinel, CrowdStrike Falcon, Tenable. Shows you've been hands-on.",
      ]},
      { head: "Certifications", items: [
        "CISSP — gold standard for senior GRC. Requires 5 years' experience but worth working toward.",
        "CISM (ISACA) — management-focused, well-regarded for GRC roles.",
        "CompTIA Security+ or CySA+ for entry. CCSP for cloud. SC-100 for Azure-heavy environments.",
        "BCS Practitioner in Information Security for UK public sector and DP-overlap roles.",
      ]},
      { head: "Portfolio link", items: [
        "Points to a risk assessment, controls framework implementation plan, or ISO 27001 gap analysis. These are rare and get noticed.",
        "An incident response playbook is also strong evidence of operational thinking.",
      ]},
    ]),
    {
      id: "questions", label: "Interview Q-bank", kicker: "What actually comes up",
      blurb: "Common UK cyber GRC interview questions. Show regulatory fluency alongside technical understanding.",
      kind: "qa",
      items: [
        { q: "Walk me through how you would conduct an ISO 27001 gap assessment for a mid-sized firm.", a: "Four phases. Phase 1: Define scope — what information assets, systems, and processes are in scope? Most firms get this wrong: too narrow (just IT) or too broad (impossible to manage). Phase 2: Baseline assessment — review current controls against ISO 27001:2022 Annex A (93 controls across 4 themes: organisational, people, physical, technological). Rate each: implemented / partially implemented / not implemented. Phase 3: Risk assessment — identify risks, assess likelihood and impact, determine treatment options. Phase 4: Gap report — what's missing, the remediation roadmap, and the resource ask. ISO 27001 is process-led — you can have great security and fail the audit because the process isn't documented." },
        { q: "What does NIS2 require that NIS1 didn't, and which sectors are now in scope?", a: "NIS2 (October 2024) significantly expanded scope and tightened obligations. New essential sectors added: public administration, space. New important sectors: postal, waste management, chemicals, food, medical devices, digital providers. Key changes: supply chain security now explicit, vulnerability disclosure required, 24-hour early warning / 72-hour formal notification timelines (down from 72 hours), director personal liability introduced — leadership can be held individually responsible. Penalties: up to €10m or 2% global turnover for essential entities." },
        { q: "A ransomware attack hits the organisation at 3am. Walk me through the first 6 hours of your response.", a: "Hours 0–1: activate incident response plan. Isolate affected systems — segment, don't just shut down (preserve evidence). Identify scope: what's encrypted, what's clean, any evidence of data exfiltration before encryption? Hours 1–3: convene incident team — CISO, legal, comms, IT. Brief senior leadership. Check cyber insurance policy requirements. Hours 3–6: assess notification obligations — if personal data involved, 72-hour ICO clock starts now. Prepare first ICO notification (you can update it). Don't pay ransom without legal advice — payment may be sanctionable. Preserve logs. Engage forensics firm if needed." },
        { q: "What is the ICO's security principle under UK GDPR and how does it translate into practical controls?", a: "Article 5(1)(f) requires processing with 'appropriate technical and organisational measures' against unauthorised/unlawful processing and accidental loss. 'Appropriate' means proportionate to the risk to individuals — not just to the organisation. Practical controls: encryption at rest and in transit, access control (role-based, least privilege, MFA), logging and audit trails, staff training, breach detection, data minimisation. The ICO assesses adequacy at the time of breach — ISO 27001 is not a safe harbour, but it's strong evidence of a structured approach." },
        { q: "Explain the difference between DORA and NIS2. Which applies to your target firm?", a: "Both are EU cybersecurity frameworks, different scope. NIS2 is horizontal — applies broadly across critical sectors. DORA (January 2025) is sector-specific to financial services: banks, investment firms, insurance, crypto-asset service providers, and their ICT third-party providers. DORA has stronger requirements around ICT risk management, third-party ICT oversight (mandatory contracts, exit strategies, concentration risk), and operational resilience testing. If in FS: DORA is likely primary. If in CNI, public sector, health: NIS2 is primary. Firms in scope of both must manage both." },
        { q: "How would you build a security awareness programme that actually changes behaviour?", a: "Evidence-based approach. (1) Baseline — phishing simulation to establish current click rate. (2) Segmentation — tailor to different roles (finance, developers, HR, C-suite have different risk profiles). (3) Micro-learning — short, frequent, scenario-based. Not 45-minute slide decks. (4) Just-in-time training — when someone fails a phishing sim, give immediate feedback and a short remediation module. (5) Culture, not compliance — if the CEO bypasses MFA, the programme fails. (6) Measure: click rates AND reporting rates — people reporting suspicious emails is as important as not clicking them." },
      ],
    },
    starSection(),
    {
      id: "mocks", label: "Mock prompts", kicker: "Practice cold",
      blurb: "Set a timer. Answer aloud.",
      kind: "list",
      groups: [
        { head: "Scenario prompts", items: [
          "Your penetration test has returned a critical finding on a production system. The engineering team says they can't patch for 6 weeks. What do you do?",
          "A third-party supplier has suffered a breach that may have exposed data they hold on behalf of your organisation. Walk me through your response.",
          "The board wants to understand the firm's cyber risk in one slide. What do you show them?",
          "A developer has been storing API keys in a public GitHub repository. You discover this on a Thursday afternoon. What happens next?",
        ]},
        { head: "Knowledge prompts", items: [
          "What are the 93 Annex A control themes in ISO 27001:2022?",
          "Explain the 72-hour breach notification requirement under UK GDPR — when does the clock start?",
          "What is the NCSC's Cyber Essentials scheme and who should pursue it?",
          "What does DORA require from ICT third-party providers by January 2025?",
        ]},
      ],
    },
    {
      id: "portfolio", label: "Portfolio artefacts", kicker: "Show the work",
      blurb: "Cyber GRC artefacts show operational depth beyond certification. Even hypothetical, well-executed artefacts stand out.",
      kind: "templates",
      items: [
        { name: "ISO 27001:2022 gap assessment (hypothetical org)", purpose: "The core GRC deliverable. Shows you can assess a controls environment against the standard systematically.", contents: "Scope definition · Annex A controls reviewed · Current state rating per control · Gap narrative · Risk-based prioritisation · Estimated effort matrix" },
        { name: "Information security risk assessment", purpose: "Demonstrates risk methodology — identifying, assessing, and treating information security risks.", contents: "Asset register extract · Threat modelling (STRIDE or similar) · Likelihood/impact matrix · Treatment plan · Residual risk position · Risk appetite statement" },
        { name: "Incident response playbook", purpose: "Shows you can operationalise security governance, not just audit it.", contents: "Incident classification taxonomy · Notification decision tree (ICO/NIS2 thresholds) · Response phases · Roles and responsibilities · Evidence preservation checklist · Post-incident review template" },
        { name: "Security awareness programme design", purpose: "Shows strategic thinking beyond technical controls.", contents: "Audience segmentation · Content calendar · Phishing simulation methodology · Metrics framework · Board reporting template" },
      ],
    },
    {
      id: "salary", label: "Roles & salary (UK)", kicker: "Rough ranges",
      blurb: "GRC roles pay less than technical operations at equivalent seniority, but the gap narrows significantly at management level.",
      kind: "ladder",
      rows: [
        { role: "Cyber GRC Analyst (entry)", exp: "0–2 yrs", range: "£28k–£45k", note: "ISO 27001, risk registers, policy maintenance. Often dual-hat with IT or general compliance." },
        { role: "Information Security Manager", exp: "3–6 yrs", range: "£50k–£80k", note: "ISMS ownership, audit management, NIS2/DORA compliance programme." },
        { role: "Cyber Risk Manager / GRC Lead", exp: "5–8 yrs", range: "£70k–£100k", note: "Enterprise risk posture, board reporting, supplier security oversight." },
        { role: "Deputy CISO", exp: "7–11 yrs", range: "£90k–£140k", note: "Operational leadership of security function. Common stepping stone to full CISO." },
        { role: "CISO", exp: "10+ yrs", range: "£120k–£250k+", note: "Board-level. Varies enormously — financial services and CNI at top end." },
      ],
    },
    {
      id: "employers", label: "UK employers worth tracking", kicker: "Where the roles are",
      blurb: "GRC roles exist across every sector that processes sensitive data. Demand is highest in financial services and CNI.",
      kind: "employers",
      groups: [
        { head: "Critical national infrastructure", items: ["National Grid", "BT", "BAE Systems", "Thales UK", "GCHQ / NCSC (secondment programmes)"] },
        { head: "Financial services", items: ["Goldman Sachs Cyber SOC", "JP Morgan", "Deutsche Bank", "Barclays", "Bank of England", "FCA"] },
        { head: "Health & public sector", items: ["NHS Digital / NHS England (DSPT programme)", "MHRA", "Genomics England", "Cabinet Office (CDDO)", "MoD"] },
        { head: "Tech & security vendors", items: ["Microsoft UK", "CrowdStrike", "Darktrace", "Palo Alto Networks", "Palantir UK", "Amazon AWS"] },
        { head: "Consultancies", items: ["KPMG Cyber", "PwC Cybersecurity", "Deloitte Cyber Risk", "PA Consulting", "CREST-certified boutiques"] },
      ],
    },
    {
      id: "network", label: "Networking & communities", kicker: "Where to be seen",
      blurb: "The UK cyber community is large but the GRC sub-community is focused. ISACA and (ISC)² are the core professional bodies.",
      kind: "network",
      items: [
        { name: "NCSC Publications & CyberUK", kind: "Government / conference", cost: "Free (publications) / paid (conference)", note: "NCSC is the UK's cyber authority. CyberUK is the biggest UK practitioner event annually. Publications are essential reading." },
        { name: "(ISC)² UK Chapter", kind: "In-person + online", cost: "(ISC)² membership", note: "For CISSP holders and candidates. Quarterly events, study groups. Good mentorship access." },
        { name: "ISACA UK Chapter", kind: "In-person + online", cost: "ISACA membership", note: "For CISM, CGEIT, CRISC holders. GRC-focused; strong audit-security intersection." },
        { name: "BCS Cybersecurity Specialist Group", kind: "Online + events", cost: "BCS membership", note: "UK-specific. Practitioner talks. Good for public sector and DP-overlap roles." },
        { name: "Infosecurity Europe", kind: "Conference", cost: "Paid (free passes exist)", note: "Annual London event. Good for vendor landscape and community networking." },
        { name: "LinkedIn — UK cyber GRC", kind: "Online", cost: "Free", note: "Follow NCSC publications directly. Comment on enforcement decisions and framework updates. The community is active." },
      ],
    },
  ],
};

// ═══════════════════════════════════════════════════════════════════════════
// FINTECH REGULATION
// ═══════════════════════════════════════════════════════════════════════════
const AREA_FINTECH = {
  intro: "FinTech compliance rewards breadth — you need to navigate FCA regulation, payment services rules, GDPR and PECR, and increasingly Consumer Duty, all in a fast-moving commercial environment. The sector hires generalists who can move quickly. The best entry routes are through payments compliance, an FCA regulatory role, or a compliance analyst position at a scale-up that has just received its e-money or payment institution authorisation.",
  sections: [
    cvSection("cv", [
      { head: "Headline & summary", items: [
        "Specific titles: FinTech Compliance Manager, Payments Compliance Analyst, Regulatory Affairs Manager, Open Banking Compliance Lead.",
        "Summary names the authorisation type (EMI, PI, bank licence) or FCA sourcebook you know (CASS, BCOBS, CONC, DISP for complaints).",
        "FinTech compliance teams are small and move fast. Show you give practical, timely advice — not just legal memos.",
      ]},
      { head: "FinTech vocabulary", items: [
        "Payment Institution (PI), E-money Institution (EMI), Safeguarding, PSD2/PSRs 2017, Strong Customer Authentication (SCA), Open Banking, Consumer Duty for FinTechs. Avoid generic 'financial services compliance' language.",
        "Experience shows cross-functional work with product, engineering, and commercial teams — not just a siloed compliance function.",
      ]},
      { head: "Certifications", items: [
        "No single definitive FinTech compliance cert. CISI Certificate in Compliance or ICA Diploma in Financial Services Compliance are the most transferable.",
        "CIPP/E is valuable for the data angle. FCA InnovationHub engagement (if you've had a Sandbox interaction) is worth a line.",
        "Any regulatory affairs courses from Innovate Finance or UK Finance are increasingly recognised.",
      ]},
      { head: "Portfolio", items: [
        "Compliance framework for a payments product, PSD2/GDPR gap analysis, or a CASS safeguarding audit are the artefacts that differentiate.",
        "If you've supported an FCA authorisation application, describe your contribution specifically.",
      ]},
    ]),
    {
      id: "questions", label: "Interview Q-bank", kicker: "What actually comes up",
      blurb: "Common UK FinTech regulatory interview questions. Show you understand the commercial context, not just the rules.",
      kind: "qa",
      items: [
        { q: "What is the difference between a payment institution, an e-money institution, and a bank? Why does it matter for compliance?", a: "PIs (Payment Services Regs 2017) can execute payment services but cannot issue e-money. EMIs (E-money Regs 2011) can issue e-money (stored value) and provide payment services. Banks are full credit institutions — they can take deposits, which EMIs cannot. The compliance distinction: safeguarding obligations differ (EMIs must segregate relevant funds in a designated account or under insurance), capital requirements differ, and FCA permissions differ. Operating outside your permissions is a criminal offence under FSMA s.19. When a client asks whether their funds are 'safe', the answer depends entirely on which entity holds them." },
        { q: "How does PSD2 (PSRs 2017 in the UK) interact with UK GDPR? Give a practical example.", a: "PSD2 mandates that payment service providers share account data with TPPs when the customer consents — the Open Banking mechanism. The data shared (transactions, balances) is personal data. PSD2 consent and UK GDPR lawful basis are separate questions. The bank sharing data to a TPP may rely on legal obligation (PSD2) plus contract. The TPP receiving it relies on the customer's PSD2 instruction. Tension: PSD2 says share the data the TPP requests; GDPR says only what's necessary. TPPs should only request what their stated service requires; banks can challenge disproportionate requests." },
        { q: "A FinTech is launching a BNPL product. What are the main regulatory risks?", a: "BNPL has been largely unregulated — that's changing from 2025/26, with many products requiring FCA authorisation and bringing Consumer Credit Act / CONC obligations. Risks: (1) Consumer Duty — must demonstrate fair value, clear communications, adequate support. (2) Creditworthiness assessments — CONC 5 requires meaningful checks; none = enforcement risk. (3) Marketing — financial promotions for credit must be FCA-approved. (4) Pre-authorisation trading — operating without the correct FCA permissions is a s.19 FSMA offence. (5) Vulnerable customer handling. (6) GDPR/PECR — credit reference bureau sharing, direct marketing rules." },
        { q: "Walk me through what safeguarding means for an EMI and how you would audit it.", a: "Safeguarding is the EMI equivalent of deposit protection. EMIs must protect customer funds equivalent to e-money outstanding by holding them in a designated segregated bank account or under an insurance policy (Reg. 21 EMRs 2011). An audit: (1) Confirm the segregated account exists at an authorised credit institution, clearly named as safeguarding. (2) Confirm the balance equals or exceeds the outstanding e-money float (daily reconciliation required). (3) Confirm no commingling with operating funds. (4) Test controls around transfers in and out. (5) Check board-level oversight. The FCA has taken enforcement action against EMIs for safeguarding failures — it's high-priority supervisory risk." },
        { q: "How does Consumer Duty apply to a FinTech with a primarily digital, self-service model?", a: "Consumer Duty applies fully regardless of distribution model. Four outcomes apply: products/services fit for purpose; price and value appropriate; consumers understand the product; consumers get adequate support. For a digital-first firm the tension is usually on support (outcome 4): is a chatbot or FAQ adequate for a customer in financial difficulty, making a high-value transaction, or disputing a payment? Firms must have escalation routes. On communications (outcome 3): digital journeys must be tested for comprehension by the actual target customers. Annual board assessment required, with evidence of outcomes achieved — not just assertions." },
        { q: "What is Strong Customer Authentication (SCA) and when does it apply?", a: "SCA requires at least two of three authentication factors: something you know (password, PIN), something you have (phone, token), something you are (biometrics). It applies to: online card payments, account access, and high-value or unusual transactions. Exemptions: low-value transactions (under £30, with cumulative limits), recurring transactions with same payee and amount, low-risk transactions (based on PSP fraud rate), trusted beneficiaries. SCA failures are an FCA enforcement risk — the regulator has monitored implementation since 2021 and issued enforcement notices." },
      ],
    },
    starSection(),
    {
      id: "mocks", label: "Mock prompts", kicker: "Practice cold",
      blurb: "Set a timer. Answer aloud.",
      kind: "list",
      groups: [
        { head: "Scenario prompts", items: [
          "Your firm is a payment institution and you've discovered you've been inadvertently offering a service that requires e-money authorisation. What do you do?",
          "A product team wants to add a 'tips' feature to the payments app that would allow users to send money to gig workers. Walk me through your regulatory analysis.",
          "The FCA has started a skilled person review (s.166) of your firm's safeguarding controls. What does the first week look like?",
          "A customer complains they didn't understand they were taking on debt with your BNPL product. How do you handle it and what are the wider implications?",
        ]},
        { head: "Knowledge prompts", items: [
          "What is the difference between safeguarding and a deposit guarantee scheme?",
          "Explain the FCA authorisation process for a new payment institution in outline.",
          "What does CASS 7 require of an FCA-regulated firm holding client money?",
          "What is the PSR (Payment Systems Regulator) and what does it regulate that the FCA does not?",
        ]},
      ],
    },
    {
      id: "portfolio", label: "Portfolio artefacts", kicker: "Show the work",
      blurb: "FinTech compliance artefacts show you understand both the regulatory framework and the commercial context — a rare combination.",
      kind: "templates",
      items: [
        { name: "PSRs 2017 / EMRs 2011 compliance framework", purpose: "Demonstrates you understand the authorisation conditions and ongoing obligations of a regulated payments firm.", contents: "Permissions required · Capital requirements · Safeguarding policy · SCA implementation plan · Incident reporting matrix · FCA reporting calendar" },
        { name: "Consumer Duty assessment (digital product)", purpose: "Shows you can apply the outcomes-based approach to a FinTech product, including digital-specific challenges.", contents: "Product description · Target market · Four outcome assessment · MI sources · Gaps identified · Board reporting template" },
        { name: "GDPR + PECR checklist for a FinTech proposition", purpose: "FinTechs often run GDPR and PECR obligations in parallel. Showing you understand both is differentiating.", contents: "Personal data flows · Lawful basis mapping · PECR obligations (electronic marketing, cookies) · Open banking data sharing map · Retention schedule · DPIA trigger assessment" },
        { name: "Safeguarding audit programme", purpose: "Safeguarding is a high-priority FCA supervisory risk for EMIs. A structured audit programme shows operational depth.", contents: "Audit scope · Test procedures per safeguarding obligation · Evidence required · Findings rating scale · Reporting template" },
      ],
    },
    {
      id: "salary", label: "Roles & salary (UK)", kicker: "Rough ranges",
      blurb: "FinTech salaries have compressed from 2022–23 peaks but remain above traditional FS equivalents. Equity upside can be significant at pre-IPO stage — benchmark cash separately.",
      kind: "ladder",
      rows: [
        { role: "Regulatory Affairs / Compliance Analyst", exp: "0–2 yrs", range: "£28k–£45k", note: "Entry. Often working across multiple frameworks simultaneously at a small firm." },
        { role: "Payments Compliance Manager", exp: "2–5 yrs", range: "£45k–£70k", note: "PSRs, EMRs, safeguarding, FCA reporting cycle ownership." },
        { role: "FinTech Compliance Manager", exp: "4–7 yrs", range: "£55k–£85k", note: "Cross-framework, product advisory, Consumer Duty, FCA relationship." },
        { role: "Head of Compliance (FinTech scale-up)", exp: "6–10 yrs", range: "£80k–£140k", note: "Usually serves as MLRO and CCO simultaneously. FCA-approved individual." },
        { role: "Chief Compliance Officer (late-stage / listed)", exp: "9–14 yrs", range: "£120k–£200k+", note: "Complex multi-jurisdiction programmes. Often includes equity at growth-stage firms." },
      ],
    },
    {
      id: "employers", label: "UK employers worth tracking", kicker: "Where the roles are",
      blurb: "FinTech compliance hiring is concentrated in London's scale-up ecosystem and expanding into payments infrastructure.",
      kind: "employers",
      groups: [
        { head: "Scale-ups & challengers", items: ["Monzo", "Revolut", "Wise", "Starling", "GoCardless", "Zilch", "SumUp UK", "Pockit"] },
        { head: "Established FinTech", items: ["Klarna UK", "Funding Circle", "OakNorth", "ClearBank", "Atom Bank", "Tandem"] },
        { head: "Payments infrastructure", items: ["Mastercard UK", "Visa UK", "Worldpay", "Adyen UK", "Stripe UK", "PayPoint", "Checkout.com"] },
        { head: "Regulators", items: ["FCA (Innovation division)", "Bank of England (FinTech unit)", "PSR (Payment Systems Regulator)", "HMRC (e-money oversight)"] },
        { head: "Consultancies & law firms", items: ["Pinsent Masons (payments regulation)", "Bird & Bird", "DLA Piper FinTech practice", "Deloitte FinTech risk", "KPMG regulatory change"] },
      ],
    },
    {
      id: "network", label: "Networking & communities", kicker: "Where to be seen",
      blurb: "The UK FinTech community is unusually open and accessible — show up early, before you need it.",
      kind: "network",
      items: [
        { name: "Innovate Finance", kind: "Trade body", cost: "Membership (employer) / events often free", note: "The UK FinTech trade body. Policy working groups, annual Global Summit. Best single community for FinTech regulation." },
        { name: "FCA InnovationHub", kind: "UK Government", cost: "Free", note: "Apply for regulatory feedback on novel products. Even without sandbox access, the interaction is valuable experience." },
        { name: "UK Finance", kind: "Trade body / events", cost: "Employer membership", note: "Payments-focused working groups. Relevant if you're in the payments compliance track." },
        { name: "PSR publications & consultations", kind: "Online", cost: "Free", note: "The PSR consults publicly on payment systems regulation. Read and ideally respond to consultations. Signals engagement." },
        { name: "Open Banking / Open Finance community", kind: "Online + events", cost: "Free", note: "OBL (Open Banking Ltd) and the OBIE alumni network. Essential if you're working in the open banking compliance space." },
        { name: "LinkedIn — UK FinTech compliance", kind: "Online", cost: "Free", note: "Follow Innovate Finance, PSR and FCA FinTech updates directly. The community is vocal and visible — engage substantively." },
      ],
    },
  ],
};

// ═══════════════════════════════════════════════════════════════════════════
// INDEX
// ═══════════════════════════════════════════════════════════════════════════
const CAREER_AREAS = { dp: AREA_DP, ai: AREA_AI, aml: AREA_AML, conduct: AREA_CONDUCT, cyber: AREA_CYBER, fintech: AREA_FINTECH };

// ─── Sub-renderers (same as before) ────────────────────────────────────────
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
              <div className="qa-a-label">Shape of a strong answer</div>
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
  qa:        CareerQA,
  star:      CareerStar,
  list:      CareerList,
  templates: CareerTemplates,
  ladder:    CareerLadder,
  employers: CareerEmployers,
  network:   CareerNetwork,
};

// ─── Career page ────────────────────────────────────────────────────────────
function Career() {
  const [area, setArea] = useS("dp");
  const [active, setActive] = useS(null);
  const areaData = CAREER_AREAS[area];

  useE(() => {
    setActive(areaData.sections[0] ? areaData.sections[0].id : null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [area]);

  useE(() => {
    const ids = areaData.sections.map(s => s.id);
    const onScroll = () => {
      let cur = ids[0];
      for (const id of ids) {
        const el = document.getElementById("c-" + id);
        if (!el) continue;
        if (el.getBoundingClientRect().top < 200) cur = id;
      }
      setActive(cur);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [area]);

  return (
    <>
      <SectionHead
        id="career"
        num="VI."
        eyebrow="Career hub"
        title="Land the role you're aiming for"
        sub="CV checklist, interview Q-bank, salary benchmarks, employers, and networking — specific to each practice area. Choose your discipline below."
      />

      {/* ── Area selector ── */}
      <div className="career-area-selector">
        <div className="wrap">
          <p className="cas-label">Target discipline</p>
          <div className="cas-tabs">
            {CAREER_AREAS_META.map(a => (
              <button
                key={a.id}
                className={"cas-tab cas-" + a.id + (area === a.id ? " is-active" : "")}
                onClick={() => setArea(a.id)}
              >
                <span className="cas-glyph" aria-hidden="true">{a.glyph}</span>
                <span>{a.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      <section className="career">
        <div className="wrap career-wrap">
          <aside className="career-toc" aria-label="Career sections">
            <div className="toc-label">In this section</div>
            <ol>
              {areaData.sections.map(s => (
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
            <div className="career-area-intro reveal">
              <p>{areaData.intro}</p>
            </div>

            {areaData.sections.map((s, i) => {
              const Comp = KIND_MAP[s.kind];
              return (
                <section key={s.id + "-" + area} id={"c-" + s.id} className="csec">
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
