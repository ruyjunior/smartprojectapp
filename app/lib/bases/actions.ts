'use server';
import { z } from 'zod';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { sql } from '@vercel/postgres';

const FormSchema = z.object({
  id: z.string(),
  name: z.string(),
});

const CreateBase = FormSchema.omit({ id: true });
const UpdateBase = FormSchema.omit({ id: true });

export type State = {
  errors?: {
    name?: string[];
  };
  message?: string | null;
};

export async function createBase(prevState: State, formData: FormData) {
    const validatedFields = CreateBase.safeParse({
      name: formData.get('name'),
    });

    if (!validatedFields.success) {
      return {
        errors: validatedFields.error.flatten().fieldErrors,
        message: 'Missing Fields. Failed to Create.',
      };
    }
    const { name } = validatedFields.data;

    try {
        await sql`
        INSERT INTO bases ( name)
        VALUES (${name})
        `;  
    } catch (error){
      return {
        message: 'Database Error: Failed to Create Base.',
      };
    }
    revalidatePath('/dashboard/bases');
    redirect('/dashboard/bases');
}
 
export async function updateBase(
  id: string,
  prevState: State, 
  formData: FormData
  ){
  const validatedFields = UpdateBase.safeParse({
    name: formData.get('name'),
  });
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Update Base.',
    };
  }

  const { name } = validatedFields.data;
 
 try {
  await sql`
    UPDATE bases
    SET name = ${name} 
    WHERE id = ${id}
  `;
 } catch (error){
  return { message: 'Database Error: Failed to Update Base.' };
 }
 
  revalidatePath('/dashboard/bases');
  redirect('/dashboard/bases');
}

export async function deleteBase(id: string) {
    //throw new Error('Failed to Delete Invoice');
    
    await sql`DELETE FROM bases WHERE id = ${id}`;
    revalidatePath('/dashboard/bases');
  }