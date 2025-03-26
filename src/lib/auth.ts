export const runtime = "nodejs"; // or 'edge' with compatible libraries

import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { PrismaAdapter } from "@auth/prisma-adapter";
import bcrypt from "bcryptjs";
import { User } from "@prisma/client";
import db from "./db";
import { loginSchema } from "@/validation/auth_schema";

const adapter = PrismaAdapter(db);

export const { auth, handlers, signIn, signOut } = NextAuth({
  session: {
    strategy: "jwt",
  },
  secret: process.env.AUTH_SECRET,
  pages: {
    signIn: "/auth/login",
  },
  adapter,
  providers: [
    Credentials({
      // ! type dari credentials itu nurun ke: authorize(credentials, request)
      credentials: {
        email: {
          label: "Email",
          type: "email",
        },
        password: {
          label: "Password",
          type: "password",
        },
      },
      authorize: async (credentials) => {
        const validatedPayload = loginSchema.parse(credentials);
        const { email, password } = validatedPayload;

        try {
          const userExist = await db.user.findFirst({
            where: {
              email,
            },
          });
          if (!userExist) {
            return null;
          }
          const comparePassword = await bcrypt.compare(
            password,
            userExist.password!
          );
          if (!comparePassword) {
            return null;
          }
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          const { password: _, ...user } = userExist;

          return user;
        } catch (err) {
          console.error(err);
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user, account, trigger }) {
      if (trigger === "signIn" && user) {
        // ! nyalin semua properti user (yang baru login) ke token
        token = { ...token, ...user };
      }
      if (account?.provider === "credentials") {
        token.credentials = true;
      }
      return token;
    },
    async session({ session, token }) {
      // ! nyalin semua properti token ke session.user biar bisa diakses di seluruh component
      session.user = {
        ...session.user,
        ...token,
        role: token.role,
      } as User;

      return session;
    },
  },
});
