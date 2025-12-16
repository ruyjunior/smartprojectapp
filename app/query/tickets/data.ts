import { sql } from '@vercel/postgres';
import { Ticket } from '@/app/query/tickets/definitions';
import { CurrentUser, CurrentCompanyId } from '../../utils/utils';

export async function fetchTickets() {
  const idcompany = await CurrentCompanyId();

  try {
    const data = await sql<Ticket>`
      SELECT *
      FROM smartprojectsapp.tickets
      WHERE idcompany = ${idcompany}
      `;
    const tickets = data.rows;
    //console.log('Tickets: ', tickets);
    return tickets;
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch all tickets.');
  }
}

export async function fetchFilteredTickets(
  query: string | undefined | null,
  currentPnumber: number | undefined | null) {

  const idcompany = await CurrentCompanyId();
  const offset = currentPnumber ? (currentPnumber - 1) * ITEMS_PER_PAGE : 0;
  try {
    const data = await sql<Ticket>`
    SELECT 
       * 
      FROM smartprojectsapp.tickets
      WHERE 
        idcompany = ${idcompany} AND (
        message::text ILIKE ${`%${query}%`} OR
        subject::text ILIKE ${`%${query}%`} )
      ORDER BY id DESC
      LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset} 
       `;
    const tickets = data.rows;
    return tickets;
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to search tickets.');
  }
}
const ITEMS_PER_PAGE = 6;

export async function fetchTicketsPages(query: string) {
  const idcompany = await CurrentCompanyId();
  try {
    const count = await sql`
      SELECT COUNT(*) 
      FROM smartprojectsapp.tickets
      WHERE idcompany = ${idcompany}
      `;

    const totalPages = Math.ceil(Number(count.rows[0].count) / ITEMS_PER_PAGE);
    return totalPages;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch total number.');
  }
}

export async function fetchTicketById(id: string) {
  try {
    const data = await sql<Ticket>`
      SELECT 
        * 
      FROM smartprojectsapp.tickets
      WHERE tickets.id = ${id} `;

    const ticket = data.rows;
    return ticket[0];
    //console.log('Ticket: ' + ticket[0]);
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch proposal.');
  }
}