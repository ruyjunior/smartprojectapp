import Form from '@/app/ui/policies/edit-form';
import Breadcrumbs from '@/app/ui/breadcrumbs';
import {fetchPolicieById } from '@/app/lib/policies/data';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { fetchCompanies } from '@/app/lib/companies/data';

export const metadata: Metadata = {
  title: 'Edit Policies',
};

export default async function Page(props: { params: Promise<{ id: string }> }) {
    const params = await props.params;
    const id = params.id;
    const [policie, companies] = await Promise.all([
        fetchPolicieById(id),
        fetchCompanies()
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
        <Form policie={policie} companies={companies} />
        </main>
  );
}