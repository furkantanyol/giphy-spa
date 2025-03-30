'use client';

import {
  useAbortGiphySearch,
  useSearchGifs,
} from '@/application/hooks/useImages';
import { useToast } from '@/application/hooks/useToast';
import { DEFAULT_LIMIT } from '@/domain/models/giphy-api';
import GifGrid from '@/presentation/components/GifGrid';
import SearchForm from '@/presentation/components/SearchForm';
import { useState } from 'react';

export default function GiphySearch() {
  const [searchResults, setSearchResults] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);

  const searchGifs = useSearchGifs();
  const abortSearch = useAbortGiphySearch();
  const { showToast } = useToast();

  const handleSearch = async (query: string, language?: string) => {
    if (!query.trim()) return;

    setIsLoading(true);

    try {
      const result = await searchGifs.mutateAsync({
        q: query,
        lang: language,
        limit: DEFAULT_LIMIT,
        offset: 0,
      });

      setSearchResults(result);

      if (result.data.length === 0) {
        showToast(`No GIFs found for "${query}"`, 'info');
      } else {
        showToast(`Found ${result.data.length} GIFs for "${query}"`, 'success');
      }
    } catch (error) {
      showToast('Error searching for GIFs. Please try again.', 'error');
      console.error('Search error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAbort = () => {
    if (isLoading) {
      abortSearch.mutate();
      setIsLoading(false);
      showToast('Search cancelled', 'warning');
    }
  };

  return (
    <div
      className="w-full max-w-3xl mx-auto flex flex-col gap-6"
      aria-live="polite"
    >
      <section aria-label="Search controls">
        <SearchForm
          onSearch={handleSearch}
          onCancel={handleAbort}
          isLoading={isLoading}
        />
      </section>

      <section aria-label="Search results">
        <GifGrid data={searchResults?.data} isLoading={isLoading} />
      </section>
    </div>
  );
}
