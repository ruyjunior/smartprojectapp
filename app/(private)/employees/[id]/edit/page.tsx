import Form from '@/app/ui/employees/edit-form';
import Breadcrumbs from '@/app/ui/breadcrumbs';
import {fetchEmployeeById } from '@/app/lib/employees/data';
import { fetchCompanies } from '@/app/lib/companies/data';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Edit Employees',
};

export default async function Page(props: { params: Promise<{ id: string }> }) {
    const params = await props.params;
    const id = params.id;
    const [employee, companies] = await Promise.all([
        fetchEmployeeById(id),
        fetchCompanies(),
      ]);
      if (!employee) {
    notFound();
    }

    return (
        <main>
            <Breadcrumbs
                breadcrumbs={[
                { label: 'Employees', href: '/employees' },
                {
                    label: 'Edit Employee',
                    href: `/employees/${id}/edit`,
                    active: true,
                },
                ]}
            />
        <Form employee={employee} companies={companies} />
        </main>
  );
}