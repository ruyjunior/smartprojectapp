import { Suspense } from 'react';
import { Metadata } from 'next';
import Pagination from '@/app/ui/pagination';
import Search from '@/app/ui/search';
import Table from '@/app/ui/companies/table';
import { CreateCompanie } from '@/app/ui/companies/buttons';
import { CompaniesTableSkeleton } from '@/app/ui/companies/skeletons';
import { lusitana } from '@/app/ui/fonts';
import { fetchCompaniesPages } from '@/app/lib/companies/data';


export const metadata: Metadata = {
  title: 'Companies',
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
    const totalPages = await fetchCompaniesPages(query);

  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between">
        <h1 className={`${lusitana.className} text-2xl`}>Companies</h1>
      </div>
      <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
        <Search placeholder="Search..." />
        <CreateCompanie />
      </div>
      {<Suspense key={query + currentPage} fallback={<CompaniesTableSkeleton />}>
        <Table query={query} currentPage={currentPage} />
      </Suspense> }
      <div className="mt-5 flex w-full justify-center">
        {<Pagination totalPages={totalPages} /> }
      </div>
    </div>
  );
}