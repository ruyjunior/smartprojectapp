import Form from '@/app/(private)/tasks/components/create-form';
import Breadcrumbs from '@/app/ui/breadcrumbs';
import { fetchClients } from '@/app/query/clients/data';
import { fetchContacts} from '@/app/query/contacts/data';
import { fetchProjects } from '@/app/query/projects/data';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Create Task',
};

export default async function Page() {
  const contacts= await fetchContacts();
  const clients = await fetchClients();
  const projects = await fetchProjects();
  const project = projects[0];

  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Tasks', href: '/tasks' },
          {
            label: 'Create Task',
            href: '/tasks/create',
            active: true,
          },
        ]}
      />
      <Form
        contacts={contacts}
        project={project}
      />
    </main>
  );
}