import Form from '../../components/create-form';
import Breadcrumbs from '@/app/ui/breadcrumbs';
import { fetchProjectById } from '@/app/query/projects/data';
import { fetchTaskById } from '@/app/query/tasks/data';
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
          { label: 'Projects', href: `/projects` },
          { label: `Task: ${task.title}`, href: `/projects/${task.idproject}/view` },
          {
            label: 'Create Sprint',
            href: `/sprints/${id}/create`,
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