import { Update, View, Pdf } from '@/app/ui/buttons';
import { formatCNPJ } from '@/app/utils/utils';
import { fetchFilteredClients } from '@/app/query/clients/data';
import { DeleteButton } from './deletebutton';

export default async function ClientsTable({
  query,
  currentPage,
}: {
  query: string;
  currentPage: number;
}) {
  const clients = await fetchFilteredClients(query, currentPage);
  return (
    <div className="w-full">
      <div className="mt-6 flow-root">
        <div className="overflow-x-auto">
          <div className="inline-block min-w-full align-middle">
            <div className="overflow-hidden rounded-lg bg-gray-50 shadow-md p-4 md:pt-0">
              {/* Mobile View */}
              <div className="md:hidden">
                {clients?.map((companie) => (
                  <div key={companie.id} className="mb-6 w-full rounded-lg bg-blue-200 p-4 shadow-sm">
                    <div className="border-b pb-4">
                      <h3 className="text-2xl font-semibold text-gray-900">{companie.name}</h3>
                      <p className="text-sm text-gray-600">CNPJ: {formatCNPJ(companie.cnpj)}</p>
                    </div>
                    <div className="flex justify-end gap-3 pt-3">
                      <Update href={`/clients/${companie.id}/edit`} />
                      <View href={`/clients/${companie.id}/view`} />
                    </div>
                  </div>
                ))}
              </div>

              {/* Desktop View */}
              <table className="hidden min-w-full text-gray-900 md:table">
                <thead className="bg-blue-100 text-left text-xs font-medium">
                  <tr>
                    <th className="px-2 py-2">EDIT</th>
                    <th className="px-2 py-2">NAME</th>
                    <th className="px-2 py-2">CNPJ</th>
                    <th className="px-2 py-2">DELETE</th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-gray-200">
                  {clients.map((companie) => (
                    <tr key={companie.id} className="hover:bg-gray-300">
                      <td className="py-2 px-2 flex justify-center gap-2">
                        <Update href={`/clients/${companie.id}/edit`} />
                        <View href={`/clients/${companie.id}/view`} />
                      </td>
                      <td className="px-2 py-2 text-xs">{companie.name}</td>
                      <td className="px-2 py-2 text-xs">{formatCNPJ(companie.cnpj)}</td>
                      <td className="py-2 px-2 flex justify-end">
                        <DeleteButton id={companie.id} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
