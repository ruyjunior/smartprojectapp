import Form from '@/app/(private)/contacts/components/edit-form';
import Breadcrumbs from '@/app/ui/breadcrumbs';
import { fetchContactById } from '@/app/query/contacts/data';
import { fetchClients } from '@/app/query/clients/data';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { CurrentCompanyId } from '@/app/utils/utils';

export const metadata: Metadata = {
  title: 'Edit Contacts',
};

export default async function Page(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const id = params.id;
  const [contact, clients] = await Promise.all([
    fetchContactById(id),
    fetchClients(),
  ]);
  if (!contact) {
    notFound();
  }
  const idcompany = await CurrentCompanyId();

  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Contacts', href: '/contacts' },
          {
            label: 'Edit Contact',
            href: `/contacts/${id}/edit`,
            active: true,
          },
        ]}
      />
      <Form
        idcompany={idcompany}
        contact={contact} clients={clients} 
      />
    </main>
  );
}