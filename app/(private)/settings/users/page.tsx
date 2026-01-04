import { Suspense } from 'react';
import { Metadata } from 'next';
import Pagination from '@/app/ui/pagination';
import Search from '@/app/ui/search';
import Table from './components/table';
import { Create } from '@/app/ui/buttons';
import { UsersTableSkeleton } from './components/skeletons';
import { fetchUsersPages } from '@/app/query/users/data';
import Breadcrumbs from '@/app/ui/breadcrumbs';
import { CurrentUser } from '@/app/utils/utils';
import SuccessMsg from '@/app/ui/successMsg';

export const metadata: Metadata = {
  title: 'Users',
};

export default async function Page(props: {
  searchParams?: Promise<{
    query?: string;
    page?: string;
    success?: string;
  }>;
}) {
  const searchParams = await props.searchParams;
  const query = searchParams?.query || '';
  const currentPage = Number(searchParams?.page) || 1;
  const totalPages = await fetchUsersPages(query);
  const user = await CurrentUser();

  return (
    <div className="w-full">
      {SuccessMsg(searchParams)}

      <Breadcrumbs
        breadcrumbs={[
          { label: 'Settings', href: '/settings' },
          { label: 'Users', href: `/settings/users`, active: true },
        ]}
      />

      {user?.role === 'admin' && (
        <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
          <Search placeholder="Search..." />
          <Create href='/settings/users/create' />
        </div>
      )}

      {<Suspense key={query + currentPage} fallback={<UsersTableSkeleton />}>
        <Table query={query} currentPage={currentPage} />
      </Suspense>}

      {user?.role === 'admin' && (
        <div className="mt-5 flex w-full justify-center">
          {<Pagination totalPages={totalPages} />}
        </div>
      )}
    </div>
  );
} 