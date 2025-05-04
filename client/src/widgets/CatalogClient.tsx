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

  const {
    products: filteredProducts,
    selectedCategory,
    handleCategoryChange,
    ...rest
  } = useCatalog({
    initialProducts,
  });

  return (
    <>
      <ProductFilters
        products={filteredProducts}
        selectedCategory={selectedCategory}
        handleCategoryChange={handleCategoryChange}
        {...rest}
      />
      <ProductList products={filteredProducts} />
    </>
  );
};
