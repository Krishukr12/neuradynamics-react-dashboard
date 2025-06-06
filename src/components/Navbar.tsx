import { useState } from 'react';
import { Link } from 'react-router-dom';

interface NavbarProps {
  favoritesCount: number;
}

export const Navbar = ({ favoritesCount }: NavbarProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav
      aria-label="Main navigation"
      className="sticky top-0 z-50 bg-[var(--background)] border-b border-[var(--border)] text-[var(--foreground)]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <Link
            to="/"
            aria-label="UrbanCart Home"
            className="text-2xl font-bold text-[var(--primary)] hover:opacity-80 transition-opacity"
          >
            <div className="flex items-center gap-2">
              <svg
                className="w-6 h-6 stroke-[var(--primary)]"
                fill="none"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
              <span>UrbanCart</span>
            </div>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            <Link
              to="/"
              aria-label="Go to Products"
              className="pb-1 flex items-center gap-2 border-b-2 border-transparent hover:border-[var(--primary)] text-[var(--foreground)] transition-all"
            >
              <svg
                className="w-5 h-5 stroke-[var(--foreground)]"
                fill="none"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                />
              </svg>
              Products
            </Link>

            <Link
              to="/favorites"
              aria-label={`Go to Favorites ${favoritesCount > 0 ? `(${favoritesCount})` : ''}`}
              className="pb-1 flex items-center gap-2 border-b-2 border-transparent hover:border-[var(--primary)] text-[var(--foreground)] transition-all"
            >
              <svg
                className="w-5 h-5 stroke-[var(--foreground)]"
                fill="none"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                />
              </svg>
              Favorites{favoritesCount > 0 && `(${favoritesCount})`}
            </Link>
          </div>

          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              aria-label={isOpen ? 'Close menu' : 'Open menu'}
              className="p-2 rounded-lg border border-[var(--border)] hover:bg-secondary/20 text-[var(--foreground)] transition-colors"
            >
              {isOpen ? (
                <svg
                  className="w-6 h-6 stroke-[var(--foreground)]"
                  fill="none"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  className="w-6 h-6 stroke-[var(--foreground)]"
                  fill="none"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      <div
        className={`md:hidden overflow-hidden transition-all duration-300 border-t border-[var(--border)] bg-[var(--background)] ${
          isOpen ? 'max-h-60' : 'max-h-0'
        }`}
        aria-label="Mobile navigation"
      >
        <div className="px-4 py-3 space-y-3">
          <Link
            to="/"
            onClick={() => setIsOpen(false)}
            aria-label="Go to Products"
            className="flex items-center gap-3 p-3 rounded-lg hover:bg-secondary/20 text-[var(--foreground)] transition-colors"
          >
            <svg
              className="w-5 h-5 stroke-[var(--foreground)]"
              fill="none"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
              />
            </svg>
            Products
          </Link>

          <Link
            to="/favorites"
            onClick={() => setIsOpen(false)}
            aria-label={`Go to Favorites ${favoritesCount > 0 ? `(${favoritesCount})` : ''}`}
            className="flex items-center gap-3 p-3 rounded-lg hover:bg-secondary/20 text-[var(--foreground)] transition-colors"
          >
            <svg
              className="w-5 h-5 stroke-[var(--foreground)]"
              fill="none"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
              />
            </svg>
            Favorites{favoritesCount > 0 && `(${favoritesCount})`}
          </Link>
        </div>
      </div>
    </nav>
  );
};
