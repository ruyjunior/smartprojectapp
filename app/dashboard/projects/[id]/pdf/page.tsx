import Form from '@/app/ui/projects/pdf-form';
import Breadcrumbs from '@/app/ui/breadcrumbs';
import { fetchProjectById } from '@/app/lib/projects/data';
import { fetchCompanies } from '@/app/lib/companies/data';
import { fetchTasks } from '@/app/lib/tasks/data';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Print PDF Projects',
};

export default async function Page(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const id = params.id;
  const [project, companies, tasks] = await Promise.all([
    fetchProjectById(id),
    fetchCompanies(),
    fetchTasks(),
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
            label: 'Print PDF Project',
            href: `/dashboard/projects/${id}/pdf`,
            active: true,
          },
        ]}
      />
      <Form
        project={project}
        tasks={tasks}
        companies={companies}
      />
    </main>
  );
}