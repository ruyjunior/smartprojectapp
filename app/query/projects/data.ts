import { sql } from '@vercel/postgres';
import { Project } from '@/app/query/projects/definitions';
import { CurrentCompanyId } from '../../utils/utils';

export async function fetchProjects() {
  const idcompany = await CurrentCompanyId();
  try {
    const data = await sql<Project>`
      SELECT *
      FROM smartprojectsapp.projects
      WHERE idcompany = ${idcompany}
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
  query: string | undefined | null,
  currentPnumber: number | undefined | null
) {
  const offset = currentPnumber ? (currentPnumber - 1) * ITEMS_PER_PAGE : 0;
  const searchQuery = query || '';  // converte undefined/null para string vazia
  const idcompany = await CurrentCompanyId();
  try {
    const data = await sql<Project>`
    SELECT 
      p.*,
      EXTRACT(EPOCH FROM COALESCE(SUM(t.timeprevision), INTERVAL '0 seconds')) / 3600 AS timeprevision,
      EXTRACT(EPOCH FROM COALESCE(SUM(t.timespend), INTERVAL '0 seconds')) / 3600 AS timespend
    FROM smartprojectsapp.projects p
    LEFT JOIN smartprojectsapp.tasks t ON p.id = t.idproject
    WHERE 
      (p.title::text ILIKE ${`%${searchQuery}%`} 
      OR p.id::text ILIKE ${`%${searchQuery}%`} )
      AND p.idcompany = ${idcompany}
    GROUP BY 
      p.id,
      p.title, 
      p.comments, 
      p.timestamp
    ORDER BY p.timestamp DESC
    LIMIT ${ITEMS_PER_PAGE}
    OFFSET ${offset}
    `;

    const projects = data.rows.map((project) => ({
      ...project,
      timeprevision: Number(project.timeprevision),
      timespend: Number(project.timespend),
    }));

    return projects;
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to search.');
  }
}
const ITEMS_PER_PAGE = 6;

export async function fetchProjectsPages(query: string) {
  const idcompany = await CurrentCompanyId();
  try {
    const count = await sql`
      SELECT COUNT(*) 
      FROM smartprojectsapp.projects 
      WHERE idcompany = ${idcompany}`;

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
      SELECT *
      FROM smartprojectsapp.projects
      WHERE projects.id = ${id} `;

    const project = data.rows.map((project) => ({
      ...project,
    }));

    return project[0];
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch project.');
  }
}