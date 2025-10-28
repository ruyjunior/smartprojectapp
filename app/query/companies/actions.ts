'use server';
import { z } from 'zod';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { sql } from '@vercel/postgres';

const FormSchema = z.object({
  id: z.string(),
  name: z.string(),
  cnpj: z.string().optional(),
  cep: z.string().optional().nullable(),
  siteurl: z.string().optional().nullable(),
  logourl: z.string().optional().nullable(),
  phone: z.string().optional(),
  email: z.string().optional(),
  localaddress: z.string().optional(),
});

const CreateCompany = FormSchema.omit({ id: true });
const UpdateCompany = FormSchema.omit({ id: true });

export type State = {
  errors?: {
    name?: string[];
    cnpj?: string[];
    cep?: string[];
    siteurl?: string[];
    logourl?: string[];
    phone?: string[];
    email?: string[];
    localaddress?: string[];
  };
  message?: string | null;
};

export async function createCompany(prevState: State, formData: FormData) {
  const validatedFields = CreateCompany.safeParse({
    name: formData.get('name'),
    cnpj: formData.get('cnpj'),
    cep: formData.get('cep'),
    siteurl: formData.get('siteurl'),
    logourl: formData.get('logourl'),
    phone: formData.get('phone'),
    email: formData.get('email'),
    localaddress: formData.get('localaddress'),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Create.',
    };
  }
  const { name, cnpj, cep, siteurl, logourl, phone, email, localaddress } = validatedFields.data;

  try {
    await sql`
        INSERT INTO smartprojectsapp.companies ( name, cnpj, cep, siteurl, logourl, phone, email, localaddress)
        VALUES (${name}, ${cnpj}, ${cep}, ${siteurl}, ${logourl}, ${phone}, ${email}, ${localaddress})
        `;
  } catch (error) {
    return {
      message: 'Database Error: Failed to Create.',
    };
  }
  revalidatePath('/dashboard');
  redirect('/dashboard');
}

export async function updateCompany(
  id: string,
  prevState: State,
  formData: FormData
) {
  const validatedFields = UpdateCompany.safeParse({
    name: formData.get('name'),
    cnpj: formData.get('cnpj'),
    cep: formData.get('cep'),
    siteurl: formData.get('siteurl'),
    logourl: formData.get('logourl'),
    phone: formData.get('phone'),
    email: formData.get('email'),
    localaddress: formData.get('localaddress'),
  });

  if (!validatedFields.success) {
    console.log(validatedFields.error.flatten().fieldErrors);
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Update Company.',
    };
  }

  const { name, cnpj, cep, siteurl, logourl, phone, email, localaddress } = validatedFields.data;

  const sanitizedEmail = email || null;
  const sanitizedPhone = phone || null;
  const sanitizedCep = cep || null;
  const sanitizedLocalAddress = localaddress || null;
  const sanitizedSiteUrl = siteurl || null;
  const sanitizedLogoUrl = logourl || null;
  const sanitizedCNPJ = cnpj || null;

  try {
    await sql`
    UPDATE smartprojectsapp.companies
    SET name = ${name}, cnpj = ${sanitizedCNPJ}, cep = ${sanitizedCep}, siteurl = ${sanitizedSiteUrl}, logourl = ${sanitizedLogoUrl}, phone = ${sanitizedPhone}, email = ${sanitizedEmail}, localaddress = ${sanitizedLocalAddress}
    WHERE id = ${id}
  `;
  } catch (error) {
    console.log(error);
    return { message: 'Database Error: Failed to Update Company.' };
  }

  revalidatePath('/settings/company');
  redirect('/settings/company/');
}

export async function deleteCompany(id: string) {
  //throw new Error('Failed to Delete Invoice');

  await sql`DELETE FROM smartprojectsapp.companies WHERE id = ${id}`;
  revalidatePath('/');
}