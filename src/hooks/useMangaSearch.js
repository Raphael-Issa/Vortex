import { useState, useEffect } from 'react';

export function useMangaSearch(
  query = '', 
  page = 1, 
  showAdult = false, 
  selectedTags = [], 
  selectedStatus = [], 
  selectedDemographics = [], 
  year = '', 
  sortBy = 'relevance'
) {
  const [mangas, setMangas] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);

  const LIMIT = 20;

  useEffect(() => {
    async function fetchMangas() {
      try {
        setLoading(true);
        const offset = (page - 1) * LIMIT;

        // Base URL with includes
        let url = `https://api.mangadex.org/manga?limit=${LIMIT}&offset=${offset}&includes[]=cover_art`;
        
        // Sorting
        if (sortBy === 'relevance') {
          url += `&order[relevance]=desc`;
        } else if (sortBy === 'rating') {
          url += `&order[rating]=desc`;
        } else if (sortBy === 'latest') {
          url += `&order[latestUploadedChapter]=desc`;
        } else if (sortBy === 'newest') {
          url += `&order[createdAt]=desc`;
        }

        // Sensitive Content
        if (showAdult) {
          url += `&contentRating[]=safe&contentRating[]=suggestive&contentRating[]=erotica&contentRating[]=pornographic`;
        } else {
          url += `&contentRating[]=safe&contentRating[]=suggestive`;
        }

        // Query Search
        if (query) {
          url += `&title=${encodeURIComponent(query)}`;
        }

        // Tags
        if (selectedTags && selectedTags.length > 0) {
          selectedTags.forEach(tagId => {
            url += `&includedTags[]=${tagId}`;
          });
        }

        // Status
        if (selectedStatus && selectedStatus.length > 0) {
          selectedStatus.forEach(status => {
            url += `&status[]=${status}`;
          });
        }

        // Demographics
        if (selectedDemographics && selectedDemographics.length > 0) {
          selectedDemographics.forEach(demo => {
            url += `&publicationDemographic[]=${demo}`;
          });
        }

        // Year
        if (year) {
          url += `&year=${year}`;
        }

        const response = await fetch(url);
        const data = await response.json();

        let results = data.data || [];

        // Sorting logic purely for visual relevance when searching by text AND sorting by relevance
        if (query.trim() && sortBy === 'relevance') {
          const cleanQuery = query.trim().toLowerCase();

          results = [...results].sort((a, b) => {
            const titleA = (a.attributes?.title?.en || Object.values(a.attributes?.title || {})[0] || '').toLowerCase();
            const titleB = (b.attributes?.title?.en || Object.values(b.attributes?.title || {})[0] || '').toLowerCase();

            const getScore = (title) => {
              if (title === cleanQuery) return 3;
              if (title.startsWith(cleanQuery)) return 2;
              return 1;
            };

            const scoreA = getScore(titleA);
            const scoreB = getScore(titleB);

            if (scoreA !== scoreB) {
              return scoreB - scoreA;
            }
            return titleA.length - titleB.length;
          });
        }

        setMangas(results);

        const totalItems = data.total || 0;
        setTotalPages(Math.ceil(totalItems / LIMIT));
      } catch (err) {
        console.error("Erro ao buscar catálogo:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchMangas();
  }, [query, page, showAdult, selectedTags.join(','), selectedStatus.join(','), selectedDemographics.join(','), year, sortBy]);

  return { mangas, totalPages, loading };
}
