import { Suspense } from 'react';
import { Metadata } from 'next';
import Pagination from '@/app/ui/pagination';
import Search from '@/app/ui/search';
import Table from '@/app/(private)/files/components/table';
import { CreateFile } from '@/app/(private)/files/components/buttons';
import { FilesTableSkeleton } from '@/app/(private)/files/components/skeletons';
import { lusitana } from '@/app/ui/fonts';
import { fetchFilesPages } from '@/app/query/files/data';

export const metadata: Metadata = {
  title: 'Files',
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
  const totalPages = await fetchFilesPages(query);

  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between">
        <h1 className={`${lusitana.className} text-2xl`}>Files</h1>
      </div>
      <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
        <Search placeholder="Search..." />
        <CreateFile id=''/>
      </div>
      {<Suspense key={query + currentPage} fallback={<FilesTableSkeleton />}>
        <Table idproject='' query={query} currentPage={currentPage} />
      </Suspense>}
      <div className="mt-5 flex w-full justify-center">
        {<Pagination totalPages={totalPages} />}
      </div>
    </div>
  );
}