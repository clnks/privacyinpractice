/* === Privacy in Practice — Calculators page === */
const { useState: useCalcS, useMemo: useCalcM } = React;

/* ─── 1. DSAR deadline calculator ─────────────────────────────── */
function addMonths(date, n) {
  const d = new Date(date.getTime());
  const day = d.getDate();
  d.setMonth(d.getMonth() + n);
  // handle month-end overflow (31 Mar + 1 month should land on 30 Apr)
  if (d.getDate() < day) d.setDate(0);
  return d;
}
function fmt(d) {
  return d.toLocaleDateString("en-GB", { weekday: "long", day: "numeric", month: "long", year: "numeric" });
}
function DsarCalc() {
  const today = new Date().toISOString().slice(0, 10);
  const [receipt, setReceipt] = useCalcS(today);
  const [complex, setComplex] = useCalcS(false);
  const [idDelay, setIdDelay] = useCalcS(0);

  const result = useCalcM(() => {
    if (!receipt) return null;
    const start = new Date(receipt);
    start.setDate(start.getDate() + Number(idDelay || 0));
    const standard = addMonths(start, 1);
    const extended = addMonths(start, 3);
    return { start, standard, extended };
  }, [receipt, idDelay]);

  return (
    <article className="calc">
      <header className="calc-head">
        <span className="calc-i">01</span>
        <div>
          <h3>DSAR deadline calculator</h3>
          <p>Compute the one-month deadline (and the extension deadline) from the date of receipt — accounting for identity-verification delay.</p>
        </div>
      </header>
      <div className="calc-body">
        <div className="calc-grid">
          <label className="calc-field">
            <span>Date of receipt</span>
            <input type="date" value={receipt} onChange={e => setReceipt(e.target.value)} />
          </label>
          <label className="calc-field">
            <span>Days lost to ID verification</span>
            <input
              type="number"
              min="0"
              max="60"
              value={idDelay}
              onChange={e => setIdDelay(e.target.value)}
            />
            <small>The clock pauses while you wait for ID. Enter 0 if not applicable.</small>
          </label>
          <label className="calc-toggle">
            <input type="checkbox" checked={complex} onChange={e => setComplex(e.target.checked)} />
            <span>Complex or numerous — extension applies</span>
          </label>
        </div>

        {result && (
          <div className="calc-out">
            <div className="calc-out-row">
              <span className="calc-out-l">Effective start</span>
              <span className="calc-out-v">{fmt(result.start)}</span>
            </div>
            <div className="calc-out-row calc-out-key">
              <span className="calc-out-l">Standard response deadline</span>
              <span className="calc-out-v">{fmt(result.standard)}</span>
            </div>
            {complex && (
              <div className="calc-out-row calc-out-warn">
                <span className="calc-out-l">Extended deadline (complex / numerous)</span>
                <span className="calc-out-v">{fmt(result.extended)}</span>
              </div>
            )}
            <div className="calc-note">
              <strong>Important.</strong> The extension only applies if you've told the requester within the first month AND
              explained why the request is complex or numerous. You can't just take the extra two months silently.
            </div>
          </div>
        )}
      </div>
    </article>
  );
}

/* ─── 2. Breach notification decision tree ────────────────────── */
const BREACH_STEPS = [
  {
    id: "personal",
    q: "Was personal data involved?",
    yes: "scale",
    no: "out-scope",
  },
  {
    id: "scale",
    q: "Is the breach likely to result in a risk to people's rights and freedoms?",
    yes: "high",
    no: "no-notify",
    hint: "Think: identity theft · financial loss · reputational damage · loss of confidentiality · discrimination.",
  },
  {
    id: "high",
    q: "Is the risk LIKELY to be HIGH?",
    yes: "notify-both",
    no: "notify-ico",
    hint: "High = identity fraud, financial harm, or sensitive data (special category, criminal offence, payment) exposed.",
  },
];
const BREACH_OUT = {
  "out-scope": {
    head: "Not a personal data breach under UK GDPR",
    body: "If no personal data is involved, this isn't an Article 33 breach. Check whether it's still a security incident under your wider incident-management policy.",
    tone: "ok",
  },
  "no-notify": {
    head: "No ICO notification required",
    body: "Document the breach internally (you still must — Article 33(5)). Update your breach register with the reasoning for why notification wasn't required. ICO can ask to see this.",
    tone: "ok",
  },
  "notify-ico": {
    head: "Notify the ICO within 72 hours",
    body: "Notify within 72 hours of becoming aware. You don't have to notify the individuals affected because the risk isn't high — but document the assessment thoroughly.",
    tone: "warn",
  },
  "notify-both": {
    head: "Notify the ICO AND the individuals",
    body: "ICO within 72 hours of awareness. Individuals without undue delay, in plain language. Exceptions: encryption rendered data unintelligible · subsequent measures eliminated the risk · disproportionate effort (use a public communication instead).",
    tone: "alert",
  },
};
function BreachCalc() {
  const [history, setHistory] = useCalcS(["personal"]);
  const cur = history[history.length - 1];
  const step = BREACH_STEPS.find(s => s.id === cur);
  const out = BREACH_OUT[cur];

  const answer = (val) => {
    const next = step[val];
    setHistory(h => [...h, next]);
  };
  const back = () => setHistory(h => h.length > 1 ? h.slice(0, -1) : h);
  const reset = () => setHistory(["personal"]);

  return (
    <article className="calc">
      <header className="calc-head">
        <span className="calc-i">02</span>
        <div>
          <h3>Breach notification — do I notify?</h3>
          <p>A short walkthrough of the Article 33 / 34 test. Outcome is guidance, not legal advice — but it'll get you 90% of the way to a defensible decision.</p>
        </div>
      </header>
      <div className="calc-body">
        {step && (
          <div className="bt-step">
            <div className="bt-step-num">Step {history.length} of {BREACH_STEPS.length}</div>
            <h4 className="bt-q">{step.q}</h4>
            {step.hint && <p className="bt-hint">{step.hint}</p>}
            <div className="bt-buttons">
              <button className="bt-btn bt-yes" onClick={() => answer("yes")}>Yes</button>
              <button className="bt-btn bt-no" onClick={() => answer("no")}>No</button>
            </div>
          </div>
        )}

        {out && (
          <div className={"bt-out bt-out-" + out.tone}>
            <div className="bt-out-head">{out.head}</div>
            <p>{out.body}</p>
          </div>
        )}

        <div className="bt-controls">
          {history.length > 1 && <button className="bt-link" onClick={back}>← Back one step</button>}
          {history.length > 1 && <button className="bt-link" onClick={reset}>Start over</button>}
        </div>
      </div>
    </article>
  );
}

