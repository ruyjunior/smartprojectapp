'use client';

import { Delete } from '@/app/ui/buttons';
import { deleteSprint } from '@/app/query/sprints/actions';

export function DeleteButton({ id }: { id: string }) {
  return <Delete onDelete={() => deleteSprint(id)} />;
}