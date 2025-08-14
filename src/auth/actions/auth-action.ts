import * as z from 'zod';
import bcrypt from 'bcrypt';
import prisma from '@/lib/prisma';

export const schemaUser = z.object({
  email: z.email({}),
  password: z.string().min(2),
});

export const signInCredential = async (email: string, password: string) => {
  if (!email || !password) {
    return null;
  }

  const vEmail = email.trim().toLowerCase();
  const vPassword = password.trim();
  const user = await prisma.user.findUnique({ where: { email: vEmail } });

  if (!user) {
    const dbUser = await createUser(vEmail, vPassword);
    return dbUser;
  }

  if (!bcrypt.compareSync(vPassword, user.password ?? '')) {
    return null;
  }
  return user;
};

const createUser = async (email: string, password: string) => {
  const vEmail = email.trim().toLowerCase();
  const vPassword = password.trim();

  const user = await prisma.user.create({
    data: {
      email: vEmail,
      name: email.split('@')[0],
      password: bcrypt.hashSync(vPassword, bcrypt.genSaltSync(1)),
      image: 'https://musicart.xboxlive.com/7/baa66500-0000-0000-0000-000000000002/504/image.jpg',
    },
  });

  return user;
};
