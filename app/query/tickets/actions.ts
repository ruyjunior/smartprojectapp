'use server';
import { z } from 'zod';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { sql } from '@vercel/postgres';
import { fetchTaskById } from '../tasks/data';
import { UpdateTaskSpendTime } from '../tasks/actions';
import { fetchTicketById } from '../tickets/data';
import { CurrentUser } from '@/app/utils/utils';


const FormSchema = z.object({
  id: z.string(),
  iduser: z.string().optional(),
  subject: z.string().min(1, 'Subject is required'),
  message: z.string().min(1, 'Message is required'),
  status: z.string().optional(),
});

const Createticket = FormSchema.omit({ id: true });
const Updateticket = FormSchema.omit({ id: true, iduser: true });

export type State = {
  message?: string;
  errors?: {
    subject?: string[];
    message?: string[];
    status?: string[];
  };
};

export async function createTicket(prevState: State, formData: FormData) {
  const user = await CurrentUser();

  const validatedFields = Createticket.safeParse({
    subject: formData.get('subject'),
    message: formData.get('message'),
    status: formData.get('status'),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Create.',
    };
  }
  const { subject, message, status } = validatedFields.data;
  console.log('Creating ticket with data:', { subject, message, status });
  try {
    await sql`
        INSERT INTO smartprojectsapp.tickets ( 
          iduser, subject, message, status )
        VALUES (${user?.id}, ${subject}, ${message}, ${status})
        `;
  } catch (error) {
    console.error('Database Error:', error);
    return {
      message: 'Database Error: Failed to Create ticket.',
    };
  }
  revalidatePath('/tickets');
  redirect('/tickets');
}

export async function updateTicket(
  id: string,
  prevState: State,
  formData: FormData
) {

  const validatedFields = Updateticket.safeParse({
    subject: formData.get('subject'),
    message: formData.get('message'),
    iduser: formData.get('iduser'),
    status: formData.get('status'),
  });


  if (!validatedFields.success) {
    console.log('Error: ', validatedFields.error.flatten().fieldErrors);
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Update ticket.',
    };
  }

  const { subject, message, status } = validatedFields.data;

  try {
    await sql`
    UPDATE smartprojectsapp.tickets
    SET 
      subject = ${subject}, 
      message = ${message}, 
      status = ${status}
    WHERE id = ${id}
  `;
  } catch (error) {
    console.error('Database Error:', error);
    return { message: 'Database Error: Failed to Update ticket.' };
  }
  revalidatePath('/tickets');
  redirect('/tickets');
}

export async function deleteTicket(id: string) {
  try {
    // First get the ticket
    const ticket = await fetchTicketById(id);

    if (!ticket) {
      throw new Error('Ticket not found');
    }

    // Delete the ticket
    await sql`DELETE FROM smartprojectsapp.tickets WHERE id = ${id}`;

    revalidatePath('/tickets');

  } catch (error) {
    console.error('Error deleting ticket:', error);
    throw new Error('Failed to delete ticket');
  }
}