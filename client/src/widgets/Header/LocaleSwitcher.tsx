'use client';

import { usePathname } from '@/shared/config';

import { useRouter } from '@/shared/config';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/shared/ui';
import { Locale } from 'next-intl';
import { useParams } from 'next/navigation';
import { useTransition } from 'react';

const LocaleSwitcher = () => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const pathname = usePathname();
  const params = useParams();

  function handleChangeLocale(value: string) {
    const nextLocale = value as Locale;
    startTransition(() => {
      router.replace(
        // @ts-expect-error -- TypeScript will validate that only known `params`
        { pathname, params },
        { locale: nextLocale }
      );
    });
  }

  return (
    <Select
      disabled={isPending}
      value={params.locale as Locale}
      onValueChange={(value) => handleChangeLocale(value)}
    >
      <SelectTrigger className="w-[230px] !text-[12px] [&_svg]:text-white [&_svg]:opacity-100 [&_svg]:stroke-2 [&_svg]:stroke-white text-white border-none focus-visible:ring-0 focus-visible:ring-offset-0">
        <SelectValue placeholder="Language" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem className="text-[12px]" value="en">
          UNITED STATES (USD $)
        </SelectItem>
        <SelectItem className="text-[12px]" value="ua">
          УКРАЇНА (UAH ₴)
        </SelectItem>
      </SelectContent>
    </Select>
  );
};

export { LocaleSwitcher };
