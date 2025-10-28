'use client';

import { useActionState, useTransition } from 'react';
import React, { useState } from 'react';
import { Task } from '@/app/query/tasks/definitions';
import { Contact } from '@/app/query/contacts/definitions';
import { Project } from '@/app/query/projects/definitions';
import {
  ClockIcon, UserCircleIcon, CalendarDateRangeIcon,
  TagIcon, DocumentTextIcon, HandThumbUpIcon, ExclamationTriangleIcon, DocumentCheckIcon
} from '@heroicons/react/24/outline';
import Link from 'next/link';
import { Button } from '@/app/ui/button';
import { updateTask, State } from '@/app/query/tasks/actions';
import { formatTime, formatDateDb } from '@/app/utils/utils';

export default function EditTaskForm({
  task,
  contacts,
  projects,
}: {
  task: Task;
  contacts: Contact[];
  projects: Project[];
}) {
  const initialState: State = { message: '', errors: {} };
  const updateTaskWithId = (state: State = initialState, formData: FormData) => updateTask(task.id, state, formData);
  const [state, formAction] = useActionState(updateTaskWithId, initialState);

  const today = new Date();
  const formattedEndDate = task.enddate ? formatDateDb(task.enddate) : today.toISOString().split('T')[0];
  const [enddate, setEndDate] = useState(formattedEndDate);

  const startdate = formatDateDb(task.startdate);
  const timeprevision = formatTime(task.timeprevision);
  const timespend = formatTime(task.timespend);

  const [isPending, startTransition] = useTransition();

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    startTransition(() => {
      formAction(new FormData(e.currentTarget));
    });
  }

  return (
    <form action={formAction} onSubmit={handleSubmit}>
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

        {/* Time Prevision */}
        <div className="mb-4">
          <label htmlFor="timeprevision" className="mb-2 block text-sm font-medium">
            Enter Time Prevision
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="timeprevision"
                name="timeprevision"
                type="time"
                step="60"
                defaultValue={task.timeprevision}
                //maxLength={5}
                //onChange={handleChangeEndDate}
                placeholder="Enter a time prevision"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                aria-describedby="enddate-error"
              />
              <ClockIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>
        </div>

        {/* Time Spend 
        <div className="mb-4">
          <label htmlFor="timespend" className="mb-2 block text-sm font-medium">
            Enter Time spend
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="timespend"
                name="timespend"
                type="time"
                defaultValue={task.timespend}
                //maxLength={5}
                //onChange={handleChangeEndDate}
                placeholder="Enter a time spend"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                aria-describedby="enddate-error"
              />
              <ClockIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>
        </div>
        */}

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
              {contacts.map((contact) => (
                <option key={contact.id} value={contact.id}>
                  {contact.name}
                </option>
              ))}
            </select>
            <UserCircleIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
          </div>
          <div id="who-error" aria-live="polite" aria-atomic="true">
            {state?.errors?.who &&
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
              <TagIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
            <div id="title-error" aria-live="polite" aria-atomic="true">
              {state?.errors?.title &&
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
              <DocumentTextIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
            <div id="what-error" aria-live="polite" aria-atomic="true">
              {state?.errors?.what &&
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
              <DocumentTextIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
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
            <ExclamationTriangleIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
          </div>
          <div id="grade-error" aria-live="polite" aria-atomic="true">
            {state?.errors?.grade &&
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
            <HandThumbUpIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
          </div>
          <div id="status-error" aria-live="polite" aria-atomic="true">
            {state?.errors?.grade &&
              state.errors.grade.map((error: string) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </div>

        {/* Project*/}
        {/* Hidden Field for Sprint ID Task */}
        <input type="hidden" name="idproject" value={task.idproject} />
        {/* Project*
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
            <DocumentCheckIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
          </div>
          <div id="who-error" aria-live="polite" aria-atomic="true">
            {state?.errors?.who &&
              state.errors.who.map((error: string) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </div>

         */}

      </div>
      <div className="mt-6 flex justify-end gap-4">
        <Link
          href={'/projects/' + task.idproject + '/view'}
          className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
        >
          Cancel
        </Link>
        <Button type="submit" disabled={isPending} aria-disabled={isPending} isPending={isPending}>
          Salvar
        </Button>
      </div>
    </form>
  );
}
