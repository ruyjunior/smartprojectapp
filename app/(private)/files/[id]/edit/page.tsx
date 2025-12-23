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
  const [file, projects] = await Promise.all([
    fetchFileById(id),
    fetchProjects(),
  ]);
  const project = projects.find((project) => project.id === file.owner_id);
  const user = await CurrentUser();

  let parentHref = '/files';
  let parentLabel = 'Files';

  if (file.owner_type === 'project') {
    parentHref = '/projects/' + file.owner_id + '/files';
    parentLabel = 'Project Files: ' + project?.title;
  } else if (file.owner_type === 'user') {
    parentHref = '/settings/users/' + file.owner_id + '/files';
    parentLabel = 'User Files';
  } else if (file.owner_type === 'company') {
    parentHref = '/settings/company/';
    parentLabel = 'Company';
  }

  if (!file) {
    notFound();
  }

  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: parentLabel, href: parentHref },
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