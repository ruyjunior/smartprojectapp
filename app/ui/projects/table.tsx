import Image from 'next/image';
import { UpdateProject, DeleteProject, PdfProject, ViewProject } from '@/app/ui/projects/buttons';
import { formatDateToLocal } from '@/app/lib/utils/utils';
import { fetchFilteredProjects } from '@/app/lib/projects/data';
import { fetchCompanies } from '@/app/lib/companies/data';
import { fetchEmployees } from '@/app/lib/employees/data';
import { fetchTasks } from '@/app/lib/tasks/data';

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
  const tasks = await fetchTasks();
  //console.log('Projects:', projects);
  return (
    <div className="w-full">
      <div className="mt-6 flow-root">
        <div className="overflow-x-auto">
          <div className="inline-block min-w-full align-middle">
            <div className="overflow-hidden rounded-lg bg-gray-50 shadow-md p-4 md:pt-0">
              <div className="md:hidden">
                {projects?.map((project) => {
                  const provider = companies.find((c) => c.id === project.idprovider);
                  const taker = companies.find((c) => c.id === project.idtaker);
                  const takerSponsor = employees.find((e) => e.id === project.idtakersponsor);
                  const providerSponsor = employees.find((e) => e.id === project.idprovidersponsor);

                  const projectTasks = tasks.filter((task) => task.idproject === project.id);
                  const highTasks = projectTasks.filter(task => task.grade === "high");
                  const completedTasks = highTasks.filter(task => task.status === "done" );
                  const progress = highTasks.length > 0 ? ((completedTasks.length / highTasks.length) * 100).toFixed(2) : "0.00";

                  return (
                    <div key={project.id} className="mb-6 w-full rounded-lg bg-blue-200 p-4 shadow-sm">
                      <div className="border-b pb-4">
                        <h3 className="text-xl font-semibold text-gray-900">{project.title}</h3>
                        <p className="text-sm text-gray-600">Date: {formatDateToLocal(project.timestamp)}</p>
                      </div>
                      <div className="pt-2 space-y-2 text-gray-800">
                        <p><span className="font-medium">Taker:</span> {taker ? taker.name : 'Not found'}</p>
                        <p><span className="font-medium">Taker Sponsor:</span> {takerSponsor ? takerSponsor.name : 'Not found'}</p>
                        <p><span className="font-medium">Provider:</span> {provider ? provider.name : 'Not found'}</p>
                        <p><span className="font-medium">Provider Sponsor:</span> {providerSponsor ? providerSponsor.name : 'Not found'}</p>
                      </div>
                      <div className="flex justify-between mt-4 text-sm text-gray-700">
                        <p>Prevision Hours: {project.timeprevision}</p>
                        <p>Spend Hours: {project.timespend}</p>
                        <p>Progress: {progress}%</p>
                      </div>
                      <div className="flex justify-end gap-3 pt-3">
                        <ViewProject id={project.id} />
                        <UpdateProject id={project.id} />
                        <PdfProject id={project.id} />
                      </div>
                    </div>
                  )
                })}
              </div>
              <table className="hidden min-w-full text-gray-900 md:table">
                <thead className="bg-blue-100 text-left text-xs font-medium">
                  <tr>
                    <th className="px-2 py-2">EDIT</th>
                    <th className="px-2 py-2">TAKER</th>
                    <th className="px-2 py-2">TAKER SPONSOR</th>
                    <th className="px-2 py-2">PROVIDER</th>
                    <th className="px-2 py-2">PROVIDER SPONSOR</th>
                    <th className="px-2 py-2">TITLE</th>
                    <th className="px-2 py-2">DATE</th>
                    <th className="px-2 py-2">COMMENTS</th>
                    <th className="px-2 py-2">TIME PREVISION</th>
                    <th className="px-2 py-2">TIME SPENT</th>
                    <th className="px-2 py-2">%</th>
                    <th className="px-2 py-2">DELETE</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {projects.map((project) => {
                    const provider = companies.find((c) => c.id === project.idprovider);
                    const taker = companies.find((c) => c.id === project.idtaker);
                    const takerSponsor = employees.find((e) => e.id === project.idtakersponsor);
                    const providerSponsor = employees.find((e) => e.id === project.idprovidersponsor);

                  const projectTasks = tasks.filter((task) => task.idproject === project.id);
                  const highTasks = projectTasks.filter(task => task.grade === "high");
                  const completedTasks = highTasks.filter(task => task.status === "done" );
                  const progress = highTasks.length > 0 ? ((completedTasks.length / highTasks.length) * 100).toFixed(2) : "0.00";


                    return (
                      <tr key={project.id} className="hover:bg-gray-300">
                        <td className="py-2 px-2 flex gap-2">
                          <ViewProject id={project.id} />
                          <UpdateProject id={project.id} />
                          <PdfProject id={project.id} />
                        </td>
                        <td className="px-2 py-2 text-xs">{taker ? taker.name : 'Not found'}</td>
                        <td className="px-2 py-2 text-xs">{takerSponsor ? takerSponsor.name : 'Not found'}</td>
                        <td className="px-2 py-2 text-xs">{provider ? provider.name : 'Not found'}</td>
                        <td className="px-2 py-2 text-xs">{providerSponsor ? providerSponsor.name : 'Not found'}</td>
                        <td className="px-2 py-2 text-xs font-medium">{project.title}</td>
                        <td className="px-2 py-2 text-xs">{formatDateToLocal(project.timestamp)}</td>
                        <td className="px-2 py-2 text-xs">{project.comments}</td>
                        <td className="px-2 py-2 text-xs">{project.timeprevision}</td>
                        <td className="px-2 py-2 text-xs">{project.timespend}</td>
                        <td className="px-2 py-2 text-xs">{progress}%</td>
                        <td className="py-2 px-2 flex justify-end">
                          <DeleteProject id={project.id} />
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