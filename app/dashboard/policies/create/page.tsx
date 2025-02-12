import Form from '@/app/ui/policies/create-form';
import Breadcrumbs from '@/app/ui/breadcrumbs';
import { fetchBases } from '@/app/lib/bases/data';
import { Metadata } from 'next';
import { fetchCompanies } from '@/app/lib/companies/data';

export const metadata: Metadata = {
  title: 'Creat Policie',
};

export default async function Page() {
  const companies = await fetchCompanies();
  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Policies', href: '/dashboard/policies' },
          {
            label: 'Create Policie',
            href: '/dashboard/policies/create',
            active: true,
          },
        ]}
      />
      <Form companies={companies} />
    </main>
  );
}