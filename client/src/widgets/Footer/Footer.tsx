'use client';

import {
  Facebook,
  Github,
  Instagram,
  Mail,
  MapPin,
  Phone,
  Twitter,
} from 'lucide-react';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const Footer: React.FC = () => {
  const t = useTranslations('footer');

  return (
    <footer className="bg-black text-white pt-10 pb-4">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* О компании */}
          <div>
            <div className="flex items-center mb-4">
              <div className="bg-white p-px rounded-lg mr-2">
                <Image
                  width={30}
                  height={30}
                  src="/keyboard.png"
                  alt="KBDfans"
                />
              </div>
              <h3 className="text-lg font-bold">KBRD FANS</h3>
            </div>
            <p className="text-gray-400 text-xs mb-4">{t('description')}</p>
            <div className="flex space-x-4">
              <a
                href="https://facebook.com"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <Facebook size={16} />
              </a>
              <a
                href="https://twitter.com"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <Twitter size={16} />
              </a>
              <a
                href="https://instagram.com"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <Instagram size={16} />
              </a>
              <a
                href="https://github.com"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <Github size={16} />
              </a>
            </div>
          </div>

          {/* Разделы магазина */}
          <div>
            <h3 className="text-xs font-semibold mb-4">{t('shopSections')}</h3>
            <ul className="space-y-2 text-xs">
              <li>
                <Link
                  href="/shop"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  {t('allProducts')}
                </Link>
              </li>
              <li>
                <Link
                  href="/catalog"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  {t('keyboardCategories')}
                </Link>
              </li>
              <li>
                <Link
                  href="/group-buy"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  {t('newArrivals')}
                </Link>
              </li>
              <li>
                <Link
                  href="/ready-to-use"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  {t('switches')}
                </Link>
              </li>
              <li>
                <Link
                  href="/sale"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  {t('sale')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Информация */}
          <div>
            <h3 className="text-xs font-semibold mb-4">{t('info')}</h3>
            <ul className="space-y-2 text-xs">
              <li>
                <Link
                  href="/about"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  {t('about')}
                </Link>
              </li>
              <li>
                <Link
                  href="/shipping"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  {t('shipping')}
                </Link>
              </li>
              <li>
                <Link
                  href="/return-policy"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  {t('returns')}
                </Link>
              </li>
              <li>
                <Link
                  href="/privacy-policy"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  {t('privacy')}
                </Link>
              </li>
              <li>
                <Link
                  href="/faq"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  {t('faq')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Контакты */}
          <div>
            <h3 className="text-xs font-semibold mb-4">{t('contacts')}</h3>
            <ul className="space-y-3 text-xs">
              <li className="flex items-start">
                <MapPin
                  size={16}
                  className="text-gray-400 mr-2 mt-1 flex-shrink-0"
                />
                <span className="text-gray-400">{t('address')}</span>
              </li>
              <li className="flex items-center">
                <Phone size={16} className="text-gray-400 mr-2 flex-shrink-0" />
                <a
                  href="tel:+380991234567"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  +38 (099) 123-45-67
                </a>
              </li>
              <li className="flex items-center">
                <Mail size={16} className="text-gray-400 mr-2 flex-shrink-0" />
                <a
                  href="mailto:info@kbdfans.com"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  info@kbdfans.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-6 pt-3">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-xs">
              {t('copyright', { year: new Date().getFullYear() })}
            </p>
            <div className="flex space-x-4">
              <Link
                href="/terms"
                className="text-gray-400 text-xs hover:text-white transition-colors"
              >
                {t('terms')}
              </Link>
              <Link
                href="/privacy"
                className="text-gray-400 text-xs hover:text-white transition-colors"
              >
                {t('confidentiality')}
              </Link>
              <Link
                href="/cookies"
                className="text-gray-400 text-xs hover:text-white transition-colors"
              >
                Cookies
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export { Footer };
