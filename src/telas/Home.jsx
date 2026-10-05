import { Link } from 'react-router-dom';
import { Navbar } from '../componentes/Navbar';
import { useMangaDestaque } from '../hooks/useMangaDestaque'; 
import '../App.css';

export function Home() {
  const { mangaDestaque, titulo, urlDaFoto, loading } = useMangaDestaque();

  if (loading) return <h2 className='carregando'>Carregando mangá...</h2>;
  if (!mangaDestaque) return <p>Nenhum mangá encontrado.</p>;

  return (
    <div className="home-container">
      <Navbar 
        home="Home"
        cat="Catálogos"
        sobre="Saiba Mais"
      />

      <main className="hero-banner">
        <div 
          className="hero-background" 
          style={{ backgroundImage: `url(${urlDaFoto})` }}
        />
        
        <div className="hero-overlay" />

        <div className="hero-content">
          <span className="badge">Destaques</span>
          <h1 className="hero-title">{titulo}</h1>
          <p className="hero-description">
            Sua porta de entrada para a melhor coleção de mangás selecionados.
          </p>

          <div className="hero-buttons">
            <Link to="/catalogos">
              <button className="btn btn-primary">Ver Catálogo</button>
            </Link>

            <Link to="/saiba">
              <button className="btn btn-secondary">Saiba Mais</button>
            </Link>
          </div>
        </div>
      </main>

      <footer className="footer">
        <p>VORTEX MANGÁS © 2026 - Dados e capas fornecidos por MangaDex. Projeto não comercial.</p>
      </footer>
    </div>
  );
}