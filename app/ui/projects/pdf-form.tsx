'use client';
import { Project } from '@/app/lib/projects/definitions';
import { ProjectPDF } from '@/app/lib/projects/definitions';
import { Company } from '@/app/lib/companies/definitions';
import { Task } from '@/app/lib/tasks/definitions';
import { PagePDF } from './docPDF';

export default function PdfProposalForm({
  project,
  companies,
  tasks,
}: {
  project: Project;
  companies: Company[];
  tasks: Task[];
}) {

  const data: ProjectPDF = {
    project,
    provider: companies.find((c) => c.id === project.idprovider) as Company,
    taker: companies.find((c) => c.id === project.idtaker) as Company,
    tasks,
  };


  return (<PagePDF data={data} />);
}