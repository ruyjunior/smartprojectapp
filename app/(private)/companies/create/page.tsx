import Form from '@/app/ui/companies/create-form';
import Breadcrumbs from '@/app/ui/breadcrumbs';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Creat Companie',
};

export default async function Page() {
 
  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Companies', href: '/companies' },
          {
            label: 'Create Companie',
            href: '/companies/create',
            active: true,
          },
        ]}
      />
      <Form />
    </main>
  );
}