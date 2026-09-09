export interface Project {
  id: string;
  title: string;
  description: string;
  tags: string[];
  imageUrl: string;
  sourceUrl?: string;
  liveUrl?: string;
  featured: boolean;
  order: number;
  createdAt: number;
  /** If true, this is shown as an available build/product rather than pure portfolio work. */
  forSale?: boolean;
  /** Display price, e.g. "₹4,999" or "Starts at ₹9,999". Only shown when forSale is true. */
  price?: string;
}

export type ProjectInput = Omit<Project, "id" | "createdAt">;
