import Form from '@/app/ui/invoices/pdf-form';
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

  const company = await  fetchClientById(id);

  if (!company) {
    notFound();
  }

  const [projects, clients, tasks, sprints, employees] = await Promise.all([
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
          { label: `${company.name}` + ' Invoice' , href:  `/clients/${id}/invoice` },
          {
            label: 'Invoice',
            href: `/clients/${id}/invoicePDF`,
            active: true,
          },
        ]}
      />
      <Form/>
    </main>
  );
}