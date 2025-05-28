import { useState, useEffect } from 'react';

import { useDebounce } from '@hooks/useDebounce';

interface ProductFiltersProps {
  categories: string[];
  onSearch: (searchTerm: string) => void;
  onCategoryChange: (category: string) => void;
  onSortChange: (sort: 'price-asc' | 'price-desc') => void;
}

export const ProductFilters = ({
  categories,
  onSearch,
  onCategoryChange,
  onSortChange,
}: ProductFiltersProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedSort, setSelectedSort] = useState<'price-asc' | 'price-desc'>('price-asc');

  const [debouncedSearchTerm] = useDebounce(searchTerm, 300);

  useEffect(() => {
    onSearch(debouncedSearchTerm);
  }, [debouncedSearchTerm, onSearch]);

  const handleClearFilters = () => {
    setSearchTerm('');
    setSelectedCategory('');
    setSelectedSort('price-asc');

    onSearch('');
    onCategoryChange('');
    onSortChange('price-asc');
  };

  return (
    <div className="p-6 bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center gap-4">
        <div className="flex-1 relative">
          <input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all text-gray-800"
          />
          <svg
            className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>

        <select
          value={selectedCategory}
          onChange={e => {
            setSelectedCategory(e.target.value);
            onCategoryChange(e.target.value);
          }}
          className="min-w-[180px] px-4 py-2 rounded-md border border-gray-300 bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
        >
          <option value="">All Categories</option>
          {categories.map(category => (
            <option key={category} value={category} className="capitalize">
              {category}
            </option>
          ))}
        </select>

        <select
          value={selectedSort}
          onChange={e => {
            const sort = e.target.value as 'price-asc' | 'price-desc';
            setSelectedSort(sort);
            onSortChange(sort);
          }}
          className="min-w-[180px] px-4 py-2 rounded-md border border-gray-300 bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
        >
          <option value="price-asc">Price: Low to High</option>
          <option value="price-desc">Price: High to Low</option>
        </select>

        <button
          onClick={handleClearFilters}
          className="px-4 py-2 rounded-md border border-red-300 text-red-600 hover:bg-red-100 transition-all cursor-pointer"
        >
          Clear Filters
        </button>
      </div>
    </div>
  );
};
