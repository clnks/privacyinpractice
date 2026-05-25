/* === Privacy in Practice — study card data ===
   Add new cards here. Each card has:
     id     — unique slug
     topic  — must match a CARD_TOPICS id
     track  — "I" | "II" | "III" | "IV"  (matches roadmap tracks)
     q      — question text (front of card)
     a      — answer text (back of card). Can use \n for line breaks.
     quiz   — optional multi-choice array; first item is correct answer
*/

window.CARD_TOPICS = [
  { id: "uk-gdpr",      label: "UK GDPR Articles",        track: "I",   color: "lavender" },
  { id: "lawful-basis", label: "Lawful Bases",            track: "I",   color: "blush"    },
  { id: "dsar",         label: "DSARs",                   track: "II",  color: "sun"      },
  { id: "breach",       label: "Breach Notification",     track: "II",  color: "coral"    },
  { id: "dpia",         label: "DPIAs",                   track: "II",  color: "mint"     },
  { id: "ai-act",       label: "EU AI Act",               track: "III", color: "lavender" },
  { id: "certs",        label: "Certifications",          track: "IV",  color: "sun"      },
];

window.CARDS = [
  /* ─── UK GDPR Articles ────────────────────────────────────────── */
  {
    id: "art-5", topic: "uk-gdpr", track: "I",
    q: "The seven principles of UK GDPR (Article 5)",
    a: "1. Lawfulness, fairness, transparency\n2. Purpose limitation\n3. Data minimisation\n4. Accuracy\n5. Storage limitation\n6. Integrity and confidentiality (security)\n7. Accountability",
    quiz: ["Seven", "Five", "Six", "Eight"],
  },
  {
    id: "art-6", topic: "uk-gdpr", track: "I",
    q: "Article 6 — what does it govern?",
    a: "The six lawful bases for processing personal data. At least one must apply for any processing to be lawful.",
  },
  {
    id: "art-9", topic: "uk-gdpr", track: "I",
    q: "Article 9 — what's special about it?",
    a: "Processing special category data requires an Article 9 condition IN ADDITION to an Article 6 lawful basis. Two-key rule.",
  },
  {
    id: "art-9-categories", topic: "uk-gdpr", track: "I",
    q: "List the ten categories of special category data",
    a: "Racial/ethnic origin · Political opinions · Religious or philosophical beliefs · Trade union membership · Genetic data · Biometric data (for ID) · Health data · Sex life · Sexual orientation · (Criminal offence data is separate — Art. 10)",
  },
  {
    id: "art-10", topic: "uk-gdpr", track: "I",
    q: "Article 10 — criminal offence data",
    a: "Not special category, but separately restricted. Requires either official authority OR a specific Schedule 1 condition under the DPA 2018.",
  },
  {
    id: "art-12-23", topic: "uk-gdpr", track: "I",
    q: "Articles 12–23 cover what?",
    a: "Data subject rights and the controller's obligations around them — transparency (12–14), access (15), rectification (16), erasure (17), restriction (18), portability (20), objection (21), automated decision-making (22).",
  },
  {
    id: "art-22", topic: "uk-gdpr", track: "I",
    q: "Article 22 in one sentence",
    a: "Individuals have the right not to be subject to a decision based SOLELY on automated processing — including profiling — that produces legal or similarly significant effects on them.",
  },
  {
    id: "art-25", topic: "uk-gdpr", track: "I",
    q: "Article 25 — what does it require?",
    a: "Data Protection by Design and by Default. Controllers must implement appropriate technical & organisational measures from the outset, and ensure by default only data necessary for each purpose is processed.",
  },
  {
    id: "art-28", topic: "uk-gdpr", track: "I",
    q: "Article 28 — what does it govern?",
    a: "Controllers using processors must have a WRITTEN CONTRACT covering: subject matter, duration, nature, purpose, type of data, categories of data subjects, controller obligations and rights — plus 8 specific processor obligations.",
  },
  {
    id: "art-30", topic: "uk-gdpr", track: "I",
    q: "Article 30 in plain English",
    a: "Records of Processing Activities (ROPAs). Controllers and processors must maintain written records of their processing — name, purposes, categories, recipients, transfers, retention, security.",
  },
  {
    id: "art-32", topic: "uk-gdpr", track: "I",
    q: "Article 32 — security of processing",
    a: "Implement appropriate technical & organisational measures: pseudonymisation, encryption, confidentiality/integrity/availability, regular testing. Risk-based — depends on state of art, costs, scope, purposes.",
  },
  {
    id: "art-33", topic: "uk-gdpr", track: "I",
    q: "Article 33 — the 72-hour rule",
    a: "Notify the ICO of a personal data breach within 72 hours of becoming aware, UNLESS unlikely to result in a risk to rights and freedoms. Late notifications must explain the delay.",
  },
  {
    id: "art-34", topic: "uk-gdpr", track: "I",
    q: "Article 34 — when must you tell the data subject?",
    a: "When the breach is likely to result in a HIGH RISK to their rights and freedoms. Without undue delay, in clear and plain language.",
  },
  {
    id: "art-35", topic: "uk-gdpr", track: "I",
    q: "Article 35 — when is a DPIA mandatory?",
    a: "When processing is likely to result in HIGH RISK. Specifically required for: systematic & extensive automated profiling with legal effects; large-scale special category data; systematic monitoring of publicly accessible areas.",
  },
  {
    id: "art-37", topic: "uk-gdpr", track: "I",
    q: "Article 37 — when do you need a DPO?",
    a: "Mandatory if: (a) public authority/body, (b) core activities require regular & systematic monitoring of data subjects on a large scale, or (c) core activities involve large-scale processing of special category or criminal data.",
  },

  /* ─── Lawful Bases ───────────────────────────────────────────── */
  {
    id: "lb-list", topic: "lawful-basis", track: "I",
    q: "Name the six lawful bases for processing",
    a: "1. Consent\n2. Contract\n3. Legal obligation\n4. Vital interests\n5. Public task\n6. Legitimate interests",
    quiz: ["Six", "Four", "Five", "Seven"],
  },
  {
    id: "lb-consent", topic: "lawful-basis", track: "I",
    q: "What makes consent valid under UK GDPR?",
    a: "Freely given, specific, informed, unambiguous, and given by clear affirmative action. Must be as easy to withdraw as to give. Pre-ticked boxes and inactivity do NOT count.",
  },
  {
    id: "lb-contract", topic: "lawful-basis", track: "I",
    q: "When can you rely on contract as a lawful basis?",
    a: "Processing must be NECESSARY to perform a contract with the data subject, OR to take pre-contractual steps at their request. 'Useful' is not enough — must be objectively necessary.",
  },
  {
    id: "lb-legal-ob", topic: "lawful-basis", track: "I",
    q: "Legal obligation — what counts?",
    a: "An obligation under UK or EU/Member State law. Contractual obligations don't count. Must be a clear and specific statutory requirement. Example: HMRC reporting, anti-money-laundering checks.",
  },
  {
    id: "lb-vital", topic: "lawful-basis", track: "I",
    q: "What's the vital interests basis really for?",
    a: "Life-or-death situations. Protecting someone's vital interests where they're physically/legally incapable of giving consent. Rarely used; usually for medical emergencies or humanitarian work.",
  },
  {
    id: "lb-public-task", topic: "lawful-basis", track: "I",
    q: "Public task — who can use it?",
    a: "Public authorities and others exercising 'official authority' or a 'task in the public interest' that has a clear basis in UK law. Universities, NHS bodies, regulators.",
  },
  {
    id: "lb-li", topic: "lawful-basis", track: "I",
    q: "The three-part legitimate interests test",
    a: "1. PURPOSE test — is there a legitimate interest?\n2. NECESSITY test — is the processing necessary for it?\n3. BALANCING test — do the individual's rights/freedoms/interests override?\nAll three must be satisfied. Document the LIA.",
  },
  {
    id: "lb-public-auth-li", topic: "lawful-basis", track: "I",
    q: "Why can't public authorities use legitimate interests for their core tasks?",
    a: "Article 6(1)(f) does NOT apply to processing carried out by public authorities in the performance of their tasks. They should use public task or legal obligation instead.",
  },
  {
    id: "lb-child", topic: "lawful-basis", track: "I",
    q: "Age threshold for consent in the UK",
    a: "13 years old for information society services (the UK's age of digital consent — lower than the GDPR default of 16, which the UK chose to derogate from).",
  },

  /* ─── DSARs ──────────────────────────────────────────────────── */
  {
    id: "dsar-deadline", topic: "dsar", track: "II",
    q: "Standard DSAR deadline?",
    a: "One calendar month from receipt. Extendable by a further two months if complex or numerous — but you must tell the requester within the first month and explain why.",
    quiz: ["One month (extendable by 2)", "72 hours", "30 days exactly", "Three months"],
  },
  {
    id: "dsar-id", topic: "dsar", track: "II",
    q: "Can you ask for ID before responding to a DSAR?",
    a: "Only if you have reasonable doubts about identity. The clock pauses while you wait — but stops as soon as ID is provided. Don't use ID checks to delay routinely.",
  },
  {
    id: "dsar-fee", topic: "dsar", track: "II",
    q: "Can you charge for a DSAR?",
    a: "Generally NO. Only if the request is manifestly unfounded or excessive, or a reasonable fee for additional copies. The fee must reflect admin costs, not be a barrier.",
  },
  {
    id: "dsar-exemptions", topic: "dsar", track: "II",
    q: "Common DSAR exemptions",
    a: "Legal professional privilege · Third-party personal data (unless reasonable to disclose) · Management forecasts (until decision made) · References (confidential) · Crime/taxation · Negotiations · Self-incrimination",
  },
  {
    id: "dsar-third-party", topic: "dsar", track: "II",
    q: "Third-party data in a DSAR — what's the test?",
    a: "Disclose only if the third party consents, OR it's reasonable to disclose without consent (consider their expectations, any duty of confidence, refusal grounds). Redact where uncertain.",
  },
  {
    id: "dsar-unfounded", topic: "dsar", track: "II",
    q: "When can you refuse a DSAR as 'manifestly unfounded or excessive'?",
    a: "High bar. 'Manifestly unfounded': clear malicious intent, e.g. as a weapon against the org. 'Excessive': repetitive or unreasonable, overlaps with previous requests. Document reasoning; tell requester they can complain to ICO.",
  },
  {
    id: "dsar-format", topic: "dsar", track: "II",
    q: "What format should you respond in?",
    a: "Concise, transparent, intelligible, easily accessible. Plain language. If the request was electronic, respond electronically by default. Provide a copy of the personal data — not just access to it.",
  },
  {
    id: "dsar-scope", topic: "dsar", track: "II",
    q: "What must a DSAR response actually contain?",
    a: "1. Confirmation processing is happening\n2. A COPY of the personal data\n3. The purposes\n4. Categories of data\n5. Recipients (esp. international)\n6. Retention period\n7. Rights (rectification, erasure, etc.)\n8. Source if not from subject\n9. Existence of automated decision-making",
  },
  {
    id: "dsar-emails", topic: "dsar", track: "II",
    q: "Do emails ABOUT a person count as their personal data?",
    a: "Yes — if the content relates to them as an identified or identifiable individual. The whole email isn't necessarily personal data — focus on the parts that relate to the subject.",
  },

  /* ─── Breach Notification ────────────────────────────────────── */
  {
    id: "br-72hr", topic: "breach", track: "II",
    q: "When does the 72-hour clock start?",
    a: "When you become AWARE of the breach. Awareness = reasonable degree of certainty that a security incident has occurred AND it has led to personal data being compromised. NOT when it occurred.",
    quiz: ["When you become aware", "When the breach occurred", "When you confirm it in writing", "End of next business day"],
  },
  {
    id: "br-definition", topic: "breach", track: "II",
    q: "Define a personal data breach",
    a: "A breach of security leading to accidental or unlawful destruction, loss, alteration, unauthorised disclosure of, or access to, personal data — transmitted, stored or otherwise processed.",
  },
  {
    id: "br-three-types", topic: "breach", track: "II",
    q: "Three types of breach (CIA)",
    a: "1. CONFIDENTIALITY breach — unauthorised/accidental disclosure\n2. INTEGRITY breach — unauthorised/accidental alteration\n3. AVAILABILITY breach — accidental/unauthorised loss of access or destruction",
  },
  {
    id: "br-ico-test", topic: "breach", track: "II",
    q: "When DON'T you have to notify the ICO?",
    a: "When the breach is unlikely to result in a risk to rights and freedoms. Document your reasoning either way — accountability principle. If in doubt, notify.",
  },
  {
    id: "br-individual-test", topic: "breach", track: "II",
    q: "When MUST you notify affected individuals?",
    a: "When the breach is likely to result in a HIGH RISK to their rights and freedoms. Without undue delay. Three exceptions: encryption rendering data unintelligible · subsequent measures eliminate the risk · would involve disproportionate effort (use public comms instead).",
  },
  {
    id: "br-contents", topic: "breach", track: "II",
    q: "What must your ICO notification contain?",
    a: "1. Nature of the breach (categories & approx. numbers of data subjects/records)\n2. DPO name & contact\n3. Likely consequences\n4. Measures taken/proposed to address it and mitigate effects",
  },
  {
    id: "br-records", topic: "breach", track: "II",
    q: "What must you record about EVERY breach, even those not notified?",
    a: "Facts of the breach, its effects, and remedial action taken. Maintain an internal breach log to demonstrate accountability — ICO will ask for it during investigations.",
  },
  {
    id: "br-processor", topic: "breach", track: "II",
    q: "Processor's breach notification duty",
    a: "Processors must notify the CONTROLLER without undue delay after becoming aware. The processor doesn't notify the ICO directly — but the controller's 72-hour clock starts when the controller becomes aware.",
  },

  /* ─── DPIAs ──────────────────────────────────────────────────── */
  {
    id: "dpia-when", topic: "dpia", track: "II",
    q: "When is a DPIA legally required?",
    a: "Where processing is LIKELY TO RESULT IN HIGH RISK. Specifically: (a) systematic & extensive automated profiling with significant effects, (b) large-scale processing of special category or criminal data, (c) systematic monitoring of publicly accessible areas at scale.",
  },
  {
    id: "dpia-9-criteria", topic: "dpia", track: "II",
    q: "Article 29 WP's nine criteria — DPIA likely required when…",
    a: "Two or more of: evaluation/scoring · automated decisions · systematic monitoring · sensitive/highly personal data · large scale · matching/combining datasets · vulnerable data subjects · innovative use of tech · prevents exercising a right",
  },
  {
    id: "dpia-contents", topic: "dpia", track: "II",
    q: "What must a DPIA contain (Art. 35(7))?",
    a: "1. Systematic description of the processing & purposes\n2. Assessment of necessity & proportionality\n3. Assessment of risks to rights & freedoms\n4. Measures envisaged to address risks (safeguards, security, compliance mechanisms)",
  },
  {
    id: "dpia-prior-consult", topic: "dpia", track: "II",
    q: "When must you consult the ICO BEFORE processing?",
    a: "When the DPIA shows residual high risk that cannot be mitigated. 'Prior consultation' under Article 36. ICO has 8 weeks to respond, extendable by 6.",
  },
  {
    id: "dpia-dpo-role", topic: "dpia", track: "II",
    q: "DPO's role in a DPIA",
    a: "The controller must SEEK ADVICE from the DPO when conducting a DPIA. The DPO monitors performance — they don't conduct it themselves. Record their advice and any reasoning where you depart from it.",
  },
  {
    id: "dpia-consult", topic: "dpia", track: "II",
    q: "Must you consult data subjects?",
    a: "'Where appropriate' — controllers must seek the views of data subjects or their representatives. If you don't, document why (e.g. would compromise commercial confidentiality, security, or be disproportionate).",
  },
  {
    id: "dpia-living", topic: "dpia", track: "II",
    q: "Is a DPIA a one-off?",
    a: "No. It's a LIVING DOCUMENT. Review where there is a change of risk represented by the processing — new tech, expanded scope, new categories of subjects, etc.",
  },

  /* ─── EU AI Act ─────────────────────────────────────────────── */
  {
    id: "ai-classes", topic: "ai-act", track: "III",
    q: "Four risk classes under the EU AI Act",
    a: "1. UNACCEPTABLE risk — banned (social scoring, real-time biometric ID in public for law enforcement, etc.)\n2. HIGH risk — strict obligations\n3. LIMITED risk — transparency obligations\n4. MINIMAL risk — no specific obligations",
    quiz: ["Four", "Three", "Five", "Two"],
  },
  {
    id: "ai-prohibited", topic: "ai-act", track: "III",
    q: "Examples of UNACCEPTABLE-risk AI systems (prohibited)",
    a: "Social scoring by public authorities · Subliminal manipulation causing harm · Exploiting vulnerabilities (age, disability) · Real-time remote biometric ID in public spaces for law enforcement (narrow exceptions) · Predictive policing based solely on profiling · Emotion recognition in workplace/education · Untargeted face image scraping",
  },
  {
    id: "ai-high-risk", topic: "ai-act", track: "III",
    q: "High-risk AI — main categories",
    a: "Annex III: biometric ID · critical infrastructure · education & vocational training · employment & worker management · access to essential services · law enforcement · migration/asylum/border · justice & democratic processes",
  },
  {
    id: "ai-high-obligations", topic: "ai-act", track: "III",
    q: "Obligations for high-risk AI providers",
    a: "Risk management system · data governance · technical documentation · record-keeping (logs) · transparency to deployers · human oversight · accuracy, robustness, cybersecurity · conformity assessment · CE marking · post-market monitoring",
  },
  {
    id: "ai-gdpr-overlap", topic: "ai-act", track: "III",
    q: "Where does the AI Act overlap with UK GDPR Article 22?",
    a: "Article 22 covers solely automated decisions with significant effects on individuals. AI Act adds product-safety-style obligations (conformity, oversight) on top of GDPR's data-subject-rights frame. Both apply.",
  },
  {
    id: "ai-gpai", topic: "ai-act", track: "III",
    q: "GPAI — what is it and what's required?",
    a: "General-Purpose AI models (incl. generative AI). Providers must: maintain technical documentation, publish a summary of training content, comply with EU copyright law. Systemic-risk GPAI has extra obligations (model evals, incident reporting, cybersecurity).",
  },
  {
    id: "ai-transparency", topic: "ai-act", track: "III",
    q: "Limited-risk AI transparency obligations",
    a: "Inform users they're interacting with an AI (chatbots) · disclose AI-generated/manipulated content (deepfakes) · disclose emotion recognition or biometric categorisation · label AI-generated synthetic content as such.",
  },
  {
    id: "ai-timeline", topic: "ai-act", track: "III",
    q: "When does the EU AI Act apply?",
    a: "Entered into force Aug 2024. Prohibitions apply Feb 2025. GPAI obligations Aug 2025. Most other rules Aug 2026. High-risk AI in regulated products Aug 2027.",
  },
  {
    id: "ai-territorial", topic: "ai-act", track: "III",
    q: "Does the AI Act apply outside the EU?",
    a: "Yes — extraterritorial. Applies to providers placing systems on the EU market AND to providers/deployers in third countries where the OUTPUT is used in the EU. UK orgs serving EU users are in scope.",
  },
  {
    id: "ai-vs-uk", topic: "ai-act", track: "III",
    q: "How does the UK approach AI regulation differently?",
    a: "Principles-based, sector-led, no central AI act (yet). Existing regulators (ICO, Ofcom, FCA, MHRA) apply 5 cross-cutting principles. AI Safety Institute focuses on frontier-model risks. Watch for the upcoming AI Bill.",
  },

  /* ─── Certifications ─────────────────────────────────────────── */
  {
    id: "cert-cippe", topic: "certs", track: "IV",
    q: "What is CIPP/E?",
    a: "Certified Information Privacy Professional / Europe. IAPP's flagship knowledge cert on European data protection law. Multiple-choice exam, ~£500. The benchmark for in-house DP roles in Europe.",
  },
  {
    id: "cert-cipm", topic: "certs", track: "IV",
    q: "CIPM vs CIPP/E",
    a: "CIPM (Certified Information Privacy Manager) is operational — building and running a privacy programme. CIPP/E is the law. Most DPOs hold both. Often paired with CIPT for tech depth.",
  },
  {
    id: "cert-cipt", topic: "certs", track: "IV",
    q: "What does CIPT cover?",
    a: "Certified Information Privacy Technologist. Privacy engineering, privacy-by-design, anonymisation/pseudonymisation, privacy-enhancing tech (PETs), AI/ML privacy. For engineering-adjacent practitioners.",
  },
  {
    id: "cert-bcs", topic: "certs", track: "IV",
    q: "BCS Practitioner Certificate in Data Protection",
    a: "Chartered Institute for IT cert focused on UK GDPR & DPA 2018. Often a UK alternative to CIPP/E. ~£900 with the training course. Recognised by UK employers, including public sector.",
  },
  {
    id: "cert-aigp", topic: "certs", track: "IV",
    q: "AIGP — what is it?",
    a: "IAPP's Artificial Intelligence Governance Professional. Newer cert (2024) covering AI governance, EU AI Act, NIST AI RMF, ISO/IEC 42001, risk management. Becoming the AI-governance benchmark.",
  },
  {
    id: "cert-ccsp", topic: "certs", track: "IV",
    q: "Where does (ISC)² CCSP fit?",
    a: "Certified Cloud Security Professional. Security/cloud cert with strong DP overlap (data sovereignty, transfers, shared responsibility). Useful for hybrid DP/security roles. Requires 5 years' experience.",
  },
  {
    id: "cert-cisa", topic: "certs", track: "IV",
    q: "What's the value of ISACA CISA for a DP practitioner?",
    a: "Certified Information Systems Auditor. Strong for compliance/audit-flavoured DP roles, especially DPIA assurance, processor due diligence, third-party audits. Heavy on governance frameworks.",
  },
  {
    id: "cert-priority", topic: "certs", track: "IV",
    q: "Sensible order for a UK practitioner starting out",
    a: "1. Free: ICO 'Introduction to Data Protection'\n2. BCS Practitioner Certificate OR CIPP/E (pick one based on budget & target employers)\n3. CIPM (operational)\n4. AIGP (if AI-focused)\n5. CIPT or CCSP (if tech-focused)",
  },
  {
    id: "cert-renewal", topic: "certs", track: "IV",
    q: "Do IAPP certs expire?",
    a: "Yes — IAPP certs require annual membership + 20 CPE credits every 2 years. BCS certs don't expire but BCS recommends ongoing CPD. Plan for ongoing cost (~£250/yr IAPP membership).",
  },
];
