'use client';
import { Project } from '@/app/query/projects/definitions';
import { Company } from '@/app/query/companies/definitions';
import { ProjectPDF } from '@/app/query/projects/definitions';
import { Client } from '@/app/query/clients/definitions';
import { Contact } from '@/app/query/contacts/definitions';
import { Task } from '@/app/query/tasks/definitions';
import { PagePDF } from './pagePDF';
import { Sprint } from '@/app/query/sprints/definitions';
import { User } from '@/app/query/users/definitions';

export default function PdfForm({
  project,
  company,
  clients,
  contacts,
  tasks,
  sprints,
  users
}: {
  project: Project;
  company: Company;
  clients: Client[];
  contacts: Contact[];
  tasks: Task[];
  sprints: Sprint[];
  users: User[];
}) {

  const data: ProjectPDF = {
    project,
    company,
    clients,
    tasks,
    sprints,
    contacts,
    users
  };


  return (
    <PagePDF data={data} />
  );
}