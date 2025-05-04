export type ProductCategory = 'KEYBOARD' | 'SWITCH';

export interface IProduct {
  // id: string;
  name: string;
  description: string;
  price: number;
  images: string[];
  brand: string;
  inStock: boolean;
  category: ProductCategory;
  createdAt: string;
}

export interface ICreateProduct {
  name: string;
  description: string;
  price: number;
  images: string[];
  brand: string;
  inStock: boolean;
  category: ProductCategory;
}
