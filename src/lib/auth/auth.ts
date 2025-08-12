import NextAuth, { NextAuthConfig } from 'next-auth';
import { PrismaAdapter } from '@auth/prisma-adapter';
import prisma from '@/lib/prisma';

import GitHubProvider from 'next-auth/providers/github';
import GoogleProvider from 'next-auth/providers/google';
import CredentialProvider from 'next-auth/providers/credentials';
import { schemaUser, signInCredential } from '@/auth';

export const authOptions: NextAuthConfig = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GitHubProvider({
      clientId: process.env.AUTH_GITHUB_ID ?? '',
      clientSecret: process.env.AUTH_GITHUB_SECRET ?? '',
    }),

    GoogleProvider({
      clientId: process.env.AUTH_GOOGLE_ID ?? '',
      clientSecret: process.env.AUTH_GOOGLE_SECRET ?? '',
    }),

    CredentialProvider({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'email', placeholder: 'Indique el Email' },
        password: { label: 'Password', type: 'password' },
      },
      authorize: async (credentials) => {
        const validCred = schemaUser.parse(credentials);

        // const user = {
        //   id: '23232323',
        //   name: 'Jhon Doe',
        //   email: 'jhondoe@gmail.com',
        //   image: 'https://musicart.xboxlive.com/7/baa66500-0000-0000-0000-000000000002/504/image.jpg',
        // };

        const user = await signInCredential(validCred.email, validCred.password);
        if (!user) throw new Error('Invalid credential');

        // Return a valid User object
        return { ...user };
      },
    }),
  ],

  session: {
    strategy: 'jwt',
    maxAge: 60 * 60 * 24 * 5, // Example: 5 days
  },

  // pages:{

  // },

  callbacks: {
    async signIn({ user, account, credentials, email, profile }) {
      // aqui se puede bloquear al usuario o permitir, en caso que se ha true, se da el paso o acceso.
      // bloquear usuario de alguna cuenta de correo, etc , gmail.
      return true;
    },

    async jwt({ token, user, account, profile }) {
      // Al asignar el token ya este usuario tiene un email

      //TODO: Agregando el roles y el id, del usuario
      const dbUser = await prisma.user.findUnique({ where: { email: token.email ?? 'no-email' } });
      // token.roles = dbUser?.roles ?? ['no-roles'];
      token.id = dbUser?.id ?? 'no-uuid';

      return token;
    },

    async session({ token, user, session }) {
      // console.log({ token });

      if (session && session.user) {
        // session.user.roles = token.roles as string[];
        session.user.id = token.id as string;
      }

      // console.log(user.id, session.userId);
      return session;
    },
  },
};

export const { handlers, signIn, signOut, auth } = NextAuth(authOptions);
