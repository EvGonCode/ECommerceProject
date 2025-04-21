import { IProduct, ProductCatalogCard } from '@/features/product';
import { useTranslations } from 'next-intl';
import React from 'react';

interface ProductListProps {
  products: IProduct[];
}

const ProductList: React.FC<ProductListProps> = ({ products }) => {
  const t = useTranslations('product_catalog_card');

  if (products.length === 0) {
    return (
      <div className="flex justify-center items-center py-12 px-6">
        <p className="text-gray-500 text-lg">{t('notFound')}</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-6 p-6">
      {products.map((product) => (
        <ProductCatalogCard key={product.name} product={product} />
      ))}
    </div>
  );
};

export { ProductList };
