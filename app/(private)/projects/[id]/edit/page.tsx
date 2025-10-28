import Form from '../../components/edit-form';
import Breadcrumbs from '@/app/ui/breadcrumbs';
import { fetchProjectById } from '@/app/query/projects/data';
import { fetchClients } from '@/app/query/clients/data';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { fetchContacts } from '@/app/query/contacts/data';
import { CurrentCompanyId } from '@/app/utils/utils';

export const metadata: Metadata = {
  title: 'Edit Projects',
};

export default async function Page(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const id = params.id;
  const idcompany = await CurrentCompanyId();

  const [project, contacts, clients] = await Promise.all([
    fetchProjectById(id),
    fetchContacts(),
    fetchClients(),
  ]);
  if (!project) {
    notFound();
  }

  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Projects', href: '/projects' },
          {
            label: 'Edit Project',
            href: `/projects/${id}/edit`,
            active: true,
          },
        ]}
      />
      <Form
        idcompany={idcompany}
        project={project}
        contacts={contacts}
        clients={clients}
      />
    </main>
  );
}