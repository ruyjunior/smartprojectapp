'use client';
import { useActionState, useState } from 'react';
import { Company } from '@/app/lib/companies/definitions';
import { Employee } from '@/app/lib/employees/definitions';
import Link from 'next/link';
import { TagIcon, UserIcon, UserGroupIcon } from '@heroicons/react/24/outline';
import { Button } from '@/app/ui/button';
import { createProject, State } from '@/app/lib/projects/actions';

export default function Form({
  employees, companies } : {
  employees: Employee[], companies: Company[] }) {

  const initialState: State = { message: '', errors: {} };
  const [state, formAction] = useActionState(createProject, initialState);
  const [selectedTaker, setSelectedTaker] = useState<string | undefined>(undefined);
  const [selectedProvider, setSelectedProvider] = useState<string | undefined>(undefined);

  const handleTakerChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedTaker(event.target.value);
  };
  const handleProviderChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedProvider(event.target.value);
  };

  return (
    <form action={formAction}>
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

        {/* Provider */}
        <div className="mb-4">
          <label htmlFor="idprovider" className="mb-2 block text-sm font-medium">
            Choose provider
          </label>
          <div className="relative">
            <select
              id="idprovider"
              name="idprovider"
              className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              defaultValue=""
              onChange={handleProviderChange}
              aria-describedby="provider-error"
            >
              <option value="" disabled>
                Select a provider
              </option>
              {companies.map((company) => (
                <option key={company.id} value={company.id}>
                  {company.name}
                </option>
              ))}
            </select>
            <UserGroupIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
          </div>
          <div id="base-error" aria-live="polite" aria-atomic="true">
            {state.errors?.idprovider &&
              state.errors.idprovider.map((error: string) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </div>

        {/* Provider Sponsor */}
        <div className="mb-4">
          <label htmlFor="idprovidersponsor" className="mb-2 block text-sm font-medium">
            Choose Provider Sponsor
          </label>
          <div className="relative">
            <select
              id="idprovidersponsor"
              name="idprovidersponsor"
              className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              aria-describedby="idprovidersponsor-error"
            >
              <option value="" disabled>
                Select a Provider Sponsor
              </option>
              {employees
                .filter((employee) => employee.idcompany === selectedProvider)
                .map((employee) => (
                  <option key={employee.id} value={employee.id}>
                    {employee.name}
                  </option>
                ))}
            </select>
            <UserIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
          </div>
          <div id="idprovidersponsor-error" aria-live="polite" aria-atomic="true">
            {state.errors?.idprovidersponsor &&
              state.errors.idprovidersponsor.map((error: string) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </div>


        {/* Taker */}
        <div className="mb-4">
          <label htmlFor="idtaker" className="mb-2 block text-sm font-medium">
            Choose taker
          </label>
          <div className="relative">
            <select
              id="idtaker"
              name="idtaker"
              className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              defaultValue=""
              onChange={handleTakerChange}
              aria-describedby="taker-error"
            >
              <option value="" disabled>
                Select a taker
              </option>
              {companies.map((company) => (
                <option key={company.id} value={company.id}>
                  {company.name}
                </option>
              ))}
            </select>
            <UserGroupIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
          </div>
          <div id="base-error" aria-live="polite" aria-atomic="true">
            {state.errors?.idtaker &&
              state.errors.idtaker.map((error: string) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </div>

        {/* Taker Sponsor */}
        <div className="mb-4">
          <label htmlFor="idtakersponsor" className="mb-2 block text-sm font-medium">
            Choose Taker Sponsor
          </label>
          <div className="relative">
            <select
              id="idtakersponsor"
              name="idtakersponsor"
              className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              aria-describedby="idtakersponsor-error"
            >
              <option value="" disabled>
                Select a Taker Sponsor
              </option>
              {employees
                .filter((employee) => employee.idcompany === selectedTaker)
                .map((employee) => (
                  <option key={employee.id} value={employee.id}>
                    {employee.name}
                  </option>
                ))}
            </select>
            <UserIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
          </div>
          <div id="idtakersponsor-error" aria-live="polite" aria-atomic="true">
            {state.errors?.idtakersponsor &&
              state.errors.idtakersponsor.map((error: string) => (
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
        <Button type="submit">Create Project</Button>
      </div>
    </form>
  );
}
