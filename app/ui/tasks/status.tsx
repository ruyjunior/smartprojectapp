import { CheckIcon, ClockIcon, ArrowPathIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';

export default function TaskStatus({ status }: { status: string }) {
  return (
    <span
      className={clsx(
        'inline-flex items-center rounded-full px-2 py-1 text-xs',
        {
          'bg-red-200 text-gray-500': status === 'stopped',
          'bg-green-500 text-white': status === 'done',
          'bg-yellow-100 ': status === 'doing'
        },
      )}
    >
      {status === 'stopped' ? (
        <>
          Stopped
          <ClockIcon className="ml-1 w-4 text-gray-500" />
        </>
      ) : null}
      {status === 'done' ? (
        <>
          Done
          <CheckIcon className="ml-1 w-4 text-white" />
        </>
      ) : null}
      {status === 'doing' ? (
        <>
          Doing
          <ArrowPathIcon className="ml-1 w-4 text-white" />
        </>
      ) : null}
    </span>
  );
}
