/* === Privacy in Practice — Privacy Notice + Cookies + Banner ===
   Written by a DP practitioner. Intentionally layered, plain-English,
   and demonstrates UK GDPR Articles 13/14 compliance. */

const { useState: usePS, useEffect: usePE } = React;

// ───────── Cookie / storage banner ─────────
const STORAGE_BANNER_KEY = "pip.storage-banner.dismissed.v1";
function StorageBanner() {
  const [show, setShow] = usePS(false);
  usePE(() => {
    try {
      if (!localStorage.getItem(STORAGE_BANNER_KEY)) {
        const t = setTimeout(() => setShow(true), 600);
        return () => clearTimeout(t);
      }
    } catch (e) { /* ignore */ }
  }, []);
  const dismiss = () => {
    try { localStorage.setItem(STORAGE_BANNER_KEY, new Date().toISOString()); } catch (e) {}
    setShow(false);
  };
  if (!show) return null;
  return (
    <div className="sb-wrap" role="region" aria-label="Storage notice">
      <div className="sb-inner">
        <div className="sb-body">
          <strong className="sb-head">A short note about what's stored on your device.</strong>
          <p>
            This site uses your browser's <em>local storage</em> to remember your study progress, CV checklist
            answers, and a few interface preferences. <strong>No tracking cookies, no analytics, no advertising,
            nothing sent to a third party.</strong> Everything stays in your browser. Full detail on the
            <a href="./cookies.html"> storage page</a> &middot; <a href="./privacy.html">privacy notice</a>.
          </p>
        </div>
        <button className="sb-btn" onClick={dismiss}>Got it</button>
      </div>
    </div>
  );
}

