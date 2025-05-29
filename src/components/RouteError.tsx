import { useRouteError, isRouteErrorResponse } from 'react-router-dom';

export const RouteError = () => {
  const error = useRouteError();
  let errorMessage = '';

  if (isRouteErrorResponse(error)) {
    errorMessage = error.statusText;
  } else if (error instanceof Error) {
    errorMessage = error.message;
  } else if (typeof error === 'string') {
    errorMessage = error;
  } else {
    errorMessage = 'Unknown error';
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background text-foreground p-4">
      <div className="max-w-md w-full bg-card border border-border rounded-xl p-6 shadow-lg">
        <h1 className="text-2xl font-bold text-destructive mb-4">Oops! Something went wrong.</h1>

        <div className="bg-muted text-muted-foreground rounded-lg p-4 mb-6 font-mono text-sm">
          {errorMessage}
        </div>

        <p className="mb-6">Please try refreshing the page or return to the homepage.</p>

        <a
          href="/"
          className="bg-primary text-primary-foreground px-4 py-2 rounded-lg hover:brightness-95 transition-all"
        >
          Go to Homepage
        </a>
      </div>
    </div>
  );
};
