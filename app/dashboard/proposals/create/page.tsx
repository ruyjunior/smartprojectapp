import Form from '@/app/ui/proposals/create-form';
import Breadcrumbs from '@/app/ui/breadcrumbs';
import { fetchPolicies } from '@/app/lib/policies/data';
import { fetchClients } from '@/app/lib/clients/data';
import { fetchUsers } from '@/app/lib/users/data';
import { fetchPlans } from '@/app/lib/plans/data';
import { fetchCosts } from '@/app/lib/costs/data';

import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Creat Proposal',
};

export default async function Page() {
  const clients = await fetchClients();
  const users = await fetchUsers();
  const policies = await fetchPolicies();
  const plans = await fetchPlans();
  const costs = await fetchCosts();
 
  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Proposals', href: '/dashboard/proposals' },
          {
            label: 'Create Proposal',
            href: '/dashboard/proposals/create',
            active: true,
          },
        ]}
      />
      <Form 
          policies={policies} 
          clients={clients} 
          users={users}
          plans={plans}
          costs={costs}
        />
    </main>
  );
}