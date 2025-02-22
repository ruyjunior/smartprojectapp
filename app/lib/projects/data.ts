import { sql } from '@vercel/postgres';
import { Project } from '@/app/lib/projects/definitions';

export async function fetchProjects() {
  
  try {
    const data = await sql<Project>`
      SELECT id, title, comments, idprovider, idtaker, expectedhours,  executedhours, timestamp
      FROM autoricapp.projects
      ORDER BY timestamp ASC
    `;
    const projects = data.rows;
    return projects;
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch all projects.');
  }
}

export async function fetchFilteredProjects(
  query: string,
  currentPnumber: number) {
  const offset = (currentPnumber - 1) * ITEMS_PER_PAGE;
  
  try {
    const data = await sql<Project>`
      SELECT id, title, comments, idprovider, idtaker, expectedhours,  executedhours, timestamp
      FROM autoricapp.projects
      WHERE
        projects.title::text ILIKE ${`%${query}%`}
      ORDER BY timestamp DESC
    `;
    const projects = data.rows;
    return projects;
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to search projects.');
  }
}
const ITEMS_PER_PAGE = 6;

export async function fetchProjectsPages(query: string) {
  try {
    const count = await sql`SELECT COUNT(*) FROM autoricapp.projects`;

    const totalPages = Math.ceil(Number(count.rows[0].count) / ITEMS_PER_PAGE);
    return totalPages;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch total number.');
  }
}

export async function fetchProjectById(id: string) {
  try {
    const data = await sql<Project>`
      SELECT id, title, comments, idprovider, idtaker, expectedhours,  executedhours, timestamp
      FROM autoricapp.projects
      WHERE projects.id = ${id} `;

    const project = data.rows.map((project) => ({
      ...project,
    }));
    
    return project[0];
    console.log( 'Project: ' + project[0]);
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch project.');
  }
}
