import { useEffect, useRef } from "react";
import "./home.css";
import logo from "../../assets/images/logo.png"; // place logo.png in the same folder, or update the path

/**
 * Small hook: adds an "in-view" class to any element with data-reveal
 * once it scrolls into the viewport. Pure IntersectionObserver, no deps.
 */
function useScrollReveal() {
  useEffect(() => {
    const items = document.querySelectorAll("[data-reveal]");
    if (!items.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in-view");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
    );

    items.forEach((item) => observer.observe(item));
    return () => observer.disconnect();
  }, []);
}

const FEATURES = [
  {
    title: "Minimal Design",
    copy: "Clean layouts that help you focus on your ideas, not the page.",
    icon: "square",
  },
  {
    title: "Premium Paper",
    copy: "Smooth, 100gsm paper that takes ink, pencil and marker equally well.",
    icon: "swirl",
  },
  {
    title: "Thoughtfully Crafted",
    copy: "Made in small batches to be your everyday, dog-eared companion.",
    icon: "spark",
  },
];

const PRODUCTS = [
  {
    name: "A5 Soft Cover Notebook",
    specs: "A5 · 100gsm paper · 96 pages",
    price: "₹299",
    tone: "dark",
  },
  {
    name: "Hard Cover Notebook",
    specs: "A5 · 120gsm paper · 160 pages",
    price: "₹499",
    tone: "light",
  },
  {
    name: "Planner — 2026 Edition",
    specs: "A5 · 100gsm paper · 200 pages, Jan–Dec",
    price: "₹699",
    tone: "dark",
    ruled: true,
  },
];

