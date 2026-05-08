import React, { useState } from 'react';

const ProjectsPage = ({ projects }) => {
  const featured = projects.filter((p) => p.featured);
  const other = projects.filter((p) => !p.featured);

  // Feature highlights map for each project (with emojis for visual appeal)
  const featureHighlights = {
    "FaithfulMatch": ["📍 Geo-location Matching", "⚡ Real-time Matching", "🔌 REST APIs", "🛠️ Admin Dashboard"],
    "Celestial Palate": ["📱 Fully Responsive", "🔐 Authentication", "📅 Reservation System", "🌍 Multi-branch"],
    "TSL Commercial Parts": ["💬 WhatsApp Integration", "📱 Fully Responsive", "� Product Gallery"],
    "React Weather App": ["⚡ Real-time API", "📱 Fully Responsive", "✨ Clean UI"],
    "Phishing Fortress": ["🔐 Authentication", "📊 Score Tracking", "🛠️ Admin Dashboard", "📈 User Progress"],
    "Ubuntu Supply Solutions": ["💬 WhatsApp Integration", "📱 Fully Responsive", "📸 Product Gallery"],
  };

  const styles = `
    /* ── PROJECTS STYLES ── */
    .projects-container {
      background: #080c10;
      color: #e8edf2;
      font-family: 'DM Sans', sans-serif;
      overflow-x: hidden;
    }

    .projects-main {
      padding: 0 2.5rem 6rem;
      max-width: 1400px;
      margin: 0 auto;
    }

    /* ── SECTION HEADER ── */
    .projects-section-header {
      display: flex;
      align-items: flex-end;
      justify-content: space-between;
      padding: 3.5rem 0 3.5rem;
      gap: 2rem;
    }

    .projects-section-title {
      font-size: 0.65rem;
      letter-spacing: 0.18em;
      text-transform: uppercase;
      color: #94a3b8;
      margin-bottom: 0.8rem;
      font-family: 'JetBrains Mono', monospace;
      font-weight: 500;
    }

    .projects-section-heading {
      font-size: clamp(1.8rem, 4vw, 2.4rem);
      font-weight: 800;
      color: #f1f5f9;
      line-height: 1.15;
      letter-spacing: -0.03em;
      font-family: 'Syne', sans-serif;
    }

    .projects-section-heading em {
      font-style: normal;
      background: linear-gradient(135deg, #00d4ff 0%, #818cf8 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }

    .projects-section-sub {
      font-size: 0.85rem;
      color: #94a3b8;
      font-weight: 400;
      max-width: 300px;
      text-align: right;
      line-height: 1.7;
    }

    /* ── FEATURED GRID ── */
    .featured-grid {
      display: flex;
      flex-direction: column;
      gap: 3rem;
      margin-bottom: 4rem;
    }

    /* ── FEATURED CARD (Premium styling) ── */
    .featured-card {
      display: grid;
      grid-template-columns: 1fr 1.1fr;
      gap: 40px;
      align-items: stretch;
      background: linear-gradient(135deg, #0f1724 0%, #0a0e18 100%);
      border: 1px solid rgba(0, 212, 255, 0.15);
      border-radius: 14px;
      overflow: hidden;
      position: relative;
      transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
    }

    .featured-card::before {
      content: '';
      position: absolute;
      inset: 0;
      background: linear-gradient(135deg, rgba(0, 212, 255, 0.03) 0%, rgba(129, 140, 248, 0.02) 100%);
      pointer-events: none;
      z-index: 0;
    }

    .featured-card:hover {
      border-color: rgba(0, 212, 255, 0.35);
      transform: translateY(-6px);
      box-shadow: 0 20px 60px rgba(0, 212, 255, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.05);
    }

    .featured-card-content {
      padding: 48px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      gap: 24px;
      position: relative;
      z-index: 1;
    }

    .featured-badge-featured {
      font-family: 'JetBrains Mono', monospace;
      font-size: 0.6rem;
      letter-spacing: 0.15em;
      text-transform: uppercase;
      color: #00d4ff;
      background: rgba(0, 212, 255, 0.1);
      border: 1px solid rgba(0, 212, 255, 0.3);
      padding: 5px 12px;
      border-radius: 6px;
      width: fit-content;
      font-weight: 600;
    }

    .featured-title {
      font-size: clamp(1.4rem, 3vw, 2rem);
      font-weight: 800;
      font-family: 'Syne', sans-serif;
      letter-spacing: -0.03em;
      line-height: 1.2;
      color: #f1f5f9;
      margin: 12px 0 0 0;
    }

    .featured-desc {
      font-size: 0.95rem;
      line-height: 1.8;
      color: #cbd5e1;
      font-weight: 400;
      margin: 0;
    }

    /* ── Feature Highlights ── */
    .feature-highlights {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
      margin: 16px 0;
    }

    .feature-badge {
      font-size: 0.7rem;
      padding: 5px 12px;
      border-radius: 6px;
      background: rgba(0, 212, 255, 0.08);
      border: 1px solid rgba(0, 212, 255, 0.2);
      color: #00d4ff;
      font-family: 'JetBrains Mono', monospace;
      font-weight: 500;
      letter-spacing: 0.05em;
      white-space: nowrap;
      transition: all 0.3s ease;
      display: inline-flex;
      align-items: center;
      gap: 6px;
    }

    .feature-badge:hover {
      background: rgba(0, 212, 255, 0.15);
      border-color: rgba(0, 212, 255, 0.4);
      transform: translateY(-2px);
      box-shadow: 0 4px 12px rgba(0, 212, 255, 0.15);
    }

    /* ── Contributions ── */
    .contrib-section {
      margin-top: 24px;
    }

    .contrib-label {
      font-family: 'JetBrains Mono', monospace;
      font-size: 0.65rem;
      letter-spacing: 0.12em;
      text-transform: uppercase;
      color: #94a3b8;
      margin-bottom: 12px;
      font-weight: 600;
    }

    .contrib-list {
      list-style: none;
      display: flex;
      flex-direction: column;
      gap: 8px;
    }

    .contrib-list li {
      font-size: 0.85rem;
      color: #cbd5e1;
      padding-left: 20px;
      position: relative;
      line-height: 1.6;
      font-weight: 400;
    }

    .contrib-list li::before {
      content: '▸';
      position: absolute;
      left: 4px;
      color: #00d4ff;
      font-size: 0.8rem;
      font-weight: bold;
    }

    /* ── Tech Stack ── */
    .tech-stack {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
      margin-top: 20px;
    }

    .tech-tag {
      font-family: 'JetBrains Mono', monospace;
      font-size: 0.7rem;
      padding: 6px 13px;
      background: rgba(129, 140, 248, 0.1);
      border: 1px solid rgba(129, 140, 248, 0.25);
      color: #818cf8;
      border-radius: 6px;
      letter-spacing: 0.04em;
      font-weight: 500;
      transition: all 0.3s ease;
      white-space: nowrap;
    }

    .tech-tag:hover {
      background: rgba(129, 140, 248, 0.18);
      border-color: rgba(129, 140, 248, 0.4);
      transform: translateY(-2px);
    }

    /* ── Buttons ── */
    .featured-buttons {
      display: flex;
      gap: 12px;
      margin-top: 20px;
      flex-wrap: wrap;
    }

    .btn-featured {
      font-family: 'DM Sans', sans-serif;
      font-size: 0.8rem;
      font-weight: 600;
      padding: 10px 20px;
      border-radius: 8px;
      cursor: pointer;
      text-decoration: none;
      display: inline-flex;
      align-items: center;
      gap: 8px;
      transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
      border: 1px solid transparent;
      letter-spacing: 0.03em;
    }

    .btn-primary-featured {
      background: #00d4ff;
      color: #080c10;
      border-color: #00d4ff;
      box-shadow: 0 4px 14px rgba(0, 212, 255, 0.25);
    }

    .btn-primary-featured:hover {
      background: #2edeff;
      transform: translateY(-3px);
      box-shadow: 0 8px 24px rgba(0, 212, 255, 0.35);
    }

    .btn-secondary-featured {
      background: transparent;
      color: #cbd5e1;
      border-color: rgba(255, 255, 255, 0.15);
    }

    .btn-secondary-featured:hover {
      border-color: rgba(0, 212, 255, 0.4);
      color: #00d4ff;
      background: rgba(0, 212, 255, 0.05);
      transform: translateY(-3px);
    }

    /* ── FEATURED IMAGE SECTION ── */
    .featured-image-wrapper {
      position: relative;
      overflow: hidden;
      border-radius: 14px;
      background: linear-gradient(135deg, #0a0e18 0%, #0f1520 100%);
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 0;
      min-height: 500px;
      border: 1px solid rgba(0, 212, 255, 0.1);
      box-shadow: 0 20px 60px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.05);
    }

    .featured-image-wrapper::before {
      content: '';
      position: absolute;
      inset: 0;
      background: linear-gradient(135deg, rgba(0, 212, 255, 0.08) 0%, rgba(129, 140, 248, 0.04) 100%);
      pointer-events: none;
      z-index: 1;
    }

    .featured-image-wrapper::after {
      content: '';
      position: absolute;
      inset: 0;
      background: radial-gradient(circle at 50% 0%, rgba(0, 212, 255, 0.2) 0%, transparent 70%);
      pointer-events: none;
      z-index: 2;
      opacity: 0;
      transition: opacity 0.5s ease;
    }

    .featured-card:hover .featured-image-wrapper::after {
      opacity: 1;
    }

    .featured-image {
      width: 100%;
      height: 100%;
      object-fit: cover;
      object-position: left center;
      transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);
      display: block;
      position: relative;
      z-index: 0;
    }

    .featured-card:hover .featured-image {
      transform: scale(1.02);
    }

    /* ── OTHER PROJECTS ── */
    .other-section {
      margin-top: 2rem;
    }

    .other-header {
      display: flex;
      align-items: center;
      gap: 1.2rem;
      margin-bottom: 2.5rem;
      padding-top: 1rem;
    }

    .other-label {
      font-size: 0.65rem;
      letter-spacing: 0.18em;
      text-transform: uppercase;
      color: #94a3b8;
      font-family: 'JetBrains Mono', monospace;
      white-space: nowrap;
      font-weight: 600;
    }

    .other-line {
      height: 1px;
      flex: 1;
      background: linear-gradient(90deg, rgba(0, 212, 255, 0.2), transparent);
    }

    .other-grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 24px;
    }

    .other-card {
      background: linear-gradient(135deg, #0f1724 0%, #0a0e18 100%);
      border: 1px solid rgba(255, 255, 255, 0.08);
      border-radius: 12px;
      padding: 28px;
      display: flex;
      flex-direction: column;
      gap: 18px;
      transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
      position: relative;
      overflow: hidden;
    }

    .other-card::before {
      content: '';
      position: absolute;
      inset: 0;
      background: linear-gradient(135deg, rgba(0, 212, 255, 0.02) 0%, rgba(129, 140, 248, 0.01) 100%);
      pointer-events: none;
      z-index: 0;
    }

    .other-card::after {
      content: '';
      position: absolute;
      top: -50%;
      right: -50%;
      width: 100%;
      height: 100%;
      background: radial-gradient(circle, rgba(0, 212, 255, 0.1), transparent 70%);
      opacity: 0;
      transition: opacity 0.5s ease;
      pointer-events: none;
    }

    .other-card:hover {
      border-color: rgba(0, 212, 255, 0.25);
      transform: translateY(-8px);
      box-shadow: 0 16px 40px rgba(0, 212, 255, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.05);
    }

    .other-card:hover::after {
      opacity: 1;
    }

    /* ── Other card content ── */
    .other-card-top {
      position: relative;
      z-index: 1;
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      gap: 1rem;
    }

    .other-title {
      font-size: 1.1rem;
      font-weight: 700;
      font-family: 'Syne', sans-serif;
      letter-spacing: -0.02em;
      color: #f1f5f9;
      line-height: 1.3;
      flex: 1;
    }

    .other-links {
      display: flex;
      gap: 8px;
      flex-shrink: 0;
    }

    .icon-link {
      width: 34px;
      height: 34px;
      display: flex;
      align-items: center;
      justify-content: center;
      border: 1px solid rgba(255, 255, 255, 0.1);
      border-radius: 8px;
      color: #94a3b8;
      text-decoration: none;
      font-size: 0.75rem;
      transition: all 0.3s ease;
      background: rgba(255, 255, 255, 0.02);
    }

    .icon-link:hover {
      border-color: #00d4ff;
      color: #00d4ff;
      background: rgba(0, 212, 255, 0.08);
      transform: translateY(-3px);
    }

    .other-desc {
      font-size: 0.85rem;
      line-height: 1.75;
      color: #cbd5e1;
      font-weight: 400;
      flex: 1;
      position: relative;
      z-index: 1;
    }

    .other-contrib-section {
      position: relative;
      z-index: 1;
      margin-top: 0;
    }

    .other-contrib-label {
      font-family: 'JetBrains Mono', monospace;
      font-size: 0.6rem;
      letter-spacing: 0.12em;
      text-transform: uppercase;
      color: #94a3b8;
      margin-bottom: 8px;
      font-weight: 600;
    }

    .other-contrib-list {
      list-style: none;
      display: flex;
      flex-direction: column;
      gap: 6px;
      padding: 0;
      margin: 0;
    }

    .other-contrib-list li {
      font-size: 0.77rem;
      color: #cbd5e1;
      padding-left: 18px;
      position: relative;
      line-height: 1.5;
      font-weight: 400;
    }

    .other-contrib-list li::before {
      content: '▸';
      position: absolute;
      left: 4px;
      color: #818cf8;
      font-size: 0.7rem;
      font-weight: bold;
    }

    .other-features {
      display: flex;
      flex-wrap: wrap;
      gap: 6px;
      position: relative;
      z-index: 1;
      margin-top: 12px;
      margin-bottom: 12px;
    }

    .feature-badge-sm {
      font-size: 0.65rem;
      padding: 4px 10px;
      border-radius: 5px;
      background: rgba(129, 140, 248, 0.08);
      border: 1px solid rgba(129, 140, 248, 0.2);
      color: #818cf8;
      font-family: 'JetBrains Mono', monospace;
      font-weight: 500;
      letter-spacing: 0.03em;
      white-space: nowrap;
      transition: all 0.2s ease;
      display: inline-flex;
      align-items: center;
      gap: 5px;
    }

    .feature-badge-sm:hover {
      background: rgba(129, 140, 248, 0.15);
      border-color: rgba(129, 140, 248, 0.35);
      transform: translateY(-2px);
      box-shadow: 0 2px 8px rgba(129, 140, 248, 0.12);
    }

    .other-tech {
      display: flex;
      flex-wrap: wrap;
      gap: 6px;
      position: relative;
      z-index: 1;
    }

    .tech-tag-sm {
      font-family: 'JetBrains Mono', monospace;
      font-size: 0.65rem;
      padding: 4px 10px;
      background: rgba(0, 212, 255, 0.08);
      border: 1px solid rgba(0, 212, 255, 0.2);
      color: #00d4ff;
      border-radius: 5px;
      letter-spacing: 0.03em;
      font-weight: 500;
      white-space: nowrap;
      transition: all 0.2s ease;
    }

    .tech-tag-sm:hover {
      background: rgba(0, 212, 255, 0.15);
      border-color: rgba(0, 212, 255, 0.35);
    }

    .thumb {
      height: 120px;
      background: linear-gradient(135deg, #080c14 0%, #0f1520 100%);
      border-radius: 8px;
      border: 1px solid rgba(0, 212, 255, 0.1);
      display: flex;
      align-items: flex-end;
      overflow: hidden;
      position: relative;
      transition: all 0.3s ease;
    }

    .other-card:hover .thumb {
      border-color: rgba(0, 212, 255, 0.2);
      transform: scale(1.02);
    }

    .thumb-img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      object-position: center;
      transition: transform 0.4s ease;
    }

    .other-card:hover .thumb-img {
      transform: scale(1.08);
    }

    /* ── RESPONSIVE ── */
    @media (max-width: 1200px) {
      .projects-main {
        padding: 0 1.8rem 5rem;
      }

      .featured-card {
        grid-template-columns: 1fr;
        gap: 32px;
      }

      .featured-card-content {
        padding: 40px;
      }

      .featured-image-wrapper {
        min-height: 420px;
      }

      .other-grid {
        grid-template-columns: 1fr;
      }

      .projects-section-sub {
        text-align: left;
        max-width: 100%;
      }

      .projects-section-header {
        flex-direction: column;
        align-items: flex-start;
      }
    }

    @media (max-width: 900px) {
      .projects-main {
        padding: 0 1.5rem 4.5rem;
      }

      .featured-card {
        grid-template-columns: 1fr;
        gap: 24px;
      }

      .featured-card-content {
        padding: 32px;
      }

      .featured-image-wrapper {
        min-height: 380px;
      }

      .featured-title {
        font-size: 1.5rem;
      }

      .projects-section-heading {
        font-size: 1.8rem;
      }

      .other-grid {
        grid-template-columns: 1fr;
      }
    }

    @media (max-width: 640px) {
      .projects-main {
        padding: 0 1rem 3.5rem;
      }

      .projects-section-header {
        padding: 2rem 0 2rem;
      }

      .projects-section-heading {
        font-size: 1.4rem;
      }

      .projects-section-sub {
        font-size: 0.8rem;
      }

      .featured-card-content {
        padding: 20px;
      }

      .featured-image-wrapper {
        min-height: 280px;
      }

      .featured-title {
        font-size: 1.2rem;
      }

      .featured-desc {
        font-size: 0.85rem;
      }

      .contrib-list li {
        font-size: 0.8rem;
      }

      .other-grid {
        grid-template-columns: 1fr;
        gap: 16px;
      }

      .other-card {
        padding: 20px;
        gap: 14px;
      }

      .other-title {
        font-size: 1rem;
      }

      .other-desc {
        font-size: 0.8rem;
      }

      .thumb {
        height: 100px;
      }

      .feature-highlights {
        gap: 6px;
      }

      .feature-badge {
        font-size: 0.65rem;
        padding: 4px 10px;
        gap: 5px;
      }

      .tech-tag {
        font-size: 0.65rem;
        padding: 5px 11px;
      }

      .tech-tag-sm {
        font-size: 0.6rem;
        padding: 3px 9px;
      }

      .feature-badge-sm {
        font-size: 0.6rem;
        padding: 3px 9px;
      }

      .btn-featured {
        font-size: 0.75rem;
        padding: 8px 16px;
      }

      .featured-buttons {
        gap: 8px;
      }

      .other-links {
        gap: 6px;
      }

      .icon-link {
        width: 30px;
        height: 30px;
        font-size: 0.7rem;
      }
    }

    @media (max-width: 480px) {
      .projects-main {
        padding: 0 0.8rem 2.5rem;
      }

      .featured-card-content {
        padding: 16px;
      }

      .featured-image-wrapper {
        min-height: 240px;
      }

      .featured-title {
        font-size: 1.1rem;
      }

      .other-card {
        padding: 16px;
        gap: 12px;
      }

      .projects-section-heading {
        font-size: 1.2rem;
      }

      .contrib-list li {
        font-size: 0.75rem;
        padding-left: 18px;
      }

      .tech-tag {
        font-size: 0.6rem;
      }
    }
  `;

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: styles }} />
      <div id="projects" className="projects-container">
        <main className="projects-main">
          {/* HEADER */}
          <div className="projects-section-header">
            <div>
              <p className="projects-section-title">Selected work</p>
              <h1 className="projects-section-heading">Projects &amp; <em>Contributions</em></h1>
            </div>
            <p className="projects-section-sub">Full-stack systems, real-world deployments, and collaborative builds.</p>
          </div>

          {/* FEATURED PROJECTS */}
          <div className="featured-grid">
            {featured.map((project) => (
              <div key={project.title} className="featured-card">
                {/* Content Side */}
                <div className="featured-card-content">
                  <div>
                    <span className="featured-badge-featured">★ Featured</span>
                    <h2 className="featured-title">{project.title}</h2>
                    <p className="featured-desc">{project.description}</p>

                    {/* Feature Highlights */}
                    {featureHighlights[project.title] && (
                      <div className="feature-highlights">
                        {featureHighlights[project.title].map((feature) => (
                          <span key={feature} className="feature-badge">{feature}</span>
                        ))}
                      </div>
                    )}

                    {/* Contributions */}
                    {project.contributions && (
                      <div className="contrib-section">
                        <p className="contrib-label">{["Phishing Fortress", "Ubuntu Supply Solutions", "TSL Commercial Parts", "React Weather App"].includes(project.title) ? "Key Features" : "Key Contributions"}</p>
                        <ul className="contrib-list">
                          {project.contributions.map((contrib) => (
                            <li key={contrib}>{contrib}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>

                  <div>
                    {/* Tech Stack */}
                    <div className="tech-stack">
                      {project.tech.map((t) => (
                        <span key={t} className="tech-tag">{t}</span>
                      ))}
                    </div>

                    {/* Buttons */}
                    <div className="featured-buttons">
                      {project.website && (
                        <a
                          href={project.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn-featured btn-primary-featured"
                        >
                          ↗ Visit Site
                        </a>
                      )}
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-featured btn-secondary-featured"
                      >
                        ⌥ GitHub
                      </a>
                    </div>
                  </div>
                </div>

                {/* Image Side */}
                <div className="featured-image-wrapper">
                  {project.image ? (
                    <img
                      src={project.image}
                      alt={project.title}
                      className="featured-image"
                    />
                  ) : (
                    <div style={{ color: '#475569', fontSize: '0.9rem', textAlign: 'center' }}>
                      Screenshot unavailable
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* OTHER PROJECTS */}
          {other.length > 0 && (
            <div className="other-section">
              <div className="other-header">
                <span className="other-label">Other Projects</span>
                <div className="other-line"></div>
              </div>

              <div className="other-grid">
                {other.map((project) => (
                  <div key={project.title} className="other-card">
                    {/* Thumbnail */}
                    <div className="thumb">
                      {project.image ? (
                        <img
                          src={project.image}
                          alt={project.title}
                          className="thumb-img"
                        />
                      ) : (
                        <div
                          style={{
                            width: '100%',
                            height: '100%',
                            background: 'linear-gradient(135deg, rgba(0, 212, 255, 0.06) 0%, rgba(129, 140, 248, 0.03) 100%)',
                          }}
                        />
                      )}
                    </div>

                    {/* Title & Links */}
                    <div className="other-card-top">
                      <h3 className="other-title">{project.title}</h3>
                      <div className="other-links">
                        {project.website && (
                          <a
                            href={project.website}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="icon-link"
                            title="Visit Site"
                          >
                            ↗
                          </a>
                        )}
                        <a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="icon-link"
                          title="GitHub Repository"
                        >
                          ⌥
                        </a>
                      </div>
                    </div>

                    {/* Description */}
                    <p className="other-desc">{project.description}</p>

                    {/* Feature Highlights */}
                    {featureHighlights[project.title] && (
                      <div className="other-features">
                        {featureHighlights[project.title].map((feature) => (
                          <span key={feature} className="feature-badge-sm">{feature}</span>
                        ))}
                      </div>
                    )}

                    {/* Contributions */}
                    {project.contributions && (
                      <div className="other-contrib-section">
                        <p className="other-contrib-label">{["Phishing Fortress", "Ubuntu Supply Solutions", "TSL Commercial Parts", "React Weather App"].includes(project.title) ? "Key Features" : "Key Contributions"}</p>
                        <ul className="other-contrib-list">
                          {project.contributions.map((contrib) => (
                            <li key={contrib}>{contrib}</li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Tech Stack */}
                    <div className="other-tech">
                      {project.tech.map((t) => (
                        <span key={t} className="tech-tag-sm">{t}</span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </main>
      </div>
    </>
  );
};

export default ProjectsPage;
