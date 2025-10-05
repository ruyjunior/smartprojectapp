import { sql } from '@vercel/postgres';
import { Project } from '@/app/lib/projects/definitions';
import { formatTime } from '../utils/utils';

export async function fetchProjects() {

  try {
    const data = await sql<Project>`
      SELECT id, title, comments, idprovider, idtaker, timestamp, idtakersponsor, idprovidersponsor, url, repository
      FROM smartprojectsapp.projects
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
  currentPnumber: number | undefined | null) {

  const offset = currentPnumber ? (currentPnumber - 1) * ITEMS_PER_PAGE : 0;

  try {
    const data = await sql<Project>`
    SELECT projects.id, projects.title, projects.comments, projects.idprovider,
             projects.idtaker, projects.timestamp, projects.idtakersponsor, idprovidersponsor,
             EXTRACT(EPOCH FROM COALESCE(SUM(tasks.timeprevision), INTERVAL '0 seconds')) / 3600 AS timeprevision,
             EXTRACT(EPOCH FROM COALESCE(SUM(tasks.timespend), INTERVAL '0 seconds')) / 3600 AS timespend
      FROM smartprojectsapp.projects
      LEFT JOIN smartprojectsapp.tasks ON projects.id = tasks.idproject
      WHERE projects.title::text ILIKE ${`%${query}%`} OR
            projects.id::text ILIKE ${`%${query}%`} 
      GROUP BY projects.id, projects.title, projects.comments, projects.idprovider,
               projects.idtaker, projects.timestamp
      ORDER BY projects.timestamp DESC
      LIMIT ${ITEMS_PER_PAGE}
      OFFSET ${offset}
    `;
    //const projects = data.rows;
    const projects = data.rows.map((project) => ({
      ...project,
      timeprevision: Number(project.timeprevision),
      timespend: Number(project.timespend),
    }));

    //console.log(projects);
    return projects;
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to search projects.');
  }
}
const ITEMS_PER_PAGE = 6;

export async function fetchProjectsPages(query: string) {
  try {
    const count = await sql`SELECT COUNT(*) FROM smartprojectsapp.projects`;

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
      SELECT id, title, comments, idprovider, idtaker, timestamp, idtakersponsor, idprovidersponsor
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