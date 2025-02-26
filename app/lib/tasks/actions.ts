'use server';
import { z } from 'zod';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { sql } from '@vercel/postgres';

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
  timespend: z.string(),
});

const CreateTask = FormSchema.omit({ id: true, enddate: true, how: true, timespend: true });
const UpdateTask = FormSchema.omit({ id: true });

export type State = {
  message?: string;
  errors?: {
    title?: string[];
    startdate?: String[];
    timeprevision?: String[];
    what?: string[];
    //how?: string[];
    who?: string[];
    grade?: string[]; 
    status?: string[]; 
    idproject?: string[];
  };
};

export async function createTask(prevState: State, formData: FormData) {
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

    if (!validatedFields.success) {
      return {
        errors: validatedFields.error.flatten().fieldErrors,
        message: 'Missing Fields. Failed to Create.',
      };
    }
    const { title, startdate, timeprevision, status, what, who, grade, idproject} = validatedFields.data;

    try {
        await sql`
        INSERT INTO autoricapp.tasks ( 
          title, startdate, timeprevision, status, what, who, grade, idproject)
        VALUES (${title}, ${startdate}, ${timeprevision}, ${status}, ${what}, ${who}, ${grade}, ${idproject})
        `;  
    } catch (error){
      return {
        message: 'Database Error: Failed to Create Task.',
      };
    }
    revalidatePath('/dashboard/tasks');
    redirect('/dashboard/projects/' + idproject + '/view' );
  }
 
export async function updateTask(
  id: string,
  prevState: State, 
  formData: FormData
  ){
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
    timespend: formData.get('timespend'),
});
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Update Task.',
    };
  }
  
  const { title, what, how, who, grade, startdate, 
          enddate, status, idproject, timeprevision, timespend
        } = validatedFields.data;
        const sanitizedEndDate = enddate || null;
        const sanitizedTimeSpend = timespend || null;

  try {
    await sql`
    UPDATE autoricapp.tasks
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
      timeprevision = ${timeprevision},
      timespend = ${sanitizedTimeSpend}
    WHERE id = ${id}
  `;
} catch (error){
  return { message: 'Database Error: Failed to Update Task.' };
 }
 
  revalidatePath('/dashboard/tasks');
  redirect('/dashboard/projects/' + idproject + '/view' );
}

export async function deleteTask(id: string) {
    //throw new Error('Failed to Delete Invoice');
    
    await sql`DELETE FROM autoricapp.tasks WHERE id = ${id}`;
    revalidatePath('/dashboard/tasks');
  }