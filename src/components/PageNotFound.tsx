import { Link } from 'react-router-dom';

export const PageNotFound = () => {
  return (
    <div className="min-h-[calc(100vh-4rem)] p-8 bg-background text-foreground">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col items-center justify-center min-h-[80vh] text-center space-y-6">
          <div className="relative animate-bounce-slow">
            <svg className="w-32 h-32 text-[color:var(--primary)]" fill="none" viewBox="0 0 24 24">
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <div className="absolute -top-6 -right-6 text-6xl font-bold bg-gradient-to-r from-primary/80 to-primary bg-clip-text text-transparent">
              404
            </div>
          </div>

          <div className="space-y-4">
            <h1 className="text-5xl font-bold tracking-tight bg-gradient-to-r from-primary/80 to-primary bg-clip-text text-transparent">
              Page Not Found
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              The page you're looking for doesn't exist or has been moved. Let's get you back to
              familiar territory.
            </p>
          </div>

          <Link
            to="/"
            className="mt-6 px-8 py-3 rounded-full transition-transform transform hover:scale-105 flex items-center gap-2 bg-[color:var(--primary)] text-[color:var(--primary-foreground)]"
          >
            <svg
              className="w-5 h-5 stroke-[color:var(--primary-foreground)]"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
              />
            </svg>
            <span className="font-medium text-lg">Return Home</span>
          </Link>
        </div>
      </div>
    </div>
  );
};
