import Form from '@/app/ui/tasks/create-form';
import Breadcrumbs from '@/app/ui/breadcrumbs';
import { fetchCompanies } from '@/app/lib/companies/data';
import { fetchEmployees } from '@/app/lib/employees/data';
import { fetchProjects } from '@/app/lib/projects/data';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Creat Task',
};

export default async function Page() {
  const employees = await fetchEmployees();
  const companies = await fetchCompanies();
  const projects = await fetchProjects();
  const project = projects[0];

  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Tasks', href: '/tasks' },
          {
            label: 'Create Task',
            href: '/tasks/create',
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