import Form from '@/app/(private)/files/components/create-form';
import Breadcrumbs from '@/app/ui/breadcrumbs';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Creat File',
};

export default async function Page(props: { searchParams: Promise<{ owner_id: string, owner_type: string }> }) {
  const searchParams = await props.searchParams;
  const owner_id = searchParams.owner_id || '';
  const owner_type = searchParams.owner_type || '';

  let parentHref = '/files';
  let parentLabel = 'Files';

  if (owner_type === 'project') {
    parentHref = '/projects/' + owner_id + '/files';
    parentLabel = 'Project Files';
  } else if (owner_type === 'user') {
    parentHref = '/settings/users/' + owner_id + '/files';
    parentLabel = 'User Files';
  } else if (owner_type === 'company') {
    parentHref = '/settings/company/';
    parentLabel = 'Company';
  }

  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          {
            label: parentLabel,
            href: parentHref
          },
          {
            label: 'Create File',
            href: '/files/create',
            active: true,
          }
        ]}
      />
      <Form owner_type={owner_type} owner_id={owner_id} />
    </main>
  );
}