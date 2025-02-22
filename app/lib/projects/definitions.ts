import { Company } from '@/app/lib/companies/definitions';
import { Task } from '@/app/lib/tasks/definitions';
import { Employee } from '@/app/lib/employees/definitions';

export type Project = {
  id: string;
  title: string;
  comments: string;
  idprovider: string;
  idtaker: string;
  timestamp: string;
  expectedhours: string;
  executedhours: string;
};

export type ProjectPDF = {
  project: Project;
  provider: Company;
  taker: Company;
  tasks: Task[];
};
