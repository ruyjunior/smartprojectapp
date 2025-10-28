'use server';
import { z } from 'zod';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { sql } from '@vercel/postgres';

const FormSchema = z.object({
  id: z.string(),
  cpf: z.string(),
  name: z.string(),
  birth: z.string(),
  email: z.string(),
  phone: z.string(),
  cep: z.string(),
  idcompany: z.string().optional(),
  idclient: z.string().nullable().optional(),
});

const CreateContact = FormSchema.omit({ id: true });
const UpdateContact = FormSchema.omit({ id: true, idcompany: true });

export type State = {
  errors?: {
    name?: string[];
    idclient?: string[];
  };
  message?: string | null;
};

export async function createContact(prevState: State, formData: FormData) {

  const validatedFields = CreateContact.safeParse({
    cpf: formData.get('cpf'),
    name: formData.get('name'),
    birth: formData.get('birth'),
    email: formData.get('email'),
    phone: formData.get('phone'),
    cep: formData.get('cep'),
    idcompany: formData.get('idcompany'),
    idclient: formData.get('idclient'),
  });


  if (!validatedFields.success) {
    console.log(validatedFields.error.flatten().fieldErrors);
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Create.',
    };
  }

  const { cpf, name, birth, email, phone, cep, idcompany, idclient } = validatedFields.data;

  const sanitizedCpf = cpf || null;
  const sanitizedName = name || null;
  const sanitizedBirth = birth || null;
  const sanitizedEmail = email || null;
  const sanitizedPhone = phone || null;
  const sanitizedCep = cep || null;
  const sanitizedIdCompany = idcompany || null;
  const sanitizedIdClient = idclient || null;

  try {
    await sql`
      INSERT INTO smartprojectsapp.contacts(cpf, name, birth, email, phone, cep, idcompany, idclient)
      VALUES (${sanitizedCpf}, ${sanitizedName}, ${sanitizedBirth}, ${sanitizedEmail}, ${sanitizedPhone}, ${sanitizedCep}, ${sanitizedIdCompany}, ${sanitizedIdClient})
    `;

  } catch (error) {
    return {
      message: 'Database Error: Failed to Create Contact.',
    };
  }
  revalidatePath('/contacts');
  redirect('/contacts');
}

export async function updateContact(
  id: string,
  prevState: State,
  formData: FormData
) {
  //console.log(formData);
  const validatedFields = UpdateContact.safeParse({
    cpf: formData.get('cpf'),
    name: formData.get('name'),
    birth: formData.get('birth'),
    email: formData.get('email'),
    phone: formData.get('phone'),
    cep: formData.get('cep'),
    idclient: formData.get('idclient'),
  });
  if (!validatedFields.success) {
    console.log(validatedFields.error);
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Update Contact.',
    };
  }

  const { cpf, name, birth, email, phone, cep, idclient } = validatedFields.data;

  const sanitizedCpf = cpf || null;
  const sanitizedName = name || null;
  const sanitizedBirth = birth || null;
  const sanitizedEmail = email || null;
  const sanitizedPhone = phone || null;
  const sanitizedCep = cep || null;
  const sanitizedIdClient = idclient || null;
  try {
    await sql`
    UPDATE smartprojectsapp.contacts
    SET cpf = ${sanitizedCpf}, name = ${sanitizedName}, birth = ${sanitizedBirth},
        email = ${sanitizedEmail}, phone = ${sanitizedPhone}, cep = ${sanitizedCep}, idclient = ${sanitizedIdClient}
    WHERE id = ${id}
  `;
  } catch (error) {
    console.log(error);
    return { message: 'Database Error: Failed to Update Contact.' };
  }

  revalidatePath('/contacts');
  redirect('/contacts');
}

export async function deleteAction(id: string) {
  //throw new Error('Failed to Delete Invoice');

  await sql`DELETE FROM smartprojectsapp.contacts WHERE id = ${id}`;
  revalidatePath('/contacts');
}