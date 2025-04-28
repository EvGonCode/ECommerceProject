import { KeyboardList, KeyboardSwitches } from '@/widgets';
import { KeyboardCategories } from '@/widgets/KeyboardCategories/KeyboardCategories';
import { NewArrivals } from '@/widgets/NewArrivals/NewArrivals';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Home',
};

export default async function Home() {
  return (
    <main className="bg-gray-100 p-6 w-full">
      <KeyboardList />
      <NewArrivals />
      <KeyboardCategories />
      <KeyboardSwitches />
    </main>
  );
}
