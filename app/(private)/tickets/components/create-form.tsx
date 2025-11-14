'use client';
import { useActionState, useTransition } from 'react';
import React, { useState, useEffect } from 'react';
import { Client } from '@/app/query/clients/definitions';
import Link from 'next/link';
import {
   TagIcon, ChatBubbleOvalLeftEllipsisIcon, FlagIcon
} from '@heroicons/react/24/outline';
import { Button } from '@/app/ui/button';
import { createTicket, State } from '@/app/query/tickets/actions';
import { CurrentUser } from '@/app/utils/utils';


export default function Form() {
  const initialState: State = { message: '', errors: {} };
  const [state, formAction] = useActionState(createTicket, initialState);
  const [isPending, startTransition] = useTransition();
  const [currentUser, setCurrentUser] = useState<{ id: string; name: string; email: string; password: string; role: string; idcompany: string | null; avatarurl: string | null } | null>(null);

  useEffect(() => {
    CurrentUser().then(setCurrentUser);
  }, []);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    startTransition(() => {
      formAction(new FormData(e.currentTarget));
    });
  }
return (
  <form action={formAction} onSubmit={handleSubmit}>
    <div className="rounded-md bg-gray-50 p-4 md:p-6">

      <input type="hidden" name="iduser" value={currentUser?.id} />
      <input type="hidden" name="status" value='open' />
      

      {/* Subject */}
      <div className="mb-4">
        <label htmlFor="subject" className="mb-2 block text-sm font-medium">
          Enter a subject
        </label>
        <div className="relative mt-2 rounded-md">
          <div className="relative">
            <input
              id="subject"
              name="subject"
              type="text"
              placeholder="Enter a subject"
              className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              aria-describedby="subject-error"
            />
            <FlagIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
          </div>
          <div id="subject-error" aria-live="polite" aria-atomic="true">
            {state.errors?.subject &&
              state.errors.subject.map((error: string) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </div>
      </div>

      {/* Message */}
      <div className="mb-4">
        <label htmlFor="message" className="mb-2 block text-sm font-medium">
          Enter a message
        </label>
        <div className="relative mt-2 rounded-md">
          <div className="relative">
            <input
              id="message"
              name="message"
              type="text"
              placeholder="Enter a message"
              className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              aria-describedby="message-error"
            />
            <ChatBubbleOvalLeftEllipsisIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
          </div>
          <div id="message-error" aria-live="polite" aria-atomic="true">
            {state.errors?.message &&
              state.errors.message.map((error: string) => (
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
        href="/tickets"
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
