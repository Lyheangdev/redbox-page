export interface ProductProps {
  id: number;
  images: [string];
  title?: String;
  description?: string;
  pricing?: string;
  socialMedia?: [string];
  relatedProductId?: [number];
  isRelatedProduct?: boolean; /* this value is used to change the clipboard copy in related product */
}
