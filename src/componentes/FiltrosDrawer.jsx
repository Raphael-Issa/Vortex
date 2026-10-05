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
          <button className="close-drawer-btn" onClick={() => setIsDrawerOpen(false)}>✖</button>
        </div>

        <div className="filter-group">
          <div className="switch-wrapper" style={{ width: '100%', justifyContent: 'space-between', marginBottom: '1rem' }}>
            <span>+18 explícito</span>
            <label className="switch">
              <input type="checkbox" checked={showAdult} onChange={toggleAdult} />
              <span className="slider"></span>
            </label>
          </div>
        </div>

        <div className="filter-group">
          <h4>Ordenar por</h4>
          <select className="filter-select" value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
            <option value="relevance">Relevância</option>
            <option value="rating">Avaliação</option>
            <option value="latest">Capítulos Recentes</option>
            <option value="newest">Lançamentos Novos</option>
          </select>
        </div>

        <div className="filter-group">
          <h4>Status</h4>
          {['ongoing', 'completed', 'hiatus', 'cancelled'].map(st => (
            <label key={st} className="checkbox-label">
              <input 
                type="checkbox" 
                checked={selectedStatus.includes(st)} 
                onChange={() => toggleStatus(st)} 
              />
              {st.charAt(0).toUpperCase() + st.slice(1)}
            </label>
          ))}
        </div>

        <div className="filter-group">
          <h4>Demográfico</h4>
          {['shounen', 'shoujo', 'seinen', 'josei'].map(demo => (
            <label key={demo} className="checkbox-label">
              <input 
                type="checkbox" 
                checked={selectedDemographics.includes(demo)} 
                onChange={() => toggleDemographic(demo)} 
              />
              {demo.charAt(0).toUpperCase() + demo.slice(1)}
            </label>
          ))}
        </div>

        <div className="filter-group">
          <h4>Ano de Lançamento</h4>
          <input 
            type="number" 
            className="filter-input" 
            placeholder="Ex: 2023" 
            value={year}
            onChange={(e) => setYear(e.target.value)}
          />
        </div>

        <div className="filter-group">
          <h4>Gêneros</h4>
          {loadingTags ? <p>Carregando...</p> : (
            <div className="tags-list">
              {tagsByGroup.genre?.map((tag) => (
                <button
                  key={tag.id}
                  className={`tag-btn ${selectedTags.includes(tag.id) ? 'active' : ''}`}
                  onClick={() => toggleTag(tag.id)}
                >
                  {tag.attributes?.name?.en}
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="filter-group">
          <h4>Formatos</h4>
          {loadingTags ? <p>Carregando...</p> : (
            <div className="tags-list">
              {tagsByGroup.format?.map((tag) => (
                <button
                  key={tag.id}
                  className={`tag-btn ${selectedTags.includes(tag.id) ? 'active' : ''}`}
                  onClick={() => toggleTag(tag.id)}
                >
                  {tag.attributes?.name?.en}
                </button>
              ))}
            </div>
          )}
        </div>
        
        <div className="filter-group">
          <h4>Temas</h4>
          {loadingTags ? <p>Carregando...</p> : (
            <div className="tags-list">
              {tagsByGroup.theme?.map((tag) => (
                <button
                  key={tag.id}
                  className={`tag-btn ${selectedTags.includes(tag.id) ? 'active' : ''}`}
                  onClick={() => toggleTag(tag.id)}
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
