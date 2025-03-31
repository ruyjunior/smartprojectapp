import { Project } from '@/app/lib/projects/definitions';
import { Task } from '@/app/lib/tasks/definitions';
import { Employee } from '@/app/lib/employees/definitions';
import { Sprint } from '@/app/lib/sprints/definitions';


export type Company = {
  id: string;
  name: string;
  cnpj: string;
  cep: string;
};

export type InvoicePDF = {
  projects: Project[];
  companies: Company[];
  taker: Company;
  tasks: Task[];
  sprints: Sprint[];
  employees: Employee[];
  datein: string;
  dateout: string;
};