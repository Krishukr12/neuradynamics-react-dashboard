import { useMemo } from "react";
import { ProductCard } from "../components/ProductCard";
import { useAppSelector } from "../redux/hook";
import { EmptyFavorites } from "../components/EmptyFavorites";

export const Favorites = () => {
  const favoritedProducts = useAppSelector((state) => state.favorites.items);
  const allProducts = useAppSelector((state) => state.products.items);

  const favorites = useMemo(
    () =>
      allProducts.filter((product) => favoritedProducts.includes(product.id)),
    [allProducts, favoritedProducts]
  );

  if (favorites.length === 0) return <EmptyFavorites />;

  return (
    <div className="min-h-[calc(100vh-4rem)] p-8 bg-background text-foreground">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h3 className="font-medium truncate">Favorite Products</h3>
          <span className="text-muted-foreground">
            {favorites.length} items
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {favorites.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
};
