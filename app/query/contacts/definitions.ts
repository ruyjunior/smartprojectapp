export type Contact = {
  id: string;
  cpf: string;
  name: string;
  birth: string;
  email: string;
  phone: string;
  cep: string;
  idcompany: string;
  idclient: string;
};

export type ContactsProjects = {
  id: string;
  idcontact: string;
  idproject: string;
};