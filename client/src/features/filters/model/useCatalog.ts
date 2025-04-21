'use client';
import { IProduct } from '@/features/product';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

export type SortOption =
  | 'price-asc'
  | 'price-desc'
  | 'name-asc'
  | 'name-desc'
  | 'created-asc'
  | 'created-desc';
export type StockFilter = 'all' | 'in-stock' | 'out-of-stock';

export interface FiltersState {
  priceRange: [number, number];
  brand: string | null;
  stock: StockFilter;
  sort: SortOption | null;
}

export const useCatalog = ({
  initialProducts,
}: {
  initialProducts: IProduct[];
}) => {
  const products = [...initialProducts];
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const priceStats = useMemo(() => {
    const prices = products.map((product) => product.price);
    return {
      min: Math.min(...prices),
      max: Math.max(...prices),
    };
  }, [products]);

  const [filters, setFilters] = useState<FiltersState>(() => {
    const priceMin = searchParams.get('priceMin');
    const priceMax = searchParams.get('priceMax');
    const brand = searchParams.get('brand');
    const stock = searchParams.get('stock') as StockFilter | null;
    const sort = searchParams.get('sort') as SortOption | null;

    return {
      priceRange: [
        priceMin ? Number(priceMin) : [priceStats.min, priceStats.max][0],
        priceMax ? Number(priceMax) : [priceStats.min, priceStats.max][1],
      ],
      brand,
      stock: stock || 'all',
      sort,
    };
  });

  useEffect(() => {
    const params = new URLSearchParams();

    if (filters.priceRange[0] !== priceStats.min) {
      params.set('priceMin', String(filters.priceRange[0]));
    }

    if (filters.priceRange[1] !== priceStats.max) {
      params.set('priceMax', String(filters.priceRange[1]));
    }

    if (filters.brand) {
      params.set('brand', filters.brand);
    }

    if (filters.stock !== 'all') {
      params.set('stock', filters.stock);
    }

    if (filters.sort) {
      params.set('sort', filters.sort);
    }

    const queryString = params.toString();
    const newUrl = queryString ? `${pathname}?${queryString}` : pathname;

    router.replace(newUrl);
  }, [filters, pathname, router]);

  const brands = useMemo(() => {
    const brandsSet = new Set(products.map((product) => product.brand));
    return Array.from(brandsSet);
  }, [products]);

  const isInitialized = useRef(false);

  useEffect(() => {
    if (
      !isInitialized.current &&
      filters.priceRange[0] === 0 &&
      filters.priceRange[1] === 1000
    ) {
      isInitialized.current = true;
      setFilters((prev) => ({
        ...prev,
        priceRange: [priceStats.min, priceStats.max],
      }));
    }
  }, [priceStats, filters.priceRange]);

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      if (
        product.price < filters.priceRange[0] ||
        product.price > filters.priceRange[1]
      ) {
        return false;
      }

      if (filters.brand && product.brand !== filters.brand) {
        return false;
      }

      if (filters.stock === 'in-stock' && !product.inStock) {
        return false;
      }
      if (filters.stock === 'out-of-stock' && product.inStock) {
        return false;
      }

      return true;
    });
  }, [products, filters.priceRange, filters.brand, filters.stock]);

  const sortedProducts = useMemo(() => {
    if (!filters.sort) return filteredProducts;

    return [...filteredProducts].sort((a, b) => {
      switch (filters.sort) {
        case 'price-asc':
          return a.price - b.price;
        case 'price-desc':
          return b.price - a.price;
        case 'name-asc':
          return a.name.localeCompare(b.name);
        case 'name-desc':
          return b.name.localeCompare(a.name);
        case 'created-asc':
          return (
            new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
          );
        case 'created-desc':
          return (
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          );
        default:
          return 0;
      }
    });
  }, [filteredProducts, filters.sort]);

  const handlePriceChange = useCallback((value: number[]) => {
    setFilters((prev) => ({ ...prev, priceRange: value as [number, number] }));
  }, []);

  const handleBrandChange = useCallback((value: string | null) => {
    setFilters((prev) => ({ ...prev, brand: value }));
  }, []);

  const handleStockFilterChange = useCallback((value: StockFilter) => {
    setFilters((prev) => ({ ...prev, stock: value }));
  }, []);

  const handleSortChange = useCallback((value: SortOption | null) => {
    setFilters((prev) => ({ ...prev, sort: value }));
  }, []);

  const resetFilters = useCallback(() => {
    setFilters({
      priceRange: [priceStats.min, priceStats.max],
      brand: null,
      stock: 'all',
      sort: null,
    });
  }, [priceStats]);

  return {
    priceRange: filters.priceRange,
    selectedBrand: filters.brand,
    stockFilter: filters.stock,
    sortOption: filters.sort,

    products: sortedProducts,
    brands,
    priceStats,
    totalProducts: products.length,
    filteredCount: sortedProducts.length,

    handlePriceChange,
    handleBrandChange,
    handleStockFilterChange,
    handleSortChange,
    resetFilters,
  };
};
