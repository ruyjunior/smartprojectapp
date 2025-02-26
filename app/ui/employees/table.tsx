import { UpdateEmployee, DeleteEmployee } from '@/app/ui/employees/buttons';
import {
  formatDateToLocal, formatCurrency,
  formatCPF, formatCEP, formatPhone } from '@/app/lib/utils/utils';
import { fetchFilteredEmployees } from '@/app/lib/employees/data';
import { fetchCompanies } from '@/app/lib/companies/data';

export default async function EmployeesTable({
  query,
  currentPage,
}: {
  query: string;
  currentPage: number;
}) {
  const employees = await fetchFilteredEmployees(query, currentPage);
  const companies = await fetchCompanies();

  return (
    <div className="w-full">
      <div className="mt-6 flow-root">
        <div className="overflow-x-auto">
          <div className="inline-block min-w-full align-middle">
            <div className="overflow-hidden rounded-md bg-gray-50 p-2 md:pt-0">
              <div className="md:hidden">
                {employees?.map((employee) => {
                  const createdAt = new Date(employee.birth);
                  const company = companies.find((b) => b.id === employee.idcompany);
                  return (
                    <div
                      key={employee.id}
                      className="mb-6 w-full rounded-md bg-blue-200 p-2"
                    >
                      <div className="flex-row items-center justify-between border-b pb-4">
                        <div>
                          <p>Name: {employee.name}</p>
                          <p className="text-sm text-gray-500">Company: {company?.name}</p>
                          <p className="text-sm text-gray-500">CPF: {employee.cpf}</p>
                          <p className="text-sm text-gray-500">Email: {employee.email}</p>
                          <p className="text-sm text-gray-500">Phone: {employee.phone}</p>
                          <p className="text-sm text-gray-500">Value HH: {formatCurrency(Number(employee.price))}</p>
                        </div>
                      </div>
                      <div className="flex justify-end gap-3 pt-2">
                        <UpdateEmployee id={employee.id} />
                        <DeleteEmployee id={employee.id} />
                      </div>

                    </div>
                  )
                })}
              </div>
              <table className="hidden min-w-full rounded-md text-gray-900 md:table">
                <thead className="rounded-md bg-blue-100 text-left text-xs font-normal">
                  <tr>
                    <th scope="col" className="px-2 py-1 font-medium">
                      COMPANY
                    </th>
                    <th scope="col" className="px-2 py-1 font-medium">
                      NAME
                    </th>
                    <th scope="col" className="px-2 py-1 font-medium">
                      CPF
                    </th>
                    <th scope="col" className="px-2 py-1 font-medium">
                      BIRTH
                    </th>
                    <th scope="col" className="px-2 py-1 font-medium">
                      EMAIL
                    </th>
                    <th scope="col" className="px-2 py-1 font-medium">
                      PHONE
                    </th>
                    <th scope="col" className="px-2 py-1 font-medium">
                      CEP
                    </th>
                    <th scope="col" className="px-2 py-1 font-medium">
                      PRICE
                    </th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-gray-200 text-gray-900">
                  {employees.map((employee) => {
                    const createdAt = new Date(employee.birth);
                    const company = companies.find((b) => b.id === employee.idcompany);
                    return (
                      <tr key={employee.id} className="group">
                        <td className="bg-white py-1 pl-4 pr-3 text-xs text-black group-first-of-type:rounded-md group-last-of-type:rounded-md xs:pl-6">
                          <div className="flex items-center gap-3">
                            <p>{company ? company.name : 'Company não encontrada'}</p>
                          </div>
                        </td>
                        <td className="whitespace-nowrap bg-white px-4 py-5 text-xs">
                          {employee.name}
                        </td>
                        <td className="whitespace-nowrap bg-white px-4 py-5 text-xs">
                          {formatCPF(employee.cpf)}
                        </td>
                        <td className="whitespace-nowrap bg-white px-4 py-5 text-xs">
                          {employee.birth ? formatDateToLocal(employee.birth) : ''}
                        </td>
                        <td className="whitespace-nowrap bg-white px-4 py-5 text-xs">
                          {employee.email}
                        </td>
                        <td className="whitespace-nowrap bg-white px-4 py-5 text-xs">
                          {formatPhone(employee.phone)}
                        </td>
                        <td className="whitespace-nowrap bg-white px-4 py-5 text-xs">
                          {formatCEP(employee.cep)}
                        </td>
                        <td className="whitespace-nowrap bg-white px-4 py-5 text-xs">
                          {employee.price ? formatCurrency(Number(employee.price)) : ''}
                        </td>
                        <td className="whitespace-nowrap py-3 pl-6 pr-3">
                          <div className="flex justify-end gap-3">
                            <UpdateEmployee id={employee.id} />
                            <DeleteEmployee id={employee.id} />
                          </div>
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
