'use client';

import { useCartStore } from '@/features/cart/model/cartStore';
import { Button } from '@/shared/ui';
import { Metadata } from 'next';
import Image from 'next/image';

export const metadata: Metadata = {
  title: 'Cart',
};

export default function Cart() {
  const cart = useCartStore((state) => state.cart);
  const changeQuantity = useCartStore((state) => state.changeQuantity);
  const deleteCart = useCartStore((state) => state.deleteCart);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">Cart</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {cart.map((item) => (
          <div
            key={item.name}
            className="flex px-4 py-2 bg-neutral-100 items-center gap-4"
          >
            <Image
              src={item.images[0]}
              alt={item.name}
              width={80}
              className="rounded-lg"
              height={80}
            />
            <div className="flex w-full flex-col gap-1">
              <h2 className="text-base font-bold">{item.name}</h2>
              <p className="text-sm text-gray-500">${item.price}</p>
              <p className="text-sm text-gray-500">Quantity: {item.quantity}</p>
            </div>
            <div className="flex items-center flex-col gap-1">
              <Button
                onClick={() => deleteCart(item.name)}
                size="xs"
                variant="default"
              >
                Remove
              </Button>
              <div className="flex items-center gap-1">
                <Button
                  onClick={() =>
                    changeQuantity({ name: item.name, variant: 'increment' })
                  }
                  size="xs"
                  variant="default"
                >
                  +
                </Button>
                <Button
                  onClick={() =>
                    changeQuantity({ name: item.name, variant: 'decrement' })
                  }
                  size="xs"
                  variant="default"
                >
                  -
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
