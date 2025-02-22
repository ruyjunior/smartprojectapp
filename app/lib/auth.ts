import NextAuth, { NextAuthConfig } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { sql } from "@vercel/postgres";
import { JWT } from "next-auth/jwt";
import bcrypt from "bcryptjs";
//import argon2 from "argon2";
import { z } from "zod";
import { User } from "@/app/lib/users/definitions";

async function getUser(email: string): Promise<User | null> {
  try {
    const users = await sql<User>`SELECT * FROM autoricapp.users WHERE email=${email}`;
    return users.rows[0] || null;
  } catch (error) {
    console.error("Erro ao buscar usuário:", error);
    return null;
  }
}

export const authOptions: NextAuthConfig = {
  pages: {
    signIn: "/login",
  },
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Senha", type: "password" },
      },
      async authorize(credentials) {
        // Validação com Zod
        const parsedCredentials = z
          .object({ email: z.string().email(), password: z.string().min(6) })
          .safeParse(credentials);

        if (!parsedCredentials.success) {
          console.log("Credenciais inválidas");
          return null;
        }

        const { email, password } = parsedCredentials.data;
        const user = await getUser(email);
        if (!user) {
          console.log("Usuário não encontrado.");
          return null;
        }

        const passwordsMatch = await bcrypt.compare(password, user.password);
        //const hash = await argon2.hash(password);
        //const passwordsMatch = (hash === user.password);
        if (!passwordsMatch) {
          console.log("Senha incorreta.");
          return null;
        }

        return user
      },
    }),
  ],
  session: {
    strategy: "jwt",
    maxAge: 60 * 60 * 24 * 7, // 7 dias
    updateAge: 60 * 60 * 2 // Atualiza o token a cada 1 hora
  },
  jwt: {
    maxAge: 60 * 60 * 24 * 7 // Expiração do token JWT
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.user = user;
      }
      return token;
    },
    async session({ session, token } : { session: any, token: any }) {
      if (token) {
        session.user = {
          id: token.id as string,
          name: token.user.name as string,
          email: token.user.email as string,
          role: token.user.role as string,
          emailVerified: null,
        };
      }
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
export const {handlers, auth, signIn, signOut} = NextAuth(authOptions);