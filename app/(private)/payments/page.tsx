import { Suspense } from 'react';
import { Metadata } from 'next';
import Pagination from '@/app/ui/pagination';
import Search from '@/app/ui/search';
import Table from '@/app/(private)/payments/components/table';
import { CreatePayment } from '@/app/(private)/payments/components/buttons';
import { PaymentsTableSkeleton } from '@/app/(private)/payments/components/skeletons';
import { lusitana } from '@/app/ui/fonts';
import { fetchPaymentsPages } from '@/app/query/payments/data';

export const metadata: Metadata = {
  title: 'Payments',
};

export default async function Page(props: {
  searchParams?: Promise<{
    query?: string;
    page?: string;
  }>;
}) {
  const searchParams = await props.searchParams;
  const query = searchParams?.query || '';
  const idproject = query.split('idproject=')[1] || '';
  const currentPage = Number(searchParams?.page) || 1;
  const totalPages = await fetchPaymentsPages(query, ''); // Passar idproject adequado aqui

  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between">
        <h1 className={`${lusitana.className} text-2xl`}>Payments</h1>
      </div>
      <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
        <Search placeholder="Search..." />
        <CreatePayment id=''/>
      </div>
      {<Suspense key={query + currentPage} fallback={<PaymentsTableSkeleton />}>
        <Table query={query} currentPage={currentPage} idproject={idproject} />
      </Suspense>}
      <div className="mt-5 flex w-full justify-center">
        {<Pagination totalPages={totalPages} />}
      </div>
    </div>
  );
}