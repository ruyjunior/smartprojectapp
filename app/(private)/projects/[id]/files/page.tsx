import FileTable from '@/app/(private)/files/components/table';
import ProjectsTable from '../../components/table';
import { Suspense } from 'react';
import Breadcrumbs from '@/app/ui/breadcrumbs';
import { fetchProjectById } from '@/app/query/projects/data';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { CreateFile } from '@/app/(private)/files/components/buttons';

export const metadata: Metadata = {
  title: 'Project Files',
};

export default async function Page(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const id = params.id;
  const [project] = await Promise.all([
    fetchProjectById(id),
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
            label: 'Files: ' + project.title,
            href: `/projects/${id}/files`,
            active: true,
          },
        ]}
      />
      <ProjectsTable query={id} currentPage={null} />
      <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
        <CreateFile id={id} />
      </div>
      <FileTable query={''} currentPage={null} idproject={id} />
    </main>
  );
}