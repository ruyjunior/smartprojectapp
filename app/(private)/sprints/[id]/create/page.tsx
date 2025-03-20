import Form from '@/app/ui/sprints/create-form';
import Breadcrumbs from '@/app/ui/breadcrumbs';
import { fetchProjectById } from '@/app/lib/projects/data';
import { fetchTaskById } from '@/app/lib/tasks/data';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Creat Sprint',
};

export default async function Page(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const id = params.id;

  const task = await fetchTaskById(id);
  const project = await fetchProjectById(task.idproject);

  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Sprints', href: `/tasks/${id}` },
          {
            label: 'Create Sprint',
            href: '/sprints/create',
            active: true,
          },
        ]}
      />
      <Form
        task={task}
        project={project}
      />
    </main>
  );
}