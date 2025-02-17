import { sql } from '@vercel/postgres';
import { Proposal } from '@/app/lib/proposals/definitions';

export async function fetchProposals() {
  
  try {
    const data = await sql<Proposal>`
      SELECT id, number, idclient, iduser, idpolicie, idplan,  idcost, timestamp
      FROM proposalsapp.proposals
      ORDER BY number ASC
    `;
    const proposals = data.rows;
    return proposals;
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch all proposals.');
  }
}

export async function fetchFilteredProposals(
  query: string,
  currentPnumber: number) {
  const offset = (currentPnumber - 1) * ITEMS_PER_PAGE;
  
  try {
    const data = await sql<Proposal>`
      SELECT id, number, idclient, iduser, idpolicie, idplan,  idcost, timestamp
      FROM proposalsapp.proposals
      WHERE
        proposals.number::text ILIKE ${`%${query}%`}
      ORDER BY timestamp DESC
    `;
    const proposals = data.rows;
    return proposals;
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to search proposals.');
  }
}
const ITEMS_PER_PAGE = 6;

export async function fetchProposalsPages(query: string) {
  try {
    const count = await sql`SELECT COUNT(*) FROM proposalsapp.proposals`;

    const totalPages = Math.ceil(Number(count.rows[0].count) / ITEMS_PER_PAGE);
    return totalPages;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch total number.');
  }
}

export async function fetchProposalById(id: string) {
  try {
    const data = await sql<Proposal>`
      SELECT id, number, idclient, iduser, idpolicie, idplan,  idcost, timestamp
      FROM proposalsapp.proposals
      WHERE proposals.id = ${id} `;

    const proposal = data.rows.map((proposal) => ({
      ...proposal,
    }));
    
    return proposal[0];
    console.log( 'Proposal: ' + proposal[0]);
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch proposal.');
  }
}
