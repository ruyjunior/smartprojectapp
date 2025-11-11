'use client';
import { Project } from '@/app/query/projects/definitions';
import { Companies } from '@/app/query/companies/definitions';
import { ProjectPDF } from '@/app/query/projects/definitions';
import { Client } from '@/app/query/clients/definitions';
import { Contact } from '@/app/query/contacts/definitions';
import { Task } from '@/app/query/tasks/definitions';
import { PagePDF } from './pagePDF';
import { Sprint } from '@/app/query/sprints/definitions';

export default function PdfForm({
  project,
  company,
  clients,
  contacts,
  tasks,
  sprints
}: {
  project: Project;
  company: Companies;
  clients: Client[];
  contacts: Contact[];
  tasks: Task[];
  sprints: Sprint[];
}) {

  const data: ProjectPDF = {
    project,
    company,
    client: clients.find((c) => c.id === project.idclient) as Client,
    clientcontact: contacts.find((c) => c.id === project.idclientcontact) as Contact,
    companycontact: contacts.find((e) => e.id === project.idcompanycontact) as Contact,
    tasks,
    sprints,
    contacts
  };


  return (
    <PagePDF data={data} />
  );
}