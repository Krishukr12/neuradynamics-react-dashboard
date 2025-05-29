import { Link } from 'react-router';

export const ProductNotFound = () => {
  return (
    <div className="min-h-[calc(100vh-4rem)] p-8 bg-background text-foreground">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col items-center justify-center min-h-[60vh] text-center space-y-6">
          <div className="relative animate-bounce-slow">
            <svg
              className="w-24 h-24 text-muted-foreground/30 stroke-primary"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M15 7a2 2 0 11-4 0 2 2 0 014 0z"
                className="stroke-destructive"
              />
            </svg>
          </div>

          <div className="space-y-4">
            <h1 className="tracking-tight bg-gradient-to-r from-primary/80 to-primary bg-clip-text">
              Product Not Found
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              We couldn't find the product you're looking for. It might have been moved or no longer
              available.
            </p>
          </div>

          <Link
            to="/"
            className="mt-6 px-8 py-3 rounded-full transition-all transform hover:scale-105 bg-primary text-primary-foreground"
          >
            <span className="font-medium text-lg">Browse Products →</span>
          </Link>
        </div>
      </div>
    </div>
  );
};
