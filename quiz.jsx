/* === Privacy in Practice — Knowledge Quiz ===
   10 questions across UK GDPR, DPA 2018, and privacy fundamentals.
   Exposed as window.QuizPage for routing via app.jsx. */

const { useState: useQ, useEffect: useQE } = React;

const QUIZ_QUESTIONS = [
  {
    q: "Under UK GDPR, what is the maximum fine for a higher-tier infringement?",
    opts: [
      "£4 million or 1% of global annual turnover",
      "£8.7 million or 2% of global annual turnover",
      "£17.5 million or 4% of global annual turnover, whichever is higher",
      "£10 million or 2% of global annual turnover",
    ],
    correct: 2,
    explain:
      "UK GDPR / DPA 2018 sets the higher tier at £17.5 million or 4% of total annual worldwide turnover (whichever is greater). The lower tier is £8.7 million or 2%. Fines must be effective, proportionate and dissuasive.",
    ref: "DPA 2018 s.157; UK GDPR Art. 83",
  },
  {
    q: "A data subject submits a Subject Access Request (SAR) on 3 March. What is the default deadline for responding?",
    opts: [
      "3 April (one calendar month)",
      "3 May (two calendar months)",
      "3 June (three calendar months)",
      "3 April — unless 'complex', in which case 3 June",
    ],
    correct: 0,
    explain:
      "The standard deadline is one calendar month from receipt (so 3 April). For complex or numerous requests, you can extend by a further two months — but you must notify the data subject of the extension within the first month.",
    ref: "UK GDPR Art. 12(3)",
  },
  {
    q: "Which of the following is NOT a lawful basis for processing under UK GDPR Article 6?",
    opts: [
      "Consent of the data subject",
      "Performance of a contract",
      "Transparency of the processing",
      "Legitimate interests of the controller",
    ],
    correct: 2,
    explain:
      "Transparency is a data protection principle (Art. 5(1)(a)), not a lawful basis for processing. The six lawful bases are: consent, contract, legal obligation, vital interests, public task, and legitimate interests.",
    ref: "UK GDPR Art. 5(1)(a) & Art. 6(1)",
  },
  {
    q: "A breach of personal data is discovered on a Tuesday evening. When must the ICO be notified (assuming the breach is likely to result in a risk to individuals)?",
    opts: [
      "Within 24 hours of discovery",
      "Within 48 hours of discovery",
      "Within 72 hours of becoming aware",
      "Within 7 days of becoming aware",
    ],
    correct: 2,
    explain:
      "Under UK GDPR Art. 33, controllers must notify the ICO without undue delay and, where feasible, within 72 hours of becoming aware of a breach — provided the breach is likely to result in a risk to the rights and freedoms of individuals. If notification is made after 72 hours, reasons for the delay must accompany it.",
    ref: "UK GDPR Art. 33",
  },
  {
    q: "Which of the following organisations is NOT automatically required to appoint a Data Protection Officer (DPO) under UK GDPR?",
    opts: [
      "A local authority processing housing benefit records",
      "A hospital processing patient health data at scale",
      "A small digital marketing agency tracking website visitors",
      "A private security firm conducting large-scale systematic monitoring via CCTV",
    ],
    correct: 2,
    explain:
      "DPO appointment is mandatory for: (1) public authorities; (2) organisations whose core activities involve large-scale systematic monitoring of individuals; (3) organisations whose core activities involve large-scale processing of special category or criminal offence data. A small marketing agency tracking a limited number of website visitors would not typically meet these thresholds, although best practice recommends appointing one.",
    ref: "UK GDPR Art. 37; ICO DPO guidance",
  },
  {
    q: "Which of the following is a 'special category' of personal data under UK GDPR?",
    opts: [
      "Home address and phone number",
      "Financial account details",
      "Trade union membership",
      "Employment history",
    ],
    correct: 2,
    explain:
      "UK GDPR Art. 9 lists eight special categories: racial or ethnic origin, political opinions, religious or philosophical beliefs, trade union membership, genetic data, biometric data (for ID purposes), health data, and data about sex life or sexual orientation. Financial details and employment history are not special categories, though they may still be sensitive.",
    ref: "UK GDPR Art. 9(1)",
  },
  {
    q: "What does the 'data minimisation' principle require under UK GDPR?",
    opts: [
      "Personal data must be stored for the minimum possible time",
      "Personal data must be adequate, relevant and limited to what is necessary for the purpose",
      "Controllers must use the fewest number of processors possible",
      "Data subjects should receive minimal communications about processing",
    ],
    correct: 1,
    explain:
      "Data minimisation (Art. 5(1)(c)) requires that personal data be adequate (sufficient to properly fulfil the purpose), relevant (has a rational link to the purpose), and limited to what is necessary. It is distinct from storage limitation (Art. 5(1)(e)), which addresses retention periods.",
    ref: "UK GDPR Art. 5(1)(c)",
  },
  {
    q: "An organisation wishes to transfer personal data to a country outside the UK. Which of the following is a valid transfer mechanism?",
    opts: [
      "The organisation's internal privacy policy permits international transfers",
      "The destination country has an adequacy decision from the UK Secretary of State",
      "The data subject verbally agreed to the transfer once",
      "The transfer is encrypted end-to-end",
    ],
    correct: 1,
    explain:
      "Post-Brexit, the UK has its own adequacy framework. Transfers to countries with a UK adequacy decision (e.g., the EEA plus others) are permitted. Other mechanisms include International Data Transfer Agreements (IDTAs) or UK Addendum to EU SCCs. Encryption is a security measure, not a transfer mechanism. Verbal consent is insufficient alone for repeated transfers.",
    ref: "UK GDPR Art. 45–49; ICO international transfers guidance",
  },
  {
    q: "Under the accountability principle, an organisation must:",
    opts: [
      "Simply comply with UK GDPR obligations",
      "Appoint a DPO in all circumstances",
      "Be able to demonstrate compliance through documented policies, records and measures",
      "Publish its ROPA on its website",
    ],
    correct: 2,
    explain:
      "Accountability (Art. 5(2)) requires controllers to not only comply with the principles but also be able to demonstrate compliance. This typically includes maintaining a Record of Processing Activities (ROPA), conducting DPIAs where required, implementing data protection by design and default, training staff, and keeping documented evidence of decisions.",
    ref: "UK GDPR Art. 5(2) & Art. 24",
  },
  {
    q: "A data subject has the right to erasure ('right to be forgotten') under UK GDPR. In which situation does this right ALWAYS apply, with no exceptions available to the controller?",
    opts: [
      "When the data is no longer necessary for the original purpose",
      "When the data subject withdraws consent and there is no other lawful basis",
      "When the data subject objects to processing for direct marketing purposes",
      "The right to erasure always has exceptions — none of these are absolute",
    ],
    correct: 3,
    explain:
      "The right to erasure (Art. 17) is not absolute. Even withdrawal of consent or an objection to direct marketing can be outweighed by other considerations (e.g., a legal obligation to retain data, freedom of expression, public interest). The closest to an unconditional trigger is an objection to direct marketing (Art. 21(3)), where no exemptions apply to the objection itself — but even then, erasure is not guaranteed if another basis exists.",
    ref: "UK GDPR Art. 17 & Art. 21",
  },
];

