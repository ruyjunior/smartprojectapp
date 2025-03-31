'use client'
import { Project } from '@/app/lib/projects/definitions';
import { InvoicePDF } from '@/app/lib/companies/definitions';
import { Company } from '@/app/lib/companies/definitions';
import { Employee } from '@/app/lib/employees/definitions';
import { Task } from '@/app/lib/tasks/definitions';
import { Sprint } from '@/app/lib/sprints/definitions';
import { DateFilter } from '@/app/ui/invoices/DateFilter';
import { useState } from 'react';
import { formatDateDb, formatTime, formatDateToLocal } from '@/app/lib/utils/utils';
import TaskStatus from '@/app/ui/tasks/status';
import React from 'react';
import { PdfInvoice } from './buttons';


export default function InvoiceForm({
  company,
  projects,
  companies,
  employees,
  tasks,
  sprints
}: {
  company: Company;
  projects: Project[];
  companies: Company[];
  employees: Employee[];
  tasks: Task[];
  sprints: Sprint[];
}
) {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const start = formatDateDb(startDate);
  const end = formatDateDb(endDate);

  const filteredSprints = sprints.filter(sprint => {
    if (!startDate || !endDate) return true; // Se nenhuma data for selecionada, retorna todos os sprints
    const sprintDate = formatDateDb(sprint.date);
    return sprintDate >= start && sprintDate <= end;
  });

  const filteredTasks = tasks.filter((t) =>
    filteredSprints.some((s) => s.idtask === t.id)
  );
  console.log('start: ' + start);
  console.log('end: ' + end);

  const data: InvoicePDF = {
    projects: projects,
    taker: company,
    companies: companies,
    tasks: filteredTasks,
    sprints: filteredSprints,
    employees: employees,
    datein: startDate,
    dateout: endDate
  } as InvoicePDF;

  return (
    <div>
      <DateFilter
        startDate={startDate}
        endDate={endDate}
        onStartDateChange={setStartDate}
        onEndDateChange={setEndDate}
      />

      <PdfInvoice id={company.id} data={data}  />

      <div className="w-full p-4">
        <div className="mt-6 flow-root">
          <div className="overflow-x-auto">
            <div className="inline-block min-w-full align-middle">
              <div className="overflow-hidden rounded-lg bg-white shadow-md p-4 md:pt-0">
                {/* Mobile Card View */}
                <div className="md:hidden space-y-4">
                  {filteredTasks?.map((task) => {
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
                        <div className="mt-1">
                          <p>{taskSprints[0] ? 'Sprints' : ''}</p>
                          {taskSprints.map((sprint, index) => (
                            <div key={sprint.id} className="flex flex-col gap-1 border-t pt-1 mt-1">
                              <div className="flex justify-between text-xs text-gray-600 text-center ">
                                <p className="font-medium align-middle">{index + 1}</p>
                                <p><span className="font-medium">Date</span> {formatDateToLocal(sprint.date)}</p>
                                <p><span className="font-medium">Start</span> {formatTime(sprint.starttime)}</p>
                                <p><span className="font-medium">End</span> {formatTime(sprint.endtime)}</p>
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
                      {['Status', 'Details', 'What', 'How', 'Who', 'Prevision', 'Spent'].map((header) => (
                        <th key={header} className="px-1 py-1">{header}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {filteredTasks?.map((task) => {
                      const employee = employees.find((e) => e.id === task.who);
                      const taskSprints = sprints.filter((sprint) => sprint.idtask === task.id);
                      return (
                        <React.Fragment key={task.id}>
                          <tr className="hover:bg-gray-400">
                            <td className="py-2 px-2">
                              <div className="mt-2">
                                <TaskStatus status={task.status} />
                              </div>
                            </td>
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
                          </tr>
                          {taskSprints.map((sprint, index) => (
                            <tr key={sprint.id} className="hover:bg-gray-200 text-xs">
                              <td className="px-1 py-0.5 text-gray-600 text-center">{index + 1}</td>
                              <td className="px-1 py-0.5 text-gray-600 text-center">{formatDateToLocal(sprint.date)}</td>
                              <td className="px-1 py-0.5 text-gray-600 text-center">{formatTime(sprint.starttime)}</td>
                              <td className="px-1 py-0.5 text-gray-600 text-center">{formatTime(sprint.endtime)}</td>
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
    </div>
  );
}