import { APP_METADATA, APP_TITLE } from '@/shared/config';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: {
    default: APP_TITLE as string,
    template: `%s | ${APP_TITLE}`,
  },
  ...APP_METADATA,
};

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
