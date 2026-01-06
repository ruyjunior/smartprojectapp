import { sql } from '@vercel/postgres';
import { Token } from '@/app/query/tokens/definitions';

export async function fetchTokens() {

  try {
    const data = await sql<Token>`
      SELECT *
      FROM smartprojectsapp.auth_tokens
      `;
    const tokens = data.rows;
    return tokens;
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch all tokens.');
  }
}

export async function fetchToken(token: string) {
  const tokens = await sql<Token>`
    SELECT * 
    FROM smartprojectsapp.auth_tokens 
    WHERE token = ${token}
  `;
  return tokens.rows[0]
}

export async function fetchTokenById(id: string) {
  try {
    const data = await sql<Token>`
      SELECT 
        * 
      FROM smartprojectsapp.auth_tokens
      WHERE tokens.id = ${id} `;

    const token = data.rows;
    return token[0];
    //console.log('Token: ' + token[0]);
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch token.');
  }
}