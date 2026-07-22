import { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import "./products.css";
import logo from "../../assets/images/logo.png";

import beachFlat from "../../assets/images/products/beach-flat.png";
import beachStanding from "../../assets/images/products/beach-standing.png";
import barnyardFlat from "../../assets/images/products/barnyard-flat.png";
import barnyardStanding from "../../assets/images/products/barnyard-standing.png";

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

const PRODUCTS = [
  {
    name: "Beach Day",
    images: [beachFlat, beachStanding],
  },
  {
    name: "Barnyard",
    images: [barnyardFlat, barnyardStanding],
  },
];

/** Shared specs — every notebook in the collection is the same
 * size, page count and paper, sold as a pack of 3. */
const SPECS = {
  pack: "Pack of 3",
  price: "₹80 × 3 = ₹240",
  size: "King size",
  pages: "100 pages",
  paper: "70 GSM — tuned for RightSide's smoothness",
};

/** Image gallery with prev/next buttons that stay visible (not
 * hover-only) so they work on touch, plus dot indicators. */
function ProductGallery({ images, name }) {
  const [index, setIndex] = useState(0);

  const go = (dir) => {
    setIndex((i) => (i + dir + images.length) % images.length);
  };

  return (
    <div className="rs-gallery">
      <img src={images[index]} alt={`${name} notebook, view ${index + 1}`} className="rs-gallery__img" />

      <button
        className="rs-gallery__btn rs-gallery__btn--prev"
        onClick={() => go(-1)}
        aria-label="Previous image"
      >
        <svg viewBox="0 0 16 16" fill="none">
          <path d="M10 3 5 8l5 5" stroke="currentColor" strokeWidth="1.5" />
        </svg>
      </button>
      <button
        className="rs-gallery__btn rs-gallery__btn--next"
        onClick={() => go(1)}
        aria-label="Next image"
      >
        <svg viewBox="0 0 16 16" fill="none">
          <path d="M6 3l5 5-5 5" stroke="currentColor" strokeWidth="1.5" />
        </svg>
      </button>

      <div className="rs-gallery__dots">
        {images.map((_, i) => (
          <button
            key={i}
            className={`rs-gallery__dot ${i === index ? "is-active" : ""}`}
            onClick={() => setIndex(i)}
            aria-label={`Show image ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}

export default function Products() {
  useScrollReveal();

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

      {/* ---------- PAGE INTRO ---------- */}
      <section className="rs-shop-hero">
        <span className="rs-eyebrow">The Collection</span>
        <h1 className="rs-shop-hero__title">Notebooks, made right.</h1>
        <p className="rs-shop-hero__lede">
          Every design in the collection shares the same king-size body,
          100 pages, and 70 GSM paper — tuned specifically for RightSide's
          smoothness. Sold as a pack of 3.
        </p>
      </section>

      {/* ---------- PRODUCT GRID ---------- */}
      <section className="rs-shop-grid">
        {PRODUCTS.map((p, i) => (
          <article className="rs-product" key={p.name} data-reveal style={{ "--i": i }}>
            <ProductGallery images={p.images} name={p.name} />

            <div className="rs-product__info">
              <h3>{p.name}</h3>
              <p className="rs-product__pack">{SPECS.pack} · {SPECS.price}</p>

              <ul className="rs-product__specs">
                <li>{SPECS.size}</li>
                <li>{SPECS.pages}</li>
                <li>{SPECS.paper}</li>
              </ul>

              <button className="rs-cta rs-product__cta">
                Add to Cart
                <svg viewBox="0 0 16 16" fill="none">
                  <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" />
                </svg>
              </button>
            </div>
          </article>
        ))}
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
