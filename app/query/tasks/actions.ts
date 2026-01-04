'use server';
import { z } from 'zod';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { sql } from '@vercel/postgres';
import { fetchFilteredSprints, fetchSprintsByTask } from '../sprints/data';
import { deleteSprint } from '../sprints/actions';

const FormSchema = z.object({
  id: z.string(),
  title: z.string(),
  what: z.string(),
  how: z.string(),
  who: z.string(),
  grade: z.string(),
  startdate: z.string(),
  enddate: z.string(),
  status: z.string(),
  idproject: z.string(),
  timeprevision: z.string(),
});

const CreateTask = FormSchema.omit({ id: true, enddate: true, how: true });
const UpdateTask = FormSchema.omit({ id: true });

export type State = {
  message?: string;
  errors?: {
    title?: string[];
    startdate?: string[];
    timeprevision?: string[];
    what?: string[];
    //how?: string[];
    who?: string[];
    grade?: string[];
    status?: string[];
    idproject?: string[];
  };
};

export async function createTask(prevState: State, formData: FormData) {
  //console.log(formData)
  const validatedFields = CreateTask.safeParse({
    title: formData.get('title'),
    startdate: formData.get('startdate'),
    timeprevision: formData.get('timeprevision'),
    what: formData.get('what'),
    how: formData.get('how'),
    who: formData.get('who'),
    grade: formData.get('grade'),
    status: formData.get('status'),
    idproject: formData.get('idproject'),
  });
  //console.log(validatedFields);

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Create.',
    };
  }
  const { title, startdate, timeprevision, status, what, who, grade, idproject } = validatedFields.data;

  try {
    await sql`
        INSERT INTO smartprojectsapp.tasks ( 
          title, startdate, timeprevision, status, what, who, grade, idproject)
        VALUES (${title}, ${startdate}, ${timeprevision}, ${status}, ${what}, ${who}, ${grade}, ${idproject})
        `;
  } catch (error) {
    //console.error(error);
    return {
      message: 'Database Error: Failed to Create Task.',
    };
  }
  revalidatePath('/tasks');
  redirect('/projects/' + idproject + '/view');
}

export async function updateTask(
  id: string,
  prevState: State,
  formData: FormData
) {
  const validatedFields = UpdateTask.safeParse({
    title: formData.get('title'),
    what: formData.get('what'),
    how: formData.get('how'),
    who: formData.get('who'),
    grade: formData.get('grade'),
    startdate: formData.get('startdate'),
    enddate: formData.get('enddate'),
    status: formData.get('status'),
    idproject: formData.get('idproject'),
    timeprevision: formData.get('timeprevision'),
    //timespend: formData.get('timespend'),
  });
  if (!validatedFields.success) {
    //console.log(validatedFields.error.flatten().fieldErrors);
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Update Task.',
    };
  }
  //console.log(validatedFields.data);
  const { title, what, how, who, grade, startdate,
    enddate, status, idproject, timeprevision
  } = validatedFields.data;
  const sanitizedEndDate = enddate || null;

  try {
    await sql`
    UPDATE smartprojectsapp.tasks
    SET 
      title = ${title}, 
      what = ${what}, 
      how = ${how}, 
      idproject = ${idproject},
      who = ${who}, 
      grade = ${grade}, 
      startdate = ${startdate}, 
      enddate = ${sanitizedEndDate}, 
      status = ${status},
      timeprevision = ${timeprevision}
    WHERE id = ${id}
  `;
  } catch (error) {
    console.error(error);
    return { message: 'Database Error: Failed to Update Task.' };
  }

  revalidatePath('/tasks');
  redirect('/projects/' + idproject + '/view');
}

export async function deleteTask(id: string) {
  const sprints = await fetchSprintsByTask(id);

  for (const sprint of sprints) {
    deleteSprint(sprint.id);
  }

  await sql`DELETE FROM smartprojectsapp.tasks WHERE id = ${id}`;
  revalidatePath('/tasks');
}


export async function UpdateTaskSpendTime(id: string) {
  const sprints = await fetchFilteredSprints(id, null);
  const timespend = sprints.reduce((total, sprint) => {
    const start = new Date(`1970-01-01T${sprint.starttime}Z`);
    const end = new Date(`1970-01-01T${sprint.endtime}Z`);
    const diffInHours = (end.getTime() - start.getTime()) / (1000 * 60 * 60);
    return total + diffInHours;
  }, 0);

  console.log('Total Time Spend for Task: ', timespend);

  // Convert hours to interval string format HH:MM:SS
  const hours = Math.floor(timespend);
  const minutes = Math.floor((timespend - hours) * 60);
  const seconds = Math.floor(((timespend - hours) * 60 - minutes) * 60);
  const intervalString = `${hours}:${minutes}:${seconds}`;

  try {
    await sql`
      UPDATE smartprojectsapp.tasks
      SET timespend = ${intervalString}::interval
      WHERE id = ${id}
    `;
  } catch (error) {
    console.error(error);
    return { message: 'Database Error: Failed to Update Task.' };
  }
}