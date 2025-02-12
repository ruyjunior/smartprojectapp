import Image from 'next/image';
import { UpdateProposal, DeleteProposal } from '@/app/ui/proposals/buttons';
import { formatDateToLocal, formatCurrency } from '@/app/lib/utils';
import { fetchFilteredProposals } from '@/app/lib/proposals/data';
import { fetchPolicies } from '@/app/lib/policies/data';
import { fetchUsers } from '@/app/lib/users/data';
import { fetchClients } from '@/app/lib/clients/data';
import { fetchPlans } from '@/app/lib/plans/data';
import { fetchCosts } from '@/app/lib/costs/data';
import { fetchCompanies } from '@/app/lib/companies/data';

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
  const companies = await fetchCompanies();
  
  return (
    <div className="w-full">
      <div className="mt-6 flow-root">
        <div className="overflow-x-auto">
          <div className="inline-block min-w-full align-middle">
            <div className="overflow-hidden rounded-md bg-gray-50 p-2 md:pt-0">
              <div className="md:hidden">
                {proposals?.map((proposal) =>  {
                  const client = clients.find((c) => c.id === proposal.idclient);
                  const user = users.find((c) => c.id === proposal.iduser);
                  const policie = policies.find((c) => c.id === proposal.idpolicie);
                  const plan = plans.find((c) => c.id === proposal.idplan);
                  const cost = costs.find((c) => c.id === proposal.idcost);
                  const companie = companies.find((c) => c.id === policie?.idcompany);
                  return (
                    <div
                      key={proposal.id}
                      className="mb-6 w-full rounded-md bg-green-300 p-2"
                    >
                      <div className="flex-row w-full items-center justify-between border-b pb-4">
                        <div className=' hover:bg-green-500'>
                            <p className='text-2xl'>N° {proposal.number}</p>
                            <p>Date: {formatDateToLocal(proposal.timestamp)}</p>
                            <p>Titular: {client ? client.name : 'Client não encontrada'}</p>
                            <p>CPF: {client ? client.cpf : 'Client não encontrada'}</p> 
                        </div>
                      </div>
                      <div className="flex-row items-center justify-between pt-1">
                        <div>
                          <p>Policie: {policie ? policie.number : 'Policie não encontrada'}
                          {companie ? companie.name : 'Policie não encontrada'}</p>
                          <p>Plan: {plan ? plan.number : 'Plan não encontrada'}</p>
                          <p>Age: {cost ? cost.age : 'Policie não encontrada'}</p>
                        </div>
                      </div> 
                      <div className="flex items-center justify-between pt-1">
                          <div>
                            <p className="text-sm text-gray-500">                      
                              Agent: {user ? user.name : 'User não encontrada'}
                            </p>
                          </div>
                          <div className="flex justify-end gap-2">
                            <UpdateProposal id={proposal.id} />
                            <DeleteProposal id={proposal.id} />
                            <DeleteProposal id={proposal.id} />
                          </div>
                      </div>
                    </div>
                  )})}
                </div>
              <table className="hidden min-w-full text-gray-900 md:table">
                <thead className="rounded-md bg-gray-50 text-left text-sm font-normal">
                  <tr>
                  <th scope="col" className="px-3 py-5 font-medium">
                      NUMBER
                    </th>
                    <th scope="col" className="px-3 py-5 font-medium">
                      DATE
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
                      <td>
                        {formatDateToLocal(proposal.timestamp)}
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
