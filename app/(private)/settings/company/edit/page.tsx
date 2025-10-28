import { Suspense } from 'react';
import { Metadata } from 'next';
import { lusitana } from '@/app/ui/fonts';
import Breadcrumbs from '@/app/ui/breadcrumbs';
import Form from '../components/edit-form';
import { fetchCompanyById } from '@/app/query/companies/data';
import { CurrentCompanyId } from '@/app/utils/utils';

export const metadata: Metadata = {
  title: 'Company',
};

export default async function Page() {
  const idcompany = await CurrentCompanyId();
  const company = await fetchCompanyById(idcompany);

  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Settings', href: '/settings' },
          { label: 'Company', href: '/settings/company' },
          {
            label: 'Edit Company',
            href: `/settings/company/edit`,
            active: true,
          },
        ]}
      />
      <Form company={company} />
    </main>
  );
}
