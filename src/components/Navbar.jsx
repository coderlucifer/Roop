import './Navbar.css'

const navLinks = ['Women', 'Men', 'Accessories']

function Navbar() {
  return (
    <header className="navbar">
      <div className="navbar__logo-slot">
        <span className="navbar__logo-placeholder">
          <img src="./logo.png" alt="Roop" className="w-10 h-10" />
        </span>
      </div>

      <nav className="navbar__links" aria-label="Primary">
        {navLinks.map((link) => (
          <a key={link} href="#">
            {link}
          </a>
        ))}
      </nav>

      <div className="navbar__actions">
        <button className="btn ghost">Sign in</button>
        <button className="btn solid">Shop now</button>
      </div>
    </header>
  )
}

export default Navbar

