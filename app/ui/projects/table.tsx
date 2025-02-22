import Image from 'next/image';
import { UpdateProject, DeleteProject, PdfProject } from '@/app/ui/projects/buttons';
import { formatDateToLocal, formatCurrency } from '@/app/lib/utils/utils';
import { fetchFilteredProjects } from '@/app/lib/projects/data';
import { fetchCompanies } from '@/app/lib/companies/data';

export default async function ProjectsTable({ 
  query,
  currentPage,
}: {
  query: string;
  currentPage: number;
}) {
  const projects = await fetchFilteredProjects(query, currentPage);
  const companies = await fetchCompanies();
  
  return (
    <div className="w-full">
      <div className="mt-6 flow-root">
        <div className="overflow-x-auto">
          <div className="inline-block min-w-full align-middle">
            <div className="overflow-hidden rounded-md bg-gray-50 p-2 md:pt-0">
              <div className="md:hidden">
                {projects?.map((project) =>  {
                  const provider = companies.find((c) => c.id === project.idprovider);
                  const taker = companies.find((c) => c.id === project.idtaker);
                  return (
                    <div
                      key={project.id}
                      className="mb-6 w-full rounded-md bg-blue-200 p-2"
                    >
                      <div className="flex-row w-full items-center justify-between border-b pb-4">
                        <div className=' hover:bg-green-500'>
                            <p className='text-2xl'>{project.title}</p>
                            <p>Date: {formatDateToLocal(project.timestamp)}</p>
                            <p>Provider: {provider ? provider.name : 'Profider not found'}</p>
                            <p>Taker: {taker ? taker.name : 'Taker not found'}</p>
                        </div>
                      </div>
                      <div className="flex-row items-center justify-between pt-1">
                        <div>
                          <p>Expected Hours: {project.expectedhours}</p>
                          <p>Executed Hours: {project.executedhours}</p>
                        </div>
                      </div> 
                      <div className="flex items-center justify-between pt-1">
                          <div className="flex justify-end gap-2">
                            <UpdateProject id={project.id} />
                            <DeleteProject id={project.id} />
                            <PdfProject id={project.id} />
                          </div>
                      </div>
                    </div>
                  )})}
                </div>
              <table className="hidden min-w-full text-gray-900 md:table">
                <thead className="rounded-md bg-gray-50 text-left text-sm font-normal">
                  <tr>
                  <th scope="col" className="px-3 py-5 font-medium">
                      TITLE
                    </th>
                    <th scope="col" className="px-3 py-5 font-medium">
                      DATE
                    </th>
                    <th scope="col" className="px-3 py-5 font-medium">
                      PROVIDER
                    </th>
                    <th scope="col" className="px-3 py-5 font-medium">
                      TAKER
                    </th>
                    <th scope="col" className="px-3 py-5 font-medium">
                      EXPECTED HOURS
                    </th>
                    <th scope="col" className="px-3 py-5 font-medium">
                      EXECUTED HOURS
                    </th>
                    <th scope="col" className="px-3 py-5 font-medium">
                      COMMENTS
                    </th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-gray-200 text-gray-900">
                  {projects.map((project) => {
                  const provider = companies.find((c) => c.id === project.idprovider);
                  const taker = companies.find((c) => c.id === project.idtaker);
                    return (
                    <tr key={project.id} className="group">
                      <td className="whitespace-nowrap bg-white py-5 pl-4 pr-3 text-sm text-black group-first-of-type:rounded-md group-last-of-type:rounded-md sm:pl-6">
                        <div className="flex items-center gap-3">
                          <p>{project.title}</p>
                        </div>
                      </td>
                      <td>
                        {formatDateToLocal(project.timestamp)}
                      </td>
                      <td className="whitespace-nowrap bg-white px-4 py-5 text-sm">
                        <p>{provider ? provider.name : 'Profider not found'}</p>
                      </td>
                      <td className="whitespace-nowrap bg-white px-4 py-5 text-sm">
                        <p>{taker ? taker.name : 'Taker not found'}</p>
                      </td>
                      <td className="whitespace-nowrap py-3 pl-6 pr-3">
                        <div className="flex justify-end gap-3">
                          <UpdateProject id={project.id} />
                          <DeleteProject id={project.id} />
                          <PdfProject id={project.id} />
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
