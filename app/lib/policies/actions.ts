'use server';
import { z } from 'zod';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { sql } from '@vercel/postgres';
import { error } from 'console';
import bcrypt from 'bcrypt';

const FormSchema = z.object({
  id: z.string(),
  number: z.string(),
  idcompany: z.string(),
});

const CreatePolicie = FormSchema.omit({ id: true });
const UpdatePolicie = FormSchema.omit({ id: true });

export type State = {
  errors?: {
    number?: string[];
    idcompany?: string[];
  };
  message?: string | null;
};

export async function createPolicie(prevState: State, formData: FormData) {
  const validatedFields = CreatePolicie.safeParse({
      number: formData.get('number'),
      idcompany: formData.get('idcompany'),
    });

    if (!validatedFields.success) {
      return {
        errors: validatedFields.error.flatten().fieldErrors,
        message: 'Missing Fields. Failed to Create.',
      };
    }
    const { number, idcompany} = validatedFields.data;

    try {
        await sql`
        INSERT INTO proposalsapp.policies ( number, idcompany)
        VALUES (${number}, ${idcompany})
        `;  
    } catch (error){
      return {
        message: 'Database Error: Failed to Create Policie.',
      };
    }
    revalidatePath('/dashboard/policies');
    redirect('/dashboard/policies');
}
 
export async function updatePolicie(
  id: string,
  prevState: State, 
  formData: FormData
  ){
  const validatedFields = UpdatePolicie.safeParse({
    number: formData.get('number'),
    idcompany: formData.get('idcompany'),
});
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Update Policie.',
    };
  }

  const { number, idcompany} = validatedFields.data;
   
  try {
  await sql`
    UPDATE proposalsapp.policies
    SET number = ${number}, idcompany = ${idcompany} 
    WHERE id = ${id}
  `;
 } catch (error){
  return { message: 'Database Error: Failed to Update Policie.' };
 }
 
  revalidatePath('/dashboard/policies');
  redirect('/dashboard/policies');
}

export async function deletePolicie(id: string) {
    //throw new Error('Failed to Delete Invoice');
    
    await sql`DELETE FROM proposalsapp.policies WHERE id = ${id}`;
    revalidatePath('/dashboard/policies');
  }