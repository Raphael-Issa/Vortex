import { Link } from 'react-router-dom';

export function Navbar({ home, cat, sobre }) {
  return (
    <header>
      <div className="logo-container">
        <img src="/Vortex.png" alt="Logo Vortex" className="logo-img" width="40" height="40" />
        <h1>VORTEX MANGÁS</h1>
        <img src="/Vortex.png" alt="Logo Vortex" className="logo-img" width="40" height="40" />
      </div>

      <nav aria-label="Navegação principal">
        <Link to="/">{home}</Link>
        <Link to="/catalogos">{cat}</Link>
        <Link to="/saiba">{sobre}</Link>
      </nav>
    </header>
  );
}