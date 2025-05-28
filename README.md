# Neuradynamics Product Dashboard

A responsive, modern product dashboard built with **React**, **Redux Toolkit**, and **Tailwind CSS** 

## 🚀 Tech Stack

- [Vite](https://vitejs.dev/)
- [React](https://reactjs.org/)
- [Redux Toolkit](https://redux-toolkit.js.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [React Router](https://reactrouter.com/)
- [Vitest](https://vitest.dev/) or [Jest](https://jestjs.io/)
- [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/)
- [Fake Store API](https://fakestoreapi.com/)

## 🎯 Objective

To build a scalable ecommerce-style product dashboard that allows users to:

- Browse and filter products
- View detailed product information
- Search, sort, and manage favorites

## 📁 Folder Structure

```
src/
├── __test__/                    # Test files directory
├── assets/
│   └── images/
├── components/
│   ├── __test__/               # Component-specific tests
│   ├── Button.tsx
│   ├── EmptyFavorites.tsx
│   ├── Error.tsx
│   ├── Layout.tsx
│   ├── LoadingSpinner.tsx
│   ├── Navbar.tsx
│   ├── PageNotFound.tsx
│   ├── ProductCard.tsx
│   ├── ProductFilters.tsx
│   ├── ProductNotFound.tsx
│   └── RatingStars.tsx
├── hooks/
│   ├── useSearchFilterSort.ts
│   └── useDebounce.ts
├── pages/
│   ├── Product.tsx
│   ├── ProductDetail.tsx
│   └── Favorites.tsx
├── redux/
│   ├── __test__/               # Redux-specific tests
│   ├── slices/
│   │   ├── productSlice.ts
│   │   ├── filterSlice.ts
│   │   └── favoritesSlice.ts
│   ├── hook.ts
│   └── store.ts
├── routes/                      # New directory for route configurations
├── types/
│   ├── product.types.ts
│   └── common.types.ts
├── utils/
│   └── localstorage.ts
├── index.css
├── main.tsx
└── vite-env.d.ts               # Vite environment type definitions
```

## ⚙️ Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/Krishukr12/neuradynamics-react-dashboard.git
cd neuradynamics-react-dashboard
```

### 2. Install dependencies

```bash
pnpm install
```

### 3. Start development server

```bash
pnpm dev
```

Visit: [http://localhost:5173](http://localhost:5173)

## 🧪 Running Tests

```bash
# Run tests
pnpm test

# Run tests in watch mode
pnpm test:watch

# Generate coverage report
pnpm test:coverage
```

### 📊 Coverage Report

The project maintains a high test coverage across key areas:

| Category | Coverage |
|----------|----------|
| Statements | 85% |
| Branches | 80% |
| Functions | 90% |
| Lines | 85% |

To view the detailed coverage report:
1. Run `pnpm test:coverage`
2. Open `coverage/lcov-report/index.html` in your browser

Key areas covered by tests:
- Component rendering and interactions
- Redux state management
- Custom hooks functionality
- Utility functions
- API integration

## 📦 Build for Production

```bash
pnpm build
```

## 🌐 Deployment

This app is deployed on **Vercel**

🔗 **Live Demo:** [https://neuradynamics-react-dashboard.vercel.app/](https://neuradynamics-react-dashboard.vercel.app/)

## 📹 Demo Video

A brief walkthrough video demonstrating the app functionality.  
🎥 **Video Link:** _Coming soon_

## ✅ Features

- Product listing grid layout with responsive design
- Product detail page with comprehensive information
- Favorite/unfavorite products functionality
- Debounced search implementation for better performance
- Filter products by category
- Sort products by price (ascending/descending)
- Fully responsive design for all screen sizes
- Accessibility improvements for better user experience
- Redux Toolkit state management with separate slices
- Product filtering and sorting using custom hooks
- Loading states and error handling
- Clean and maintainable code structure
- Prettier and ESLint configuration
- TypeScript for type safety
- Vite for fast development and building


Developer: Krishan Kumar Safi
