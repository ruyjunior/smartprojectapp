'use client';
import { useState } from 'react';
import { Project } from '@/app/lib/projects/definitions';
import { InvoicePDF } from '@/app/lib/companies/definitions';
import { Company } from '@/app/lib/companies/definitions';
import { Employee } from '@/app/lib/employees/definitions';
import { Task } from '@/app/lib/tasks/definitions';
import { Sprint } from '@/app/lib/sprints/definitions';

import { PagePDF } from './docPDF';
import { DateFilter } from './DateFilter';

export default function PdfForm({
  company,
  projects,
  companies,
  employees,
  tasks,
  sprints
}: {
  company: Company;
  projects: Project[];
  companies: Company[];
  employees: Employee[];
  tasks: Task[];
  sprints: Sprint[];
}
) {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const filteredSprints = sprints.filter((sprint) => {
    const sprintDate = new Date(sprint.date);
    const filterStart = startDate ? new Date(startDate) : null;
    const filterEnd = endDate ? new Date(endDate) : null;

    return (
      (!filterStart || sprintDate >= filterStart) &&
      (!filterEnd || sprintDate <= filterEnd)
    );
  });

  const data: InvoicePDF = {
    projectsInvoice: projects.filter((p) => p.idtaker === company.id) as Project[],
    taker: company,
    companies: companies,
    tasks: tasks,
    sprints: filteredSprints,
    employees: employees,
  } as InvoicePDF;

  return (
    <div>
    {/* Componente de Filtro de Data */}
    <DateFilter
      startDate={startDate}
      endDate={endDate}
      onStartDateChange={setStartDate}
      onEndDateChange={setEndDate}
    />

    {/* Renderizar o PDF */}
    <PagePDF data={data} />
  </div>  );
}