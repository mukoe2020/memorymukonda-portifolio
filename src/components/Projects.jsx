import React from 'react';

const ProjectsPage = ({ projects }) => {
  const featured = projects.filter((p) => p.featured);
  const other = projects.filter((p) => !p.featured);

  const styles = `
    /* ── PROJECTS STYLES ── */
    .projects-container {
      background: #080c10;
      color: #e8edf2;
      font-family: 'Sora', sans-serif;
      overflow-x: hidden;
    }

    .projects-nav {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 1.25rem 2.5rem;
      border-bottom: 1px solid rgba(255,255,255,0.07);
      position: sticky;
      top: 0;
      background: rgba(8,12,16,0.85);
      backdrop-filter: blur(12px);
      z-index: 100;
    }

    .projects-main {
      padding: 0 2.5rem 6rem;
      max-width: 1200px;
      margin: 0 auto;
    }

    .projects-section-header {
      display: flex;
      align-items: flex-end;
      justify-content: space-between;
      padding: 3.5rem 0 2.5rem;
      border-bottom: 1px solid rgba(255,255,255,0.07);
      margin-bottom: 3rem;
    }

    .projects-section-title {
      font-size: 0.7rem;
      letter-spacing: 0.15em;
      text-transform: uppercase;
      color: #6b7a8d;
      margin-bottom: 0.5rem;
      font-family: 'JetBrains Mono', monospace;
    }

    .projects-section-heading {
      font-size: 2rem;
      font-weight: 300;
      color: #e8edf2;
      line-height: 1.1;
      letter-spacing: -0.03em;
    }

    .projects-section-heading em {
      font-style: normal;
      color: #63d2be;
    }

    .projects-section-sub {
      font-size: 0.8rem;
      color: #6b7a8d;
      font-weight: 300;
      max-width: 260px;
      text-align: right;
      line-height: 1.6;
    }

    /* ── FEATURED CARDS ── */
    .featured-grid {
      display: flex;
      flex-direction: column;
      gap: 2px;
      margin-bottom: 4rem;
    }

    .featured-card {
      display: grid;
      grid-template-columns: 1fr 1fr;
      background: #0e1318;
      border: 1px solid rgba(255,255,255,0.07);
      border-radius: 2px;
      overflow: hidden;
      position: relative;
      transition: border-color 0.3s, background 0.3s;
    }

    .featured-card:hover {
      border-color: rgba(99,210,190,0.4);
      background: linear-gradient(135deg, #0e1318 0%, rgba(99,210,190,0.02) 100%);
    }

    .featured-card::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 3px;
      height: 100%;
      background: #63d2be;
      opacity: 0;
      transition: opacity 0.3s;
      z-index: 1;
    }

    .featured-card:hover::before {
      opacity: 1;
    }

    .card-content {
      padding: 2.5rem;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      gap: 1.5rem;
    }

    .card-meta {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      margin-bottom: 0.75rem;
    }

    .badge-featured {
      font-family: 'JetBrains Mono', monospace;
      font-size: 0.65rem;
      letter-spacing: 0.12em;
      text-transform: uppercase;
      color: #63d2be;
      background: rgba(99,210,190,0.08);
      border: 1px solid rgba(99,210,190,0.2);
      padding: 0.25rem 0.65rem;
      border-radius: 2px;
    }

    .card-number {
      font-family: 'JetBrains Mono', monospace;
      font-size: 0.65rem;
      color: #6b7a8d;
      letter-spacing: 0.05em;
    }

    .card-title {
      font-size: 1.75rem;
      font-weight: 500;
      letter-spacing: -0.03em;
      line-height: 1;
      color: #e8edf2;
      margin-bottom: 0.75rem;
    }

    .card-desc {
      font-size: 0.875rem;
      line-height: 1.7;
      color: #6b7a8d;
      font-weight: 300;
    }

    .contributions {
      margin-top: 1.5rem;
    }

    .contrib-label {
      font-family: 'JetBrains Mono', monospace;
      font-size: 0.6rem;
      letter-spacing: 0.12em;
      text-transform: uppercase;
      color: #6b7a8d;
      margin-bottom: 0.75rem;
    }

    .contrib-list {
      list-style: none;
      display: flex;
      flex-direction: column;
      gap: 0.45rem;
    }

    .contrib-list li {
      font-size: 0.8rem;
      color: #6b7a8d;
      padding-left: 1.1rem;
      position: relative;
      line-height: 1.5;
    }

    .contrib-list li::before {
      content: '→';
      position: absolute;
      left: 0;
      color: #63d2be;
      font-size: 0.7rem;
      top: 0.05em;
    }

    .tags {
      display: flex;
      flex-wrap: wrap;
      gap: 0.4rem;
      margin-top: 1.5rem;
    }

    .tag {
      font-family: 'JetBrains Mono', monospace;
      font-size: 0.65rem;
      padding: 0.3rem 0.65rem;
      background: rgba(99,210,190,0.08);
      border: 1px solid rgba(99,210,190,0.2);
      color: #63d2be;
      border-radius: 2px;
      letter-spacing: 0.04em;
    }

    .tag-blue {
      background: rgba(79,184,255,0.08);
      border-color: rgba(79,184,255,0.2);
      color: #4fb8ff;
    }

    .card-actions {
      display: flex;
      gap: 0.75rem;
      margin-top: 1.75rem;
    }

    .btn {
      font-family: 'Sora', sans-serif;
      font-size: 0.75rem;
      font-weight: 500;
      padding: 0.55rem 1.1rem;
      border-radius: 2px;
      cursor: pointer;
      text-decoration: none;
      display: inline-flex;
      align-items: center;
      gap: 0.4rem;
      transition: all 0.2s;
      letter-spacing: 0.02em;
      border: 1px solid transparent;
    }

    .btn-primary {
      background: #63d2be;
      color: #080c10;
      border-color: #63d2be;
    }

    .btn-primary:hover {
      background: transparent;
      color: #63d2be;
      border-color: #63d2be;
    }

    .btn-ghost {
      background: transparent;
      color: #6b7a8d;
      border-color: rgba(255,255,255,0.07);
    }

    .btn-ghost:hover {
      border-color: rgba(99,210,190,0.4);
      color: #e8edf2;
    }

    .card-preview {
      background: #141b22;
      border-left: 1px solid rgba(255,255,255,0.07);
      display: flex;
      align-items: center;
      justify-content: center;
      overflow: hidden;
      position: relative;
      min-height: 550px;
      padding: 16px;
    }

    .preview-frame {
      width: 100%;
      height: 100%;
      background: #0a0f14;
      border: 1px solid rgba(255,255,255,0.08);
      border-radius: 6px;
      overflow: hidden;
      display: flex;
      flex-direction: column;
      box-shadow: 0 20px 60px rgba(0,0,0,0.5);
    }

    .preview-browser-bar {
      height: 32px;
      background: #1a1f28;
      border-bottom: 1px solid rgba(255,255,255,0.06);
      display: flex;
      align-items: center;
      padding: 0 12px;
      gap: 8px;
    }

    .preview-dot {
      width: 12px;
      height: 12px;
      border-radius: 50%;
    }

    .dot-red { background: #ff5f57; }
    .dot-yellow { background: #ffbd2e; }
    .dot-green { background: #28ca41; }

    .preview-image-wrapper {
      flex: 1;
      display: flex;
      align-items: center;
      justify-content: center;
      background: #0a0f14;
      padding: 8px;
      min-height: 0;
    }

    .preview-image {
      max-width: 100%;
      max-height: 100%;
      width: 100%;
      height: 100%;
      object-fit: contain;
      object-position: center;
    }

    .other-section { margin-top: 0.5rem; }

    .other-header {
      display: flex;
      align-items: center;
      gap: 1rem;
      margin-bottom: 2rem;
    }

    .other-label {
      font-size: 0.65rem;
      letter-spacing: 0.18em;
      text-transform: uppercase;
      color: #6b7a8d;
      font-family: 'JetBrains Mono', monospace;
      white-space: nowrap;
    }

    .other-line {
      height: 1px;
      flex: 1;
      background: rgba(255,255,255,0.07);
    }

    .other-grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 2px;
    }

    .other-card {
      background: #0e1318;
      border: 1px solid rgba(255,255,255,0.07);
      border-radius: 2px;
      padding: 1.75rem;
      display: flex;
      flex-direction: column;
      gap: 0.85rem;
      transition: border-color 0.25s, transform 0.25s;
      position: relative;
      overflow: hidden;
    }

    .other-card::after {
      content: '';
      position: absolute;
      top: 0;
      right: 0;
      width: 80px;
      height: 80px;
      background: radial-gradient(circle at top right, rgba(99,210,190,0.06), transparent 70%);
      opacity: 0;
      transition: opacity 0.3s;
      pointer-events: none;
    }

    .other-card:hover {
      border-color: rgba(99,210,190,0.25);
      transform: translateY(-2px);
    }

    .other-card:hover::after { opacity: 1; }

    .other-card-top {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      gap: 1rem;
    }

    .other-title {
      font-size: 1rem;
      font-weight: 500;
      letter-spacing: -0.02em;
      color: #e8edf2;
      line-height: 1.25;
    }

    .other-links {
      display: flex;
      gap: 0.4rem;
      flex-shrink: 0;
    }

    .icon-link {
      width: 28px;
      height: 28px;
      display: flex;
      align-items: center;
      justify-content: center;
      border: 1px solid rgba(255,255,255,0.07);
      border-radius: 2px;
      color: #6b7a8d;
      text-decoration: none;
      font-size: 0.8rem;
      transition: all 0.2s;
    }

    .icon-link:hover {
      border-color: #63d2be;
      color: #63d2be;
    }

    .other-desc {
      font-size: 0.8rem;
      line-height: 1.65;
      color: #6b7a8d;
      font-weight: 300;
      flex: 1;
    }

    .thumb {
      height: 100px;
      background: #141b22;
      border-radius: 2px;
      border: 1px solid rgba(255,255,255,0.05);
      display: flex;
      align-items: flex-end;
      overflow: hidden;
      position: relative;
    }

    .thumb-img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      object-position: center;
    }

    @media (max-width: 900px) {
      .projects-main { padding: 0 1.5rem 4rem; }
      .featured-card { grid-template-columns: 1fr; }
      .card-preview { min-height: 300px; border-left: none; border-top: 1px solid rgba(255,255,255,0.07); }
      .other-grid { grid-template-columns: 1fr; }
      .projects-section-header { flex-direction: column; align-items: flex-start; gap: 1rem; }
      .projects-section-sub { text-align: left; max-width: 100%; }
    }

    @media (max-width: 600px) {
      .projects-section-heading { font-size: 1.5rem; }
      .card-title { font-size: 1.35rem; }
    }
  `;

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: styles }} />
      <div id="projects" className="projects-container">
        <main className="projects-main">
          <div className="projects-section-header">
            <div>
              <p className="projects-section-title">Selected work</p>
              <h1 className="projects-section-heading">Projects &amp; <em>Contributions</em></h1>
            </div>
            <p className="projects-section-sub">Full-stack systems, real-world deployments, and collaborative builds.</p>
          </div>

          <div className="featured-grid">
            {featured.map((project, idx) => (
              <div key={project.title} className="featured-card">
                <div className="card-content">
                  <div>
                    <div className="card-meta">
                      <span className="badge-featured">Featured</span>
                      <span className="card-number">{String(idx + 1).padStart(2, '0')}</span>
                    </div>
                    <h2 className="card-title">{project.title}</h2>
                    <p className="card-desc">{project.description}</p>
                    {project.contributions && (
                      <div className="contributions">
                        <p className="contrib-label">Key contributions</p>
                        <ul className="contrib-list">
                          {project.contributions.map((contrib) => (
                            <li key={contrib}>{contrib}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                  <div>
                    <div className="tags">
                      {project.tech.map((t) => (
                        <span key={t} className="tag">{t}</span>
                      ))}
                    </div>
                    <div className="card-actions">
                      {project.website && (
                        <a href={project.website} target="_blank" rel="noopener noreferrer" className="btn btn-primary">↗ Visit Site</a>
                      )}
                      <a href={project.github} target="_blank" rel="noopener noreferrer" className="btn btn-ghost">↗ GitHub</a>
                    </div>
                  </div>
                </div>
                <div className="card-preview">
                  <div className="preview-frame">
                    <div className="preview-browser-bar">
                      <div className="preview-dot dot-red"></div>
                      <div className="preview-dot dot-yellow"></div>
                      <div className="preview-dot dot-green"></div>
                    </div>
                    <div className="preview-image-wrapper">
                      {project.image ? (
                        <img src={project.image} alt={project.title} className="preview-image" />
                      ) : (
                        <div style={{ color: '#6b7a8d', fontSize: '0.8rem', textAlign: 'center' }}>No preview available</div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="other-section">
            <div className="other-header">
              <span className="other-label">Other projects</span>
              <div className="other-line"></div>
            </div>
            <div className="other-grid">
              {other.map((project) => (
                <div key={project.title} className="other-card">
                  <div className="thumb">
                    {project.image ? (
                      <img src={project.image} alt={project.title} className="thumb-img" />
                    ) : (
                      <div style={{ width: '100%', height: '100%', background: 'rgba(99,210,190,0.1)' }} />
                    )}
                  </div>
                  <div className="other-card-top">
                    <h3 className="other-title">{project.title}</h3>
                    <div className="other-links">
                      {project.website && (
                        <a href={project.website} target="_blank" rel="noopener noreferrer" className="icon-link" title="Visit Site">↗</a>
                      )}
                      <a href={project.github} target="_blank" rel="noopener noreferrer" className="icon-link" title="GitHub">⌥</a>
                    </div>
                  </div>
                  <p className="other-desc">{project.description}</p>
                  <div className="tags">
                    {project.tech.map((t) => (
                      <span key={t} className={`tag ${t.includes('API') || t === 'CSS' ? 'tag-blue' : ''}`}>{t}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default ProjectsPage;
