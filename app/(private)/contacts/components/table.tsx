import { CallWhatsapp, Update } from '@/app/ui/buttons'
import {
  formatDateToLocal, formatCurrency,
  formatCPF, formatCEP, formatPhone,
  CurrentUser
} from '@/app/utils/utils';
import { fetchFilteredContacts } from '@/app/query/contacts/data';
import { fetchClients } from '@/app/query/clients/data';
import { DeleteButton } from './deletebutton';

export default async function ContactsTable({
  query,
  currentPage,
}: {
  query: string;
  currentPage: number;
}) {
  const contacts = await fetchFilteredContacts(query, currentPage);
  const clients = await fetchClients();
  const user = await CurrentUser();

  return (
    <div className="w-full">
      <div className="mt-6 flow-root">
        <div className="overflow-x-auto">
          <div className="inline-block min-w-full align-middle">
            <div className="overflow-hidden rounded-lg bg-gray-50 shadow-md p-4 md:pt-0">
              {/* Mobile View */}
              <div className="md:hidden">
                {contacts?.map((contact) => {
                  const company = clients.find((b) => b.id === contact.idclient);
                  return (
                    <div key={contact.id} className="mb-6 w-full rounded-lg bg-blue-200 p-4 shadow-sm">
                      <div className="border-b pb-4">
                        <h3 className="text-xl font-semibold text-gray-900">{contact.name}</h3>
                        <p className="text-sm text-gray-600">Company: {company?.name || 'Not found'}</p>
                        <p className="text-sm text-gray-600">Email: {contact.email}</p>
                        <p className="text-sm text-gray-600">Phone: {formatPhone(contact.phone)}</p>
                      </div>
                      <div className="flex justify-end gap-3 pt-3">
                        {user?.role === 'admin' && (
                          <>
                            <Update href={`/contacts/${contact.id}/edit`} />
                            <DeleteButton id={contact.id} />
                          </>
                        )}
                      </div>
                    </div>
                  )
                })}
              </div>

              {/* Desktop View */}
              <table className="hidden min-w-full text-gray-900 md:table">
                <thead className="bg-blue-100 text-left text-xs font-medium">
                  <tr>
                    <th className="px-2 py-2">EDIT</th>
                    <th className="px-2 py-2">NAME</th>
                    <th className="px-2 py-2">COMPANY</th>
                    <th className="px-2 py-2">CPF</th>
                    <th className="px-2 py-2">BIRTH</th>
                    <th className="px-2 py-2">EMAIL</th>
                    <th className="px-2 py-2">PHONE</th>
                    <th className="px-2 py-2">CEP</th>
                    <th className="px-2 py-2">DELETE</th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-gray-200">
                  {contacts.map((contact) => {
                    const company = clients.find((b) => b.id === contact.idclient);
                    return (
                      <tr key={contact.id} className="hover:bg-gray-300">
                        <td className="py-2 px-2 flex gap-2">
                          {user?.role === 'admin' && (
                            <>
                              <Update href={`/contacts/${contact.id}/edit`} />
                            </>
                          )}
                        </td>
                        <td className="px-2 py-2 text-xs">{contact.name}</td>
                        <td className="px-2 py-2 text-xs">{company ? company.name : 'Internal Contact'}</td>
                        <td className="px-2 py-2 text-xs">{formatCPF(contact.cpf)}</td>
                        <td className="px-2 py-2 text-xs">{contact.birth ? formatDateToLocal(contact.birth) : ''}</td>
                        <td className="px-2 py-2 text-xs">{contact.email}</td>
                        <td className="px-2 py-2 text-xs">
                          <div className="flex gap-1 items-center justify-center">
                            {formatPhone(contact.phone)}
                            {contact.phone && <CallWhatsapp phone={contact.phone?.replace(/\D/g, '')} />}
                          </div>
                        </td>
                        <td className="px-2 py-2 text-xs">{formatCEP(contact.cep)}</td>
                        <td className="py-2 px-2 flex justify-end">
                          {user?.role === 'admin' && (
                            <DeleteButton id={contact.id} />
                          )}
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
