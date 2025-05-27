export interface ProductRating {
  rate: number;
  count: number;
}

export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: ProductRating;
}

export interface ProductsState {
  items: Product[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

