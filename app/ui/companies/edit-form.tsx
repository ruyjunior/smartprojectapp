'use client';
import { useActionState } from 'react';
import React, { useState } from 'react';
import { Companie } from '@/app/lib/companies/definitions';
import {
  IdentificationIcon, PhoneIcon,
  TicketIcon, TagIcon, TruckIcon, AtSymbolIcon,CalendarDateRangeIcon
} from '@heroicons/react/24/outline';
import Link from 'next/link';
import { Button } from '@/app/ui/button';
import { updateCompanie, State } from '@/app/lib/companies/actions';
import { formatCNPJ } from '@/app/lib/utils/utils';

export default function EditCompanieForm({
  companie,
}: {
  companie: Companie;
}) {
  const initialState: State = { message: null, errors: {} };
  const updateCompanieWithId = updateCompanie.bind(null, companie.id);
  const [state, formAction] = useActionState(updateCompanieWithId, initialState);
  const [cnpj, setCNPJ] = useState(formatCNPJ(companie.cnpj));

  const handleChangeCNPJ = (event: React.ChangeEvent<HTMLInputElement>) => {
    const formattedCNPJ = formatCNPJ(event.target.value);
    setCNPJ(formattedCNPJ);
  };

  return (
      <form action={formAction}>
        <div className="rounded-md bg-gray-50 p-4 md:p-6">
    
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
                  defaultValue={companie.name}
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
    
          {/* CNPJ */}
          <div className="mb-4">
            <label htmlFor="cnpj" className="mb-2 block text-sm font-medium">
              Enter a cnpj
            </label>
            <div className="relative mt-2 rounded-md">
              <div className="relative">
                <input
                  id="cnpj"
                  name="cnpj"
                  type="text"
                  placeholder="Enter a cnpj"
                  value={cnpj}
                  maxLength={18}
                  onChange={handleChangeCNPJ}  
                  className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                  aria-describedby="cnpj-error"
                  />
                <IdentificationIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
              </div>
              <div id="cnpj-error" aria-live="polite" aria-atomic="true">
                {state.errors?.cnpj &&
                  state.errors.cnpj.map((error: string) => (
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
            href="/dashboard/companies"
            className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
          >
            Cancel
          </Link>
          <Button type="submit">Edit Companie</Button>
        </div>
      </form>
  );
}
