/* === Privacy in Practice — Scenario Exercises ===
   Real-world privacy situations with model answers and analysis.
   Exposed as window.ScenariosPage for routing via app.jsx. */

const { useState: useSC } = React;

const SCENARIOS = [
  {
    id: "breach-email",
    tag: "Data Breach",
    tagColor: "tag-coral",
    area: "Data Protection",
    difficulty: "Intermediate",
    title: "The misdirected email",
    situation: `You are the DPO at a mid-size financial services firm. On Monday morning, a member of the customer services team tells you they accidentally sent an email containing a spreadsheet of 340 customer names, email addresses, phone numbers and loan account balances to another customer's email address — instead of to an internal team. The recipient replied to say they had received it and had deleted it. The email was sent on Friday afternoon and the team member realised the mistake over the weekend but waited until Monday to report it. It is now Tuesday 9am.`,
    questions: [
      "Does this constitute a personal data breach? Why?",
      "Is the breach notifiable to the ICO? When should this have been reported?",
      "Do you need to inform the affected data subjects?",
      "What immediate steps should you take today?",
      "What systemic issues does this incident reveal?",
    ],
    model: {
      overview: "This is a textbook personal data breach scenario involving confidentiality and a delayed internal report. The key tensions are the 72-hour ICO window and the risk assessment for 340 individuals.",
      points: [
        {
          heading: "Is this a breach?",
          body: "Yes. A personal data breach is defined under UK GDPR Art. 4(12) as a security incident leading to the accidental or unlawful disclosure of personal data. Sending financial data to an unintended recipient is an accidental disclosure — a confidentiality breach. The fact the recipient has 'deleted' the email does not undo the breach.",
        },
        {
          heading: "ICO notification — timing problem",
          body: "The 72-hour clock started when you (the organisation) became aware. The team member became aware over the weekend. The legal position is that the controller 'becomes aware' when any staff member has reasonable certainty a breach has occurred — not when the DPO is told. The notification window likely expired Monday morning. You must notify the ICO now (Tuesday 9am) and include documented reasons for the delay. The delay caused by the team member not immediately escalating is a compounding factor.",
        },
        {
          heading: "Risk assessment",
          body: "The data affected includes financial data (loan balances) alongside contact data for 340 individuals — this is medium-to-high sensitivity. Mitigating factor: the recipient acknowledged receipt and claims to have deleted it. However, you cannot verify deletion and should not rely solely on their assurance. The ICO notification is required. Individual notification depends on whether you assess the risk as 'high' — given the financial nature of the data and 340 individuals, this is likely to meet that threshold.",
        },
        {
          heading: "Immediate steps",
          body: "1. Document everything you know in your breach log now. 2. Report to the ICO via the self-report portal — note the delay and reasons. 3. Contact the recipient to formally request written confirmation of deletion and that they have not shared the data. 4. Draft individual communications to the 340 affected customers explaining what happened, what data was involved, and what you are doing. 5. Notify senior management and legal. 6. Preserve the email trail as evidence.",
        },
        {
          heading: "Systemic issues",
          body: "The 3-day delay in reporting internally indicates your incident response procedure is not working. Staff are either unaware of the requirement to report breaches immediately, or fear the consequences of doing so. Recommended actions: refresh breach reporting training for all staff; create a clear, blame-free reporting culture; implement technical controls (e.g., DLP rules on bulk personal data in attachments); review the spreadsheet use case — should this data ever be in an attachment rather than a secure portal?",
        },
      ],
      refs: ["UK GDPR Art. 4(12), Art. 33, Art. 34", "ICO self-report portal", "ICO breach reporting guidance"],
    },
  },

  {
    id: "sar-exemployee",
    tag: "Data Subject Rights",
    tagColor: "tag-lavender",
    area: "Data Protection",
    difficulty: "Intermediate",
    title: "SAR from a disgruntled ex-employee",
    situation: `You work in the HR/privacy team at a 200-person retail company. Three weeks after being dismissed for gross misconduct, a former employee submits a Subject Access Request via email requesting "all personal data you hold about me". Your HR director asks whether you really have to comply, since the individual has an active employment tribunal claim against the company. Your employment solicitors have told HR not to send any documents to the individual directly because of the litigation. The deadline is approaching in 9 days.`,
    questions: [
      "Must you comply with the SAR despite the ongoing litigation?",
      "Can you withhold information relevant to the tribunal claim?",
      "How do you handle the tension between your solicitor's instruction and GDPR obligations?",
      "What exemptions, if any, might apply?",
      "What is your recommended approach?",
    ],
    model: {
      overview: "This is one of the most common real-world DP conflicts: a SAR used tactically in employment litigation. Understanding the limits of data protection exemptions and the primacy of the right of access is essential.",
      points: [
        {
          heading: "Must you comply?",
          body: "Yes. The right of access under UK GDPR Art. 15 applies regardless of why the individual is making the request or whether litigation is ongoing. There is no 'litigation exclusion' as such. The existence of a tribunal claim does not suspend the obligation to respond. Refusing or ignoring the SAR because of the litigation could itself be a UK GDPR breach.",
        },
        {
          heading: "Withholding information — what the law says",
          body: "DPA 2018 Schedule 2 Part 4 contains relevant exemptions. The 'legal professional privilege' exemption (para. 19) allows you to withhold information that is subject to legal professional privilege. Specifically, communications with your solicitors prepared for the purpose of the litigation may be withheld. However, ordinary HR records (disciplinary records, emails with the employee, payroll data, performance reviews) are not privileged and must be disclosed.",
        },
        {
          heading: "Solicitor's instruction vs GDPR",
          body: "Your solicitors are advising on the litigation strategy — their instruction not to send documents 'directly' is about the litigation, not about GDPR. You can satisfy both: comply with the SAR by providing all non-exempt personal data, and ensure this is done through the formal SAR process (not as informal 'disclosure'). Inform your solicitors that a SAR has been received and that you are obliged to respond — this is not the same as voluntarily producing documents in litigation.",
        },
        {
          heading: "Applicable exemptions",
          body: "Consider: (1) Legal professional privilege — withhold any advice from solicitors or documents created for the purpose of the litigation. (2) Third party data — redact personal data about other individuals unless it is reasonable to disclose without their consent. (3) The 'management information' exemption (para. 37) is often misapplied — it does not exempt disciplinary records; it is very narrow. Do not overuse exemptions. Where you withhold information, you must tell the individual that information exists but is being withheld and why.",
        },
        {
          heading: "Recommended approach",
          body: "1. Respond within the deadline (day 9 is close). 2. Conduct a thorough search: HR files, emails, payroll, performance records, disciplinary records, CCTV if any. 3. Apply redactions for third party personal data. 4. Withhold only genuinely privileged communications — document each withholding decision. 5. Provide a cover letter explaining the structure of the response, what has been withheld and why. 6. Brief your solicitors on what you have disclosed so they are prepared.",
        },
      ],
      refs: ["UK GDPR Art. 15", "DPA 2018 Sch. 2 Part 4", "ICO SAR employment guidance", "Dawson-Damer v Taylor Wessing (2017)"],
    },
  },

  {
    id: "special-category",
    tag: "Special Category Data",
    tagColor: "tag-sun",
    area: "Data Protection",
    difficulty: "Advanced",
    title: "Health data in a workplace wellbeing app",
    situation: `Your employer (a 5,000-person insurance group) is launching a voluntary employee wellbeing app. The app tracks sleep patterns, daily mood scores and optional health conditions (e.g., anxiety, diabetes). The provider is a US-based SaaS company. The HR director says employees can just 'tick a box to agree' when they download the app. Participation will be encouraged by managers and linked to a wellbeing points scheme that feeds into the annual bonus discussion. You have been asked to review this before launch.`,
    questions: [
      "What categories of data are involved and what does this mean for the legal framework?",
      "Is 'tick a box to agree' a valid lawful basis? What are the risks?",
      "What are the international transfer considerations?",
      "What issues arise from the manager encouragement and bonus linkage?",
      "What would you recommend before launch?",
    ],
    model: {
      overview: "This scenario combines several high-risk processing elements: special category health data, potentially invalid consent, international transfers, and a power imbalance between employer and employee. A DPIA is almost certainly required.",
      points: [
        {
          heading: "Data categories involved",
          body: "Sleep tracking and mood scores are likely 'health data' under UK GDPR Art. 9 (data concerning health). Optional health conditions (anxiety, diabetes) are definitively special category data. This triggers Art. 9 and requires both an Art. 6 lawful basis AND an Art. 9 condition. It also likely requires a DPIA (large-scale processing of health data by an employer).",
        },
        {
          heading: "Consent as lawful basis — fatal flaw",
          body: "The ICO's guidance is explicit: in an employment context, consent is rarely valid because of the inherent imbalance of power. Employees may not feel genuinely free to refuse when managers are encouraging participation and when it is linked (even indirectly) to bonus discussions. UK GDPR requires consent to be 'freely given' — this condition cannot be satisfied here. A 'tick a box to agree' presented at download is particularly weak. The organisation should not rely on consent for this processing.",
        },
        {
          heading: "Alternative Art. 9 condition",
          body: "If employment law creates an obligation around occupational health and wellbeing, Art. 9(2)(b) (employment and social protection law) may apply — but this requires a specific legal basis in UK law, and voluntary wellbeing apps do not typically qualify. Art. 9(2)(a) (explicit consent) could be used if the consent issues are addressed (true voluntariness, no detriment to refusal) — but the bonus linkage makes this very difficult. Legal advice is needed before relying on any basis.",
        },
        {
          heading: "International transfer — US provider",
          body: "The US is not on the UK's adequacy list. The data transfer to the US SaaS provider requires a valid transfer mechanism: typically an International Data Transfer Agreement (IDTA) or UK Addendum to EU SCCs. You must conduct a Transfer Risk Assessment (TRA) to assess whether US surveillance laws (e.g., FISA 702, EO 12333) undermine the protection. The sensitivity of health data makes this a high-risk transfer requiring careful scrutiny.",
        },
        {
          heading: "Recommendations before launch",
          body: "1. Do not launch until these issues are resolved — the legal risk is significant. 2. Commission a DPIA — this is almost certainly a mandatory processing activity. 3. Remove any link between app participation and bonus/performance discussions immediately. 4. Make participation genuinely voluntary with a clearly communicated right to withdraw at any time with no consequence. 5. Review the US transfer mechanism — obtain and review IDTAs; conduct a TRA. 6. Identify a proper Art. 9 condition — legal advice needed. 7. Review the vendor's data processing agreement and subprocessor arrangements. 8. Consider whether a UK or EU-hosted alternative exists.",
        },
      ],
      refs: ["UK GDPR Art. 9", "UK GDPR Art. 45–49", "ICO consent guidance (employment)", "ICO health data guidance", "ICO international transfers guidance"],
    },
  },

  {
    id: "marketing-consent",
    tag: "Marketing & Consent",
    tagColor: "tag-mint",
    area: "Data Protection",
    difficulty: "Foundation",
    title: "Pre-ticked boxes and the marketing list",
    situation: `You join a retailer as their new data protection lead. In your first week, you discover that the company's website sign-up form has a pre-ticked checkbox that reads: "I agree to receive marketing emails from [Company] and its carefully selected partners." The company has been sending weekly marketing emails to this list of 85,000 subscribers for three years. The sales team is resistant to any changes because "these are our best-converting leads."`,
    questions: [
      "Is the existing consent mechanism valid under UK GDPR?",
      "What are the PECR implications here?",
      "Do you need to stop all marketing immediately?",
      "How do you handle the existing list of 85,000?",
      "What should the remediated sign-up process look like?",
    ],
    model: {
      overview: "Pre-ticked boxes are one of the clearest examples of invalid consent under UK GDPR. This scenario requires balancing compliance obligations against commercial reality, and understanding the intersection of UK GDPR and PECR.",
      points: [
        {
          heading: "Validity of the existing consent",
          body: "Invalid. UK GDPR Art. 7 and Recital 32 explicitly state that silence, pre-ticked boxes or inactivity do not constitute consent. Consent must be an unambiguous affirmative action. A pre-ticked box is the archetypal invalid consent mechanism. The ICO has been clear on this since GDPR implementation. Additionally, lumping company marketing and 'selected partners' into a single checkbox violates the specificity requirement — consent must be granular per purpose.",
        },
        {
          heading: "PECR implications",
          body: "The Privacy and Electronic Communications Regulations 2003 (PECR) govern direct marketing by electronic means (email, SMS). PECR requires prior consent for unsolicited electronic marketing — except where the 'soft opt-in' applies. The soft opt-in allows marketing to existing customers who purchased similar products and were given a clear opportunity to opt out at the time of purchase and in each subsequent communication. If these 85,000 subscribers are customers (not just sign-ups), some may be contactable under the soft opt-in — but not all, and only for your own similar products (not 'partner' marketing).",
        },
        {
          heading: "Immediate action on current marketing",
          body: "You should not continue sending to the full list as if consent is valid — you have constructive knowledge it is not. However, you do not necessarily need to stop all marketing immediately. Segment the list: identify which subscribers may qualify under the PECR soft opt-in (genuine customers, recent purchase, opted out not taken). For those who cannot rely on soft opt-in or another basis, you should cease marketing unless you can establish valid consent.",
        },
        {
          heading: "Handling the existing list of 85,000",
          body: "A 're-permissioning campaign' (asking the list to re-consent) is one option, but must be executed carefully: you need a lawful basis to send the re-permissioning email itself. You can use the soft opt-in for that email if it qualifies. The re-permissioning email must be clearly worded, offer a simple way to opt in, and make clear that silence means removal from the list. Expect significant list shrinkage — present this to the sales team as the correct outcome: a smaller but genuinely consenting list converts better and carries no enforcement risk.",
        },
        {
          heading: "Remediated sign-up process",
          body: "1. Remove the pre-ticked box immediately. 2. Replace with separate, clearly labelled unchecked checkboxes — one for company marketing, one (if you wish to keep it) for partner marketing. 3. Provide brief, plain-language description of what each means. 4. Include a privacy notice link. 5. Record timestamp, IP, form version at point of consent. 6. Review every 12 months to ensure the consent is still valid.",
        },
      ],
      refs: ["UK GDPR Art. 4(11), Art. 7", "PECR Reg. 22", "ICO direct marketing guidance", "ICO PECR guidance", "Planet49 (CJEU C-673/17)"],
    },
  },

  {
    id: "dpia-ai",
    tag: "AI & Automated Decisions",
    tagColor: "tag-blush",
    area: "AI Governance",
    difficulty: "Advanced",
    title: "AI-powered recruitment screening",
    situation: `A 3,000-person professional services firm is piloting an AI CV screening tool purchased from a third-party vendor. The tool analyses CVs and video interviews, scoring candidates on 'culture fit', communication style, and predicted job performance. Only candidates scoring above 70% are passed to human reviewers. Candidates are told the application will be "assessed using automated tools." The HR director believes this is GDPR-compliant because candidates are "informed" in the job advert. You have been asked to provide a compliance assessment.`,
    questions: [
      "Does this constitute automated decision-making under UK GDPR Art. 22? Why does that matter?",
      "Is the current transparency sufficient?",
      "What lawful basis and Art. 9 conditions might apply?",
      "What rights do candidates have, and how should the firm handle them?",
      "What would a compliant implementation require?",
    ],
    model: {
      overview: "AI recruitment tools are a high-profile enforcement area. This scenario involves automated decision-making, biometric/behavioural data, transparency obligations, and the risk of discriminatory impact. The current implementation has several significant compliance gaps.",
      points: [
        {
          heading: "Art. 22 automated decision-making",
          body: "UK GDPR Art. 22 applies where a decision is made solely by automated means and produces legal or similarly significant effects. Rejecting a candidate at the screening stage — meaning they never get human review — is a 'similarly significant' effect. The threshold of 70% determining who gets human review means the AI is the sole decision-maker for all candidates who score below it. Art. 22 is therefore likely engaged. This requires: a legal basis (consent, contract, or explicit legal authorisation); meaningful information about the logic; human review on request; ability to contest the decision.",
        },
        {
          heading: "Video interview analysis — special category risk",
          body: "If the video analysis uses facial recognition or emotion detection technology, it may process biometric data (Art. 9 special category) or infer health/psychological data. Even without explicit biometrics, inferring 'communication style' and 'culture fit' from video may amount to profiling on characteristics that proxy for protected characteristics (accent, race, disability). This significantly increases risk and likely requires an Art. 9(2) condition.",
        },
        {
          heading: "Transparency gap",
          body: "Telling candidates that applications will be 'assessed using automated tools' is wholly insufficient. UK GDPR Art. 13 and Art. 22(3) require meaningful information about the logic involved and the significance and envisaged consequences of such processing. Candidates must understand: that an AI will make or heavily influence a rejection decision; what factors the AI assesses; how scores are calculated in broad terms; and their rights to contest.",
        },
        {
          heading: "Candidate rights",
          body: "Candidates have the right to: (1) not be subject to solely automated decisions (unless a lawful basis applies); (2) obtain human review of the decision; (3) express their point of view; (4) contest the decision. The current system does not appear to offer any of these. The firm must implement a clear, accessible mechanism for candidates to request human review and must have a genuine human capable of reconsidering the decision — not merely rubber-stamping the AI output.",
        },
        {
          heading: "Compliant implementation requirements",
          body: "Before continuing the pilot: 1. Conduct a DPIA — mandatory (large-scale profiling, automated decisions, potential special category data). 2. Rewrite candidate-facing transparency notices to explain the AI, its factors, and their rights. 3. Implement a human review mechanism and train HR to use it genuinely. 4. Audit the AI for discriminatory impact by protected characteristic — document findings. 5. Review the vendor DPA — are they a processor? Do they use your candidates' data to train their model? 6. Consider whether the tool can be configured so no decision is made solely by automation. 7. Legal basis: consent is problematic (power imbalance); legitimate interests requires a strong LIA and may not overcome Art. 22 restrictions. Seek legal advice.",
        },
      ],
      refs: ["UK GDPR Art. 13, Art. 22", "ICO AI and data protection guidance", "ICO automated decision-making guidance", "Equality Act 2010", "ICO employment practices code"],
    },
  },
];

