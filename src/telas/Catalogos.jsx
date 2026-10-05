import { useState } from 'react';
import { Navbar } from '../componentes/Navbar';
import { CardManga } from '../componentes/CardManga';
import { Paginacao } from '../componentes/Paginacao';
import { useMangaSearch } from '../hooks/useMangaSearch';
import { useCatalogParams } from '../hooks/useCatalogParams';
import { FiltrosDrawer } from '../componentes/FiltrosDrawer';

export function Catalogos() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  
  const { 
    busca, pagina, showAdult, selectedTags, selectedStatus, selectedDemographics, year, sortBy,
    setPagina, handleBuscaChange, toggleAdult, toggleTag, toggleStatus, toggleDemographic, setYear, setSortBy 
  } = useCatalogParams();
  
  const { mangas, totalPages: totalPagesAPI, loading } = useMangaSearch(
    busca, pagina, showAdult, selectedTags, selectedStatus, selectedDemographics, year, sortBy
  );

  return (
    <div className="home-container">
      <Navbar home="Home" cat="Catálogos" sobre="Saiba Mais" />

      <main className="catalogo-container" style={{ padding: '2rem 8%' }}>
        
        {/* Top Search Bar & Filter Button */}
        <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem', flexWrap: 'wrap' }}>
          <div className="search-input-wrapper">
            <input
              type="text"
              placeholder="Buscar mangá por título..."
              value={busca}
              onChange={handleBuscaChange}
              className="search-input"
              aria-label="Buscar mangá por título"
              style={{ margin: 0 }}
            />
          </div>
          <button className="filter-toggle-btn" onClick={() => setIsDrawerOpen(true)}>
            Filtros
          </button>
        </div>

        <FiltrosDrawer 
          isDrawerOpen={isDrawerOpen}
          setIsDrawerOpen={setIsDrawerOpen}
          showAdult={showAdult}
          toggleAdult={toggleAdult}
          sortBy={sortBy}
          setSortBy={setSortBy}
          selectedStatus={selectedStatus}
          toggleStatus={toggleStatus}
          selectedDemographics={selectedDemographics}
          toggleDemographic={toggleDemographic}
          year={year}
          setYear={setYear}
          selectedTags={selectedTags}
          toggleTag={toggleTag}
        />

        {loading ? (
          <h2 className="carregando">Carregando mangás...</h2>
        ) : (
          <>
            <div className="manga-grid">
              {mangas.length > 0 ? (
                mangas.map((manga) => (
                  <CardManga key={manga.id} manga={manga} />
                ))
              ) : (
                <div className="no-results">Nenhum mangá encontrado.</div>
              )}
            </div>

            {mangas.length > 0 && (
              <Paginacao
                pagina={pagina}
                totalPagesAPI={totalPagesAPI}
                setPagina={setPagina}
              />
            )}
          </>
        )}
      </main>
    </div>
  );
}