'use server';
import { z } from 'zod';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { sql } from '@vercel/postgres';
import { fetchTaskById } from '../tasks/data';

const FormSchema = z.object({
  id: z.string(),
  idtask: z.string(),
  date: z.string(),
  starttime: z.string(),
  endtime: z.string(),
});

const Createsprint = FormSchema.omit({ id: true });
const Updatesprint = FormSchema.omit({ id: true });

export type State = {
  message?: string;
  errors?: {
    idtask?: string[];
    date?: string[];
    starttime?: string[];
    endtime?: string[];
  };
};

export async function createSprint(prevState: State, formData: FormData) {
  const validatedFields = Createsprint.safeParse({
    date: formData.get('date'),
    starttime: formData.get('starttime'),
    endtime: formData.get('endtime'),
    idtask: formData.get('idtask'),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Create.',
    };
  }
  const { idtask, date, starttime, endtime } = validatedFields.data;

  try {
    await sql`
        INSERT INTO smartprojectsapp.sprints ( 
          idtask, date, starttime, endtime )
        VALUES (${idtask}, ${date}, ${starttime}, ${endtime})
        `;
  } catch (error) {
    console.error('Database Error:', error);
    return {
      message: 'Database Error: Failed to Create sprint.',
    };
  }
  const task = await fetchTaskById(idtask);
  revalidatePath('/sprints');
  redirect('/projects/' + task.idproject + '/view');
}

export async function updateSprint(
  id: string,
  prevState: State,
  formData: FormData
) {

  const validatedFields = Updatesprint.safeParse({
    date: formData.get('date'),
    starttime: formData.get('starttime'),
    endtime: formData.get('endtime'),
    idtask: formData.get('idtask'),
  });


  if (!validatedFields.success) {
    console.log('Error: ', validatedFields.error.flatten().fieldErrors);
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Update sprint.',
    };
  }

  const { idtask, date, starttime, endtime } = validatedFields.data;
  const sanitizedEndDate = date || null;
  const sanitizedStartTime = starttime || null;
  const sanitizedEndTime = endtime || null;

  try {
    await sql`
    UPDATE smartprojectsapp.sprints
    SET 
      date = ${date}, 
      starttime = ${sanitizedStartTime},
      endtime = ${sanitizedEndTime}
    WHERE id = ${id}
  `;
  } catch (error) {
    console.error('Database Error:', error);
    return { message: 'Database Error: Failed to Update sprint.' };
  }
  const task = await fetchTaskById(idtask);

  revalidatePath('/sprints');
  redirect('/projects/' + task.idproject + '/view');
}

export async function deleteSprint(id: string) {
  //throw new Error('Failed to Delete Invoice');

  await sql`DELETE FROM smartprojectsapp.sprints WHERE id = ${id}`;
  revalidatePath('/sprints');
}