const TAG_COLORS = {
  "tag-coral": "var(--coral)",
  "tag-lavender": "var(--lavender)",
  "tag-sun": "var(--sun)",
  "tag-mint": "var(--mint)",
  "tag-blush": "var(--blush)",
};

function ScenarioCard({ sc, isOpen, onToggle }) {
  const [revealed, setRevealed] = useSC(false);

  React.useEffect(() => {
    if (!isOpen) setRevealed(false);
  }, [isOpen]);

  return (
    <div className={"sc-card reveal" + (isOpen ? " sc-card-open" : "")}>
      <button className="sc-card-head" onClick={() => onToggle(sc.id)} aria-expanded={isOpen}>
        <div className="sc-card-meta">
          <span className={"sc-tag " + sc.tagColor}>{sc.tag}</span>
          <span className="sc-area">{sc.area}</span>
          <span className="sc-diff">Difficulty: {sc.difficulty}</span>
        </div>
        <div className="sc-card-title-row">
          <h2 className="sc-title">{sc.title}</h2>
          <span className="sc-chevron" aria-hidden="true">{isOpen ? "▲" : "▼"}</span>
        </div>
      </button>

      {isOpen && (
        <div className="sc-body">
          <div className="sc-situation-block">
            <div className="sc-situation-label">The situation</div>
            <p className="sc-situation">{sc.situation}</p>
          </div>

          <div className="sc-questions-block">
            <div className="sc-qs-label">Consider these questions</div>
            <ol className="sc-questions">
              {sc.questions.map((q, i) => (
                <li key={i} className="sc-question">{q}</li>
              ))}
            </ol>
          </div>

          {!revealed ? (
            <button className="sc-reveal-btn" onClick={() => setRevealed(true)}>
              Reveal model answer →
            </button>
          ) : (
            <div className="sc-model">
              <div className="sc-model-head">
                <span className="sc-model-badge">Model answer</span>
                <p className="sc-model-overview">{sc.model.overview}</p>
              </div>
              <div className="sc-model-points">
                {sc.model.points.map((pt, i) => (
                  <div key={i} className="sc-point">
                    <div className="sc-point-heading">{pt.heading}</div>
                    <p className="sc-point-body">{pt.body}</p>
                  </div>
                ))}
              </div>
              {sc.model.refs && (
                <div className="sc-model-refs">
                  <span className="sc-refs-label">References: </span>
                  {sc.model.refs.map((r, i) => (
                    <span key={i} className="sc-ref">{r}{i < sc.model.refs.length - 1 ? " · " : ""}</span>
                  ))}
                </div>
              )}
              <button className="sc-hide-btn" onClick={() => setRevealed(false)}>Hide model answer</button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function ScenariosPage() {
  const [open, setOpen] = useSC(null);
  const [filter, setFilter] = useSC("all");

  const tags = ["all", ...Array.from(new Set(SCENARIOS.map(s => s.tag)))];
  const filtered = filter === "all" ? SCENARIOS : SCENARIOS.filter(s => s.tag === filter);

  const handleToggle = (id) => {
    setOpen(open === id ? null : id);
  };

  return (
    <>
      <SectionHead title="Scenario Practice" kicker="Real situations · analyse · model answers" />
      <section className="sc-section">
        <div className="wrap sc-wrap">
          <div className="sc-intro reveal">
            <p>
              Each scenario presents a realistic workplace situation. Read it carefully, work through the questions yourself — then reveal the model answer to check your reasoning.
              These exercises reflect common issues faced by privacy professionals at all levels.
            </p>
          </div>

          <div className="sc-filter-row">
            {tags.map(tag => (
              <button
                key={tag}
                className={"sc-filter-btn" + (filter === tag ? " is-active" : "")}
                onClick={() => { setFilter(tag); setOpen(null); }}
              >
                {tag === "all" ? "All scenarios" : tag}
              </button>
            ))}
          </div>

          <div className="sc-list">
            {filtered.map(sc => (
              <ScenarioCard
                key={sc.id}
                sc={sc}
                isOpen={open === sc.id}
                onToggle={handleToggle}
              />
            ))}
          </div>

          <div className="sc-bottom-cta reveal">
            <a className="sc-cta-btn" href="./study.html">Study cards</a>
            <a className="sc-cta-btn sc-cta-quiz" href="./quiz.html">Take the quiz</a>
          </div>
        </div>
      </section>
    </>
  );
}

Object.assign(window, { ScenariosPage });
