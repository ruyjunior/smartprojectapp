import Form from '@/app/ui/policies/edit-form';
import Breadcrumbs from '@/app/ui/breadcrumbs';
import {fetchPolicieById } from '@/app/lib/policies/data';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Edit Policies',
};

export default async function Page(props: { params: Promise<{ id: string }> }) {
    const params = await props.params;
    const id = params.id;
    const [policie] = await Promise.all([
        fetchPolicieById(id),
      ]);
      if (!policie) {
    notFound();
    }

    return (
        <main>
            <Breadcrumbs
                breadcrumbs={[
                { label: 'Policies', href: '/dashboard/policies' },
                {
                    label: 'Edit Policie',
                    href: `/dashboard/policies/${id}/edit`,
                    active: true,
                },
                ]}
            />
        <Form policie={policie} />
        </main>
  );
}