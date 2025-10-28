import Form from '@/app/(private)/contacts/components/create-form';
import Breadcrumbs from '@/app/ui/breadcrumbs';
import { fetchClients } from '@/app/query/clients/data';
import { Metadata } from 'next';
import { CurrentCompanyId } from '@/app/utils/utils';

export const metadata: Metadata = {
  title: 'Creat Contacts',
};

export default async function Page() {
  const clients = await fetchClients();
  const idcompany = await CurrentCompanyId();

  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Contacts', href: '/contacts' },
          {
            label: 'Create Contacts',
            href: '/contacts/create',
            active: true,
          },
        ]}
      />
      <Form clients={clients} idcompany={idcompany} />
    </main>
  );
}