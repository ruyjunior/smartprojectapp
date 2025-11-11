import Form from '../components/create-form';
import Breadcrumbs from '@/app/ui/breadcrumbs';
import { Metadata } from 'next';
import { CurrentCompanyId } from '@/app/utils/utils';

export const metadata: Metadata = {
  title: 'Creat User',
};

export default async function Page() {
  const idcompany = await CurrentCompanyId();

  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Settings', href: '/settings/' },
          { label: 'Users', href: '/settings/users' },
          {
            label: 'Create User',
            href: '/settings/users/create',
            active: true,
          },
        ]}
      />
      <Form idcompany={idcompany} />
    </main>
  );
}