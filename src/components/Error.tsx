import { Link } from 'react-router-dom';

export const Error = () => {
  return (
    <div className="min-h-[calc(100vh-4rem)] p-8 bg-background text-foreground">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col items-center justify-center min-h-[60vh] text-center space-y-6">
          <div className="relative animate-bounce-slow">
            <svg className="w-24 h-24 stroke-[var(--destructive)]" fill="none" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M12 12h.01"
                className="stroke-[var(--primary)]"
              />
            </svg>
          </div>

          <div className="space-y-4">
            <h1 className="text-4xl font-bold tracking-tight bg-gradient-to-r from-destructive/80 to-destructive bg-clip-text text-transparent">
              Something Went Wrong
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              We're having trouble loading this content. Please try again later or contact support
              if the problem persists.
            </p>
          </div>

          <div className="flex gap-4">
            <button
              onClick={() => window.location.reload()}
              className="px-6 py-3 rounded-full transition-all transform hover:scale-105 bg-[var(--primary)] text-[var(--primary-foreground)]"
            >
              Try Again
            </button>
            <Link
              to="/"
              className="px-6 py-3 rounded-full transition-all transform hover:scale-105 border border-[var(--primary)] text-[var(--primary)]"
            >
              Return to Safety
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
