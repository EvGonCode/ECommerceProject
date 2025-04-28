import { AdminPage } from '@/widgets';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Admin',
};

export default function AdminDashboard() {
  return <AdminPage />;
}
