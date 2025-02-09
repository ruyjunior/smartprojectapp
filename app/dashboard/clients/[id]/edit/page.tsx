import Form from '@/app/ui/clients/edit-form';
import Breadcrumbs from '@/app/ui/breadcrumbs';
import {fetchClientById } from '@/app/lib/clients/data';
import { fetchBases } from '@/app/lib/bases/data';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Edit Clients',
};

export default async function Page(props: { params: Promise<{ id: string }> }) {
    const params = await props.params;
    const id = params.id;
    const [client, bases] = await Promise.all([
        fetchClientById(id),
        fetchBases(),
      ]);
      if (!client) {
    notFound();
    }

    return (
        <main>
            <Breadcrumbs
                breadcrumbs={[
                { label: 'Clients', href: '/dashboard/clients' },
                {
                    label: 'Edit Client',
                    href: `/dashboard/clients/${id}/edit`,
                    active: true,
                },
                ]}
            />
        <Form client={client} bases={bases} />
        </main>
  );
}