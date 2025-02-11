import { Suspense } from 'react';
import { Metadata } from 'next';
import Pagination from '@/app/ui/pagination';
import Search from '@/app/ui/search';
import Table from '@/app/ui/policies/table';
import { CreatePolicie } from '@/app/ui/policies/buttons';
import { PoliciesTableSkeleton } from '@/app/ui/policies/skeletons';
import { lusitana } from '@/app/ui/fonts';
import { fetchPoliciesPages } from '@/app/lib/policies/data';
import NavLinks from '@/app/ui/policies/nav-links';


export const metadata: Metadata = {
  title: 'Policies',
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
    const totalPages = await fetchPoliciesPages(query);

  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between">
        <h1 className={`${lusitana.className} text-2xl`}>Policies</h1>
      </div>
      <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
        <Search placeholder="Search..." />
        <CreatePolicie />
      </div>
      {<Suspense key={query + currentPage} fallback={<PoliciesTableSkeleton />}>
        <Table query={query} currentPage={currentPage} />
      </Suspense> }
      <div className="mt-5 flex w-full justify-center">
        {<Pagination totalPages={totalPages} /> }
      </div>
      <NavLinks />
    </div>
  );
}