'use server';
import { z } from 'zod';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { sql } from '@vercel/postgres';
import { start } from 'repl';

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
});

const CreateTask = FormSchema.omit({ id: true, enddate: true, how: true });
const UpdateTask = FormSchema.omit({ id: true });

export type State = {
  errors?: {
    title?: string[];
    startdate?: String[];
    what?: string[];
    how?: string[];
    who?: string[];
    grade?: string[]; 
    idproject?: string[];
  };
  message?: string | null;
};

export async function createTask(prevState: State, formData: FormData) {
  const validatedFields = CreateTask.safeParse({
    title: formData.get('title'),
    startdate: formData.get('startdate'),
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
    const { title, startdate, status, what, who, grade, idproject} = validatedFields.data;

    try {
        await sql`
        INSERT INTO autoricapp.tasks ( title, startdate, status, what, who, grade, idproject)
        VALUES (${title}, ${startdate}, ${status}, ${what}, ${who}, ${grade}, ${idproject})
        `;  
    } catch (error){
      return {
        message: 'Database Error: Failed to Create Task.',
      };
    }
    revalidatePath('/dashboard/tasks');
    redirect('/dashboard/tasks');
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
    idproject: formData.get('idproject')
});
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Update Task.',
    };
  }
  
  const { title, what, how, who, grade, startdate, enddate, status, idproject} = validatedFields.data;
  const sanitizedEndDate = enddate || null;

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
      status = ${status}
    WHERE id = ${id}
  `;
} catch (error){
  return { message: 'Database Error: Failed to Update Task.' };
 }
 
  revalidatePath('/dashboard/tasks');
  redirect('/dashboard/tasks');
}

export async function deleteTask(id: string) {
    //throw new Error('Failed to Delete Invoice');
    
    await sql`DELETE FROM autoricapp.tasks WHERE id = ${id}`;
    revalidatePath('/dashboard/tasks');
  }