'use client';

import { Delete } from '@/app/ui/buttons';
import { deleteAction } from '@/app/query/payments/actions';
import { deleteSprint } from '@/app/query/sprints/actions';

export function DeleteButtonPayment({ id }: { id: string }) {
  return <Delete onDelete={() => deleteAction(id)} />;
}

export function DeleteButtonSprint({ id }: { id: string }) {
  return <Delete onDelete={() => deleteSprint(id)} />;
}