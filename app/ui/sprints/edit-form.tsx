'use client';

import { useActionState } from 'react';
import React, { useState } from 'react';
import { Sprint } from '@/app/lib/sprints/definitions';
import { Task } from '@/app/lib/tasks/definitions';
import { ClockIcon, CalendarDateRangeIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { Button } from '@/app/ui/button';
import { updateSprint, State } from '@/app/lib/sprints/actions';
import { formatTime, formatDateDb } from '@/app/lib/utils/utils';

export default function EditSprintForm({
  sprint,
  task,
}: {
  sprint: Sprint;
  task: Task;
}) {
  const initialState: State = { message: '', errors: {} };
  const updateSprintWithId = (state: State = initialState, formData: FormData) => updateSprint(sprint.id, state, formData);
  const [state, formAction] = useActionState(updateSprintWithId, initialState);

  const date = formatDateDb(sprint.date);
  const starttime = formatTime(sprint.starttime);
  const endtime = formatTime(sprint.endtime);

  return (
    <form action={formAction}>
      <div className="rounded-md bg-gray-50 p-4 md:p-6">

         {/* Hidden Field for Sprint ID Task */}
         <input type="hidden" name="idtask" value={sprint.idtask} />

        {/* DATE */}
        <div className="mb-4">
          <label htmlFor="date" className="mb-2 block text-sm font-medium">
            Enter Date
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="date"
                name="date"
                type="date"
                defaultValue={date}
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

        {/* Start Time */}
        <div className="mb-4">
          <label htmlFor="starttime" className="mb-2 block text-sm font-medium">
            Enter Start Time
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="starttime"
                name="starttime"
                type="time"
                defaultValue={sprint.starttime}
                //maxLength={5}
                //onChange={handleChangeEndDate}
                placeholder="Enter the start time"
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
            Enter End Time
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="endtime"
                name="endtime"
                type="time"
                defaultValue={sprint.endtime}
                //maxLength={5}
                //onChange={handleChangeEndDate}
                placeholder="Enter the start time"
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
          href={'/projects/' + task.idproject + '/view'}
          className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
        >
          Cancel
        </Link>
        <Button type="submit">Edit Sprint</Button>
      </div>
    </form>
  );
}
