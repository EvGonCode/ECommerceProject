import { IProduct } from '@/features/product';
import Link from 'next/link';

const KeyboardList = ({ products }: { products: IProduct[] }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6">
      {products.map((product) => (
        <Link
          key={product.createdAt + product.name}
          href="/catalog"
          className="group relative block overflow-hidden rounded-lg bg-gray-100 transition-all duration-300 hover:shadow-xl"
        >
          <div className="aspect-[16/8] w-full overflow-hidden">
            <img
              src={product.images[0]}
              alt={product.name}
              width={800}
              height={450}
              className="h-full w-full object-cover object-center transition-transform duration-300 group-hover:scale-105"
            />
          </div>
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6 text-white">
            <div className="flex flex-col gap-2 items-center justify-center">
              <span className="inline-block text-sm font-semibold text-white hover:underline">
                Buy now
              </span>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export { KeyboardList };
