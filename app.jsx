/* === Privacy in Practice — main app + tweaks === */
const { useState, useEffect: useEff } = React;

// === Curated typography options ===
const FONT_PAIRINGS = {
  "Chunky · SIFONN": {
    display: '"SIFONN PRO", sans-serif',
    serif: '"Instrument Serif", Georgia, serif',
    sans: '"Bricolage Grotesque", sans-serif',
    mono: '"Bricolage Grotesque", sans-serif',
  },
  "Modern · Inter Tight": {
    display: '"Inter Tight", "Bricolage Grotesque", sans-serif',
    serif: '"Instrument Serif", Georgia, serif',
    sans: '"Inter Tight", -apple-system, sans-serif',
    mono: '"Inter Tight", sans-serif',
  },
  "Editorial · Fraunces": {
    display: '"Fraunces", Georgia, serif',
    serif: '"Fraunces", Georgia, serif',
    sans: '"Inter Tight", sans-serif',
    mono: '"Inter Tight", sans-serif',
  },
};

const PALETTES = {
  "Lavender & Butter": {
    cream: "#f1e8d7", paper: "#f9f1e1",
    lavender: "#c4b1dd", lavender2: "#b39fd0",
    plum: "#0d0a10",
    sun: "#f4e070", coral: "#d4a574",
    blush: "#e8d4c0", mint: "#d4ddc4",
  },
  "Sage & Cream": {
    cream: "#eeece1", paper: "#f5f4ea",
    lavender: "#c8d5bb", lavender2: "#b6c5a8",
    plum: "#1a1a18",
    sun: "#e8d050", coral: "#c89580",
    blush: "#e8d8c4", mint: "#c5d4b8",
  },
  "Rose & Latte": {
    cream: "#f4ebde", paper: "#faf3e7",
    lavender: "#e8c4c4", lavender2: "#d8a8a8",
    plum: "#1f1518",
    sun: "#f4d870", coral: "#cc8a78",
    blush: "#e8d0c0", mint: "#d8d4c0",
  },
};

function applyTokens({ palette, pairing }) {
  const p = PALETTES[palette] || PALETTES["Lavender & Butter"];
  const f = FONT_PAIRINGS[pairing] || FONT_PAIRINGS["Chunky · SIFONN"];
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
  r.setProperty("--ink", p.plum);
  r.setProperty("--accent", p.lavender);
  r.setProperty("--display", f.display);
  r.setProperty("--serif", f.serif);
  r.setProperty("--sans", f.sans);
  r.setProperty("--mono", f.mono);

  // Lazy-load any fonts referenced by the pairing
  const FONT_URLS = {
    "Inter Tight": "Inter+Tight:wght@400;500;600;700;800",
    "Fraunces": "Fraunces:ital,opsz,wght@0,9..144,400..800;1,9..144,400..800",
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
  "palette": "Lavender & Butter",
  "pairing": "Chunky · SIFONN",
  "showRibbon": true,
  "showMission": true,
  "heroItalicColor": "#f9f1e1",
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
          options={["#f9f1e1", "#0d0a10", "#f4e070", "#d4a574", "#b39fd0"]}
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
      {PAGE === "area"     && <Area />}
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
      <Footer />
      {window.SearchModal && <window.SearchModal />}
      {window.StorageBanner && <window.StorageBanner />}
      <Tweaks t={t} setTweak={setTweak} />
    </>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
