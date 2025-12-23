'use server';
import { z } from 'zod';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { sql } from '@vercel/postgres';

const FormSchema = z.object({
  id: z.string(),
  title: z.string(),
  comments: z.string().optional(),
  idproject: z.string(),
  iduser: z.string().optional(),
  amount: z.string(),
  date: z.string(),
});

const CreatePayment = FormSchema.omit({ id: true });
const UpdatePayment = FormSchema.omit({ id: true, iduser: true });

export type State = {
  message?: string;
  errors?: {
    title?: string[];
    comments?: string[];
    amount?: string[];
    date?: string[];
  };
};

export async function createPayment(prevState: State, formData: FormData) {
  const validatedFields = CreatePayment.safeParse({
    title: formData.get('title'),
    comments: formData.get('comments'),
    idproject: formData.get('idproject'),
    iduser: formData.get('iduser'),
    amount: formData.get('amount'),
    date: formData.get('date'),
  });
  console.log(formData);

  if (!validatedFields.success) {
    console.log(validatedFields.error)

    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Create.',
    };
  }
  const { title, comments, idproject, iduser, amount, date } = validatedFields.data;
  const amountFormatted = amount.replace(/[^\d.,-]/g, '').replace(/\./g, '').replace(',', '.');


  try {
    await sql`
        INSERT INTO smartprojectsapp.payments ( title, comments, idproject, iduser, amount, date)
        VALUES (${title}, ${comments}, ${idproject}, ${iduser}, ${amountFormatted}, ${date})
        `;
  } catch (error) {
    return {
      message: 'Database Error: Failed to Create Project.',
    };
  }
  revalidatePath(`/projects/${idproject}/payments`);
  redirect(`/projects/${idproject}/payments`);
}

export async function updatePayment(
  id: string,
  prevState: State,
  formData: FormData
) {
    console.log('Form Data', formData);

  const validatedFields = UpdatePayment.safeParse({
    title: formData.get('title'),
    comments: formData.get('comments'),
    amount: formData.get('amount'),
    idproject: formData.get('idproject'),
    date: formData.get('date'),
  });

  if (!validatedFields.success) {
    console.log(validatedFields.error);
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Update Payment.',
    };
  }

  const { title, comments, amount, date, idproject } = validatedFields.data;
  const amountFormatted = amount.replace(/[^\d.,-]/g, '').replace(/\./g, '').replace(',', '.');
  try {
    // Atualizar projeto
    await sql`
      UPDATE smartprojectsapp.payments
      SET title = ${title}, comments = ${comments}, amount = ${amountFormatted}, date = ${date}
      WHERE id = ${id}
    `;

  } catch (error) {
    console.log(error);
    return { message: 'Database Error: Failed to Update Payment.' };
  }

  revalidatePath(`/projects/${idproject}/payments`);
  redirect(`/projects/${idproject}/payments`);
}

export async function deleteAction(id: string) {
  await sql`DELETE FROM smartprojectsapp.payments WHERE id = ${id}`;
  revalidatePath('/payments');
}