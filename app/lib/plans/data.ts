import { sql } from '@vercel/postgres';
import { Plan } from '@/app/lib/plans/definitions';
import { PlanForm } from '@/app/lib/plans/definitions';

export async function fetchPlans() {
  
  try {
    const data = await sql<Plan>`
      SELECT id, number, valuedeath, idpolicie
      FROM proposalsapp.plans
      ORDER BY number ASC
    `;
    const plans = data.rows;
    return plans;
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch all plans.');
  }
}

export async function fetchFilteredPlans(
  query: string,
  currentPnumber: number) {
  const offset = (currentPnumber - 1) * ITEMS_PER_PAGE;
  
  try {
    const data = await sql<PlanForm>`
      SELECT id, number, valuedeath, idpolicie
      FROM proposalsapp.plans
      WHERE
        plans.number::text ILIKE ${`%${query}%`}
      ORDER BY number ASC
    `;
    const plans = data.rows;
    return plans;
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to search plans.');
  }
}
const ITEMS_PER_PAGE = 6;

export async function fetchPlansPages(query: string) {
  try {
    const count = await sql`SELECT COUNT(*) FROM proposalsapp.plans`;

    const totalPages = Math.ceil(Number(count.rows[0].count) / ITEMS_PER_PAGE);
    return totalPages;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch total number.');
  }
}

export async function fetchPlanById(id: string) {
  try {
    const data = await sql<Plan>`
      SELECT
        plans.id,
        plans.number,
        plans.valuedeath,
        plans.idpolicie
        FROM proposalsapp.plans
        WHERE plans.id = ${id} `;

    const plan = data.rows.map((plan) => ({
      ...plan,
      valuedeath: plan.valuedeath / 100,

    }));
    
    return plan[0];
    console.log( 'Plan: ' + plan[0]);
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch plan.');
  }
}
