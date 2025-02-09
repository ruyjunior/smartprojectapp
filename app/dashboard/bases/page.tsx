import { Suspense } from 'react';
import { Metadata } from 'next';
import Pagination from '@/app/ui/pagination';
import Search from '@/app/ui/search';
import Table from '@/app/ui/bases/table';
import { CreateBase } from '@/app/ui/bases/buttons';
import { BasesTableSkeleton } from '@/app/ui/bases/skeletons';
import { lusitana } from '@/app/ui/fonts';
import { fetchBasesPages } from '@/app/lib/bases/data';


export const metadata: Metadata = {
  title: 'Bases',
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
    const totalPages = await fetchBasesPages(query);

  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between">
        <h1 className={`${lusitana.className} text-2xl`}>Bases</h1>
      </div>
      <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
        <Search placeholder="Search..." />
        <CreateBase />
      </div>
      {<Suspense key={query + currentPage} fallback={<BasesTableSkeleton />}>
        <Table query={query} currentPage={currentPage} />
      </Suspense> }
      <div className="mt-5 flex w-full justify-center">
        {<Pagination totalPages={totalPages} /> }
      </div>
    </div>
  );
}