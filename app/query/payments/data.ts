import { sql } from '@vercel/postgres';
import { Payment } from '@/app/query/payments/definitions';
export async function fetchPayments(idproject: string) {
  try {
    const data = await sql<Payment>`
      SELECT *
      FROM smartprojectsapp.payments
      WHERE idproject = ${idproject}
      ORDER BY date ASC
    `;
    const payments = data.rows;
    return payments;
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch all payments.');
  }
}

export async function fetchFilteredPayments(
  query: string | undefined | null,
  currentPnumber: number | undefined | null,
  idproject: string | undefined | null
) {
  const offset = currentPnumber ? (currentPnumber - 1) * ITEMS_PER_PAGE : 0;
  const searchQuery = query || '';  // converte undefined/null para string vazia
  try {
    const data = await sql<Payment>`
    SELECT 
      p.*
    FROM smartprojectsapp.payments p
    WHERE 
      (p.title::text ILIKE ${`%${searchQuery}%`} OR
       p.id::text ILIKE ${`%${searchQuery}%`} OR
       p.comments::text ILIKE ${`%${searchQuery}%`}
      ) AND p.idproject = ${idproject}
    ORDER BY p.date DESC
    LIMIT ${ITEMS_PER_PAGE}
    OFFSET ${offset}
    `;

    const payments = data.rows; 

    return payments;
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to search.');
  }
}
const ITEMS_PER_PAGE = 6;

export async function fetchPaymentsPages(query: string, idproject: string) {
  try {
    const count = await sql`
      SELECT COUNT(*) 
      FROM smartprojectsapp.payments   
      WHERE idproject = ${idproject}`;
    const totalPages = Math.ceil(Number(count.rows[0].count) / ITEMS_PER_PAGE);
    return totalPages;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch total number.');
  }
}

export async function fetchPaymentById(id: string) {
  try {
    const data = await sql<Payment>`
      SELECT *
      FROM smartprojectsapp.payments
      WHERE payments.id = ${id} `;

    const payments = data.rows.map((payment) => ({
      ...payment,
    }));

    return payments[0];
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch project.');
  }
}