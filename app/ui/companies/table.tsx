import Image from 'next/image';
import { UpdateCompanie, DeleteCompanie } from '@/app/ui/companies/buttons';
import { formatDateToLocal, formatCurrency, formatCNPJ } from '@/app/lib/utils/utils';
import { fetchFilteredCompanies } from '@/app/lib/companies/data';

export default async function CompaniesTable({ 
  query,
  currentPage,
}: {
  query: string;
  currentPage: number;
}) {
  const companies = await fetchFilteredCompanies(query, currentPage);
  return (
    <div className="w-full">
      <div className="mt-6 flow-root">
        <div className="overflow-x-auto">
          <div className="inline-block min-w-full align-middle">
            <div className="overflow-hidden rounded-md bg-gray-50 p-2 md:pt-0">
              <div className="md:hidden">
                {companies?.map((companie) =>  (
                    <div
                      key={companie.id}
                      className="flex-row mb-6 w-full rounded-md bg-green-300 p-3"
                    >
                      <div className="flex items-center justify-between border-b pb-2">
                        <div>
                        <p className="text-2xl">{companie.name}</p>
                        <p className="text-sm text-gray-500">CNPJ: {companie.cnpj}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              <table className="hidden min-w-full rounded-md text-gray-900 md:table">
                <thead className="rounded-md bg-gray-50 text-left text-sm font-normal">
                  <tr>
                    <th scope="col" className="px-3 py-5 font-medium">
                      NAME
                    </th>
                    <th scope="col" className="px-3 py-5 font-medium">
                      CNPJ
                    </th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-gray-200 text-gray-900">
                  {companies.map((companie) => {
                    return (
                    <tr key={companie.id} className="group">
                      <td className="whitespace-nowrap bg-white py-5 pl-4 pr-3 text-sm text-black group-first-of-type:rounded-md group-last-of-type:rounded-md sm:pl-6">
                        <div className="flex items-center gap-3">
                          <p>{companie.name}</p>
                        </div>
                      </td>
                      <td className="whitespace-nowrap bg-white px-4 py-5 text-sm">
                        {formatCNPJ(companie.cnpj)}
                      </td>
                      <td className="whitespace-nowrap py-3 pl-6 pr-3">
                        <div className="flex justify-end gap-3">
                          <UpdateCompanie id={companie.id} />
                          <DeleteCompanie id={companie.id} />
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
