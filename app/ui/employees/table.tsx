import Image from 'next/image';
import { UpdateEmployee, DeleteEmployee } from '@/app/ui/employees/buttons';
import { formatDateToLocal, formatCurrency, 
        formatCPF, formatCEP, formatPhone , formatDateBr
} from '@/app/lib/utils/utils';
import { fetchFilteredEmployees } from '@/app/lib/employees/data';
import { fetchCompanies} from '@/app/lib/companies/data';

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
                {employees?.map((employee) =>  {
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
                  )})}
                </div>
              <table className="hidden min-w-full rounded-md text-gray-900 md:table">
                <thead className="rounded-md bg-gray-50 text-left text-sm font-normal">
                  <tr>
                  <th scope="col" className="px-3 py-5 font-medium">
                      COMPANY
                    </th>                    
                    <th scope="col" className="px-3 py-5 font-medium">
                      NAME
                    </th>                    
                    <th scope="col" className="px-3 py-5 font-medium">
                      CPF
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
                      <td className="whitespace-nowrap bg-white py-5 pl-4 pr-3 text-sm text-black group-first-of-type:rounded-md group-last-of-type:rounded-md sm:pl-6">
                        <div className="flex items-center gap-3">
                          <p>{company ? company.name : 'Company não encontrada'}</p>
                        </div>
                      </td>
                      <td className="whitespace-nowrap bg-white px-4 py-5 text-sm">
                        {employee.name} 
                      </td>
                      <td className="whitespace-nowrap bg-white px-4 py-5 text-sm">
                        {formatCPF(employee.cpf)}
                      </td>
                      <td className="whitespace-nowrap bg-white px-4 py-5 text-sm">
                        {employee.birth ? formatDateToLocal(employee.birth) : ''}
                        </td>
                      <td className="whitespace-nowrap bg-white px-4 py-5 text-sm">
                        {employee.email}
                      </td>
                      <td className="whitespace-nowrap bg-white px-4 py-5 text-sm">
                        {formatPhone(employee.phone)}
                      </td>
                      <td className="whitespace-nowrap bg-white px-4 py-5 text-sm">
                        {formatCEP(employee.cep)}
                      </td>
                      <td className="whitespace-nowrap bg-white px-4 py-5 text-sm">
                        {employee.price ? formatCurrency(Number(employee.price)) : ''}
                      </td>
                      <td className="whitespace-nowrap py-3 pl-6 pr-3">
                        <div className="flex justify-end gap-3">
                          <UpdateEmployee id={employee.id} />
                          <DeleteEmployee id={employee.id} />
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
