'use client';

import { Delete } from '@/app/ui/buttons';
import { deleteAction } from '@/app/query/projects/actions';

export function DeleteButton({ id }: { id: string }) {
  return <Delete onDelete={() => deleteAction(id)} />;
}