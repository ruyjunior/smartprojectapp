'use client';
import { useActionState } from 'react';
import { Base } from '@/app/lib/bases/definitions';
import { Client } from '@/app/lib/clients/definitions';
import {
  FingerPrintIcon, CurrencyDollarIcon, MapPinIcon, IdentificationIcon, PhoneIcon,
  TicketIcon, TagIcon, TruckIcon, AtSymbolIcon,CalendarDateRangeIcon
} from '@heroicons/react/24/outline';
import Link from 'next/link';
import { Button } from '@/app/ui/button';
import { updateClient, State } from '@/app/lib/clients/actions';

export default function EditClientForm({
  client,
  bases
}: {
  client: Client;
  bases: Base[];
}) {
  const initialState: State = { message: null, errors: {} };
  const updateClientWithId = updateClient.bind(null, client.id);
  const [state, formAction] = useActionState(updateClientWithId, initialState);
  return (
      <form action={formAction}>
        <div className="rounded-md bg-gray-50 p-4 md:p-6">
          {/* MAT */}
          <div className="mb-4">
            <label htmlFor="mat" className="mb-2 block text-sm font-medium">
            Enter a registry
            </label>
            <div className="relative mt-2 rounded-md">
              <div className="relative">
                <input
                  id="mat"
                  name="mat"
                  type="text"
                  placeholder="Enter a registry"
                  defaultValue={client.mat}
                  className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                  aria-describedby="mat-error"
                  />
                <FingerPrintIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
              </div>
              <div id="mat-error" aria-live="polite" aria-atomic="true">
                {state.errors?.mat &&
                  state.errors.mat.map((error: string) => (
                    <p className="mt-2 text-sm text-red-500" key={error}>
                      {error}
                    </p>
                  ))}
              </div>
            </div>
          </div>
  
          {/* CPF */}
          <div className="mb-4">
            <label htmlFor="cpf" className="mb-2 block text-sm font-medium">
              Enter a CPF
            </label>
            <div className="relative mt-2 rounded-md">
              <div className="relative">
                <input
                  id="cpf"
                  name="cpf"
                  type="text"
                  defaultValue={client.cpf}
                  placeholder="Enter a CPF"
                  className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                  aria-describedby="cpf-error"
                  />
                <IdentificationIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
              </div>
              <div id="cpf-error" aria-live="polite" aria-atomic="true">
                {state.errors?.cpf &&
                  state.errors.cpf.map((error: string) => (
                    <p className="mt-2 text-sm text-red-500" key={error}>
                      {error}
                    </p>
                  ))}
              </div>
            </div>
          </div>
  
          {/* NAME */}
          <div className="mb-4">
            <label htmlFor="name" className="mb-2 block text-sm font-medium">
              Enter a name
            </label>
            <div className="relative mt-2 rounded-md">
              <div className="relative">
                <input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="Enter a name"
                  defaultValue={client.name}
                  className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                  aria-describedby="name-error"
                  />
                <TagIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
              </div>
              <div id="name-error" aria-live="polite" aria-atomic="true">
                {state.errors?.name &&
                  state.errors.name.map((error: string) => (
                    <p className="mt-2 text-sm text-red-500" key={error}>
                      {error}
                    </p>
                  ))}
              </div>
            </div>
          </div>
  
          {/* BIRTH */}
          <div className="mb-4">
            <label htmlFor="birth" className="mb-2 block text-sm font-medium">
              Enter a birth
            </label>
            <div className="relative mt-2 rounded-md">
              <div className="relative">
                <input
                  id="birth"
                  name="birth"
                  type="text"
                  placeholder="Enter a birth"
                  defaultValue={client.birth}
                  className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                  aria-describedby="birth-error"
                  />
                <CalendarDateRangeIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
              </div>
              <div id="birth-error" aria-live="polite" aria-atomic="true">
                {state.errors?.birth &&
                  state.errors.birth.map((error: string) => (
                    <p className="mt-2 text-sm text-red-500" key={error}>
                      {error}
                    </p>
                  ))}
              </div>
            </div>
          </div>
  
          {/* EMAIL */}
          <div className="mb-4">
            <label htmlFor="email" className="mb-2 block text-sm font-medium">
              Enter a email
            </label>
            <div className="relative mt-2 rounded-md">
              <div className="relative">
                <input
                  id="email"
                  name="email"
                  type="text"
                  placeholder="Enter a email"
                  defaultValue={client.email}
                  className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                  aria-describedby="email-error"
                  />
                <AtSymbolIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
              </div>
              <div id="email-error" aria-live="polite" aria-atomic="true">
                {state.errors?.email &&
                  state.errors.email.map((error: string) => (
                    <p className="mt-2 text-sm text-red-500" key={error}>
                      {error}
                    </p>
                  ))}
              </div>
            </div>
          </div>
          
          {/* PHONE */}
          <div className="mb-4">
            <label htmlFor="phone" className="mb-2 block text-sm font-medium">
              Enter a phone
            </label>
            <div className="relative mt-2 rounded-md">
              <div className="relative">
                <input
                  id="phone"
                  name="phone"
                  type="text"
                  placeholder="Enter a phone"
                  defaultValue={client.phone}
                  className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                  aria-describedby="phone-error"
                  />
                <PhoneIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
              </div>
              <div id="phone-error" aria-live="polite" aria-atomic="true">
                {state.errors?.phone &&
                  state.errors.phone.map((error: string) => (
                    <p className="mt-2 text-sm text-red-500" key={error}>
                      {error}
                    </p>
                  ))}
              </div>
            </div>
          </div>
  
          {/* CEP */}
          <div className="mb-4">
            <label htmlFor="cep" className="mb-2 block text-sm font-medium">
              Enter a CEP
            </label>
            <div className="relative mt-2 rounded-md">
              <div className="relative">
                <input
                  id="cep"
                  name="cep"
                  type="text"
                  placeholder="Enter a CEP"
                  defaultValue={client.cep}
                  className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                  aria-describedby="cep-error"
                  />
                <TruckIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
              </div>
              <div id="cep-error" aria-live="polite" aria-atomic="true">
                {state.errors?.cep &&
                  state.errors.cep.map((error: string) => (
                    <p className="mt-2 text-sm text-red-500" key={error}>
                      {error}
                    </p>
                  ))}
              </div>
            </div>
          </div>
  
  
          {/* Base Name */}
          <div className="mb-4">
            <label htmlFor="base" className="mb-2 block text-sm font-medium">
              Choose Base
            </label>
            <div className="relative">
              <select
                id="base"
                name="idbase"
                className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                defaultValue={client.idbase}
                aria-describedby="base-error"
              >
                <option value="" disabled>
                  Select a Policie
                </option>
                {bases.map((base) => (
                  <option key={base.id} value={base.id}>
                    {base.name}
                  </option>
                ))}
              </select>
              <MapPinIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
            </div>
            <div id="base-error" aria-live="polite" aria-atomic="true">
              {state.errors?.idbase &&
                state.errors.idbase.map((error: string) => (
                  <p className="mt-2 text-sm text-red-500" key={error}>
                    {error}
                  </p>
                ))}
            </div>
          </div>
        </div>
        <div className="mt-6 flex justify-end gap-4">
          <Link
            href="/dashboard/clients"
            className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
          >
            Cancel
          </Link>
          <Button type="submit">Edit Client</Button>
        </div>
      </form>
  );
}
