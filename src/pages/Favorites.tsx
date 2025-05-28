import { useMemo } from 'react';

import { ProductCard } from '@components/ProductCard';
import { EmptyFavorites } from '@components/EmptyFavorites';
import { LoadingSpinner } from '@components/LoadingSpinner';
import { Error } from '@components/Error';
import { ProductFilters } from '@components/ProductFilters';
import { useAppSelector } from '@redux/hook';
import { useSearchFilterSort } from '@hooks/useSearchFilterSort';

export const Favorites = () => {
  const { status, items: allProducts } = useAppSelector(state => state.products);

  const favoritesProductIds = useAppSelector(state => state.favorites.items);

  const favoritesProducts = useMemo(
    () => allProducts.filter(product => favoritesProductIds.includes(product.id)),
    [allProducts, favoritesProductIds]
  );

  const { categories, filteredProducts, handleSearch, handleCategoryChange, handleSortChange } =
    useSearchFilterSort(favoritesProducts);

  if (status === 'loading')
    return (
      <div className="flex justify-center items-center h-[80vh]">
        <LoadingSpinner label="Favorite Products..." />
      </div>
    );

  if (status === 'failed') return <Error />;
  if (favoritesProducts.length === 0) return <EmptyFavorites />;

  return (
    <div className="min-h-[calc(100vh-4rem)] p-4 sm:p-6 md:p-8 bg-background text-foreground">
      <div className="max-w-7xl mx-auto">
        <div className="mb-6">
          <ProductFilters
            categories={categories}
            onSearch={value => handleSearch(value)}
            onCategoryChange={value => handleCategoryChange(value)}
            onSortChange={value => handleSortChange(value)}
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
};
