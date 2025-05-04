import { IProduct } from '@/features/product';
import { productService } from '@/shared/api/product-service';
import { KeyboardList, KeyboardSwitches } from '@/widgets';
import { KeyboardCategories } from '@/widgets/KeyboardCategories/KeyboardCategories';
import { NewArrivals } from '@/widgets/NewArrivals/NewArrivals';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Home',
};

const getRandomProducts = (
  products: IProduct[],
  count: number,
  excludeNames: Set<string>,
  category: 'KEYBOARD' | 'SWITCH' | 'ALL'
) => {
  const filtered = products.filter(
    (p) =>
      !excludeNames.has(p.name) &&
      (category === 'ALL' || p.category === category)
  );
  const result: any[] = [];
  const usedIndices = new Set<number>();

  while (result.length < count && usedIndices.size < filtered.length) {
    const randIdx = Math.floor(Math.random() * filtered.length);
    if (!usedIndices.has(randIdx)) {
      usedIndices.add(randIdx);
      result.push(filtered[randIdx]);
      excludeNames.add(filtered[randIdx].name);
    }
  }

  return result;
};

export default async function Home() {
  const products = await productService.getAll();
  const usedNames = new Set<string>();

  const newArrivalsProducts = getRandomProducts(products, 6, usedNames, 'ALL');
  const keyboardListProducts = getRandomProducts(
    products,
    3,
    usedNames,
    'KEYBOARD'
  );
  const keyboardSwitchesProducts = getRandomProducts(
    products,
    6,
    usedNames,
    'SWITCH'
  );

  return (
    <main className="bg-gray-100 p-6 w-full">
      <KeyboardList products={keyboardListProducts} />
      <NewArrivals products={newArrivalsProducts} />
      <KeyboardCategories />
      <KeyboardSwitches products={keyboardSwitchesProducts} />
    </main>
  );
}
