import { Footer, Header } from '@/widgets';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <div className="min-h-screen flex-1">{children}</div>
      <Footer />
    </>
  );
}
