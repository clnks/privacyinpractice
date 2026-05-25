/* === Privacy in Practice — study card components === */
const { useState: useS, useEffect: useE, useMemo: useM, useRef: useR } = React;

// ───────── localStorage helpers ─────────
const LS_KEY = "pip.study.v1";
function loadProgress() {
  try {
    return JSON.parse(localStorage.getItem(LS_KEY) || "{}");
  } catch (e) { return {}; }
}
function saveProgress(p) {
  try { localStorage.setItem(LS_KEY, JSON.stringify(p)); } catch (e) {}
}

// pure shuffle (Fisher-Yates) — non-mutating
function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

// ───────── filter / control bar ─────────
function StudyControls({
  mode, setMode,
  trackFilter, setTrackFilter,
  topicFilter, setTopicFilter,
  topics, tracks,
  onShuffle, shuffled,
  showAnswers, setShowAnswers,
  counts,
}) {
  return (
    <div className="study-controls">
      <div className="sc-row sc-modes">
        <span className="sc-label">Mode</span>
        <div className="sc-seg">
          {[
            ["flash", "Flashcards"],
            ["grid",  "Cue grid"],
            ["spaced","Spaced rep"],
            ["quiz",  "Quiz"],
          ].map(([k, label]) => (
            <button
              key={k}
              className={"sc-seg-btn" + (mode === k ? " is-active" : "")}
              onClick={() => setMode(k)}
              aria-pressed={mode === k}
            >{label}</button>
          ))}
        </div>
      </div>

      <div className="sc-row sc-filters">
        <div className="sc-filter">
          <span className="sc-label">Track</span>
          <div className="sc-chips">
            <button
              className={"sc-chip" + (trackFilter === "all" ? " is-active" : "")}
              onClick={() => setTrackFilter("all")}
            >All</button>
            {tracks.map(t => (
              <button
                key={t}
                className={"sc-chip" + (trackFilter === t ? " is-active" : "")}
                onClick={() => setTrackFilter(t)}
              >{t}</button>
            ))}
          </div>
        </div>

        <div className="sc-filter">
          <span className="sc-label">Topic</span>
          <div className="sc-chips">
            <button
              className={"sc-chip" + (topicFilter === "all" ? " is-active" : "")}
              onClick={() => setTopicFilter("all")}
            >All</button>
            {topics.map(t => (
              <button
                key={t.id}
                className={"sc-chip" + (topicFilter === t.id ? " is-active" : "")}
                onClick={() => setTopicFilter(t.id)}
              >{t.label}</button>
            ))}
          </div>
        </div>
      </div>

      <div className="sc-row sc-actions">
        <div className="sc-stat">
          <span className="sc-stat-n">{counts.shown}</span>
          <span className="sc-stat-l">shown</span>
        </div>
        <div className="sc-stat">
          <span className="sc-stat-n">{counts.known}</span>
          <span className="sc-stat-l">marked known</span>
        </div>
        <button className={"sc-btn" + (shuffled ? " is-active" : "")} onClick={onShuffle}>
          ⇌ Shuffle
        </button>
        <button
          className={"sc-btn" + (showAnswers ? " is-active" : "")}
          onClick={() => setShowAnswers(!showAnswers)}
        >
          {showAnswers ? "Hide" : "Show"} answers
        </button>
      </div>
    </div>
  );
}

// ───────── single flashcard ─────────
function Flashcard({ card, topic, showAnswers, known, onToggleKnown }) {
  const [flipped, setFlip] = useS(showAnswers);
  useE(() => { setFlip(showAnswers); }, [showAnswers, card.id]);

  return (
    <div className={"flashcard" + (flipped ? " is-flipped" : "")}>
      <button
        className="fc-inner"
        onClick={() => setFlip(f => !f)}
        aria-label={flipped ? "Show question" : "Reveal answer"}
      >
        <div className="fc-face fc-front">
          <div className="fc-head">
            <span className={"fc-topic fc-topic-" + (topic && topic.color || "lavender")}>
              {topic ? topic.label : card.topic}
            </span>
            <span className="fc-track">Track {card.track}</span>
          </div>
          <h3 className="fc-q">{card.q}</h3>
          <div className="fc-hint">Click to reveal</div>
        </div>
        <div className="fc-face fc-back">
          <div className="fc-head">
            <span className="fc-topic-mute">Answer</span>
          </div>
          <div className="fc-a">{card.a.split("\n").map((line, i) => (
            <p key={i}>{line}</p>
          ))}</div>
          <div className="fc-hint">Click to flip back</div>
        </div>
      </button>
      <button
        className={"fc-known" + (known ? " is-known" : "")}
        onClick={onToggleKnown}
        title={known ? "Marked as known" : "Mark as known"}
      >
        {known ? "✓ Known" : "Mark known"}
      </button>
    </div>
  );
}

