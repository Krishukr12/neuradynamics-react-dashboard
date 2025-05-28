import { useParams, Link } from 'react-router-dom';
import { Button } from '../components/Button';
import { useAppDispatch, useAppSelector } from '../redux/hook';
import { addFavorite, removeFavorite } from '../redux/slices/favouritesSlice';
import { RatingStars } from '../components/RatingStars';
import { LoadingSpinner } from '../components/LoadingSpinner';
import { ProductNotFound } from '../components/ProductNotFound';
import { Error } from '../components/Error';

export const ProductDetails = () => {
  const dispatch = useAppDispatch();
  const { id } = useParams<{ id: string }>();
  const { status, items } = useAppSelector(state => state.products);

  const productId = Number(id);
  const product = items.find(product => product.id === productId);
  const isFavorite = useAppSelector(state => state.favorites.items.includes(productId));

  if (status === 'loading') {
    return (
      <div className="flex justify-center items-center h-[80vh]">
        <LoadingSpinner label="Products Details..." />
      </div>
    );
  }

  if (status === 'failed') return <Error />;

  if (!product) return <ProductNotFound />;

  return (
    <div
      className="min-h-[calc(100vh-4rem)] p-8 bg-background text-foreground"
      style={{ minHeight: 'calc(100vh - 4rem)' }}
    >
      <div className="max-w-7xl mx-auto">
        <Link
          to="/"
          className="inline-flex items-center gap-2 mb-6 text-sm font-medium md:pl-8"
          style={{ color: 'var(--primary)' }}
        >
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
          Back to Products
        </Link>

        <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
          <div className="relative group">
            <div className="aspect-square overflow-hidden rounded-xl bg-muted">
              <img
                src={product.image}
                alt={product.title}
                className="w-full h-full object-contain p-8 transition-transform duration-300 group-hover:scale-105"
              />
            </div>
          </div>

          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground capitalize">{product.category}</span>
            </div>

            <h1 className="text-3xl font-bold tracking-tight">{product.title}</h1>

            <div className="flex items-center gap-4">
              <span className="text-4xl font-bold" style={{ color: 'var(--primary)' }}>
                ${product.price.toFixed(2)}
              </span>
              <div className="flex items-center gap-1">
                <RatingStars rate={product.rating.rate} ratingCount={product.rating.count} />
              </div>
            </div>

            <p className="text-lg leading-relaxed text-muted-foreground">{product.description}</p>
            <Button
              onClick={() =>
                dispatch(isFavorite ? removeFavorite(productId) : addFavorite(productId))
              }
              className="flex items-center gap-2 px-4 py-2 rounded-lg transition-colors"
              style={{
                backgroundColor: isFavorite ? 'var(--primary)' : 'transparent',
                color: isFavorite ? 'var(--primary-foreground)' : 'var(--primary)',
                border: '1px solid var(--primary)',
              }}
            >
              <svg
                className={`w-5 h-5 ${isFavorite ? 'fill-current' : 'fill-transparent'}`}
                style={{ stroke: 'var(--primary)' }}
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                />
              </svg>
              {isFavorite ? 'Remove Favorite' : 'Add to Favorites'}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
