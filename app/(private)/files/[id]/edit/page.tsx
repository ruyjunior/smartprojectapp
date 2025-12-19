import Form from '@/app/(private)/files/components/edit-form';
import Breadcrumbs from '@/app/ui/breadcrumbs';
import { fetchFileById } from '@/app/query/files/data';
import { fetchContacts } from '@/app/query/contacts/data';
import { fetchProjects } from '@/app/query/projects/data';

import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { CurrentUser } from '@/app/utils/utils';

export const metadata: Metadata = {
  title: 'Edit Files',
};

export default async function Page(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const id = params.id;
  const [file, contacts, projects] = await Promise.all([
    fetchFileById(id),
    fetchContacts(),
    fetchProjects(),
  ]);
  const project = projects.find((project) => project.id === file.idproject);
  const user = await CurrentUser();

  if (!file) {
    notFound();
  }

  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Projects', href: `/projects` },
          { label: `Project: ${project?.title}`, href: `/projects/${file.idproject}/view` },
          {
            label: `Edit File: ${file.title}`,
            href: `/files/${id}/edit`,
            active: true,
          }]}
      />
      <Form file={file} />
    </main>
  );
}