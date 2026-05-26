/* === Privacy in Practice — Decision Trees ===
   Interactive trees: DPIA, Lawful basis, Breach notification.
   Exposed as window.DecisionsPage for routing via app.jsx. */

const { useState: useDT } = React;

// ── Tree data structure ──────────────────────────────────────────────────────
// Each node: { id, q, opts: [{ label, hint?, next }] }
// Leaf nodes: { id, type: "result", outcome, detail, level, refs }
// level: "required" | "not-required" | "check" | "caution"

const TREES = {
  dpia: {
    id: "dpia",
    label: "Do I need a DPIA?",
    glyph: "◈",
    kicker: "Data Protection Impact Assessment",
    intro: "A DPIA is mandatory for certain types of processing before you begin. Work through the questions below to assess whether one is required.",
    start: "d1",
    nodes: {
      d1: {
        id: "d1",
        q: "Is this a new type of processing, or a significant change to existing processing?",
        hint: "New technologies, new purposes, new categories of data, new scale of processing — all count.",
        opts: [
          { label: "Yes — new or significantly changed", next: "d2" },
          { label: "No — existing, unchanged processing", next: "d1b" },
        ],
      },
      d1b: {
        id: "d1b",
        type: "result",
        outcome: "DPIA likely not required",
        detail: "Ongoing, unchanged processing that was lawful at the outset does not automatically trigger a new DPIA requirement. However, if the ICO's list of mandatory processing types applies, a DPIA is still required. You should also document why you concluded no DPIA was needed (accountability principle).",
        level: "not-required",
        refs: ["UK GDPR Art. 35", "ICO DPIA guidance"],
      },
      d2: {
        id: "d2",
        q: "Does the processing involve systematic and extensive profiling or automated decision-making with significant effects on individuals?",
        hint: "Examples: credit scoring, insurance pricing algorithms, HR performance profiling, behavioural advertising.",
        opts: [
          { label: "Yes", next: "result-required" },
          { label: "No", next: "d3" },
        ],
      },
      d3: {
        id: "d3",
        q: "Does the processing involve large-scale processing of special category data or data relating to criminal convictions?",
        hint: "Special categories: health, race/ethnicity, political opinions, religion, trade union membership, genetic data, biometric data, sex life/orientation.",
        opts: [
          { label: "Yes", next: "result-required" },
          { label: "No", next: "d4" },
        ],
      },
      d4: {
        id: "d4",
        q: "Does the processing involve systematic monitoring of a publicly accessible area on a large scale?",
        hint: "Examples: large CCTV networks, tracking movement of people in public spaces, widespread location tracking.",
        opts: [
          { label: "Yes", next: "result-required" },
          { label: "No", next: "d5" },
        ],
      },
      d5: {
        id: "d5",
        q: "Does the processing involve any of the ICO's nine mandatory DPIA trigger categories?",
        hint: "Triggers include: innovative technology use, denial of service decisions, large-scale profiling, biometric data, data matching, invisible processing, tracking location/behaviour, targeting vulnerable groups, or transfers outside the UK where adequate protections are uncertain.",
        opts: [
          { label: "Yes — one or more triggers apply", next: "result-required" },
          { label: "No — none apply", next: "d6" },
        ],
      },
      d6: {
        id: "d6",
        q: "Are two or more of these factors present: new technology used; data used for a purpose not previously disclosed; processing prevents individuals accessing services or opportunities; profiling used; special category data; data from a third party; transfer to another country; data about vulnerable groups?",
        hint: "The ICO recommends a DPIA where two or more of these 'soft triggers' are present, even if mandatory triggers don't apply.",
        opts: [
          { label: "Yes — two or more present", next: "result-caution" },
          { label: "No — fewer than two present", next: "result-not-required" },
        ],
      },
      "result-required": {
        id: "result-required",
        type: "result",
        outcome: "DPIA is required",
        detail: "You must carry out a DPIA before beginning this processing. The DPIA must: describe the processing and its purposes; assess necessity and proportionality; identify and assess risks to individuals; identify measures to mitigate those risks. If a high residual risk remains after mitigation, you must consult the ICO before proceeding. Document the DPIA and keep it under review.",
        level: "required",
        refs: ["UK GDPR Art. 35", "UK GDPR Art. 36", "ICO DPIA screening checklist"],
      },
      "result-caution": {
        id: "result-caution",
        type: "result",
        outcome: "DPIA strongly recommended",
        detail: "While not strictly mandatory on this path, the ICO strongly recommends conducting a DPIA. Carrying one out demonstrates accountability, helps identify and reduce privacy risks, and is considered best practice. Failure to do one when risks are present could be a factor in enforcement action.",
        level: "caution",
        refs: ["UK GDPR Art. 5(2)", "ICO DPIA guidance", "ICO accountability framework"],
      },
      "result-not-required": {
        id: "result-not-required",
        type: "result",
        outcome: "DPIA not required at this stage",
        detail: "Based on your answers, a DPIA is not mandatory for this processing. However, document your decision and rationale (accountability principle). Keep the position under review — if the processing changes, reassess. You may still choose to carry out a voluntary DPIA as good practice.",
        level: "not-required",
        refs: ["UK GDPR Art. 5(2)", "UK GDPR Art. 35(1)"],
      },
    },
  },

  lawful: {
    id: "lawful",
    label: "Which lawful basis?",
    glyph: "⚖",
    kicker: "Article 6 — selecting the right basis",
    intro: "Identifying the correct lawful basis before processing is essential. The basis you choose affects what rights individuals have. Work through the questions in order — the bases are not interchangeable.",
    start: "l1",
    nodes: {
      l1: {
        id: "l1",
        q: "Is the processing required by a specific law or regulation that legally obliges you to do it?",
        hint: "Examples: HMRC payroll reporting, statutory health and safety record keeping, court orders, mandatory AML checks.",
        opts: [
          { label: "Yes — a specific legal obligation requires it", next: "result-legal" },
          { label: "No", next: "l2" },
        ],
      },
      l2: {
        id: "l2",
        q: "Are you a public authority, and is the processing necessary to perform an official public task or exercise a statutory power?",
        hint: "Examples: local authority planning decisions, NHS patient treatment, police crime recording, government benefit payments.",
        opts: [
          { label: "Yes — public task or official authority function", next: "result-public" },
          { label: "No", next: "l3" },
        ],
      },
      l3: {
        id: "l3",
        q: "Is the processing necessary to perform a contract with the data subject, or to take steps at their request before entering a contract?",
        hint: "Examples: processing payment details to fulfil a purchase; processing an applicant's details to respond to their job application; delivering a service the individual has signed up for.",
        opts: [
          { label: "Yes — necessary for a contract with this person", next: "result-contract" },
          { label: "No", next: "l4" },
        ],
      },
      l4: {
        id: "l4",
        q: "Is the processing necessary to protect someone's life — either the data subject's or another person's — where the person is physically or legally unable to give consent?",
        hint: "This is a high bar. Examples: sharing medical data in a life-threatening emergency where the patient is unconscious. Not appropriate simply because someone might benefit.",
        opts: [
          { label: "Yes — genuine life-or-death necessity", next: "result-vital" },
          { label: "No", next: "l5" },
        ],
      },
      l5: {
        id: "l5",
        q: "Has the data subject given you a freely given, specific, informed and unambiguous indication of their wishes — either by a statement or clear affirmative action?",
        hint: "Consent must be: freely given (no imbalance of power, no bundling with terms); specific to this purpose; informed (who you are, what you'll do); and unambiguous (no pre-ticked boxes, no silence). You must keep records.",
        opts: [
          { label: "Yes — valid consent obtained and documented", next: "result-consent" },
          { label: "No — or consent would not be valid here", next: "l6" },
        ],
      },
      l6: {
        id: "l6",
        q: "Do you have a legitimate interest in the processing, is the processing necessary to achieve it, and does it not override the data subject's rights and interests after a balancing test?",
        hint: "A three-part test: (1) Is there a genuine legitimate interest? (2) Is the processing necessary for it? (3) Would a reasonable person expect it, and does the interest override their privacy? You must document this Legitimate Interests Assessment (LIA).",
        opts: [
          { label: "Yes — LIA completed, balance in our favour", next: "result-lia" },
          { label: "No — no clear legitimate interest, or balance tips to individual", next: "result-none" },
        ],
      },
      "result-legal": {
        id: "result-legal",
        type: "result",
        outcome: "Lawful basis: Legal Obligation — Art. 6(1)(c)",
        detail: "Processing is lawful where it is necessary for compliance with a legal obligation to which the controller is subject. You must be able to identify the specific law that creates the obligation. Individuals cannot withdraw consent (there is none) and cannot object to this processing. You cannot use this basis for processing you have merely chosen to do — the legal obligation must actually exist.",
        level: "required",
        refs: ["UK GDPR Art. 6(1)(c)", "ICO lawful basis guidance: legal obligation"],
      },
      "result-public": {
        id: "result-public",
        type: "result",
        outcome: "Lawful basis: Public Task — Art. 6(1)(e)",
        detail: "Processing is lawful where it is necessary for the performance of a task carried out in the public interest or in the exercise of official authority vested in the controller. The task or power must have a clear basis in law. Individuals have the right to object to this processing. Organisations in the private sector rarely qualify.",
        level: "required",
        refs: ["UK GDPR Art. 6(1)(e)", "ICO lawful basis guidance: public task"],
      },
      "result-contract": {
        id: "result-contract",
        type: "result",
        outcome: "Lawful basis: Contract — Art. 6(1)(b)",
        detail: "Processing is lawful where it is necessary for the performance of a contract to which the data subject is party, or to take steps prior to entering a contract at their request. 'Necessary' is key — if you could perform the contract without this data, the basis does not apply. This basis does not cover processing for your own convenience. Individuals cannot object to this processing, but they can complain it is not necessary.",
        level: "required",
        refs: ["UK GDPR Art. 6(1)(b)", "ICO lawful basis guidance: contract"],
      },
      "result-vital": {
        id: "result-vital",
        type: "result",
        outcome: "Lawful basis: Vital Interests — Art. 6(1)(d)",
        detail: "Processing is lawful where it is necessary to protect the vital interests of the data subject or another natural person. This is intended for life-or-death situations and is a last resort where no other basis can be relied upon. It cannot be used where the individual is capable of giving consent. This basis is rarely used outside emergency healthcare and humanitarian contexts.",
        level: "caution",
        refs: ["UK GDPR Art. 6(1)(d)", "ICO lawful basis guidance: vital interests"],
      },
      "result-consent": {
        id: "result-consent",
        type: "result",
        outcome: "Lawful basis: Consent — Art. 6(1)(a)",
        detail: "Consent can be a valid basis but it is not always the most appropriate choice. Consent must be freely given, specific, informed and unambiguous. If there is a clear imbalance of power (e.g., employer/employee), consent may not be freely given. Individuals can withdraw consent at any time and you must make withdrawal as easy as giving it. You must keep records of when and how consent was given.",
        level: "check",
        refs: ["UK GDPR Art. 6(1)(a)", "UK GDPR Art. 7", "ICO consent guidance"],
      },
      "result-lia": {
        id: "result-lia",
        type: "result",
        outcome: "Lawful basis: Legitimate Interests — Art. 6(1)(f)",
        detail: "Legitimate interests is the most flexible basis but requires a documented Legitimate Interests Assessment (LIA). You must identify the legitimate interest, confirm the processing is necessary, and balance it against the individual's interests, rights and freedoms. Individuals have the right to object, and you must stop processing unless you can demonstrate compelling legitimate grounds that override their interests. Not available to public authorities for their public tasks.",
        level: "check",
        refs: ["UK GDPR Art. 6(1)(f)", "UK GDPR Art. 21", "ICO LIA template"],
      },
      "result-none": {
        id: "result-none",
        type: "result",
        outcome: "No lawful basis identified",
        detail: "Processing without a lawful basis is unlawful under UK GDPR. You must not proceed with the processing unless and until you can identify a valid basis. Consider: whether you can restructure the processing so a basis applies; whether you should not collect this data at all; or whether you need legal advice. The ICO can take enforcement action for unlawful processing.",
        level: "caution",
        refs: ["UK GDPR Art. 6", "UK GDPR Art. 5(1)(a)", "ICO enforcement action"],
      },
    },
  },

  breach: {
    id: "breach",
    label: "Is this breach reportable?",
    glyph: "⚠",
    kicker: "ICO notification & individual communication",
    intro: "Not all incidents involving personal data are notifiable breaches. A personal data breach is a security incident that affects the confidentiality, integrity or availability of personal data. Work through this tree to determine your notification obligations.",
    start: "b1",
    nodes: {
      b1: {
        id: "b1",
        q: "Has there been a security incident (accidental or unlawful) affecting the confidentiality, integrity or availability of personal data?",
        hint: "Examples: data sent to the wrong person; ransomware encrypting personal data; a laptop stolen; a database exposed without authorisation; records accidentally deleted.",
        opts: [
          { label: "Yes — personal data has been affected", next: "b2" },
          { label: "No — no personal data involved", next: "result-not-breach" },
        ],
      },
      b2: {
        id: "b2",
        q: "Are you the data controller for this personal data?",
        hint: "If you are a processor, you must notify your controller without undue delay — the controller then decides whether to notify the ICO. You are the controller if you determine the purposes and means of processing.",
        opts: [
          { label: "Yes — we are the controller", next: "b3" },
          { label: "No — we are a processor", next: "result-processor" },
        ],
      },
      b3: {
        id: "b3",
        q: "Is the breach unlikely to result in any risk to the rights and freedoms of individuals?",
        hint: "Low risk examples: encrypted laptop lost where the key is secure; internal-only data already known to affected individuals; data briefly unavailable but quickly restored with no impact. Be honest — err on the side of notification if uncertain.",
        opts: [
          { label: "Yes — the breach is genuinely low/no risk", next: "result-no-notify" },
          { label: "No — there is some risk to individuals", next: "b4" },
        ],
      },
      b4: {
        id: "b4",
        q: "Are you still within 72 hours of first becoming aware of the breach?",
        hint: "'Becoming aware' means when you have a reasonable degree of certainty that a breach has occurred — not when you have complete information. The clock starts then, even if you are still investigating.",
        opts: [
          { label: "Yes — still within 72 hours", next: "b5" },
          { label: "No — more than 72 hours have passed", next: "b4b" },
        ],
      },
      b4b: {
        id: "b4b",
        q: "Can you document a valid reason why notification was not feasible within 72 hours?",
        hint: "The ICO accepts late notification where there is genuine justification. The reasons must accompany the notification. Lack of internal organisation or delayed discovery because of poor processes is generally not an acceptable reason.",
        opts: [
          { label: "Yes — there is a documented valid reason", next: "b5" },
          { label: "No — there is no valid reason for the delay", next: "b5" },
        ],
      },
      b5: {
        id: "b5",
        q: "Is the breach likely to result in a HIGH risk to the rights and freedoms of individuals?",
        hint: "High risk factors: sensitive data involved (health, financial, special categories); large number of people affected; data likely to be misused (e.g., fraud, blackmail); vulnerable individuals affected; irreversible harm possible (e.g., physical safety at risk).",
        opts: [
          { label: "Yes — high risk to individuals likely", next: "result-notify-both" },
          { label: "No — risk present but not high", next: "result-notify-ico" },
        ],
      },
      "result-not-breach": {
        id: "result-not-breach",
        type: "result",
        outcome: "Not a personal data breach",
        detail: "If no personal data is involved, this is not a personal data breach under UK GDPR. You may still need to consider other legal obligations (e.g., cybersecurity incident reporting, sector-specific requirements). Document the incident and your decision for audit purposes.",
        level: "not-required",
        refs: ["UK GDPR Art. 4(12)", "ICO breach reporting guidance"],
      },
      "result-processor": {
        id: "result-processor",
        type: "result",
        outcome: "Notify your controller without undue delay",
        detail: "As a data processor, you must notify the relevant controller(s) without undue delay after becoming aware of a personal data breach. Your contract (DPA) should specify the notification process. You do not directly notify the ICO — that is the controller's responsibility. Cooperate fully with the controller's investigation.",
        level: "check",
        refs: ["UK GDPR Art. 33(2)", "UK GDPR Art. 28"],
      },
      "result-no-notify": {
        id: "result-no-notify",
        type: "result",
        outcome: "No notification required — document internally",
        detail: "Where a breach is unlikely to result in any risk to individuals' rights and freedoms, notification to the ICO is not required. However, you MUST document the breach internally, including: the facts of the breach, its effects, and the remedial action taken. This record is subject to ICO inspection. Reassess if new information emerges that changes the risk level.",
        level: "not-required",
        refs: ["UK GDPR Art. 33(1)", "UK GDPR Art. 33(5)", "ICO breach notification tool"],
      },
      "result-notify-ico": {
        id: "result-notify-ico",
        type: "result",
        outcome: "Report to the ICO within 72 hours",
        detail: "You must notify the ICO without undue delay and where feasible within 72 hours of becoming aware of the breach. If notifying after 72 hours, explain the reasons for the delay. You must provide: the nature of the breach; categories and approximate numbers of data subjects and records affected; contact details of the DPO; likely consequences; measures taken or proposed. You do NOT need to notify affected individuals at this stage, but continue monitoring risk.",
        level: "required",
        refs: ["UK GDPR Art. 33", "ICO self-report portal", "ICO GDPR breach report form"],
      },
      "result-notify-both": {
        id: "result-notify-both",
        type: "result",
        outcome: "Report to ICO AND notify affected individuals",
        detail: "You must report to the ICO within 72 hours AND communicate the breach to affected individuals without undue delay. Individual notification must include: the nature of the breach in plain language; the DPO's contact details; the likely consequences; the measures taken or proposed. You may not need to notify individuals if: you have applied appropriate technical measures making the data unintelligible (e.g., strong encryption); you have taken steps that ensure high risk is no longer likely; it would involve disproportionate effort (in which case, make a public communication). The ICO can order individual notification if you do not act.",
        level: "required",
        refs: ["UK GDPR Art. 33", "UK GDPR Art. 34", "ICO self-report portal"],
      },
    },
  },
};

