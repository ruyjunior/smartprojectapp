import Form from '@/app/ui/employees/create-form';
import Breadcrumbs from '@/app/ui/breadcrumbs';
import { fetchCompanies } from '@/app/lib/companies/data';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Creat Employees',
};

export default async function Page() {
  const companies = await fetchCompanies();

  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Employeess', href: '/employees' },
          {
            label: 'Create Employees',
            href: '/employeess/create',
            active: true,
          },
        ]}
      />
      <Form companies={companies} />
    </main>
  );
}