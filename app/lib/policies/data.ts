import { sql } from '@vercel/postgres';
import { Policie } from '@/app/lib/policies/definitions';

export async function fetchPolicies() {
  
  try {
    const data = await sql<Policie>`
      SELECT id, number, idcompany
      FROM proposalsapp.policies
      ORDER BY number ASC
    `;
    const policies = data.rows;
    return policies;
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch all policies.');
  }
}

export async function fetchFilteredPolicies(
  query: string,
  currentPage: number) {
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;
  
  try {
    const data = await sql<Policie>`
      SELECT id, number, idcompany
      FROM proposalsapp.policies
      WHERE
        policies.number ILIKE ${`%${query}%`}
      ORDER BY number ASC
    `;
    const policies = data.rows;
    return policies;
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to search policies.');
  }
}
const ITEMS_PER_PAGE = 6;

export async function fetchPoliciesPages(query: string) {
  try {
    const count = await sql`SELECT COUNT(*) FROM proposalsapp.policies`;

    const totalPages = Math.ceil(Number(count.rows[0].count) / ITEMS_PER_PAGE);
    return totalPages;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch total number.');
  }
}

export async function fetchPolicieById(id: string) {
  try {
    const data = await sql<Policie>`
      SELECT
        policies.id,
        policies.number,
        policies.idcompany
        FROM proposalsapp.policies
        WHERE policies.id = ${id} `;

    const policie = data.rows.map((policie) => ({
      ...policie,
    }));
    
    return policie[0];
    console.log( 'Policie: ' + policie[0]);
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch policie.');
  }
}
