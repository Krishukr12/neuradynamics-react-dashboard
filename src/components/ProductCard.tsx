import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../redux/hook';
import { addFavorite, removeFavorite } from '../redux/slices/favouritesSlice';
import type { Product } from '../types';
import { Button } from './Button';
import { RatingStars } from './RatingStars';

interface ProductCardProps {
  product: Product;
}

export const ProductCard = ({ product }: ProductCardProps) => {
  const dispatch = useAppDispatch();
  const { id, image, title, price, category, rating } = product;
  const { items } = useAppSelector(state => state.favorites);
  const isProductFavorited = useMemo(() => items.includes(id), [items, id]);

  const handleFavoriteToggle = () => {
    dispatch(isProductFavorited ? removeFavorite(id) : addFavorite(id));
  };

  return (
    <article
      className="group relative flex flex-col rounded-xl border overflow-hidden transition-all hover:shadow-lg"
      style={{
        backgroundColor: 'var(--background)',
        borderColor: 'var(--border)',
      }}
    >
      <Link to={`/product/${id}`} className="flex flex-col flex-grow">
        <div className="aspect-square overflow-hidden bg-gray-100">
          <img
            src={image}
            alt={title}
            className="h-full w-full object-contain object-center p-4 transition-transform group-hover:scale-105"
          />
        </div>

        <div className="p-4 flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <span className="text-sm capitalize" style={{ color: 'var(--muted-foreground)' }}>
              {category}
            </span>
            <RatingStars rate={rating.rate} ratingCount={rating.count} />
          </div>

          <h3 className="font-medium truncate" style={{ color: 'var(--foreground)' }}>
            {title}
          </h3>
        </div>
      </Link>

      <div className="px-4 pb-4 mt-auto flex items-center justify-between">
        <span className="text-lg font-bold" style={{ color: 'var(--primary)' }}>
          ${price.toFixed(2)}
        </span>
        <Button
          ariaLabel={`${isProductFavorited ? 'Remove Favorites' : 'Add to Favorites'} ${title}`}
          label={isProductFavorited ? 'Remove Favorites' : 'Add to Favorites'}
          onClick={handleFavoriteToggle}
        />
      </div>
    </article>
  );
};
