import Form from '@/app/(private)/tasks/components/create-form';
import Breadcrumbs from '@/app/ui/breadcrumbs';
import { fetchClients } from '@/app/query/clients/data';
import { fetchContacts} from '@/app/query/contacts/data';
import { fetchProjectById } from '@/app/query/projects/data';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Creat Task',
};

export default async function Page(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const id = params.id;

  const contacts= await fetchContacts();
  const clients = await fetchClients();
  const project = await fetchProjectById(id);

  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Projects', href: `/projects` },
          { label: `Project: ${project.title}`, href: `/projects/${project.id}/view` },
          {
            label: 'Create Task',
            href: `/tasks/${id}/create`,
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