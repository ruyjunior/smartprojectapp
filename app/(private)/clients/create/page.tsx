import Form from '../components/create-form';
import Breadcrumbs from '@/app/ui/breadcrumbs';
import { Metadata } from 'next';
import { CurrentCompanyId } from '@/app/utils/utils';

export const metadata: Metadata = {
  title: 'Create Client',
};

export default async function Page() {
   const idcompany = await CurrentCompanyId();
 
  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Clients', href: '/clients' },
          {
            label: 'Create Client',
            href: '/clients/create',
            active: true,
          },
        ]}
      />
      <Form idcompany={idcompany} />
    </main>
  );
}