/* === Privacy in Practice — main app + tweaks === */
const { useState, useEffect: useEff } = React;

// === Typography ===
const FONT_PAIRINGS = {
  "Inter · Red Hat Display": {
    display: '"Red Hat Display", sans-serif',
    serif: '"Inter", sans-serif',
    sans: '"Inter", -apple-system, BlinkMacSystemFont, sans-serif',
    mono: '"Inter", sans-serif',
  },
  "Inter only": {
    display: '"Inter", sans-serif',
    serif: '"Inter", sans-serif',
    sans: '"Inter", -apple-system, BlinkMacSystemFont, sans-serif',
    mono: '"Inter", sans-serif',
  },
};

const PALETTES = {
  "Blue & Stone": {
    cream: "#f6f5f2", paper: "#fdfcfa",
    lavender: "#58a8d4", lavender2: "#3d92c0",
    plum: "#1a2332",
    sun: "#d4b896", coral: "#a39e96",
    blush: "#f0ebe3", mint: "#e4ebe6",
    accentStrong: "#2b7cb3", accentSoft: "#e4f2fa",
    bg2: "#ebeae6", ink2: "#2d3a4d", muted: "#6b6560",
  },
  "Baby Blue": {
    cream: "#eef6fb", paper: "#f8fbfe",
    lavender: "#6bb8e8", lavender2: "#4da3db",
    plum: "#1a2332",
    sun: "#a8d8f0", coral: "#94a8b8",
    blush: "#d4e8f4", mint: "#cce9f7",
    accentStrong: "#2b7cb3", accentSoft: "#e3f2fa",
    bg2: "#dceaf4", ink2: "#2d3a4d", muted: "#5a6b7d",
  },
  "Soft Sky": {
    cream: "#f4f6f8", paper: "#fafbfc",
    lavender: "#5aadde", lavender2: "#4499cc",
    plum: "#152030",
    sun: "#c9b89a", coral: "#949088",
    blush: "#ede8e0", mint: "#e2ebe8",
    accentStrong: "#3a8fc4", accentSoft: "#eaf4fa",
    bg2: "#e8eaec", ink2: "#2a3848", muted: "#646870",
  },
};

function applyTokens({ palette, pairing }) {
  const p = PALETTES[palette] || PALETTES["Blue & Stone"];
  const f = FONT_PAIRINGS[pairing] || FONT_PAIRINGS["Inter · Red Hat Display"];
  const r = document.documentElement.style;
  r.setProperty("--cream", p.cream);
  r.setProperty("--paper", p.paper);
  r.setProperty("--lavender", p.lavender);
  r.setProperty("--lavender-2", p.lavender2);
  r.setProperty("--coral", p.coral);
  r.setProperty("--plum", p.plum);
  r.setProperty("--sun", p.sun);
  r.setProperty("--blush", p.blush);
  r.setProperty("--mint", p.mint);
  r.setProperty("--bg", p.cream);
  r.setProperty("--bg-2", p.bg2 || p.cream);
  r.setProperty("--ink", p.plum);
  r.setProperty("--ink-2", p.ink2 || p.plum);
  r.setProperty("--muted", p.muted || "#5f6772");
  r.setProperty("--accent", p.lavender);
  r.setProperty("--accent-strong", p.accentStrong || p.lavender2);
  r.setProperty("--accent-soft", p.accentSoft || p.blush);
  r.setProperty("--display", f.display);
  r.setProperty("--serif", f.serif);
  r.setProperty("--sans", f.sans);
  r.setProperty("--mono", f.mono);

  // Lazy-load any fonts referenced by the pairing
  const FONT_URLS = {
    "Inter": "Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900",
    "Red Hat Display": "Red+Hat+Display:ital,wght@0,300..900;1,300..900",
  };
  const stack = f.display + " " + f.sans;
  Object.entries(FONT_URLS).forEach(([fam, qs]) => {
    if (stack.includes(fam)) {
      const id = "gf-" + fam.replace(/\s+/g, "");
      if (!document.getElementById(id)) {
        const link = document.createElement("link");
        link.id = id;
        link.rel = "stylesheet";
        link.href = "https://fonts.googleapis.com/css2?family=" + qs + "&display=swap";
        document.head.appendChild(link);
      }
    }
  });
}

const DEFAULTS = /*EDITMODE-BEGIN*/{
  "palette": "Blue & Stone",
  "pairing": "Inter · Red Hat Display",
  "showRibbon": true,
  "showMission": true,
  "heroItalicColor": "#d4b896",
  "studyShowAnswers": false,
  "studyTrack": "all"
}/*EDITMODE-END*/;

