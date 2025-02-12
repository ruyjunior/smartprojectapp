'use client';
import { useActionState } from 'react';
import { Cost } from '@/app/lib/costs/definitions';
import { Policie } from '@/app/lib/policies/definitions';
import {
  IdentificationIcon, NumberedListIcon, BanknotesIcon, DocumentCurrencyDollarIcon
} from '@heroicons/react/24/outline';
import Link from 'next/link';
import { Button } from '@/app/ui/button';
import { updateCost, State } from '@/app/lib/costs/actions';

export default function EditCostForm({
  cost,
  policies
}: {
  cost: Cost;
  policies: Policie[];
}) {
  const initialState: State = { message: null, errors: {} };
  const updateCostWithId = updateCost.bind(null, cost.id);
  const [state, formAction] = useActionState(updateCostWithId, initialState);
  return (
      <form action={formAction}>
        <div className="rounded-md bg-gray-50 p-4 md:p-6">
    
          {/* AGE */}
          <div className="mb-4">
            <label htmlFor="age" className="mb-2 block text-sm font-medium">
              Enter a age
            </label>
            <div className="relative mt-2 rounded-md">
              <div className="relative">
                <input
                  id="age"
                  name="age"
                  type="text"
                  placeholder="Enter a age"
                  defaultValue={cost.age}
                  className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                  aria-describedby="age-error"
                  />
                <IdentificationIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
              </div>
              <div id="age-error" aria-live="polite" aria-atomic="true">
                {state.errors?.age &&
                  state.errors.age.map((error: string) => (
                    <p className="mt-2 text-sm text-red-500" key={error}>
                      {error}
                    </p>
                  ))}
              </div>
            </div>
          </div>
    
          {/* Value Titular */}
          <div className="mb-4">
            <label htmlFor="valuetitular" className="mb-2 block text-sm font-medium">
            Enter a value for Titular
            </label>
            <div className="relative mt-2 rounded-md">
              <div className="relative">
                <input
                  id="valuetitular"
                  name="valuetitular"
                  type="number"
                  step="0.01"
                  placeholder="Enter a value for titular"
                  defaultValue={cost.valuetitular}
                  className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                  aria-describedby="valuetitular-error"
                  />
                <BanknotesIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
              </div>
              <div id="valuetitular-error" aria-live="polite" aria-atomic="true">
                {state.errors?.valuetitular &&
                  state.errors.valuetitular.map((error: string) => (
                    <p className="mt-2 text-sm text-red-500" key={error}>
                      {error}
                    </p>
                  ))}
              </div>
            </div>
          </div>

          {/* Policie Number */}
          <div className="mb-4">
            <label htmlFor="base" className="mb-2 block text-sm font-medium">
              Choose Policie
            </label>
            <div className="relative">
              <select
                id="idpolicie"
                name="idpolicie"
                className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                defaultValue={cost.idpolicie}
                aria-describedby="policie-error"
              >
                <option value="" disabled>
                  Select a Policie
                </option>
                {policies.map((policie) => (
                  <option key={policie.id} value={policie.id}>
                    {policie.number}
                  </option>
                ))}
              </select>
              <DocumentCurrencyDollarIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
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

          {/* Number Plan */}
          <div className="mb-4">
            <label htmlFor="numberplan" className="mb-2 block text-sm font-medium">
              Enter a number for plan
            </label>
            <div className="relative mt-2 rounded-md">
              <div className="relative">
                <input
                  id="numberplan"
                  name="numberplan"
                  type="text"
                  placeholder="Enter a numberplan"
                  defaultValue={cost.numberplan}
                  className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                  aria-describedby="numberplan-error"
                  />
                <NumberedListIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
              </div>
              <div id="numberplan-error" aria-live="polite" aria-atomic="true">
                {state.errors?.numberplan &&
                  state.errors.numberplan.map((error: string) => (
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
            href="/dashboard/costs"
            className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
          >
            Cancel
          </Link>
          <Button type="submit">Edit Cost</Button>
        </div>
      </form>
  );
}
