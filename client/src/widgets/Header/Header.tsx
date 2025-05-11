'use client';

import { useCartStore } from '@/features/cart/model/cartStore';
import { authService } from '@/shared/api/auth-service';
import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';
import {
  LogOutIcon,
  ShieldIcon,
  ShoppingBagIcon,
  UserIcon,
} from 'lucide-react';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { LocaleSwitcher } from './LocaleSwitcher';
import { Search } from './Search';
const Header = () => {
  const t = useTranslations('header');
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  const cart = useCartStore((state) => state.cart);

  useEffect(() => {
    const accessToken = Cookies.get('accessToken');
    if (accessToken) {
      setIsAdmin(
        jwtDecode<{ role: string }>(accessToken).role.toUpperCase() === 'ADMIN'
      );
      console.log(jwtDecode(accessToken));
    }
    setIsAuthenticated(!!accessToken);
  }, []);

  const handleLogout = async () => {
    await authService.logout(Cookies.get('accessToken') || '');
    setIsAuthenticated(false);
    setIsAdmin(false);
    router.push('/');
  };

  return (
    <header className="bg-black w-full px-12 py-4 h-16 flex flex-1 items-center justify-between">
      <Link href="/" className="bg-white p-px mr-16 rounded-lg">
        <Image
          width={60}
          height={60}
          src="/keyboard.png"
          alt="KBDfans"
          className="h-full"
        />
      </Link>

      <nav className="flex gap-8 w-full">
        <Link
          href="/catalog"
          className="text-white no-underline text-sm relative hover:after:content-[''] hover:after:absolute hover:after:bottom-[-5px] hover:after:left-0 hover:after:w-full hover:after:h-0.5 hover:after:bg-white"
        >
          {t('shop')}
        </Link>
        <Link
          href={{
            pathname: '/catalog',
            query: { category: 'KEYBOARD' },
          }}
          className="text-white no-underline text-sm relative hover:after:content-[''] hover:after:absolute hover:after:bottom-[-5px] hover:after:left-0 hover:after:w-full hover:after:h-0.5 hover:after:bg-white"
        >
          {t('keyboardCategories')}
        </Link>
        <Link
          href={{
            pathname: '/catalog',
            query: { category: 'SWITCH' },
          }}
          className="text-white no-underline text-sm relative hover:after:content-[''] hover:after:absolute hover:after:bottom-[-5px] hover:after:left-0 hover:after:w-full hover:after:h-0.5 hover:after:bg-white"
        >
          {t('switches')}
        </Link>
      </nav>

      <div className="flex flex-shrink-0 w-fit items-center gap-6">
        <LocaleSwitcher />
        <Search />
        {isAdmin ? (
          <>
            <Link href="/admin/dashboard">
              <ShieldIcon className="text-white size-6" />
            </Link>
            <LogOutIcon
              className="text-white size-6 cursor-pointer"
              onClick={handleLogout}
            />
          </>
        ) : isAuthenticated ? (
          <LogOutIcon
            className="text-white size-6 cursor-pointer"
            onClick={handleLogout}
          />
        ) : (
          <Link href="/auth">
            <UserIcon className="text-white size-6" />
          </Link>
        )}
        <Link href="/cart" className="text-white relative">
          <ShoppingBagIcon className="size-6" />
          <span className="absolute -top-2 -right-2 bg-white text-black rounded-full w-[18px] h-[18px] flex items-center justify-center text-xs">
            {cart?.length || 0}
          </span>
        </Link>
      </div>
    </header>
  );
};

export { Header };
