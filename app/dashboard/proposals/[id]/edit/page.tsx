import Form from '@/app/ui/proposals/edit-form';
import Breadcrumbs from '@/app/ui/breadcrumbs';
import {fetchProposalById } from '@/app/lib/proposals/data';
import { fetchPolicies } from '@/app/lib/policies/data';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { fetchClients } from '@/app/lib/clients/data';
import { fetchUsers } from '@/app/lib/users/data';
import { fetchPlans } from '@/app/lib/plans/data';
import { fetchCosts } from '@/app/lib/costs/data';

export const metadata: Metadata = {
  title: 'Edit Proposals',
};

export default async function Page(props: { params: Promise<{ id: string }> }) {
    const params = await props.params;
    const id = params.id;
    const [proposal, clients, users, policies, plans, costs] = await Promise.all([
        fetchProposalById(id),
        fetchClients(),
        fetchUsers(),
        fetchPolicies(),
        fetchPlans(),
        fetchCosts()
      ]);
      if (!proposal) {
       notFound();
      }

    return (
        <main>
            <Breadcrumbs
                breadcrumbs={[
                { label: 'Proposals', href: '/dashboard/proposals' },
                {
                    label: 'Edit Proposal',
                    href: `/dashboard/proposals/${id}/edit`,
                    active: true,
                },
                ]}
            />
        <Form 
          proposal={proposal} 
          policies={policies} 
          clients={clients} 
          users={users}
          plans={plans}
          costs={costs}
           />
        </main>
  );
}