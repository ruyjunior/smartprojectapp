'use server';
import { z } from 'zod';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { sql } from '@vercel/postgres';
import { fetchTaskById } from '../tasks/data';
import { UpdateTaskSpendTime } from '../tasks/actions';
import { fetchMessageById } from '../messages/data';


const FormSchema = z.object({
  id: z.string(),
  idticket: z.string().optional(),
  sender: z.string().min(1, 'Sender is required'),
  message: z.string().min(1, 'Message is required'),
  status: z.string().optional(),
});

const Createmessage = FormSchema.omit({ id: true });
const Updatemessage = FormSchema.omit({ id: true, idticket: true });

export type State = {
  message?: string;
  errors?: {
    idticket?: string[];
    sender?: string[];
    message?: string[];
  };
};

export async function createMessage(prevState: State, formData: FormData) {
  const validatedFields = Createmessage.safeParse({
    sender: formData.get('sender'),
    message: formData.get('message'),
    idticket: formData.get('idticket'),
  });
  console.log('Validated fields:', validatedFields);

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Create.',
    };
  }
  const { sender, message, idticket } = validatedFields.data;
  console.log('Creating message with data:', { sender, message, idticket });

  try {
    await sql`
        INSERT INTO smartprojectsapp.messages ( 
          sender, message, idticket )
        VALUES (${sender}, ${message}, ${idticket})
        `;
  } catch (error) {
    console.error('Database Error:', error);
    return {
      message: 'Database Error: Failed to Create message.',
    };
  }
  revalidatePath(`/tickets/${idticket}/chat`);
  redirect(`/tickets/${idticket}/chat`);
}

export async function updateMessage(
  id: string,
  prevState: State,
  formData: FormData
) {

  const validatedFields = Updatemessage.safeParse({
    sender: formData.get('sender'),
    message: formData.get('message'),
  });


  if (!validatedFields.success) {
    console.log('Error: ', validatedFields.error.flatten().fieldErrors);
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Update message.',
    };
  }

  const { sender, message } = validatedFields.data;

  try {
    await sql`
    UPDATE smartprojectsapp.messages
    SET 
      sender = ${sender}, 
      message = ${message}
    WHERE id = ${id}
  `;
  } catch (error) {
    console.error('Database Error:', error);
    return { message: 'Database Error: Failed to Update message.' };
  }
  revalidatePath(`/tickets/${id}/chat`);
  redirect(`/tickets/${id}/chat`);
}

export async function deleteMessage(id: string) {
  try {
    // First get the message
    const message = await fetchMessageById(id);
    
    if (!message) {
      throw new Error('message not found');
    }
    
    // Delete the message
    await sql`DELETE FROM smartprojectsapp.messages WHERE id = ${id}`;
    
    revalidatePath('/messages');
    
  } catch (error) {
    console.error('Error deleting message:', error);
    throw new Error('Failed to delete message');
  }
}