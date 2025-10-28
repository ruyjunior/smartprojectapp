import { sql } from '@vercel/postgres';
import { Task } from '@/app/query/tasks/definitions';
import { formatTime } from '../../utils/utils';

export async function fetchTasks() {

  try {
    const data = await sql<Task>`
      SELECT 
        id, title, what, how, who, grade, 
        startdate, enddate, status, idproject, 
        timeprevision, timespend 
      FROM smartprojectsapp.tasks
      ORDER BY
        CASE 
          WHEN status = 'doing' THEN 1
          WHEN status = 'stopped' THEN 2
          WHEN status = 'done' THEN 3
          ELSE 4
        END,
        startdate DESC
    `;
    const tasks = data.rows;
    return tasks;
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch all tasks.');
  }
}

export async function fetchFilteredTasks(
  query: string | undefined | null,
  currentPnumber: number | undefined | null
) {
  const offset = currentPnumber ? (currentPnumber - 1) * ITEMS_PER_PAGE : 0;

  try {
    const data = await sql<Task & { timespend: string }>`
      SELECT 
        id, title, what, how, who, grade, 
        startdate, enddate, status, idproject, 
        timeprevision, 
        TO_CHAR(timespend, 'HH24:MI:SS') AS timespend  -- Converte INTERVAL/TIME para string
      FROM smartprojectsapp.tasks
      WHERE idproject::text ILIKE ${`%${query}%`}
      ORDER BY
        CASE 
          WHEN status = 'doing' THEN 1
          WHEN status = 'stopped' THEN 2
          WHEN status = 'done' THEN 3
          ELSE 4
        END,
        startdate DESC
    `;

    return data.rows;
  } catch (err) {
    console.error("Database Error:", err);
    throw new Error("Failed to search tasks.");
  }
}

const ITEMS_PER_PAGE = 6;

export async function fetchTasksPages(query: string) {
  try {
    const count = await sql`SELECT COUNT(*) FROM smartprojectsapp.tasks`;

    const totalPages = Math.ceil(Number(count.rows[0].count) / ITEMS_PER_PAGE);
    return totalPages;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch total number.');
  }
}

export async function fetchTaskById(id: string) {
  try {
    const data = await sql<Task>`
      SELECT 
        id, title, what, how, who, grade, 
        startdate, enddate, status, idproject, 
        timeprevision, timespend 
      FROM smartprojectsapp.tasks
      WHERE tasks.id = ${id} `;

    const task = data.rows.map((task) => ({
      ...task,
      timeprevision: formatTime(task.timeprevision),
      //timespend: formatTime(task.timespend),
    }));
    return task[0];
    //console.log('Task: ' + task[0]);
  } catch (error) {
    console.error('Database Error:', error);
    console.error('Database Error:', error);
    throw new Error('Failed to fetch proposal.');
  }
}

export async function fetchTasksByProject(id: string) {
  try {
    const data = await sql<Task>`
      SELECT 
        id, title, what, how, who, grade, 
        startdate, enddate, status, idproject, 
        timeprevision, timespend 
      FROM smartprojectsapp.tasks
      WHERE tasks.idproject = ${id} 
      ORDER BY
        CASE 
          WHEN status = 'doing' THEN 1
          WHEN status = 'stopped' THEN 2
          WHEN status = 'done' THEN 3
          ELSE 4
        END,
        startdate DESC
      `;

    const tasks = data.rows.map((task) => ({
      ...task,
      timeprevision: formatTime(task.timeprevision),
      //timespend: formatTime(task.timespend),
    }));
    return tasks;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch tasks by Id Project.');
  }
}
