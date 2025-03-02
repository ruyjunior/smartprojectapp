import TasksTable from '@/app/ui/tasks/table';
import ProjectsTable from '@/app/ui/projects/table';
import { CreateTask } from '@/app/ui/tasks/buttons';
import { Suspense } from 'react';
import Breadcrumbs from '@/app/ui/breadcrumbs';
import { fetchProjectById } from '@/app/lib/projects/data';
import { fetchCompanies } from '@/app/lib/companies/data';
import { fetchTasksByProject } from '@/app/lib/tasks/data';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { fetchEmployees } from '@/app/lib/employees/data';

export const metadata: Metadata = {
  title: 'Project View',
};

export default async function Page(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const id = params.id;
  const [project, companies, tasks, employees] = await Promise.all([
    fetchProjectById(id),
    fetchCompanies(),
    fetchTasksByProject(id),
    fetchEmployees()
  ]);
  if (!project) {
    notFound();
  }

  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Projects', href: '/dashboard/projects' },
          {
            label: 'View: ' + project.title,
            href: `/dashboard/projects/${id}/view`,
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