import { sql } from '@vercel/postgres';
import { Message } from '@/app/query/messages/definitions';
import { formatTime } from '../../utils/utils';

export async function fetchMessages() {

  try {
    const data = await sql<Message>`
      SELECT *
      FROM smartprojectsapp.messages
      `;
    const messages = data.rows;
    return messages;
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch all messages.');
  }
}

export async function fetchFilteredMessages(
  query: string | undefined | null,
  currentPnumber: number | undefined | null) {

  const offset = currentPnumber ? (currentPnumber - 1) * ITEMS_PER_PAGE : 0;
  try {
    const data = await sql<Message>`
    SELECT 
       * 
      FROM smartprojectsapp.messages
      WHERE 
        message::text ILIKE ${`%${query}%`} OR
        sender::text ILIKE ${`%${query}%`}
      ORDER BY id DESC
      LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset} 
       `;
    const messages = data.rows;
    return messages;
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to search messages.');
  }
}
const ITEMS_PER_PAGE = 6;

export async function fetchMessagesPages(query: string) {
  try {
    const count = await sql`SELECT COUNT(*) FROM smartprojectsapp.messages`;

    const totalPages = Math.ceil(Number(count.rows[0].count) / ITEMS_PER_PAGE);
    return totalPages;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch total number.');
  }
}

export async function fetchMessageById(id: string) {
  try {
    const data = await sql<Message>`
      SELECT 
        * 
      FROM smartprojectsapp.messages
      WHERE messages.id = ${id} `;

    const message = data.rows;

    return message[0];
    //console.log('Message: ' + message[0]);
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch proposal.');
  }
}

export async function fetchMessagesByTicket(id: string) {
  try {
    const data = await sql<Message>`
      SELECT 
        *
      FROM smartprojectsapp.messages
      WHERE messages.idticket = ${id} `;

    const messages = data.rows;
    return messages;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch messages by Id Project.');
  }
}
