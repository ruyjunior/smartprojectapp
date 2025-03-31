import { PencilIcon, PlusIcon, TrashIcon, DocumentCurrencyDollarIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { deleteCompanie } from '@/app/lib/companies/actions';

export function CreateCompanie() {
  return (
    <Link
      href="/companies/create"
      className="flex h-10 items-center rounded-lg bg-blue-600 px-4 text-sm font-medium text-white transition-colors hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
    >
      <span className="hidden md:block">Create Companie</span>{' '}
      <PlusIcon className="h-5 md:ml-4" />
    </Link>
  );
}

export function UpdateCompanie({ id }: { id: string }) {
  return (
    <Link
      href={`/companies/${id}/edit`}
      className="rounded-md border p-2 hover:bg-gray-100"
    >
      <PencilIcon className="w-5" />
    </Link>
  );
}

export function DeleteCompanie({ id }: { id: string }) {
  const deleteCompanieWithId = deleteCompanie.bind(null, id);
  return (
    <form action={deleteCompanieWithId}>
      <button type="submit" className="rounded-md border p-2 hover:bg-gray-100">
        <span className="sr-only">Delete</span>
        <TrashIcon className="w-5" />
      </button>
    </form>
  );
}

export function ViewInvoice({ id }: { id: string }) {
  return (
    <Link
      href={`/companies/${id}/invoice`}
      className="rounded-md border p-2 hover:bg-gray-100"
    >
      <DocumentCurrencyDollarIcon className="w-5" />
    </Link>
  );
}