/* ─── 3. DPIA mandatory checker ───────────────────────────────── */
const DPIA_CRITERIA = [
  { id: "scoring", label: "Evaluation or scoring", help: "Profiling and predicting, especially of work performance, health, behaviour, location." },
  { id: "auto", label: "Automated decision-making with legal or significant effect" },
  { id: "monitor", label: "Systematic monitoring (CCTV, employee monitoring, etc.)" },
  { id: "sensitive", label: "Sensitive or highly personal data (special category, criminal offence, financial)" },
  { id: "scale", label: "Data processed on a large scale" },
  { id: "match", label: "Matching or combining datasets" },
  { id: "vulnerable", label: "Data on vulnerable individuals (children, employees, patients)" },
  { id: "innovative", label: "Innovative use of new technological or organisational solutions", help: "AI, IoT, biometrics, novel ML." },
  { id: "prevents", label: "Prevents data subjects from exercising a right or using a service" },
];
function DpiaCalc() {
  const [checked, setChecked] = useCalcS({});
  const count = Object.values(checked).filter(Boolean).length;

  const verdict = count >= 2
    ? { tone: "alert", head: "DPIA likely mandatory", body: "Two or more of the Article 29 WP criteria are present. The ICO position is that a DPIA must be carried out for this processing. Document the criteria you've met as part of the DPIA's introduction." }
    : count === 1
    ? { tone: "warn", head: "Borderline — strongly consider", body: "One criterion is present. Best practice: complete a screening DPIA. If the answer is unclear, complete a full DPIA — it's harder to defend skipping one than running an unnecessary one." }
    : { tone: "ok", head: "DPIA not legally mandatory on these criteria", body: "But the Article 35 'likely to result in high risk' threshold may still apply. Run the assessment if there's any doubt — and document why you've concluded a DPIA wasn't required." };

  return (
    <article className="calc">
      <header className="calc-head">
        <span className="calc-i">03</span>
        <div>
          <h3>Is a DPIA mandatory?</h3>
          <p>Article 29 Working Party identifies nine criteria. Two or more typically triggers a DPIA. Tick what applies to your processing.</p>
        </div>
      </header>
      <div className="calc-body">
        <ul className="dpc-list">
          {DPIA_CRITERIA.map(c => (
            <li key={c.id} className={checked[c.id] ? "is-on" : ""}>
              <label>
                <input
                  type="checkbox"
                  checked={!!checked[c.id]}
                  onChange={e => setChecked(s => ({ ...s, [c.id]: e.target.checked }))}
                />
                <span className="dpc-box" aria-hidden="true"></span>
                <span className="dpc-text">
                  <span>{c.label}</span>
                  {c.help && <small>{c.help}</small>}
                </span>
              </label>
            </li>
          ))}
        </ul>
        <div className={"dpc-out dpc-out-" + verdict.tone}>
          <div className="dpc-count">
            <span>{count}</span> of 9 criteria selected
          </div>
          <h4>{verdict.head}</h4>
          <p>{verdict.body}</p>
        </div>
      </div>
    </article>
  );
}

function CalculatorsPage() {
  return (
    <>
      <SectionHead
        id="calculators"
        num="∑"
        eyebrow="Tools"
        title="Compliance calculators"
        sub="Three small tools for high-frequency decisions: DSAR deadlines, breach notification, DPIA triggers. None of these is legal advice — but each will get you a defensible answer in 30 seconds."
      />
      <section className="calculators">
        <div className="wrap">
          <DsarCalc />
          <BreachCalc />
          <DpiaCalc />

          <aside className="calc-cta">
            <h3>More calculators on the way</h3>
            <p>Lawful basis chooser · International transfer mechanism selector · MLR risk-rating scorer · SCA exemption checker. Tell me which would help most.</p>
          </aside>
        </div>
      </section>
    </>
  );
}

Object.assign(window, { CalculatorsPage });
