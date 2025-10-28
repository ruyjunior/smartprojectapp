'use client';
import { Project } from '@/app/query/projects/definitions';
import { ProjectPDF } from '@/app/query/projects/definitions';
import { Client } from '@/app/query/clients/definitions';
import { Contact } from '@/app/query/contacts/definitions';
import { Task } from '@/app/query/tasks/definitions';
import { PagePDF } from './docPDF';
import { Sprint } from '@/app/query/sprints/definitions';

export default function PdfForm({
  project,
  clients,
  contacts,
  tasks,
  sprints
}: {
  project: Project;
  clients: Client[];
  contacts: Contact[];
  tasks: Task[];
  sprints: Sprint[];
}) {

  const data: ProjectPDF = {
    project,
    client: clients.find((c) => c.id === project.idclient) as Client,
    company: clients.find((e) => e.id === project.idcompany) as Client,
    clientcontact: contacts.find((c) => c.id === project.idclientcontact) as Contact,
    companycontact: contacts.find((e) => e.id === project.idcompanycontact) as Contact,
    tasks,
    sprints,
    contacts
  };


  return (<PagePDF data={data} />);
}