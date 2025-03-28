import Form from '@/app/ui/invoices/pdf-form';
import Breadcrumbs from '@/app/ui/breadcrumbs';
import { fetchCompanyById } from '@/app/lib/companies/data';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { fetchProjects } from '@/app/lib/projects/data';
import { fetchCompanies } from '@/app/lib/companies/data';
import { fetchEmployees } from '@/app/lib/employees/data';
import { fetchTasks } from '@/app/lib/tasks/data';
import { Project } from '@/app/lib/projects/definitions';
import { InvoicePDF } from '@/app/lib/companies/definitions';
import { fetchSprints } from '@/app/lib/sprints/data';

export const metadata: Metadata = {
  title: 'Invoice',
};

export default async function Page(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const id = params.id;

  const [company] = await Promise.all([
    fetchCompanyById(id),
  ]);
  if (!company) {
    notFound();
  }

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

  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Companies', href: '/companies' },
          { label: company.name, href: '/companies/ ' },
          {
            label: 'Invoice',
            href: `/companies/${id}/invoice`,
            active: true,
          },
        ]}
      />
      <Form
        company={company}
        projects={projects}
        companies={companies}
        tasks={tasks}
        sprints={sprints}
        employees={employees}
      />
    </main>
  );
}