import { UpdateSprint, DeleteSprint } from '@/app/ui/sprints/buttons';
import { formatDateToLocal, formatTime } from '@/app/lib/utils/utils';
import { fetchFilteredSprints } from '@/app/lib/sprints/data';
import { fetchProjects } from '@/app/lib/projects/data';
import { fetchTasks } from '@/app/lib/tasks/data';

export default async function SprintsTable({
  query,
  currentPage,
}: {
  query: string | undefined | null;
  currentPage: number | undefined | null;
}) {
  const sprints = await fetchFilteredSprints(query, currentPage);
  const tasks = await fetchTasks();
  const projects = await fetchProjects();

  return (
    <div className="w-full p-4">
      <div className="mt-6 flow-root">
        <div className="overflow-x-auto">
          <div className="inline-block min-w-full align-middle">
            <div className="overflow-hidden rounded-lg bg-white shadow-md p-4 md:pt-0">
              {/* Mobile Card View */}
              <div className="md:hidden space-y-4">
                {sprints?.map((sprint) => {
                  const task = tasks.find((e) => e.id === sprint.idtask);
                  const project = projects.find((p) => p.id === task?.idproject);
                  return (
                    <div key={sprint.id} className="p-4 rounded-lg bg-blue-100 shadow-md">
                      <div className="flex flex-col gap-2 border-b pb-2">
                        <p className="font-semibold text-gray-700">{project?.title}</p>
                        <div className="text-xs text-gray-600">
                          <p><span className="font-medium">Task:</span> {task?.title}</p>
                          <p><span className="font-medium">Date:</span> {formatDateToLocal(sprint.date)}</p>
                        </div>
                        <div className="text-xs text-gray-600">
                          <p><span className="font-medium">Start:</span> {formatTime(sprint.starttime)}</p>
                          <p><span className="font-medium">End:</span> {formatTime(sprint.endtime)}</p>
                        </div>
                      </div>
                      <div className="flex justify-end mt-2">
                        <UpdateSprint id={sprint.id} />
                      </div>
                    </div>
                  )
                })}
              </div>

              {/* Desktop Table View */}
              <table className="hidden min-w-full text-gray-900 md:table">
                <thead className="bg-blue-100 text-left text-xs font-medium uppercase">
                  <tr>
                    {['Edit', 'Project', 'Task', 'Date', 'Start', 'End', 'Delete'].map((header) => (
                      <th key={header} className="px-1 py-1">{header}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {sprints?.map((sprint) => {
                    const task = tasks.find((e) => e.id === sprint.idtask);
                    const project = projects.find((p) => p.id === task?.idproject);
                    return (
                      <tr key={sprint.id} className="hover:bg-gray-300">
                        <td className="px-1 py-1">
                          <UpdateSprint id={sprint.id} />
                        </td>
                        <td className="px-1 py-1 font-sm text-gray-700">{project?.title}</td>
                        <td className="px-1 py-1 font-sm text-gray-700">{task?.title}</td>
                        <td className="px-1 py-1 text-xs text-gray-600">{formatDateToLocal(sprint.date)}</td>
                        <td className="px-1 py-1 text-xs text-gray-600">{formatTime(sprint.starttime)}</td>
                        <td className="px-1 py-1 text-xs text-gray-600">{formatTime(sprint.endtime)}</td>
                        <td className="px-1 py-1">
                          <DeleteSprint id={sprint.id} />
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
