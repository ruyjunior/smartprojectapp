import Form from '@/app/ui/tasks/edit-form';
import Breadcrumbs from '@/app/ui/breadcrumbs';
import { fetchTaskById } from '@/app/lib/tasks/data';
import { fetchEmployees } from '@/app/lib/employees/data';
import { fetchProjects } from '@/app/lib/projects/data';

import { notFound } from 'next/navigation';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Edit Tasks',
};

export default async function Page(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const id = params.id;
  const [task, employees, projects] = await Promise.all([
    fetchTaskById(id),
    fetchEmployees(),
    fetchProjects(),
  ]);
  const project = projects.find((project) => project.id === task.idproject);
  if (!task) {
    notFound();
  }

  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Projects', href: `/projects` },
          { label: `Project: ${project?.title}`, href: `/projects/${task.idproject}/view` },
          {
            label: `Edit Task: ${task.title}`,
            href: `/tasks/${id}/edit`,
            active: true,
          }]}
      />
      <Form
        employees={employees}
        task={task}
        projects={projects}
      />
    </main>
  );
}