// ───────── Privacy notice page ─────────
function PrivacyNoticePage() {
  return (
    <>
      <SectionHead
        id="privacy"
        num="§"
        eyebrow="Privacy notice"
        title="How we handle your data on this site"
        sub="Written under UK GDPR Articles 13 and 14 — layered, plain English, no dark patterns. Treat this as a model example, not boilerplate."
      />
      <section className="privacy">
        <div className="wrap wrap-narrow">
          <aside className="priv-tldr">
            <h3>The short version</h3>
            <ul>
              <li><strong>No tracking.</strong> No Google Analytics, no Meta pixel, no advertising, no third-party trackers.</li>
              <li><strong>No accounts.</strong> Nothing to log in to; nothing collected about who you are.</li>
              <li><strong>No cookies.</strong> Strictly none. We use your browser's <em>local storage</em> for functional things (study progress, CV checklist). Detail on the <a href="./cookies.html">storage page</a>.</li>
              <li><strong>Fonts load from Google.</strong> Loading a webpage that requests Google Fonts exposes your IP address to Google. We'd self-host if practical; for now this is the only third-party connection.</li>
              <li><strong>No newsletter yet.</strong> If you sign up later, we'll capture your email and process it under legitimate interests. You'll get a separate notice at that point.</li>
              <li><strong>The site is hosted on GitHub Pages.</strong> GitHub will see your IP address in server logs; that's standard for any internet request.</li>
            </ul>
          </aside>

          <div className="priv-body">
            <article className="priv-sec">
              <h2>1. Who's responsible for your data</h2>
              <p>
                This site is operated by an individual (the "controller" under UK GDPR). For day-to-day enquiries about
                this notice or anything you read here, you can reach me through the <a href="./about.html">about page</a>.
              </p>
              <p>
                There is no Data Protection Officer for this site because there's no statutory requirement under Article 37 —
                this is an individual learning project, not a public authority, and the processing isn't of a scale that would
                trigger appointment. If circumstances change, this notice will too.
              </p>
            </article>

            <article className="priv-sec">
              <h2>2. What we actually process</h2>
              <p>The honest list. If you spot anything missing, please tell me.</p>

              <div className="priv-table">
                <div className="pt-row pt-head">
                  <span>What</span><span>Why</span><span>Lawful basis</span><span>Kept for</span>
                </div>
                <div className="pt-row">
                  <span>Your IP address (server access logs)</span>
                  <span>Required to serve the page. Held by GitHub Pages as part of their infrastructure.</span>
                  <span>Legitimate interests (Art. 6(1)(f)) — running a website</span>
                  <span>Per GitHub's retention. Approximately 14 days for raw logs.</span>
                </div>
                <div className="pt-row">
                  <span>Local-storage entries (study progress, CV checklist, tweaks)</span>
                  <span>To remember your progress between visits, so you don't lose work on refresh.</span>
                  <span>Strictly necessary for the service you chose to use (PECR Reg. 6(4)(b))</span>
                  <span>Until you clear your browser storage. Never sent to us or to anyone.</span>
                </div>
                <div className="pt-row">
                  <span>Your IP address (Google Fonts)</span>
                  <span>Google's fonts.googleapis.com receives a connection to load fonts. We don't see this data.</span>
                  <span>Legitimate interests — site rendering</span>
                  <span>Per Google's policy. See <a href="https://policies.google.com/privacy">Google's privacy notice</a>.</span>
                </div>
              </div>
            </article>

            <article className="priv-sec">
              <h2>3. What we do NOT process</h2>
              <ul className="priv-bullets">
                <li>No analytics (Google Analytics, Plausible, Fathom, anything else).</li>
                <li>No A/B testing or session replay (no Hotjar, no FullStory).</li>
                <li>No advertising or remarketing tags.</li>
                <li>No social-media share trackers.</li>
                <li>No fingerprinting.</li>
                <li>No newsletter or email collection (yet — this will change when there is one).</li>
              </ul>
            </article>

            <article className="priv-sec">
              <h2>4. Your rights</h2>
              <p>
                You have the eight rights under UK GDPR — access, rectification, erasure, restriction, objection,
                portability, the right not to be subject to solely automated decisions, and the right to withdraw consent
                (where consent is the lawful basis).
              </p>
              <p>
                Because we don't hold personal data tied to your identity — there's nothing to access, correct, or erase
                in any meaningful sense. The local-storage entries on your device are entirely under your control: clearing
                your browser storage deletes them.
              </p>
              <p>
                If GitHub's hosting logs are within the scope of a request, you'd need to contact GitHub directly — they
                are the data holder for those records.
              </p>
              <p>
                You also have the right to complain to the Information Commissioner's Office (the UK supervisory authority)
                if you think your data has been mishandled — <a href="https://ico.org.uk/make-a-complaint/">ico.org.uk/make-a-complaint</a>.
              </p>
            </article>

            <article className="priv-sec">
              <h2>5. International transfers</h2>
              <p>
                The site is hosted on GitHub Pages. GitHub is a US-based company; the infrastructure may serve from US
                regions. This means a transfer of your IP address (in server logs) outside the UK occurs when you load
                pages. GitHub relies on standard contractual mechanisms (the EU SCCs and UK Addendum) and has additional
                supplementary measures published on their trust centre.
              </p>
              <p>
                Google Fonts may similarly involve US transfers. Both providers self-certify under appropriate frameworks
                and publish their own privacy notices.
              </p>
            </article>

            <article className="priv-sec">
              <h2>6. Security</h2>
              <p>
                There's nothing personal stored at the application level on our side. The site is static HTML/CSS/JS
                served over HTTPS. GitHub Pages enforces HTTPS by default.
              </p>
            </article>

            <article className="priv-sec">
              <h2>7. Children</h2>
              <p>
                The site isn't aimed at children but contains nothing harmful. No personal data is collected from anyone,
                so age-of-consent rules (13 in the UK) don't apply in any operational sense.
              </p>
            </article>

            <article className="priv-sec">
              <h2>8. Automated decisions and profiling</h2>
              <p>
                None. No profiling, no automated decision-making, no AI inference about visitors.
              </p>
            </article>

            <article className="priv-sec">
              <h2>9. Changes to this notice</h2>
              <p>
                If the processing changes — for example when a newsletter is added — this notice will be updated and the
                top of the page will indicate the change. Substantial changes will also be flagged in the storage banner.
              </p>
              <p className="priv-updated">Last updated: 25 May 2026.</p>
            </article>

            <aside className="priv-meta">
              <h3>Why this notice exists in this form</h3>
              <p>
                Most privacy notices are vague, defensive, and reuse boilerplate. This one tries to be the opposite — it
                names the processing, explains the lawful basis, and is honest about what it doesn't know. It exists
                because a DP-themed site that does anything less would be embarrassing.
              </p>
              <p>
                If you spot anything missing, wrong, or worth improving, please tell me. Privacy notices should be living
                documents, not legal armour.
              </p>
            </aside>
          </div>
        </div>
      </section>
    </>
  );
}

