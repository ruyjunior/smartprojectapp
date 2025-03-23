'use client';
import React, { useState, useActionState } from 'react';
import { Task } from '@/app/lib/tasks/definitions';
import { Project } from '@/app/lib/projects/definitions';
import Link from 'next/link';
import { CurrencyDollarIcon, UserCircleIcon, CalendarDateRangeIcon, ClockIcon } from '@heroicons/react/24/outline';
import { Button } from '@/app/ui/button';
import { createSprint, State } from '@/app/lib/sprints/actions';
import { formatDateBr } from '@/app/lib/utils/utils';

export default function Form({ task, project }: { task: Task, project: Project }) {

  const initialState: State = { message: '', errors: {} };
  const [state, formAction] = useActionState(createSprint, initialState);

  const today = new Date();
  const [date, setDate] = useState(today.toISOString().split('T')[0]);

  const handleChangeDate = (event: React.ChangeEvent<HTMLInputElement>) => {
    const formattedDate = formatDateBr(event.target.value);
    setDate(formattedDate);
  };

  return (
    <form action={formAction}>
      <div className="rounded-md bg-gray-50 p-4 md:p-6">
        <input type="hidden" name="idtask" value={task.id} />
        {/* Task
        <div className="mb-4">
          <label htmlFor="idproject" className="mb-2 block text-sm font-medium">
            Choose Task
          </label>
          <div className="relative">
            <select
              id="idtask"
              name="idtask"
              className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              defaultValue={task.id}
              aria-describedby="idproject-error"
            >
              <option value="" disabled>
                Select Project
              </option>
              <option key={task.id} value={task.id}>
                {task.title}
              </option>
            </select>
            <UserCircleIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
          </div>
          <div id="who-error" aria-live="polite" aria-atomic="true">
            {state.errors?.idtask &&
              state.errors.idtask.map((error: string) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </div>
        */}

        {/* DATE */}
        <div className="mb-4">
          <label htmlFor="date" className="mb-2 block text-sm font-medium">
            Date
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="date"
                name="date"
                type="date"
                //value={sprint.startdate}
                maxLength={10}
                defaultValue={date}
                onChange={handleChangeDate}
                placeholder="Enter a date"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                aria-describedby="birth-error"
              />
              <CalendarDateRangeIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>
        </div>

        {/* Start Time */}
        <div className="mb-4">
          <label htmlFor="starttime" className="mb-2 block text-sm font-medium">
            Start Time
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="starttime"
                name="starttime"
                type="time"
                defaultValue="08:00"
                placeholder="Enter a start time"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                aria-describedby="enddate-error"
              />
              <ClockIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>
        </div>

        {/* End Time */}
        <div className="mb-4">
          <label htmlFor="endtime" className="mb-2 block text-sm font-medium">
            End Time
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="endtime"
                name="endtime"
                type="time"
                defaultValue="12:00"
                placeholder="Enter a start time"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                aria-describedby="enddate-error"
              />
              <ClockIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>
        </div>

      </div>
      <div className="mt-6 flex justify-end gap-4">
        <Link
          href={'/projects/' + project.id + '/view'}
          className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
        >
          Cancel
        </Link>
        <Button type="submit">Create Sprint</Button>
      </div>
    </form>
  );
}
