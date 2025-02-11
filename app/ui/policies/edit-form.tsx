'use client';
import { useActionState } from 'react';
import { Policie } from '@/app/lib/policies/definitions';
import {
  FingerPrintIcon, CurrencyDollarIcon, MapPinIcon, IdentificationIcon, PhoneIcon,
  TicketIcon, TagIcon, TruckIcon, AtSymbolIcon,CalendarDateRangeIcon
} from '@heroicons/react/24/outline';
import Link from 'next/link';
import { Button } from '@/app/ui/button';
import { updatePolicie, State } from '@/app/lib/policies/actions';

export default function EditPolicieForm({
  policie,
}: {
  policie: Policie;
}) {
  const initialState: State = { message: null, errors: {} };
  const updatePolicieWithId = updatePolicie.bind(null, policie.id);
  const [state, formAction] = useActionState(updatePolicieWithId, initialState);
  return (
      <form action={formAction}>
        <div className="rounded-md bg-gray-50 p-4 md:p-6">
    
          {/* NAME */}
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
                  defaultValue={policie.number}
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
    
          {/* CNPJ */}
          <div className="mb-4">
            <label htmlFor="idcompany" className="mb-2 block text-sm font-medium">
              Enter a idcompany
            </label>
            <div className="relative mt-2 rounded-md">
              <div className="relative">
                <input
                  id="idcompany"
                  name="idcompany"
                  type="text"
                  placeholder="Enter a idcompany"
                  defaultValue={policie.idcompany}
                  className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                  aria-describedby="idcompany-error"
                  />
                <AtSymbolIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
              </div>
              <div id="idcompany-error" aria-live="polite" aria-atomic="true">
                {state.errors?.idcompany &&
                  state.errors.idcompany.map((error: string) => (
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
            href="/dashboard/policies"
            className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
          >
            Cancel
          </Link>
          <Button type="submit">Edit Policie</Button>
        </div>
      </form>
  );
}
