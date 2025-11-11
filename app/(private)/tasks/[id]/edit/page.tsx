import Form from '@/app/(private)/tasks/components/edit-form';
import Breadcrumbs from '@/app/ui/breadcrumbs';
import { fetchTaskById } from '@/app/query/tasks/data';
import { fetchContacts} from '@/app/query/contacts/data';
import { fetchProjects } from '@/app/query/projects/data';

import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { CurrentUser } from '@/app/utils/utils';

export const metadata: Metadata = {
  title: 'Edit Tasks',
};

export default async function Page(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const id = params.id;
  const [task, contacts, projects] = await Promise.all([
    fetchTaskById(id),
    fetchContacts(),
    fetchProjects(),
  ]);
  const project = projects.find((project) => project.id === task.idproject);
  const user = await CurrentUser();

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
        contacts={contacts}
        task={task}
        projects={projects}
        user={user}
      />
    </main>
  );
}