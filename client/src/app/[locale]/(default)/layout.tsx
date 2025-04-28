import { APP_TITLE, APP_METADATA } from '@/shared/config';
import { Footer, Header } from '@/widgets';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: {
    default: APP_TITLE as string,
    template: `%s | ${APP_TITLE}`,
  },
  ...APP_METADATA,
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <div className="min-h-screen flex-1">{children}</div>
      <Footer />
    </>
  );
}
