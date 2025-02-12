'use server';
import { z } from 'zod';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { sql } from '@vercel/postgres';

const FormSchema = z.object({
  id: z.string(),
  age: z.string(),
  valuetitular: z.coerce
  .number()
  .gt(0, { message: 'Please enter an amount greater than $0.' }),
  numberplan: z.coerce
  .number()
  .gt(0, { message: 'Please enter an amount greater than $0.' }),
  idpolicie: z.string(),
});

const CreateCost = FormSchema.omit({ id: true });
const UpdateCost = FormSchema.omit({ id: true });

export type State = {
  errors?: {
    age?: string[];
    valuetitular?: string[];
    idpolicie?: string[];
    numberplan?: string[];
  };
  message?: string | null;
};

export async function createCost(prevState: State, formData: FormData) {
  const validatedFields = CreateCost.safeParse({
    age: formData.get('age'),
    valuetitular: formData.get('valuetitular'),
    idpolicie: formData.get('idpolicie'),
    numberplan: formData.get('numberplan')
    });

    if (!validatedFields.success) {
      return {
        errors: validatedFields.error.flatten().fieldErrors,
        message: 'Missing Fields. Failed to Create.',
      };
    }
    const { age, valuetitular, idpolicie, numberplan} = validatedFields.data;

    try {
        await sql`
        INSERT INTO proposalsapp.costs ( age, valuetitular, idpolicie, numberplan)
        VALUES (${age}, ${valuetitular}, ${idpolicie}, ${numberplan})
        `;  
    } catch (error){
      return {
        message: 'Database Error: Failed to Create Cost.',
      };
    }
    revalidatePath('/dashboard/costs');
    redirect('/dashboard/costs');
}
 
export async function updateCost(
  id: string,
  prevState: State, 
  formData: FormData
  ){
  const validatedFields = UpdateCost.safeParse({
    age: formData.get('age'),
    valuetitular: formData.get('valuetitular'),
    idpolicie: formData.get('idpolicie'),
    numberplan: formData.get('numberplan')
});
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Update Cost.',
    };
  }

  const { age, valuetitular, idpolicie, numberplan} = validatedFields.data;
   
  try {
  await sql`
    UPDATE proposalsapp.costs
    SET age = ${age}, valuetitular = ${valuetitular}, idpolicie = ${idpolicie},  numberplan = ${numberplan} 
    WHERE id = ${id}
  `;
 } catch (error){
  return { message: 'Database Error: Failed to Update Cost.' };
 }
 
  revalidatePath('/dashboard/costs');
  redirect('/dashboard/costs');
}

export async function deleteCost(id: string) {
    //throw new Error('Failed to Delete Invoice');
    
    await sql`DELETE FROM proposalsapp.costs WHERE id = ${id}`;
    revalidatePath('/dashboard/costs');
  }