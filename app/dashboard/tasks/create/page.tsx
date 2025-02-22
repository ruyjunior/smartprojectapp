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
        projects={projects}
      />
    </main>
  );
}