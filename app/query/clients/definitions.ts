export type Client = {
  id: string;
  name: string;
  cnpj: string;
  cep: string;
  idcompany: string;
};

export type ClientsProjects = {
  id: string;
  idclient: string;
  idproject: string;
};
