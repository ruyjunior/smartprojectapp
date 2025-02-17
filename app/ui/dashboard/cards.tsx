import { DocumentCheckIcon, UserGroupIcon, UsersIcon, UserCircleIcon } from '@heroicons/react/24/outline';
import { fetchCardData } from '@/app/lib/data';
import { lusitana } from '@/app/ui/fonts';

const iconMap = {
  customers: UserCircleIcon,
  clients: UserGroupIcon,
  proposals: DocumentCheckIcon,
};

export default async function CardWrapper() {
  const {
    numberOfProposals,
    numberOfCustomers,
    numberOfClients
  } = await fetchCardData();

  return (
    <>
      <Card title="Total Proposals" value={numberOfProposals} type="proposals" />
      <Card title="Total Clients" value={numberOfClients} type="clients" />
      <Card title="Total Users" value={numberOfCustomers} type="customers" />
    </>
  );
}

export function Card({
  title,
  value,
  type,
}: {
  title: string;
  value: number | string;
  type: 'proposals' | 'customers' | 'clients';
}) {
  const Icon = iconMap[type];

  return (
    <div className="rounded-xl bg-gray-50 p-2 shadow-sm">
      <div className="flex p-4">
        {Icon ? <Icon className="h-5 w-5 text-gray-700" /> : null}
        <h3 className="ml-2 text-sm font-medium">{title}</h3>
      </div>
      <p
        className={`${lusitana.className}
          truncate rounded-xl bg-white px-4 py-8 text-center text-2xl`}
      >
        {value}
      </p>
    </div>
  );
}
