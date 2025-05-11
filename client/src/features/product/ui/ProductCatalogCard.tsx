'use client';

import { useCartStore } from '@/features/cart/model/cartStore';
import { Button } from '@/shared/ui';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/shared/ui/dialog';
import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';
import { TrashIcon } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { IProduct } from '../model/product.interface';

const ProductCatalogCard = ({ product }: { product: IProduct }) => {
  const createCart = useCartStore((state) => state.createCart);
  const cart = useCartStore((state) => state.cart);
  const t = useTranslations('product_catalog_card');
  const [isOpen, setIsOpen] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const accessToken = Cookies.get('accessToken');
    if (accessToken) {
      setIsAdmin(
        jwtDecode<{ role: string }>(accessToken).role.toUpperCase() === 'ADMIN'
      );
    }
  }, []);

  const isInCart = cart.some((item) => item.name === product.name);

  const handleAddToCart = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    createCart({ ...product, quantity: 1 });
    toast.success(t('addToCartSuccess'));
  };

  const handleDelete = () => {
    // TODO: Implement delete functionality
    toast.success('Product deleted successfully');
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <div
        onClick={() => setIsOpen(true)}
        className="group flex flex-col h-full overflow-hidden rounded-lg transition-all duration-300 cursor-pointer"
      >
        <div className="aspect-square w-full overflow-hidden bg-gray-100">
          <img
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
            <span className="text-sm font-bold">
              ${product.price.toFixed(2)}
            </span>
          </div>
        </div>
      </div>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>{product.name}</DialogTitle>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <div className="aspect-square w-full overflow-hidden bg-gray-100 rounded-lg">
            <img
              src={product.images[0]}
              alt={product.name}
              className="h-full w-full object-cover object-center"
            />
          </div>

          <div className="grid gap-2">
            <div className="flex items-center justify-between">
              <span className="font-medium text-gray-500">{product.brand}</span>
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

            <p className="text-gray-500">{product.description}</p>

            <div className="flex items-center justify-between">
              <span className="text-lg font-bold">
                ${product.price.toFixed(2)}
              </span>
            </div>
          </div>
        </div>

        <DialogFooter>
          <div className="flex gap-2 justify-end w-full">
            {isAdmin && (
              <Button variant="destructive" size="sm" onClick={handleDelete}>
                <TrashIcon className="size-4 mr-2" />
                Delete Product
              </Button>
            )}
            <Button
              disabled={isInCart}
              size="sm"
              variant="default"
              onClick={handleAddToCart}
            >
              {isInCart ? t('inCart') : t('addToCart')}
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export { ProductCatalogCard };
