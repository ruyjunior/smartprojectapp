'use server';
import { z } from 'zod';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { sql } from '@vercel/postgres';
import bcrypt from 'bcryptjs';
import { deleteUnusedFiles } from '@/app/lib/deleteUnusedFiles';

const FormSchema = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string(),
  password: z.string(),
  avatarurl: z.string().optional(),
  role: z.string(),
  idcompany: z.string()
});

const CreateUser = FormSchema.omit({ id: true });
const UpdateUser = FormSchema.omit({ id: true, idcompany: true });

export type State = {
  errors?: {
    name?: string[];
    email?: string[];
    password?: string[];
    role?: string[];
  };
  message?: string | null;
};

export async function createUser(prevState: State, formData: FormData) {
  const validatedFields = CreateUser.safeParse({
    name: formData.get('name'),
    email: formData.get('email'),
    password: formData.get('password'),
    role: formData.get('role'),
    idcompany: formData.get('idcompany'),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Create.',
    };
  }
  const { name, email, password, role, idcompany } = validatedFields.data;
  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    await sql`
        INSERT INTO smartprojectsapp.users ( name, email, password, role, idcompany)
        VALUES (${name}, ${email}, ${hashedPassword}, ${role}, ${idcompany})
        `;
  } catch (error) {
    return {
      message: 'Database Error: Failed to Create User.',
    };
  }
  revalidatePath('/settings/users');
  redirect('/settings/users');
}

export async function updateUser(
  id: string,
  prevState: State,
  formData: FormData
) {
  const validatedFields = UpdateUser.safeParse({
    name: formData.get('name'),
    email: formData.get('email'),
    password: formData.get('password'),
    role: formData.get('role'),
    avatarurl: formData.get('avatarurl'),
  });
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Update User.',
    };
  }

  const { name, email, password, role, avatarurl } = validatedFields.data;
  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    if (password) {
      const hashedPassword = await bcrypt.hash(password, 10);
      //console.log('Senha' + password);
      //console.log('Senha Criptografada' + hashedPassword);

      await sql`
        UPDATE smartprojectsapp.users
        SET name = ${name}, email = ${email}, password = ${hashedPassword}, role = ${role}, avatarurl = ${avatarurl}
        WHERE id = ${id}
      `;
    } else {
      //console.log(password);

      await sql`
        UPDATE smartprojectsapp.users
        SET name = ${name}, email = ${email}, role = ${role}, avatarurl = ${avatarurl}
        WHERE id = ${id}
      `;
    }
  } catch (error) {
    return { message: 'Database Error: Failed to Update User.' };
  }
  deleteUnusedFiles();
  revalidatePath('/settings/users');
  redirect('/settings/users');
}

export async function deleteAction(id: string) {
  //throw new Error('Failed to Delete Invoice');

  await sql`DELETE FROM smartprojectsapp.users WHERE id = ${id}`;
  revalidatePath('/settings/users');
}