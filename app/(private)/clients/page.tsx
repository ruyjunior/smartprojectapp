import { Suspense } from 'react';
import { Metadata } from 'next';
import Pagination from '@/app/ui/pagination';
import Search from '@/app/ui/search';
import Table from './components/table';
import { Create } from '@/app/ui/buttons';

import { ClientsTableSkeleton } from './components/skeletons';
import { lusitana } from '@/app/ui/fonts';
import { fetchClientsPages } from '@/app/query/clients/data';


export const metadata: Metadata = {
  title: 'Clients',
};

export default async function Page(props: {
      searchParams?: Promise<{
        query?: string;
        page?: string;
      }>;
    }) {
    const searchParams = await props.searchParams;
    const query = searchParams?.query || '';
    const currentPage = Number(searchParams?.page) || 1;
    const totalPages = await fetchClientsPages(query);

  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between">
        <h1 className={`${lusitana.className} text-2xl`}>Clients</h1>
      </div>
      <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
        <Search placeholder="Search..." />
        <Create href="/clients/create" />
      </div>
      {<Suspense key={query + currentPage} fallback={<ClientsTableSkeleton />}>
        <Table query={query} currentPage={currentPage} />
      </Suspense> }
      <div className="mt-5 flex w-full justify-center">
        {<Pagination totalPages={totalPages} /> }
      </div>
    </div>
  );
}