import { CartPage } from '@/widgets';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Cart',
};

export default function Cart() {
  return <CartPage />;
}
