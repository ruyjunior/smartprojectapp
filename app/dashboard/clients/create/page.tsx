import Form from '@/app/ui/clients/create-form';
import Breadcrumbs from '@/app/ui/breadcrumbs';
import { fetchBases } from '@/app/lib/bases/data';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Creat Client',
};

export default async function Page() {
  const bases = await fetchBases();
 
  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Clients', href: '/dashboard/clients' },
          {
            label: 'Create Client',
            href: '/dashboard/clients/create',
            active: true,
          },
        ]}
      />
      <Form bases={bases} />
    </main>
  );
}