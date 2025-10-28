import Image from 'next/image';
import { Update, View, Pdf } from '@/app/ui/buttons';
import { formatDateToLocal } from '@/app/utils/utils';
import { fetchFilteredProjects } from '@/app/query/projects/data';
import { fetchClients } from '@/app/query/clients/data';
import { fetchContacts } from '@/app/query/contacts/data';
import { fetchTasks } from '@/app/query/tasks/data';
import { DeleteButton } from './deletebutton';

export default async function ProjectsTable({
  query,
  currentPage,
}: {
  query: string | undefined | null;
  currentPage: number | undefined | null;
}) {
  const projects = await fetchFilteredProjects(query, currentPage);
  const clients = await fetchClients();
  const contacts = await fetchContacts();
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
                  const client = clients.find((c) => c.id === project.idclient);
                  const clientContact = contacts.find((e) => e.id === project.idclientcontact);
                  const internalContact = contacts.find((e) => e.id === project.idcompanycontact);

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
                        <p><span className="font-medium">Client:</span> {client ? client.name : 'Not found'}</p>
                        <p><span className="font-medium">Client Contact:</span> {clientContact ? clientContact.name : 'Not found'}</p>
                        <p><span className="font-medium">Internal Contact:</span> {internalContact ? internalContact.name : 'Not found'}</p>
                      </div>
                      <div className="flex justify-between mt-4 text-sm text-gray-700">
                        <p>Prevision Hours: {project.timeprevision}</p>
                        <p>Spend Hours: {project.timespend}</p>
                        <p>Progress: {progress}%</p>
                      </div>
                      <div className="flex justify-end gap-3 pt-3">
                        <View href={`/projects/${project.id}/view`} />
                        <Update href={`/projects/${project.id}/edit`} />
                        <Pdf href={`/projects/${project.id}/pdf`} />
                      </div>
                    </div>
                  )
                })}
              </div>
              <table className="hidden min-w-full text-gray-900 md:table">
                <thead className="bg-blue-100 text-left text-xs font-medium">
                  <tr>
                    <th className="px-2 py-2">EDIT</th>
                    <th className="px-2 py-2">TITLE</th>
                    <th className="px-2 py-2">CLIENT</th>
                    <th className="px-2 py-2">CLIENT CONTACT</th>
                    <th className="px-2 py-2">INTERNAL CONTACT</th>
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
                    const client = clients.find((c) => c.id === project.idclient);
                    const clientContact = contacts.find((e) => e.id === project.idclientcontact);
                    const companyContact = contacts.find((e) => e.id === project.idcompanycontact);

                    const projectTasks = tasks.filter((task) => task.idproject === project.id);
                    const highTasks = projectTasks.filter(task => task.grade === "high");
                    const completedTasks = highTasks.filter(task => task.status === "done");
                    const progress = highTasks.length > 0 ? ((completedTasks.length / highTasks.length) * 100).toFixed(2) : "0.00";


                    return (
                      <tr key={project.id} className="hover:bg-gray-300">
                        <td className="py-2 px-2 flex gap-2">
                          <View href={`/projects/${project.id}/view`} />
                          <Update href={`/projects/${project.id}/edit`} />
                          <Pdf href={`/projects/${project.id}/pdf`} />
                        </td>
                        <td className="px-2 py-2 text-xs font-medium">{project.title}</td>
                        <td className="px-2 py-2 text-xs">{client ? client.name : 'Not found'}</td>
                        <td className="px-2 py-2 text-xs">{clientContact ? clientContact.name : 'Not found'}</td>
                        <td className="px-2 py-2 text-xs">{companyContact ? companyContact.name : 'Not found'}</td>
                        <td className="px-2 py-2 text-xs">{formatDateToLocal(project.timestamp)}</td>
                        <td className="px-2 py-2 text-xs">{project.comments}</td>
                        <td className="px-2 py-2 text-xs">{project.timeprevision}</td>
                        <td className="px-2 py-2 text-xs">{project.timespend}</td>
                        <td className="px-2 py-2 text-xs">{progress}%</td>
                        <td className="py-2 px-2 flex justify-end">
                          <DeleteButton id={project.id} />
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