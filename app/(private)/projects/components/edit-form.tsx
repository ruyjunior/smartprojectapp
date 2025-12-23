'use client';

import { useActionState, useState, useTransition } from 'react';
import { Client } from '@/app/query/clients/definitions';
import { User } from '@/app/query/users/definitions';
import { Contact } from '@/app/query/contacts/definitions';
import { Project } from '@/app/query/projects/definitions';

import { TagIcon, ChatBubbleBottomCenterIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { Button } from '@/app/ui/button';
import { updateProject, State } from '@/app/query/projects/actions';
import ContactSelector from '../components/contactSelector';
import ClientSelector from '../components/clientSelector';
import UserSelector from './userSelector';

export default function EditProjectForm({
  project,
  clients,
  contacts,
  users,
  selectedUsers,
  selectedClients,
  selectedContacts,
}: {
  project: Project;
  contacts: Contact[];
  clients: Client[];
  users: User[];
  selectedClients: Client[];
  selectedContacts: Contact[];
  selectedUsers: User[];
}) {
  const initialState: State = { message: '', errors: {} };
  const updateProjectWithId = updateProject.bind(null, project.id);
  const [state, formAction] = useActionState(updateProjectWithId, initialState);
  const [isPending, startTransition] = useTransition();

  // Estado para clientes e contatos selecionados
  const [selectedClientsState, setSelectedClients] = useState<Client[]>(selectedClients);
  const [selectedContactsState, setSelectedContacts] = useState<Contact[]>(selectedContacts);
  const [selectedUsersState, setSelectedUsers] = useState<User[]>(selectedUsers);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    startTransition(() => {
      formAction(new FormData(e.currentTarget));
    });
  }
  console.log('Selected Clients in Form:', selectedClientsState);
  console.log('Selected Contacts in Form:', selectedContactsState);
  console.log('Selected Users in Form:', selectedUsersState);

  return (
    <form action={formAction} onSubmit={handleSubmit}>
      <div className="rounded-lg border border-gray-200 bg-white p-6 md:p-8 shadow-sm">

        {/* Project Details Section */}
        <div className="mb-8">
          <h3 className="mb-4 text-lg font-semibold text-gray-900">Project Details</h3>

        {/* Title */}
        <div className="mb-4">
          <label htmlFor="title" className="mb-2 block text-sm font-medium text-gray-700">
            Project Title
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="title"
                name="title"
                type="text"
                defaultValue={project.title}
                placeholder="Enter project title"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
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

        {/* Comments */}
        <div className="mb-4">
          <label htmlFor="comments" className="mb-2 block text-sm font-medium text-gray-700">
            Project Comments
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="comments"
                name="comments"
                type="text"
                defaultValue={project.comments}
                placeholder="Enter project comments"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                aria-describedby="comments-error"
              />
              <ChatBubbleBottomCenterIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
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

        {/* Assignments Section */}
        <div className="mb-8">
          <h3 className="mb-4 text-lg font-semibold text-gray-900">Project Assignments</h3>

        {/* Clients Selector */}
        {<ClientSelector
          clients={clients}
          contacts={contacts}
          selectedClients={selectedClientsState}
          selectedContacts={selectedContactsState}
          onClientsChange={setSelectedClients}
          onContactsChange={setSelectedContacts}
        />}

        {<UserSelector
          users={users}
          selectedUsers={selectedUsersState}
          onUsersChange={setSelectedUsers}
        />}

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
          Save
        </Button>
      </div>
      </div>
    </form>
  );
}
