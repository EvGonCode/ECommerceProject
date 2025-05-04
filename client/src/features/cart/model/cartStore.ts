import { IProduct } from '@/features/product';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

interface ICartItem extends IProduct {
  quantity: number;
}

interface CartState {
  cart: ICartItem[];
  updateCart: (item: ICartItem) => void;
  createCart: (item: ICartItem) => void;
  deleteCart: (id: string) => void;
  changeQuantity: ({
    name,
    variant,
  }: {
    name: string;
    variant: 'increment' | 'decrement';
  }) => void;
  reset: () => void;
}

export const useCartStore = create<CartState>()(
  persist(
    (set) => ({
      cart: [],
      updateCart: (item) => {
        set((state) => ({
          cart: state.cart.map((ct) =>
            ct.name === item.name ? { ...item } : ct
          ),
        }));
      },
      createCart: (item) => {
        set((state) => ({
          cart: [...state.cart, item],
        }));
      },
      deleteCart: (name: string) => {
        set((state) => ({
          cart: state.cart.filter((ct) => ct.name !== name),
        }));
      },
      changeQuantity: ({
        name,
        variant,
      }: {
        name: string;
        variant: 'increment' | 'decrement';
      }) => {
        set((state) => {
          const updatedCart = state.cart
            .map((ct) => {
              if (ct.name === name) {
                const newQuantity =
                  variant === 'increment' ? ct.quantity + 1 : ct.quantity - 1;
                return { ...ct, quantity: newQuantity };
              }
              return ct;
            })
            .filter((ct) => ct.quantity > 0);

          return { cart: updatedCart };
        });
      },
      reset: () => set({ cart: [] }),
    }),
    {
      name: 'cart',
      version: 1,
      storage: createJSONStorage(() => localStorage),
    }
  )
);
