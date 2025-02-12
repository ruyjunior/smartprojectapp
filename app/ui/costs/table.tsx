import Image from 'next/image';
import { UpdateCost, DeleteCost } from '@/app/ui/costs/buttons';
import { formatDateToLocal, formatCurrency } from '@/app/lib/utils';
import { fetchFilteredCosts } from '@/app/lib/costs/data';
import { fetchPolicies } from '@/app/lib/policies/data';
export default async function CostsTable({ 
  query,
  currentPage,
}: {
  query: string;
  currentPage: number;
}) {
  const costs = await fetchFilteredCosts(query, currentPage);
  const policies = await fetchPolicies();
  
  return (
    <div className="w-full">
      <div className="mt-6 flow-root">
        <div className="overflow-x-auto">
          <div className="inline-block min-w-full align-middle">
            <div className="overflow-hidden rounded-md bg-gray-50 p-2 md:pt-0">
              <div className="md:hidden">
                {costs?.map((cost) =>  {
                  const policie = policies.find((c) => c.id === cost.idpolicie);
                  return(
                    <div
                      key={cost.id}
                      className="flex-row mb-6 w-full rounded-md bg-green-300 p-3"
                    >
                      <div className="flex items-center justify-between border-b pb-4">
                        <div>                        
                          <p>Policy: {policie?.number}</p>
                          <p className="text-sm text-gray-500">Plan: {cost.numberplan}</p>
                          <p className="text-sm text-gray-500">Age: {cost.age}</p>
                          <p className="text-sm text-gray-500">Titular Value: {formatCurrency(cost.valuetitular)}</p>
                        </div>
                      </div>
                      <div className="flex justify-end gap-3 pt-2">
                          <UpdateCost id={cost.id} />
                          <DeleteCost id={cost.id} />
                      </div>
                    </div>
                  )})}
                </div>
              <table className="hidden min-w-full rounded-md text-gray-900 md:table">
                <thead className="rounded-md bg-gray-50 text-left text-sm font-normal">
                  <tr>
                  <th scope="col" className="px-3 py-5 font-medium">
                      AGE
                    </th>
                    <th scope="col" className="px-3 py-5 font-medium">
                      VALUE TITULAR
                    </th>
                    <th scope="col" className="px-3 py-5 font-medium">
                      POLICIE
                    </th>
                    <th scope="col" className="px-3 py-5 font-medium">
                      NUMBER PLAN
                    </th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-gray-200 text-gray-900">
                  {costs.map((cost) => {
                    const policie = policies.find((c) => c.id === cost.idpolicie);
                    return (
                    <tr key={cost.id} className="group">
                      <td className="whitespace-nowrap bg-white py-5 pl-4 pr-3 text-sm text-black group-first-of-type:rounded-md group-last-of-type:rounded-md sm:pl-6">
                        <div className="flex items-center gap-3">
                          <p>{cost.age}</p>
                        </div>
                      </td>
                      <td className="whitespace-nowrap bg-white py-5 pl-4 pr-3 text-sm text-black group-first-of-type:rounded-md group-last-of-type:rounded-md sm:pl-6">
                        <div className="flex items-center gap-3">
                          <p>{cost.valuetitular}</p>
                        </div>
                      </td>
                      <td className="whitespace-nowrap bg-white px-4 py-5 text-sm">
                        {policie ? policie.number : 'Policie não encontrada'}
                      </td>
                      <td className="whitespace-nowrap bg-white py-5 pl-4 pr-3 text-sm text-black group-first-of-type:rounded-md group-last-of-type:rounded-md sm:pl-6">
                        <div className="flex items-center gap-3">
                          <p>{cost.numberplan}</p>
                        </div>
                      </td>

                      <td className="whitespace-nowrap py-3 pl-6 pr-3">
                        <div className="flex justify-end gap-3">
                          <UpdateCost id={cost.id} />
                          <DeleteCost id={cost.id} />
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
