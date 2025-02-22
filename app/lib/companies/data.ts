import { sql } from '@vercel/postgres';
import { Companie } from '@/app/lib/companies/definitions';

export async function fetchCompanies() {
  
  try {
    const data = await sql<Companie>`
      SELECT id, name, cnpj, cep
      FROM autoricapp.companies
      ORDER BY name ASC
    `;
    const companies = data.rows;
    return companies;
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch all companies.');
  }
}

export async function fetchFilteredCompanies(
  query: string,
  currentPage: number) {
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;
  
  try {
    const data = await sql<Companie>`
      SELECT id, name, cnpj, cep
      FROM autoricapp.companies
      WHERE
        companies.name ILIKE ${`%${query}%`} OR
        companies.cnpj ILIKE ${`%${query}%`} 
      ORDER BY name ASC
    `;
    const companies = data.rows;
    return companies;
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to search companies.');
  }
}
const ITEMS_PER_PAGE = 6;

export async function fetchCompaniesPages(query: string) {
  try {
    const count = await sql`SELECT COUNT(*) FROM autoricapp.companies`;

    const totalPages = Math.ceil(Number(count.rows[0].count) / ITEMS_PER_PAGE);
    return totalPages;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch total number.');
  }
}

export async function fetchCompanieById(id: string) {
  try {
    const data = await sql<Companie>`
      SELECT
        companies.id,
        companies.name,
        companies.cnpj
        FROM autoricapp.companies
        WHERE companies.id = ${id} `;

    const companie = data.rows.map((companie) => ({
      ...companie,
    }));
    
    return companie[0];
    console.log( 'Companie: ' + companie[0]);
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch companie.');
  }
}
