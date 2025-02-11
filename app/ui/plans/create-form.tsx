'use client';
import { useActionState } from 'react';
import { Policie } from '@/app/lib/policies/definitions';
import Link from 'next/link';
import {
  FingerPrintIcon, CurrencyDollarIcon, MapPinIcon, IdentificationIcon, PhoneIcon,
  TicketIcon, TagIcon, TruckIcon, AtSymbolIcon,CalendarDateRangeIcon
} from '@heroicons/react/24/outline';
import { Button } from '@/app/ui/button';
import { createPlan, State } from '@/app/lib/plans/actions';

export default function Form({ policies }: { policies: Policie[] }) {
  const initialState: State = { message: null, errors: {} };
  const [state, formAction] = useActionState(createPlan, initialState);
  return (
    <form action={formAction}>
      <div className="rounded-md bg-gray-50 p-4 md:p-6">
        {/* Number */}
        <div className="mb-4">
          <label htmlFor="number" className="mb-2 block text-sm font-medium">
            Enter a number
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="number"
                name="number"
                type="text"
                placeholder="Enter a number"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                aria-describedby="number-error"
                />
              <TagIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
            <div id="number-error" aria-live="polite" aria-atomic="true">
              {state.errors?.number &&
                state.errors.number.map((error: string) => (
                  <p className="mt-2 text-sm text-red-500" key={error}>
                    {error}
                  </p>
                ))}
            </div>
          </div>
        </div>

        {/* VALUE DEATH */}
        <div className="mb-4">
          <label htmlFor="valuedeath" className="mb-2 block text-sm font-medium">
            Enter a value for Titular
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="valuedeath"
                name="valuedeath"
                type="number"
                step="0.01"
                placeholder="Enter a value for death"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                aria-describedby="valuedeath-error"
                />
              <TagIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
            <div id="valuedeath-error" aria-live="polite" aria-atomic="true">
              {state.errors?.valuedeath &&
                state.errors.valuedeath.map((error: string) => (
                  <p className="mt-2 text-sm text-red-500" key={error}>
                    {error}
                  </p>
                ))}
            </div>
          </div>
        </div>

        {/* Policie Number */}
        <div className="mb-4">
          <label htmlFor="police" className="mb-2 block text-sm font-medium">
            Choose Policie
          </label>
          <div className="relative">
            <select
              id="idpolicie"
              name="idpolicie"
              className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              defaultValue=""
              aria-describedby="policie-error"
            >
              <option value="" disabled>
                Select a policie
              </option>
              {policies.map((policie) => (
                <option key={policie.id} value={policie.id}>
                  {policie.number}
                </option>
              ))}
            </select>
            <MapPinIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
          </div>
          <div id="base-error" aria-live="polite" aria-atomic="true">
            {state.errors?.idpolicie &&
              state.errors.idpolicie.map((error: string) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </div>
        
      </div>
      <div className="mt-6 flex justify-end gap-4">
        <Link
          href="/dashboard/plans"
          className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
        >
          Cancel
        </Link>
        <Button type="submit">Create Plan</Button>
      </div>
    </form>
  );
}
