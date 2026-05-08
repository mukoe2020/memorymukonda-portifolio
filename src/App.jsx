import { useState, useEffect } from "react";
import ProjectsPage from "./components/Projects";


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
    ::-webkit-scrollbar { width: 10px; }
    ::-webkit-scrollbar-track { background: var(--bg-base); }
    ::-webkit-scrollbar-thumb {
      background: linear-gradient(180deg, rgba(0, 212, 255, 0.5) 0%, rgba(99, 102, 241, 0.4) 100%);
      border-radius: 6px;
      border: 2px solid var(--bg-base);
      transition: background 0.3s ease;
    }
    ::-webkit-scrollbar-thumb:hover {
      background: linear-gradient(180deg, rgba(0, 212, 255, 0.8) 0%, rgba(99, 102, 241, 0.7) 100%);
    }

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
      background: #00d4ff;
      color: #080c14;
      font-weight: 600;
      box-shadow: 0 3px 12px rgba(0, 212, 255, 0.18);
      border-radius: 6px;
      padding: 10px 20px;
      border: none;
      cursor: pointer;
      transition: all 0.2s ease;
    }
    .btn-primary:hover {
      background: #22e0ff;
      transform: translateY(-2px);
      box-shadow: 0 6px 16px rgba(0, 212, 255, 0.28);
    }
    .btn-ghost {
      background: transparent; color: var(--text-secondary);
      border: 1px solid var(--border-mid); font-weight: 400;
    }
    .btn-ghost:hover { border-color: var(--indigo-border); color: var(--indigo); transform: translateY(-1px); }
    
    /* ── Hero Button Ghost ────────────────────────────────────────────── */
    .hero-btn-ghost {
      background: transparent;
      color: #94a3b8;
      border: 1px solid rgba(255,255,255,0.12);
      border-radius: 6px;
      padding: 10px 20px;
      font-family: 'JetBrains Mono', monospace;
      font-size: 0.9rem;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.2s ease;
    }
    .hero-btn-ghost:hover {
      border-color: rgba(255,255,255,0.2);
      color: #cbd5e1;
    }

    /* ── Hero Terminal ────────────────────────────────────────────────── */
    .hero-cursor {
      color: #00d4ff;
      animation: blink 1s step-start infinite;
    }
    @keyframes blink {
      0%, 49% { opacity: 1; }
      50%, 100% { opacity: 0; }
    }
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

    /* ── Skill Chips ────────────────────────────────────────────────────── */
    .skill-chip-new {
      transition: all 0.2s ease;
    }
    .skill-chip-new:hover {
      transform: translateY(-2px);
      /* Glow fill on hover */
      background: var(--hover-bg) !important;
      border-color: var(--hover-border) !important;
      box-shadow: 0 0 16px var(--hover-glow) !important;
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
    github: "https://github.com/Faithful-Match/Backend-FaithfulMatch",
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
    contributions: [
      "Interactive truck and trailer parts gallery",
      "WhatsApp-integrated customer inquiry system",
      "Responsive React-based multi-page interface",
      "Mobile-optimized customer engagement workflows",
    ],
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
    contributions: [
      "Real-time weather data powered by OpenWeather API",
      "Dynamic city-based weather search functionality",
      "Responsive React interface with live weather metrics",
      "Temperature, humidity, and wind condition tracking",
    ],
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
    contributions: [
      "Interactive phishing detection simulations",
      "User authentication and secure session management",
      "Real-time answer validation and feedback",
      "Responsive and user-friendly interface",
    ],
    tech: ["JavaScript", "Python", "FastAPI", "PostgreSQL", "React", "JWT", "Tailwind"],
    github: "https://github.com/mukoe2020/PhishingFostr",
    website: "https://phishingfotress.netlify.app/",
    featured: false,
    image: "/images/phishing.png",
  },
  {
    title: "Ubuntu Supply Solutions",
    description:
      "Developed a responsive healthcare supply platform featuring dynamic product showcases, WhatsApp-based quote requests, interactive hero sliders, and optimized mobile-first customer inquiry workflows.",
    contributions: [
      "WhatsApp inquiry integration for seamless customer communication",
      "Responsive UI development across all devices and screen sizes",
      "Interactive product quote flows with dynamic form handling",
      "Mobile optimization for efficient customer inquiries",
    ],
    tech: ["HTML", "CSS", "JavaScript", "WhatsApp API"],
    github: "https://github.com/mukoe2020/ubuntu-supply-solutions",
    website: "https://ubuntu-supply-solutions.vercel.app/",
    featured: false,
    image: "/images/ubuntu.png",
  },
];

