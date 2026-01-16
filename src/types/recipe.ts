export interface Recipe {
  id: string;
  title: string;
  slug: string;
  excerpt?: string;
  content: string;
  date: string;
  featuredImage?: {
    node: {
      sourceUrl: string;
      altText: string;
    };
  };
}
