'use client';

import { useCatalog } from '@/features/filters';
import { IProduct } from '@/features/product';
import { ProductFilters, ProductList } from '@/widgets';
import { useState } from 'react';

interface CatalogClientProps {
  products: IProduct[];
}

export const CatalogClient = ({ products }: CatalogClientProps) => {
  const [initialProducts] = useState<IProduct[]>(products);

  const { products: filteredProducts, ...rest } = useCatalog({
    initialProducts,
  });

  return (
    <>
      <ProductFilters products={filteredProducts} {...rest} />
      <ProductList products={filteredProducts} />
    </>
  );
};
