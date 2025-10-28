import Form from '../components/create-form';
import Breadcrumbs from '@/app/ui/breadcrumbs';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Creat User',
};

export default async function Page() {
 
  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Users', href: '/settings/users' },
          {
            label: 'Create User',
            href: '/settings/users/create',
            active: true,
          },
        ]}
      />
      <Form />
    </main>
  );
}