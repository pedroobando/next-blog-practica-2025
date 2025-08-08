'use server';

import prisma from '@/lib/prisma';

export const createTag = async () => {
  //  tags: { create: [{ name: 'react' }, { name: 'JavaScript' }, { name: 'Frontend' }] },

  const createtag = await prisma.tag.create({ data: { name: 'JavaScript' } });
  return createtag;
};
