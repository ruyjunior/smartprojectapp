import { Suspense } from 'react';
import { Metadata } from 'next';
import Pagination from '@/app/ui/pagination';
import Search from '@/app/ui/search';
import Table from '@/app/ui/proposals/table';
import { CreateProposal } from '@/app/ui/proposals/buttons';
import { ProposalsTableSkeleton } from '@/app/ui/proposals/skeletons';
import { lusitana } from '@/app/ui/fonts';
import { fetchProposalsPages } from '@/app/lib/proposals/data';


export const metadata: Metadata = {
  title: 'Proposals',
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
    const totalPages = await fetchProposalsPages(query);

  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between">
        <h1 className={`${lusitana.className} text-2xl`}>Proposals</h1>
      </div>
      <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
        <Search placeholder="Search..." />
        <CreateProposal />
      </div>
      {<Suspense key={query + currentPage} fallback={<ProposalsTableSkeleton />}>
        <Table query={query} currentPage={currentPage} />
      </Suspense> }
      <div className="mt-5 flex w-full justify-center">
        {<Pagination totalPages={totalPages} /> }
      </div>
    </div>
  );
}