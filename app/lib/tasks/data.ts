import { sql } from '@vercel/postgres';
import { Task } from '@/app/lib/tasks/definitions';
import { formatTime } from '../utils/utils';

export async function fetchTasks() {
  
  try {
    const data = await sql<Task>`
      SELECT 
        id, title, what, how, who, grade, 
        startdate, enddate, status, idproject, 
        timeprevision, timespend 
      FROM autoricapp.tasks
      ORDER BY startdate ASC
    `;
    const tasks = data.rows;
    return tasks;
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch all tasks.');
  }
}

export async function fetchFilteredTasks(
  query: string,
  currentPnumber: number) {
  const offset = (currentPnumber - 1) * ITEMS_PER_PAGE;
  
  try {
    const data = await sql<Task>`
      SELECT 
        id, title, what, how, who, grade, 
        startdate, enddate, status, idproject, 
        timeprevision, timespend 
      FROM autoricapp.tasks
      WHERE
        tasks.title ILIKE ${`%${query}%`} OR
        tasks.what ILIKE ${`%${query}%`}
      ORDER BY startdate DESC
    `;
    const tasks = data.rows;
    return tasks;
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to search tasks.');
  }
}
const ITEMS_PER_PAGE = 6;

export async function fetchTasksPages(query: string) {
  try {
    const count = await sql`SELECT COUNT(*) FROM autoricapp.tasks`;

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
      FROM autoricapp.tasks
      WHERE tasks.id = ${id} `;

    const task = data.rows.map((task) => ({
      ...task,
      timeprevision: formatTime(task.timeprevision),
      timespend: formatTime(task.timespend),
    }));
    return task[0];
    console.log( 'Task: ' + task[0]);
  } catch (error) {
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
      FROM autoricapp.tasks
      WHERE tasks.idproject = ${id} `;

      const tasks = data.rows.map((task) => ({
        ...task,
        timeprevision: formatTime(task.timeprevision),
        timespend: formatTime(task.timespend),
      }));
      return tasks;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch tasks by Id Project.');
  }
}
