'use server';
import { z } from 'zod';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { sql } from '@vercel/postgres';
import { error } from 'console';
import { signIn } from '@/auth';
import { AuthError } from 'next-auth';
import bcrypt from 'bcrypt';


export async function authenticate(
  prevState: string | undefined,
  formData: FormData,
) {
  try {
    await signIn('credentials', formData);
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return 'Invalid credentials.';
        default:
          return 'Something went wrong.';
      }
    }
    throw error;
  }
}

const FormSchema = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string(),
  password: z.string()
});

const CreateUser = FormSchema.omit({ id: true });
const UpdateUser = FormSchema.omit({ id: true });

export type State = {
  errors?: {
    name?: string[];
    email?: string[];
    password?: string[];
  };
  message?: string | null;
};

export async function createUser(prevState: State, formData: FormData) {
  const validatedFields = CreateUser.safeParse({
      name: formData.get('name'),
      email: formData.get('email'),
      password: formData.get('password'),
    });

    if (!validatedFields.success) {
      return {
        errors: validatedFields.error.flatten().fieldErrors,
        message: 'Missing Fields. Failed to Create.',
      };
    }
    const { name, email, password} = validatedFields.data;
    const hashedPassword = await bcrypt.hash(password, 10);

    try {
        await sql`
        INSERT INTO proposalsapp.users ( name, email, password)
        VALUES (${name}, ${email}, ${hashedPassword})
        `;  
    } catch (error){
      return {
        message: 'Database Error: Failed to Create User.',
      };
    }
    revalidatePath('/dashboard/users');
    redirect('/dashboard/users');
}
 
export async function updateUser(
  id: string,
  prevState: State, 
  formData: FormData
  ){
  const validatedFields = UpdateUser.safeParse({
    name: formData.get('name'),
    email: formData.get('email'),
    password: formData.get('password'),
});
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Update User.',
    };
  }

  const { name, email, password} = validatedFields.data;
  const hashedPassword = await bcrypt.hash(password, 10);
   
  try {
  await sql`
    UPDATE proposalsapp.users
    SET name = ${name}, email = ${email}, password = ${hashedPassword} 
    WHERE id = ${id}
  `;
 } catch (error){
  return { message: 'Database Error: Failed to Update User.' };
 }
 
  revalidatePath('/dashboard/users');
  redirect('/dashboard/users');
}

export async function deleteUser(id: string) {
    //throw new Error('Failed to Delete Invoice');
    
    await sql`DELETE FROM proposalsapp.users WHERE id = ${id}`;
    revalidatePath('/dashboard/users');
  }