'use server';
import { z } from 'zod';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { sql } from '@vercel/postgres';

const FormSchema = z.object({
  id: z.string(),
  title: z.string(),
  comments: z.string(),
  idcompany: z.string().optional(),
  idclient: z.string(),
  idcompanycontact: z.string(),
  idclientcontact: z.string(),
});

const CreateProject = FormSchema.omit({ id: true });
const UpdateProject = FormSchema.omit({ id: true, idcompany: true });

export type State = {
  message?: string;
  errors?: {
    title?: string[];
    comments?: string[];
    idclient?: string[];
    idcompanycontact?: string[];
    idclientcontact?: string[];
  };
};

export async function createProject(prevState: State, formData: FormData) {
  const validatedFields = CreateProject.safeParse({
    title: formData.get('title'),
    comments: formData.get('comments'),
    idcompany: formData.get('idcompany'),
    idclient: formData.get('idclient'),
    idcompanycontact: formData.get('idcompanycontact'),
    idclientcontact: formData.get('idclientcontact'),
    });

    if (!validatedFields.success) {
      return {
        errors: validatedFields.error.flatten().fieldErrors,
        message: 'Missing Fields. Failed to Create.',
      };
    }
    const { title, comments, idcompany, idclient, idcompanycontact, idclientcontact } = validatedFields.data;

    try {
        await sql`
        INSERT INTO smartprojectsapp.projects ( title, comments, idcompany, idclient, idcompanycontact, idclientcontact)
        VALUES (${title}, ${comments}, ${idcompany}, ${idclient}, ${idcompanycontact}, ${idclientcontact})
        `;  
    } catch (error){
      return {
        message: 'Database Error: Failed to Create Project.',
      };
    }
    revalidatePath('/projects');
    redirect('/projects');
}
 
export async function updateProject(
  id: string,
  prevState: State, 
  formData: FormData
  ){
  //console.log('FormData:' + formData);
  const validatedFields = UpdateProject.safeParse({
    title: formData.get('title'),
    comments: formData.get('comments'),
    idclient: formData.get('idclient'),
    idcompanycontact: formData.get('idcompanycontact'),
    idclientcontact: formData.get('idclientcontact'),
});
  if (!validatedFields.success) {
    //console.log(validatedFields.error);
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Update Project.',
    };
  }
    const { title, comments, idclient, idcompanycontact, idclientcontact } = validatedFields.data;
   
  try {
  await sql`
    UPDATE smartprojectsapp.projects
    SET 
    title = ${title}, comments = ${comments}, idclient = ${idclient},
    idcompanycontact = ${idcompanycontact}, idclientcontact = ${idclientcontact}
    WHERE id = ${id}
  `;
 } catch (error){
  //console.log(error);
  return { message: 'Database Error: Failed to Update Project.' };
 }
 
  revalidatePath('/projects');
  redirect('/projects');
}

export async function deleteAction(id: string) {
  await sql`DELETE FROM smartprojectsapp.projects WHERE id = ${id}`;
  revalidatePath('/projects');
}