import { IProduct } from '@/features/product';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/shared/ui';
import Image from 'next/image';
import Link from 'next/link';

const KeyboardSwitches = ({ products }: { products: IProduct[] }) => {
  const switches = products
    .filter((product) => product.category === 'SWITCH')
    .map((s) => ({
      ...s,
      price: {
        value: s.price,
        prefix: '$',
      },
    }));
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
              <CarouselItem
                key={item.createdAt + item.name}
                className="md:basis-1/5 xl:basis-1/6"
              >
                <Link
                  href={{ pathname: '/catalog', query: { category: 'SWITCH' } }}
                >
                  <div className="rounded-lg text-center overflow-hidden">
                    <div className="relative rounded-lg aspect-square overflow-hidden bg-gray-50">
                      <Image
                        src={item.images[0]}
                        alt={item.name}
                        fill
                        className="object-cover rounded-lg transition-transform duration-300 group-hover:scale-105"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 20vw"
                      />
                    </div>

                    <div className="py-1">
                      <h3 className="font-medium text-xs line-clamp-1 mb-1">
                        {item.name}
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
