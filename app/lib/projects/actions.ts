'use server';
import { z } from 'zod';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { sql } from '@vercel/postgres';

const FormSchema = z.object({
  id: z.string(),
  title: z.string(),
  comments: z.string(),
  idprovider: z.string(),
  idtaker: z.string(),
});

const CreateProject = FormSchema.omit({ id: true });
const UpdateProject = FormSchema.omit({ id: true });

export type State = {
  errors?: {
    title?: string[];
    comments?: string[];
    idprovider?: string[];
    idtaker?: string[];
  };
  message?: string | null;
};

export async function createProject(prevState: State, formData: FormData) {
  const validatedFields = CreateProject.safeParse({
    title: formData.get('title'),
    comments: formData.get('comments'),
    idprovider: formData.get('idprovider'),
    idtaker: formData.get('idtaker'),
    });

    if (!validatedFields.success) {
      return {
        errors: validatedFields.error.flatten().fieldErrors,
        message: 'Missing Fields. Failed to Create.',
      };
    }
    const { title, comments, idprovider, idtaker} = validatedFields.data;

    try {
        await sql`
        INSERT INTO autoricapp.projects ( title, comments, idprovider, idtaker)
        VALUES (${title}, ${comments}, ${idprovider}, ${idtaker})
        `;  
    } catch (error){
      return {
        message: 'Database Error: Failed to Create Project.',
      };
    }
    revalidatePath('/dashboard/projects');
    redirect('/dashboard/projects');
}
 
export async function updateProject(
  id: string,
  prevState: State, 
  formData: FormData
  ){
  const validatedFields = UpdateProject.safeParse({
    title: formData.get('title'),
    comments: formData.get('comments'),
    idprovider: formData.get('idprovider'),
    idtaker: formData.get('idtaker'),
});
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Update Project.',
    };
  }
  const { title, comments, idprovider, idtaker} = validatedFields.data;
   
  try {
  await sql`
    UPDATE autoricapp.projects
    SET 
    title = ${title}, comments = ${comments}, idprovider = ${idprovider}, idtaker = ${idtaker}
    WHERE id = ${id}
  `;
 } catch (error){
  return { message: 'Database Error: Failed to Update Project.' };
 }
 
  revalidatePath('/dashboard/projects');
  redirect('/dashboard/projects');
}

export async function deleteProject(id: string) {
  await sql`DELETE FROM autoricapp.projects WHERE id = ${id}`;
  revalidatePath('/dashboard/projects');
}