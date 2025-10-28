'use client';
import { useActionState, useState, useTransition } from 'react';
import { Client } from '@/app/query/clients/definitions';
import { Contact } from '@/app/query/contacts/definitions';
import { Project } from '@/app/query/projects/definitions';

import { BuildingOfficeIcon, UsersIcon, TagIcon, UserIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { Button } from '@/app/ui/button';
import { updateProject, State } from '@/app/query/projects/actions';

export default function EditProjectForm({
  idcompany,
  project,
  contacts,
  clients
}: {
  idcompany: string | undefined;
  project: Project;
  contacts: Contact[],
  clients: Client[],
}) {
  const initialState: State = { message: '', errors: {} };
  const updateProjectWithId = updateProject.bind(null, project.id);
  const [state, formAction] = useActionState(updateProjectWithId, initialState);
  const [isPending, startTransition] = useTransition();

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    startTransition(() => {
      formAction(new FormData(e.currentTarget));
    });
  }

  const [selectedClient, setSelectedClient] = useState<string | undefined>(project.idclient);
  const [selectedCompanyContact, setSelectedCompanyContact] = useState<string | undefined>(project.idcompanycontact);

  const handleClientChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedClient(event.target.value);
  };

  return (
    <form action={formAction} onSubmit={handleSubmit}>
      <div className="rounded-md bg-gray-50 p-4 md:p-6">

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
                defaultValue={project.title}
                placeholder="Enter a title"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                aria-describedby="title-error"
              />
              <TagIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
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

        {/* Company Contact */}
        <div className="mb-4">
          <label htmlFor="idcompanycontact" className="mb-2 block text-sm font-medium">
            Choose Company Contact
          </label>
          <div className="relative">
            <select
              id="idcompanycontact"
              name="idcompanycontact"
              className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              defaultValue={project.idcompanycontact}
              aria-describedby="idcompanycontact-error"
            >
              <option value="" disabled>
                Select a Company Contact
              </option>
              {contacts
                .filter((contact) => contact.idclient === project.idcompany)
                .map((contact) => (
                  <option key={contact.id} value={contact.id}>
                    {contact.name}
                  </option>
                ))}
            </select>
            <UserIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
          </div>
          <div id="idcompanycontact-error" aria-live="polite" aria-atomic="true">
            {state.errors?.idcompanycontact &&
              state.errors.idcompanycontact.map((error: string) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </div>

        {/* Client */}
        <div className="mb-4">
          <label htmlFor="idclient" className="mb-2 block text-sm font-medium">
            Choose Client
          </label>
          <div className="relative">
            <select
              id="idclient"
              name="idclient"
              className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              defaultValue={project.idclient}
              aria-describedby="client-error"
              onChange={handleClientChange}
            >
              <option value="" disabled>
                Select a client
              </option>
              {clients.map((client) => (
                <option key={client.id} value={client.id}>
                  {client.name}
                </option>
              ))}
            </select>
            <BuildingOfficeIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
          </div>
          <div id="base-error" aria-live="polite" aria-atomic="true">
            {state.errors?.idclient &&
              state.errors.idclient.map((error: string) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </div>

        {/* Client Contact */}
        <div className="mb-4">
          <label htmlFor="idclientcontact" className="mb-2 block text-sm font-medium">
            Choose Client Contact
          </label>
          <div className="relative">
            <select
              id="idclientcontact"
              name="idclientcontact"
              className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              defaultValue={project.idclientcontact}
              aria-describedby="idclientcontact-error"
            >
              <option value="" disabled>
                Select a Client Contact
              </option>
              {contacts
                .filter((contact) => contact.idclient === selectedClient)
                .map((contact) => (
                  <option key={contact.id} value={contact.id}>
                    {contact.name}
                  </option>
                ))}
            </select>
            <UserIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
          </div>
          <div id="idclientcontact-error" aria-live="polite" aria-atomic="true">
            {state.errors?.idclientcontact &&
              state.errors.idclientcontact.map((error: string) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </div>

        {/* Comments */}
        <div className="mb-4">
          <label htmlFor="comments" className="mb-2 block text-sm font-medium">
            Enter a comments
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="comments"
                name="comments"
                type="text"
                defaultValue={project.comments}
                placeholder="Enter a comments"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                aria-describedby="comments-error"
              />
              <TagIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
            <div id="comments-error" aria-live="polite" aria-atomic="true">
              {state.errors?.comments &&
                state.errors.comments.map((error: string) => (
                  <p className="mt-2 text-sm text-red-500" key={error}>
                    {error}
                  </p>
                ))}
            </div>
          </div>
        </div>

      </div>
      <div className="mt-6 flex justify-end gap-4">
        <Link
          href="/projects"
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
