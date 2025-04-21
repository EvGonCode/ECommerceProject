'use client';

import { useCartStore } from '@/features/cart/model/cartStore';
import { Link } from '@/shared/config';
import { Button } from '@/shared/ui';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { toast } from 'sonner';
import { IProduct } from '../model/product.interface';

const ProductCatalogCard = ({ product }: { product: IProduct }) => {
  const createCart = useCartStore((state) => state.createCart);
  const cart = useCartStore((state) => state.cart);
  const t = useTranslations('product_catalog_card');

  const isInCart = cart.some((item) => item.name === product.name);

  const handleAddToCart = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    createCart({ ...product, quantity: 1 });
    toast.success(t('addToCartSuccess'));
  };

  return (
    <Link
      href={`/catalog/${product.name}`}
      className="group flex flex-col h-full overflow-hidden rounded-lg transition-all duration-300"
    >
      <div className="aspect-square w-full overflow-hidden bg-gray-100">
        <Image
          src={product.images[0]}
          alt={product.name}
          width={400}
          height={400}
          className="h-full w-full object-cover object-center transition-transform duration-300 group-hover:scale-105"
        />
      </div>

      <div className="flex flex-col p-2 flex-grow">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-medium text-gray-500">
            {product.brand}
          </span>
          <div
            className={`px-2.5 py-0.5 rounded-full text-xs ${
              product.inStock
                ? 'bg-green-100 text-green-800'
                : 'bg-red-100 text-red-800'
            }`}
          >
            {product.inStock ? t('inStock') : t('outOfStock')}
          </div>
        </div>

        <h2 className="text-sm text-center font-medium text-gray-900 mb-1">
          {product.name}
        </h2>
        <p className="text-xs text-center text-gray-500 mb-1 flex-grow">
          {product.description}
        </p>

        <div className="flex items-center justify-around mt-auto">
          <span className="text-sm font-bold">${product.price.toFixed(2)}</span>
          <Button size="xs" variant="default" onClick={handleAddToCart}>
            {isInCart ? t('inCart') : t('addToCart')}
          </Button>
        </div>
      </div>
    </Link>
  );
};

export { ProductCatalogCard };
