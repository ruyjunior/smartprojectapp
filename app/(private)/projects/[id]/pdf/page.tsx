import Form from '../../components/pdf-form';
import Breadcrumbs from '@/app/ui/breadcrumbs';
import { fetchProjectById } from '@/app/query/projects/data';
import { fetchClients } from '@/app/query/clients/data';
import { fetchTasksByProject } from '@/app/query/tasks/data';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { fetchContacts } from '@/app/query/contacts/data';
import { fetchSprints } from '@/app/query/sprints/data';
import { CurrentCompany } from '@/app/utils/utils';

export const metadata: Metadata = {
  title: 'Print PDF Projects',
};

export default async function Page(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const id = params.id;
  const [project, clients, tasks, contacts, company] = await Promise.all([
    fetchProjectById(id),
    fetchClients(),
    fetchTasksByProject(id),
    fetchContacts(),
    CurrentCompany()
  ]);
  const sprints = await fetchSprints();
  if (!project) {
    notFound();
  }

  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Projects', href: '/projects' },
          {
            label: 'View',
            href: `/projects/${id}/view`,
            
          },
          {
            label: 'PDF',
            href: `/projects/${id}/pdf`,
            active: true,
          },
        ]}
      />
      <Form
        project={project}
        company={company}
        tasks={tasks}
        clients={clients}
        contacts={contacts}
        sprints={sprints}
      />
    </main>
  );
}