'use server';
import { z } from 'zod';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { sql } from '@vercel/postgres';

const FormSchema = z.object({
  id: z.string(),
  number: z.string(),
  valuedeath: z.coerce
  .number()
  .gt(0, { message: 'Please enter an amount greater than $0.' }),
  idpolicie: z.string(),
});

const CreatePlan = FormSchema.omit({ id: true });
const UpdatePlan = FormSchema.omit({ id: true });

export type State = {
  errors?: {
    number?: string[];
    valuedeath?: string[];
    idpolicie?: string[];
  };
  message?: string | null;
};

export async function createPlan(prevState: State, formData: FormData) {
  const validatedFields = CreatePlan.safeParse({
    number: formData.get('number'),
    valuedeath: formData.get('valuedeath'),
    idpolicie: formData.get('idpolicie'),
    });

    if (!validatedFields.success) {
      return {
        errors: validatedFields.error.flatten().fieldErrors,
        message: 'Missing Fields. Failed to Create.',
      };
    }
    const { number, valuedeath, idpolicie} = validatedFields.data;
    const valuedeathInCents = valuedeath * 100;

    try {
        await sql`
        INSERT INTO proposalsapp.plans ( number, valuedeath, idpolicie)
        VALUES (${number}, ${valuedeathInCents}, ${idpolicie})
        `;  
    } catch (error){
      return {
        message: 'Database Error: Failed to Create Plan.',
      };
    }
    revalidatePath('/dashboard/plans');
    redirect('/dashboard/plans');
}
 
export async function updatePlan(
  id: string,
  prevState: State, 
  formData: FormData
  ){
  const validatedFields = UpdatePlan.safeParse({
    number: formData.get('number'),
    valuedeath: formData.get('valuedeath'),
    idpolicie: formData.get('idpolicie'),
});
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Update Plan.',
    };
  }

  const { number, valuedeath, idpolicie} = validatedFields.data;
  const valuedeathInCents = valuedeath * 100;

  try {
  await sql`
    UPDATE proposalsapp.plans
    SET number = ${number}, valuedeath = ${valuedeathInCents}, idpolicie = ${idpolicie} 
    WHERE id = ${id}
  `;
 } catch (error){
  return { message: 'Database Error: Failed to Update Plan.' };
 }
 
  revalidatePath('/dashboard/plans');
  redirect('/dashboard/plans');
}

export async function deletePlan(id: string) {
    //throw new Error('Failed to Delete Invoice');
    
    await sql`DELETE FROM proposalsapp.plans WHERE id = ${id}`;
    revalidatePath('/dashboard/plans');
  }