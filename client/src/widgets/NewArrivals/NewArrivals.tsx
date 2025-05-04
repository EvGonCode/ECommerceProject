import { IProduct } from '@/features/product';
import Link from 'next/link';
import React from 'react';

interface NewArrivalItem {
  id: string;
  title: string;
  price: {
    value: number;
    prefix?: string;
  };
  status: 'limited' | 'pre-order' | 'group-buy';
  image: string;
  link: string;
}

const StatusBadge: React.FC<{ status: NewArrivalItem['status'] }> = ({
  status,
}) => {
  const badges = {
    limited: {
      text: '⚡ Limited In-stock',
      className: 'bg-zinc-800 text-cyan-400',
    },
    'pre-order': {
      text: '🛒 PRE-ORDER',
      className: 'bg-zinc-800 text-white',
    },
    'group-buy': {
      text: '● GROUP BUY IS LIVE',
      className: 'bg-zinc-800 text-green-400',
    },
  };

  const badge = badges[status];

  return (
    <div
      className={`${badge.className} px-2 py-0.5 rounded text-[10px] font-medium w-fit`}
    >
      {badge.text}
    </div>
  );
};

const NewArrivals = ({ products }: { products: IProduct[] }) => {
  const transformedProducts = products.map((product) => ({
    ...product,
    status:
      Math.random() < 0.33
        ? 'limited'
        : Math.random() < 0.5
        ? 'pre-order'
        : 'group-buy',
    price: {
      value: product.price,
      prefix: 'From',
    },
  }));

  return (
    <section className="py-16">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold">New arrival</h2>
        <Link
          href="/shop"
          className="text-gray-500 text-xs hover:text-gray-800 hover:underline"
        >
          Shop now
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-6 gap-6 px-4">
        {transformedProducts.map((item) => (
          <Link
            key={item.createdAt + item.name}
            href={'/catalog'}
            className="group rounded-lg overflow-hidden flex flex-col"
          >
            <div className="relative rounded-lg aspect-square overflow-hidden">
              <img
                src={item.images[0]}
                alt={item.name}
                width={270}
                height={270}
                className="object-cover w-[270px] h-[270px] rounded-lg transition-transform duration-300 group-hover:scale-105"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 20vw"
              />
            </div>

            <div className="p-2 flex flex-col gap-1.5 flex-grow">
              <StatusBadge status={item.status as NewArrivalItem['status']} />

              <div>
                <h3 className="font-medium text-xs line-clamp-2">
                  {item.name}
                </h3>

                <div className="mt-auto text-xs">
                  {item.price.prefix && <span>{item.price.prefix} </span>}$
                  {item.price.value.toFixed(2)}
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export { NewArrivals };
