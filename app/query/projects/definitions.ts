import { Client } from '@/app/query/clients/definitions';
import { Task } from '@/app/query/tasks/definitions';
import { Contact } from '@/app/query/contacts/definitions';
import { Sprint } from '@/app/query/sprints/definitions';
import { Company } from '../companies/definitions'; 
import { User } from '../users/definitions';

export type Project = {
  id: string;
  title: string;
  comments: string;
  idcompany: string;
  timestamp: string;
  timeprevision: string;
  timespend: string;
  amountpayed: string;
};

export type ProjectPDF = {
  project: Project;
  company: Company;
  clients: Client[];
  tasks: Task[];
  sprints: Sprint[];
  contacts: Contact[];
  users: User[];
};
