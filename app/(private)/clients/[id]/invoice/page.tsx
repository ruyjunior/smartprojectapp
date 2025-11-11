import Form from '@/app/ui/invoices/table';
import Breadcrumbs from '@/app/ui/breadcrumbs';
import { fetchClientById } from '@/app/query/clients/data';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { fetchProjects } from '@/app/query/projects/data';
import { fetchClients } from '@/app/query/clients/data';
import { fetchContacts} from '@/app/query/contacts/data';
import { fetchTasks } from '@/app/query/tasks/data';
import { fetchSprints } from '@/app/query/sprints/data';


export const metadata: Metadata = {
  title: 'Invoice',
};

export default async function Page(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const id = params.id;

  const client = await  fetchClientById(id);

  if (!client) {
    notFound();
  }

  const [projects, clients, tasks, sprints, contacts] = await Promise.all([
    fetchProjects(),
    fetchClients(),
    fetchTasks(),
    fetchSprints(),
    fetchContacts()
  ]);

  const filteredProjects = projects.filter((p) => p.idclient === id);

  const filteredTasks = tasks.filter((t) => 
    filteredProjects.some((p) => p.id === t.idproject)
  );

  const filteredSprints = sprints.filter((s) =>
    filteredTasks.some((t) => t.id === s.idtask )
  );

  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Clients', href: '/clients' },
          {
            label: `Invoice ${client.name}`,
            href: `/clients/${id}/invoice`,
            active: true,
          },
        ]}
      />
      <Form
        client={client}
        projects={filteredProjects}
        clients={clients}
        tasks={filteredTasks}
        sprints={filteredSprints}
        contacts={contacts}
      />
    </main>
  );
}