const LEVEL_META = {
  required: { label: "Action required", cls: "dt-result-required" },
  "not-required": { label: "No action required", cls: "dt-result-ok" },
  check: { label: "Check & document", cls: "dt-result-check" },
  caution: { label: "Caution", cls: "dt-result-caution" },
};

function DTResult({ node, onRestart }) {
  const meta = LEVEL_META[node.level] || LEVEL_META.check;
  return (
    <div className={"dt-result reveal " + meta.cls}>
      <div className="dt-result-badge">{meta.label}</div>
      <h2 className="dt-result-h">{node.outcome}</h2>
      <p className="dt-result-detail">{node.detail}</p>
      {node.refs && node.refs.length > 0 && (
        <div className="dt-result-refs">
          <span className="dt-refs-label">References:</span>
          {node.refs.map((r, i) => <span key={i} className="dt-ref">{r}</span>)}
        </div>
      )}
      <button className="dt-restart-btn" onClick={onRestart}>← Start again</button>
    </div>
  );
}

function DTQuestion({ node, tree, onAnswer, history, onBack }) {
  return (
    <div className="dt-question reveal">
      <p className="dt-q-text">{node.q}</p>
      {node.hint && <p className="dt-q-hint">{node.hint}</p>}
      <div className="dt-opts">
        {node.opts.map((opt, i) => (
          <button key={i} className="dt-opt" onClick={() => onAnswer(opt.next)}>
            <span className="dt-opt-label">{opt.label}</span>
            <span className="dt-opt-arr" aria-hidden="true">→</span>
          </button>
        ))}
      </div>
      {history.length > 0 && (
        <button className="dt-back-btn" onClick={onBack}>← Back</button>
      )}
    </div>
  );
}

