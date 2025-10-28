import Form from '../../components/edit-form';
import Breadcrumbs from '@/app/ui/breadcrumbs';
import {fetchClientById } from '@/app/query/clients/data';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Edit Clients',
};

export default async function Page(props: { params: Promise<{ id: string }> }) {
    const params = await props.params;
    const id = params.id;
    const [client] = await Promise.all([
        fetchClientById(id),
      ]);
      if (!client) {
    notFound();
    }

    return (
        <main>
            <Breadcrumbs
                breadcrumbs={[
                { label: 'Clients', href: '/clients' },
                {
                    label: 'Edit Client',
                    href: `/clients/${id}/edit`,
                    active: true,
                },
                ]}
            />
        <Form client={client} />
        </main>
  );
}