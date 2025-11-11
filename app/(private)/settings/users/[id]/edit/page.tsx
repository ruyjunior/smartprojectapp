import Form from '../../components/edit-form';
import Breadcrumbs from '@/app/ui/breadcrumbs';
import {fetchUserById } from '@/app/query/users/data';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { CurrentUser } from '@/app/utils/utils';

export const metadata: Metadata = {
  title: 'Edit Users',
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
    const currentUser = await CurrentUser();
    return (
        <main>
            <Breadcrumbs
                breadcrumbs={[
                { label: 'Settings', href: '/settings/' },
                { label: 'Users', href: '/settings/users' },
                {
                    label: `Editing: ${user.name}`,
                    href: `/settings/users/${id}/edit`,
                    active: true,
                },
                ]}
            />
        <Form user={user} currentUser={currentUser} />
        </main>
  );
}