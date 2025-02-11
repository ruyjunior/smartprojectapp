'use server';
import { z } from 'zod';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { sql } from '@vercel/postgres';
import { error } from 'console';
import { signIn } from '@/auth';
import { AuthError } from 'next-auth';

const FormSchema = z.object({
  id: z.string(),
  mat: z.string(),
  cpf: z.string(),
  name: z.string(),
  birth: z.string(),
  email: z.string(),
  phone: z.string(),
  cep: z.string(),
  idbase: z.string({ invalid_type_error: 'Please select a base.'}),
});

const CreateClient = FormSchema.omit({ id: true });
const UpdateClient = FormSchema.omit({ id: true });

export type State = {
  errors?: {
    mat?: string[];
    cpf?: string[];
    name?: string[];
    birth?: string[];
    email?: string[];
    phone?: string[];
    cep?: string[];
    idbase?: string[];
  };
  message?: string | null;
};

export async function createClient(prevState: State, formData: FormData) {
  const validatedFields = CreateClient.safeParse({
      mat: formData.get('mat'),
      cpf: formData.get('cpf'),
      name: formData.get('name'),
      birth: formData.get('birth'),
      email: formData.get('email'),
      phone: formData.get('phone'),
      cep: formData.get('cep'),
      idbase: formData.get('idbase'),
    });

    if (!validatedFields.success) {
      return {
        errors: validatedFields.error.flatten().fieldErrors,
        message: 'Missing Fields. Failed to Create.',
      };
    }
    const { mat, cpf, name, birth, email, phone, cep, idbase } = validatedFields.data;

    try {
        await sql`
        INSERT INTO proposalsapp.clients (mat, cpf, name, birth, 
        email, phone, cep, idbase)
        VALUES (${mat}, ${cpf}, ${name}, ${birth}, ${email}, ${phone}, 
        ${cep}, ${idbase})
        `;  
    } catch (error){
      return {
        message: 'Database Error: Failed to Create Client.',
      };
    }
    revalidatePath('/dashboard/clients');
    redirect('/dashboard/clients');
}
 
export async function updateClient(
  id: string,
  prevState: State, 
  formData: FormData
  ){
  const validatedFields = UpdateClient.safeParse({
    mat: formData.get('mat'),
    cpf: formData.get('cpf'),
    name: formData.get('name'),
    birth: formData.get('birth'),
    email: formData.get('email'),
    phone: formData.get('phone'),
    cep: formData.get('cep'),
    idbase: formData.get('idbase'),
});
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Update Client.',
    };
  }

  const { mat, cpf, name, birth, email, phone, cep, idbase } = validatedFields.data;
   
  try {
  await sql`
    UPDATE proposalsapp.clients
    SET mat = ${mat}, cpf = ${cpf}, name = ${name}, birth = ${birth},
        email = ${email}, phone = ${phone}, cep = ${cep}, idbase = ${idbase}
    WHERE id = ${id}
  `;
 } catch (error){
  return { message: 'Database Error: Failed to Update Client.' };
 }
 
  revalidatePath('/dashboard/clients');
  redirect('/dashboard/clients');
}

export async function deleteClient(id: string) {
    //throw new Error('Failed to Delete Invoice');
    
    await sql`DELETE FROM proposalsapp.clients WHERE id = ${id}`;
    revalidatePath('/dashboard/clients');
  }