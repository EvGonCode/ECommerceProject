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
    priceRange,
    selectedBrand,
    stockFilter,
    sortOption,
    brands,
    priceStats,
    totalProducts,
    filteredCount,
    handlePriceChange,
    handleBrandChange,
    handleSortChange,
    handleStockFilterChange,
    resetFilters,
  } = useCatalog({
    initialProducts,
  });

  return (
    <>
      <ProductFilters
        products={initialProducts}
        priceRange={priceRange}
        selectedBrand={selectedBrand}
        stockFilter={stockFilter}
        sortOption={sortOption}
        brands={brands}
        priceStats={priceStats}
        totalProducts={totalProducts}
        filteredCount={filteredCount}
        handlePriceChange={handlePriceChange}
        handleBrandChange={handleBrandChange}
        handleSortChange={handleSortChange}
        handleStockFilterChange={handleStockFilterChange}
        resetFilters={resetFilters}
      />
      <ProductList products={filteredProducts} />
    </>
  );
};
