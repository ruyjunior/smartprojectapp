'use server';
import { z } from 'zod';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { sql } from '@vercel/postgres';
import { timeStamp } from 'console';

const FormSchema = z.object({
  id: z.string(),
  number: z.string(),
  idclient: z.string(),
  iduser: z.string(),
  idpolicie: z.string(),
  idplan: z.string(),
  idcost: z.string(),
});

const CreateProposal = FormSchema.omit({ id: true });
const UpdateProposal = FormSchema.omit({ id: true });

export type State = {
  errors?: {
    number?: string[];
    idclient?: string[];
    iduser?: string[];
    idpolicie?: string[];
    idplan?: string[]; 
    idcost?: string[];
  };
  message?: string | null;
};

export async function createProposal(prevState: State, formData: FormData) {
  const validatedFields = CreateProposal.safeParse({
    number: formData.get('number'),
    idclient: formData.get('idclient'),
    iduser: formData.get('iduser'),
    idpolicie: formData.get('idpolicie'),
    idplan: formData.get('idplan'),
    idcost: formData.get('idcost'),
    });

    if (!validatedFields.success) {
      return {
        errors: validatedFields.error.flatten().fieldErrors,
        message: 'Missing Fields. Failed to Create.',
      };
    }
    const { number, idclient, iduser, idpolicie, idplan, idcost} = validatedFields.data;

    try {
        await sql`
        INSERT INTO proposalsapp.proposals ( number, idclient, iduser, idpolicie, idplan, idcost)
        VALUES (${number}, ${idclient}, ${iduser}, ${idpolicie}, ${idplan}, ${idcost})
        `;  
    } catch (error){
      return {
        message: 'Database Error: Failed to Create Proposal.',
      };
    }
    revalidatePath('/dashboard/proposals');
    redirect('/dashboard/proposals');
}
 
export async function updateProposal(
  id: string,
  prevState: State, 
  formData: FormData
  ){
  const validatedFields = UpdateProposal.safeParse({
    number: formData.get('number'),
    idclient: formData.get('idclient'),
    iduser: formData.get('iduser'),
    idpolicie: formData.get('idpolicie'),
    idplan: formData.get('idplan'),
    idcost: formData.get('idcost')
});
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Update Proposal.',
    };
  }
  const { number, idclient, iduser, idpolicie, idplan, idcost} = validatedFields.data;
   
  try {
  await sql`
    UPDATE proposalsapp.proposals
    SET 
    number = ${number}, idclient = ${idclient}, iduser = ${iduser},
    idpolicie = ${idpolicie}, idplan = ${idplan}, idcost = ${idcost}
    WHERE id = ${id}
  `;
 } catch (error){
  return { message: 'Database Error: Failed to Update Proposal.' };
 }
 
  revalidatePath('/dashboard/proposals');
  redirect('/dashboard/proposals');
}

export async function deleteProposal(id: string) {
    //throw new Error('Failed to Delete Invoice');
    
    await sql`DELETE FROM proposalsapp.proposals WHERE id = ${id}`;
    revalidatePath('/dashboard/proposals');
  }