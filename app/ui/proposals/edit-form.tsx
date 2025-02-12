'use client';
import { useActionState } from 'react';
import { Proposal } from '@/app/lib/proposals/definitions';
import { Policie } from '@/app/lib/policies/definitions';
import { User } from '@/app/lib/users/definitions';
import { Client } from '@/app/lib/clients/definitions';
import { Plan } from '@/app/lib/plans/definitions';
import { Cost } from '@/app/lib/costs/definitions';

import { UsersIcon, TagIcon, DocumentCurrencyDollarIcon, UserGroupIcon, CurrencyDollarIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { Button } from '@/app/ui/button';
import { updateProposal, State } from '@/app/lib/proposals/actions';

export default function EditProposalForm({
  proposal,
  clients,
  users,
  policies,
  plans,
  costs 
}: {
  proposal: Proposal;
  clients: Client[],
  users: User[],
  policies: Policie[],
  plans: Plan[],
  costs: Cost[] 
}) {
  const initialState: State = { message: null, errors: {} };
  const updateProposalWithId = updateProposal.bind(null, proposal.id);
  const [state, formAction] = useActionState(updateProposalWithId, initialState);
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
                defaultValue={proposal.number}
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

        {/* Client */}
        <div className="mb-4">
          <label htmlFor="client" className="mb-2 block text-sm font-medium">
            Choose client
          </label>
          <div className="relative">
            <select
              id="idclient"
              name="idclient"
              className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              defaultValue={proposal.idclient}
              aria-describedby="client-error"
            >
              {clients.map((client) => (
                <option key={client.id} value={client.id}>
                 {client.name}
                </option>                
              ))}
            </select>
            <UserGroupIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
          </div>
          <div id="idclient-error" aria-live="polite" aria-atomic="true">
            {state.errors?.idclient &&
              state.errors.idclient.map((error: string) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </div>
        
        {/* User */}
        <div className="mb-4">
          <label htmlFor="user" className="mb-2 block text-sm font-medium">
            Choose User
          </label>
          <div className="relative">
            <select
              id="iduser"
              name="iduser"
              className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              defaultValue={proposal.iduser}
              aria-describedby="user-error"
            >
              {users.map((user) => (
                <option key={user.id} value={user.id}>
                  {user.name}
                </option>
              ))}
            </select>
            <UsersIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
          </div>
          <div id="base-error" aria-live="polite" aria-atomic="true">
            {state.errors?.iduser &&
              state.errors.iduser.map((error: string) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </div>

        {/* Policie */}
        <div className="mb-4">
          <label htmlFor="police" className="mb-2 block text-sm font-medium">
            Choose Policie
          </label>
          <div className="relative">
            <select
              id="idpolicie"
              name="idpolicie"
              className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              defaultValue={proposal.idpolicie}
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

        {/* Plan */}
        <div className="mb-4">
          <label htmlFor="plan" className="mb-2 block text-sm font-medium">
            Choose Plan
          </label>
          <div className="relative">
            <select
              id="idplan"
              name="idplan"
              className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              defaultValue={proposal.idplan}
              aria-describedby="plan-error"
            >
              <option value="" disabled>
                Select a plan
              </option>
              {plans.map((plan) => (
                <option key={plan.id} value={plan.id}>
                  {plan.number}
                </option>
              ))}
            </select>
            <CurrencyDollarIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
          </div>
          <div id="base-error" aria-live="polite" aria-atomic="true">
            {state.errors?.idplan &&
              state.errors.idplan.map((error: string) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </div>

        {/* Cost */}
        <div className="mb-4">
          <label htmlFor="cost" className="mb-2 block text-sm font-medium">
            Choose Cost
          </label>
          <div className="relative">
            <select
              id="idcost"
              name="idcost"
              className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              defaultValue={proposal.idcost}
              aria-describedby="cost-error"
            >
              <option value="" disabled>
                Select a cost
              </option>
              {costs.map((cost) => (
                <option key={cost.id} value={cost.id}>
                  {cost.age}
                </option>
              ))}
            </select>
            <CurrencyDollarIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
          </div>
          <div id="base-error" aria-live="polite" aria-atomic="true">
            {state.errors?.idcost &&
              state.errors.idcost.map((error: string) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </div>

        </div>
        <div className="mt-6 flex justify-end gap-4">
          <Link
            href="/dashboard/proposals"
            className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
          >
            Cancel
          </Link>
          <Button type="submit">Edit Proposal</Button>
        </div>
      </form>
  );
}
