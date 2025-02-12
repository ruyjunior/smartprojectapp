'use client';
import { useActionState } from 'react';
import { Plan } from '@/app/lib/plans/definitions';
import { Policie } from '@/app/lib/policies/definitions';
import {
  FingerPrintIcon, CurrencyDollarIcon, DocumentCurrencyDollarIcon, NumberedListIcon
} from '@heroicons/react/24/outline';
import Link from 'next/link';
import { Button } from '@/app/ui/button';
import { updatePlan, State } from '@/app/lib/plans/actions';

export default function EditPlanForm({
  plan,
  policies
}: {
  plan: Plan;
  policies: Policie[];
}) {
  const initialState: State = { message: null, errors: {} };
  const updatePlanWithId = updatePlan.bind(null, plan.id);
  const [state, formAction] = useActionState(updatePlanWithId, initialState);
  return (
      <form action={formAction}>
        <div className="rounded-md bg-gray-50 p-4 md:p-6">
    
          {/* NUMBER */}
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
                  defaultValue={plan.number}
                  className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                  aria-describedby="number-error"
                  />
                <NumberedListIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
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
    
          {/* Value Death */}
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
                  placeholder="Enter a value for titular"
                  defaultValue={plan.valuedeath}
                  className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                  aria-describedby="valuedeath-error"
                  />
                <CurrencyDollarIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
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
            <label htmlFor="base" className="mb-2 block text-sm font-medium">
              Choose Policie
            </label>
            <div className="relative">
              <select
                id="idpolicie"
                name="idpolicie"
                className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                defaultValue={plan.idpolicie}
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

        </div>
        <div className="mt-6 flex justify-end gap-4">
          <Link
            href="/dashboard/plans"
            className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
          >
            Cancel
          </Link>
          <Button type="submit">Confirm Plan</Button>
        </div>
      </form>
  );
}
