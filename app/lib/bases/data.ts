import { sql } from '@vercel/postgres';
import { Base } from '@/app/lib/bases/definitions';

export async function fetchBases() {
  
  try {
    const data = await sql<Base>`
      SELECT id, name
      FROM proposalsApp.bases
      ORDER BY name ASC
    `;
    const bases = data.rows;
    return bases;
    console.log('Bases: ' + bases);
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch all bases.');
  }
}

export async function fetchFilteredBases(
  query: string,
  currentPage: number) {
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;
  
  try {
    const data = await sql<Base>`
      SELECT id, name
      FROM proposalsApp.bases
      WHERE
        bases.name ILIKE ${`%${query}%`}
      ORDER BY name ASC
    `;
    const bases = data.rows;
    return bases;
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to search bases.');
  }
}

const ITEMS_PER_PAGE = 6;

export async function fetchBasesPages(query: string) {
  try {
    const count = await sql`SELECT COUNT(*) FROM proposalsapp.bases`;

    const totalPages = Math.ceil(Number(count.rows[0].count) / ITEMS_PER_PAGE);
    return totalPages;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch total number.');
  }
}
