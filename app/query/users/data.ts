import { sql } from '@vercel/postgres';
import { User } from '@/app/query/users/definitions';
import { CurrentCompanyId } from '@/app/utils/utils';

export async function fetchUsers() {
  const idcompany = await CurrentCompanyId();
  try {
    const data = await sql<User>`
      SELECT * 
      FROM smartprojectsapp.users
      WHERE users.idcompany = ${idcompany}
      ORDER BY name ASC
    `;
    const users = data.rows;
    return users;
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch all users.');
  }
}

export async function fetchFilteredUsers(
  query: string,
  currentPage: number) {
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;
  const idcompany = await CurrentCompanyId();

  try {
    const data = await sql<User>`
      SELECT *
      FROM smartprojectsapp.users
      WHERE
        users.idcompany = ${idcompany} AND (
        users.name ILIKE ${`%${query}%`} OR
        users.role ILIKE ${`%${query}%`} OR
        users.email ILIKE ${`%${query}%`} )
      ORDER BY name ASC
    `;
    const users = data.rows;
    return users;
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to search users.');
  }
}
const ITEMS_PER_PAGE = 6;

export async function fetchUsersPages(query: string) {
  const idcompany = await CurrentCompanyId();
  try {
    const count = await sql`
      SELECT COUNT(*) FROM smartprojectsapp.users
      WHERE users.idcompany = ${idcompany}
    `;

    const totalPages = Math.ceil(Number(count.rows[0].count) / ITEMS_PER_PAGE);
    return totalPages;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch total number.');
  }
}

export async function fetchUserById(id: string) {
  try {
    const data = await sql<User>`
      SELECT *
        FROM smartprojectsapp.users
        WHERE users.id = ${id} `;

    const user = data.rows.map((user) => ({
      ...user,
    }));

    return user[0];
    console.log('User: ' + user[0]);
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch user.');
  }
}

export async function fetchUserByEmail(email: string): Promise<boolean> {
  try {
    const data = await sql`
      SELECT 1 FROM smartprojectsapp.users WHERE users.email = ${email} LIMIT 1
    `;
    return data.rows.length > 0;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to check user by email.');
  }
}