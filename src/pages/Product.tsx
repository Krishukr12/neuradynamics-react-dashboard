import { useSelector } from "react-redux";
import { useEffect } from "react";

import { fetchProducts } from "../redux/slices/productSlice";
import { ProductCard } from "../components/ProductCard";
import { useAppDispatch } from "../redux/hook";
import { LoadingSpinner } from "../components/LoadingSpinner";
import type { RootState } from "../redux/store";

export const Product = () => {
  const {
    items: products,
    status,
    error,
  } = useSelector((state: RootState) => state.products);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchProducts());
    }
  }, [dispatch, status]);

  return (
    <div className="min-h-screen p-8 bg-[var(--background)] text-[var(--foreground)]">
      <div className="max-w-7xl mx-auto">
        {status === "loading" ? (
          <div className="flex justify-center items-center h-[80vh]">
            <LoadingSpinner label="Loading products..." />
          </div>
        ) : error ? (
          <div className="text-center text-red-600">{error}</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
