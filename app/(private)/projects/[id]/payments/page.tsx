import PaymentsTable from '@/app/(private)/payments/components/table';
import ProjectsTable from '../../components/table';
import { Suspense } from 'react';
import Breadcrumbs from '@/app/ui/breadcrumbs';
import { fetchProjectById } from '@/app/query/projects/data';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { CreatePayment } from '@/app/(private)/payments/components/buttons';
import { CurrentUser, isUserOnProject } from '@/app/utils/utils';

export const metadata: Metadata = {
  title: 'Project Payments',
};

export default async function Page(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const id = params.id;
  const [project] = await Promise.all([
    fetchProjectById(id),
  ]);
  const userOnProject = await isUserOnProject(project.id);

  if (!project) {
    notFound();
  }

  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Projects', href: '/projects' },
          {
            label: 'Payments: ' + project.title,
            href: `/projects/${id}/payments`,
            active: true,
          },
        ]}
      />
      <ProjectsTable query={id} currentPage={null} />
      <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
        {userOnProject && 
          <CreatePayment  id={id} />
        }
      </div>
      <PaymentsTable query={''} currentPage={null} idproject={id} />
    </main>
  );
}