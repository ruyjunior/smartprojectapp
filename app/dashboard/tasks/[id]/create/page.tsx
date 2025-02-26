import Form from '@/app/ui/tasks/create-form';
import Breadcrumbs from '@/app/ui/breadcrumbs';
import { fetchCompanies } from '@/app/lib/companies/data';
import { fetchEmployees } from '@/app/lib/employees/data';
import { fetchProjects } from '@/app/lib/projects/data';
import { fetchProjectById } from '@/app/lib/projects/data';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Creat Task',
};

export default async function Page(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const id = params.id;

  const employees = await fetchEmployees();
  const companies = await fetchCompanies();
  const project = await fetchProjectById(id);

  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Tasks', href: '/dashboard/tasks' },
          {
            label: 'Create Task',
            href: '/dashboard/tasks/create',
            active: true,
          },
        ]}
      />
      <Form
        employees={employees}
        project={project}
      />
    </main>
  );
}