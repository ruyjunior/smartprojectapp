'use server';
import { z } from 'zod';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { sql } from '@vercel/postgres';
import { CurrentCompanyId } from '@/app/utils/utils';

const FormSchema = z.object({
  id: z.string(),
  title: z.string(),
  comments: z.string(),
  idcompany: z.string().optional(),
  clients: z.array(z.string()).optional(),
  contacts: z.array(z.string()).optional(),
});

const CreateProject = FormSchema.omit({ id: true });
const UpdateProject = FormSchema.omit({ id: true, idcompany: true });

export type State = {
  message?: string;
  errors?: {
    title?: string[];
    comments?: string[];
  };
};

export async function createProject(prevState: State, formData: FormData) {
  const idcompany = await CurrentCompanyId();

  const validatedFields = CreateProject.safeParse({
    title: formData.get('title'),
    comments: formData.get('comments'),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Create.',
    };
  }
  const { title, comments } = validatedFields.data;

  try {
    await sql`
        INSERT INTO smartprojectsapp.projects ( title, comments, idcompany)
        VALUES (${title}, ${comments}, ${idcompany})
        `;
  } catch (error) {
    return {
      message: 'Database Error: Failed to Create Project.',
    };
  }
  revalidatePath('/projects');
  redirect('/projects');
}

export async function updateProject(
  id: string,
  prevState: State,
  formData: FormData
) {
  // Extrair arrays de clientes e contatos
  const clients = [...new Set(formData.getAll('clients').map(String))];
  const contacts = [...new Set(formData.getAll('contacts').map(String))];
  const idcompany = await CurrentCompanyId();

  const validatedFields = UpdateProject.safeParse({
    title: formData.get('title'),
    comments: formData.get('comments'),
    clients,
    contacts,
  });

  if (!validatedFields.success) {
    console.log(validatedFields.error);
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Update Project.',
    };
  }

  const { title, comments } = validatedFields.data;

  try {
    // Atualizar projeto
    await sql`
      UPDATE smartprojectsapp.projects
      SET title = ${title}, comments = ${comments}
      WHERE id = ${id}
    `;

    // Limpar associações antigas
    await deleteClientProjectAssociation(id);
    await deleteContactProjectAssociation(id);

    // Inserir novos contatos e clients
    await insertNewClientProjectAssociation(clients, id);
    await insertNewContactProjectAssociation(contacts, id);

  } catch (error) {
    console.log(error);
    return { message: 'Database Error: Failed to Update Project.' };
  }

  revalidatePath('/projects');
  redirect('/projects');
}

export async function deleteAction(id: string) {
  await sql`DELETE FROM smartprojectsapp.projects WHERE id = ${id}`;
  revalidatePath('/projects');
}

export async function deleteClientProjectAssociation(idproject: string) {
  await sql`
  DELETE FROM smartprojectsapp.clients_projects 
  WHERE idproject = ${idproject}`;
}

export async function deleteContactProjectAssociation(idproject: string) {
  await sql`
  DELETE FROM smartprojectsapp.contacts_projects 
  WHERE idproject = ${idproject}`;
}

export async function insertNewClientProjectAssociation(clients: string[], id: string) {
  const idcompany = await CurrentCompanyId();

  // Inserir novos clientes
  if (clients && clients.length > 0) {
    for (const clientId of clients) {
      await sql`
          INSERT INTO smartprojectsapp.clients_projects (idclient, idproject, idcompany)
          VALUES (${clientId}, ${id}, ${idcompany})
        `;
    }
  }
}

export async function insertNewContactProjectAssociation(contacts: string[], id: string) {
  const idcompany = await CurrentCompanyId();
  // Inserir novos contatos
  if (contacts && contacts.length > 0) {
    for (const contactId of contacts) {
      await sql`
          INSERT INTO smartprojectsapp.contacts_projects (idcontact, idproject, idcompany)
          VALUES (${contactId}, ${id}, ${idcompany})
        `;
    }
  }
}