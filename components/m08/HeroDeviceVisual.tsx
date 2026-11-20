import React from 'react';
import styles from './HeroSection.module.css';

export function HeroDeviceVisual() {
  return (
    <div className={styles.heroSceneShop}>
      {/* Hidden SVG Definitions for Vector Product Artwork */}
      <svg className={styles.heroArtDefinitions} focusable="false" height="0" width="0" aria-hidden="true">
        <defs>
          <linearGradient id="m08-hb-bag" x1="0" x2="1" y1="0" y2="1">
            <stop offset="0" stopColor="#ae7652" />
            <stop offset="0.55" stopColor="#6f402b" />
            <stop offset="1" stopColor="#472a20" />
          </linearGradient>
          <linearGradient id="m08-hb-sneaker" x1="0" x2="1" y1="0" y2="0.9">
            <stop offset="0" stopColor="#eaeeee" />
            <stop offset="1" stopColor="#9ca9b6" />
          </linearGradient>
          <linearGradient id="m08-hb-glass" x1="0" x2="1" y1="0" y2="1">
            <stop offset="0" stopColor="#101723" />
            <stop offset="0.5" stopColor="#263646" />
            <stop offset="1" stopColor="#070c11" />
          </linearGradient>
          <symbol id="m08-hero-bag" viewBox="0 0 180 154">
            <ellipse cx="90" cy="136" fill="#cbbbad" opacity="0.42" rx="67" ry="10" />
            <path d="M48 55C47 28 58 16 88 15c28-1 41 11 40 39" fill="none" stroke="#4d3024" strokeLinecap="round" strokeWidth="9" />
            <path d="M51 54C50 29 62 20 89 19c23 0 35 10 35 34" fill="none" stroke="#bb916f" strokeWidth="3" />
            <path d="M33 55q-4 0-5 7l-5 62q0 10 13 10h112q12 0 11-11l-7-64q-1-5-7-5Z" fill="url(#m08-hb-bag)" stroke="#5c392a" strokeWidth="2" />
            <path d="M36 60c7 24 11 41 12 67m95-65c-8 21-11 45-12 65" opacity="0.29" stroke="#e1b894" strokeWidth="3" />
            <path d="M50 65v65m92-65v64" opacity="0.35" stroke="#48281d" strokeWidth="2" />
            <path d="M29 73h126" opacity="0.28" stroke="#d5ac86" strokeWidth="2" />
            <rect fill="#be946b" height="19" rx="3" stroke="#6d4833" strokeWidth="2" width="16" x="83" y="75" />
            <path d="M91 81v7" stroke="#65422d" strokeLinecap="round" strokeWidth="2" />
          </symbol>
          <symbol id="m08-hero-shoe" viewBox="0 0 180 154">
            <ellipse cx="90" cy="125" fill="#c0cad3" opacity="0.35" rx="73" ry="9" />
            <path d="M25 93c11-14 30-41 43-46 17-7 32 10 42 25l26 7q24 6 25 25v11H25q-11-1-11-11Z" fill="url(#m08-hb-sneaker)" stroke="#7b8895" strokeWidth="2" />
            <path d="M37 98c18-4 28-30 41-29 17 1 20 14 38 14" fill="none" stroke="#b6c0ca" strokeWidth="8" />
            <path d="M20 107h141v11H25q-5 0-5-4Z" fill="#f6f7f7" stroke="#a9b2b9" strokeWidth="2" />
            <path d="M74 68l29 15M65 78l30 14M56 87l30 13" stroke="#f6f8f9" strokeLinecap="round" strokeWidth="3" />
            <path d="M115 84l22 7" opacity="0.5" stroke="#778594" strokeWidth="3" />
          </symbol>
          <symbol id="m08-hero-watch" viewBox="0 0 180 154">
            <ellipse cx="89" cy="135" fill="#bdc4ce" opacity="0.42" rx="62" ry="9" />
            <rect fill="#202c39" height="45" rx="15" width="39" x="71" y="7" />
            <rect fill="#202c39" height="40" rx="15" width="39" x="71" y="108" />
            <rect fill="#17232e" height="77" rx="25" stroke="#647789" strokeWidth="5" width="83" x="49" y="41" />
            <rect fill="url(#m08-hb-glass)" height="63" rx="18" stroke="#9ba8b5" width="69" x="56" y="48" />
            <path d="M76 77 89 93l20-28" fill="none" stroke="#a8d7e9" strokeLinecap="round" strokeLinejoin="round" strokeWidth="5" />
            <circle cx="124" cy="80" fill="#c2d0db" r="5" />
          </symbol>
          <symbol id="m08-hero-bag-icon" viewBox="0 0 24 24">
            <path d="M5 8h14l1 12H4L5 8ZM9 9V6a3 3 0 0 1 6 0v3" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" />
          </symbol>
        </defs>
      </svg>

      <div className={styles.heroGlowOrbit} aria-hidden="true" />

      {/* Laptop Device (Decorative artwork hidden from screen readers) */}
      <div className={styles.heroLaptop} data-device="laptop" aria-hidden="true">
        <div className={styles.heroLaptopCamera} />
        <div className={styles.heroLaptopBezel}>
          <div className={styles.heroShopBar}>
            <span className={styles.heroShopLogo}>
              Shop<span className={styles.heroLogoDot}>.</span>
            </span>
            <span className={styles.heroShopNav}>
              Home <b>Shop</b> About
            </span>
            <span className={styles.heroShopBag}>
              <svg aria-hidden="true" viewBox="0 0 24 24">
                <use href="#m08-hero-bag-icon" />
              </svg>
            </span>
          </div>

          <div className={styles.heroShopMain}>
            <div className={styles.heroShopIntro}>
              <span className={styles.heroShopKicker}>THE EVERYDAY EDIT · SAMPLE SHOP</span>
              <strong>Showcase your products.</strong>
              <p>Discover products in a responsive online shop.</p>
              <span className={styles.heroShopAction}>
                Shop now <span aria-hidden="true">→</span>
              </span>
            </div>
            <div className={styles.heroShopFeature}>
              <svg aria-hidden="true" focusable="false" viewBox="0 0 180 154">
                <use href="#m08-hero-bag" />
              </svg>
            </div>
          </div>

          <div className={styles.heroShopGrid}>
            <div className={styles.heroShopProduct}>
              <span className={styles.heroShopThumb}>
                <svg aria-hidden="true" focusable="false" viewBox="0 0 180 154">
                  <use href="#m08-hero-shoe" />
                </svg>
              </span>
              <span>Sneakers</span>
            </div>
            <div className={styles.heroShopProduct}>
              <span className={styles.heroShopThumb}>
                <svg aria-hidden="true" focusable="false" viewBox="0 0 180 154">
                  <use href="#m08-hero-bag" />
                </svg>
              </span>
              <span>Everyday bag</span>
            </div>
            <div className={styles.heroShopProduct}>
              <span className={styles.heroShopThumb}>
                <svg aria-hidden="true" focusable="false" viewBox="0 0 180 154">
                  <use href="#m08-hero-watch" />
                </svg>
              </span>
              <span>Smartwatch</span>
            </div>
          </div>
        </div>
        <div className={styles.heroLaptopNeck} />
        <div className={styles.heroLaptopBase} />
      </div>

      {/* Smartphone Device (Decorative artwork hidden from screen readers) */}
      <div className={styles.heroHandset} data-device="phone" aria-hidden="true">
        <div className={styles.heroPhoneButtons} />
        <div className={styles.heroPhoneGlass}>
          <div className={styles.heroPhoneStatus}>
            <span>9:41</span>
            <span>●●●</span>
          </div>
          <div className={styles.heroPhoneIsland} />
          <div className={styles.heroPhoneBar}>
            <strong>
              Shop<span className={styles.heroLogoDot}>.</span>
            </strong>
            <svg aria-hidden="true" viewBox="0 0 24 24">
              <use href="#m08-hero-bag-icon" />
            </svg>
          </div>
          <div className={styles.heroPhoneMain}>
            <strong>Showcase your products.</strong>
            <span className={styles.heroPhoneAction}>Shop now →</span>
          </div>
          <div className={styles.heroPhoneFeature}>
            <svg aria-hidden="true" focusable="false" viewBox="0 0 180 154">
              <use href="#m08-hero-bag" />
            </svg>
          </div>
          <div className={styles.heroPhoneItemName}>Everyday bag</div>
          <div className={styles.heroPhoneHome} />
        </div>
      </div>

      {/* Screen reader narrative description */}
      <span className="sr-only">Example shop on a laptop and a phone. See the interactive examples below.</span>

      {/* Accessible readable caption mandated by Owner Condition 1 */}
      <p className={styles.heroSceneHint}>Example shop. Not a real business or client.</p>
    </div>
  );
}
