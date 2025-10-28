import { Suspense } from 'react';
import { Metadata } from 'next';
import { lusitana } from '@/app/ui/fonts';
import Breadcrumbs from '@/app/ui/breadcrumbs';
import { CurrentCompanyId } from '@/app/utils/utils';
import { fetchCompanyById } from '@/app/query/companies/data';
import Table  from './components/table';

export const metadata: Metadata = {
  title: 'Company',
};

export default async function Page() {
  const idcomapany = await CurrentCompanyId();
  const company = await fetchCompanyById(idcomapany);

  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Settings', href: '/settings' },
          {
            label: 'Company',
            href: `/settings/company`,
            active: true,
          },
        ]}
      />
      <Suspense>
        <Table company={company} />
      </Suspense>
    </main>
  );
}