import NextAuth, { NextAuthConfig } from "next-auth";
import  { DefaultSession, User, CustomUser } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { sql } from "@vercel/postgres";
import { JWT } from "next-auth/jwt";
import { AdapterUser } from "next-auth/adapters";
import bcrypt from "bcryptjs";
import { z } from "zod";

/*
export type User_ = {
  id: string;
  name: string;
  email: string;
  password: string;
  role: string; 
}
*/
declare module "next-auth" {
  interface CustomUser extends AdapterUser {
    role: string; // 🔥 Adicionando role ao User
    password: string;
  }
  interface Session {
    user: CustomUser & DefaultSession["user"]; // 🔥 Garantindo que role aparece na sessão
  }
}
declare module "next-auth/jwt" {
  interface JWT {
    role: string; // 🔥 Garantindo que role aparece no token JWT
  }
}
async function getUser(email: string): Promise< CustomUser | null> {
  try {
    const users = await sql<CustomUser>`SELECT * FROM autoricapp.users WHERE email=${email}`;
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
        if (!passwordsMatch) {
          console.log("Senha incorreta.");
          return null;
        }
        return user;
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
      //console.log("Dados do usuário no JWT antes:", token); // Debug
      if (user) {
        return {
        ...token,
        id : user.id,
        name : user.name,
        email : user.email,
        role : (user as CustomUser).role
        };
      }
      //console.log("Token final com role:", token); // Debug
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
          session.user.id = token.id as string;
          session.user.name =  token.name as string;
          session.user.email =  token.email as string;
          session.user.role = token.role as string;
        }
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
export const {handlers, auth, signIn, signOut} = NextAuth(authOptions);