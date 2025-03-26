import React from 'react';
import { UpdateTask, DeleteTask } from '@/app/ui/tasks/buttons';
import { UpdateSprint, DeleteSprint, CreateSprintBasic } from '@/app/ui/sprints/buttons';
import TaskStatus from '@/app/ui/tasks/status';
import { formatDateToLocal, formatTime } from '@/app/lib/utils/utils';
import { fetchFilteredTasks, fetchTaskById } from '@/app/lib/tasks/data';
import { fetchProjects } from '@/app/lib/projects/data';
import { fetchEmployees } from '@/app/lib/employees/data';
import { fetchSprints } from '@/app/lib/sprints/data';

export default async function TasksTable({
    query,
    currentPage,
}: {
    query: string | undefined | null;
    currentPage: number | undefined | null;
}) {
    const tasks = await fetchFilteredTasks(query, currentPage);
    const employees = await fetchEmployees();
    const projects = await fetchProjects();
    const sprints = await fetchSprints();

    return (
        <div className="w-full p-4">
            <div className="mt-6 flow-root">
                <div className="overflow-x-auto">
                    <div className="inline-block min-w-full align-middle">
                        <div className="overflow-hidden rounded-lg bg-white shadow-md p-4 md:pt-0">
                            {/* Mobile Card View */}
                            <div className="md:hidden space-y-4">
                                {tasks?.map((task) => {
                                    const employee = employees.find((e) => e.id === task.who);
                                    const taskSprints = sprints.filter((sprint) => sprint.idtask === task.id);
                                    return (
                                        <div key={task.id} className="p-4 rounded-lg bg-blue-100 shadow-md">
                                            <div className="flex flex-col gap-2 border-b pb-2">
                                                <p className="font-semibold text-gray-700">{task.title}</p>
                                                <div className="text-xs text-gray-600">
                                                    <p><span className="font-medium">Start:</span> {formatDateToLocal(task.startdate)}</p>
                                                    <p><span className="font-medium">End:</span> {formatDateToLocal(task.enddate)}</p>
                                                </div>
                                                <div className="text-xs text-gray-600">
                                                    <p><span className="font-medium">Prevision:</span> {formatTime(task.timeprevision)}</p>
                                                    <p><span className="font-medium">Spent:</span> {task.timespend}</p>
                                                </div>
                                            </div>
                                            <div className="text-xs text-gray-700 pt-2">
                                                <p><span className="font-medium">What:</span> {task.what}</p>
                                                <p><span className="font-medium">How:</span> {task.how}</p>
                                                <p><span className="font-medium">Who:</span> {employee?.name}</p>
                                            </div>
                                            <div className="flex justify-between items-center pt-2">
                                                <p className="text-xs font-medium text-gray-700">Status: {task.status}</p>
                                                <p className="text-xs font-medium text-gray-700">Grade: {task.grade}</p>
                                            </div>
                                            <div className="flex justify-end mt-2 gap-2">
                                                <UpdateTask id={task.id} />
                                                <CreateSprintBasic id={task.id} />
                                            </div>
                                            <div className="mt-1">
                                                <p>{taskSprints[0] ? 'Sprints' : ''}</p>
                                                {taskSprints.map((sprint, index) => (
                                                    <div key={sprint.id} className="flex flex-col gap-1 border-t pt-1 mt-1">
                                                        <div className="flex justify-between text-xs text-gray-600 text-center ">
                                                            <p className="font-medium align-middle">{index + 1}</p>
                                                            <UpdateSprint id={sprint.id} />
                                                            <p><span className="font-medium">Date</span> {formatDateToLocal(sprint.date)}</p>
                                                            <p><span className="font-medium">Start</span> {formatTime(sprint.starttime)}</p>
                                                            <p><span className="font-medium">End</span> {formatTime(sprint.endtime)}</p>
                                                            <DeleteSprint id={sprint.id} />
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>

                            {/* Desktop Table View */}
                            <table className="hidden min-w-full text-gray-900 md:table">
                                <thead className="bg-blue-100 text-left text-xs font-medium uppercase">
                                    <tr>
                                        {['Edit', 'Details', 'What', 'How', 'Who', 'Prevision', 'Spent', 'Delete'].map((header) => (
                                            <th key={header} className="px-1 py-1">{header}</th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200">
                                    {tasks?.map((task) => {
                                        const employee = employees.find((e) => e.id === task.who);
                                        const taskSprints = sprints.filter((sprint) => sprint.idtask === task.id);
                                        return (
                                            <React.Fragment key={task.id}>
                                                <tr className="hover:bg-gray-400">
                                                    <td className="py-2 px-2">                                                        <div className="flex gap-2 items-center">
                                                        <UpdateTask id={task.id} />
                                                        <CreateSprintBasic id={task.id} />
                                                    </div>
                                                        <div className="mt-2">
                                                            <TaskStatus status={task.status} />
                                                        </div>                                                    </td>
                                                    {/* Details Column */}
                                                    <td className="px-1 py-1 text-xs text-gray-700">
                                                        <p className="font-bold text-sm text-gray-900"><span className="font-medium"></span> {task.title}</p>
                                                        <p><span className="font-medium">Start:</span> {formatDateToLocal(task.startdate)}</p>
                                                        <p><span className="font-medium">End:</span> {formatDateToLocal(task.enddate)}</p>
                                                    </td>
                                                    {/* What Column */}
                                                    <td className="px-1 py-1 text-xs text-gray-700">{task.what}</td>
                                                    {/* How Column */}
                                                    <td className="px-1 py-1 text-xs text-gray-700">{task.how}</td>
                                                    <td className="px-1 py-1 text-xs font-medium">{employee?.name}</td>
                                                    <td className="px-1 py-1 text-xs text-gray-600">{formatTime(task.timeprevision)}</td>
                                                    <td className="px-1 py-1 text-xs text-gray-600">{formatTime(task.timespend)}</td>
                                                    <td className="px-1 py-1">
                                                        <DeleteTask id={task.id} />
                                                    </td>
                                                </tr>
                                                {taskSprints.map((sprint, index) => (
                                                    <tr key={sprint.id} className="hover:bg-gray-200 text-xs">
                                                        <td className="py-0.5 px-2 flex gap-1 items-start">
                                                            <UpdateSprint id={sprint.id} />
                                                        </td>
                                                        <td className="px-1 py-0.5 text-gray-600 text-center">{index + 1}</td>
                                                        <td className="px-1 py-0.5 text-gray-600 text-center">{formatDateToLocal(sprint.date)}</td>
                                                        <td className="px-1 py-0.5 text-gray-600 text-center">{formatTime(sprint.starttime)}</td>
                                                        <td className="px-1 py-0.5 text-gray-600 text-center">{formatTime(sprint.endtime)}</td>
                                                        <td className="px-1 py-0.5">
                                                            <DeleteSprint id={sprint.id} />
                                                        </td>
                                                    </tr>
                                                ))}
                                            </React.Fragment>
                                        );
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