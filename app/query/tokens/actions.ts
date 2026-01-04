'use server';
import { revalidatePath } from 'next/cache';
import { sql } from '@vercel/postgres';
import { fetchTokenById } from '../tokens/data';

export async function deleteToken(id: string) {
  try {
    // First get the token
    const token = await fetchTokenById(id);

    if (!token) {
      throw new Error('Token not found');
    }

    // Delete the token
    await sql`DELETE FROM smartprojectsapp.tokens WHERE id = ${id}`;

    revalidatePath('/tokens');

  } catch (error) {
    console.error('Error deleting token:', error);
    throw new Error('Failed to delete token');
  }
}