  const BASE_URL = 'https://api.mangadex.org';

  // Busca os 20 mangás mais populares/recentes sem precisar de busca por texto
  export async function getPopularMangas() {
    try {
      const response = await fetch(
        `${BASE_URL}/manga?limit=100&includes[]=cover_art&order[followedCount]=desc&contentRating[]=safe&contentRating[]=suggestive`
      );

      if (!response.ok) {
        throw new Error('Erro ao buscar lista de mangás');
      }

      const data = await response.json();
      return data.data;
    } catch (error) {
      console.error('Erro na requisição:', error);
      throw error;
    }
  }

  export async function getMangaTags() {
    try {
      const response = await fetch(`${BASE_URL}/manga/tag`);
      if (!response.ok) {
        throw new Error('Erro ao buscar tags');
      }
      const data = await response.json();
      return data.data;
    } catch (error) {
      console.error('Erro ao buscar tags:', error);
      return [];
    }
  }