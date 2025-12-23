import Form from '@/app/(private)/payments/components/create-form';
import Breadcrumbs from '@/app/ui/breadcrumbs';
import { fetchClients } from '@/app/query/clients/data';
import { fetchContacts} from '@/app/query/contacts/data';
import { fetchProjectById } from '@/app/query/projects/data';
import { Metadata } from 'next';
import { CurrentUser } from '@/app/utils/utils';

export const metadata: Metadata = {
  title: 'Creat Payment',
};

export default async function Page(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const id = params.id;
  const project = await fetchProjectById(id);
  const user = await CurrentUser();

  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Projects', href: `/projects` },
          { label: `Payments Project: ${project.title}`, href: `/projects/${project.id}/payments` },
          {
            label: 'Create Payment',
            href: `/payments/${id}/create`,
            active: true,
          },
        ]}
      />
      <Form
        project={project}
        user={user}
      />
    </main>
  );
}