import { Project } from '@/app/query/projects/definitions';
import { Task } from '@/app/query/tasks/definitions';
import { Contact } from '@/app/query/contacts/definitions';
import { Sprint } from '@/app/query/sprints/definitions';
import { Client } from '@/app/query/clients/definitions';

export type Invoice = {
  projects: Project[];
  clients: Client[];
  client: Client;
  tasks: Task[];
  sprints: Sprint[];
  datein: string;
  dateout: string;
  contacts: Contact[];
};