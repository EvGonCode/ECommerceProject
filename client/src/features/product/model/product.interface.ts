export interface IProduct {
  // id: string;
  name: string;
  description: string;
  price: number;
  images: string[];
  brand: string;
  inStock: boolean;
  category: string;
  createdAt: string;
}

export interface ICreateProduct {
  name: string;
  description: string;
  price: number;
  images: string[];
  brand: string;
  inStock: boolean;
  category: 'KEYBOARD' | 'SWITCH';
}
