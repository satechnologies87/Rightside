import { useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import "./about.css";
import logo from "../../assets/images/logo.png";
import founderPhoto from "../../assets/images/founder.jpeg";

/** Same reveal-on-scroll behavior as the home page, kept local so this
 * page has no dependency on Home.jsx. */
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

export default function About() {
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

      {/* ---------- PAGE HERO & MISSION ---------- */}
      <section className="rs-about-hero">
        <div className="rs-about-grid">
          <div className="rs-about-story" data-reveal>
            <span className="rs-eyebrow">Our Story</span>
            <h1 className="rs-about-hero__title">About RightSide</h1>
            <p className="rs-about-hero__lede">
              RightSide is a stationery brand built around one simple idea:
              everyday products can be designed better.
            </p>
            <p className="rs-about-block__emphasis">
              We are not just making stationery. We are rethinking the way
              stationery is designed.
            </p>
          </div>

          <div className="rs-about-mission" data-reveal>
            <span className="rs-label">Our Mission</span>
            <div className="rs-about-mission__body">
              <p>
                Our mission is to reinvent everyday stationery through
                innovative, user-focused design. We believe that the products we
                use every day should not only be functional but also
                comfortable, thoughtful, aesthetic, and enjoyable to use.
              </p>
              <p>
                RightSide began with a simple observation about traditional
                notebooks and evolved into a completely new way of experiencing
                one. By rethinking familiar stationery products from the user's
                perspective, we aim to create products that are more efficient,
                engaging, and meaningful.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ---------- FOUNDER ---------- */}
      <section className="rs-founder" data-reveal>
        <div className="rs-founder__photo">
          <img src={founderPhoto} alt="Akhil Viswam, founder of RightSide" />
        </div>
        <div className="rs-founder__text">
          <span className="rs-label">About the Founder</span>
          <h2>A Note from the Founder</h2>
          <p>Hi, I'm Akhil Viswam, the founder of RightSide.</p>
          <p>
            As an online tutor working with students worldwide, I noticed how many everyday
            stationery products are designed simply because they've always been designed that way —
            not necessarily because they are the best solution for the user.
          </p>
          <p>
            I wanted to create a brand that asks a simple question:
            "Can this be designed better?"
          </p>
          <p>
            RightSide is my attempt to bring together my tutoring experience, my interest in innovation,
            and my passion for creating products that are more efficient, comfortable, aesthetic, and engaging.
          </p>
          <p>
            Through RightSide, I hope to make everyday writing and learning experiences a little better.
          </p>
          <p className="rs-founder__sign">— Akhil Viswam</p>
        </div>
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
