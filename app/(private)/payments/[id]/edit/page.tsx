import Form from '@/app/(private)/payments/components/edit-form';
import Breadcrumbs from '@/app/ui/breadcrumbs';
import { fetchPaymentById } from '@/app/query/payments/data';
import { fetchProjects } from '@/app/query/projects/data';

import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { CurrentUser } from '@/app/utils/utils';

export const metadata: Metadata = {
  title: 'Edit Payments',
};

export default async function Page(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const id = params.id;
  const [payment,  projects] = await Promise.all([
    fetchPaymentById(id),
    fetchProjects(),
  ]);
  const project = projects.find((project) => project.id === payment.idproject);
  const user = await CurrentUser();

  if (!payment) {
    notFound();
  }

  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Projects', href: `/projects` },
          { label: `Project: ${project?.title}`, href: `/projects/${payment.idproject}/payments` },
          {
            label: `Edit Payment: ${payment.title}`,
            href: `/payments/${id}/edit`,
            active: true,
          }]}
      />
      <Form
        payment={payment}
      />
    </main>
  );
}