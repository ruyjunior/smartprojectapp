import { Metadata } from 'next';
import Table from '@/app/ui/clients/table';
import { lusitana } from '@/app/ui/fonts';
import { fetchClients } from '@/app/lib/data';


export const metadata: Metadata = {
  title: 'Clients',
};

export default async function Page() {
  const clients = await fetchClients();

  return (
    <div className="w-full">
      <Table clients={clients} />
    </div>
  );
  }