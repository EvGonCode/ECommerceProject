import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

interface KeyboardItem {
  product_id: string;
  name: string;
  description?: string;
  image: string;
  link: string;
}

const keyboards: KeyboardItem[] = [
  {
    product_id: 'gt-60',
    name: '[Pre-order] GT-60',
    description: 'Compatible with Wooting 60HE / Venom 60HE / M61 Lite+, etc',
    image: '/keyboard-1.webp',
    link: '/keyboards/gt-60',
  },
  {
    product_id: 'agar',
    name: '[Pre-order] Agar',
    description: 'Compatible with Wooting 60HE / Venom 60HE / M61 Lite+, etc',
    image: '/keyboard-2.webp',
    link: '/keyboards/agar',
  },
  {
    product_id: 'tofu84',
    name: 'Tofu84',
    description: '75% DIY Mechanical Keyboard Kit',
    image: '/keyboard-14.jpg',
    link: '/keyboards/tofu84',
  },
];

const KeyboardList: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6">
      {keyboards.map((keyboard) => (
        <Link
          key={keyboard.product_id}
          href={keyboard.link}
          className="group relative block overflow-hidden rounded-lg bg-gray-100 transition-all duration-300 hover:shadow-xl"
        >
          <div className="aspect-[16/8] w-full overflow-hidden">
            <Image
              src={keyboard.image}
              alt={keyboard.name}
              width={800}
              height={450}
              className="h-full w-full object-cover object-center transition-transform duration-300 group-hover:scale-105"
            />
          </div>
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6 text-white">
            <div className="flex flex-col gap-2 items-center justify-center">
              <h2 className="text-xl font-bold">{keyboard.product_id}</h2>
              {keyboard.product_id && (
                <p className="text-[10px] text-gray-200">
                  {keyboard.product_id}
                </p>
              )}
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
