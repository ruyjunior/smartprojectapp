import Form from '@/app/ui/invoices/pdf-form';
import Breadcrumbs from '@/app/ui/breadcrumbs';
import { fetchCompanyById } from '@/app/lib/companies/data';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { fetchProjects } from '@/app/lib/projects/data';
import { fetchCompanies } from '@/app/lib/companies/data';
import { fetchEmployees } from '@/app/lib/employees/data';
import { fetchTasks } from '@/app/lib/tasks/data';
import { fetchSprints } from '@/app/lib/sprints/data';


export const metadata: Metadata = {
  title: 'Invoice',
};

export default async function Page(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const id = params.id;

  const company = await  fetchCompanyById(id);

  if (!company) {
    notFound();
  }

  const [projects, companies, tasks, sprints, employees] = await Promise.all([
    fetchProjects(),
    fetchCompanies(),
    fetchTasks(),
    fetchSprints(),
    fetchEmployees()
  ]);

  const filteredProjects = projects.filter((p) => p.idtaker === id);

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
          { label: 'Companies', href: '/companies' },
          { label: `${company.name}` + ' Invoice' , href:  `/companies/${id}/invoice`, active: true },
          {
            label: 'Invoice',
            href: `/companies/${id}/invoicePDF`,
            active: true,
          },
        ]}
      />
      <Form/>
    </main>
  );
}