function DTBreadcrumb({ history, tree }) {
  if (history.length === 0) return null;
  return (
    <div className="dt-breadcrumb">
      {history.map((nodeId, i) => {
        const node = tree.nodes[nodeId];
        if (!node || node.type === "result") return null;
        return (
          <span key={i} className="dt-crumb">
            Q{i + 1}
            <span className="dt-crumb-sep" aria-hidden="true">›</span>
          </span>
        );
      })}
      <span className="dt-crumb dt-crumb-now">Q{history.length + 1}</span>
    </div>
  );
}

function DTTree({ tree }) {
  const [history, setHistory] = useDT([]);
  const [current, setCurrent] = useDT(tree.start);

  const node = tree.nodes[current];

  const handleAnswer = (nextId) => {
    setHistory([...history, current]);
    setCurrent(nextId);
  };

  const handleBack = () => {
    if (history.length === 0) return;
    const prev = [...history];
    const last = prev.pop();
    setHistory(prev);
    setCurrent(last);
  };

  const handleRestart = () => {
    setHistory([]);
    setCurrent(tree.start);
  };

  if (!node) return null;

  return (
    <div className="dt-tree">
      <DTBreadcrumb history={history} tree={tree} />
      {node.type === "result" ? (
        <DTResult node={node} onRestart={handleRestart} />
      ) : (
        <DTQuestion
          node={node}
          tree={tree}
          onAnswer={handleAnswer}
          history={history}
          onBack={handleBack}
        />
      )}
    </div>
  );
}

function DecisionsPage() {
  const [active, setActive] = useDT("dpia");
  const tree = TREES[active];

  return (
    <>
      <SectionHead title="Decision Trees" kicker="DPIA · Lawful basis · Breach notification" />
      <section className="dt-section">
        <div className="wrap dt-wrap">
          <div className="dt-selector">
            {Object.values(TREES).map((t) => (
              <button
                key={t.id}
                className={"dt-sel-btn" + (active === t.id ? " is-active" : "")}
                onClick={() => setActive(t.id)}
              >
                <span className="dt-sel-glyph" aria-hidden="true">{t.glyph}</span>
                <span className="dt-sel-body">
                  <span className="dt-sel-label">{t.label}</span>
                  <span className="dt-sel-kicker">{t.kicker}</span>
                </span>
              </button>
            ))}
          </div>
          <div className="dt-panel">
            <div className="dt-intro reveal">
              <p>{tree.intro}</p>
            </div>
            <DTTree key={active} tree={tree} />
          </div>
        </div>
      </section>
    </>
  );
}

Object.assign(window, { DecisionsPage });
