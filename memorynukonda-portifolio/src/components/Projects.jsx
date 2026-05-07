function Projects() {
  return (
    <section id="projects" style={{ padding: "40px" }}>
      <h2>Projects</h2>

      <div>
        {/* Project 1 */}
        <div style={{ marginBottom: "20px" }}>
          <h3>Product API</h3>
          <p>
            A backend API that allows filtering products by category and price.
          </p>
          <p>Tech: Node.js, NestJS, MongoDB</p>

          <a href="https://github.com/your-link" target="_blank">
            View Project
          </a>
        </div>

        {/* Project 2 */}
        <div style={{ marginBottom: "20px" }}>
          <h3>Authentication System</h3>
          <p>
            A secure authentication system with login and registration using JWT.
          </p>
          <p>Tech: Node.js, Express, MongoDB</p>

          <a href="https://github.com/your-link" 
          target="_blank" rel="noopener noreferrer">
            View Project
          </a>
        </div>

        {/* Project 3 */}
        <div>
          <h3>Portfolio Website</h3>
          <p>A personal portfolio to showcase my projects and skills.</p>
          <p>Tech: React</p>

          <a href="https://github.com/your-link" target="_blank" rel="noopener noreferrer">
            View Project
          </a>
        </div>
      </div>
    </section>
  );
}

export default Projects;