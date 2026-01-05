import { ArrowPathIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';
import { lusitana } from '@/app/ui/fonts';
import TaskStatus from '@/app/(private)/tasks/components/status';
import { fetchProjectsCurrentUser } from '@/app/query/projects/data';
import { fetchTasksUser, fetchTasks } from '@/app/query/tasks/data';
import { CurrentUser } from '@/app/utils/utils';
import { fetchUsers } from '@/app/query/users/data';
import { Task } from '@/app/query/tasks/definitions';
import Link from 'next/link';


export default async function LatestTasks() {
  const currentUser = await CurrentUser();
  let tasks = [] as Task[];
  if (currentUser.role === 'admin') {
    tasks = await fetchTasks();
  } else {
    tasks = await fetchTasksUser();
  }
  const users = await fetchUsers();
  const projects = await fetchProjectsCurrentUser();

  return (
    <div className="flex w-full flex-col md:col-span-4">
      <h2 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
        Latest Tasks
      </h2>
      <div className="flex grow flex-col justify-between rounded-xl bg-gray-50 p-4">
        {<div className="bg-white px-6">
          {await Promise.all(tasks.map(async (task, i) => {
            const user = users.find((u) => u.id === task.who);
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
                  <Link href={`/projects/${project?.id}/view`}>
                    <div className="min-w-0">
                      <p className="truncate text-sm font-semibold md:text-base">
                        {project?.title}
                      </p>
                      <p className="hidden text-sm text-gray-500 sm:block">
                        {task.title}
                      </p>
                      <p className="hidden text-sm text-gray-500 sm:block">
                        {user?.name}
                      </p>
                    </div>
                  </Link>
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