/* Hand-sketched icon strokes, matching the logo's chalky line quality */
function FeatureIcon({ type }) {
  if (type === "square") {
    return (
      <svg viewBox="0 0 40 40" className="feature-icon">
        <path d="M9 11 C9 9 10 8 13 8 L27 8 C30 8 31 9 31 12 L31 28 C31 31 30 32 27 32 L13 32 C10 32 9 31 9 28 Z" />
      </svg>
    );
  }
  if (type === "swirl") {
    return (
      <svg viewBox="0 0 40 40" className="feature-icon">
        <path d="M8 26 C8 14 16 8 22 8 C30 8 32 14 28 18 C25 21 20 19 21 15 C22 11 27 10 30 13" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 40 40" className="feature-icon">
      <path d="M20 6 L23 17 L34 20 L23 23 L20 34 L17 23 L6 20 L17 17 Z" />
    </svg>
  );
}

export default function Home() {
  useScrollReveal();
  const underlineRef = useRef(null);

  return (
    <div className="rs">
      {/* ---------- NAV ---------- */}
      <header className="rs-nav">
        <div className="rs-nav__inner">
          <div className="rs-logo">
            <img src={logo} alt="RightSide" />
          </div>
          <nav className="rs-nav__links">
            <a href="#shop">Shop</a>
            <a href="#about">About</a>
            <a href="#contact">Contact</a>
          </nav>
          <button className="rs-bag" aria-label="Cart">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M6 8h12l-1 12.5a1 1 0 0 1-1 .5H8a1 1 0 0 1-1-.5L6 8Z" />
              <path d="M9 8V6a3 3 0 0 1 6 0v2" />
            </svg>
          </button>
        </div>
      </header>

      {/* ---------- HERO ---------- */}
      <section className="rs-hero">
        <div className="rs-hero__text">
          <p className="rs-eyebrow rs-fade" style={{ "--d": "0ms" }}>
            Simple. Mindful. Meaningful.
          </p>
          <h1 className="rs-hero__title">
            <span className="rs-fade" style={{ "--d": "90ms" }}>
              Think Better.
            </span>
            <br />
            <span className="rs-fade rs-underline-wrap" style={{ "--d": "180ms" }}>
              Write Better.
              <svg
                ref={underlineRef}
                className="rs-underline"
                viewBox="0 0 260 20"
                preserveAspectRatio="none"
              >
                <path d="M3 12 C 40 4, 90 18, 130 10 C 170 3, 210 15, 257 8" />
              </svg>
            </span>
          </h1>
          <p className="rs-hero__sub rs-fade" style={{ "--d": "280ms" }}>
            Minimal notebooks crafted for modern thinkers.
          </p>
          <a href="#shop" className="rs-cta rs-fade" style={{ "--d": "370ms" }}>
            Explore Collection
            <svg viewBox="0 0 16 16" fill="none">
              <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" />
            </svg>
          </a>
        </div>

        <div className="rs-hero__art rs-fade" style={{ "--d": "220ms" }}>
          <div className="rs-notebook rs-notebook--hero">
            <span className="rs-notebook__spine" />
            <span className="rs-notebook__label">RIGHT SIDE</span>
          </div>
        </div>
      </section>

      {/* ---------- FEATURES ---------- */}
      <section className="rs-features">
        {FEATURES.map((f, i) => (
          <div
            className="rs-feature"
            key={f.title}
            data-reveal
            style={{ "--i": i }}
          >
            <FeatureIcon type={f.icon} />
            <h3>{f.title}</h3>
            <p>{f.copy}</p>
          </div>
        ))}
      </section>

      {/* ---------- FEATURED COLLECTION ---------- */}
      <section className="rs-collection" id="shop">
        <div className="rs-collection__head" data-reveal>
          <span className="rs-label">Featured Collection</span>
          <a href="#all" className="rs-viewall">
            View All
            <svg viewBox="0 0 16 16" fill="none">
              <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" />
            </svg>
          </a>
        </div>

        <div className="rs-grid">
          {PRODUCTS.map((p, i) => (
            <article
              className="rs-card"
              key={p.name}
              data-reveal
              style={{ "--i": i }}
            >
              <div className="rs-card__art">
                <div className={`rs-notebook rs-notebook--${p.tone}`}>
                  <span className="rs-notebook__spine" />
                  {p.ruled && <span className="rs-notebook__coil" />}
                  <span className="rs-notebook__label">RIGHT SIDE</span>
                </div>
              </div>
              <div className="rs-card__info">
                <div>
                  <h4>{p.name}</h4>
                  <p className="rs-specs">{p.specs}</p>
                  <p className="rs-price">{p.price}</p>
                </div>
                <button className="rs-arrow" aria-label={`View ${p.name}`}>
                  <svg viewBox="0 0 16 16" fill="none">
                    <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" />
                  </svg>
                </button>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* ---------- QUOTE ---------- */}
      <section className="rs-quote" data-reveal>
        <p>
          <span className="rs-quote__mark">“</span>
          Every great idea begins with a blank page.
          <span className="rs-quote__mark">”</span>
        </p>
      </section>

      {/* ---------- FOOTER ---------- */}
      <footer className="rs-footer" id="contact">
        <div className="rs-footer__brand">
          <img src={logo} alt="RightSide" className="rs-footer__logo" />
          <p>Minimal notebooks for everyday thinking.</p>
        </div>
        <div className="rs-footer__col">
          <span className="rs-label">Follow Us</span>
          <a href="https://instagram.com" aria-label="Instagram">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4">
              <rect x="3" y="3" width="18" height="18" rx="5" />
              <circle cx="12" cy="12" r="4" />
              <circle cx="17.3" cy="6.7" r="0.6" fill="currentColor" stroke="none" />
            </svg>
          </a>
        </div>
        <div className="rs-footer__col">
          <span className="rs-label">Contact</span>
          <a href="mailto:hello@rightside.in">hello@rightside.in</a>
        </div>
        <div className="rs-footer__col">
          <span className="rs-label">Made in India</span>
        </div>
        <div className="rs-footer__bottom">
          © {new Date().getFullYear()} RightSide. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
