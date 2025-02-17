import Form from '@/app/ui/proposals/pdf-form';
import Breadcrumbs from '@/app/ui/breadcrumbs';
import {fetchProposalById } from '@/app/lib/proposals/data';
import { fetchPolicies } from '@/app/lib/policies/data';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { fetchClients } from '@/app/lib/clients/data';
import { fetchUsers } from '@/app/lib/users/data';
import { fetchPlans } from '@/app/lib/plans/data';
import { fetchCosts } from '@/app/lib/costs/data';
import { fetchCompanies } from '@/app/lib/companies/data';
export const metadata: Metadata = {
  title: 'Print PDF Proposals',
};

export default async function Page(props: { params: Promise<{ id: string }> }) {
    const params = await props.params;
    const id = params.id;
    const [proposal, clients, users, policies, plans, costs, companies] = await Promise.all([
        fetchProposalById(id),
        fetchClients(),
        fetchUsers(),
        fetchPolicies(),
        fetchPlans(),
        fetchCosts(),
        fetchCompanies()
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
                    label: 'Print PDF Proposal',
                    href: `/dashboard/proposals/${id}/pdf`,
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
          companies={companies}
           />
        </main>
  );
}