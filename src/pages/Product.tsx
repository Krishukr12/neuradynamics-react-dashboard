import { useSelector } from 'react-redux';

import { ProductCard } from '@components/ProductCard';
import { LoadingSpinner } from '@components/LoadingSpinner';
import { ProductFilters } from '@components/ProductFilters';
import { Error } from '@components/Error';

import type { RootState } from '@redux/store';
import { useSearchFilterSort } from '@hooks/useSearchFilterSort';

export const Product = () => {
  const { items: products, status, error } = useSelector((state: RootState) => state.products);

  const { categories, filteredProducts, handleSearch, handleCategoryChange, handleSortChange } =
    useSearchFilterSort(products);

  return (
    <div className="min-h-screen p-8 bg-[var(--background)] text-[var(--foreground)]">
      <div className="max-w-7xl mx-auto">
        {status === 'loading' ? (
          <div className="flex justify-center items-center h-[80vh]">
            <LoadingSpinner label="Loading products..." />
          </div>
        ) : error ? (
          <Error />
        ) : (
          <div className="flex flex-col gap-6">
            <ProductFilters
              categories={categories}
              onSearch={value => handleSearch(value)}
              onCategoryChange={value => handleCategoryChange(value)}
              onSortChange={value => handleSortChange(value)}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
