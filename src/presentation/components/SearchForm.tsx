'use client';

import { SUPPORTED_LANGUAGES } from '@/domain/models/languages';
import { ChangeEvent, FormEvent, useState } from 'react';

interface SearchFormProps {
  onSearch: (query: string, language?: string) => void;
  onCancel: () => void;
  isLoading: boolean;
}

export default function SearchForm({
  onSearch,
  onCancel,
  isLoading,
}: SearchFormProps) {
  const [query, setQuery] = useState('');
  const [language, setLanguage] = useState('en');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query, language || undefined);
    }
  };

  const handleQueryChange = (e: ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const handleLanguageChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setLanguage(e.target.value);
  };

  const handleClear = () => {
    setQuery('');
    if (isLoading) {
      onCancel();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <div className="flex flex-col gap-4 sm:flex-row">
        <div className="flex-1">
          <input
            type="text"
            value={query}
            onChange={handleQueryChange}
            placeholder="Search for GIFs..."
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled={isLoading}
          />
        </div>

        <div className="w-full sm:w-40">
          <select
            value={language}
            onChange={handleLanguageChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled={isLoading}
          >
            {SUPPORTED_LANGUAGES.map((lang) => (
              <option
                key={lang.code}
                value={lang.code}
                className="flex items-center justify-between gap-2"
              >
                {lang.flag} {lang.name}
              </option>
            ))}
          </select>
        </div>

        <div className="flex gap-2">
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={isLoading || !query.trim()}
          >
            {isLoading ? 'Searching...' : 'Search'}
          </button>

          {query && (
            <button
              type="button"
              onClick={handleClear}
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500"
            >
              {isLoading ? 'Cancel' : 'Clear'}
            </button>
          )}
        </div>
      </div>
    </form>
  );
}
