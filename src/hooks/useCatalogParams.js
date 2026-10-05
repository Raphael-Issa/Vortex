import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

export function useCatalogParams() {
  const [searchParams, setSearchParams] = useSearchParams();

  const busca = searchParams.get('busca') || '';
  const pagina = Number(searchParams.get('pagina')) || 1;
  const showAdult = searchParams.get('adult') === 'true';

  // Rola suavemente para o topo ao trocar de página
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [pagina]);

  const setPagina = (novaPagina, totalPages = 100) => {
    const proxima = typeof novaPagina === 'function' ? novaPagina(pagina) : novaPagina;
    const paginaValida = Math.min(Math.max(1, proxima), totalPages);

    setSearchParams((prev) => {
      prev.set('pagina', paginaValida);
      return prev;
    });
  };

  const handleBuscaChange = (e) => {
    const valor = e.target.value;
    setSearchParams((prev) => {
      if (valor) {
        prev.set('busca', valor);
      } else {
        prev.delete('busca');
      }
      prev.set('pagina', 1);
      return prev;
    });
  };

  const toggleAdult = () => {
    setSearchParams((prev) => {
      if (!showAdult) {
        prev.set('adult', 'true');
      } else {
        prev.delete('adult');
      }
      prev.set('pagina', 1);
      return prev;
    });
  };

  const tagsParam = searchParams.get('tags');
  const selectedTags = tagsParam ? tagsParam.split(',') : [];

  const toggleTag = (tagId) => {
    setSearchParams((prev) => {
      let currentTags = prev.get('tags') ? prev.get('tags').split(',') : [];
      if (currentTags.includes(tagId)) {
        currentTags = currentTags.filter((id) => id !== tagId);
      } else {
        currentTags.push(tagId);
      }

      if (currentTags.length > 0) {
        prev.set('tags', currentTags.join(','));
      } else {
        prev.delete('tags');
      }
      prev.set('pagina', 1);
      return prev;
    });
  };

  const statusParam = searchParams.get('status');
  const selectedStatus = statusParam ? statusParam.split(',') : [];

  const toggleStatus = (statusId) => {
    setSearchParams((prev) => {
      let currentStatus = prev.get('status') ? prev.get('status').split(',') : [];
      if (currentStatus.includes(statusId)) {
        currentStatus = currentStatus.filter((id) => id !== statusId);
      } else {
        currentStatus.push(statusId);
      }

      if (currentStatus.length > 0) {
        prev.set('status', currentStatus.join(','));
      } else {
        prev.delete('status');
      }
      prev.set('pagina', 1);
      return prev;
    });
  };

  const demographicParam = searchParams.get('demographic');
  const selectedDemographics = demographicParam ? demographicParam.split(',') : [];

  const toggleDemographic = (demoId) => {
    setSearchParams((prev) => {
      let currentDemo = prev.get('demographic') ? prev.get('demographic').split(',') : [];
      if (currentDemo.includes(demoId)) {
        currentDemo = currentDemo.filter((id) => id !== demoId);
      } else {
        currentDemo.push(demoId);
      }

      if (currentDemo.length > 0) {
        prev.set('demographic', currentDemo.join(','));
      } else {
        prev.delete('demographic');
      }
      prev.set('pagina', 1);
      return prev;
    });
  };

  const year = searchParams.get('year') || '';
  const setYear = (newYear) => {
    setSearchParams((prev) => {
      if (newYear) {
        prev.set('year', newYear);
      } else {
        prev.delete('year');
      }
      prev.set('pagina', 1);
      return prev;
    });
  };

  const sortBy = searchParams.get('sortBy') || 'relevance';
  const setSortBy = (newSort) => {
    setSearchParams((prev) => {
      if (newSort && newSort !== 'relevance') {
        prev.set('sortBy', newSort);
      } else {
        prev.delete('sortBy');
      }
      prev.set('pagina', 1);
      return prev;
    });
  };

  return { 
    busca, pagina, showAdult, selectedTags, selectedStatus, selectedDemographics, year, sortBy,
    setPagina, handleBuscaChange, toggleAdult, toggleTag, toggleStatus, toggleDemographic, setYear, setSortBy 
  };
}
