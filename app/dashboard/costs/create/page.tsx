import Form from '@/app/ui/costs/create-form';
import Breadcrumbs from '@/app/ui/breadcrumbs';
import { fetchPolicies } from '@/app/lib/policies/data';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Creat Cost',
};

export default async function Page() {
  const policies = await fetchPolicies();
 
  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Costs', href: '/dashboard/costs' },
          {
            label: 'Create Cost',
            href: '/dashboard/costs/create',
            active: true,
          },
        ]}
      />
      <Form policies={policies}/>
    </main>
  );
}