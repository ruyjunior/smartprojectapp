import FileTable from '@/app/(private)/files/components/table';
import ProjectsTable from '../../components/table';
import { Suspense } from 'react';
import Breadcrumbs from '@/app/ui/breadcrumbs';
import { fetchProjectById } from '@/app/query/projects/data';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { CreateFile } from '@/app/(private)/files/components/buttons';
import { CurrentUser } from '@/app/utils/utils';
import { ProjectsTableSkeleton } from '../../components/skeletons';
import { FileSkeleton } from '@/app/(private)/files/components/skeletons';


export const metadata: Metadata = {
  title: 'Project Files',
};

export default async function Page(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const id = params.id;
  const [project] = await Promise.all([
    fetchProjectById(id),
  ]);
  const currentUser = await CurrentUser();

  if (!project) {
    notFound();
  }

  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Projects', href: '/projects' },
          {
            label: 'Files: ' + project.title,
            href: `/projects/${id}/files`,
            active: true,
          },
        ]}
      />
      <Suspense fallback={<ProjectsTableSkeleton />}>
        <ProjectsTable query={id} currentPage={null} />
      </Suspense>
      <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
        {currentUser?.role === 'admin' &&
          <CreateFile owner_type='project' owner_id={id} />
        }
      </div>
      <Suspense fallback={<FileSkeleton />}>
        <FileTable query={''} currentPage={null} owner_id={id} owner_type='project' />
      </Suspense>
    </main>
  );
}