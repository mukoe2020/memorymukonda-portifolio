function Navbar() {
  return (
    <nav
      style={{
        display: "flex",
        justifyContent: "space-between",
        padding: "20px",
        borderBottom: "1px solid #ccc",
      }}
    >
      <h2>Memory</h2>

      <div style={{ display: "flex", gap: "20px" }}>
        <a href="#projects">Projects</a>
        <a href="#about">About</a>
        <a href="#contact">Contact</a>
        <a href="#skills">Skills</a>
      </div>
    </nav>
  );
}

export default Navbar;