import Form from '@/app/ui/projects/create-form';
import Breadcrumbs from '@/app/ui/breadcrumbs';
import { fetchCompanies } from '@/app/lib/companies/data';
import { fetchEmployees } from '@/app/lib/employees/data';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Creat Proposal',
};

export default async function Page() {
  const employees = await fetchEmployees();
  const companies = await fetchCompanies();

  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Projects', href: '/projects' },
          {
            label: 'Create Projects',
            href: '/projects/create',
            active: true,
          },
        ]}
      />
      <Form
        employees={employees}
        companies={companies}
      />
    </main>
  );
}