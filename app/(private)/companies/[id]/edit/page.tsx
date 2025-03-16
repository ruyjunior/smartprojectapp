import Form from '@/app/ui/companies/edit-form';
import Breadcrumbs from '@/app/ui/breadcrumbs';
import {fetchCompanieById } from '@/app/lib/companies/data';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Edit Companies',
};

export default async function Page(props: { params: Promise<{ id: string }> }) {
    const params = await props.params;
    const id = params.id;
    const [companie] = await Promise.all([
        fetchCompanieById(id),
      ]);
      if (!companie) {
    notFound();
    }

    return (
        <main>
            <Breadcrumbs
                breadcrumbs={[
                { label: 'Companies', href: '/companies' },
                {
                    label: 'Edit Companie',
                    href: `/companies/${id}/edit`,
                    active: true,
                },
                ]}
            />
        <Form companie={companie} />
        </main>
  );
}