// ───────── mode: flashcards (single card carousel) ─────────
function FlashMode({ cards, topicMap, showAnswers, progress, setKnown }) {
  const [idx, setIdx] = useS(0);
  useE(() => { setIdx(0); }, [cards.length, cards[0] && cards[0].id]);
  if (!cards.length) return <Empty />;
  const c = cards[idx % cards.length];
  const t = topicMap[c.topic];
  const known = !!(progress[c.id] && progress[c.id].known);
  return (
    <div className="study-flash">
      <div className="flash-stage">
        <Flashcard
          key={c.id}
          card={c}
          topic={t}
          showAnswers={showAnswers}
          known={known}
          onToggleKnown={() => setKnown(c.id, !known)}
        />
      </div>
      <div className="flash-controls">
        <button className="flash-nav" onClick={() => setIdx(i => (i - 1 + cards.length) % cards.length)}>← Prev</button>
        <span className="flash-pos">{(idx % cards.length) + 1} <span className="of">/</span> {cards.length}</span>
        <button className="flash-nav" onClick={() => setIdx(i => (i + 1) % cards.length)}>Next →</button>
      </div>
    </div>
  );
}

// ───────── mode: cue grid (printable) ─────────
function GridMode({ cards, topicMap, showAnswers, progress, setKnown }) {
  if (!cards.length) return <Empty />;
  return (
    <div className="study-grid">
      {cards.map(c => {
        const t = topicMap[c.topic];
        const known = !!(progress[c.id] && progress[c.id].known);
        return (
          <article key={c.id} className={"cue" + (known ? " is-known" : "")}>
            <header className="cue-head">
              <span className={"cue-topic cue-topic-" + (t && t.color || "lavender")}>
                {t ? t.label : c.topic}
              </span>
              <span className="cue-track">Track {c.track}</span>
            </header>
            <h3 className="cue-q">{c.q}</h3>
            <div className={"cue-a" + (showAnswers ? " is-open" : "")}>
              {c.a.split("\n").map((l, i) => <p key={i}>{l}</p>)}
            </div>
            <footer className="cue-foot">
              <button
                className={"cue-known" + (known ? " is-known" : "")}
                onClick={() => setKnown(c.id, !known)}
              >{known ? "✓ Known" : "Mark known"}</button>
              {!showAnswers && (
                <details className="cue-toggle">
                  <summary>Reveal answer</summary>
                </details>
              )}
            </footer>
          </article>
        );
      })}
    </div>
  );
}

