import Image from 'next/image';
import { UpdateProject, DeleteProject, PdfProject, ViewProject } from '@/app/ui/projects/buttons';
import { formatDateToLocal, formatCurrency } from '@/app/lib/utils/utils';
import { fetchFilteredProjects } from '@/app/lib/projects/data';
import { fetchCompanies } from '@/app/lib/companies/data';
import { fetchEmployees } from '@/app/lib/employees/data';

export default async function ProjectsTable({
  query,
  currentPage,
}: {
  query: string | undefined | null;
  currentPage: number | undefined | null;
}) {
  const projects = await fetchFilteredProjects(query, currentPage);
  const companies = await fetchCompanies();
  const employees = await fetchEmployees();
  //console.log('Projects:', projects);
  return (
    <div className="w-full">
      <div className="mt-6 flow-root">
        <div className="overflow-x-auto">
          <div className="inline-block min-w-full align-middle">
            <div className="overflow-hidden rounded-md bg-gray-50 p-2 md:pt-0">
              <div className="md:hidden">
                {projects?.map((project) => {
                  const provider = companies.find((c) => c.id === project.idprovider);
                  const taker = companies.find((c) => c.id === project.idtaker);
                  const takerSponsor = employees.find((e) => e.id === project.idtakersponsor);
                  const providerSponsor = employees.find((e) => e.id === project.idprovidersponsor);
                  return (
                    <div
                      key={project.id}
                      className="mb-6 w-full rounded-md bg-blue-200 p-2"
                    >
                      <div className="flex-row w-full items-center justify-between border-b pb-4">
                        <div className=' hover:bg-green-500'>
                          <p className='text-2xl'>{project.title}</p>
                          <p>Date: {formatDateToLocal(project.timestamp)}</p>                          
                          <p>Taker: {taker ? taker.name : 'Taker not found'}</p>
                          <p>Taker Sponsor: {takerSponsor ? takerSponsor.name : 'Taker Sponsor not found'}</p>
                          <p>Provider: {provider ? provider.name : 'Profider not found'}</p>
                          <p>Provider Sponsor: {providerSponsor ? providerSponsor.name : 'Provider Sponsor not found'}</p>
                        </div>
                      </div>
                      <div className="flex-row items-center justify-between pt-1">
                        <div>
                          <p>Prevision Hours: {project.timeprevision}</p>
                          <p>Spend Hours: {project.timespend}</p>
                        </div>
                      </div>
                      <div className="flex items-center justify-between pt-1">
                        <div className="flex justify-end gap-2">
                          <ViewProject id={project.id} />
                          <UpdateProject id={project.id} />
                          <DeleteProject id={project.id} />
                          <PdfProject id={project.id} />
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
              <table className="hidden min-w-full text-gray-900 md:table">
                <thead className="rounded-md bg-blue-100 text-left text-xs font-normal">
                  <tr>
                    <th scope="col" className="px-1 py-1 font-medium">
                      VIEW
                    </th>
                    <th scope="col" className="px-1 py-1 font-medium">
                      TAKER
                    </th>
                    <th scope="col" className="px-1 py-1 font-medium">
                      TAKER SPONSOR
                    </th>
                    <th scope="col" className="px-1 py-1 font-medium">
                      PROVIDER
                    </th>
                    <th scope="col" className="px-1 py-1 font-medium">
                      PROVIDER SPONSOR
                    </th>
                    <th scope="col" className="px-1 py-1 font-medium">
                      TITLE
                    </th>
                    <th scope="col" className="px-1 py-1 font-medium">
                      DATE
                    </th>
                    <th scope="col" className="px-1 py-1 font-medium">
                      COMMENTS
                    </th>
                    <th scope="col" className="px-1 py-1 font-medium">
                      TIME PREVISION
                    </th>
                    <th scope="col" className="px-1 py-1 font-medium">
                      TIME SPEND
                    </th>
                    <th
                      scope="col"
                      className="relative pb-4 pl-3 pr-6 pt-2 sm:pr-6"
                    >
                      <span className="sr-only">Edit</span>
                    </th>

                  </tr>
                </thead>

                <tbody className="divide-y divide-gray-200 text-gray-900">
                  {projects.map((project) => {
                    const provider = companies.find((c) => c.id === project.idprovider);
                    const taker = companies.find((c) => c.id === project.idtaker);
                    const takerSponsor = employees.find((e) => e.id === project.idtakersponsor);
                    const providerSponsor = employees.find((e) => e.id === project.idprovidersponsor);
  
                    return (
                      <tr key={project.id} className="group">
                        <td className="whitespace-nowrap py-2 pl-2 pr-2">
                          <div className="flex justify-end gap-3">
                            <ViewProject id={project.id} />
                          </div>
                        </td>
                        <td className="bg-white w-20 py-2 pl-2 pr-2 text-xs text-black group-first-of-type:rounded-md group-last-of-type:rounded-md xs:pl-6">
                          <div className="flex items-center gap-3">
                            <p>{taker ? taker.name : 'Taker not found'}</p>
                          </div>
                        </td>
                        <td className="bg-white px-2 py-1 text-xs">
                          <p>{takerSponsor ? takerSponsor.name : 'Taker Sponser not found'}</p>
                        </td>
                        <td className="bg-white px-2 py-1 text-xs">
                          <p>{provider ? provider.name : 'Provider not found'}</p>
                        </td>
                        <td className="bg-white px-2 py-1 text-xs">
                          <p>{providerSponsor ? providerSponsor.name : 'Provider Sponsor not found'}</p>
                        </td>
                        <td className=" bg-white px-4 py-5 text-xs">
                          <p>{project.title}</p>
                        </td>
                        <td className="bg-white px-2 py-1 text-xs">
                          {formatDateToLocal(project.timestamp)}
                        </td>
                        <td className=" bg-white px-4 py-5 text-xs">
                          <p>{project.comments}</p>
                        </td>
                        <td className=" bg-white px-4 py-5 text-xs">
                          <p>{project.timeprevision}</p>
                        </td>
                        <td className=" bg-white px-4 py-5 text-xs">
                          <p>{project.timespend}</p>
                        </td>
                        <td className="whitespace-nowrap py-2 pl-2 pr-2">
                          <div className="flex justify-end gap-3">
                            <UpdateProject id={project.id} />
                            <DeleteProject id={project.id} />
                            <PdfProject id={project.id} />
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
