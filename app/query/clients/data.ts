import { sql } from '@vercel/postgres';
import { Client, ClientsProjects } from '@/app/query/clients/definitions';
import { CurrentCompanyId } from '@/app/utils/utils';

export async function fetchClients() {
  const idcompany = await CurrentCompanyId();
  try {
    const data = await sql<Client>`
      SELECT *
      FROM smartprojectsapp.clients
      WHERE clients.idcompany = ${idcompany}
      ORDER BY name ASC
    `;
    const clients = data.rows;
    return clients;
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch all clients.');
  }
}

export async function fetchFilteredClients(
  query: string,
  currentPage: number) {

  const offset = (currentPage - 1) * ITEMS_PER_PAGE;
  const idcompany = await CurrentCompanyId();

  try {
    const data = await sql<Client>`
      SELECT *
      FROM smartprojectsapp.clients
      WHERE
        clients.idcompany = ${idcompany} AND (
        clients.name ILIKE ${`%${query}%`} OR
        clients.cnpj ILIKE ${`%${query}%`} )
      ORDER BY name ASC
    `;
    const clients = data.rows;
    return clients;
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to search.');
  }
}
const ITEMS_PER_PAGE = 6;

export async function fetchClientsPages(query: string) {
  try {
    const count = await sql`SELECT COUNT(*) FROM smartprojectsapp.clients`;

    const totalPages = Math.ceil(Number(count.rows[0].count) / ITEMS_PER_PAGE);
    return totalPages;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch total number.');
  }
}

export async function fetchClientById(id: string) {
  try {
    const data = await sql<Client>`
      SELECT *
        FROM smartprojectsapp.clients
        WHERE clients.id = ${id} `;

    const client = data.rows.map((client) => ({
      ...client,
    }));

    return client[0];
    console.log('Client: ' + client[0]);
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch client.');
  }
}

export async function fetchClientsByIdProjects(idproject: string) {
  try {
    const data = await sql<Client>`
      SELECT c.*
      FROM smartprojectsapp.clients_projects cp
      JOIN smartprojectsapp.clients c ON cp.idclient = c.id
      WHERE cp.idproject = ${idproject}
    `;
    const clients = data.rows;
    return clients;
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch clients projects.');
  }
}

export async function fetchClientsProjects() {
  const idcompany = await CurrentCompanyId();

  try {
    const data = await sql<ClientsProjects>`
      SELECT *
      FROM smartprojectsapp.clients_projects cp
      WHERE cp.idcompany = ${idcompany}
    `;

    const clientsProjects = data.rows;
    return clientsProjects;
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch clients projects.');
  }
}