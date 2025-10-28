import TasksTable from '@/app/(private)/tasks/components/table';
import ProjectsTable from '../../components/table';
import { CreateTask } from '@/app/(private)/tasks/components/buttons';
import { Suspense } from 'react';
import Breadcrumbs from '@/app/ui/breadcrumbs';
import { fetchProjectById } from '@/app/query/projects/data';
import { fetchClients } from '@/app/query/clients/data';
import { fetchTasksByProject } from '@/app/query/tasks/data';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { fetchContacts} from '@/app/query/contacts/data';

export const metadata: Metadata = {
  title: 'Project View',
};

export default async function Page(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const id = params.id;
  const [project, clients, tasks, contacts] = await Promise.all([
    fetchProjectById(id),
    fetchClients(),
    fetchTasksByProject(id),
    fetchContacts()
  ]);
  if (!project) {
    notFound();
  }

  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Projects', href: '/projects' },
          {
            label: 'View: ' + project.title,
            href: `/projects/${id}/view`,
            active: true,
          },
        ]}
      />
      <ProjectsTable query={id} currentPage={null} />
      <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
        <CreateTask id={id}/>
      </div>
      <TasksTable query={id} currentPage={null} />
    </main>
  );
}