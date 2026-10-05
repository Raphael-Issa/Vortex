import { useState, useEffect } from 'react';
import { getMangaTags } from '../services/MangaDexApi';

export function useMangaTags() {
  const [tagsByGroup, setTagsByGroup] = useState({
    genre: [],
    theme: [],
    format: [],
    content: []
  });
  const [loadingTags, setLoadingTags] = useState(true);

  useEffect(() => {
    async function fetchTags() {
      try {
        const data = await getMangaTags();
        const grouped = {
          genre: [],
          theme: [],
          format: [],
          content: []
        };

        data.forEach(tag => {
          const group = tag.attributes?.group || 'theme';
          if (grouped[group]) {
            grouped[group].push(tag);
          } else {
            grouped[group] = [tag];
          }
        });

        // Sort each group alphabetically
        Object.keys(grouped).forEach(key => {
          grouped[key].sort((a, b) => {
            const nameA = a.attributes?.name?.en || '';
            const nameB = b.attributes?.name?.en || '';
            return nameA.localeCompare(nameB);
          });
        });

        setTagsByGroup(grouped);
      } catch (e) {
        console.error('Erro ao carregar tags', e);
      } finally {
        setLoadingTags(false);
      }
    }
    fetchTags();
  }, []);

  return { tagsByGroup, loadingTags };
}
