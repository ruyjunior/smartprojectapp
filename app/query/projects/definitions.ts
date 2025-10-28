import { Client } from '@/app/query/clients/definitions';
import { Task } from '@/app/query/tasks/definitions';
import { Contact } from '@/app/query/contacts/definitions';
import { Sprint } from '@/app/query/sprints/definitions';

export type Project = {
  id: string;
  title: string;
  comments: string;
  idcompany: string;
  idclient: string;
  idcompanycontact: string;
  idclientcontact: string;
  timestamp: string;
  timeprevision: string;
  timespend: string;
  url: string;
};

export type ProjectPDF = {
  project: Project;
  company: Client;
  companycontact: Contact;
  client: Client;
  clientcontact: Contact;
  tasks: Task[];
  sprints: Sprint[];
  contacts: Contact[];
};
