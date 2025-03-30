'use client';

import { useEffect } from 'react';
import { useSearchGifs } from '../application/hooks/useImages';
import GiphySearch from '../presentation/components/GiphySearch';

export default function Home() {
  const searchGifs = useSearchGifs();

  useEffect(() => {
    if (searchGifs.error) {
      throw searchGifs.error;
    }
  }, [searchGifs.error]);

  return (
    <div className="grid grid-rows-[auto_1fr_auto] min-h-screen p-8 pb-20 gap-8 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <header className="text-center">
        <h1 className="text-3xl font-bold text-blue-600 mb-1">GIPHY Search</h1>
        <p className="text-gray-600">Search for your favorite GIFs</p>
      </header>

      <main className="w-full max-w-5xl mx-auto">
        <GiphySearch />
      </main>

      <footer className="text-center text-gray-500 text-sm">
        Powered by GIPHY API
      </footer>
    </div>
  );
}