function Tweaks({ t, setTweak }) {
  return (
    <TweaksPanel title="Tweaks">
      <TweakSection title="Typography">
        <TweakSelect
          label="Font pairing"
          value={t.pairing}
          options={Object.keys(FONT_PAIRINGS)}
          onChange={(v) => setTweak("pairing", v)}
        />
        <TweakColor
          label="Hero italic"
          value={t.heroItalicColor}
          options={["#d4b896", "#fdfcfa", "#58a8d4", "#a39e96", "#1a2332"]}
          onChange={(v) => setTweak("heroItalicColor", v)}
        />
      </TweakSection>
      <TweakSection title="Palette">
        <TweakRadio
          label="Variant"
          value={t.palette}
          options={Object.keys(PALETTES)}
          onChange={(v) => setTweak("palette", v)}
        />
      </TweakSection>
      <TweakSection title="Sections">
        <TweakToggle
          label="Mission strip"
          value={t.showMission}
          onChange={(v) => setTweak("showMission", v)}
        />
        <TweakToggle
          label="Keyword ticker"
          value={t.showRibbon}
          onChange={(v) => setTweak("showRibbon", v)}
        />
      </TweakSection>
      <TweakSection title="Study cards">
        <TweakToggle
          label="Show answers by default"
          value={t.studyShowAnswers}
          onChange={(v) => setTweak("studyShowAnswers", v)}
        />
        <TweakSelect
          label="Default track filter"
          value={t.studyTrack}
          options={["all", "I", "II", "III", "IV"]}
          onChange={(v) => setTweak("studyTrack", v)}
        />
      </TweakSection>
    </TweaksPanel>
  );
}

function App() {
  const [t, setTweak] = useTweaks(DEFAULTS);
  const D = window.SITE_DATA;
  const PAGE = window.PAGE || "home";

  useEff(() => {
    applyTokens({ palette: t.palette, pairing: t.pairing });
  }, [t.palette, t.pairing]);

  useEff(() => {
    document.documentElement.style.setProperty("--hero-italic-color", t.heroItalicColor);
  }, [t.heroItalicColor]);

  useReveal();

  return (
    <>
      <Nav active={PAGE} areaActive={window.AREA_ID} />
      {PAGE === "home" && (
        <>
          <Hero data={D.hero} />
          {t.showMission && <Mission />}
          {t.showRibbon && <Ribbon />}
          <HomePreview />
        </>
      )}
      {PAGE === "roadmap"  && <Roadmap tracks={D.tracks} />}
      {PAGE === "study"    && <Study tweaks={{ showAnswers: t.studyShowAnswers, trackFilter: t.studyTrack }} />}
      {PAGE === "career"   && <Career />}
      {PAGE === "area"          && <Area />}
      {PAGE === "areas-landing" && window.AreasLandingPage && <window.AreasLandingPage />}
      {PAGE === "quiz"        && window.QuizPage        && <window.QuizPage />}
      {PAGE === "decisions"   && window.DecisionsPage   && <window.DecisionsPage />}
      {PAGE === "scenarios"   && window.ScenariosPage   && <window.ScenariosPage />}
      {PAGE === "artefacts"   && window.ArtefactsPage   && <window.ArtefactsPage />}
      {PAGE === "glossary"    && window.GlossaryPage    && <window.GlossaryPage />}
      {PAGE === "calculators" && window.CalculatorsPage && <window.CalculatorsPage />}
      {PAGE === "privacy"     && window.PrivacyNoticePage && <window.PrivacyNoticePage />}
      {PAGE === "cookies"     && window.CookiesPage    && <window.CookiesPage />}
      {PAGE === "reading"     && window.ReadingPage    && <window.ReadingPage />}
      {PAGE === "journey"  && <Journey data={D.journey} />}
      {PAGE === "articles" && <Articles data={D.articles} />}
      {PAGE === "resources"&& <Resources data={D.resources} />}
      {PAGE === "about"    && <About data={D.about} />}
      {(() => {
        const key = PAGE === "area" ? "area-" + (window.AREA_ID || "") : PAGE;
        const srcs = window.PAGE_SOURCES && window.PAGE_SOURCES[key];
        return srcs ? <PageSources sources={srcs} /> : null;
      })()}
      <Footer />
      {window.SearchModal && <window.SearchModal />}
      {window.StorageBanner && <window.StorageBanner />}
      <Tweaks t={t} setTweak={setTweak} />
    </>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
