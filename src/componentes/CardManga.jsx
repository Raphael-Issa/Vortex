import { Link } from 'react-router-dom';

export function CardManga({ manga }) {
  const attributes = manga?.attributes;
  const titulos = attributes?.title || {};
  const altTitles = attributes?.altTitles || [];

  // Procura por um título em inglês no array de títulos alternativos
  const altEnglish = altTitles.find((item) => item && item.en)?.en;

  // Prioridades: 
  // 1. Inglês Principal (title.en)
  // 2. Inglês Alternativo (altTitles)
  // 3. Romanizado (ja-ro / ko-ro)
  // 4. Português (pt-br)
  // 5. Primeiro disponível caso não tenha nenhum dos acima
  const titulo = typeof titulos === 'string'
    ? titulos
    : (
        titulos.en || 
        altEnglish || 
        titulos['ja-ro'] || 
        titulos['ko-ro'] || 
        titulos['pt-br'] || 
        Object.values(titulos)[0] || 
        "Sem título"
      );

  const caparel = manga?.relationships?.find(r => r.type === 'cover_art');
  const nomeArquivo = caparel?.attributes?.fileName;
  const urlCapa = nomeArquivo 
    ? `https://uploads.mangadex.org/covers/${manga.id}/${nomeArquivo}`
    : "https://via.placeholder.com/200x300?text=Sem+Capa";

  const ano = attributes?.year || 'N/D';
  
  // Traduz o status
  const getStatusInfo = (status) => {
    switch (status) {
      case 'ongoing': return { text: 'Lançando', color: '#66fcf1' };
      case 'completed': return { text: 'Concluído', color: '#4caf50' };
      case 'hiatus': return { text: 'Em Hiato', color: '#ffb74d' };
      case 'cancelled': return { text: 'Cancelado', color: '#ff5252' };
      default: return { text: 'Desconhecido', color: '#9e9e9e' };
    }
  };
  const statusInfo = getStatusInfo(attributes?.status);

  // Pega até 2 gêneros para não poluir muito o card
  const tagsList = attributes?.tags
    ?.filter(t => t.attributes?.group === 'genre' || t.attributes?.group === 'theme')
    .slice(0, 2)
    .map(t => t.attributes?.name?.en) || [];

  return (
    <Link to={`/manga/${manga.id}`} style={{ textDecoration: 'none' }}>
      <div className="manga-card">
        <div className="manga-card-image-container">
          <img src={urlCapa} alt={titulo} className="manga-card-img" />
          <div className="manga-card-badge" style={{ backgroundColor: statusInfo.color }}>
            {statusInfo.text}
          </div>
        </div>
        <div className="manga-card-content">
          <h3 className="manga-card-title" title={titulo}>{titulo}</h3>
          
          <div className="manga-card-meta">
            <span className="manga-ano">{ano}</span>
            <div className="manga-mini-tags">
              {tagsList.map((tag, idx) => (
                <span key={idx} className="mini-tag">{tag}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}