// ───────── mode: spaced repetition ─────────
function SpacedMode({ cards, topicMap, showAnswers, progress, setBox }) {
  // queue: cards with lowest box (or unseen) first; "known" cards (box 5+) excluded
  const queue = useM(() => {
    const withBox = cards.map(c => ({
      c,
      box: (progress[c.id] && progress[c.id].box) || 0,
    }));
    return withBox
      .filter(x => x.box < 5)
      .sort((a, b) => a.box - b.box || Math.random() - 0.5);
  }, [cards, progress]);

  const [idx, setIdx] = useS(0);
  const [shown, setShown] = useS(showAnswers);
  useE(() => { setIdx(0); setShown(showAnswers); }, [queue.length, showAnswers]);

  if (!queue.length) {
    return (
      <div className="spaced-done">
        <h3>You're caught up.</h3>
        <p>All cards in this filter are at box 5 — long-term memory. Come back tomorrow, switch the filter, or hit shuffle to review anyway.</p>
      </div>
    );
  }

  const { c, box } = queue[idx % queue.length];
  const t = topicMap[c.topic];
  const advance = (delta) => {
    const next = Math.max(0, Math.min(5, box + delta));
    setBox(c.id, next);
    setShown(false);
    setIdx(i => i + 1);
  };

  return (
    <div className="study-spaced">
      <div className="spaced-meta">
        <span className="spaced-pos">{(idx % queue.length) + 1} <span className="of">/</span> {queue.length}</span>
        <div className="spaced-boxes" aria-label={"Box " + box + " of 5"}>
          {[0,1,2,3,4].map(i => (
            <span key={i} className={"sb" + (i < box ? " is-full" : "")} />
          ))}
        </div>
      </div>
      <article className="spaced-card">
        <header className="sp-head">
          <span className={"sp-topic sp-topic-" + (t && t.color || "lavender")}>
            {t ? t.label : c.topic}
          </span>
          <span className="sp-track">Track {c.track}</span>
        </header>
        <h3 className="sp-q">{c.q}</h3>
        {shown ? (
          <div className="sp-a">
            {c.a.split("\n").map((l, i) => <p key={i}>{l}</p>)}
          </div>
        ) : (
          <button className="sp-reveal" onClick={() => setShown(true)}>
            Tap to reveal answer
          </button>
        )}
      </article>
      <div className="spaced-actions">
        <button className="sp-act sp-again" onClick={() => advance(-1)}>
          <span className="sp-act-label">Again</span>
          <span className="sp-act-hint">Box {Math.max(0, box - 1)}</span>
        </button>
        <button className="sp-act sp-hard" onClick={() => advance(0)} disabled={!shown}>
          <span className="sp-act-label">Hard</span>
          <span className="sp-act-hint">Stay at box {box}</span>
        </button>
        <button className="sp-act sp-easy" onClick={() => advance(1)} disabled={!shown}>
          <span className="sp-act-label">Easy</span>
          <span className="sp-act-hint">Box {Math.min(5, box + 1)}</span>
        </button>
      </div>
    </div>
  );
}

// ───────── mode: quiz ─────────
function QuizMode({ cards, topicMap }) {
  // only include cards with a quiz array
  const pool = useM(() => cards.filter(c => Array.isArray(c.quiz) && c.quiz.length >= 2), [cards]);
  const [state, setState] = useS(null); // null = idle, {idx, score, answers, deck}
  const [pick, setPick] = useS(null);

  const start = () => {
    if (!pool.length) return;
    const deck = shuffle(pool).slice(0, Math.min(10, pool.length));
    setState({ idx: 0, score: 0, answers: [], deck });
    setPick(null);
  };

  if (!pool.length) {
    return (
      <div className="quiz-empty">
        <h3>No quiz-ready cards in this filter.</h3>
        <p>Quiz cards need a <code>quiz:</code> array in <code>cards.js</code>. Add some, or switch back to flashcards.</p>
      </div>
    );
  }

  if (!state) {
    return (
      <div className="quiz-start">
        <h3>Multiple-choice quiz</h3>
        <p>{Math.min(10, pool.length)} questions, drawn at random from the current filter. Pick the best answer; you'll see your score at the end.</p>
        <button className="sc-btn sc-btn-primary" onClick={start}>Start quiz →</button>
      </div>
    );
  }

  const { idx, score, deck, answers } = state;
  if (idx >= deck.length) {
    return (
      <div className="quiz-done">
        <h3>{score} / {deck.length}</h3>
        <p>{score === deck.length ? "Perfect." : score >= deck.length * 0.7 ? "Solid." : "Worth another pass."}</p>
        <ol className="quiz-review">
          {deck.map((c, i) => (
            <li key={c.id} className={answers[i] === c.quiz[0] ? "ok" : "no"}>
              <div className="qr-q">{c.q}</div>
              <div className="qr-a">
                <span className="qr-yours">Your answer: <b>{answers[i] || "—"}</b></span>
                <span className="qr-correct">Correct: <b>{c.quiz[0]}</b></span>
              </div>
            </li>
          ))}
        </ol>
        <button className="sc-btn" onClick={start}>Try again</button>
      </div>
    );
  }

  const q = deck[idx];
  const options = useM(() => shuffle(q.quiz), [q.id]);
  const submit = () => {
    if (pick == null) return;
    setState(s => ({
      ...s,
      idx: s.idx + 1,
      score: s.score + (pick === q.quiz[0] ? 1 : 0),
      answers: [...s.answers, pick],
    }));
    setPick(null);
  };

  const t = topicMap[q.topic];
  return (
    <div className="study-quiz">
      <div className="quiz-meta">
        <span>Question {idx + 1} <span className="of">/</span> {deck.length}</span>
        <span className={"qm-topic qm-topic-" + (t && t.color || "lavender")}>
          {t ? t.label : q.topic}
        </span>
      </div>
      <h3 className="quiz-q">{q.q}</h3>
      <div className="quiz-options">
        {options.map(opt => (
          <button
            key={opt}
            className={"quiz-opt" + (pick === opt ? " is-picked" : "")}
            onClick={() => setPick(opt)}
          >{opt}</button>
        ))}
      </div>
      <button className="sc-btn sc-btn-primary" onClick={submit} disabled={pick == null}>
        {idx === deck.length - 1 ? "Finish" : "Next →"}
      </button>
    </div>
  );
}

