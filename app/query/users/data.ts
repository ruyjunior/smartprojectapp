import { sql } from '@vercel/postgres';
import { User } from '@/app/query/users/definitions';
import { UsersProjects } from '@/app/query/users/definitions';
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
  currentPage: number | undefined | null
) {
  const offset = (currentPage && currentPage > 0 ? (currentPage - 1) * ITEMS_PER_PAGE : 0);
  const idcompany = await CurrentCompanyId();

  try {
    const data = await sql<User>`
      SELECT *
      FROM smartprojectsapp.users
      WHERE
        users.idcompany = ${idcompany} AND (
        users.name ILIKE ${`%${query}%`} OR
        users.role ILIKE ${`%${query}%`} OR
        users.email ILIKE ${`%${query}%`} OR
        users.id::TEXT ILIKE ${`%${query}%`})
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

export async function fetchUserByEmail(email: string): Promise<User> {
  try {
    const data = await sql`
      SELECT * FROM smartprojectsapp.users WHERE users.email = ${email} LIMIT 1
    `;
    const user = data.rows[0] as User;
    return user;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to check user by email.');
  }
}

export async function fetchUsersByIdProjects(idproject: string) {
  try {
    const data = await sql<User>`
      SELECT u.*
      FROM smartprojectsapp.users_projects up
      JOIN smartprojectsapp.users u ON up.iduser = u.id
      WHERE up.idproject = ${idproject}
    `;
    const users = data.rows;
    return users;
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch users projects.');
  }
}

export async function fetchUsersProjects() {
  const idcompany = await CurrentCompanyId();

  try {
    const data = await sql<UsersProjects>`
      SELECT *
      FROM smartprojectsapp.users_projects up
      WHERE up.idcompany = ${idcompany}
    `;

    const usersProjects = data.rows;
    return usersProjects;
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch users projects.');
  }
}