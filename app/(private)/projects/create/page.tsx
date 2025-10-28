import Form from '../components/create-form';
import Breadcrumbs from '@/app/ui/breadcrumbs';
import { fetchClients } from '@/app/query/clients/data';
import { fetchContacts, fetchContactsByClientId } from '@/app/query/contacts/data';
import { Metadata } from 'next';
import { CurrentCompanyId } from '@/app/utils/utils';

export const metadata: Metadata = {
  title: 'Create Project',
};

export default async function Page() {
  const idcompany = await CurrentCompanyId();
  const contacts = await fetchContacts();
  const clients = await fetchClients();
  
  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Projects', href: '/projects' },
          {
            label: 'Create Projects',
            href: '/projects/create',
            active: true,
          },
        ]}
      />
      <Form
        idcompany={idcompany}
        contacts={contacts}
        clients={clients}
      />
    </main>
  );
}