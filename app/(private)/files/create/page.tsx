import Form from '@/app/(private)/files/components/create-form';
import Breadcrumbs from '@/app/ui/breadcrumbs';
import { fetchClients } from '@/app/query/clients/data';
import { fetchContacts } from '@/app/query/contacts/data';
import { fetchProjects } from '@/app/query/projects/data';
import { Metadata } from 'next';
import { CurrentUser } from '@/app/utils/utils';

export const metadata: Metadata = {
  title: 'Create File',
};

export default async function Page() {

  const contacts = await fetchContacts();
  const clients = await fetchClients();
  const projects = await fetchProjects();
  const project = projects[0];
  const user = await CurrentUser();

  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Files', href: '/files' },
          {
            label: 'Create File',
            href: '/files/create',
            active: true,
          },
        ]}
      />
      <Form
        project={project}
      />
    </main>
  );
}