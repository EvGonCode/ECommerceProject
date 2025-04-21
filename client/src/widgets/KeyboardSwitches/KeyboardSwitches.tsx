import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/shared/ui';
import Image from 'next/image';
import Link from 'next/link';

interface SwitchItem {
  id: string;
  title: string;
  brand: string;
  model: string;
  price: {
    value: number;
    prefix?: string;
  };
  image: string;
  link: string;
}

const switches: SwitchItem[] = [
  {
    id: 'cherry-black-mx',
    title: 'Cherry Black MX Hyperglide linear switches MX1A-11NW',
    brand: 'Cherry',
    model: 'MX1A-11NW',
    price: {
      value: 3.0,
    },
    image: '/switch-1.webp',
    link: '/switches/cherry-black-mx',
  },
  {
    id: 'sonja-linear',
    title: 'Siliworks Sonja Linear Switches',
    brand: 'HMX',
    model: 'Sonja Linear',
    price: {
      value: 2.8,
    },
    image: '/switch-2.webp',
    link: '/switches/sonja-linear',
  },
  {
    id: 'magnetic-switches',
    title: 'Magnetic Switches x 65',
    brand: 'KBDfans',
    model: 'Magnetic',
    price: {
      value: 29.25,
      prefix: 'From',
    },
    image: '/switch-3.webp',
    link: '/switches/magnetic',
  },
  {
    id: 'skyline-magnetic',
    title: 'Skyline Magnetic Switches',
    brand: 'third party',
    model: 'Skyline',
    price: {
      value: 4.5,
    },
    image: '/switch-1.webp',
    link: '/switches/skyline-magnetic',
  },
  {
    id: 'nap-linear',
    title: 'Siliworks×Napworks Nap Linear Switches',
    brand: 'HMX',
    model: 'Nap Linear',
    price: {
      value: 2.5,
    },
    image: '/switch-2.webp',
    link: '/switches/nap-linear',
  },
  {
    id: 'cherry-red-mx',
    title: 'Cherry Red MX Hyperglide linear switches MX1A-11NW',
    brand: 'Cherry',
    model: 'MX1A-11NW',
    price: {
      value: 3.0,
    },
    image: '/switch-1.webp',
    link: '/switches/cherry-red-mx',
  },
  {
    id: 'cherry-blue-mx',
    title: 'Cherry Blue MX Hyperglide linear switches MX1A-11NW',
    brand: 'Cherry',
    model: 'MX1A-11NW',
    price: {
      value: 3.0,
    },
    image: '/switch-1.webp',
    link: '/switches/cherry-blue-mx',
  },
];

const KeyboardSwitches = () => {
  return (
    <section className="py-12">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-medium">Keyboard switches</h2>
        <Link
          href="/switches"
          className="text-gray-500 text-xs hover:text-gray-800 hover:underline"
        >
          Shop now
        </Link>
      </div>
      <div className="flex w-full px-10 justify-center">
        <Carousel>
          <CarouselPrevious />
          <CarouselContent className="">
            {switches.map((item) => (
              <CarouselItem key={item.id} className="md:basis-1/5 xl:basis-1/6">
                <Link href={item.link}>
                  <div className="rounded-lg text-center overflow-hidden">
                    <div className="relative rounded-lg aspect-square overflow-hidden bg-gray-50">
                      <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        className="object-cover rounded-lg transition-transform duration-300 group-hover:scale-105"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 20vw"
                      />
                    </div>

                    <div className="py-1">
                      <h3 className="font-medium text-xs line-clamp-1 mb-1">
                        {item.title}
                      </h3>

                      <div className="text-[10px]">{item.brand}</div>

                      <div className="text-[10px] font-medium">
                        {item.price.prefix && <span>{item.price.prefix} </span>}
                        ${item.price.value.toFixed(2)}
                      </div>
                    </div>
                  </div>
                </Link>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselNext />
        </Carousel>
      </div>
    </section>
  );
};

export { KeyboardSwitches };
