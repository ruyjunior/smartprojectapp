import { sql } from '@vercel/postgres';
import { Cost } from '@/app/lib/costs/definitions';
import { CostForm } from '@/app/lib/costs/definitions';

export async function fetchCosts() {
  
  try {
    const data = await sql<Cost>`
      SELECT id, age, valuetitular, idpolicie, numberplan
      FROM proposalsapp.costs
      ORDER BY age ASC
    `;
    const costs = data.rows;
    return costs;
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch all costs.');
  }
}

export async function fetchFilteredCosts(
  query: string,
  currentPage: number) {
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;
  
  try {
    const data = await sql<CostForm>`
      SELECT id, age, valuetitular, idpolicie, numberplan
      FROM proposalsapp.costs
      WHERE
        costs.numberplan::text ILIKE ${`%${query}%`} OR
        costs.age::text ILIKE ${`%${query}%`} 
      ORDER BY numberplan, age  ASC
    `;
    const costs = data.rows;
    return costs;
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to search costs.');
  }
}
const ITEMS_PER_PAGE = 6;

export async function fetchCostsPages(query: string) {
  try {
    const count = await sql`SELECT COUNT(*) FROM proposalsapp.costs`;

    const totalPages = Math.ceil(Number(count.rows[0].count) / ITEMS_PER_PAGE);
    return totalPages;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch total number.');
  }
}

export async function fetchCostById(id: string) {
  try {
    const data = await sql<Cost>`
      SELECT
        costs.id,
        costs.age,
        costs.valuetitular,
        costs.idpolicie,
        costs.numberplan
        FROM proposalsapp.costs
        WHERE costs.id = ${id} `;

    const cost = data.rows.map((cost) => ({
      ...cost,
      valuetitular: cost.valuetitular / 100,
    }));
    
    return cost[0];
    console.log( 'Cost: ' + cost[0]);
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch cost.');
  }
}
