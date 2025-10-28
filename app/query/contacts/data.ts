import { sql } from '@vercel/postgres';
import { Contact } from '@/app/query/contacts/definitions';
import { CurrentCompanyId } from '@/app/utils/utils';

export async function fetchContacts() {
  const idcompany = await CurrentCompanyId();
  try {
    const data = await sql<Contact>`
      SELECT *
      FROM smartprojectsapp.contacts
      WHERE idcompany = ${idcompany}
      ORDER BY name ASC
    `;
    const contacts = data.rows;
    return contacts;
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch.');
  }
}

export async function fetchFilteredContacts(
  query: string,
  currentPage: number) {
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;
  const idcompany = await CurrentCompanyId();
  try {
    const data = await sql<Contact>`
      SELECT *
      FROM smartprojectsapp.contacts
      WHERE
        idcompany = ${idcompany} AND (
        contacts.name ILIKE ${`%${query}%`} OR
        contacts.email ILIKE ${`%${query}%`} OR
        contacts.cpf ILIKE ${`%${query}%`}
      )
      ORDER BY name ASC
    `;
    const contacts = data.rows;
    //console.log('Filtered Contacts:', contacts);
    return contacts;
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to search.');
  }
}
const ITEMS_PER_PAGE = 6;

export async function fetchContactsPages(query: string) {
  const idcompany = await CurrentCompanyId();
  try {
    const count = await sql`
    SELECT COUNT(*) 
    FROM smartprojectsapp.contacts 
    WHERE idcompany = ${idcompany}`;

    const totalPages = Math.ceil(Number(count.rows[0].count) / ITEMS_PER_PAGE);
    return totalPages;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch total number.');
  }
}

export async function fetchContactById(id: string) {
  try {
    const data = await sql<Contact>`
      SELECT *
      FROM smartprojectsapp.contacts
      WHERE contacts.id = ${id} `;

    const contacts = data.rows;
    return contacts[0];
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch.');
  }
}

export async function fetchContactsByClientId(id: string) {
  const idcompany = await CurrentCompanyId();
  try {
    const data = await sql<Contact>`
      SELECT *
      FROM smartprojectsapp.contacts
      WHERE contacts.idclient = ${id} AND contacts.idcompany = ${idcompany}`;

    const contacts = data.rows;
    console.log('Fetched contacts by client ID:', contacts);
    return contacts;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch.');
  }
}
