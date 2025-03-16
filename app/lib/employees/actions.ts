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
  idcompany: z.string({ invalid_type_error: 'Please select a company.' }),
  price: z.string(),
});

const CreateEmployee = FormSchema.omit({ id: true });
const UpdateEmployee = FormSchema.omit({ id: true });

export type State = {
  errors?: {
    name?: string[];
    idcompany?: string[];
  };
  message?: string | null;
};

export async function createEmployee(prevState: State, formData: FormData) {

  const validatedFields = CreateEmployee.safeParse({
    cpf: formData.get('cpf'),
    name: formData.get('name'),
    birth: formData.get('birth'),
    email: formData.get('email'),
    phone: formData.get('phone'),
    cep: formData.get('cep'),
    idcompany: formData.get('idcompany'),
    price: formData.get('price'),
  });


  if (!validatedFields.success) {
    console.log(validatedFields.error.flatten().fieldErrors);
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Create.',
    };
  }

  const { cpf, name, birth, email, phone, cep, idcompany, price } = validatedFields.data;
  const priceInCents = parseFloat(price) * 100;

  const sanitizedCpf = cpf || null;
  const sanitizedName = name || null;
  const sanitizedBirth = birth || null;
  const sanitizedEmail = email || null;
  const sanitizedPhone = phone || null;
  const sanitizedCep = cep || null;
  const sanitizedIdCompany = idcompany || null;
  const sanitizedPrice = isNaN(priceInCents) ? null : priceInCents;

  try {
    await sql`
      INSERT INTO autoricapp.employees (cpf, name, birth, email, phone, cep, idcompany, price)
      VALUES (${sanitizedCpf}, ${sanitizedName}, ${sanitizedBirth}, ${sanitizedEmail}, ${sanitizedPhone}, ${sanitizedCep}, ${sanitizedIdCompany}, ${sanitizedPrice})
    `;

  } catch (error) {
    return {
      message: 'Database Error: Failed to Create Employee.',
    };
  }
  revalidatePath('/employees');
  redirect('/employees');
}

export async function updateEmployee(
  id: string,
  prevState: State,
  formData: FormData
) {
  console.log(formData);
  const validatedFields = UpdateEmployee.safeParse({
    cpf: formData.get('cpf'),
    name: formData.get('name'),
    birth: formData.get('birth'),
    email: formData.get('email'),
    phone: formData.get('phone'),
    cep: formData.get('cep'),
    idcompany: formData.get('idcompany'),
    price: formData.get('price'),
  });
  if (!validatedFields.success) {
    console.log(validatedFields.error);
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Update Employee.',
    };
  }
  console.log(validatedFields.data.price);

  const { cpf, name, birth, email, phone, cep, idcompany, price } = validatedFields.data;
  const priceInCents = parseFloat(price) * 100;

  const sanitizedCpf = cpf || null;
  const sanitizedName = name || null;
  const sanitizedBirth = birth || null;
  const sanitizedEmail = email || null;
  const sanitizedPhone = phone || null;
  const sanitizedCep = cep || null;
  const sanitizedIdCompany = idcompany || null;
  const sanitizedPrice = isNaN(priceInCents) ? null : priceInCents;

  try {
    await sql`
    UPDATE autoricapp.employees
    SET cpf = ${sanitizedCpf}, name = ${sanitizedName}, birth = ${sanitizedBirth},
        email = ${sanitizedEmail}, phone = ${sanitizedPhone}, cep = ${sanitizedCep}, idcompany = ${sanitizedIdCompany}, price = ${sanitizedPrice}
    WHERE id = ${id}
  `;
  } catch (error) {
    console.log(error);
    return { message: 'Database Error: Failed to Update Employee.' };
  }

  revalidatePath('/employees');
  redirect('/employees');
}

export async function deleteEmployee(id: string) {
  //throw new Error('Failed to Delete Invoice');

  await sql`DELETE FROM autoricapp.employees WHERE id = ${id}`;
  revalidatePath('/employees');
}