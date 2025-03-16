import Form from '@/app/ui/users/create-form';
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
          { label: 'Users', href: '/users' },
          {
            label: 'Create User',
            href: '/users/create',
            active: true,
          },
        ]}
      />
      <Form />
    </main>
  );
}