const GRADE_BANDS = [
  { min: 9, label: "Expert", desc: "Outstanding — you have a thorough command of UK data protection law.", color: "grade-expert" },
  { min: 7, label: "Proficient", desc: "Strong result — you have solid working knowledge with a few areas to revisit.", color: "grade-prof" },
  { min: 5, label: "Developing", desc: "Good foundation — focus on the explanations below to consolidate your understanding.", color: "grade-dev" },
  { min: 0, label: "Beginner", desc: "Keep studying — the explanations below will help build your knowledge.", color: "grade-begin" },
];

function getGrade(score) {
  return GRADE_BANDS.find((b) => score >= b.min) || GRADE_BANDS[GRADE_BANDS.length - 1];
}

function QuizIntro({ onStart }) {
  return (
    <div className="quiz-intro reveal">
      <div className="qi-badge">Knowledge Quiz</div>
      <h1 className="qi-h1">Test your UK GDPR knowledge</h1>
      <p className="qi-lede">
        10 questions covering UK GDPR fundamentals, the DPA 2018, lawful bases, data subject rights,
        and international transfers. Each question has one correct answer and an explanation.
      </p>
      <div className="qi-meta-row">
        <span className="qi-chip">10 questions</span>
        <span className="qi-chip">Instant feedback</span>
        <span className="qi-chip">Article references</span>
        <span className="qi-chip">~5 minutes</span>
      </div>
      <button className="qi-start-btn" onClick={onStart}>Start quiz →</button>
    </div>
  );
}

function QuizProgress({ current, total, answers }) {
  const pct = Math.round((current / total) * 100);
  return (
    <div className="quiz-progress-bar-wrap">
      <div className="qpb-inner">
        <span className="qpb-label">Question {current + 1} of {total}</span>
        <div className="qpb-bar">
          <div className="qpb-fill" style={{ width: pct + "%" }} />
        </div>
        <span className="qpb-score">{answers.filter(a => a.correct).length} correct</span>
      </div>
    </div>
  );
}

