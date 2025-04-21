import Image from 'next/image';
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

const newArrivals: NewArrivalItem[] = [
  {
    id: 'retro-dark-lights',
    title: 'PBTfans Retro Dark Lights R2',
    price: {
      value: 15.0,
      prefix: 'From',
    },
    status: 'limited',
    image: '/keyboard-2.webp',
    link: '/shop/retro-dark-lights',
  },
  {
    id: 'agar',
    title: 'Agar',
    price: {
      value: 110.0,
      prefix: 'From',
    },
    status: 'pre-order',
    image: '/keyboard-9.jpg',
    link: '/shop/agar',
  },
  {
    id: 'gmk-cyl',
    title: 'GMK CYL Prussian Blue',
    price: {
      value: 45.0,
      prefix: 'From',
    },
    status: 'group-buy',
    image: '/keyboard-14.jpg',
    link: '/shop/gmk-cyl',
  },
  {
    id: 'gt60-pro',
    title: 'KBDfans x Gateron GT60 PRO Gaming Keyboard Kit',
    price: {
      value: 109.0,
    },
    status: 'limited',
    image: '/keyboard-16.jpg',
    link: '/shop/gt60-pro',
  },
  {
    id: 'venom-60he',
    title: 'KBDfans x Geonworks Venom 60 HE Gaming Keyboard Kit',
    price: {
      value: 65.0,
    },
    status: 'pre-order',
    image: '/keyboard-2.webp',
    link: '/shop/venom-60he',
  },
  {
    id: 'tofu84',
    title: 'Tofu84',
    price: {
      value: 159.0,
    },
    status: 'group-buy',
    image: '/keyboard-12.jpg',
    link: '/shop/tofu84',
  },
];

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

const NewArrivals: React.FC = () => {
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
        {newArrivals.map((item) => (
          <Link
            key={item.id}
            href={item.link}
            className="group rounded-lg overflow-hidden flex flex-col"
          >
            <div className="relative rounded-lg aspect-square overflow-hidden">
              <Image
                src={item.image}
                alt={item.title}
                fill
                className="object-cover rounded-lg transition-transform duration-300 group-hover:scale-105"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 20vw"
              />
            </div>

            <div className="p-2 flex flex-col gap-1.5 flex-grow">
              <StatusBadge status={item.status} />

              <div>
                <h3 className="font-medium text-xs line-clamp-2">
                  {item.title}
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
