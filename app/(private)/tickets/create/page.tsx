import Form from '../components/create-form';
import Breadcrumbs from '@/app/ui/breadcrumbs';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Creat Ticket',
};

export default async function Page() {

  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Tickets', href: '/tickets' },
          {
            label: 'Create Ticket',
            href: '/tickets/create',
            active: true,
          },
        ]}
      />
      <Form />
    </main>
  );
}