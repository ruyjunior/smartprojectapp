import FileTable from '@/app/(private)/files/components/table';
import { Suspense } from 'react';
import Breadcrumbs from '@/app/ui/breadcrumbs';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { CreateFile } from '@/app/(private)/files/components/buttons';
import UsersTable from '../../components/table';
import { fetchUserById } from '@/app/query/users/data';

export const metadata: Metadata = {
  title: 'Users Files',
};

export default async function Page(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const id = params.id;
  const [user] = await Promise.all([
    fetchUserById(id),
  ]);
  if (!user) {
    notFound();
  }

  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Settings', href: '/settings/' },
          { label: 'Users', href: '/settings/users' },
          {
            label: 'Files: ' + user.name,
            href: `/settings/users/${id}/files`,
            active: true,
          },
        ]}
      />
      <UsersTable query={id} currentPage={null} />
      <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
        <CreateFile owner_type='user' owner_id={id} />
      </div>
      <FileTable query={''} currentPage={null} owner_id={id} owner_type='user' />
    </main>
  );
}