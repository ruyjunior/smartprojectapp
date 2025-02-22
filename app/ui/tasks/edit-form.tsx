'use client';

import { useActionState } from 'react';
import React, { useState } from 'react';
import { Task } from '@/app/lib/tasks/definitions';
import { Employee } from '@/app/lib/employees/definitions';
import { Project } from '@/app/lib/projects/definitions';
import { CurrencyDollarIcon, UserCircleIcon, CalendarDateRangeIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { Button } from '@/app/ui/button';
import { updateTask, State } from '@/app/lib/tasks/actions';
import { formatDateToLocal, formatDateBr, formatDateDb} from '@/app/lib/utils/utils';

export default function EditTaskForm({
  task,
  employees,
  projects,
}: {
  task: Task;
  employees: Employee[];
  projects: Project[];
}) {
  const initialState: State = { message: null, errors: {} };
  const updateTaskWithId = updateTask.bind(null, task.id);
  const [state, formAction] = useActionState(updateTaskWithId, initialState);

  const startdate = formatDateDb(task.startdate);
  const enddate = formatDateDb(task.enddate);

  return (
    <form action={formAction}>
      <div className="rounded-md bg-gray-50 p-4 md:p-6">
        {/* START DATE */}
        <div className="mb-4">
          <label htmlFor="startdate" className="mb-2 block text-sm font-medium">
            Enter Star date
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="startdate"
                name="startdate"
                type="date"
                defaultValue={startdate}
                maxLength={10}
                //onChange={handleChangeStartDate}
                placeholder="Enter a date"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                aria-describedby="startdate-error"
              />
              <CalendarDateRangeIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>
        </div>

        {/* END DATE */}
        <div className="mb-4">
          <label htmlFor="enddate" className="mb-2 block text-sm font-medium">
            Enter End date
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="enddate"
                name="enddate"
                type="date"
                defaultValue={enddate}
                maxLength={10}
                //onChange={handleChangeEndDate}
                placeholder="Enter a date"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                aria-describedby="enddate-error"
              />
              <CalendarDateRangeIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>
        </div>

        {/* Employee*/}
        <div className="mb-4">
          <label htmlFor="who" className="mb-2 block text-sm font-medium">
            Choose who will do the task
          </label>
          <div className="relative">
            <select
              id="who"
              name="who"
              className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              defaultValue={task.who}
              aria-describedby="who-error"
            >
              <option value="" disabled>
                Select a who
              </option>
              {employees.map((employee) => (
                <option key={employee.id} value={employee.id}>
                  {employee.name}
                </option>
              ))}
            </select>
            <UserCircleIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
          </div>
          <div id="who-error" aria-live="polite" aria-atomic="true">
            {state.errors?.who &&
              state.errors.who.map((error: string) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </div>

        {/* Title */}
        <div className="mb-4">
          <label htmlFor="title" className="mb-2 block text-sm font-medium">
            Enter a title
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="title"
                name="title"
                type="text"
                defaultValue={task.title}
                placeholder="Enter a title"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                aria-describedby="title-error"
                />
              <CurrencyDollarIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
            <div id="title-error" aria-live="polite" aria-atomic="true">
              {state.errors?.title &&
                state.errors.title.map((error: string) => (
                  <p className="mt-2 text-sm text-red-500" key={error}>
                    {error}
                  </p>
                ))}
            </div>
          </div>
        </div>

        {/* What */}
        <div className="mb-4">
          <label htmlFor="what" className="mb-2 block text-sm font-medium">
            Enter a what will be done
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="what"
                name="what"
                type="text"
                defaultValue={task.what}
                placeholder="Enter what will be done"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                aria-describedby="what-error"
                />
              <CurrencyDollarIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
            <div id="what-error" aria-live="polite" aria-atomic="true">
              {state.errors?.what &&
                state.errors.what.map((error: string) => (
                  <p className="mt-2 text-sm text-red-500" key={error}>
                    {error}
                  </p>
                ))}
            </div>
          </div>
        </div>

        {/* How */}
        <div className="mb-4">
          <label htmlFor="how" className="mb-2 block text-sm font-medium">
            Enter how it was done
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="how"
                name="how"
                type="text"
                defaultValue={task.how}
                placeholder="Enter how it was done"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                aria-describedby="how-error"
                />
              <CurrencyDollarIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
            <div id="how-error" aria-live="polite" aria-atomic="true">
              {state.errors?.how &&
                state.errors.how.map((error: string) => (
                  <p className="mt-2 text-sm text-red-500" key={error}>
                    {error}
                  </p>
                ))}
            </div>
          </div>
        </div>

        {/* Grade */}
        <div className="mb-4">
          <label htmlFor="grade" className="mb-2 block text-sm font-medium">
            Choose grade task
          </label>
          <div className="relative">
            <select
              id="grade"
              name="grade"
              className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              defaultValue={task.grade}
              aria-describedby="grade-error"
            >
              <option value="" disabled> Select a grade </option>
              <option value="low"> Low </option>
              <option value="medium"> Medium </option>
              <option value="high"> High </option>
            </select>
            <UserCircleIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
          </div>
          <div id="grade-error" aria-live="polite" aria-atomic="true">
            {state.errors?.grade &&
              state.errors.grade.map((error: string) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </div>

        {/* Status */}
        <div className="mb-4">
          <label htmlFor="status" className="mb-2 block text-sm font-medium">
            Choose status task
          </label>
          <div className="relative">
            <select
              id="status"
              name="status"
              className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              defaultValue={task.status}
              aria-describedby="status-error"
            >
              <option value="" disabled> Select a status </option>
              <option value="stopped"> Stopped </option>
              <option value="doing"> Doing </option>
              <option value="done"> Done </option>
            </select>
            <UserCircleIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
          </div>
          <div id="status-error" aria-live="polite" aria-atomic="true">
            {state.errors?.grade &&
              state.errors.grade.map((error: string) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </div>

        {/* Project*/}
        <div className="mb-4">
          <label htmlFor="idproject" className="mb-2 block text-sm font-medium">
            Choose Project
          </label>
          <div className="relative">
            <select
              id="idproject"
              name="idproject"
              className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              defaultValue={task.idproject}
              aria-describedby="idproject-error"
            >
              <option value="" disabled>
                Select Project
              </option>
              {projects.map((project) => (
                <option key={project.id} value={project.id}>
                  {project.title}
                </option>
              ))}
            </select>
            <UserCircleIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
          </div>
          <div id="who-error" aria-live="polite" aria-atomic="true">
            {state.errors?.who &&
              state.errors.who.map((error: string) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </div>

      </div>
      <div className="mt-6 flex justify-end gap-4">
        <Link
          href="/dashboard/tasks"
          className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
        >
          Cancel
        </Link>
        <Button type="submit">Edit Task</Button>
      </div>
    </form>
  );
}
