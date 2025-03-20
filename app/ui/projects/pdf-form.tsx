'use client';
import { Project } from '@/app/lib/projects/definitions';
import { ProjectPDF } from '@/app/lib/projects/definitions';
import { Company } from '@/app/lib/companies/definitions';
import { Employee } from '@/app/lib/employees/definitions';
import { Task } from '@/app/lib/tasks/definitions';
import { PagePDF } from './docPDF';
import { Sprint } from '@/app/lib/sprints/definitions';

export default function PdfForm({
  project,
  companies,
  employees,
  tasks,
  sprints
}: {
  project: Project;
  companies: Company[];
  employees: Employee[];
  tasks: Task[];
  sprints: Sprint[];
}) {

  const data: ProjectPDF = {
    project,
    provider: companies.find((c) => c.id === project.idprovider) as Company,
    providerSponsor: employees.find((e) => e.id === project.idprovidersponsor) as Employee,
    taker: companies.find((c) => c.id === project.idtaker) as Company,
    takerSponsor: employees.find((e) => e.id === project.idtakersponsor) as Employee,
    tasks,
    sprints,
    employees
  };


  return (<PagePDF data={data} />);
}