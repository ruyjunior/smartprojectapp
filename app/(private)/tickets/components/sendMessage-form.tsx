'use client';
import { useActionState, useTransition } from 'react';
import { PhoneIcon, ChatBubbleBottomCenterTextIcon } from '@heroicons/react/24/outline';
import { Button } from '@/app/ui/button';
import { createMessage, State } from '@/app/query/messages/actions';

export default function SendMessageForm({
  ticketId,
  sender,
}: {
  ticketId: string;
  sender: string;
}) {
  const initialState: State = { message: '', errors: {} };
  const [state, formAction] = useActionState(createMessage, initialState);
  const [isPending, startTransition] = useTransition();

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    startTransition(() => {
      formAction(new FormData(e.currentTarget));
    });
  }

  return (
    <form action={formAction} onSubmit={handleSubmit}>
      <div className="rounded-md bg-gray-50 p-4 md:p-6">
        <input type="hidden" name="idticket" value={ticketId} />
        <input type="hidden" name="sender" value={sender} />

        <div className="mb-4">
          <label htmlFor="message" className="mb-2 block text-sm font-medium">
            Enter a message
          </label>
          <div className="relative mt-2 rounded-md">
            <input
              id="message"
              name="message"
              type="text"
              placeholder="Enter a message"
              className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              aria-describedby="message-error"
            />
            <ChatBubbleBottomCenterTextIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
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
        <Button
          type="submit"
          disabled={isPending}
          aria-disabled={isPending}
          isPending={isPending}
        >
          Send
        </Button>
      </div>
    </form>
  );
}