'use client';

import { SortOption, StockFilter } from '@/features/filters/model/useCatalog';
import { IProduct } from '@/features/product';
import { debounce } from '@/shared/lib/utils';
import {
  Button,
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
  Slider,
} from '@/shared/ui';
import { useTranslations } from 'next-intl';
import { useCallback, useEffect, useRef, useState } from 'react';

interface ProductFiltersProps {
  products: IProduct[];
  priceRange: [number, number];
  selectedBrand: string | null;
  stockFilter: StockFilter;
  sortOption: SortOption | null;
  brands: string[];
  priceStats: { min: number; max: number };
  totalProducts: number;
  filteredCount: number;
  handlePriceChange: (value: [number, number]) => void;
  handleBrandChange: (value: string | null) => void;
  handleSortChange: (value: SortOption | null) => void;
  handleStockFilterChange: (value: StockFilter) => void;
  resetFilters: () => void;
}

const ProductFilters = ({
  priceRange,
  selectedBrand,
  stockFilter,
  sortOption,
  brands,
  priceStats,
  totalProducts,
  filteredCount,
  handlePriceChange: onPriceChange,
  handleBrandChange: onBrandChange,
  handleSortChange: onSortChange,
  handleStockFilterChange: onStockFilterChange,
  resetFilters,
}: ProductFiltersProps) => {
  const t = useTranslations('product_filters');

  const [tempPriceRange, setTempPriceRange] =
    useState<[number, number]>(priceRange);

  const prevPriceRangeRef = useRef<[number, number]>(priceRange);

  useEffect(() => {
    if (
      prevPriceRangeRef.current[0] !== priceRange[0] ||
      prevPriceRangeRef.current[1] !== priceRange[1]
    ) {
      setTempPriceRange(priceRange);
      prevPriceRangeRef.current = priceRange;
    }
  }, [priceRange]);

  const debouncedPriceChange = useCallback(
    debounce((value: number[]) => {
      onPriceChange(value as [number, number]);
    }, 1000),
    [onPriceChange]
  );

  const handlePriceChange = (value: number[]) => {
    setTempPriceRange(value as [number, number]);
    debouncedPriceChange(value);
  };

  const handleAvailabilityChange = (value: string) => {
    if (value === 'all' || value === 'in-stock' || value === 'out-of-stock') {
      onStockFilterChange(value as StockFilter);
    }
  };

  const handleBrandChange = (value: string) => {
    onBrandChange(value === 'all' ? null : value);
  };

  const handleSortChange = (value: string) => {
    onSortChange(value as SortOption);
  };

  return (
    <div className="p-6">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-xl font-semibold">{t('catalog')}</h2>
        <div className="text-sm text-gray-500">
          {t('show', { filteredCount, totalProducts })}
        </div>
      </div>

      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 mb-6">
        <div className="flex flex-wrap gap-4 w-full lg:w-auto">
          <Select value={stockFilter} onValueChange={handleAvailabilityChange}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder={t('availability')} />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>{t('availability')}</SelectLabel>
                <SelectItem value="all">{t('all')}</SelectItem>
                <SelectItem value="in-stock">{t('inStock')}</SelectItem>
                <SelectItem value="out-of-stock">{t('outOfStock')}</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>

          <Select
            value={selectedBrand || 'all'}
            onValueChange={handleBrandChange}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder={t('brand')} />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>{t('brand')}</SelectLabel>
                <SelectItem value="all">{t('all_brands')}</SelectItem>
                {brands.map((brand) => (
                  <SelectItem key={brand} value={brand}>
                    {brand}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>

          <Select
            value={`${tempPriceRange[0]}-${tempPriceRange[1]}`}
            onValueChange={() => {}}
          >
            <SelectTrigger className="w-[180px]">
              {`$${tempPriceRange[0]} - $${tempPriceRange[1]}`}
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>{t('priceRange')}</SelectLabel>
                <div className="px-4 pt-5 pb-2 w-72">
                  <Slider
                    min={priceStats.min}
                    max={priceStats.max}
                    step={5}
                    value={tempPriceRange}
                    onValueChange={handlePriceChange}
                    className="mb-4"
                  />
                  <div className="flex justify-between items-center">
                    <div className="text-xs font-medium">
                      ${tempPriceRange[0]}
                    </div>
                    <div className="text-xs font-medium">
                      ${tempPriceRange[1]}
                    </div>
                  </div>
                </div>
              </SelectGroup>
            </SelectContent>
          </Select>

          <Button
            variant="outline"
            onClick={resetFilters}
            className="whitespace-nowrap"
          >
            {t('reset')}
          </Button>
        </div>

        <Select value={sortOption || ''} onValueChange={handleSortChange}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder={t('sortBy')} />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>{t('sortBy')}</SelectLabel>
              <SelectItem value="price-asc">{t('priceAsc')}</SelectItem>
              <SelectItem value="price-desc">{t('priceDesc')}</SelectItem>
              <SelectItem value="name-asc">{t('nameAsc')}</SelectItem>
              <SelectItem value="name-desc">{t('nameDesc')}</SelectItem>
              <SelectItem value="created-asc">{t('createdAsc')}</SelectItem>
              <SelectItem value="created-desc">{t('createdDesc')}</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export { ProductFilters };
