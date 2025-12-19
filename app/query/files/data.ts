import { sql } from '@vercel/postgres';
import { File } from '@/app/query/files/definitions';
import { CurrentCompany, formatTime } from '../../utils/utils';

export async function fetchFiles(idproject: string) {
  const company = await CurrentCompany();
  try {
    const data = await sql<File>`
      SELECT *
      FROM smartprojectsapp.files
      WHERE idproject = ${idproject}
    `;
    const files = data.rows;
    return files;
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch all files.');
  }
}

export async function fetchFilteredFiles(
  query: string | undefined | null,
  currentPnumber: number | undefined | null,
  idproject: string | undefined | null
) {
  const offset = currentPnumber ? (currentPnumber - 1) * ITEMS_PER_PAGE : 0;
  //console.log('Fetching files with query:', query, 'and idproject:', idproject);
  try {
    const data = await sql<File>`
      SELECT *
      FROM smartprojectsapp.files
      WHERE 
        (title::text ILIKE ${`%${query}%`} OR
        comments::text ILIKE ${`%${query}%`} )
        AND idproject = ${idproject}
    `;
    const files = data.rows;
    //console.log('Filtered files:', files);
    return files;
  } catch (err) {
    console.error("Database Error:", err);
    throw new Error("Failed to search files.");
  }
}

const ITEMS_PER_PAGE = 6;

export async function fetchFilesPages(query: string) {
  try {
    const count = await sql`SELECT COUNT(*) FROM smartprojectsapp.files`;

    const totalPages = Math.ceil(Number(count.rows[0].count) / ITEMS_PER_PAGE);
    return totalPages;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch total number.');
  }
}

export async function fetchFileById(id: string) {
  try {
    const data = await sql<File>`
      SELECT *
      FROM smartprojectsapp.files
      WHERE files.id = ${id} `;

    const file = data.rows;
    return file[0];
    //console.log('file: ' + file[0]);
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch file.');
  }
}

export async function fetchFileByProject(id: string) {
  try {
    const data = await sql<File>`
      SELECT *
      FROM smartprojectsapp.files
      WHERE files.idproject = ${id} `;

    const files = data.rows;
    return files;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch files by Id Project.');
  }
}