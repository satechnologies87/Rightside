import { useEffect, useRef, useState } from "react";
import { Link, NavLink } from "react-router-dom";
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

import beachFlat from "../../assets/images/products/beach-flat.png";
import barnyardFlat from "../../assets/images/products/barnyard-flat.png";

// Hero notebook — front/back cover crops used for the hover-flip visual.
import notebookFront from "../../assets/images/products/beach-cover-front.png";
import notebookBack from "../../assets/images/products/beach-cover-back.png";
import verticalLogo from "../../assets/images/vertical-logo.png";

// Single product, two cover designs — shown as a sliding gallery on the card.
const PRODUCT = {
  name: "Beach Day & Barnyard",
  specs: "Pack of 3 · King size · 100 pages · 2 designs",
  price: "₹240",
  images: [
    { src: beachFlat, alt: "Beach Day cover" },
    { src: barnyardFlat, alt: "Barnyard cover" },
  ],
};

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

/**
 * Sliding image gallery for a product card. Click the arrows or a dot
 * to move between designs; the track shifts on a CSS transform so it
 * stays snappy and needs no extra libraries.
 */
function ProductSlider({ images }) {
  const [index, setIndex] = useState(0);
  const count = images.length;

  const go = (next) => setIndex((next + count) % count);

  return (
    <div className="rs-slider">
      <div
        className="rs-slider__track"
        style={{ transform: `translateX(-${index * 100}%)` }}
      >
        {images.map((img) => (
          <img
            key={img.src}
            src={img.src}
            alt={img.alt}
            className="rs-slider__img"
          />
        ))}
      </div>

      {count > 1 && (
        <>
          <button
            type="button"
            className="rs-slider__arrow rs-slider__arrow--prev"
            aria-label="Previous design"
            onClick={(e) => {
              e.preventDefault();
              go(index - 1);
            }}
          >
            <svg viewBox="0 0 16 16" fill="none">
              <path d="M10 3 6 8l4 5" stroke="currentColor" strokeWidth="1.6" />
            </svg>
          </button>
          <button
            type="button"
            className="rs-slider__arrow rs-slider__arrow--next"
            aria-label="Next design"
            onClick={(e) => {
              e.preventDefault();
              go(index + 1);
            }}
          >
            <svg viewBox="0 0 16 16" fill="none">
              <path d="M6 3l4 5-4 5" stroke="currentColor" strokeWidth="1.6" />
            </svg>
          </button>

          <div className="rs-slider__dots">
            {images.map((img, i) => (
              <button
                key={img.src}
                type="button"
                className={`rs-slider__dot${i === index ? " is-active" : ""}`}
                aria-label={`Show ${img.alt}`}
                onClick={(e) => {
                  e.preventDefault();
                  go(i);
                }}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

function WritingNote() {
  const prefix = "I wish, you always write on the best side of a notebook… ";
  const animated = "the rightside!";
  const [typedCount, setTypedCount] = useState(0);
  const [isDone, setIsDone] = useState(false);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setStarted(true), 1600);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (!started) return;
    let i = 0;
    const interval = setInterval(() => {
      if (i < animated.length) {
        i++;
        setTypedCount(i);
      } else {
        setIsDone(true);
        clearInterval(interval);
      }
    }, 140); // slowed down for a slower, more natural hand-written typing speed
    return () => clearInterval(interval);
  }, [started]);

  return (
    <p className="rs-hero__art-note">
      {prefix}
      <br />
      <span className="rs-writing-animated">
        {animated.substring(0, typedCount)}
        {!isDone && started && (
          <span className="rs-pencil-cursor" aria-hidden="true">✏️</span>
        )}
      </span>
    </p>
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
          <Link to="/" className="rs-logo">
            <img src={logo} alt="RightSide" />
          </Link>
          <nav className="rs-nav__links">
            <NavLink to="/products" className={({ isActive }) => (isActive ? "is-active" : undefined)}>
              Shop
            </NavLink>
            <NavLink to="/about" className={({ isActive }) => (isActive ? "is-active" : undefined)}>
              About
            </NavLink>
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
          <br></br>
          <br></br>
          <Link to="/products" className="rs-cta rs-fade" style={{ "--d": "370ms" }}>
            Explore Collection
            <svg viewBox="0 0 16 16" fill="none">
              <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" />
            </svg>
          </Link>
        </div>

        <div className="rs-hero__art rs-fade" style={{ "--d": "220ms" }}>
          <img
            src={verticalLogo}
            alt="RightSide Vertical Logo"
            className="rs-hero__main-logo"
          />
          <WritingNote />
        </div>
      </section>

      {/* ---------- FEATURES ---------- */}
      <section className="rs-features">
        <div className="rs-features__inner">
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
        </div>
      </section>

      {/* ---------- FEATURED COLLECTION ---------- */}
      <section className="rs-collection" id="shop">
        <div className="rs-collection__head" data-reveal>
          <span className="rs-label">Featured Collection</span>
          <Link to="/products" className="rs-viewall">
            View All
            <svg viewBox="0 0 16 16" fill="none">
              <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" />
            </svg>
          </Link>
        </div>

        <div className="rs-grid rs-grid--single">
          <article className="rs-card" data-reveal style={{ "--i": 0 }}>
            <div className="rs-card__art">
              <ProductSlider images={PRODUCT.images} />
            </div>
            <div className="rs-card__info">
              <div>
                <h4>{PRODUCT.name}</h4>
                <p className="rs-specs">{PRODUCT.specs}</p>
                <p className="rs-price">{PRODUCT.price}</p>
              </div>
              <Link to="/products" className="rs-arrow" aria-label={`View ${PRODUCT.name}`}>
                <svg viewBox="0 0 16 16" fill="none">
                  <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" />
                </svg>
              </Link>
            </div>
          </article>
        </div>
      </section>

      {/* ---------- QUOTE ---------- */}
      <section className="rs-quote" data-reveal>
        <p>
          <span className="rs-quote__mark">“</span>
          Every great idea begins on a right-side page
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
          <a href="https://instagram.com/rightside.it" target="_blank" rel="noopener noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" style={{ width: '20px', height: '20px' }}>
              <rect x="3" y="3" width="18" height="18" rx="5" />
              <circle cx="12" cy="12" r="4" />
              <circle cx="17.3" cy="6.7" r="0.6" fill="currentColor" stroke="none" />
            </svg>
            rightside.it
          </a>
        </div>
        <div className="rs-footer__col">
          <span className="rs-label">Contact</span>
          <a href="mailto:rightsidestationery@gmail.com">rightsidestationery@gmail.com</a>
          <a href="tel:8136861300">+91-8136861300</a>
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
