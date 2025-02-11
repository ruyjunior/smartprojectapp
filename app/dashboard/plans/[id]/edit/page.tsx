import Form from '@/app/ui/plans/edit-form';
import Breadcrumbs from '@/app/ui/breadcrumbs';
import {fetchPlanById } from '@/app/lib/plans/data';
import { fetchPolicies } from '@/app/lib/policies/data';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Edit Plans',
};

export default async function Page(props: { params: Promise<{ id: string }> }) {
    const params = await props.params;
    const id = params.id;
    const [plan, policies] = await Promise.all([
        fetchPlanById(id),
        fetchPolicies()
      ]);
      if (!plan) {
       notFound();
      }

    return (
        <main>
            <Breadcrumbs
                breadcrumbs={[
                { label: 'Plans', href: '/dashboard/plans' },
                {
                    label: 'Edit Plan',
                    href: `/dashboard/plans/${id}/edit`,
                    active: true,
                },
                ]}
            />
        <Form plan={plan} policies={policies} />
        </main>
  );
}