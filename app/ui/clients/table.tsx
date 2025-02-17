import Image from 'next/image';
import { UpdateClient, DeleteClient } from '@/app/ui/clients/buttons';
import { formatDateToLocal, formatCurrency } from '@/app/lib/utils/utils';
import { fetchFilteredClients } from '@/app/lib/clients/data';
import { fetchBases} from '@/app/lib/bases/data';

export default async function ClientsTable({ 
  query,
  currentPage,
}: {
  query: string;
  currentPage: number;
}) {
  const clients = await fetchFilteredClients(query, currentPage);
  const bases = await fetchBases();
  return (
    <div className="w-full">
      <div className="mt-6 flow-root">
        <div className="overflow-x-auto">
          <div className="inline-block min-w-full align-middle">
            <div className="overflow-hidden rounded-md bg-gray-50 p-2 md:pt-0">
              <div className="md:hidden">
                {clients?.map((client) =>  {
                  const createdAt = new Date(client.birth);
                  const base = bases.find((b) => b.id === client.idbase);
                return (
                    <div
                      key={client.id}
                      className="mb-6 w-full rounded-md bg-green-300 p-2"
                    >
                      <div className="flex-row items-center justify-between border-b pb-4">
                        <div>
                          <p>Name: {client.name}</p>
                          <p className="text-sm text-gray-500">CPF: {client.cpf}</p>
                          <p className="text-sm text-gray-500">Email: {client.email}</p>
                          <p className="text-sm text-gray-500">Phone: {client.phone}</p>
                          <p className="text-sm text-gray-500">Base: {base?.name}</p>
                        </div>
                      </div>
                      <div className="flex justify-end gap-3 pt-2">
                          <UpdateClient id={client.id} />
                          <DeleteClient id={client.id} />
                        </div>

                    </div>
                  )})}
                </div>
              <table className="hidden min-w-full rounded-md text-gray-900 md:table">
                <thead className="rounded-md bg-gray-50 text-left text-sm font-normal">
                  <tr>
                    <th scope="col" className="px-4 py-5 font-medium sm:pl-6">
                      REGISTRY
                    </th>
                    <th scope="col" className="px-3 py-5 font-medium">
                      CPF
                    </th>
                    <th scope="col" className="px-3 py-5 font-medium">
                      NAME
                    </th>
                    <th scope="col" className="px-3 py-5 font-medium">
                      BIRTH
                    </th>
                    <th scope="col" className="px-3 py-5 font-medium">
                      EMAIL
                    </th>
                    <th scope="col" className="px-3 py-5 font-medium">
                      PHONE
                    </th>
                    <th scope="col" className="px-3 py-5 font-medium">
                      CEP
                    </th>
                    <th scope="col" className="px-3 py-5 font-medium">
                      BASE
                    </th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-gray-200 text-gray-900">
                  {clients.map((client) => {
                    const createdAt = new Date(client.birth);
                    const base = bases.find((b) => b.id === client.idbase);
                    return (
                    <tr key={client.id} className="group">
                      <td className="whitespace-nowrap bg-white py-5 pl-4 pr-3 text-sm text-black group-first-of-type:rounded-md group-last-of-type:rounded-md sm:pl-6">
                        <div className="flex items-center gap-3">
                          <p>{client.mat}</p>
                        </div>
                      </td>
                      <td className="whitespace-nowrap bg-white px-4 py-5 text-sm">
                        {client.cpf}
                      </td>
                      <td className="whitespace-nowrap bg-white px-4 py-5 text-sm">
                        {client.name}
                      </td>
                      <td className="whitespace-nowrap bg-white px-4 py-5 text-sm">
                        {formatDateToLocal(client.birth)}
                        </td>
                      <td className="whitespace-nowrap bg-white px-4 py-5 text-sm">
                        {client.email}
                      </td>
                      <td className="whitespace-nowrap bg-white px-4 py-5 text-sm">
                        {client.phone}
                      </td>
                      <td className="whitespace-nowrap bg-white px-4 py-5 text-sm">
                        {client.cep}
                      </td>
                      <td className="whitespace-nowrap bg-white px-4 py-5 text-sm">
                        {base ? base.name : 'Base não encontrada'}
                      </td>
                      <td className="whitespace-nowrap py-3 pl-6 pr-3">
                        <div className="flex justify-end gap-3">
                          <UpdateClient id={client.id} />
                          <DeleteClient id={client.id} />
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
