import Form from '../../components/edit-form';
import Breadcrumbs from '@/app/ui/breadcrumbs';
import { fetchProjectById } from '@/app/query/projects/data';
import { fetchClients } from '@/app/query/clients/data';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { fetchContacts } from '@/app/query/contacts/data';
import { CurrentCompanyId } from '@/app/utils/utils';
import { fetchClientsByIdProjects } from '@/app/query/clients/data';
import { fetchContactsByIdProjects } from '@/app/query/contacts/data';
import { fetchUsersByIdProjects } from '@/app/query/users/data';
import { fetchUsers } from '@/app/query/users/data';

export const metadata: Metadata = {
  title: 'Edit Projects',
};

export default async function Page(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const id = params.id;

  const [project, contacts, clients, users, projectClients, projectContacts, projectUsers] = await Promise.all([
    fetchProjectById(id),
    fetchContacts(),
    fetchClients(),
    fetchUsers(),
    fetchClientsByIdProjects(id),
    fetchContactsByIdProjects(id),
    fetchUsersByIdProjects(id),
  ]);
  if (!project) {
    notFound();
  }

  //console.log('Project Clients:', projectClients);
  //console.log('Project Contacts:', projectContacts);

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
        project={project}
        contacts={contacts}
        users={users}
        clients={clients}
        selectedClients={projectClients}
        selectedContacts={projectContacts}
        selectedUsers={projectUsers}
      />
    </main>
  );
}