// ───────── Cookies / storage page ─────────
function CookiesPage() {
  return (
    <>
      <SectionHead
        id="cookies"
        num="≣"
        eyebrow="Cookies & storage"
        title="What we keep on your device"
        sub="The full list of every storage entry this site touches, why it exists, and how to clear it."
      />
      <section className="cookies">
        <div className="wrap wrap-narrow">
          <aside className="priv-tldr">
            <h3>One-line summary</h3>
            <p>
              <strong>This site does not set any cookies.</strong> It uses your browser's <em>local storage</em> — a
              different mechanism — for a small set of functional preferences. Local storage stays on your device,
              never gets sent to a server, and clears when you clear your browser data.
            </p>
          </aside>

          <div className="priv-body">
            <article className="priv-sec">
              <h2>Cookies vs local storage — a brief explainer</h2>
              <p>
                <strong>Cookies</strong> are small text strings sent with every HTTP request. They are governed by PECR
                Regulation 6 (cookies law) and almost always require consent unless they are "strictly necessary".
              </p>
              <p>
                <strong>Local storage</strong> is a browser API that stores key-value pairs on your device. It is NOT
                sent automatically with requests. The ICO's position is that PECR Regulation 6 applies to ANY storage of
                information on a user's device — not just cookies. So we apply the same rules to both, conservatively.
              </p>
              <p>
                We rely on the "strictly necessary" exemption for the entries below because every one is required to
                deliver a service you actively chose to use — saving your study progress, your CV checklist answers,
                your visual preferences. Nothing here is for analytics or marketing.
              </p>
            </article>

            <article className="priv-sec">
              <h2>Every storage entry, named</h2>
              <div className="priv-table priv-table-storage">
                <div className="pt-row pt-head">
                  <span>Key</span><span>What it stores</span><span>Why</span><span>Lifetime</span>
                </div>
                <div className="pt-row">
                  <span><code>pip.study.v1</code></span>
                  <span>Your study-card progress (known cards, spaced-repetition box).</span>
                  <span>So you don't lose your progress on refresh.</span>
                  <span>Until you clear it.</span>
                </div>
                <div className="pt-row">
                  <span><code>pip.cv.*</code></span>
                  <span>Which CV-checklist items you've ticked.</span>
                  <span>So you can leave and come back.</span>
                  <span>Until you clear it.</span>
                </div>
                <div className="pt-row">
                  <span><code>pip.tweaks</code></span>
                  <span>Your in-page tweaks (palette, fonts) if you've used the Tweaks panel.</span>
                  <span>So your visual preferences persist.</span>
                  <span>Until you clear it.</span>
                </div>
                <div className="pt-row">
                  <span><code>pip.storage-banner.dismissed.v1</code></span>
                  <span>The date you dismissed the storage banner.</span>
                  <span>So we don't show it again.</span>
                  <span>Until you clear it.</span>
                </div>
              </div>
            </article>

            <article className="priv-sec">
              <h2>How to clear them</h2>
              <p>
                <strong>Chrome / Edge:</strong> Settings → Privacy and security → Site Settings → View permissions and
                data stored across sites → search for the site → Clear data.
              </p>
              <p>
                <strong>Firefox:</strong> Settings → Privacy & Security → Cookies and Site Data → Manage Data → find the
                site → Remove.
              </p>
              <p>
                <strong>Safari:</strong> Settings → Privacy → Manage Website Data → find the site → Remove.
              </p>
              <p>
                Or, simpler: <button className="priv-clear" onClick={() => {
                  try {
                    Object.keys(localStorage).filter(k => k.startsWith("pip.")).forEach(k => localStorage.removeItem(k));
                    alert("All Privacy in Practice storage cleared from this browser.");
                  } catch (e) { alert("Couldn't clear — try via your browser settings."); }
                }}>clear all PIP storage right now</button>.
              </p>
            </article>

            <article className="priv-sec">
              <h2>Third-party requests</h2>
              <p>
                When you load a page, your browser makes a request to <code>fonts.googleapis.com</code> to fetch the
                fonts (Bricolage Grotesque, Lora). Google receives your IP address as part of any HTTP request. We
                don't set any cookies, but Google's own privacy notice describes what they do.
              </p>
              <p>
                We're considering self-hosting fonts in a future update to remove this third-party connection entirely.
              </p>
            </article>
          </div>
        </div>
      </section>
    </>
  );
}

Object.assign(window, { PrivacyNoticePage, CookiesPage, StorageBanner });
