import { NextResponse } from "next/server";
import { sql } from "@vercel/postgres";
import nodemailer from "nodemailer";
import { generateToken } from "@/app/utils/utils";
import { fetchUserByEmail } from "@/app/query/users/data";
import { User } from "@/app/query/users/definitions";
import { SendLinkAccess } from "@/app/lib/sendEmails";

// Configuração do transporte de e-mails
const transporter = nodemailer.createTransport({
  service: "gmail", // ou outro serviço SMTP
  auth: {
    user: process.env.EMAIL_USER, // Definir no .env.local
    pass: process.env.EMAIL_PASS, // Definir no .env.local
  },
});

export async function POST(req: Request) {
  //console.log('Function called');
  try {
    const { email } = await req.json();
    if (!email) {
      return NextResponse.json({ message: "E-mail obrigatório!" }, { status: 400 });
    }

    let user = await fetchUserByEmail(email);

    if (!user) {
      const insertedUser = await sql<User>`
        INSERT INTO smartprojectsapp.users (email) 
        VALUES (${email}) 
        RETURNING id, email`;
      user = insertedUser.rows[0];
    }
    // Gerar um token temporário
    const token = generateToken();
    const expiresAt = new Date(Date.now() + 1000 * 60 * 30).toISOString(); // Converte para string

    // Salvar token no banco
    await sql`
      INSERT INTO smartprojectsapp.auth_tokens (iduser, token, expires_at) 
      VALUES (${user.id}, ${token}, ${expiresAt})
    `;

    // Criar link de acesso
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
    const link = `${baseUrl}/auth/confirm?token=${token}`;

    // Enviar e-mail
    SendLinkAccess(email, user.name, link);

    return NextResponse.json({ message: "E-mail enviado! Verifique sua caixa de entrada." });
  } catch (error) {
    console.log(error)
    console.error("Erro ao enviar e-mail:", error);
    return NextResponse.json({ message: "Erro ao processar a solicitação." }, { status: 500 });
  }
}
