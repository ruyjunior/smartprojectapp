import { Update, View, Pdf, File, Payment } from '@/app/ui/buttons';
import { CurrentUser, formatCurrency, formatDateToLocal } from '@/app/utils/utils';
import { fetchFilteredProjects } from '@/app/query/projects/data';
import { fetchTasks } from '@/app/query/tasks/data';
import { DeleteButton } from './deletebutton';
import ClientCard from './clientCard';
import UserCard from './userCard';
import { fetchUsersProjects } from '@/app/query/users/data';

export default async function ProjectsTable({
  query,
  currentPage,
}: {
  query: string | undefined | null;
  currentPage: number | undefined | null;
}) {
  const currentUser = await CurrentUser();
  const usersProjects = await fetchUsersProjects();
  const allProjects = await fetchFilteredProjects(query, currentPage);
  const projects = currentUser?.role === 'admin' ? allProjects : allProjects.filter(project => usersProjects.some(up => up.idproject === project.id && up.iduser === currentUser.id));
  const tasks = await fetchTasks();
  const user = await CurrentUser();

  //console.log('Projects:', projects);
  return (
    <div className="w-full">
      <div className="mt-6 flow-root">
        <div className="overflow-x-auto">
          <div className="inline-block min-w-full align-middle">
            <div className="overflow-hidden rounded-lg bg-gray-50 shadow-md p-4 md:pt-0">
              <div className="md:hidden">
                {projects?.map((project) => {

                  const projectTasks = tasks.filter((task) => task.idproject === project.id);
                  const highTasks = projectTasks.filter(task => task.grade === "high");
                  const completedTasks = highTasks.filter(task => task.status === "done");
                  const progress = highTasks.length > 0 ? ((completedTasks.length / highTasks.length) * 100).toFixed(2) : "0.00";

                  return (
                    <div key={project.id} className="mb-6 w-full rounded-lg bg-blue-200 p-4 shadow-sm">
                      <div className="border-b pb-4">
                        <h3 className="text-xl font-semibold text-gray-900">{project.title}</h3>
                        <p className="text-sm text-gray-600">Date: {formatDateToLocal(project.timestamp)}</p>
                      </div>
                      <div className="pt-2 space-y-2 text-gray-800">
                        <ClientCard project={{ ...project, timeprevision: String(project.timeprevision), timespend: String(project.timespend) }} />
                      </div>
                      <div className="flex justify-between mt-4 text-sm text-gray-700">
                        <p>Prevision Hours: {project.timeprevision}</p>
                        <p>Spend Hours: {project.timespend}</p>
                        <p>Progress: {progress}%</p>
                        <p>Amount Payed: {formatCurrency(Number(project.amountpayed))}</p>
                      </div>
                      <div className="flex justify-end gap-3 pt-3">
                        <View href={`/projects/${project.id}/view`} />
                        <Pdf href={`/projects/${project.id}/pdf`} />
                        <File href={`/projects/${project.id}/files`} />
                        <Payment href={`/projects/${project.id}/payments`} />
                        {user?.role === 'admin' && (
                          <>
                            <Update href={`/projects/${project.id}/edit`} />
                          </>
                        )}
                      </div>
                    </div>
                  )
                })}
              </div>
              <table className="hidden min-w-full text-gray-900 md:table">
                <thead className="bg-blue-100 text-left text-xs font-medium">
                  <tr>
                    <th className="px-2 py-2">PANEL</th>
                    <th className="px-2 py-2">TITLE</th>
                    <th className="px-2 py-2">CLIENTS / CONTACTS</th>
                    <th className="px-2 py-2">USERS</th>
                    <th className="px-2 py-2">DATE</th>
                    <th className="px-2 py-2">COMMENTS</th>
                    <th className="px-2 py-2">TIME PREVISION</th>
                    <th className="px-2 py-2">TIME SPENT</th>
                    <th className="px-2 py-2">%%</th>
                    <th className="px-2 py-2">$$</th>
                    <th className="px-2 py-2">DELETE</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {projects.map((project) => {
                    const projectTasks = tasks.filter((task) => task.idproject === project.id);
                    const highTasks = projectTasks.filter(task => task.grade === "high");
                    const completedTasks = highTasks.filter(task => task.status === "done");
                    const progress = highTasks.length > 0 ? ((completedTasks.length / highTasks.length) * 100).toFixed(2) : "0.00";

                    return (
                      <tr key={project.id} className="hover:bg-gray-300">
                        <td className="px-2 py-2">
                          <div className="flex flex-col gap-2">

                            {/* Linha 1 */}
                            <div className="flex gap-2">
                              <View href={`/projects/${project.id}/view`} />
                              <Pdf href={`/projects/${project.id}/pdf`} />
                              <File href={`/projects/${project.id}/files`} />
                            </div>

                            {/* Linha 2 */}
                            <div className="flex gap-2">
                              <Payment href={`/projects/${project.id}/payments`} />

                              {user?.role === 'admin' && (
                                <Update href={`/projects/${project.id}/edit`} />
                              )}
                            </div>
                          </div>
                        </td>
                        <td className="px-2 py-2 text-xs font-medium">{project.title}</td>
                        <td className="py-2 px-2 gap-2">
                          <ClientCard project={{ ...project, timeprevision: String(project.timeprevision), timespend: String(project.timespend) }} />
                        </td>
                        <td className="py-2 px-2 gap-2">
                          <UserCard project={{ ...project, timeprevision: String(project.timeprevision), timespend: String(project.timespend) }} />
                        </td>

                        <td className="px-2 py-2 text-xs">{formatDateToLocal(project.timestamp)}</td>
                        <td className="px-2 py-2 text-xs">{project.comments}</td>
                        <td className="px-2 py-2 text-xs">{project.timeprevision}</td>
                        <td className="px-2 py-2 text-xs">{project.timespend}</td>
                        <td className="px-2 py-2 text-xs">{progress}%</td>
                        <td className="px-2 py-2 text-xs">{formatCurrency(Number(project.amountpayed))}</td>
                        <td className="py-2 px-2 flex justify-end">
                          {user?.role === 'admin' && (
                            <DeleteButton id={project.id} />
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