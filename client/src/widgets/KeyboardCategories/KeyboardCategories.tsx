import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

interface CategoryItem {
  id: string;
  title: string;
  image: string;
  link: string;
}

const categories: CategoryItem[] = [
  {
    id: 'keycaps',
    title: 'Keycaps',
    image: '/keyboard-1.webp',
    link: '/categories/keycaps',
  },
  {
    id: 'keyboards',
    title: 'Keyboards',
    image: '/keyboard-2.webp',
    link: '/categories/diy-kit',
  },
  {
    id: 'full-kit',
    title: 'Full Kit',
    image: '/keyboard-6.webp',
    link: '/categories/full-kit',
  },
];

const CategoryCard: React.FC<{ category: CategoryItem }> = ({ category }) => {
  return (
    <Link
      href={category.link}
      className="group relative block aspect-[16/9] overflow-hidden rounded-lg"
    >
      {/* Изображение */}
      <Image
        src={category.image}
        alt={category.title}
        fill
        className="object-cover transition-transform duration-500 group-hover:scale-105"
        sizes="(max-width: 768px) 100vw, 50vw"
      />

      {/* Затемнение */}
      <div className="absolute inset-0 bg-black/20" />

      {/* Контент */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
        <h3 className="text-4xl font-bold mb-6">{category.title}</h3>
        <button className="bg-black/80 px-8 py-3 rounded text-sm uppercase tracking-wider hover:bg-black transition-colors">
          MORE
        </button>
      </div>
    </Link>
  );
};

const KeyboardCategories: React.FC = () => {
  return (
    <section className="py-16">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 px-4">
        {categories.map((category) => (
          <CategoryCard key={category.id} category={category} />
        ))}
      </div>
    </section>
  );
};

export { KeyboardCategories };
