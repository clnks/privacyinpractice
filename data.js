// All content extracted from the existing site
window.SITE_DATA = {
  brand: {
    mark: "Privacy",
    word: "in Practice",
    tagline: "Free community resource — updated as I learn",
  },
  hero: {
    eyebrow: "A field journal",
    title_a: "Data protection,",
    title_b: "in practice.",
    lede:
      "A free, structured roadmap for anyone building a career in data protection and privacy — written by someone actively on this journey. No paywalls, no fluff, no gatekeeping.",
    cta_primary: "Start the roadmap",
    cta_secondary: "Explore the areas",
    stats: [
      { n: "6", l: "Learning tracks" },
      { n: "16", l: "Phases" },
      { n: "Free", l: "Always" },
    ],
  },
  tracks: [
    {
      num: "I",
      glyph: "§",
      title: "Legal & Regulatory Foundations",
      kicker: "Build the knowledge base everything else depends on",
      phases: [
        {
          n: "01",
          tag: "Foundation",
          title: "UK GDPR & DPA 2018 Fundamentals",
          blurb:
            "The two pieces of legislation that govern how personal data is handled in the UK. You cannot do data protection work without knowing both cold.",
          beats: [
            "Six lawful bases for processing (Article 6). Know when each applies and how legitimate interests differs from consent — including the balancing test.",
            "Eight data subject rights with timescales (1 month, extendable by 2 months for complex requests).",
            "Accountability principle (Art. 5(2)) in practice: privacy notices, ROPAs, DPIAs, demonstrating compliance.",
            "ICO guidance as your textbook. Work through the lawful basis interactive tool.",
          ],
          deliverable:
            "Read Articles 5, 6, 12–23 and 30 of the UK GDPR in full. Complete ICO's lawful basis tool. Summarise each right in one sentence.",
        },
        {
          n: "02",
          tag: "Foundation",
          title: "Special Category Data & Sensitive Processing",
          blurb:
            "Special category data (Article 9) requires an additional lawful basis on top of Article 6. A frequent source of compliance failures in practice.",
          beats: [
            "All 10 categories of special category data — and why they attract additional protection.",
            "10 conditions for processing (Schedule 1, DPA 2018). Know which pairs with which Article 9 condition.",
            "Criminal offence data (Art. 10) — not special category but separately restricted.",
          ],
          deliverable:
            "Map each Article 9 category to a real-world processing example. Draft a one-paragraph justification for health data in an employment context.",
        },
        {
          n: "03",
          tag: "Foundation",
          title: "Privacy by Design & by Default",
          blurb:
            "Article 25 requires controllers to implement data protection from the outset of any system. One of the most practical and employer-relevant concepts.",
          beats: [
            "Cavoukian's seven foundational principles — proactive, default, embedded, full functionality, end-to-end security, transparency, respect.",
            "Privacy by default in practice: only what is strictly necessary; the most privacy-protective settings should be the default.",
            "Apply it: what questions should you ask at the design stage of a new HR system?",
          ],
          deliverable:
            "Write a privacy by design review for a hypothetical system (e.g. an employee monitoring tool). What risks? What controls?",
        },
      ],
    },
    {
      num: "II",
      glyph: "¶",
      title: "Operational Data Protection",
      kicker: "The day-to-day work of a data protection practitioner",
      phases: [
        {
          n: "04",
          tag: "Operational",
          title: "DSARs — Data Subject Access Requests",
          blurb:
            "One of the most common day-to-day tasks. Missing deadlines, over-redacting, under-disclosing — all create ICO risk.",
          beats: [
            "End-to-end DSAR process: receipt → ID verification → acknowledgement → search → review → response within one month.",
            "Exemptions: legal privilege, third-party data, management forecasts, references, negotiations.",
            "Manifestly unfounded or excessive — when you can charge a fee or refuse.",
            "Draft templates: acknowledgement, extension, final response. Portfolio artefacts.",
          ],
          deliverable:
            "Build a DSAR tracker template and draft three letters: acknowledgement, extension, final response. Publish to GitHub.",
        },
        {
          n: "05",
          tag: "Operational",
          title: "DPIAs — Data Protection Impact Assessments",
          blurb:
            "Article 35 requires a DPIA before processing likely to result in high risk. Mandatory in certain circumstances, best practice in many others.",
          beats: [
            "When mandatory: systematic profiling, large-scale special category data, systematic monitoring of public areas.",
            "Seven components of a DPIA, from describing processing to ongoing review.",
            "Complete a practice DPIA for a realistic scenario — e.g. employee monitoring software or facial recognition.",
          ],
          deliverable:
            "Complete one full DPIA using the ICO template. Document risk assessment, mitigation, sign-off. Publish as a portfolio piece.",
        },
        {
          n: "06",
          tag: "Operational",
          title: "Data Breaches — Detection, Notification & Response",
          blurb:
            "The 72-hour notification clock is one of the most important deadlines in data protection.",
          beats: [
            "Three-part test for notifying the ICO. If yes to all — notify within 72 hours.",
            "When you must notify affected individuals: only when likely to result in HIGH risk.",
            "Breach response playbook: detection → escalation → assessment → notification → documentation → lessons.",
          ],
          deliverable:
            "Draft a breach response playbook and a breach log template. Write a practice ICO breach notification for a fictional scenario.",
        },
        {
          n: "07",
          tag: "Operational",
          title: "Records of Processing Activities (ROPAs)",
          blurb:
            "Article 30 records are the foundation of accountability. If you cannot demonstrate what you process and why, you cannot demonstrate compliance.",
          beats: [
            "Mandatory contents of a controller ROPA — name, purposes, categories, recipients, transfers, retention, security.",
            "Controller ROPA vs processor ROPA — processors record what they do on behalf of controllers.",
            "Build a sample ROPA for a fictional 50-person HR software company. Map 5–8 processing activities end to end.",
          ],
          deliverable:
            "Complete a full ROPA for a fictional organisation with at least 6 processing activities including lawful basis, retention and security.",
        },
      ],
    },
    {
      num: "III",
      glyph: "◬",
      title: "Specialist: AI Governance & Cloud",
      kicker: "The highest-value niche at the intersection of technical and legal",
      phases: [
        {
          n: "08",
          tag: "Specialist",
          title: "EU AI Act — What DP Practitioners Need to Know",
          blurb:
            "The world's first comprehensive legal framework for AI systems — and its interaction with Article 22 GDPR is critical territory for DP practitioners.",
          beats: [
            "Risk-based classification: unacceptable, high, limited, minimal risk.",
            "Obligations for high-risk AI systems — conformity assessment, technical documentation, human oversight.",
            "Article 22 UK GDPR on solely automated decisions — three exceptions and required safeguards.",
          ],
          deliverable:
            "One-page summary of how the EU AI Act interacts with Article 22 for a business deploying an AI recruitment screening tool.",
        },
        {
          n: "09",
          tag: "Specialist",
          title: "International Data Transfers",
          blurb:
            "One of the most complex areas of data protection — and practically essential for any organisation using global cloud services.",
          beats: [
            "Transfer mechanisms: adequacy decisions, SCCs / UK IDTA, BCRs, derogations.",
            "UK IDTA — the post-Brexit replacement for EU SCCs. When to use it and how it differs.",
            "Transfer Impact Assessment — assess the legal framework of the destination country.",
          ],
          deliverable:
            "Map transfer mechanisms for UK → US, India, and a non-adequate third country. Identify which applies and why.",
        },
        {
          n: "10",
          tag: "Specialist",
          title: "Cloud Computing & Data Protection",
          blurb:
            "Almost every organisation is a controller instructing cloud providers as processors. Understanding that relationship is fundamental to modern practice.",
          beats: [
            "Controller / processor distinction in cloud — Article 28 requires a written contract.",
            "What a processor agreement must contain: instructions, confidentiality, security, sub-processors, rights assistance, deletion.",
            "Security in cloud: encryption at rest and in transit, access controls, incident response.",
          ],
          deliverable:
            "Review Azure's public Data Processing Agreement. Identify how it addresses each Article 28 requirement. Write a one-page gap analysis.",
        },
      ],
    },
    {
      num: "IV",
      glyph: "✦",
      title: "Land the Role",
      kicker: "Turn your knowledge into proof that gets you hired",
      phases: [
        {
          n: "11",
          tag: "Career",
          title: "Build Your DP Portfolio",
          blurb:
            "There are no lab screenshots in data protection. Your portfolio is documentation — the same artefacts you'd produce in a real role.",
          beats: [
            "GitHub repo with artefacts: DSAR templates, DPIA, breach playbook, ROPA, privacy notice review.",
            "Three to five ICO enforcement case study breakdowns — what happened, what went wrong, what should have happened.",
            "Two to three short articles — concept explainer, enforcement breakdown, AI governance piece.",
          ],
          deliverable:
            "GitHub portfolio with 5+ artefacts. 3 published articles. LinkedIn profile updated with certifications in progress.",
        },
        {
          n: "12",
          tag: "Career",
          title: "Certifications — In Order of Priority",
          blurb:
            "Certifications signal credibility and are filtered for in ATS systems. The right order matters — each builds on the last.",
          isCerts: true,
          certs: [
            {
              status: "In progress",
              name: "BCS Practitioner Certificate in Data Protection",
              issuer: "BCS — The Chartered Institute for IT",
              note:
                "UK GDPR and DPA 2018 focused. The most recognised entry-level DP cert in UK practice.",
            },
            {
              status: "Next",
              name: "CIPP/E — Certified Information Privacy Professional",
              issuer: "IAPP",
              note:
                "The gold standard for European privacy law. Highly valued at mid-level and above.",
            },
            {
              status: "After CIPP/E",
              name: "CIPM — Certified Information Privacy Manager",
              issuer: "IAPP",
              note:
                "Operational companion to CIPP/E. Essential for DPO and consultancy roles.",
            },
            {
              status: "Certified",
              name: "Securiti AI Security and Governance",
              issuer: "Securiti",
              note:
                "AI governance frameworks, EU AI Act, AI risk management.",
            },
          ],
        },
      ],
    },
  ],
  journey: {
    title: "Where I am on this path",
    blurb:
      "Following this roadmap publicly. Every week I document what I'm learning, what's working, and what's hard.",
    bio: {
      name: "Clarissa Ankrah",
      sub: "MSc Cyber Security → Data Protection & Privacy",
      body:
        "Cyber security graduate transitioning into data protection and regulatory compliance. Three years of B2B account management and compliance-adjacent work across digital marketing agencies. Currently studying for BCS Practitioner, AZ-900, and a cloud computing law course at Queen Mary University of London. Building toward AI governance and cloud compliance as a long-term specialism.",
    },
    timeline: [
      {
        when: "2022 – 2025",
        title: "MSc Cyber Security — University of Essex (Merit)",
        body:
          "Core modules: Security & Risk Management, UK GDPR Principles, Network Security, Secure Software Development, The Human Factor. Dedicated study of privacy by design (Article 25).",
        state: "done",
      },
      {
        when: "2022 – 2026",
        title: "Three years in digital marketing agencies",
        body:
          "Account management with direct working knowledge of PECR, cookie consent frameworks, consent management platforms and adtech data flows. Structured audits, governance reporting, client-facing documentation.",
        state: "done",
      },
      {
        when: "April 2026",
        title: "Securiti AI Security and Governance — Certified",
        body:
          "Generative AI fundamentals, global AI laws, compliance obligations, AI risk management, AI governance frameworks.",
        state: "done",
      },
      {
        when: "Now · May 2026",
        title: "BCS Practitioner + AZ-900 + Queen Mary Cloud Law",
        body:
          "BCS Practitioner Certificate in Data Protection (in progress). AZ-900 exam scheduled 3 June 2026. Cloud Computing Law: Data Protection & Cybersecurity — Queen Mary, via Coursera. Built this site to document the journey publicly.",
        state: "now",
      },
      {
        when: "Target · end of 2026",
        title: "First operational data protection role",
        body:
          "Entry to mid-level DP role with hands-on DSAR, DPIA, breach management and ROPA experience. CIPP/E study begins after securing the first role.",
        state: "next",
      },
      {
        when: "Target · 2027 – 2028",
        title: "CIPP/E + CIPM + boutique consultancy",
        body:
          "Both IAPP certifications completed. Move into a boutique consultancy for network and senior client exposure. Build toward independent contracting in AI governance and cloud compliance.",
        state: "next",
      },
    ],
    logs: [
      {
        week: "Week 1",
        title: "BCS Practitioner — lawful bases deep dive",
        date: "May 2026",
        bullets: [
          "All six lawful bases under Article 6, with focus on distinguishing legitimate interests from consent.",
          "ICO's legitimate interests balancing test: purpose, necessity, balancing — documented each step.",
          "Drafted a one-page summary of controllers vs processors and Article 28 requirements.",
        ],
        insight:
          "The key difference between legitimate interests and consent is reversibility — consent can be withdrawn, legitimate interests cannot be \"unwithdrawn\". This changes the risk profile entirely for organisations that default to consent.",
        tags: ["Article 6", "Legitimate interests", "Controller/processor", "ICO guidance"],
      },
      {
        week: "Week 2",
        title: "AZ-900 + Cloud & DP (Queen Mary)",
        date: "May 2026",
        bullets: [
          "AZ-900: CapEx vs OpEx, IaaS/PaaS/SaaS, shared responsibility model — directly relevant to Article 28.",
          "Queen Mary: GDPR in cloud environments. Article 28 × cloud service agreements is fascinating and underexplored.",
          "Most cloud DPAs are non-negotiable for SMEs — understanding what a good DPA looks like is a real skills gap.",
        ],
        insight:
          "Cloud doesn't mean the controller escapes Article 28 obligations — the shared responsibility model carves it out, it doesn't erase it.",
        tags: ["Azure fundamentals", "Cloud compliance", "Article 28 DPAs", "Shared responsibility"],
      },
    ],
  },
  articles: [
    {
      kicker: "Explainer · GDPR",
      title:
        "DSARs explained: what they are, how they work, and where organisations go wrong",
      blurb:
        "The right of access is one of the most exercised data subject rights — and one of the most frequently mishandled.",
      meta: "May 2026 · 8 min",
      mark: "§",
    },
    {
      kicker: "Explainer · Article 25",
      title:
        "Privacy by design is not a checkbox: what Article 25 actually requires",
      blurb:
        "Article 25 requires privacy to be built in from the start — not bolted on at the end. Here's what it means in practice.",
      meta: "May 2026 · 6 min",
      mark: "¶",
    },
    {
      kicker: "AI governance · EU AI Act",
      title: "AI and GDPR: how Article 22 and the EU AI Act interact",
      blurb:
        "The EU AI Act doesn't replace GDPR — it layers on top of it. Understanding the interaction is becoming essential.",
      meta: "May 2026 · 7 min",
      mark: "◬",
    },
    {
      kicker: "ICO enforcement",
      title:
        "ICO v TikTok: what a £12.7m fine teaches us about children's data",
      blurb:
        "A breakdown of what went wrong, what controllers must learn from it, and how the ICO thought about proportionality.",
      meta: "May 2026 · 6 min",
      mark: "⚖",
    },
    {
      kicker: "Cloud · Article 28",
      title: "Using cloud services without breaking GDPR: the Article 28 checklist",
      blurb:
        "Every organisation using AWS, Azure or Google Cloud is a controller instructing a processor. Here's what your DPA must cover.",
      meta: "May 2026 · 7 min",
      mark: "☁",
    },
    {
      kicker: "Explainer · Article 35",
      title: "When is a DPIA required? A practical guide to Article 35",
      blurb:
        "DPIAs are mandatory in certain circumstances — and best practice in many more. A clear guide.",
      meta: "Coming soon",
      mark: "✎",
      soon: true,
    },
  ],
  resources: {
    intro:
      "Curated courses, official guidance, books, tools, podcasts and communities — organised by what's most useful at each stage.",
    groups: [
      {
        head: "Courses",
        sub: "Paid and free — ordered by when to take them",
        items: [
          {
            title: "Cloud Computing Law: Data Protection & Cybersecurity",
            issuer: "Queen Mary, University of London · Coursera",
            tag: "£37/mo",
            url: "https://www.coursera.org/learn/cloud-computing-law-data-protection-and-cybersecurity",
            note:
              "GDPR in cloud environments, international transfers, NIS/NIS2, critical infrastructure. Bridges legal and technical cloud architecture.",
          },
          {
            title: "BCS Practitioner Certificate in Data Protection",
            issuer: "BCS — The Chartered Institute for IT",
            tag: "Paid",
            url: "https://www.bcs.org/qualifications-and-certifications/certifications-for-professionals/data-protection-certifications/bcs-practitioner-certificate-in-data-protection/",
            note:
              "The most recognised entry-level DP qualification in UK practice. Take this first.",
          },
          {
            title: "CIPP/E — Certified Information Privacy Professional",
            issuer: "IAPP",
            tag: "Paid",
            url: "https://iapp.org/certify/cippe/",
            note:
              "The gold standard for European privacy law. Take after BCS and 6–12 months of operational experience.",
          },
          {
            title: "Introduction to Data Protection",
            issuer: "ICO — Information Commissioner's Office",
            tag: "Free",
            url: "https://ico.org.uk/for-organisations/advice-for-small-organisations/learning-resources/",
            note:
              "Free self-study modules from the UK regulator. Authoritative — the exam is based on the same material.",
          },
          {
            title: "AI Governance Professional Certificate",
            issuer: "IAPP",
            tag: "Paid",
            url: "https://iapp.org/certify/aigp/",
            note:
              "AI governance frameworks, the EU AI Act, and the intersection with existing privacy law. The highest-value specialist credential right now.",
          },
          {
            title: "Securiti AI Security and Governance",
            issuer: "Securiti",
            tag: "Free",
            url: "https://securiti.ai/training/",
            note:
              "Generative AI fundamentals, global AI laws, compliance, risk management, governance frameworks.",
          },
          {
            title: "Microsoft Azure Fundamentals (AZ-900)",
            issuer: "Microsoft Learn",
            tag: "Free prep",
            url: "https://learn.microsoft.com/en-us/credentials/certifications/azure-fundamentals/",
            note:
              "Not a DP course, but essential cloud context. If you advise on cloud DP, knowing the technical landscape matters.",
          },
        ],
      },
      {
        head: "ICO guidance & official resources",
        sub: "The authoritative sources — free and essential",
        items: [
          {
            title: "ICO Guide to UK GDPR",
            issuer: "ico.org.uk",
            tag: "Free",
            url: "https://ico.org.uk/for-organisations/uk-gdpr-guidance-and-resources/",
            note:
              "The most comprehensive free resource on UK data protection law. Treat as your primary textbook.",
          },
          {
            title: "ICO Enforcement Decisions & Penalty Notices",
            issuer: "ico.org.uk/enforcement",
            tag: "Free",
            url: "https://ico.org.uk/action-weve-taken/enforcement/",
            note:
              "Every enforcement action published in full. Invaluable for interview prep and article writing.",
          },
          {
            title: "ICO Guidance on AI and Data Protection",
            issuer: "ico.org.uk",
            tag: "Free",
            url: "https://ico.org.uk/for-organisations/uk-gdpr-guidance-and-resources/artificial-intelligence/",
            note:
              "How data protection law applies to AI — Article 22, AI auditing, interaction with the EU AI Act.",
          },
          {
            title: "EDPB Guidelines",
            issuer: "edpb.europa.eu",
            tag: "Free",
            url: "https://edpb.europa.eu/our-work-tools/general-guidance/guidelines-recommendations-best-practices_en",
            note:
              "Highly influential and often persuasive in UK interpretation post-Brexit.",
          },
          {
            title: "EU AI Act — full text & implementation timeline",
            issuer: "EUR-Lex",
            tag: "Free",
            url: "https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX:32024R1689",
            note:
              "Different provisions apply at different dates. Know the phased rollout.",
          },
          {
            title: "UK IDTA — International Data Transfer Agreement",
            issuer: "ico.org.uk",
            tag: "Free",
            url: "https://ico.org.uk/for-organisations/uk-gdpr-guidance-and-resources/international-transfers/international-data-transfer-agreement-and-guidance/",
            note:
              "The UK's post-Brexit mechanism for transfers, replacing EU SCCs for UK-to-third-country.",
          },
        ],
      },
      {
        head: "Books & reading",
        sub: "Worth buying — in order of priority",
        items: [
          {
            title: "GDPR: An Implementation and Compliance Guide",
            issuer: "IT Governance Publishing",
            tag: "Book",
            url: "https://www.itgovernancepublishing.co.uk/product/eu-general-data-protection-regulation-gdpr-an-implementation-and-compliance-guide",
            note:
              "Article-by-article, practical, for practitioners. Good desk reference throughout your career.",
          },
          {
            title: "Data Protection: A Practical Guide to UK Law",
            issuer: "Peter Carey — Oxford University Press",
            tag: "Book",
            url: "https://global.oup.com/academic/product/data-protection-9780198812198",
            note:
              "The standard UK practitioner text. Essential for BCS Practitioner study and beyond.",
          },
          {
            title: "The Age of Surveillance Capitalism",
            issuer: "Shoshana Zuboff",
            tag: "Context",
            url: "https://shoshanazuboff.com/book/about/",
            note:
              "Conceptual framework for why data protection matters. Read it for the arguments it gives you.",
          },
          {
            title: "Privacy by Design: The 7 Foundational Principles",
            issuer: "Ann Cavoukian — IPC Ontario",
            tag: "Free PDF",
            url: "https://www.ipc.on.ca/wp-content/uploads/resources/7foundationalprinciples.pdf",
            note:
              "The original paper. About 10 pages. Read once, know it well.",
          },
        ],
      },
      {
        head: "Free tools & templates",
        sub: "Practical resources you can use right now",
        items: [
          {
            title: "ICO Lawful Basis Interactive Tool",
            issuer: "ico.org.uk",
            tag: "Tool",
            url: "https://ico.org.uk/for-organisations/uk-gdpr-guidance-and-resources/lawful-basis/lawful-basis-interactive-guidance-tool/",
            note:
              "Answer questions about your processing and it identifies the appropriate lawful basis.",
          },
          {
            title: "ICO DPIA Template",
            issuer: "ico.org.uk",
            tag: "Template",
            url: "https://ico.org.uk/for-organisations/uk-gdpr-guidance-and-resources/accountability-and-governance/data-protection-impact-assessments-dpias/how-do-we-do-a-dpia/",
            note:
              "The standard against which your DPIAs will be assessed. Use this rather than building from scratch.",
          },
          {
            title: "ICO Accountability Framework Self-Assessment",
            issuer: "ico.org.uk",
            tag: "Tool",
            url: "https://ico.org.uk/for-organisations/uk-gdpr-guidance-and-resources/accountability-and-governance/accountability-framework/",
            note:
              "Structured self-assessment covering governance, records, training, DPIAs, breach management.",
          },
          {
            title: "ICO Report a Breach Self-Assessment",
            issuer: "ico.org.uk",
            tag: "Tool",
            url: "https://ico.org.uk/for-organisations/report-a-breach/",
            note:
              "Self-assessment for deciding whether a breach needs to be reported. Useful for understanding the 72-hour decision.",
          },
          {
            title: "GDPRhub — GDPR Decisions Database",
            issuer: "gdprhub.eu",
            tag: "Free",
            url: "https://gdprhub.eu/",
            note:
              "Free database of GDPR enforcement decisions across Europe and the UK. Searchable by article.",
          },
          {
            title: "TryHackMe — Governance & Regulation",
            issuer: "tryhackme.com",
            tag: "Free tier",
            url: "https://tryhackme.com/path/outline/cybersecurity-101",
            note:
              "Hands-on labs applying GDPR, ISO 27001, NIST 800-53, PCI DSS in structured scenarios.",
          },
        ],
      },
      {
        head: "Podcasts & communities",
        sub: "Stay current and find your people",
        items: [
          {
            title: "The Privacy Advisor Podcast",
            issuer: "IAPP",
            tag: "Weekly",
            url: "https://iapp.org/news/privacy-advisor-podcast/",
            note:
              "Data protection news, enforcement decisions, practitioner interviews.",
          },
          {
            title: "IAPP KnowledgeNet Chapters",
            issuer: "IAPP — London active",
            tag: "Free",
            url: "https://iapp.org/connect/communities/knowledgenet/",
            note:
              "Local chapters run regular events. One of the most effective ways to meet practitioners.",
          },
          {
            title: "Data Protection Network (DPN)",
            issuer: "dpnetwork.org.uk",
            tag: "UK",
            url: "https://www.dpnetwork.org.uk/",
            note:
              "UK practitioner network — resources, webinars, jobs board.",
          },
          {
            title: "UK DP LinkedIn community",
            issuer: "LinkedIn",
            tag: "Free",
            url: "https://www.linkedin.com/search/results/content/?keywords=UK%20GDPR",
            note:
              "Follow ICO, IAPP, DPO Centre, OneTrust, and active practitioners. Good for visibility.",
          },
        ],
      },
    ],
  },
  about: {
    eyebrow: "About this site",
    title: "Why I built this",
    body:
      "Data protection has almost no equivalent of the public learning resources that exist in cybersecurity. I'm building the one I wish had existed when I started.",
    columns: [
      {
        head: "What this site covers",
        items: [
          "A structured roadmap for building a data protection career from scratch.",
          "Personal study logs and a learning journey — documented publicly.",
          "Plain-English articles on GDPR, ICO enforcement, AI governance and cloud.",
          "Portfolio artefacts: DSAR templates, DPIAs, breach playbooks, ROPAs.",
        ],
      },
      {
        head: "Current credentials",
        items: [
          "MSc Cyber Security — University of Essex (Merit).",
          "Securiti AI Security and Governance — Certified.",
          "BCS Practitioner Certificate in Data Protection — In progress.",
          "AZ-900 Microsoft Azure Fundamentals — Exam 3 June 2026.",
          "Cloud Computing Law — Queen Mary University of London (Coursera).",
        ],
      },
      {
        head: "Why data protection — and why now",
        items: [
          "The field is growing faster than it is producing qualified practitioners.",
          "AI governance is the highest-value emerging niche — and very few people bridge technical AI and legal compliance.",
          "Most data protection documentation is dense and inaccessible. Clear writing is an underrated competitive advantage.",
        ],
      },
    ],
  },
};
