import Form from '@/app/ui/plans/create-form';
import Breadcrumbs from '@/app/ui/breadcrumbs';
import { fetchPolicies } from '@/app/lib/policies/data';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Creat Plan',
};

export default async function Page() {
  const policies = await fetchPolicies();
 
  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Plans', href: '/dashboard/plans' },
          {
            label: 'Create Plan',
            href: '/dashboard/plans/create',
            active: true,
          },
        ]}
      />
      <Form policies={policies}/>
    </main>
  );
}