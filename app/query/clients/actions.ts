'use server';
import { z } from 'zod';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { sql } from '@vercel/postgres';

const FormSchema = z.object({
  id: z.string(),
  name: z.string(),
  cnpj: z.string(),
  idcompany: z.string()
});

const CreateClient = FormSchema.omit({ id: true });
const UpdateClient = FormSchema.omit({ id: true, idcompany: true });

export type State = {
  errors?: {
    name?: string[];
    cnpj?: string[];
  };
  message?: string | null;
};

export async function createClient(prevState: State, formData: FormData) {
  const validatedFields = CreateClient.safeParse({
      name: formData.get('name'),
      cnpj: formData.get('cnpj'),
      idcompany: formData.get('idcompany'),
    });

    if (!validatedFields.success) {
      return {
        errors: validatedFields.error.flatten().fieldErrors,
        message: 'Missing Fields. Failed to Create.',
      };
    }
    const { name, cnpj, idcompany } = validatedFields.data;

    try {
        await sql`
        INSERT INTO smartprojectsapp.clients ( name, cnpj, idcompany)
        VALUES (${name}, ${cnpj}, ${idcompany})
        `;  
    } catch (error){
      return {
        message: 'Database Error: Failed to Create.',
      };
    }
    revalidatePath('/clients');
    redirect('/clients');
}
 
export async function updateClient(
  id: string,
  prevState: State, 
  formData: FormData
  ){
  const validatedFields = UpdateClient.safeParse({
    name: formData.get('name'),
    cnpj: formData.get('cnpj'),
});
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Update Client.',
    };
  }

  const { name, cnpj} = validatedFields.data;
   
  try {
  await sql`
    UPDATE smartprojectsapp.clients
    SET name = ${name}, cnpj = ${cnpj} 
    WHERE id = ${id}
  `;
 } catch (error){
  console.log(error);
  return { message: 'Database Error: Failed to Update Client.' };
 }
 
  revalidatePath('/clients');
  redirect('/clients');
}

export async function deleteAction(id: string) {
    //throw new Error('Failed to Delete Invoice');
    
    await sql`DELETE FROM smartprojectsapp.clients WHERE id = ${id}`;
    revalidatePath('/clients');
  }