function Empty() {
  return (
    <div className="study-empty">
      <p>No cards match this filter. Try widening it, or add more cards in <code>cards.js</code>.</p>
    </div>
  );
}

// ───────── main Study component ─────────
function Study({ tweaks }) {
  const allCards = window.CARDS || [];
  const topics   = window.CARD_TOPICS || [];
  const topicMap = useM(() => {
    const m = {};
    topics.forEach(t => { m[t.id] = t; });
    return m;
  }, [topics]);
  const tracks = useM(() => [...new Set(allCards.map(c => c.track))].sort(), [allCards]);

  const [mode, setMode] = useS("flash");
  const [trackFilter, setTrack] = useS("all");
  const [topicFilter, setTopic] = useS("all");
  const [shuffled, setShuf] = useS(false);
  const [shuffleSeed, setSeed] = useS(0);
  const [showAnswers, setShowAns] = useS(!!(tweaks && tweaks.showAnswers));
  useE(() => { setShowAns(!!(tweaks && tweaks.showAnswers)); }, [tweaks && tweaks.showAnswers]);
  useE(() => {
    if (tweaks && tweaks.trackFilter && tweaks.trackFilter !== "all") setTrack(tweaks.trackFilter);
  }, [tweaks && tweaks.trackFilter]);

  const [progress, setProg] = useS(loadProgress);
  const setKnown = (id, val) => {
    setProg(p => {
      const next = { ...p, [id]: { ...(p[id] || {}), known: val } };
      saveProgress(next);
      return next;
    });
  };
  const setBox = (id, box) => {
    setProg(p => {
      const next = { ...p, [id]: { ...(p[id] || {}), box, lastSeen: Date.now() } };
      saveProgress(next);
      return next;
    });
  };

  const filtered = useM(() => {
    let f = allCards;
    if (trackFilter !== "all") f = f.filter(c => c.track === trackFilter);
    if (topicFilter !== "all") f = f.filter(c => c.topic === topicFilter);
    return f;
  }, [allCards, trackFilter, topicFilter]);

  const cards = useM(() => {
    return shuffled ? shuffle(filtered) : filtered;
    // eslint-disable-next-line
  }, [filtered, shuffled, shuffleSeed]);

  const counts = {
    shown: filtered.length,
    known: filtered.filter(c => progress[c.id] && progress[c.id].known).length,
  };

  const handleShuffle = () => {
    setShuf(true);
    setSeed(s => s + 1);
  };

  return (
    <>
      <SectionHead
        id="study"
        num="V."
        eyebrow="Revision deck"
        title="Study cards"
        sub="Flash, grid, spaced repetition or quiz mode — same content, four ways to drill it. Progress saves to your browser only; no account needed."
      />
      <section className="study">
        <div className="wrap">
          <StudyControls
            mode={mode} setMode={setMode}
            trackFilter={trackFilter} setTrackFilter={setTrack}
            topicFilter={topicFilter} setTopicFilter={setTopic}
            topics={topics} tracks={tracks}
            onShuffle={handleShuffle} shuffled={shuffled}
            showAnswers={showAnswers} setShowAnswers={setShowAns}
            counts={counts}
          />

          <div className="study-stage">
            {mode === "flash"  && <FlashMode  cards={cards} topicMap={topicMap} showAnswers={showAnswers} progress={progress} setKnown={setKnown} />}
            {mode === "grid"   && <GridMode   cards={cards} topicMap={topicMap} showAnswers={showAnswers} progress={progress} setKnown={setKnown} />}
            {mode === "spaced" && <SpacedMode cards={cards} topicMap={topicMap} showAnswers={showAnswers} progress={progress} setBox={setBox} />}
            {mode === "quiz"   && <QuizMode   cards={cards} topicMap={topicMap} />}
          </div>
        </div>
      </section>
    </>
  );
}

Object.assign(window, { Study });
