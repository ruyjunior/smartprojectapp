import Form from '@/app/ui/projects/edit-form';
import Breadcrumbs from '@/app/ui/breadcrumbs';
import {fetchProjectById } from '@/app/lib/projects/data';
import { fetchCompanies } from '@/app/lib/companies/data';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { fetchEmployees } from '@/app/lib/employees/data';

export const metadata: Metadata = {
  title: 'Edit Projects',
};

export default async function Page(props: { params: Promise<{ id: string }> }) {
    const params = await props.params;
    const id = params.id;
    const [project, employees, companies] = await Promise.all([
        fetchProjectById(id),
        fetchEmployees(),
        fetchCompanies(),
      ]);
      if (!project) {
       notFound();
      }

    return (
        <main>
            <Breadcrumbs
                breadcrumbs={[
                { label: 'Projects', href: '/projects' },
                {
                    label: 'Edit Project',
                    href: `/projects/${id}/edit`,
                    active: true,
                },
                ]}
            />
        <Form 
          project={project} 
          employees={employees} 
          companies={companies}
           />
        </main>
  );
}