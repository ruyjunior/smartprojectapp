import Form from '../../components/edit-form';
import Breadcrumbs from '@/app/ui/breadcrumbs';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { fetchCreditById }  from '@/app/query/credit/data';
import { fetchUsers } from '@/app/query/users/data';

export const metadata: Metadata = {
  title: 'Editar Crédito',
};

export default async function Page(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const id = params.id;
  const credit = await fetchCreditById(id);
  const users = await fetchUsers();
  if (!credit) {
    notFound();
  }

  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Settings', href: `/settings` },
          { label: 'Créditos', href: `/settings/account` },
          {
            label: 'Editar Crédito',
            href: `/settings/account/${id}/edit`,
            active: true,
          },
        ]}
      />
      <Form credit={credit} users={users} />
    </main>
  );
}