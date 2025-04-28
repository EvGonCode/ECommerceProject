import { AuthPage } from '@/widgets';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Auth',
};

export default function Auth() {
  return <AuthPage />;
}
