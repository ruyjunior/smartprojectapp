import nodemailer from "nodemailer";
import { NextResponse } from "next/server";

const transporter = nodemailer.createTransport({
  service: "gmail", // ou outro serviço SMTP
  auth: {
    user: process.env.EMAIL_USER, // Definir no .env.local
    pass: process.env.EMAIL_PASS, // Definir no .env.local
  },
});

export async function SendLinkAccess(
  email: string, name: string, link: string
) {
  console.log('Dados para email: ', email, name, link )
  try {
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Link de acesso Smart Projects App",
      html: `
        <h2>Smart Projects APP</h2>
        <p>Olá ${name},</p>
        <p>Você está recebendo este e-mail para mudança ou primeiro cadastro de senha para sua conta.</p>
        <p>
          <a href="${link}">Clique aqui para mudar sua senha e acessar sua conta</a>
        </p>
        <p>Ou copie e cole este link no seu navegador:<br>${link}</p>
        <p>O link expira em 30 minutos.<br>Se você não solicitou, ignore este e-mail.</p>
        <hr>
        <small>Smart Projects &copy; ${new Date().getFullYear()}</small>
      `,
    });

  } catch (error) {
    console.log(error)
    console.error("Erro ao enviar e-mail:", error);
    return NextResponse.json({ message: "Erro de envio." }, { status: 500 });
  }
}
