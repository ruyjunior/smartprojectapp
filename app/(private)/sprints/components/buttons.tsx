import { PencilIcon, PlusIcon, TrashIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { deleteSprint } from '@/app/query/sprints/actions';

export function CreateSprint({ id } : { id: string }) {
  return (
    <Link
      href={`/sprints/${id}/create`}
      title="Create new sprint"
      className="flex h-10 items-center rounded-lg bg-blue-600 px-4 text-sm font-medium text-white transition-colors hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
    >
      <span className="hidden md:block">Create Sprint</span>{' '}
      <PlusIcon className="h-5 md:ml-4" />
    </Link>
  );
}
export function CreateSprintBasic({ id } : { id: string }) {
  return (
    <Link
      href={`/sprints/${id}/create`}
      title="Create new sprint"
      className="rounded-md border p-2 hover:bg-gray-100"
    >
      <PlusIcon className="w-5" />
    </Link>
  );
}

export function UpdateSprint({ id }: { id: string }) {
  return (
    <Link
      href={`/sprints/${id}/edit`}
      title="Edit sprint"
      className="rounded-md border p-2 hover:bg-gray-100"
    >
      <PencilIcon className="w-3" />
    </Link>
  );
}

export function DeleteSprint({ id }: { id: string }) {
  const deleteSprintWithId = deleteSprint.bind(null, id);
  return (
    <form action={deleteSprintWithId}>
      <button type="submit" className="rounded-md border p-2 hover:bg-gray-100">
        <span className="sr-only">Delete</span>
        <TrashIcon className="w-3" />
      </button>
    </form>
  );
}
