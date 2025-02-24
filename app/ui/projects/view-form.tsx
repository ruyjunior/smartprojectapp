import Image from 'next/image';
import { UpdateProject, DeleteProject, PdfProject } from '@/app/ui/projects/buttons';
import { UpdateTask, DeleteTask } from '@/app/ui/tasks/buttons';
import TaskStatus from '@/app/ui/tasks/status';
import { formatDateToLocal, formatCurrency } from '@/app/lib/utils/utils';
import { fetchFilteredProjects } from '@/app/lib/projects/data';
import { fetchCompanies } from '@/app/lib/companies/data';
import { Task } from '@/app/lib/tasks/definitions';
import { Project } from '@/app/lib/projects/definitions';
import { Company } from '@/app/lib/companies/definitions';
import { Employee } from '@/app/lib/employees/definitions';

export default async function ProjectsTable({
  project,
  companies,
  tasks,
  employees
}: {
  project: Project;
  companies: Company[];
  tasks: Task[];
  employees: Employee[]
}) {

  return (
    <div className="w-full">
      <div className="mt-6 flow-root">
        <div className="overflow-x-auto">
          <div className="inline-block min-w-full align-middle">
            <div className="overflow-hidden rounded-md bg-gray-50 p-2 md:pt-0">
              <div className="md:hidden">
                {tasks?.map((task) => {
                  const employee = employees.find((e) => e.id === task.who);
                  return (
                    <div
                      key={task.id}
                      className="mb-6 w-full rounded-md bg-blue-200 p-2"
                    >
                      <div className="flex-row items-center justify-between border-b pb-2">
                        <div className="flex-col justify-left gap-3 pt-1">
                          <p>Title: {task.title}</p>
                          <div className="flex justify-left gap-3 pb-1">
                            <p className="text-sm text-gray-500">Start: {formatDateToLocal(task.startdate)}</p>
                            <p className="text-sm text-gray-500">End: {formatDateToLocal(task.enddate)}</p>
                          </div>
                          <div className="flex justify-left border-b gap-3 pb-1">
                            <p className="text-sm text-gray-500">Prevision: {task.timeprevision}</p>
                            <p className="text-sm text-gray-500">Spended: {task.timespend}</p>
                          </div>
                        </div>
                        <div className='pt-2'>
                          <p className="text-sm text-gray-500">What: {task.what}</p>
                          <p className="text-sm text-gray-500">How: {task.how}</p>
                          <p className="text-sm text-gray-500">Who: {employee?.name}</p>
                        </div>
                        <div className="flex justify-center gap-3 pt-2">
                          <p className="text-sm text-gray-500">Status: {task.status}</p>
                          <p className="text-sm text-gray-500">Grade: {task.grade}</p>
                        </div>
                      </div>
                      <div className="flex justify-end gap-3 pt-2">
                        <UpdateTask id={task.id} />
                        <DeleteTask id={task.id} />
                      </div>

                    </div>
                  )
                })}
              </div>
              <table className="hidden min-w-full rounded-md text-gray-900 md:table">
                <thead className="rounded-md bg-blue-100 text-left text-xs font-normal">
                  <tr>
                    <th scope="col" className="px-2 py-1 font-medium">
                      TITLE
                    </th>
                    <th scope="col" className="px-2 py-1 font-medium">
                      STATUS
                    </th>
                    <th scope="col" className="px-2 py-1 font-medium">
                      GRADE
                    </th>
                    <th scope="col" className="whitespace-nowrap px-2 py-1 font-medium">
                      START DATE
                    </th>
                    <th scope="col" className="px-2 py-1 font-medium">
                      END DATE
                    </th>
                    <th scope="col" className="px-2 py-1 font-medium">
                      WHAT
                    </th>
                    <th scope="col" className="px-2 py-1 font-medium ">
                      HOW
                    </th>
                    <th scope="col" className="px-2 py-1 font-medium">
                      WHO
                    </th>
                    <th scope="col" className="px-2 py-1 font-medium">
                      TIME PREVISION
                    </th>
                    <th scope="col" className="px-2 py-1 font-medium">
                      TIME SPENDED
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
                  {tasks.map((task) => {
                    const employee = employees.find((e) => e.id === task.who);
                    return (
                      <tr key={task.id} className="group">
                        <td className="whitespace-nowrap bg-white py-1 pl-1 pr-1 text-xs text-black group-first-of-type:rounded-md group-last-of-type:rounded-md xs:pl-6">
                          <div className="flex items-center gap-3">
                            {task.title}
                          </div>
                        </td>
                        <td className="whitespace-nowrap bg-white px-2 py-1 text-xs">
                          <TaskStatus status={task.status} />
                        </td>
                        <td className="whitespace-nowrap bg-white px-2 py-1 text-xs">
                          {task.grade}
                        </td>
                        <td className="whitespace-nowrap bg-white px-2 py-1 text-xs">
                          {formatDateToLocal(task.startdate)}
                        </td>
                        <td className="whitespace-nowrap bg-white px-2 py-1 text-xs">
                          {formatDateToLocal(task.enddate)}
                        </td>
                        <td className="bg-white px-2 py-1 text-xs">
                          {task.what}
                        </td>
                        <td className="bg-white px-2 py-1 text-xs break-words">
                          {task.how}
                        </td>
                        <td className="whitespace-nowrap bg-white px-2 py-1 text-xs">
                          {employee?.name}
                        </td>
                        <td className="whitespace-nowrap bg-white px-2 py-1 text-xs">
                          <p className="text-sm text-gray-500">{task.timeprevision}</p>
                        </td>
                        <td className="whitespace-nowrap bg-white px-2 py-1 text-xs">
                          <p className="text-sm text-gray-500">{task.timespend}</p>
                        </td>
                        <td className="whitespace-nowrap py-1 pl-2 pr-2">
                          <div className="flex justify-end gap-1">
                            <UpdateTask id={task.id} />
                            <DeleteTask id={task.id} />
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
    </div >
  );
}
