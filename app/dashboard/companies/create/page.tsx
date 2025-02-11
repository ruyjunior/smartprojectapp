import Form from '@/app/ui/companies/create-form';
import Breadcrumbs from '@/app/ui/breadcrumbs';
import { fetchBases } from '@/app/lib/bases/data';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Creat Companie',
};

export default async function Page() {
 
  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Companies', href: '/dashboard/companies' },
          {
            label: 'Create Companie',
            href: '/dashboard/companies/create',
            active: true,
          },
        ]}
      />
      <Form />
    </main>
  );
}