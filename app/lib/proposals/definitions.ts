import { Policie } from '@/app/lib/policies/definitions';
import { User } from '@/app/lib/users/definitions';
import { Client } from '@/app/lib/clients/definitions';
import { Plan } from '@/app/lib/plans/definitions';
import { Cost } from '@/app/lib/costs/definitions';
import { Companie } from '@/app/lib/companies/definitions';


export type Proposal = {
  id: string;
  number: string;
  idclient: string;
  iduser: string;
  idpolicie: string;
  idplan: string;
  idcost: string;
  timestamp: string;
};

export type ProposalPDF = {
  proposal: Proposal;
  user: User;
  client: Client;
  policie: Policie;
  plan: Plan;
  cost: Cost;
  companie: Companie;
};
