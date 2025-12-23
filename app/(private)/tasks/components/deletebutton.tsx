'use client';

import { Delete } from '@/app/ui/buttons';
import { deleteTask } from '@/app/query/tasks/actions';
import { deleteSprint } from '@/app/query/sprints/actions';

export function DeleteButtonTask({ id }: { id: string }) {
  return <Delete onDelete={() => deleteTask(id)} />;
}

export function DeleteButtonSprint({ id }: { id: string }) {
  return <Delete onDelete={() => deleteSprint(id)} />;
}