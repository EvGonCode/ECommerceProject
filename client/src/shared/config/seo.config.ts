import { Metadata } from 'next';

export const enum APP_NAME {
  FULL = 'KBDShop',
  SHORT = 'KBDShop',
}

export const APP_URL = process.env.APP_URL as string;

const SEO = {
  CREATOR: 'svyatoslavw',
  GITHUB_URL: 'https://github.com/EvGonCode/ECommerceProject',
  SITE_KEYWORDS: [
    'KBDShop',
    'Keyboards',
    'Keycaps',
    'DIY Kits',
    'Full Kits',
    'Switches',
    'Accessories',
    'Customization',
    'Keyboard categories',
    'Keyboard switches',
    'Keyboard keycaps',
  ],
};

export const APP_TITLE = `${APP_NAME.SHORT} - Your keyboard shop`;

export const APP_METADATA: Metadata = {
  description: 'AI-powered resume builder',
  icons: {
    icon: '/keyboard.png',
    shortcut: '/keyboard.png',
  },
  metadataBase: new URL(APP_URL),
  applicationName: APP_NAME.SHORT,
  creator: SEO.CREATOR,
  authors: {
    name: SEO.CREATOR,
    url: SEO.GITHUB_URL,
  },
  keywords: SEO.SITE_KEYWORDS,
  openGraph: {
    type: 'website',
    description: 'AI-powered resume builder for job seekers',
    url: APP_URL,
    locale: 'en-US',
    siteName: APP_NAME.SHORT,
    emails: `example@${APP_NAME.SHORT}`,
    images: [
      {
        url: `${APP_URL}/keyboard.png`,
        width: 640,
        height: 640,
        alt: APP_NAME.FULL,
      },
    ],
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
    title: APP_NAME.SHORT,
    startupImage: {
      url: '/keyboard.png',
    },
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: APP_URL,
  },
};
