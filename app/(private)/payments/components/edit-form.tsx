'use client';
import { useActionState, useTransition, useState } from 'react';
import { Payment } from '@/app/query/payments/definitions';
import { CurrencyDollarIcon, CalendarDateRangeIcon, TagIcon, ChatBubbleBottomCenterIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { Button } from '@/app/ui/button';
import { updatePayment, State } from '@/app/query/payments/actions';
import { formatDateBr, formatDateDb, formatCurrencyInput } from '@/app/utils/utils';
import { User } from '@/app/query/users/definitions';

export default function EditPaymentForm({
  payment,
}: {
  payment: Payment;
}) {
  const initialState: State = { message: '', errors: {} };

  // Bind the ID to the action so the server knows which record to update
  const updatePaymentWithId = (state: State, formData: FormData) =>
    updatePayment(payment.id, state, formData);

  const [state, formAction] = useActionState(updatePaymentWithId, initialState);
  const [isPending, startTransition] = useTransition();

  // Ensure date is in YYYY-MM-DD for the HTML5 date picker
  const formattedDate = payment.date ? formatDateDb(payment.date) : new Date().toISOString().split('T')[0];
  const [dateValue, setDateValue] = useState(formattedDate);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    startTransition(() => {
      formAction(formData);
    });
  }
  const handleChangeDate = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formattedDate = formatDateBr(e.target.value);
    setDateValue(formattedDate);
  };

  const handleChangeAmount = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = formatCurrencyInput(e.target.value);
    e.target.value = value;
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="rounded-md bg-gray-50 p-4 md:p-6">
        {/* Hidden field for project ID association */}
        <input type="hidden" name="idproject" value={payment.idproject} />

        {/* DATE */}
        <div className="mb-4">
          <label htmlFor="date" className="mb-2 block text-sm font-medium">
            Payment Date
          </label>
          <div className="relative">
            <input
              id="date"
              name="date"
              type="date"
              defaultValue={dateValue}
              onChange={handleChangeDate}
              className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2"
              aria-describedby="date-error"
            />
            <CalendarDateRangeIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
          </div>
          {state.errors?.date && (
            <div id="date-error" aria-live="polite" className="mt-2 text-sm text-red-500">
              {state.errors.date.map((error) => <p key={error}>{error}</p>)}
            </div>
          )}
        </div>

        {/* TITLE */}
        <div className="mb-4">
          <label htmlFor="title" className="mb-2 block text-sm font-medium">
            Title
          </label>
          <div className="relative">
            <input
              id="title"
              name="title"
              type="text"
              defaultValue={payment.title}
              placeholder="Enter a title"
              className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2"
            />
            <TagIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
          </div>
          {state.errors?.title && (
            <div className="mt-2 text-sm text-red-500">
              {state.errors.title.map((error) => <p key={error}>{error}</p>)}
            </div>
          )}
        </div>
        {/* Comments */}
        <div className="mb-4">
          <label htmlFor="comments" className="mb-2 block text-sm font-medium">
            Enter a comment
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="comments"
                name="comments"
                type="text"
                defaultValue={payment.comments}
                placeholder="Enter a comment about the payment"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                aria-describedby="comments-error"
              />
              <CurrencyDollarIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
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

        {/* AMOUNT */}
        <div className="mb-4">
          <label htmlFor="amount" className="mb-2 block text-sm font-medium">
            Amount
          </label>
          <div className="relative">
            <input
              id="amount"
              name="amount"
              type="currency"
              step="0.01"
              defaultValue={payment.amount}
              onChange={handleChangeAmount}
              placeholder="Enter amount of the payment"
              className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2"
              aria-describedby="amount-error"
            />
            <CurrencyDollarIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
          </div>
        </div>

        {/* Global Error Message */}
        {state.message && (
          <p className="mt-2 text-sm text-red-500">{state.message}</p>
        )}
      </div>

      <div className="mt-6 flex justify-end gap-4">
        <Link
          href={`/projects/${payment.idproject}/payments`}
          className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 hover:bg-gray-200"
        >
          Cancel
        </Link>
        <Button type="submit" disabled={isPending} isPending={isPending}>
          Save Changes
        </Button>
      </div>
    </form>
  );
}
