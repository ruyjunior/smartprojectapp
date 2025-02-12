import Image from 'next/image';
import { UpdateProposal, DeleteProposal } from '@/app/ui/proposals/buttons';
import { formatDateToLocal, formatCurrency } from '@/app/lib/utils';
import { fetchFilteredProposals } from '@/app/lib/proposals/data';
import { fetchPolicies } from '@/app/lib/policies/data';
import { fetchUsers } from '@/app/lib/users/data';
import { fetchClients } from '@/app/lib/clients/data';
import { fetchPlans } from '@/app/lib/plans/data';
import { fetchCosts } from '@/app/lib/costs/data';

export default async function ProposalsTable({ 
  query,
  currentPage,
}: {
  query: string;
  currentPage: number;
}) {
  const proposals = await fetchFilteredProposals(query, currentPage);
  const clients = await fetchClients();
  const users = await fetchUsers();
  const policies = await fetchPolicies();
  const plans = await fetchPlans();
  const costs = await fetchCosts();
  
  return (
    <div className="w-full">
      <div className="mt-6 flow-root">
        <div className="overflow-x-auto">
          <div className="inline-block min-w-full align-middle">
            <div className="overflow-hidden rounded-md bg-gray-50 p-2 md:pt-0">
              <div className="md:hidden">
                {proposals?.map((proposal) =>  (
                    <div
                      key={proposal.id}
                      className="mb-2 w-full rounded-md bg-white p-4"
                    >
                      <div className="flex items-center justify-between border-b pb-4">
                        <div>
                          <p className="text-sm text-gray-500">
                            {proposal.id}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              <table className="hidden min-w-full rounded-md text-gray-900 md:table">
                <thead className="rounded-md bg-gray-50 text-left text-sm font-normal">
                  <tr>
                  <th scope="col" className="px-3 py-5 font-medium">
                      NUMBER
                    </th>
                    <th scope="col" className="px-3 py-5 font-medium">
                      CLIENT
                    </th>
                    <th scope="col" className="px-3 py-5 font-medium">
                      USER
                    </th>
                    <th scope="col" className="px-3 py-5 font-medium">
                      POLICIE
                    </th>
                    <th scope="col" className="px-3 py-5 font-medium">
                      PLAN
                    </th>
                    <th scope="col" className="px-3 py-5 font-medium">
                      COST
                    </th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-gray-200 text-gray-900">
                  {proposals.map((proposal) => {
                    const client = clients.find((c) => c.id === proposal.idclient);
                    const user = users.find((c) => c.id === proposal.iduser);
                    const policie = policies.find((c) => c.id === proposal.idpolicie);
                    const plan = plans.find((c) => c.id === proposal.idplan);
                    const cost = costs.find((c) => c.id === proposal.idcost);
                    return (
                    <tr key={proposal.id} className="group">
                      <td className="whitespace-nowrap bg-white py-5 pl-4 pr-3 text-sm text-black group-first-of-type:rounded-md group-last-of-type:rounded-md sm:pl-6">
                        <div className="flex items-center gap-3">
                          <p>{proposal.number}</p>
                        </div>
                      </td>
                      <td className="whitespace-nowrap bg-white px-4 py-5 text-sm">
                        {client ? client.name : 'Client não encontrada'}
                      </td>
                      <td className="whitespace-nowrap bg-white px-4 py-5 text-sm">
                        {user ? user.name : 'User não encontrada'}
                      </td>
                      <td className="whitespace-nowrap bg-white px-4 py-5 text-sm">
                        {policie ? policie.number : 'Policie não encontrada'}
                      </td>
                      <td className="whitespace-nowrap bg-white px-4 py-5 text-sm">
                        {plan ? plan.number : 'Plan não encontrada'}
                      </td>
                      <td className="whitespace-nowrap bg-white px-4 py-5 text-sm">
                        {cost ? cost.age : 'Policie não encontrada'}
                      </td>

                      <td className="whitespace-nowrap py-3 pl-6 pr-3">
                        <div className="flex justify-end gap-3">
                          <UpdateProposal id={proposal.id} />
                          <DeleteProposal id={proposal.id} />
                        </div>
                      </td>
                    </tr>
                  )})}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