function QuizQuestion({ q, qIdx, total, onAnswer }) {
  const [chosen, setChosen] = useQ(null);
  const [revealed, setRevealed] = useQ(false);

  const handleChoose = (i) => {
    if (revealed) return;
    setChosen(i);
  };

  const handleSubmit = () => {
    if (chosen === null) return;
    setRevealed(true);
  };

  const handleNext = () => {
    onAnswer({ qIdx, chosen, correct: chosen === q.correct });
    setChosen(null);
    setRevealed(false);
  };

  const isCorrect = chosen === q.correct;

  return (
    <div className="quiz-q reveal">
      <QuizProgress current={qIdx} total={total} answers={[]} />
      <div className="qq-body">
        <div className="qq-number">Q{qIdx + 1}</div>
        <p className="qq-text">{q.q}</p>
        <div className="qq-opts">
          {q.opts.map((opt, i) => {
            let cls = "qq-opt";
            if (revealed) {
              if (i === q.correct) cls += " qq-opt-correct";
              else if (i === chosen) cls += " qq-opt-wrong";
              else cls += " qq-opt-dim";
            } else if (i === chosen) {
              cls += " qq-opt-chosen";
            }
            return (
              <button key={i} className={cls} onClick={() => handleChoose(i)} disabled={revealed}>
                <span className="qq-opt-letter">{String.fromCharCode(65 + i)}</span>
                <span className="qq-opt-text">{opt}</span>
                {revealed && i === q.correct && <span className="qq-tick" aria-hidden="true">✓</span>}
                {revealed && i === chosen && i !== q.correct && <span className="qq-cross" aria-hidden="true">✗</span>}
              </button>
            );
          })}
        </div>
        {!revealed && (
          <button
            className={"qq-submit-btn" + (chosen === null ? " qq-submit-disabled" : "")}
            onClick={handleSubmit}
            disabled={chosen === null}
          >
            Check answer
          </button>
        )}
        {revealed && (
          <div className={"qq-explain" + (isCorrect ? " qq-explain-correct" : " qq-explain-wrong")}>
            <div className="qq-explain-head">
              {isCorrect ? "✓ Correct" : "✗ Incorrect"}
            </div>
            <p className="qq-explain-body">{q.explain}</p>
            <div className="qq-ref">Reference: {q.ref}</div>
            <button className="qq-next-btn" onClick={handleNext}>
              {qIdx + 1 < total ? "Next question →" : "See results →"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

function QuizResults({ answers, onRestart }) {
  const score = answers.filter(a => a.correct).length;
  const total = answers.length;
  const grade = getGrade(score);
  const pct = Math.round((score / total) * 100);

  const shareText = `I scored ${score}/${total} (${pct}%) on the UK GDPR Knowledge Quiz — "${grade.label}" — at Privacy in Practice.`;

  const [copied, setCopied] = useQ(false);
  const handleCopy = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(shareText).then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      });
    }
  };

  return (
    <div className="quiz-results reveal">
      <div className={"qr-grade-badge " + grade.color}>{grade.label}</div>
      <div className="qr-score-display">
        <span className="qr-score-num">{score}</span>
        <span className="qr-score-denom">/{total}</span>
      </div>
      <p className="qr-desc">{grade.desc}</p>

      <div className="qr-share-row">
        <p className="qr-share-text">{shareText}</p>
        <button className="qr-copy-btn" onClick={handleCopy}>
          {copied ? "Copied ✓" : "Copy result"}
        </button>
      </div>

      <div className="qr-review">
        <h2 className="qr-review-h">Question review</h2>
        {QUIZ_QUESTIONS.map((q, i) => {
          const ans = answers.find(a => a.qIdx === i);
          const correct = ans && ans.correct;
          return (
            <div key={i} className={"qr-item" + (correct ? " qr-item-ok" : " qr-item-bad")}>
              <div className="qri-head">
                <span className={"qri-icon" + (correct ? " qri-ok" : " qri-bad")}>{correct ? "✓" : "✗"}</span>
                <span className="qri-q">Q{i + 1}. {q.q}</span>
              </div>
              {!correct && ans && (
                <div className="qri-chosen">
                  Your answer: <em>{q.opts[ans.chosen]}</em>
                </div>
              )}
              <div className="qri-correct">
                Correct: <strong>{q.opts[q.correct]}</strong>
              </div>
              <p className="qri-explain">{q.explain}</p>
              <div className="qri-ref">{q.ref}</div>
            </div>
          );
        })}
      </div>

      <div className="qr-cta-row">
        <button className="qr-restart-btn" onClick={onRestart}>Retake quiz</button>
        <a className="qr-study-btn" href="./study.html">Study cards →</a>
      </div>
    </div>
  );
}

function QuizPage() {
  const [phase, setPhase] = useQ("intro"); // intro | question | results
  const [current, setCurrent] = useQ(0);
  const [answers, setAnswers] = useQ([]);

  const handleStart = () => {
    setPhase("question");
    setCurrent(0);
    setAnswers([]);
  };

  const handleAnswer = (ans) => {
    const next = [...answers, ans];
    setAnswers(next);
    if (current + 1 < QUIZ_QUESTIONS.length) {
      setCurrent(current + 1);
    } else {
      setPhase("results");
    }
  };

  const handleRestart = () => {
    setPhase("intro");
    setCurrent(0);
    setAnswers([]);
  };

  return (
    <>
      <SectionHead title="Knowledge Quiz" kicker="UK GDPR · DPA 2018 · Data Subject Rights" />
      <section className="quiz-section">
        <div className="wrap quiz-wrap">
          {phase === "intro" && <QuizIntro onStart={handleStart} />}
          {phase === "question" && (
            <QuizQuestion
              key={current}
              q={QUIZ_QUESTIONS[current]}
              qIdx={current}
              total={QUIZ_QUESTIONS.length}
              onAnswer={handleAnswer}
            />
          )}
          {phase === "results" && (
            <QuizResults answers={answers} onRestart={handleRestart} />
          )}
        </div>
      </section>
    </>
  );
}

Object.assign(window, { QuizPage });
