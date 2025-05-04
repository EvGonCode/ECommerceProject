import type { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

const nextConfig: NextConfig = {
  /* config options here */
  env: {
    APP_URL: process.env.APP_URL,
    AUTH_URL: process.env.AUTH_URL,
    SERVER_URL: process.env.SERVER_URL,
  },
};

const withNextIntl = createNextIntlPlugin(
  './src/shared/config/i18n/request.ts'
);

export default withNextIntl(nextConfig);
