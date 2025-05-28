import { Link } from 'react-router';

export const EmptyFavorites = () => {
  return (
    <div className="min-h-[calc(100vh-4rem)] p-8 bg-background text-foreground">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col items-center justify-center min-h-[60vh] text-center space-y-6">
          <div className="relative animate-bounce-slow">
            <svg
              className="w-24 h-24 text-muted-foreground/30"
              style={{ stroke: 'var(--foreground)' }}
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <svg
                className="w-12 h-12 animate-pulse"
                style={{ stroke: 'var(--primary)' }}
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 4v16m8-8H4"
                />
              </svg>
            </div>
          </div>

          <div className="space-y-4">
            <h1 className="text-4xl font-bold tracking-tight bg-gradient-to-r from-primary/80 to-primary bg-clip-text text-transparent">
              Your Favorites Are Empty
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              It looks like you haven't added any items to your favorites yet. Explore our products
              and click Add to Favorites button to save your favorites here!
            </p>
          </div>

          <Link
            to="/"
            className="mt-6 px-8 py-3 rounded-full transition-all transform hover:scale-105"
            style={{
              backgroundColor: 'var(--primary)',
              color: 'var(--primary-foreground)',
            }}
          >
            <span className="font-medium text-lg">Start Shopping →</span>
          </Link>
        </div>
      </div>
    </div>
  );
};
