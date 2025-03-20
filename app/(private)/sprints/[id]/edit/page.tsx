import Form from '@/app/ui/sprints/edit-form';
import Breadcrumbs from '@/app/ui/breadcrumbs';
import { fetchTaskById } from '@/app/lib/tasks/data';
import { fetchSprintById } from '@/app/lib/sprints/data';

import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Edit Sprints',
};

export default async function Page(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const id = params.id;
  const sprint = await fetchSprintById(id);
  const task = await fetchTaskById(sprint.idtask);
  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Projects', href: `/projects/${task.idproject}/view` },
          {
            label: 'Edit Sprints',
            href: `/sprints/${id}/edit`,
            active: true,
          },
        ]}
      />
      <Form
        task={task}
        sprint={sprint}
      />
    </main>
  );
}