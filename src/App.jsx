import { useState, useEffect } from "react";

// ─── WHY: All design tokens live here as CSS custom properties.
//     Replacing scattered hex strings with variables means changing the
//     color palette is a single-line edit, not a global find-and-replace.
//
// ─── WHY: Two accents — cyan (primary/action) + indigo (secondary/depth).
//     Cyan handles CTAs, labels, and key highlights.
//     Indigo handles featured cards, hover glows, and secondary labels.
//     Using both stops "cyan everywhere" syndrome and gives the design more
//     dimensionality without adding visual noise.
const GlobalStyles = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=JetBrains+Mono:wght@400;500&family=DM+Sans:ital,wght@0,300;0,400;0,500;1,300&display=swap');

    /* ── Design Tokens ─────────────────────────────────────────────────── */
    :root {
      /* WHY: Refined background tones for premium depth without being overwhelming. */
      --bg-base:       #080c14;
      --bg-surface:    #0a0e18;
      --bg-card:       #0f1724;

      /* WHY: Border transparency scaled for better contrast with new card tone. */
      --border-subtle: rgba(255,255,255,0.05);
      --border-mid:    rgba(255,255,255,0.08);
      --border-strong: rgba(255,255,255,0.14);

      /* WHY: Cyan remains primary for interactive elements (CTAs, highlights). */
      --cyan:          #00d4ff;
      --cyan-dim:      rgba(0,212,255,0.08);
      --cyan-border:   rgba(0,212,255,0.24);
      --cyan-glow:     rgba(0,212,255,0.06);

      /* WHY: Indigo refined to #6366f1 for subtle depth, featured items, secondary interactions. */
      --indigo:        #6366f1;
      --indigo-dim:    rgba(99,102,241,0.08);
      --indigo-border: rgba(99,102,241,0.24);
      --indigo-glow:   rgba(99,102,241,0.06);

      /* WHY: Text hierarchy improved - better contrast for accessibility and readability. */
      --text-primary:   #f1f5f9;
      --text-secondary: #94a3b8;
      --text-muted:     #64748b;
      --text-faint:     #475569;

      --radius-sm: 6px;
      --radius-md: 10px;
      --radius-lg: 14px;

      --section-pad: 108px 24px;
      --section-max: 1100px;
    }

    /* ── Reset ──────────────────────────────────────────────────────────── */
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    html { scroll-behavior: smooth; }
    body {
      background: var(--bg-base);
      color: var(--text-secondary);
      font-family: 'DM Sans', sans-serif;
      line-height: 1.6;
      -webkit-font-smoothing: antialiased;
    }

    /* ── Font utilities ─────────────────────────────────────────────────── */
    .f-syne { font-family: 'Syne', sans-serif; }
    .f-mono { font-family: 'JetBrains Mono', monospace; }

    /* ── Scrollbar ──────────────────────────────────────────────────────── */
    ::-webkit-scrollbar { width: 4px; }
    ::-webkit-scrollbar-track { background: var(--bg-base); }
    ::-webkit-scrollbar-thumb { background: #1a2540; border-radius: 4px; }

    /* ── Grid background (hero) ─────────────────────────────────────────── */
    .grid-bg {
      background-image:
        linear-gradient(var(--border-subtle) 1px, transparent 1px),
        linear-gradient(90deg, var(--border-subtle) 1px, transparent 1px);
      background-size: 52px 52px;
    }

    /* ── Section layout ─────────────────────────────────────────────────── */
    .section { padding: var(--section-pad); border-bottom: 1px solid var(--border-subtle); }
    .section:last-of-type { border-bottom: none; }
    .section-alt {
      padding: var(--section-pad);
      background: linear-gradient(180deg, var(--bg-surface) 0%, rgba(10,14,24,0.5) 100%);
      border-top: 1px solid var(--border-subtle);
      border-bottom: 1px solid var(--border-subtle);
    }
    .section-inner { max-width: var(--section-max); margin: 0 auto; }

    /* ── Cards ──────────────────────────────────────────────────────────── */
    /* WHY: Box-shadow adds depth. Featured cards use refined indigo (#6366f1). */
    .card {
      background: var(--bg-card);
      border: 1px solid var(--border-subtle);
      border-radius: var(--radius-lg);
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.25);
      transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
      overflow: hidden;
    }
    .card:hover {
      border-color: var(--cyan-border);
      transform: translateY(-4px);
      box-shadow: 0 14px 42px rgba(0, 212, 255, 0.12);
    }
    .card img {
      display: block;
      width: 100%;
      height: 100%;
    }
    .card:not(.card--featured):hover img {
      transform: scale(1.05);
      transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1);
    }
    .card--featured {
      border-color: var(--indigo-border);
      background: linear-gradient(135deg, rgba(99,102,241,0.04) 0%, transparent 100%);
    }
    .card--featured:hover {
      border-color: var(--indigo);
      box-shadow: 0 14px 42px rgba(99,102,241,0.16);
      transform: translateY(-4px);
    }

    /* ── Featured project grid layout (side-by-side with image) ───────────── */
    .card--featured.card-with-image {
      display: grid;
      grid-template-columns: 1fr 1fr;
      grid-column: 1 / -1;
      gap: 32px;
      padding: 40px;
      overflow: visible;
      align-items: center;
      background: linear-gradient(135deg, var(--bg-card) 0%, rgba(6, 12, 20, 0.8) 100%);
      border: 1px solid rgba(0, 212, 255, 0.1);
      border-radius: var(--radius-lg);
      position: relative;
    }

    .card--featured.card-with-image::before {
      content: "";
      position: absolute;
      top: -1px;
      left: 50%;
      transform: translateX(-50%);
      width: 90%;
      height: 1px;
      background: linear-gradient(90deg, transparent, rgba(0, 212, 255, 0.5), transparent);
      pointer-events: none;
    }

    .card--featured.card-with-image .card-content {
      padding: 0;
      display: flex;
      flex-direction: column;
      gap: 18px;
      justify-content: flex-start;
      background: transparent;
    }

    .card--featured.card-with-image .proj-badge-featured {
      font-size: 0.65rem;
      font-weight: 700;
      letter-spacing: 0.12em;
      color: var(--cyan);
      text-transform: uppercase;
      display: inline-block;
      width: fit-content;
      margin-bottom: 6px;
    }

    .card--featured.card-with-image h3 {
      font-size: 1.6rem !important;
      font-weight: 800 !important;
      line-height: 1.2;
      letter-spacing: -0.02em;
      color: var(--text-primary);
      margin: 0 !important;
    }

    .card--featured.card-with-image > div:first-child > p {
      font-size: 0.9rem;
      color: var(--text-secondary);
      line-height: 1.6;
      margin: 8px 0 !important;
    }

    .card--featured.card-with-image .card-image-wrapper {
      position: relative;
      overflow: hidden;
      border-radius: var(--radius-lg);
      background: var(--bg-surface);
      aspect-ratio: 16 / 9;
      max-height: 380px;
      border: 1px solid rgba(0, 212, 255, 0.15);
      box-shadow: 0 20px 40px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.05);
    }

    .card--featured.card-with-image .card-image-wrapper::before {
      content: "";
      position: absolute;
      inset: 0;
      background: linear-gradient(135deg, rgba(0, 212, 255, 0.05) 0%, rgba(129, 140, 248, 0.03) 100%);
      pointer-events: none;
      border-radius: var(--radius-lg);
      z-index: 1;
    }

    .card--featured.card-with-image .card-image-wrapper::after {
      content: "";
      position: absolute;
      inset: 0;
      background: radial-gradient(circle at 50% 0%, rgba(0, 212, 255, 0.15) 0%, transparent 70%);
      pointer-events: none;
      border-radius: var(--radius-lg);
      z-index: 2;
      opacity: 0;
      transition: opacity 0.4s ease;
    }

    .card--featured.card-with-image:hover .card-image-wrapper::after {
      opacity: 1;
    }

    .card--featured.card-with-image .card-image-wrapper img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      object-position: center;
      transition: transform 0.5s cubic-bezier(0.16, 1, 0.3, 1);
      display: block;
    }

    .card--featured.card-with-image:hover .card-image-wrapper img {
      transform: scale(1.03);
    }

    .card--featured.card-with-image .f-mono {
      font-size: 0.7rem !important;
      letter-spacing: 0.11em;
      text-transform: uppercase;
      color: var(--indigo);
      font-weight: 600;
      display: block;
      margin-bottom: 10px !important;
    }

    .card--featured.card-with-image ul {
      margin: 0 !important;
      padding: 0 0 0 18px !important;
      list-style: disc;
    }

    .card--featured.card-with-image li {
      font-size: 0.82rem;
      color: var(--text-secondary);
      line-height: 1.6;
      margin-bottom: 6px;
    }

    .card--featured.card-with-image li:last-child {
      margin-bottom: 0;
    }

    .card--featured.card-with-image .tech-badge {
      font-size: 0.7rem;
      padding: 4px 10px;
      border-radius: 4px;
      background: rgba(0, 212, 255, 0.08);
      color: var(--cyan);
      border: 1px solid rgba(0, 212, 255, 0.2);
      transition: all 0.3s ease;
    }

    .card--featured.card-with-image:hover .tech-badge {
      background: rgba(0, 212, 255, 0.12);
      border-color: rgba(0, 212, 255, 0.3);
    }

    .card--featured.card-with-image .btn-gh {
      font-size: 0.75rem !important;
      padding: 6px 12px !important;
      border-radius: 4px !important;
      border: 1px solid rgba(0, 212, 255, 0.2) !important;
      background: rgba(0, 212, 255, 0.08) !important;
      color: var(--cyan) !important;
      transition: all 0.3s ease !important;
    }

    .card--featured.card-with-image .btn-gh:hover {
      background: rgba(0, 212, 255, 0.15) !important;
      border-color: rgba(0, 212, 255, 0.4) !important;
      transform: translateY(-2px);
    }

    /* ── Featured project responsive ──────────────────────────────────────── */
    @media (max-width: 1000px) {
      .card--featured.card-with-image {
        grid-template-columns: 1fr;
        gap: 24px;
        padding: 32px;
      }

      .card--featured.card-with-image .card-image-wrapper {
        order: -1;
        max-height: 280px;
        aspect-ratio: 16 / 9;
      }

      .card--featured.card-with-image h3 {
        font-size: 1.3rem !important;
      }

      .card--featured.card-with-image > div:first-child > p {
        font-size: 0.85rem;
      }
    }

    @media (max-width: 640px) {
      .card--featured.card-with-image {
        grid-template-columns: 1fr;
        gap: 18px;
        padding: 20px;
      }

      .card--featured.card-with-image .card-image-wrapper {
        max-height: 220px;
        aspect-ratio: 16 / 9;
      }

      .card--featured.card-with-image h3 {
        font-size: 1.1rem !important;
      }

      .card--featured.card-with-image > div:first-child > p {
        font-size: 0.8rem;
      }

      .card--featured.card-with-image .proj-badge-featured {
        font-size: 0.6rem;
      }
    }

    /* ── Navbar ─────────────────────────────────────────────────────────── */
    .nav-root {
      position: fixed; top: 0; left: 0; right: 0;
      z-index: 100;
      transition: background 0.3s, border-color 0.3s;
    }
    .nav-root.scrolled {
      background: rgba(8,12,20,0.9);
      backdrop-filter: blur(14px);
      -webkit-backdrop-filter: blur(14px);
      border-bottom: 1px solid var(--border-subtle);
    }
    .nav-inner {
      max-width: var(--section-max); margin: 0 auto;
      padding: 0 24px; height: 60px;
      display: flex; align-items: center; justify-content: space-between;
    }
    .nav-logo {
      font-family: 'Syne', sans-serif; font-weight: 800;
      font-size: 1.05rem; color: var(--text-primary); letter-spacing: -0.02em;
    }
    .nav-logo .c { color: var(--cyan); }
    .nav-links { display: flex; gap: 32px; align-items: center; }
    .nav-link {
      font-family: 'JetBrains Mono', monospace; font-size: 0.76rem;
      letter-spacing: 0.05em; color: var(--text-muted);
      background: none; border: none; cursor: pointer; padding: 0;
      position: relative; transition: color 0.2s;
    }
    .nav-link::after {
      content: ''; position: absolute; bottom: -3px; left: 0;
      width: 0; height: 1px; background: var(--cyan);
      transition: width 0.22s ease;
    }
    .nav-link:hover { color: var(--cyan); }
    .nav-link:hover::after { width: 100%; }
    .nav-toggle {
      display: none; background: none; border: none;
      cursor: pointer; color: var(--text-secondary); padding: 4px;
    }
    .mobile-menu {
      background: rgba(8,12,20,0.97);
      border-bottom: 1px solid var(--border-subtle);
      padding: 4px 24px 18px;
    }
    .mobile-link {
      display: block; width: 100%; padding: 13px 0;
      border: none; border-bottom: 1px solid var(--border-subtle);
      font-family: 'JetBrains Mono', monospace; font-size: 0.8rem;
      color: var(--text-muted); background: none;
      cursor: pointer; text-align: left; letter-spacing: 0.05em;
      transition: color 0.2s;
    }
    .mobile-link:last-child { border-bottom: none; }
    .mobile-link:hover { color: var(--cyan); }

    /* ── Animations ─────────────────────────────────────────────────────── */
    @keyframes fadeUp {
      from { opacity: 0; transform: translateY(18px); }
      to   { opacity: 1; transform: translateY(0); }
    }
    .anim    { animation: fadeUp 0.58s ease forwards; opacity: 0; }
    .d1 { animation-delay: 0.08s; }
    .d2 { animation-delay: 0.20s; }
    .d3 { animation-delay: 0.32s; }
    .d4 { animation-delay: 0.44s; }

    /* ── Buttons ─────────────────────────────────────────────────────────── */
    .btn {
      display: inline-block; padding: 12px 28px;
      border-radius: var(--radius-md);
      font-family: 'DM Sans', sans-serif; font-size: 0.88rem; font-weight: 500;
      cursor: pointer; transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
      text-decoration: none; border: none;
    }
    .btn-primary {
      background: var(--cyan); color: var(--bg-base); font-weight: 600;
      box-shadow: 0 3px 12px rgba(0, 212, 255, 0.18);
    }
    .btn-primary:hover {
      background: #2edeff; transform: translateY(-2px);
      box-shadow: 0 6px 16px rgba(0, 212, 255, 0.28);
    }
    .btn-ghost {
      background: transparent; color: var(--text-secondary);
      border: 1px solid var(--border-mid); font-weight: 400;
    }
    .btn-ghost:hover { border-color: var(--indigo-border); color: var(--indigo); transform: translateY(-1px); }
    .btn-gh {
      display: inline-flex; align-items: center; gap: 6px;
      padding: 8px 16px; border-radius: var(--radius-sm);
      font-family: 'DM Sans', sans-serif; font-size: 0.8rem;
      color: var(--text-muted); background: transparent;
      border: 1px solid var(--border-subtle); cursor: pointer;
      text-decoration: none; transition: all 0.2s ease; white-space: nowrap;
    }
    .btn-gh:hover {
      border-color: var(--cyan-border); color: var(--cyan);
      box-shadow: 0 0 0 2px rgba(0, 212, 255, 0.1);
    }

    /* ── Section header ─────────────────────────────────────────────────── */
    .sh-tag {
      display: block; font-family: 'JetBrains Mono', monospace;
      font-size: 0.69rem; letter-spacing: 0.15em;
      color: var(--text-faint); text-transform: uppercase; margin-bottom: 10px;
    }
    .sh-title {
      font-family: 'Syne', sans-serif;
      font-size: clamp(1.75rem, 3.5vw, 2.6rem);
      font-weight: 800; letter-spacing: -0.03em; color: var(--text-primary);
    }
    /* WHY: Gradient bar adds visual interest with both accent colors */
    .sh-bar {
      width: 32px; height: 3px;
      background: linear-gradient(90deg, var(--cyan), var(--indigo));
      border-radius: 2px; margin-top: 12px;
    }
    .sh-bar-c { margin: 12px auto 0; }

    /* ── Skill pills ────────────────────────────────────────────────────── */
    .skill-pill {
      background: rgba(255,255,255,0.04); border: 1px solid var(--border-mid);
      color: var(--text-muted); border-radius: var(--radius-sm);
      padding: 5px 13px; font-size: 0.77rem;
      font-family: 'JetBrains Mono', monospace;
      transition: all 0.2s;
      white-space: nowrap;
    }
    .skill-pill:hover { background: var(--cyan-dim); color: var(--cyan); border-color: var(--cyan-border); }

    /* ── Tech badges ────────────────────────────────────────────────────── */
    .tech-badge {
      background: rgba(255,255,255,0.04); border: 1px solid var(--border-subtle);
      color: var(--text-faint); border-radius: 4px;
      padding: 2px 9px; font-size: 0.69rem;
      font-family: 'JetBrains Mono', monospace; letter-spacing: 0.02em;
    }

    /* ── Featured project badge ─────────────────────────────────────────────── */
    .proj-badge-featured {
      display: inline-flex; align-items: center; gap: 5px;
      font-family: 'JetBrains Mono', monospace; font-size: 0.63rem;
      color: var(--indigo); letter-spacing: 0.12em;
      text-transform: uppercase; font-weight: 600;
    }

    /* ── Geolocation accent (subtle grid pattern for backend projects) ────── */
    .card-geo-accent {
      position: absolute; top: 0; right: 0; bottom: 0;
      width: 100%; height: 100%;
      background-image:
        linear-gradient(90deg, rgba(0,212,255,0.02) 1px, transparent 1px),
        linear-gradient(rgba(0,212,255,0.02) 1px, transparent 1px);
      background-size: 48px 48px;
      background-position: 100% 0;
      pointer-events: none;
      opacity: 0;
      transition: opacity 0.3s ease;
      border-radius: var(--radius-lg);
    }
    
    .card--featured:hover .card-geo-accent {
      opacity: 1;
    }

    /* ── Card inner wrapper ─────────────────────────────────────────────── */
    .card-content {
      position: relative; z-index: 1;
    }

    /* ── Form ───────────────────────────────────────────────────────────── */
    .form-label {
      display: block; font-family: 'JetBrains Mono', monospace;
      font-size: 0.67rem; letter-spacing: 0.1em;
      color: var(--text-faint); margin-bottom: 8px; text-transform: uppercase;
      font-weight: 600;
    }
    .form-input {
      width: 100%; background: rgba(15, 21, 32, 0.8);
      border: 1px solid var(--border-mid); color: var(--text-primary);
      border-radius: var(--radius-md); padding: 12px 16px;
      font-family: 'DM Sans', sans-serif; font-size: 0.88rem; line-height: 1.5;
      outline: none; transition: border-color 0.2s ease, box-shadow 0.2s ease;
    }
    .form-input:focus {
      border-color: var(--cyan);
      box-shadow: 0 0 0 3px rgba(0, 212, 255, 0.1);
    }
    .form-input::placeholder { color: var(--text-faint); }

    /* ── Status badge ───────────────────────────────────────────────────── */
    .status-badge {
      display: inline-flex; align-items: center; gap: 9px;
      padding: 7px 16px;
      background: rgba(34,197,94,0.06); border: 1px solid rgba(34,197,94,0.16);
      border-radius: 100px;
    }
    .status-dot {
      width: 7px; height: 7px; background: #22c55e;
      border-radius: 50%; flex-shrink: 0;
      animation: pulse 2.2s ease-in-out infinite;
    }
    @keyframes pulse { 0%,100% { opacity: 1; } 50% { opacity: 0.32; } }
    .status-text { font-family: 'JetBrains Mono', monospace; font-size: 0.71rem; color: #4ade80; letter-spacing: 0.05em; }

    /* ── Cert accent bar ────────────────────────────────────────────────── */
    .cert-bar { width: 3px; flex-shrink: 0; border-radius: 2px; }
    .cert-bar-cyan   { background: var(--cyan); }
    .cert-bar-indigo { background: var(--indigo); }

    /* ── About grid ─────────────────────────────────────────────────────── */
    .about-grid {
      display: grid; grid-template-columns: 1fr 1fr;
      gap: 68px; margin-top: 48px; align-items: start;
    }
    .qf-row {
      display: flex; justify-content: space-between; align-items: center;
      padding: 12px 0; border-bottom: 1px solid var(--border-subtle);
    }
    .qf-row:last-child { border-bottom: none; }

    /* ── Project grids ──────────────────────────────────────────────────── */
    .proj-grid    { display: grid; grid-template-columns: repeat(auto-fill, minmax(300px,1fr)); gap: 14px; }
    .proj-grid-sm { display: grid; grid-template-columns: repeat(auto-fill, minmax(260px,1fr)); gap: 12px; }

    /* ── Footer ─────────────────────────────────────────────────────────── */
    .footer-line {
      height: 1px;
      background: linear-gradient(90deg, transparent, var(--border-mid) 30%, var(--border-mid) 70%, transparent);
      margin-bottom: 24px;
    }

    /* ── Utilities ──────────────────────────────────────────────────────── */
    .text-center { text-align: center; }
    .mt-lg { margin-top: 48px; }
    .mt-md { margin-top: 24px; }
    .mb-lg { margin-bottom: 48px; }
    .mb-md { margin-bottom: 24px; }
    .gap-md { gap: 24px; }
    .gap-lg { gap: 36px; }
    .flex { display: flex; }
    .flex-col { flex-direction: column; }
    .flex-wrap { flex-wrap: wrap; }
    .items-start { align-items: flex-start; }
    .items-center { align-items: center; }
    .items-stretch { align-items: stretch; }
    .justify-between { justify-content: space-between; }
    .justify-center { justify-content: center; }

    /* ── Responsive ─────────────────────────────────────────────────────── */
    /* WHY: All breakpoints centralized for maintainability. Desktop-first approach. */
    @media (max-width: 860px) {
      .about-grid { grid-template-columns: 1fr; gap: 36px; }
      .sh-bar { width: 24px; }
    }
    @media (max-width: 768px) {
      :root { --section-pad: 72px 20px; --section-max: 100%; }
      .nav-links  { display: none; }
      .nav-toggle { display: block; }
      .proj-grid  { grid-template-columns: 1fr; }
      .proj-grid-sm { grid-template-columns: 1fr; }
      .sh-title { font-size: clamp(1.4rem, 5vw, 1.8rem); }
    }
    @media (max-width: 540px) {
      :root { --section-pad: 60px 16px; }
      .form-row { grid-template-columns: 1fr !important; }
      .sh-bar { width: 20px; }
    }
  `}</style>
);

// ─── Data ─────────────────────────────────────────────────────────────────────
const NAV_LINKS = ["About", "Projects", "Skills", "Certifications", "Contact"];

const PROJECTS = [
  {
    title: "FaithfulMatch",
    description:
      "Backend-driven matching platform featuring intelligent user matching with geo-location based recommendations. Implemented advanced filtering logic and real-time matching algorithms in a three-person team.",
    contributions: [
      "Built matching & filtering controllers with complex query logic",
      "Implemented geo-near location matching using MongoDB geospatial indexing",
      "Developed customizable user preference filters with cascading rules",
      "Created RESTful backend endpoints handling concurrent user requests",
      "Integrated MongoDB aggregation pipeline for efficient data processing",
    ],
    tech: ["NestJS", "TypeScript", "MongoDB", "Mongoose", "REST APIs", "Geolocation"],
    github: "#",
    featured: true,
    image: "/images/faithfullmatch.png",
  },
  {
    title: "Celestial Palate",
    description:
      "Full-stack restaurant booking platform built collaboratively for ALX graduation. Features three international branches (African, Italian, Japanese) with unique menus, themed UX, dynamic content, and seamless reservation system.",
    contributions: [
      "Developed branch-specific frontend pages",
      "Implemented reservation, customer, and payment routes",
      "Configured database setup and backend integration",
      "Contributed to responsive UI development",
    ],
    tech: ["HTML", "CSS", "JavaScript", "Python", "SQL", "Responsive Design"],
    github: "https://github.com/mukoe2020/Celestial-Palate-Portfolio",
    website: "https://celestial-palate-portfolio.vercel.app/",
    featured: true,
    image: "/images/celesial.png",
  },
  {
    title: "TSL Commercial Parts",
    description:
      "Modern business website for a truck and trailer parts supplier, designed to connect customers directly through integrated WhatsApp communication. Built with responsive React layouts and optimized for mobile experience.",
    tech: ["React", "JavaScript", "HTML", "CSS"],
    github: "https://github.com/corlatetechnologies-stack/TLS-COMMERCIAL-PARTS/tree/main",
    website: "https://www.tslcparts.co.za/",
    featured: false,
    image: "/images/tsl.png",
  },
  {
    title: "React Weather App",
    description:
      "A responsive React weather application that delivers real-time weather updates using the OpenWeather API, featuring temperature, humidity, wind speed, and weather conditions through a clean, user-friendly interface.",
    tech: ["React", "JavaScript", "OpenWeather API", "HTML", "CSS"],
    github: "https://github.com/mukoe2020/REACT-WEATHER-APP",
    website: "https://react-weather-app-six-khaki.vercel.app/",
    featured: false,
    image: "/images/reactapp.png",
  },
  {
    title: "Phishing Fortress",
    description:
      "An interactive phishing awareness platform that trains users to identify malicious emails through simulated exercises and score-based assessments, featuring authentication, answer validation, and progress tracking systems.",
    tech: ["JavaScript", "Python", "FastAPI", "PostgreSQL", "React", "JWT", "Tailwind"],
    github: "https://github.com/mukoe2020/PhishingFostr",
    website: "https://phishingfotress.netlify.app/",
    featured: false,
    image: "/images/phishing.png",
  },
  {
    title: "Ubuntu Supply Solutions",
    description:
      "Developed a responsive healthcare supply platform for Ubuntu Supply Solutions, featuring dynamic product displays, WhatsApp-based quote requests, mobile-first responsive design, interactive hero sliders, and optimized user engagement workflows for medical equipment inquiries.",
    tech: ["HTML", "CSS", "JavaScript", "Responsive Design", "WhatsApp API"],
    github: "https://github.com/mukoe2020/ubuntu-supply-solutions",
    website: "https://ubuntu-supply-solutions.vercel.app/",
    featured: false,
    image: "/images/ubuntu.png",
  },
];

const SKILLS = {
  Languages:         ["Python", "JavaScript", "SQL", "Bash", "C"],
  "Backend & APIs":  ["FastAPI", "Django", "Flask", "Node.js", "Express", "REST", "GraphQL"],
  Databases:         ["PostgreSQL", "MySQL", "SQLite", "MongoDB", "Redis"],
  "DevOps & Tools":  ["Docker", "Git", "GitHub Actions", "Linux", "Nginx", "AWS (basics)"],
  "Data & Analysis": ["Pandas", "NumPy", "Matplotlib", "Jupyter"],
};

const CERTIFICATIONS = [
  {
    title:  "ALX Backend Software Engineering",
    issuer: "ALX Africa",
    year:   "2024",
    desc:   "12 months of intensive backend engineering. Python, C, systems design, databases, DevOps. The foundation I needed.",
    accent: "cyan",
  },
  {
    title:  "IBM Data Analyst Professional",
    issuer: "IBM / Coursera",
    year:   "2023",
    desc:   "9-course series on data analysis. SQL, Python, Pandas, visualization. Built the foundation before moving backend.",
    accent: "indigo",
  },
  {
    title:  "SheCodes Frontend Development",
    issuer: "SheCodes",
    year:   "2023",
    desc:   "Where it started. HTML, CSS, JavaScript, React. Understanding the frontend made me better at building backends.",
    accent: "cyan",
  },
];

// ─── Icons ─────────────────────────────────────────────────────────────────────
const GithubIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
  </svg>
);

const MenuIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true">
    <line x1="3" y1="6" x2="21" y2="6"/>
    <line x1="3" y1="12" x2="21" y2="12"/>
    <line x1="3" y1="18" x2="21" y2="18"/>
  </svg>
);

const CloseIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true">
    <line x1="18" y1="6" x2="6" y2="18"/>
    <line x1="6" y1="6" x2="18" y2="18"/>
  </svg>
);

// ─── SectionHeader ─────────────────────────────────────────────────────────────
function SectionHeader({ tag, title, centered = false }) {
  return (
    <div style={{ textAlign: centered ? "center" : "left" }}>
      <span className="sh-tag">{tag}</span>
      <h2 className="sh-title f-syne">{title}</h2>
      <div className={`sh-bar ${centered ? "sh-bar-c" : ""}`} />
    </div>
  );
}

// ─── Navbar ────────────────────────────────────────────────────────────────────
function Navbar() {
  const [open, setOpen]         = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (id) => {
    document.getElementById(id.toLowerCase())?.scrollIntoView({ behavior: "smooth" });
    setOpen(false);
  };

  return (
    <header className={`nav-root${scrolled ? " scrolled" : ""}`}>
      <div className="nav-inner">
        <span className="nav-logo f-syne">
          <span className="c">&lt;</span>dev<span className="c">/&gt;</span>
        </span>

        <nav className="nav-links" aria-label="Main navigation">
          {NAV_LINKS.map((l) => (
            <button key={l} className="nav-link f-mono" onClick={() => scrollTo(l)}>
              {l}
            </button>
          ))}
        </nav>

        <button
          className="nav-toggle"
          onClick={() => setOpen(!open)}
          aria-label={open ? "Close menu" : "Open menu"}
        >
          {open ? <CloseIcon /> : <MenuIcon />}
        </button>
      </div>

      {open && (
        <nav className="mobile-menu" aria-label="Mobile navigation">
          {NAV_LINKS.map((l) => (
            <button key={l} className="mobile-link f-mono" onClick={() => scrollTo(l)}>
              {l}
            </button>
          ))}
        </nav>
      )}
    </header>
  );
}

// ─── Hero ──────────────────────────────────────────────────────────────────────
function Hero() {
  return (
    <section
      id="hero"
      className="grid-bg"
      style={{ minHeight: "100vh", display: "flex", alignItems: "center", padding: "0 24px", position: "relative", overflow: "hidden" }}
    >
      {/* WHY: Refined two-colour ambient glow (cyan left, indigo right) creates
          depth and sophistication. Blend of both accents introduces design hierarchy. */}
      <div aria-hidden="true" style={{
        position: "absolute", top: "25%", left: "12%",
        width: "500px", height: "500px",
        background: "radial-gradient(circle, rgba(0,212,255,0.06) 0%, transparent 68%)",
        pointerEvents: "none",
      }} />
      <div aria-hidden="true" style={{
        position: "absolute", top: "42%", right: "8%",
        width: "380px", height: "380px",
        background: "radial-gradient(circle, rgba(99,102,241,0.12) 0%, transparent 68%)",
        pointerEvents: "none",
      }} />

      <div style={{ maxWidth: "var(--section-max)", margin: "0 auto", width: "100%", paddingTop: "72px" }}>

        <p className="f-mono anim d1" style={{ fontSize: "0.73rem", color: "var(--text-muted)", letterSpacing: "0.15em", marginBottom: "20px" }}>
          backend developer · python · databases
        </p>

        <h1 className="f-syne anim d2" style={{
          fontSize: "clamp(2.5rem, 5.8vw, 5rem)",
          fontWeight: 800, lineHeight: 1.08,
          letterSpacing: "-0.03em", color: "var(--text-primary)",
          maxWidth: "680px", marginBottom: "24px",
        }}>
          I build backends<br />
          that <span style={{ color: "var(--cyan)" }}>stay reliable</span>
        </h1>

        <p className="anim d3" style={{
          fontSize: "1rem", lineHeight: 1.82,
          color: "var(--text-muted)", maxWidth: "500px", marginBottom: "36px",
        }}>
          Completed ALX's backend engineering program. I write APIs that scale predictably, design databases that don't surprise you, and keep systems maintainable. Right now I'm looking for a role where I can build real systems with a strong team.
        </p>

        <div className="anim d4" style={{ display: "flex", gap: "12px", flexWrap: "wrap", marginBottom: "48px" }}>
          <button className="btn btn-primary" onClick={() => document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })}>
            See my work
          </button>
          <button className="btn btn-ghost" onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}>
            Get in touch
          </button>
        </div>

        <div className="status-badge anim d4">
          <div className="status-dot" />
          <span className="status-text">Open to internship &amp; junior roles</span>
        </div>
      </div>

      {/* Scroll indicator */}
      <div aria-hidden="true" style={{
        position: "absolute", bottom: "36px", left: "50%", transform: "translateX(-50%)",
      }}>
        <div style={{
          width: "1px", height: "44px",
          background: "linear-gradient(to bottom, transparent, var(--cyan))",
          opacity: 0.3,
        }} />
      </div>
    </section>
  );
}

// ─── About ─────────────────────────────────────────────────────────────────────
function About() {
  const facts = [
    { label: "Focus",       value: "Backend Development" },
    { label: "Training",    value: "ALX Africa, Class of 2024" },
    { label: "Into",        value: "APIs, databases, DevOps" },
    { label: "Looking for", value: "Internship / Junior role" },
    { label: "Location",    value: "Remote-friendly" },
  ];

  return (
    <section id="about" className="section-alt">
      <div className="section-inner">
        <SectionHeader tag="01. about" title="A bit about me" />

        <div className="about-grid">
          <div>
            <p style={{ fontSize: "0.97rem", lineHeight: 1.85, color: "var(--text-secondary)", marginBottom: "18px" }}>
              I spent a year at ALX working on the fundamentals. Went deep on Python, C, databases, systems design—the kind of foundation that matters. The program pushed hard, and that was the point.
            </p>
            <p style={{ fontSize: "0.97rem", lineHeight: 1.85, color: "var(--text-secondary)", marginBottom: "18px" }}>
              Before that I completed IBM's Data Analyst certification, which gave me respect for how data actually flows through systems. Still shapes how I approach API design and schema architecture.
            </p>
            <p style={{ fontSize: "0.97rem", lineHeight: 1.85, color: "var(--text-secondary)", marginBottom: "32px" }}>
              I started with frontend (SheCodes), which matters—understanding the other side makes you write better backends. Now I focus on reliable, scalable systems.
            </p>

            <div style={{ display: "flex", gap: "36px" }}>
              {[{ n: "6+", l: "Projects" }, { n: "3", l: "Certs" }, { n: "1yr", l: "ALX program" }].map(({ n, l }) => (
                <div key={l}>
                  <div className="f-syne" style={{ fontSize: "1.9rem", fontWeight: 800, color: "var(--cyan)", lineHeight: 1 }}>{n}</div>
                  <div className="f-mono" style={{ fontSize: "0.66rem", color: "var(--text-faint)", marginTop: "5px", letterSpacing: "0.1em", textTransform: "uppercase" }}>{l}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: quick-facts card */}
          <div style={{
            background: "linear-gradient(135deg, rgba(129,140,248,0.03) 0%, rgba(0,212,255,0.01) 100%)",
            border: "1px solid var(--border-subtle)", borderRadius: "var(--radius-lg)", padding: "28px",
          }}>
            <span className="f-mono" style={{
              fontSize: "0.67rem", letterSpacing: "0.13em",
              color: "var(--indigo)", textTransform: "uppercase",
              display: "block", marginBottom: "18px", fontWeight: 600,
            }}>
              quick facts
            </span>
            {facts.map(({ label, value }) => (
              <div key={label} className="qf-row">
                <span className="f-mono" style={{ fontSize: "0.72rem", color: "var(--text-faint)" }}>{label}</span>
                <span style={{ fontSize: "0.85rem", color: "var(--text-secondary)", fontWeight: 500 }}>{value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Projects ──────────────────────────────────────────────────────────────────
function ProjectCard({ project }) {
  // Featured projects with images use side-by-side layout
  if (project.featured && project.image) {
    return (
      <article className={`card card--featured card-with-image`}>
        <div className="card-content">
          {/* Featured Badge */}
          <div>
            <span className="proj-badge-featured">★ Featured</span>
          </div>

          {/* Header: Title + Buttons */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "10px" }}>
            <h3 className="f-syne" style={{ fontSize: "1.3rem", fontWeight: 800, color: "var(--text-primary)", margin: "0", letterSpacing: "-0.02em" }}>
              {project.title}
            </h3>
            <div style={{ display: "flex", gap: "8px", alignItems: "center", flexShrink: 0 }}>
              {project.website && (
                <a href={project.website} className="btn-gh" target="_blank" rel="noopener noreferrer" aria-label={`Visit ${project.title}`} style={{ background: "rgba(99,102,241,0.08)", borderColor: "rgba(99,102,241,0.24)" }}>
                  Visit Site
                </a>
              )}
              <a href={project.github} className="btn-gh" target="_blank" rel="noopener noreferrer" aria-label={`${project.title} on GitHub`}>
                <GithubIcon /> GitHub
              </a>
            </div>
          </div>

          {/* Description */}
          <p style={{ fontSize: "0.87rem", color: "var(--text-secondary)", lineHeight: 1.72, margin: "0" }}>
            {project.description}
          </p>

          {/* Contributions */}
          {project.contributions && (
            <div style={{ fontSize: "0.82rem", color: "var(--text-secondary)", lineHeight: 1.68, margin: "0" }}>
              <span className="f-mono" style={{
                fontSize: "0.65rem", color: "var(--indigo)", letterSpacing: "0.1em",
                textTransform: "uppercase", display: "block", marginBottom: "10px", fontWeight: 600,
              }}>
                Key Contributions
              </span>
              <ul style={{
                margin: "0", padding: "0 0 0 18px", listStyle: "disc", color: "var(--text-secondary)",
              }}>
                {project.contributions.map((contrib, idx) => (
                  <li key={idx} style={{
                    marginBottom: idx !== project.contributions.length - 1 ? "6px" : "0",
                    fontSize: "0.82rem",
                  }}>
                    {contrib}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Tech stack */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: "6px", marginTop: "auto", paddingTop: "6px" }}>
            {project.tech.map((t) => <span key={t} className="tech-badge">{t}</span>)}
          </div>
        </div>

        {/* Large image on right */}
        <div className="card-image-wrapper">
          <img
            src={project.image}
            alt={project.title}
          />
        </div>
      </article>
    );
  }

  // Compact layout for non-featured projects or featured without image
  return (
    <article
      className={`card ${project.featured ? "card--featured" : ""}`}
      style={{ padding: "0", display: "flex", flexDirection: "column", gap: "0", overflow: "hidden", position: "relative" }}
    >
      {project.featured && <div className="card-geo-accent" />}

      {/* Image at top if exists */}
      {project.image && (
        <div style={{
          width: "100%",
          height: "180px",
          overflow: "hidden",
          background: "var(--bg-surface)",
          borderBottom: "1px solid rgba(0, 212, 255, 0.1)",
        }}>
          <img
            src={project.image}
            alt={project.title}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              objectPosition: "center",
              transition: "transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
            }}
          />
        </div>
      )}

      <div className="card-content" style={{ padding: "24px", display: "flex", flexDirection: "column", gap: "14px", flexGrow: 1 }}>
        {/* Header: Title + Buttons */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "10px" }}>
          <div style={{ flex: 1 }}>
            {project.featured && (
              <span className="proj-badge-featured">
                ★ Featured
              </span>
            )}
            <h3 className="f-syne" style={{ fontSize: "1rem", fontWeight: 700, color: "var(--text-primary)", marginTop: project.featured ? "6px" : "0" }}>
              {project.title}
            </h3>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "8px", alignItems: "flex-end", flexShrink: 0 }}>
            {project.website && (
              <a href={project.website} className="btn-gh" target="_blank" rel="noopener noreferrer" aria-label={`Visit ${project.title}`} style={{ background: "rgba(99,102,241,0.08)", borderColor: "rgba(99,102,241,0.24)" }}>
                Visit Site
              </a>
            )}
            <a href={project.github} className="btn-gh" target="_blank" rel="noopener noreferrer" aria-label={`${project.title} on GitHub`}>
              <GithubIcon /> GitHub
            </a>
          </div>
        </div>

        {/* Description */}
        <p style={{ fontSize: "0.87rem", color: "var(--text-secondary)", lineHeight: 1.72, margin: "0" }}>
          {project.description}
        </p>

        {/* Contributions */}
        {project.contributions && (
          <div style={{ fontSize: "0.82rem", color: "var(--text-secondary)", lineHeight: 1.68, margin: "0" }}>
            <span className="f-mono" style={{
              fontSize: "0.65rem", color: "var(--indigo)", letterSpacing: "0.1em",
              textTransform: "uppercase", display: "block", marginBottom: "10px", fontWeight: 600,
            }}>
              Key Contributions
            </span>
            <ul style={{
              margin: "0", padding: "0 0 0 18px", listStyle: "disc", color: "var(--text-secondary)",
            }}>
              {project.contributions.map((contrib, idx) => (
                <li key={idx} style={{
                  marginBottom: idx !== project.contributions.length - 1 ? "6px" : "0",
                  fontSize: "0.82rem",
                }}>
                  {contrib}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Tech stack with improved spacing */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: "6px", marginTop: "auto", paddingTop: "6px" }}>
          {project.tech.map((t) => <span key={t} className="tech-badge">{t}</span>)}
        </div>
      </div>
    </article>
  );
}

function Projects() {
  const featured = PROJECTS.filter((p) => p.featured);
  const other    = PROJECTS.filter((p) => !p.featured);

  return (
    <section id="projects" className="section">
      <div className="section-inner">
        <SectionHeader tag="02. projects" title="Things I've built" />

        <div className="proj-grid" style={{ marginTop: "48px" }}>
          {featured.map((p) => <ProjectCard key={p.title} project={p} />)}
        </div>

        {/* WHY: Faint label + slightly narrower cards signal "secondary" without
            needing a visual divider or heading that adds clutter.               */}
        <div style={{ marginTop: "48px" }}>
          <span className="f-mono" style={{
            fontSize: "0.66rem", letterSpacing: "0.13em",
            color: "var(--text-faint)", textTransform: "uppercase",
            display: "block", marginBottom: "14px",
          }}>
            Other projects
          </span>
          <div className="proj-grid-sm">
            {other.map((p) => <ProjectCard key={p.title} project={p} />)}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Skills ────────────────────────────────────────────────────────────────────
function Skills() {
  return (
    <section id="skills" className="section-alt">
      <div className="section-inner">
        <SectionHeader tag="03. skills" title="Technical stack" />

        <div style={{ marginTop: "48px", display: "flex", flexDirection: "column", gap: "28px" }}>
          {Object.entries(SKILLS).map(([category, items]) => (
            <div key={category}>
              <span className="f-mono" style={{
                fontSize: "0.66rem", color: "var(--text-faint)",
                letterSpacing: "0.13em", textTransform: "uppercase",
                display: "block", marginBottom: "11px",
              }}>
                {category}
              </span>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "7px" }}>
                {items.map((skill) => <span key={skill} className="skill-pill">{skill}</span>)}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Certifications ────────────────────────────────────────────────────────────
function Certifications() {
  return (
    <section id="certifications" className="section">
      <div className="section-inner">
        <SectionHeader tag="04. certifications" title="Credentials" />

        <div style={{ marginTop: "48px", display: "flex", flexDirection: "column", gap: "12px" }}>
          {CERTIFICATIONS.map((cert) => (
            <div
              key={cert.title}
              className="card"
              style={{ padding: "24px 24px 24px 0", display: "flex", gap: "18px", alignItems: "stretch" }}
            >
              {/* WHY: Alternating cyan/indigo bars make the list feel curated,
                  not auto-generated. The pattern also shows both accents side-by-side,
                  which reinforces the dual-colour system.                        */}
              <div className={`cert-bar cert-bar-${cert.accent}`} />
              <div style={{ flexGrow: 1 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "10px", marginBottom: "4px" }}>
                  <h3 className="f-syne" style={{ fontSize: "1rem", fontWeight: 700, color: "var(--text-primary)" }}>
                    {cert.title}
                  </h3>
                  <span className="f-mono" style={{
                    fontSize: "0.7rem", whiteSpace: "nowrap",
                    color: cert.accent === "indigo" ? "var(--indigo)" : "var(--cyan)",
                  }}>
                    {cert.year}
                  </span>
                </div>
                <span className="f-mono" style={{ fontSize: "0.71rem", color: "var(--text-faint)", display: "block", marginBottom: "10px" }}>
                  {cert.issuer}
                </span>
                <p style={{ fontSize: "0.86rem", color: "var(--text-muted)", lineHeight: 1.68 }}>
                  {cert.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Contact ───────────────────────────────────────────────────────────────────
function Contact() {
  const [sent, setSent] = useState(false);

  return (
    <section id="contact" className="section-alt">
      <div style={{ maxWidth: "560px", margin: "0 auto" }}>
        <SectionHeader tag="05. contact" title="Say hello" centered />

        {/* WHY: "Compare notes on Python and databases" is a friendly, specific
            invite — makes a recruiter or developer feel welcome, not just processed. */}
        <p style={{
          textAlign: "center", color: "var(--text-muted)",
          fontSize: "0.92rem", lineHeight: 1.78,
          marginTop: "18px", marginBottom: "40px",
        }}>
          I'm looking for backend roles where I can write reliable systems and grow with the team. Reach out if you have something interesting, want to talk backend architecture, or just connect.
        </p>

        {sent ? (
          <div style={{
            textAlign: "center", padding: "48px",
            background: "var(--cyan-glow)", border: "1px solid var(--cyan-border)",
            borderRadius: "var(--radius-lg)",
          }}>
            <p className="f-syne" style={{ fontSize: "1.3rem", fontWeight: 700, color: "var(--cyan)" }}>
              Got it — thanks.
            </p>
            <p style={{ color: "var(--text-muted)", marginTop: "8px", fontSize: "0.9rem" }}>
              I'll get back to you within a day or two.
            </p>
          </div>
        ) : (
          <form
            onSubmit={(e) => { e.preventDefault(); setSent(true); }}
            style={{ display: "flex", flexDirection: "column", gap: "14px" }}
          >
            <div className="form-row" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px" }}>
              <div>
                <label className="form-label">Name</label>
                <input className="form-input" type="text" placeholder="Your name" required />
              </div>
              <div>
                <label className="form-label">Email</label>
                <input className="form-input" type="email" placeholder="your@email.com" required />
              </div>
            </div>
            <div>
              <label className="form-label">Subject</label>
              <input className="form-input" type="text" placeholder="What's this about?" required />
            </div>
            <div>
              <label className="form-label">Message</label>
              <textarea className="form-input" rows={5} placeholder="What's on your mind?" required style={{ resize: "vertical" }} />
            </div>
            <button type="submit" className="btn btn-primary" style={{ alignSelf: "flex-start" }}>
              Send message
            </button>
          </form>
        )}

        <div style={{ display: "flex", justifyContent: "center", gap: "32px", marginTop: "52px" }}>
          {[
            { label: "GitHub",   href: "#" },
            { label: "LinkedIn", href: "#" },
            { label: "Email",    href: "mailto:your@email.com" },
          ].map(({ label, href }) => (
            <a key={label} href={href} className="nav-link f-mono" style={{ fontSize: "0.74rem" }}>
              {label}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Footer ────────────────────────────────────────────────────────────────────
function Footer() {
  return (
    <footer style={{ padding: "30px 24px", borderTop: "1px solid var(--border-subtle)" }}>
      <div className="footer-line" />
      <div style={{
        maxWidth: "var(--section-max)", margin: "0 auto",
        display: "flex", justifyContent: "space-between", alignItems: "center",
        flexWrap: "wrap", gap: "8px",
      }}>
        <span className="f-mono" style={{ fontSize: "0.71rem", color: "var(--text-faint)" }}>
          Designed &amp; built by me · 2025
        </span>
        <span className="f-mono" style={{ fontSize: "0.71rem", color: "var(--text-faint)" }}>
          React · CSS custom properties
        </span>
      </div>
    </footer>
  );
}

// ─── App ───────────────────────────────────────────────────────────────────────
export default function App() {
  return (
    <>
      <GlobalStyles />
      <Navbar />
      <main>
        <Hero />
        <About />
        <Projects />
        <Skills />
        <Certifications />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
