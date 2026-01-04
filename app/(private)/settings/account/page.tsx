import { Suspense } from 'react';
import { Metadata } from 'next';
import Table from './components/table';
import { TableSkeleton } from './components/skeletons';
import Breadcrumbs from '@/app/ui/breadcrumbs';
import { fetchCredits, fetchCreditsByEmail } from '@/app/query/credit/data';
import CreditComponent from './components/creditComponent';
import PricingTable from '@/app/(public)/plans/pricingTable';
import { CurrentUser } from '@/app/utils/utils';

export const metadata: Metadata = {
  title: 'Conta',
};

export default async function Page() {
  const currentUser = await CurrentUser();
  let credits = [];

  if (currentUser?.role === 'admin') {
    credits = await fetchCredits();
  } else {
    credits = await fetchCreditsByEmail(currentUser.email);
  }

  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between">
        <Breadcrumbs
          breadcrumbs={[
            { label: 'Settings', href: `/settings` },
            { label: 'Account', href: `/settings/account`, active: true },
          ]}
        />
      </div>
      {<Suspense fallback={<TableSkeleton />}>
        {currentUser && currentUser.role === 'admin' &&
          <CreditComponent credits={credits} />
        }
        <Table credits={credits} />
        {currentUser && currentUser.role === 'admin' &&
          <PricingTable />
        }
      </Suspense>}
    </div>
  );
}