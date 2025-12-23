import Form from '@/app/(private)/payments/components/create-form';
import Breadcrumbs from '@/app/ui/breadcrumbs';
import { fetchClients } from '@/app/query/clients/data';
import { fetchContacts } from '@/app/query/contacts/data';
import { fetchProjects } from '@/app/query/projects/data';
import { Metadata } from 'next';
import { CurrentUser } from '@/app/utils/utils';

export const metadata: Metadata = {
  title: 'Create Payment',
};

export default async function Page() {

  const projects = await fetchProjects();
  const project = projects[0];
  const user = await CurrentUser();
  
  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Payments', href: '/payments' },
          {
            label: 'Create Payment',
            href: '/payments/create',
            active: true,
          },
        ]}
      />
      <Form
        project={project}
        user={user}
      />
    </main>
  );
}