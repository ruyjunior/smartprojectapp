'use server';
import { z } from 'zod';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { sql } from '@vercel/postgres';

const FormSchema = z.object({
  id: z.string(),
  name: z.string(),
  cnpj: z.string(),
});

const CreateCompanie = FormSchema.omit({ id: true });
const UpdateCompanie = FormSchema.omit({ id: true });

export type State = {
  errors?: {
    name?: string[];
    cnpj?: string[];
  };
  message?: string | null;
};

export async function createCompanie(prevState: State, formData: FormData) {
  const validatedFields = CreateCompanie.safeParse({
      name: formData.get('name'),
      cnpj: formData.get('cnpj'),
    });

    if (!validatedFields.success) {
      return {
        errors: validatedFields.error.flatten().fieldErrors,
        message: 'Missing Fields. Failed to Create.',
      };
    }
    const { name, cnpj} = validatedFields.data;

    try {
        await sql`
        INSERT INTO smartprojectsapp.companies ( name, cnpj)
        VALUES (${name}, ${cnpj})
        `;  
    } catch (error){
      return {
        message: 'Database Error: Failed to Create Companie.',
      };
    }
    revalidatePath('/companies');
    redirect('/companies');
}
 
export async function updateCompanie(
  id: string,
  prevState: State, 
  formData: FormData
  ){
  const validatedFields = UpdateCompanie.safeParse({
    name: formData.get('name'),
    cnpj: formData.get('cnpj'),
});
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Update Companie.',
    };
  }

  const { name, cnpj} = validatedFields.data;
   
  try {
  await sql`
    UPDATE smartprojectsapp.companies
    SET name = ${name}, cnpj = ${cnpj} 
    WHERE id = ${id}
  `;
 } catch (error){
  console.log(error);
  return { message: 'Database Error: Failed to Update Companie.' };
 }
 
  revalidatePath('/companies');
  redirect('/companies');
}

export async function deleteCompanie(id: string) {
    //throw new Error('Failed to Delete Invoice');
    
    await sql`DELETE FROM smartprojectsapp.companies WHERE id = ${id}`;
    revalidatePath('/companies');
  }