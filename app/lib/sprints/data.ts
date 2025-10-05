import { sql } from '@vercel/postgres';
import { Sprint } from '@/app/lib/sprints/definitions';
import { formatTime } from '../utils/utils';

export async function fetchSprints() {

  try {
    const data = await sql<Sprint>`
SELECT 
  id, 
    idtask, 
      date, 
        starttime, 
          endtime,
            (endtime - starttime)::TIME AS totaltime
            FROM smartprojectsapp.sprints
            ORDER BY date, starttime ASC    `;
    const sprints = data.rows;
    return sprints;
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch all sprints.');
  }
}

export async function fetchFilteredSprints(
  query: string | undefined | null,
  currentPnumber: number | undefined | null) {

  const offset = currentPnumber ? (currentPnumber - 1) * ITEMS_PER_PAGE : 0;
  try {
    const data = await sql<Sprint>`
    SELECT 
        id, idtask, date, starttime, endtime 
      FROM smartprojectsapp.sprints
      WHERE idtask::text ILIKE ${`%${query}%`}
      ORDER BY starttime DESC
       `;
    const sprints = data.rows;
    return sprints;
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to search sprints.');
  }
}
const ITEMS_PER_PAGE = 6;

export async function fetchSprintsPages(query: string) {
  try {
    const count = await sql`SELECT COUNT(*) FROM smartprojectsapp.sprints`;

    const totalPages = Math.ceil(Number(count.rows[0].count) / ITEMS_PER_PAGE);
    return totalPages;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch total number.');
  }
}

export async function fetchSprintById(id: string) {
  try {
    const data = await sql<Sprint>`
      SELECT 
        id, idtask, date, starttime, endtime 
      FROM smartprojectsapp.sprints
      WHERE sprints.id = ${id} `;

    const sprint = data.rows.map((sprint) => ({
      ...sprint,
      starttime: formatTime(sprint.starttime),
      endtime: formatTime(sprint.endtime),
    }));
    return sprint[0];
    //console.log('Sprint: ' + sprint[0]);
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch proposal.');
  }
}

export async function fetchSprintsByTask(id: string) {
  try {
    const data = await sql<Sprint>`
      SELECT 
        id, idtask, date, starttime, endtime 
      FROM smartprojectsapp.sprints
      WHERE sprints.idtask = ${id} `;

    const sprints = data.rows.map((sprint) => ({
      ...sprint,
      starttime: formatTime(sprint.starttime),
      endtime: formatTime(sprint.endtime),
    }));
    return sprints;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch sprints by Id Project.');
  }
}
