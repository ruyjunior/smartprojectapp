'use server';
import { z } from 'zod';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { sql } from '@vercel/postgres';
import { deleteUnusedFiles } from '@/app/lib/deleteUnusedFiles';

const FormSchema = z.object({
  id: z.string(),
  title: z.string(),
  comments: z.string().optional(),
  url: z.string().optional(),
  type: z.string().optional().nullable(),
  size: z.number().optional(),
  owner_id: z.string(),
  owner_type: z.string(),
});

const CreateFile = FormSchema.omit({ id: true });
const UpdateFile = FormSchema.omit({ id: true });

export type State = {
  message?: string;
  errors?: {
    title?: string[];
    comments?: string[];
    url?: string[];
    type?: string[];
    size?: string[];
    owner_id?: string[];
    owner_type?: string[];
  };
};

export async function createFile(prevState: State | undefined, formData: FormData) {
  const validatedFields = CreateFile.safeParse({
    title: formData.get('title'),
    comments: formData.get('comments'),
    url: formData.get('url'),
    type: formData.get('type'),
    size: Number(formData.get('size')),
    owner_id: formData.get('owner_id'),
    owner_type: formData.get('owner_type'),
  });

  if (!validatedFields.success) {
    console.log(validatedFields.error.flatten().fieldErrors);
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Create.',
    };
  }
  const { title, comments, url, type, size, owner_id, owner_type } = validatedFields.data;

  try {
    await sql`
        INSERT INTO smartprojectsapp.files ( 
          title, comments, url, type, size, owner_id, owner_type)
        VALUES (${title}, ${comments}, ${url}, ${type}, ${size}, ${owner_id}, ${owner_type})
        `;
  } catch (error) {
    console.error(error);
    return {
      message: 'Database Error: Failed to Create File.',
    };
  }
  await deleteUnusedFiles();
  revalidatePath('/files');

  if (owner_type === 'project') {
    redirect('/projects/' + owner_id + '/files');
  } else if (owner_type === 'user') {
    redirect('/settings/users/' + owner_id + '/files');
  } else if (owner_type === 'company') {
    redirect('/settings/company/');
  }
  return { message: 'File created successfully.' };
}

export async function updateFile(
  id: string,
  prevState: State | undefined,
  formData: FormData
) {
  const validatedFields = UpdateFile.safeParse({
    title: formData.get('title'),
    comments: formData.get('comments'),
    url: formData.get('url'),
    type: formData.get('type'),
    size: Number(formData.get('size')),
    owner_id: formData.get('owner_id'),
    owner_type: formData.get('owner_type'),
  });
  if (!validatedFields.success) {
    //console.log(validatedFields.error.flatten().fieldErrors);
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Update File.',
    };
  }
  //console.log(validatedFields.data);
  const { title, comments, url, type, size, owner_id, owner_type } = validatedFields.data;

  try {
    await sql`
    UPDATE smartprojectsapp.files
    SET 
      title = ${title}, 
      comments = ${comments},
      url = ${url},
      type = ${type},
      size = ${size},
      owner_id = ${owner_id},
      owner_type = ${owner_type}
    WHERE id = ${id}
  `;
  } catch (error) {
    console.error(error);
    return { message: 'Database Error: Failed to Update File.' };
  }
  await deleteUnusedFiles();
  revalidatePath('/files');
  if (owner_type === 'project') {
    redirect('/projects/' + owner_id + '/files');
  } else if (owner_type === 'user') {
    redirect('/settings/users/' + owner_id + '/files');
  } else if (owner_type === 'company') {
    redirect('/settings/company/');
  }
}

export async function deleteAction(id: string) {
  //throw new Error('Failed to Delete Invoice');

  await sql`DELETE FROM smartprojectsapp.files WHERE id = ${id}`;
  await deleteUnusedFiles();
  revalidatePath('/files');
}