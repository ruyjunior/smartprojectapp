import Form from '@/app/(private)/files/components/create-form';
import Breadcrumbs from '@/app/ui/breadcrumbs';
import { fetchClients } from '@/app/query/clients/data';
import { fetchContacts } from '@/app/query/contacts/data';
import { fetchProjectById } from '@/app/query/projects/data';
import { Metadata } from 'next';
import { CurrentUser } from '@/app/utils/utils';

export const metadata: Metadata = {
  title: 'Creat File',
};

export default async function Page(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const id = params.id;
  const project = await fetchProjectById(id);

  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Projects', href: `/projects` },
          { label: `Project: ${project.title}`, href: `/projects/${project.id}/files` },
          {
            label: 'Create File',
            href: `/files/${id}/create`,
            active: true,
          },
        ]}
      />
      <Form project={project} />
    </main>
  );
}