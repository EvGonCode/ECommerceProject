'use client';

import { useCartStore } from '@/features/cart/model/cartStore';
import { Button } from '@/shared/ui';

const CartPage = () => {
  const cart = useCartStore((state) => state.cart);
  const changeQuantity = useCartStore((state) => state.changeQuantity);
  const deleteCart = useCartStore((state) => state.deleteCart);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">Cart</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {!!cart.length ? (
          cart.map((item) => (
            <div
              key={item.name}
              className="flex px-4 py-2 bg-neutral-100 items-center gap-4"
            >
              <img
                src={item.images[0]}
                alt={item.name}
                width={80}
                className="rounded-lg"
                height={80}
              />
              <div className="flex w-full flex-col gap-1">
                <h2 className="text-base font-bold">{item.name}</h2>
                <p className="text-sm text-gray-500">${item.price}</p>
                <p className="text-sm text-gray-500">
                  Quantity: {item.quantity}
                </p>
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
          ))
        ) : (
          <div className="flex justify-center items-center py-12 w-full col-span-full">
            <p className="text-gray-500 text-lg">Cart is empty</p>
          </div>
        )}
      </div>
    </div>
  );
};

export { CartPage };
