import { useMangaTags } from '../hooks/useMangaTags';

export function FiltrosDrawer({
  isDrawerOpen,
  setIsDrawerOpen,
  showAdult,
  toggleAdult,
  sortBy,
  setSortBy,
  selectedStatus,
  toggleStatus,
  selectedDemographics,
  toggleDemographic,
  year,
  setYear,
  selectedTags,
  toggleTag
}) {
  const { tagsByGroup, loadingTags } = useMangaTags();

  return (
    <>
      {/* Filters Drawer Overlay */}
      <div 
        className={`filters-drawer-overlay ${isDrawerOpen ? 'open' : ''}`} 
        onClick={() => setIsDrawerOpen(false)}
      ></div>
      
      {/* Filters Drawer */}
      <div className={`filters-drawer ${isDrawerOpen ? 'open' : ''}`}>
        <div className="drawer-header">
          <h2>Filtros</h2>
          <button className="close-drawer-btn" aria-label="Fechar Filtros" onClick={() => setIsDrawerOpen(false)}>×</button>
        </div>

        <div className="filter-group">
          <div className="switch-wrapper" style={{ width: '100%', justifyContent: 'space-between', marginBottom: '1rem' }}>
            <span>+18 explícito</span>
            <label className="switch" aria-label="Ativar conteúdo +18 explícito">
              <input type="checkbox" checked={showAdult} onChange={toggleAdult} aria-label="Ativar conteúdo +18 explícito" />
              <span className="slider"></span>
            </label>
          </div>
        </div>

        <div className="filter-group">
          <h3>Ordenar por</h3>
          <select 
            className="filter-select" 
            value={sortBy} 
            onChange={(e) => setSortBy(e.target.value)}
            aria-label="Ordenar resultados por"
          >
            <option value="relevance">Relevância</option>
            <option value="rating">Avaliação</option>
            <option value="latest">Capítulos Recentes</option>
            <option value="newest">Lançamentos Novos</option>
          </select>
        </div>

        <div className="filter-group">
          <h3>Status</h3>
          {['ongoing', 'completed', 'hiatus', 'cancelled'].map(st => (
            <label key={st} className="checkbox-label">
              <input 
                type="checkbox" 
                checked={selectedStatus.includes(st)} 
                onChange={() => toggleStatus(st)} 
                aria-label={`Status: ${{ ongoing: 'Lançando', completed: 'Concluído', hiatus: 'Em Hiato', cancelled: 'Cancelado' }[st]}`}
              />
              {{ ongoing: 'Lançando', completed: 'Concluído', hiatus: 'Em Hiato', cancelled: 'Cancelado' }[st]}
            </label>
          ))}
        </div>

        <div className="filter-group">
          <h3>Demográfico</h3>
          {['shounen', 'shoujo', 'seinen', 'josei'].map(demo => (
            <label key={demo} className="checkbox-label">
              <input 
                type="checkbox" 
                checked={selectedDemographics.includes(demo)} 
                onChange={() => toggleDemographic(demo)}
                aria-label={`Demográfico: ${demo.charAt(0).toUpperCase() + demo.slice(1)}`}
              />
              {demo.charAt(0).toUpperCase() + demo.slice(1)}
            </label>
          ))}
        </div>

        <div className="filter-group">
          <h3>Ano de Lançamento</h3>
          <input 
            type="number" 
            className="filter-input" 
            placeholder="Ex: 2023" 
            value={year}
            onChange={(e) => setYear(e.target.value)}
            aria-label="Filtrar por ano de lançamento"
          />
        </div>

        <div className="filter-group">
          <h3>Gêneros</h3>
          {loadingTags ? <p>Carregando...</p> : (
            <div className="tags-list">
              {tagsByGroup.genre?.map((tag) => (
                <button
                  key={tag.id}
                  className={`tag-btn ${selectedTags.includes(tag.id) ? 'active' : ''}`}
                  onClick={() => toggleTag(tag.id)}
                  aria-pressed={selectedTags.includes(tag.id)}
                >
                  {tag.attributes?.name?.en}
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="filter-group">
          <h3>Formatos</h3>
          {loadingTags ? <p>Carregando...</p> : (
            <div className="tags-list">
              {tagsByGroup.format?.map((tag) => (
                <button
                  key={tag.id}
                  className={`tag-btn ${selectedTags.includes(tag.id) ? 'active' : ''}`}
                  onClick={() => toggleTag(tag.id)}
                  aria-pressed={selectedTags.includes(tag.id)}
                >
                  {tag.attributes?.name?.en}
                </button>
              ))}
            </div>
          )}
        </div>
        
        <div className="filter-group">
          <h3>Temas</h3>
          {loadingTags ? <p>Carregando...</p> : (
            <div className="tags-list">
              {tagsByGroup.theme?.map((tag) => (
                <button
                  key={tag.id}
                  className={`tag-btn ${selectedTags.includes(tag.id) ? 'active' : ''}`}
                  onClick={() => toggleTag(tag.id)}
                  aria-pressed={selectedTags.includes(tag.id)}
                >
                  {tag.attributes?.name?.en}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
