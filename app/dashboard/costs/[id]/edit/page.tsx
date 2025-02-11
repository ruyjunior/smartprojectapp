import Form from '@/app/ui/costs/edit-form';
import Breadcrumbs from '@/app/ui/breadcrumbs';
import {fetchCostById } from '@/app/lib/costs/data';
import { fetchPolicies } from '@/app/lib/policies/data';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Edit Costs',
};

export default async function Page(props: { params: Promise<{ id: string }> }) {
    const params = await props.params;
    const id = params.id;
    const [cost, policies] = await Promise.all([
        fetchCostById(id),
        fetchPolicies()
      ]);
      if (!cost) {
       notFound();
      }

    return (
        <main>
            <Breadcrumbs
                breadcrumbs={[
                { label: 'Costs', href: '/dashboard/costs' },
                {
                    label: 'Edit Cost',
                    href: `/dashboard/costs/${id}/edit`,
                    active: true,
                },
                ]}
            />
        <Form cost={cost} policies={policies} />
        </main>
  );
}