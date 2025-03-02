import { UpdateEmployee, DeleteEmployee } from '@/app/ui/employees/buttons';
import {
  formatDateToLocal, formatCurrency,
  formatCPF, formatCEP, formatPhone
} from '@/app/lib/utils/utils';
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
        <div className="overflow-hidden rounded-lg bg-gray-50 shadow-md p-4 md:pt-0">
          {/* Mobile View */}
          <div className="md:hidden">
            {employees?.map((employee) => {
              const company = companies.find((b) => b.id === employee.idcompany);
              return (
                <div key={employee.id} className="mb-6 w-full rounded-lg bg-blue-200 p-4 shadow-sm">
                  <div className="border-b pb-4">
                    <h3 className="text-xl font-semibold text-gray-900">{employee.name}</h3>
                    <p className="text-sm text-gray-600">Company: {company?.name || 'Not found'}</p>
                    <p className="text-sm text-gray-600">Email: {employee.email}</p>
                    <p className="text-sm text-gray-600">Phone: {formatPhone(employee.phone)}</p>
                    <p className="text-sm text-gray-600">Value HH: {formatCurrency(Number(employee.price))}</p>
                  </div>
                  <div className="flex justify-end gap-3 pt-3">
                    <UpdateEmployee id={employee.id} />
                    <DeleteEmployee id={employee.id} />
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
                <th className="px-2 py-2">COMPANY</th>
                <th className="px-2 py-2">NAME</th>
                <th className="px-2 py-2">CPF</th>
                <th className="px-2 py-2">BIRTH</th>
                <th className="px-2 py-2">EMAIL</th>
                <th className="px-2 py-2">PHONE</th>
                <th className="px-2 py-2">CEP</th>
                <th className="px-2 py-2">PRICE</th>
                <th className="px-2 py-2">DELETE</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-200">
              {employees.map((employee) => {
                const company = companies.find((b) => b.id === employee.idcompany);
                return (
                  <tr key={employee.id} className="hover:bg-gray-300">
                    <td className="py-2 px-2 flex gap-2">
                      <UpdateEmployee id={employee.id} />
                    </td>
                    <td className="px-2 py-2 text-xs">{company ? company.name : 'Not found'}</td>
                    <td className="px-2 py-2 text-xs">{employee.name}</td>
                    <td className="px-2 py-2 text-xs">{formatCPF(employee.cpf)}</td>
                    <td className="px-2 py-2 text-xs">{employee.birth ? formatDateToLocal(employee.birth) : ''}</td>
                    <td className="px-2 py-2 text-xs">{employee.email}</td>
                    <td className="px-2 py-2 text-xs">{formatPhone(employee.phone)}</td>
                    <td className="px-2 py-2 text-xs">{formatCEP(employee.cep)}</td>
                    <td className="px-2 py-2 text-xs">{employee.price ? formatCurrency(Number(employee.price)) : ''}</td>
                    <td className="py-2 px-2 flex justify-end">
                      <DeleteEmployee id={employee.id} />
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