const SKILLS = {
  "Core Languages":  ["Python", "JavaScript", "SQL", "C", "HTML & CSS"],
  "Frameworks & Libraries": ["React", "FastAPI", "Flask", "Node.js"],
  Databases:         ["PostgreSQL", "MySQL", "MongoDB"],
  "DevOps & Tools":  ["Bash", "Docker", "Git", "GitHub Actions", "Linux", "Nginx"],
  "Data & Analysis": ["Pandas", "NumPy", "Jupyter"],
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
      style={{
        minHeight: "100vh",
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        alignItems: "center",
        padding: "5rem 3.5rem",
        position: "relative",
        overflow: "hidden",
        background: "#080c14",
        gap: "3rem",
      }}
    >
      {/* Dot grid overlay */}
      <div aria-hidden="true" style={{
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundImage: `
          linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
          linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)
        `,
        backgroundSize: "52px 52px",
        pointerEvents: "none",
      }} />

      {/* Radial glow orbs */}
      <div aria-hidden="true" style={{
        position: "absolute",
        top: "-120px",
        left: "-120px",
        width: "500px",
        height: "500px",
        background: "radial-gradient(circle, rgba(0,212,255,0.07) 0%, transparent 68%)",
        borderRadius: "50%",
        pointerEvents: "none",
      }} />
      <div aria-hidden="true" style={{
        position: "absolute",
        bottom: "-100px",
        left: "30%",
        width: "400px",
        height: "400px",
        background: "radial-gradient(circle, rgba(99,102,241,0.09) 0%, transparent 68%)",
        borderRadius: "50%",
        pointerEvents: "none",
      }} />
      <div aria-hidden="true" style={{
        position: "absolute",
        top: "50%",
        transform: "translateY(-50%)",
        right: "-150px",
        width: "500px",
        height: "500px",
        background: "radial-gradient(circle, rgba(0,212,255,0.06) 0%, transparent 68%)",
        borderRadius: "50%",
        pointerEvents: "none",
      }} />

      {/* Left Column */}
      <div style={{ position: "relative", zIndex: 2 }}>
        {/* Status Pill */}
        <div className="hero-status-pill anim d1" style={{
          display: "inline-flex",
          alignItems: "center",
          gap: "8px",
          padding: "7px 14px",
          background: "rgba(0,212,255,0.06)",
          border: "1px solid rgba(0,212,255,0.2)",
          borderRadius: "999px",
          marginBottom: "2rem",
        }}>
          <div className="hero-status-dot" style={{
            width: "6px",
            height: "6px",
            background: "#00d4ff",
            borderRadius: "50%",
            animation: "pulse 2.2s ease-in-out infinite",
          }} />
          <span className="f-mono" style={{
            fontSize: "0.71rem",
            color: "#67e8f9",
            letterSpacing: "0.05em",
            whiteSpace: "nowrap",
          }}>
            Open to internship &amp; junior roles
          </span>
        </div>

        {/* Headline */}
        <h1 className="f-syne anim d2" style={{
          fontSize: "clamp(42px, 6vw, 58px)",
          fontWeight: 800,
          lineHeight: 1.0,
          letterSpacing: "-0.04em",
          color: "#f1f5f9",
          marginBottom: "1.5rem",
        }}>
          I build backends that <span style={{ color: "#00d4ff" }}>stay</span> <span style={{ color: "#818cf8" }}>reliable</span>
        </h1>

        {/* Description */}
        <p className="anim d3" style={{
          fontSize: "15px",
          lineHeight: 1.8,
          color: "#94a3b8",
          maxWidth: "420px",
          marginBottom: "2.25rem",
        }}>
          Completed ALX's backend engineering program. I write APIs that scale predictably, design databases that don't surprise you, and keep systems maintainable.
        </p>

        {/* Buttons */}
        <div className="anim d4" style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
          <button className="btn btn-primary" onClick={() => document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })}>
            See my work
          </button>
          <button className="hero-btn-ghost" onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}>
            Get in touch
          </button>
        </div>
      </div>

      {/* Right Column - Terminal */}
      <div style={{ position: "relative", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div className="hero-terminal anim d3" style={{
          background: "#0a0e18",
          border: "1px solid rgba(255,255,255,0.08)",
          borderRadius: "12px",
          boxShadow: "0 0 60px rgba(0,212,255,0.09), 0 0 100px rgba(99,102,241,0.07)",
          width: "100%",
          maxWidth: "460px",
          overflow: "hidden",
          position: "relative",
          zIndex: 1,
        }}>
          {/* Terminal Top Bar */}
          <div style={{
            background: "#0f1724",
            borderBottom: "1px solid rgba(255,255,255,0.06)",
            padding: "12px 16px",
            display: "flex",
            alignItems: "center",
            gap: "8px",
            justifyContent: "center",
          }}>
            <div style={{ width: "11px", height: "11px", background: "#ff5f57", borderRadius: "50%" }} />
            <div style={{ width: "11px", height: "11px", background: "#ffbd2e", borderRadius: "50%" }} />
            <div style={{ width: "11px", height: "11px", background: "#28ca41", borderRadius: "50%" }} />
            <span className="f-mono" style={{
              fontSize: "11px",
              color: "#475569",
              marginLeft: "12px",
              flex: 1,
              textAlign: "center",
              position: "absolute",
              left: "50%",
              transform: "translateX(-50%)",
            }}>
              matching.service.ts
            </span>
          </div>

          {/* Terminal Body */}
          <div className="hero-terminal-body" style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: "12.5px",
            lineHeight: 2,
            padding: "22px 24px 26px",
            color: "#f1f5f9",
            overflow: "auto",
            maxHeight: "350px",
          }}>
            <div><span style={{ color: "#3d4f6b" }}>// geo-location matching engine</span></div>
            <div><span style={{ color: "#818cf8" }}>async</span> <span style={{ color: "#00d4ff" }}>findMatches</span>(<span style={{ color: "#c084fc" }}>userId</span>: <span style={{ color: "#c084fc" }}>string</span>) {'{'}</div>
            <div>&nbsp;&nbsp;<span style={{ color: "#818cf8" }}>const</span> <span style={{ color: "#f1f5f9" }}>user</span> = <span style={{ color: "#818cf8" }}>await</span> <span style={{ color: "#818cf8" }}>this</span>.<span style={{ color: "#00d4ff" }}>findById</span>(<span style={{ color: "#f1f5f9" }}>userId</span>);</div>
            <div>&nbsp;&nbsp;<span style={{ color: "#818cf8" }}>return</span> <span style={{ color: "#818cf8" }}>this</span>.Profile.<span style={{ color: "#00d4ff" }}>aggregate</span>([</div>
            <div>&nbsp;&nbsp;&nbsp;&nbsp;{'{'}  <span style={{ color: "#34d399" }}>$geoNear</span>: {'{'}</div>
            <div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;near: user.location,</div>
            <div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;maxDistance: <span style={{ color: "#fb923c" }}>50000</span>,</div>
            <div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;spherical: <span style={{ color: "#818cf8" }}>true</span></div>
            <div>&nbsp;&nbsp;&nbsp;&nbsp;{'}'} {'}'},</div>
            <div>&nbsp;&nbsp;&nbsp;&nbsp;{'{'}  <span style={{ color: "#34d399" }}>$match</span>: <span style={{ color: "#00d4ff" }}>buildFilters</span>(user.prefs) {'}'},</div>
            <div>&nbsp;&nbsp;&nbsp;&nbsp;{'{'}  <span style={{ color: "#34d399" }}>$limit</span>: <span style={{ color: "#fb923c" }}>20</span> {'}'}</div>
            <div>&nbsp;&nbsp;]);</div>
            <div>{'}'}<span className="hero-cursor">|</span></div>
          </div>

          {/* Stats Bar */}
          <div style={{
            borderTop: "1px solid rgba(255,255,255,0.06)",
            display: "flex",
          }}>
            {[
              { number: "6", unit: "+", label: "Projects" },
              { number: "2", unit: "+", label: "Years coding" },
              { number: "ALX", unit: "", label: "Certified" },
            ].map((stat, idx) => (
              <div
                key={idx}
                style={{
                  flex: 1,
                  padding: "14px 20px",
                  textAlign: "center",
                  borderRight: idx < 2 ? "1px solid rgba(255,255,255,0.06)" : "none",
                }}
              >
                <div style={{
                  fontSize: "20px",
                  fontWeight: 700,
                  color: "#f1f5f9",
                }}>
                  {stat.number}<span style={{ color: "#00d4ff" }}>{stat.unit}</span>
                </div>
                <div className="f-mono" style={{
                  fontSize: "10px",
                  color: "#475569",
                  textTransform: "uppercase",
                  letterSpacing: "0.08em",
                  marginTop: "4px",
                }}>
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Floating Badges */}
        <div className="hero-badge hero-badge-top-left" style={{
          position: "absolute",
          top: "16px",
          left: "16px",
          background: "#0f1724",
          border: "1px solid rgba(255,255,255,0.08)",
          borderRadius: "8px",
          padding: "6px 10px",
          display: "flex",
          alignItems: "center",
          gap: "6px",
          zIndex: 2,
        }}>
          <div style={{
            width: "5px",
            height: "5px",
            background: "#6366f1",
            borderRadius: "50%",
          }} />
          <span className="f-mono" style={{
            fontSize: "11px",
            color: "#94a3b8",
          }}>
            NestJS · REST API
          </span>
        </div>

        <div className="hero-badge hero-badge-bottom-right" style={{
          position: "absolute",
          bottom: "16px",
          right: "16px",
          background: "#0f1724",
          border: "1px solid rgba(255,255,255,0.08)",
          borderRadius: "8px",
          padding: "6px 10px",
          display: "flex",
          alignItems: "center",
          gap: "6px",
          zIndex: 2,
        }}>
          <div style={{
            width: "5px",
            height: "5px",
            background: "#00d4ff",
            borderRadius: "50%",
          }} />
          <span className="f-mono" style={{
            fontSize: "11px",
            color: "#94a3b8",
          }}>
            MongoDB · Geospatial
          </span>
        </div>
      </div>

      {/* Scroll indicator */}
      <div aria-hidden="true" style={{
        position: "absolute",
        bottom: "36px",
        left: "50%",
        transform: "translateX(-50%)",
        zIndex: 3,
      }}>
        <div style={{
          width: "1px",
          height: "44px",
          background: "linear-gradient(to bottom, transparent, var(--cyan))",
          opacity: 0.3,
        }} />
      </div>

      {/* Responsive adjustments */}
      <style>{`
        @media (max-width: 900px) {
          #hero {
            grid-template-columns: 1fr;
            padding: 4rem 2.5rem;
            gap: 2rem;
          }
          .hero-terminal {
            margin-top: 40px;
          }
          .hero-badge {
            display: none !important;
          }
        }
        @media (max-width: 600px) {
          #hero {
            padding: 3rem 1.5rem;
          }
          .hero-terminal {
            display: none;
          }
        }
      `}</style>
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

// ─── Skills ────────────────────────────────────────────────────────────────────
function Skills() {
  const categoryStyles = {
    "Core Languages": { 
      accentColor: "#00d4ff", 
      chipBg: "rgba(0, 212, 255, 0.07)",
      chipBorder: "rgba(0, 212, 255, 0.25)",
      chipColor: "#67e8f9",
      hoverBg: "rgba(0, 212, 255, 0.15)",
      hoverBorder: "rgba(0, 212, 255, 0.4)",
      hoverGlow: "rgba(0, 212, 255, 0.3)",
    },
    "Frameworks & Libraries": { 
      accentColor: "#6366f1", 
      chipBg: "rgba(99, 102, 241, 0.1)",
      chipBorder: "rgba(99, 102, 241, 0.3)",
      chipColor: "#a5b4fc",
      hoverBg: "rgba(99, 102, 241, 0.2)",
      hoverBorder: "rgba(99, 102, 241, 0.5)",
      hoverGlow: "rgba(99, 102, 241, 0.3)",
    },
    "Databases": { 
      accentColor: "#00d4ff", 
      chipBg: "rgba(0, 212, 255, 0.07)",
      chipBorder: "rgba(0, 212, 255, 0.25)",
      chipColor: "#67e8f9",
      hoverBg: "rgba(0, 212, 255, 0.15)",
      hoverBorder: "rgba(0, 212, 255, 0.4)",
      hoverGlow: "rgba(0, 212, 255, 0.3)",
    },
    "DevOps & Tools": { 
      accentColor: "#6366f1", 
      chipBg: "rgba(99, 102, 241, 0.1)",
      chipBorder: "rgba(99, 102, 241, 0.3)",
      chipColor: "#a5b4fc",
      hoverBg: "rgba(99, 102, 241, 0.2)",
      hoverBorder: "rgba(99, 102, 241, 0.5)",
      hoverGlow: "rgba(99, 102, 241, 0.3)",
    },
    "Data & Analysis": { 
      accentColor: "#00d4ff", 
      chipBg: "rgba(0, 212, 255, 0.07)",
      chipBorder: "rgba(0, 212, 255, 0.25)",
      chipColor: "#67e8f9",
      hoverBg: "rgba(0, 212, 255, 0.15)",
      hoverBorder: "rgba(0, 212, 255, 0.4)",
      hoverGlow: "rgba(0, 212, 255, 0.3)",
    },
  };

  return (
    <section id="skills" className="section-alt">
      <div className="section-inner">
        <SectionHeader tag="03. skills" title="Technical stack" />
        <p style={{
          textAlign: "center", 
          color: "var(--text-muted)",
          fontSize: "0.92rem", 
          lineHeight: 1.78,
          marginTop: "12px", 
          marginBottom: "48px",
        }}>
          Languages, frameworks, and tools I build with.
        </p>

        <div style={{ marginTop: "0px", display: "flex", flexDirection: "column", gap: "28px" }}>
          {Object.entries(SKILLS).map(([category, items]) => {
            const style = categoryStyles[category] || categoryStyles["Data & Analysis"];

            return (
              <div key={category}>
                {/* Category Label */}
                <h3 className="f-mono" style={{
                  fontSize: "0.7rem",
                  fontWeight: 700,
                  color: style.accentColor,
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  margin: "0 0 12px 0",
                }}>
                  {category}
                </h3>

                {/* Skills Pills */}
                <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                  {items.map((skill) => (
                    <span
                      key={skill}
                      className="skill-chip-new"
                      style={{
                        padding: "6px 14px",
                        background: style.chipBg,
                        border: `1px solid ${style.chipBorder}`,
                        borderRadius: "999px",
                        fontSize: "0.75rem",
                        color: style.chipColor,
                        fontFamily: "'JetBrains Mono', monospace",
                        whiteSpace: "nowrap",
                        transition: "all 0.2s ease",
                        "--hover-bg": style.hoverBg,
                        "--hover-border": style.hoverBorder,
                        "--hover-glow": style.hoverGlow,
                      }}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
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

        <div style={{ display: "flex", justifyContent: "center", gap: "20px", marginTop: "52px" }}>
          {[
            { label: "GitHub", url: "https://github.com/mukoe2020", svg: '<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/></svg>' },
            { label: "LinkedIn", url: "https://www.linkedin.com/in/memory-mukonda-39ba06248/", svg: '<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0z"/></svg>' },
            { label: "Email", url: "mailto:memoemukoe@gmail.com", svg: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>' },
          ].map(({ label, url, svg }) => {
            const [hovered, setHovered] = useState(false);
            return (
              <a
                key={label}
                href={url}
                target={label !== "Email" ? "_blank" : undefined}
                rel="noopener noreferrer"
                style={{
                  display: "inline-flex", alignItems: "center", justifyContent: "center",
                  width: "42px", height: "42px",
                  border: "1.5px solid var(--cyan)",
                  borderRadius: "8px",
                  background: hovered ? "rgba(0, 212, 255, 0.08)" : "transparent",
                  color: "var(--cyan)",
                  cursor: "pointer",
                  transition: "all 0.3s ease",
                  transform: hovered ? "translateY(-3px)" : "translateY(0)",
                  boxShadow: hovered ? "0 8px 16px rgba(0, 212, 255, 0.15)" : "none",
                }}
                onMouseEnter={() => setHovered(true)}
                onMouseLeave={() => setHovered(false)}
                title={label}
              >
                <div dangerouslySetInnerHTML={{ __html: svg }} />
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// ─── Footer ────────────────────────────────────────────────────────────────────
function Footer() {
  return (
    <footer style={{ padding: "40px 24px 30px", borderTop: "1px solid var(--border-subtle)" }}>
      <div style={{
        maxWidth: "var(--section-max)", margin: "0 auto",
      }}>
        {/* Main Content */}
        <div style={{
          display: "flex", justifyContent: "space-between", alignItems: "center",
          gap: "20px",
          marginBottom: "24px",
        }}>
          {/* Left Side - Name */}
          <p className="f-mono" style={{ fontSize: "0.71rem", color: "var(--text-faint)", letterSpacing: "0.05em", margin: 0 }}>
            Memory Mukonda
          </p>
          {/* Right Side - Title */}
          <p className="f-mono" style={{ fontSize: "0.71rem", color: "var(--text-faint)", letterSpacing: "0.05em", margin: 0 }}>
            BACKEND DEVELOPER · 2026
          </p>
        </div>

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
        <ProjectsPage projects={PROJECTS} />
        <Skills />
        <Certifications />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
