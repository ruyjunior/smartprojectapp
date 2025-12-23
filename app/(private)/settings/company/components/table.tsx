import { Update, File } from '@/app/ui/buttons';
import { CurrentUser, formatCNPJ, formatPhone } from '@/app/utils/utils';
import { Company } from '@/app/query/companies/definitions';
import Image from 'next/image';
import logo from '@/public/images/logo.png';


export default async function CompanyTable({ company }: { company: Company }) {
  const user = await CurrentUser();
  return (
    <div className="w-full">
      <div className="mt-6 flow-root">
        <div className="overflow-x-auto">
          <div className="inline-block min-w-full align-middle">
            <div className="overflow-hidden rounded-lg bg-gray-50 shadow-md p-4 md:pt-0">
              {/* Mobile View */}
              <div className="md:hidden">
                <div key={company.id} className="mb-6 w-full rounded-lg bg-blue-200 p-4 shadow-sm">
                  <div className="border-b pb-4">
                    <h3 className="text-2xl font-semibold text-gray-900">{company.name}</h3>
                    <p className="text-sm text-gray-600">CNPJ: {formatCNPJ(company.cnpj)}</p>
                    <p className="text-sm text-gray-600">email: {company.email}</p>
                    <p className="text-sm text-gray-600">Phone: {formatPhone(company.phone)}</p>
                    <p className="text-sm text-gray-600">Site: {company.siteurl}</p>
                    <p className="text-sm text-gray-600">Slogan: {company.slogan}</p>
                  </div>
                  <div className="flex justify-end gap-3 pt-3">
                    {user?.role === 'admin' && (
                      <Update href={`/settings/company/edit`} />
                    )}
                  </div>
                </div>
              </div>

              {/* Desktop View */}
              <table className="hidden min-w-full text-gray-900 md:table">
                <thead className="bg-blue-100 text-left text-xs font-medium">
                  <tr>
                    <th className="px-2 py-2">LOGO</th>
                    <th className="px-2 py-2">EDIT</th>
                    <th className="px-2 py-2">NAME</th>
                    <th className="px-2 py-2">CNPJ</th>
                    <th className="px-2 py-2">PHONE</th>
                    <th className="px-2 py-2">EMAIL</th>
                    <th className="px-2 py-2">WEBSITE</th>
                    <th className="px-2 py-2">SLOGAN</th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-gray-200">
                  <tr key={company.id} className="hover:bg-gray-300">
                    <td className="py-2 px-2 text-xs gap-2 items-center justify-center">
                      <Image
                        src={company.logourl ? company.logourl : logo.src}
                        alt="Avatar"
                        width={200}
                        height={200}
                        className="h-10 w-10 rounded-full"
                      />
                    </td>

                    <td className="py-2 px-2 flex justify-center gap-2">
                      {user?.role === 'admin' && (
                        <Update href={`/settings/company/edit`} />
                      )}
                    </td>
                    <td className="px-2 py-2 text-xs">{company.name}</td>
                    <td className="px-2 py-2 text-xs">{formatCNPJ(company.cnpj)}</td>
                    <td className="px-2 py-2 text-xs">{formatPhone(company.phone)}</td>
                    <td className="px-2 py-2 text-xs">{company.email}</td>
                    <td className="px-2 py-2 text-xs">{company.siteurl}</td>
                    <td className="px-2 py-2 text-xs">{company.slogan}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
