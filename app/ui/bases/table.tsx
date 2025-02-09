import Image from 'next/image';
import { UpdateBase, DeleteBase } from '@/app/ui/bases/buttons';
import { formatDateToLocal, formatCurrency } from '@/app/lib/utils';
import { fetchFilteredBases } from '@/app/lib/bases/data';

export default async function BasesTable({ 
  query,
  currentPage,
}: {
  query: string;
  currentPage: number;
}) {
  const bases = await fetchFilteredBases(query, currentPage);

  return (
    <div className="w-full">
      <div className="mt-6 flow-root">
        <div className="overflow-x-auto">
          <div className="inline-block min-w-full align-middle">
            <div className="overflow-hidden rounded-md bg-gray-50 p-2 md:pt-0">
              <div className="md:hidden">
                {bases?.map((base) =>  (
                    <div
                      key={base.id}
                      className="mb-2 w-full rounded-md bg-white p-4"
                    >
                      <div className="flex items-center justify-between border-b pb-4">
                        <div>
                          <p className="text-sm text-gray-500">
                            {base.name}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              <table className="hidden min-w-full rounded-md text-gray-900 md:table">
                <thead className="rounded-md bg-gray-50 text-left text-sm font-normal">
                  <tr>
                    <th scope="col" className="px-4 py-5 font-medium sm:pl-6">
                      NAME
                    </th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-gray-200 text-gray-900">
                  {bases.map((base) => {
                    return (
                    <tr key={base.id} className="group">
                      <td className="whitespace-nowrap bg-white py-5 pl-4 pr-3 text-sm text-black group-first-of-type:rounded-md group-last-of-type:rounded-md sm:pl-6">
                        <div className="flex items-center gap-3">
                          <p>{base.name}</p>
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
