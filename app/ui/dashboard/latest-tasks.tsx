import { ArrowPathIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';
import Image from 'next/image';
import { lusitana } from '@/app/ui/fonts';
import { fetchLatestTasks } from '@/app/lib/data';
import { fetchEmployees, fetchEmployeeById } from '@/app/lib/employees/data';
import TaskStatus from '@/app/ui/tasks/status';
import { fetchProjects } from '@/app/lib/projects/data';


export default async function LatestTasks() {
  const LatestTasks = await fetchLatestTasks();
  const employees = await fetchEmployees();
  const projects = await fetchProjects();

  return (
    <div className="flex w-full flex-col md:col-span-4">
      <h2 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
        Latest Tasks
      </h2>
      <div className="flex grow flex-col justify-between rounded-xl bg-gray-50 p-4">
        {<div className="bg-white px-6">
          {await Promise.all(LatestTasks.map(async (task, i) => {
            const employee = employees.find((e) => e.id === task.who);
            const project = projects.find((p) => p.id === task.idproject);
            return (
              <div
                key={task.id}
                className={clsx(
                  'flex flex-row items-center justify-between py-4',
                  {
                    'border-t': i !== 0,
                  },
                )}
              >
                <div className="flex items-center">
                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold md:text-base">
                      {task.title}
                    </p>
                    <p className="hidden text-sm text-gray-500 sm:block">
                      {employee?.name}
                    </p>
                    <p className="hidden text-sm text-gray-500 sm:block">
                      {project?.title}
                    </p>
                  </div>
                </div>
                <p
                  className={`${lusitana.className} truncate text-sm font-medium md:text-base`}
                >
                  <TaskStatus status={task.status} />
                </p>
              </div>
            );
          }))}
        </div>}
        <div className="flex items-center pb-2 pt-6">
          <ArrowPathIcon className="h-5 w-5 text-gray-500" />
          <h3 className="ml-2 text-sm text-gray-500 ">Updated just now</h3>
        </div>
      </div>
    </div>
  );
}
