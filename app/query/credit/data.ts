import { sql } from '@vercel/postgres';
import { Credit } from './definitions';
import { auth } from '@/app/lib/auth';
import { fetchUserById } from '@/app/query/users/data';
import { CurrentUser } from '@/app/utils/utils';

export async function fetchCredits() {
  const user = await CurrentUser();

  try {
    const data = await sql<Credit>`
      SELECT *
      FROM smartprojectsapp.credits
      WHERE idcompany = ${user.idcompany} 
      ORDER BY expires DESC
    `;
    const credits = data.rows;
    return credits;
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch.');
  }
}

export async function fetchCreditById(id: string) {
  const user = await CurrentUser();

  try {
    const data = await sql<Credit>`
      SELECT *
      FROM smartprojectsapp.credits
      WHERE id = ${id} AND idcompany = ${user.idcompany}
    `;
    const credit = data.rows[0];
    return credit;
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch.');
  }
}

export async function fetchCreditsByEmail(email: string) {
  const user = await CurrentUser();

  try {
    const data = await sql<Credit>`
      SELECT *
      FROM smartprojectsapp.credits
      WHERE email = ${email} AND idcompany = ${user.idcompany}
      ORDER BY date DESC
    `;
    const credits = data.rows;
    return credits;
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch.');
  }
}