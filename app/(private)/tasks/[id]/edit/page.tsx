import Form from '@/app/ui/tasks/edit-form';
import Breadcrumbs from '@/app/ui/breadcrumbs';
import {fetchTaskById } from '@/app/lib/tasks/data';
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
      if (!task) {
       notFound();
      }

    return (
        <main>
            <Breadcrumbs
                breadcrumbs={[
                { label: 'Tasks', href: `/projects/${task.idproject}/view` },
                {
                    label: 'Edit Tasks',
                    href: `/tasks/${id}/edit`,
                    active: true,
                },
                ]}
            />
        <Form 
          employees={employees} 
          task={task}
          projects={projects}
           />
        </main>
  );
}